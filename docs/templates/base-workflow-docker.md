# Base Workflow — Déploiement Docker

Guide de référence pour générer les workflows GitHub Actions CI/CD d'un site Next.js déployé via Docker sur un serveur dédié (self-hosted ou VPS).

## Vue d'ensemble

Deux workflows **unifiés** à la racine du repo (`.github/workflows/`), partagés par tous les projets du monorepo :

1. **CI** (`ci.yml`) — détecte quels projets ont changé, puis lint + build uniquement pour ceux-ci
2. **Deploy** (`deploy.yml`) — détecte quels projets ont changé, puis build Docker + push + deploy uniquement pour ceux-ci

Quand un nouveau projet est ajouté, on ajoute un bloc de détection et un job dans chaque workflow existant. **On ne crée pas de nouveaux fichiers workflow.**

## Prérequis

- Monorepo Yarn workspaces + Turborepo
- Biome pour le lint/format (configuré à la racine)
- Docker registry privé (Harbor, GitLab Container Registry, ou autre)
- Serveur de production accessible en SSH
- GitHub Actions (self-hosted runner ou runners GitHub)

## Structure des fichiers générés

```
.github/workflows/
  ci.yml                     - Pipeline CI unifié (détection + lint + build par projet)
  deploy.yml                 - Pipeline deploy unifié (détection + deploy par projet)
apps/[nom-client]/
  Dockerfile                 - Multi-stage build Next.js standalone
  docker-compose.[nom-client].yml  - Composition de production
  .dockerignore              - Exclusions Docker
  .env.example               - Variables d'environnement (placeholders)
```

> **Note** : les workflows sont toujours à la racine dans `.github/workflows/` (exigence GitHub Actions). Le fichier docker-compose est nommé `docker-compose.[nom-client].yml` pour éviter les conflits quand plusieurs projets sont déployés sur la même VM.

## Cohabitation multi-projets sur une même VM

Quand plusieurs projets sont déployés sur le même serveur :

- **Ports distincts** : chaque projet utilise un port différent (3000, 3001, 3002...)
- **Fichiers env séparés** : `.env` pour le premier projet, `.env.[nom-client]` pour les suivants, tous dans le même dossier serveur
- **Compose files nommés** : `docker-compose.prod.yml`, `docker-compose.[nom-client].yml`, etc.
- **Reverse proxy** : un vhost par domaine pointant vers le bon port

---

## Workflow 1 — CI (`ci.yml`)

Pipeline de validation continue unifié. Détecte quels projets ont changé et ne lance lint/build que pour ceux-ci.

### Architecture

```
detect-changes → lint (si au moins un projet a changé)
               → build-[projet-1] (si projet-1 a changé)
               → build-[projet-2] (si projet-2 a changé)
               → ...
```

### Paramètres à adapter

| Placeholder | Description | Exemple |
|---|---|---|
| `[node-version]` | Version de Node.js | `22` |
| `[workspace-name]` | Nom du workspace Yarn | `@claude-site-builder/[nom-client]` |
| `[branches]` | Branche(s) cible | `main` |

### Template

```yaml
name: CI

on:
  push:
    branches: [[branches]]
  pull_request:
    branches: [[branches]]

jobs:
  detect-changes:
    name: Detect Changes
    runs-on: ubuntu-latest
    outputs:
      [nom-client-1]: ${{ steps.filter.outputs.[nom-client-1] }}
      [nom-client-2]: ${{ steps.filter.outputs.[nom-client-2] }}
    steps:
      - uses: actions/checkout@v4
      - id: filter
        uses: dorny/paths-filter@v3
        with:
          filters: |
            [nom-client-1]:
              - 'apps/[nom-client-1]/**'
              - 'packages/**'
            [nom-client-2]:
              - 'apps/[nom-client-2]/**'
              - 'packages/**'

  lint:
    name: Lint & Format
    needs: detect-changes
    if: needs.detect-changes.outputs.[nom-client-1] == 'true' || needs.detect-changes.outputs.[nom-client-2] == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: [node-version]
      - name: Enable Corepack & install dependencies
        run: |
          corepack enable
          yarn install --immutable
      - name: Biome check
        run: yarn check

  build-[nom-client-1]:
    name: Build — [Nom Client 1]
    needs: detect-changes
    if: needs.detect-changes.outputs.[nom-client-1] == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: [node-version]
      - name: Enable Corepack & install dependencies
        run: |
          corepack enable
          yarn install --immutable
      - name: Build
        run: yarn turbo build --filter=[workspace-name-1]
```

### Ajout d'un nouveau projet

Pour ajouter un projet au CI existant :
1. Ajouter une sortie dans `detect-changes` (output + filtre `dorny/paths-filter`)
2. Ajouter le projet dans la condition `if` du job `lint`
3. Ajouter un job `build-[nom-client]` conditionné par la détection

---

## Workflow 2 — Deploy (`deploy.yml`)

Pipeline de déploiement unifié. Détecte quels projets ont changé et ne déploie que ceux-ci. Supporte aussi le déclenchement manuel avec sélection de projet.

### Architecture

```
detect-changes → deploy-[projet-1] (si projet-1 a changé ou sélectionné manuellement)
               → deploy-[projet-2] (si projet-2 a changé ou sélectionné manuellement)
               → ...
```

### Paramètres à adapter par projet

| Placeholder | Description | Exemple |
|---|---|---|
| `[node-version]` | Version de Node.js | `22` |
| `[workspace-name]` | Nom du workspace Yarn | `@claude-site-builder/[nom-client]` |
| `[image-name]` | Nom de l'image Docker | `[nom-client]-web` |
| `[image-tag]` | Tag de l'image | `production` |
| `[server-path]` | Chemin sur le serveur | `/srv/lesentrecodeurs` |
| `[compose-file]` | Nom du fichier compose | `docker-compose.[nom-client].yml` |
| `[env-file]` | Fichier env sur le serveur | `.env` ou `.env.[nom-client]` |
| `[service-name]` | Nom du service Docker Compose | `[nom-client]` |

### Secrets et variables GitHub requis (partagés entre tous les projets)

| Type | Nom | Description |
|---|---|---|
| Secret | `DEPLOY_SSH_KEY` | Clé SSH privée pour accès au serveur |
| Secret | `DOCKER_REGISTRY_URL` | URL du registry Docker (login) |
| Secret | `DOCKER_REGISTRY_USERNAME` | Utilisateur du registry |
| Secret | `DOCKER_REGISTRY_PASSWORD` | Mot de passe du registry |
| Secret | `DOCKER_REGISTRY` | Préfixe des images (ex: `registry.example.com/myorg`) |
| Variable | `PROD_HOST` | IP ou hostname du serveur |
| Variable | `DEPLOY_SSH_USER` | Utilisateur SSH |
| Variable | `DEPLOY_SSH_PORT` | Port SSH (défaut: `22`) |

### Template

```yaml
name: Deploy

on:
  workflow_dispatch:
    inputs:
      project:
        description: "Projet à déployer (vide = auto-détection)"
        required: false
        type: choice
        options:
          - ""
          - [nom-client-1]
          - [nom-client-2]
  push:
    branches:
      - [branches]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  detect-changes:
    name: Detect Changes
    runs-on: [self-hosted, linux, x64]
    outputs:
      [nom-client-1]: ${{ steps.filter.outputs.[nom-client-1] }}
      [nom-client-2]: ${{ steps.filter.outputs.[nom-client-2] }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - id: filter
        uses: dorny/paths-filter@v3
        with:
          filters: |
            [nom-client-1]:
              - 'apps/[nom-client-1]/**'
              - 'packages/**'
            [nom-client-2]:
              - 'apps/[nom-client-2]/**'
              - 'packages/**'

  deploy-[nom-client]:
    name: Deploy — [Nom Client]
    needs: detect-changes
    if: >-
      needs.detect-changes.outputs.[nom-client] == 'true'
      || (github.event_name == 'workflow_dispatch' && (github.event.inputs.project == '[nom-client]' || github.event.inputs.project == ''))
    runs-on: [self-hosted, linux, x64]
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: [node-version]

      - name: Enable Corepack & install dependencies
        run: |
          corepack enable
          yarn install --immutable

      - name: Build
        run: yarn turbo build --filter=[workspace-name]

      - uses: docker/setup-buildx-action@v3

      - uses: docker/login-action@v3
        with:
          registry: ${{ secrets.DOCKER_REGISTRY_URL }}
          username: ${{ secrets.DOCKER_REGISTRY_USERNAME }}
          password: ${{ secrets.DOCKER_REGISTRY_PASSWORD }}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v6
        with:
          push: true
          context: .
          file: ./apps/[nom-client]/Dockerfile
          tags: |
            ${{ secrets.DOCKER_REGISTRY }}/[image-name]:[image-tag]

      - name: Copy Compose files to server
        uses: appleboy/scp-action@master
        with:
          host: ${{ vars.PROD_HOST }}
          username: ${{ vars.DEPLOY_SSH_USER }}
          port: ${{ vars.DEPLOY_SSH_PORT }}
          key: ${{ secrets.DEPLOY_SSH_KEY }}
          source: "apps/[nom-client]/[compose-file]"
          target: "[server-path]/docker/"
          strip_components: 2
          rm: true

      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ vars.PROD_HOST }}
          username: ${{ vars.DEPLOY_SSH_USER }}
          port: ${{ vars.DEPLOY_SSH_PORT }}
          key: ${{ secrets.DEPLOY_SSH_KEY }}
          script: |
            cd [server-path]/

            docker compose -f [server-path]/docker/[compose-file] --env-file [env-file] pull [service-name]
            docker compose -f [server-path]/docker/[compose-file] --env-file [env-file] up -d [service-name]

            docker image prune -f
```

### Ajout d'un nouveau projet

Pour ajouter un projet au Deploy existant :
1. Ajouter une option dans `workflow_dispatch.inputs.project.options`
2. Ajouter une sortie dans `detect-changes` (output + filtre)
3. Ajouter un job `deploy-[nom-client]` avec la condition `if` appropriée

---

## Dockerfile

Le Dockerfile utilise un build multi-stage pour produire une image minimale.

### Template

```dockerfile
FROM node:22-alpine AS base

# ------- deps -------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
COPY apps/[nom-client]/package.json apps/[nom-client]/
COPY turbo.json ./

RUN corepack enable && yarn install --immutable

# ------- builder -------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/[nom-client]/node_modules ./apps/[nom-client]/node_modules
COPY . .

RUN corepack enable && yarn turbo build --filter=[workspace-name]

# ------- runner -------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/[nom-client]/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/[nom-client]/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/[nom-client]/.next/static ./apps/[nom-client]/.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/[nom-client]/server.js"]
```

### Points d'attention

- Le `COPY` des dépendances doit refléter la structure du monorepo (workspace hoisting)
- `output: 'standalone'` doit être activé dans `next.config.ts`
- Le chemin du `server.js` dans le `CMD` dépend de la position de l'app dans le monorepo
- Les variables `NEXT_PUBLIC_*` sont injectées au build, pas au runtime — les passer via `build-args` dans le workflow si nécessaire

---

## Docker Compose Production

### Template

```yaml
services:
  [nom-client]:
    image: ${DOCKER_REGISTRY}/[image-name]:[image-tag]
    restart: unless-stopped
    ports:
      - "${PORT:-3000}:3000"
    env_file:
      - .env
    networks:
      - web

networks:
  web:
    external: true
```

### Notes

- Le reverse proxy est toujours considere comme deja configure sur le serveur — ne pas generer de config reverse proxy (pas de labels Traefik, pas de nginx.conf, etc.)
- **Healthcheck** : ajouter un healthcheck sur `/api/health` ou la page d'accueil si necessaire
- **Volumes** : monter un volume pour les logs ou uploads si necessaire

---

## .dockerignore

### Template

```
node_modules
.next
.git
.gitignore
*.md
.env
.env.*
!.env.example
.turbo
.yarn/cache
.yarn/install-state.gz
```

---

## Variables d'environnement serveur

Sur le serveur de production, créer un fichier `.env` dans `[server-path]/` avec les variables nécessaires :

```bash
# Application
NODE_ENV=production
PORT=3000

# Docker Registry (pour docker compose pull)
DOCKER_REGISTRY=registry.example.com/myorg

# Variables spécifiques au projet
# (pré-remplies depuis BUILD.md)
```

---

## Checklist de mise en production

Avant le premier déploiement :

1. [ ] Registry Docker configuré et accessible
2. [ ] Secrets et variables GitHub configurés (voir tableau ci-dessus)
3. [ ] Serveur accessible en SSH depuis le runner
4. [ ] Docker et Docker Compose installés sur le serveur
5. [ ] Réseau Docker `web` créé (`docker network create web`)
6. [ ] Fichier `.env` créé sur le serveur dans `[server-path]/`
7. [ ] Reverse proxy déjà configuré sur le serveur (pointant vers le port du conteneur)
8. [ ] DNS pointant vers le serveur
