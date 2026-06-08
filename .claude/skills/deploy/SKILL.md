---
name: deploy
description: Configure le deploiement du site client (Vercel, Docker ou export statique)
argument-hint: "[nom-client]"
---

# /deploy [nom-client]

Configure le deploiement du site client selon le mode choisi (Vercel, Docker ou export statique).

## Declenchement

L'utilisateur lance `/deploy [nom-client]` ou `deploy [nom-client]`.

## Pre-requis

- Le dossier `apps/[nom-client]/` doit exister (sinon, suggerer `/build [nom-client]` d'abord)

## Instructions

Le processus se deroule en **4 phases sequentielles**. Ne jamais sauter une phase.

---

### Phase 1 — Verification

1. **Verifier** que `apps/[nom-client]/` existe
2. **Lancer le build** pour s'assurer que le projet compile : `yarn turbo build --filter=@claude-site-builder/[nom-client]`
3. **Si le build echoue** : afficher les erreurs et suggerer de corriger avant de deployer. Proposer de relancer `/build [nom-client]`
4. **Si le build reussit** :
   ```
   Verification pour [nom-client] :
   - Projet : apps/[nom-client]/ present
   - Build : succes

   Puis-je configurer le deploiement ?
   ```
5. **Attendre** la validation de l'utilisateur

---

### Phase 2 — Questions

Presenter les questions de configuration du deploiement :

1. **Type de deploiement** : Vercel / Docker / Export statique (defaut: **Vercel**)
2. **Domaine** : nom de domaine prevu (optionnel)
3. **Variables d'environnement** : lister celles necessaires selon la config BUILD.md (ex: `NEXT_PUBLIC_FORMSPREE_ID`, `NEXT_PUBLIC_GA_ID`...)

> Pre-remplir la liste de variables depuis `docs/projets/[nom-client]/BUILD.md` si le fichier existe.

---

### Phase 3 — Generation

Generer les fichiers de deploiement dans `apps/[nom-client]/` selon le type choisi :

#### Option A — Vercel

1. **`vercel.json`** :
   ```json
   {
     "$schema": "https://openapi.vercel.sh/vercel.json",
     "framework": "nextjs",
     "regions": ["cdg1"]
   }
   ```
   Adapter les regions si necessaire.

2. **`.env.example`** — lister toutes les variables d'environnement necessaires avec des commentaires

3. **Instructions dans DEPLOY.md**

#### Option B — Docker

Charger le template de reference `docs/templates/base-workflow-docker.md` et l'adapter au projet.

##### Fichiers Docker

1. **`Dockerfile`** — multi-stage build avec standalone output (voir template) :
   - Stage 1 : `deps` — installer les dependances
   - Stage 2 : `builder` — build Next.js avec `output: 'standalone'`
   - Stage 3 : `runner` — image minimale pour la production
   - Base image : `node:22-alpine`
   - Adapter les `COPY` a la structure du monorepo

2. **`docker-compose.[nom-client].yml`** — composition de production (voir template) :
   - Image depuis le registry (`${DOCKER_REGISTRY}/[image-name]:[image-tag]`)
   - `env_file` pointant vers le bon fichier sur le serveur (`.env` ou `.env.[nom-client]`)
   - Nom du service = nom du projet (`[nom-client]`, pas `web`)
   - Reseau `web` externe
   - Le fichier est nomme `docker-compose.[nom-client].yml` pour eviter les conflits quand plusieurs projets cohabitent sur la meme VM

3. **`.dockerignore`** — exclure `node_modules`, `.next`, `.git`, `.turbo`, `.yarn/cache`, etc.

4. **Modifier `next.config.ts`** — ajouter `output: 'standalone'`

5. **`.env.example`** — lister toutes les variables d'environnement

##### Workflows GitHub Actions (unifies)

Les workflows CI/CD sont **unifies** dans deux fichiers a la racine du repo : `.github/workflows/ci.yml` et `.github/workflows/deploy.yml`. Chaque workflow detecte automatiquement quels projets ont change via `dorny/paths-filter` et ne lance les jobs que pour les projets concernes.

6. **Si les workflows existent deja** (`.github/workflows/ci.yml` et `.github/workflows/deploy.yml`) :
   - Ajouter le nouveau projet dans le job `detect-changes` (output + filtre)
   - Ajouter le projet dans la condition `if` du job `lint` du CI
   - Ajouter un job `build-[nom-client]` dans le CI
   - Ajouter une option dans `workflow_dispatch.inputs.project.options` du Deploy
   - Ajouter un job `deploy-[nom-client]` dans le Deploy

7. **Si les workflows n'existent pas encore** : les creer depuis le template `docs/templates/base-workflow-docker.md`

##### Questions supplementaires pour Docker

Poser ces questions en plus des questions generales (Phase 2) :

1. **Runners** : GitHub-hosted (`ubuntu-latest`) ou self-hosted ? (defaut: `ubuntu-latest`)
2. **Registry Docker** : quel registry ? (Harbor, GitLab CR, Docker Hub, autre)
3. **Chemin serveur** : ou deployer sur le serveur ? (defaut: `/srv/lesentrecodeurs`)
4. **Port** : quel port pour le conteneur ? Verifier les ports deja utilises par les autres projets pour eviter les conflits
5. **Fichier env** : nom du fichier env sur le serveur (`.env` pour le premier projet, `.env.[nom-client]` pour les suivants)

> **Reverse proxy** : ne pas poser la question. En mode Docker, le reverse proxy est toujours considere comme deja configure sur le serveur. Ne pas generer de config reverse proxy (pas de labels Traefik, pas de nginx.conf, etc.).

##### DEPLOY.md pour Docker

Le fichier DEPLOY.md doit inclure en plus :

- La liste des secrets et variables GitHub a configurer (tableau)
- La checklist de mise en production (voir template)
- Les instructions pour le premier deploiement (creation du reseau Docker, fichier `.env` serveur, etc.)

8. **Instructions dans DEPLOY.md**

#### Option C — Export statique

1. **Modifier `next.config.ts`** — ajouter `output: 'export'`

2. **Verifier la compatibilite** — afficher un warning si le projet utilise des features incompatibles avec l'export statique :
   - Middleware
   - API Routes
   - ISR (Incremental Static Regeneration)
   - Dynamic routes sans `generateStaticParams`
   - `headers()`, `cookies()`, `searchParams` cote serveur

3. **`.env.example`** — lister les variables d'environnement cote client uniquement (`NEXT_PUBLIC_*`)

4. **Instructions dans DEPLOY.md**

#### Generation du fichier DEPLOY.md

Generer `docs/projets/[nom-client]/DEPLOY.md` dans tous les cas :

```markdown
# Deploy — [Nom du client]

## Type de deploiement

[Vercel / Docker / Export statique]

## Domaine

[domaine.com ou "A configurer"]

## Variables d'environnement

| Variable | Description | Obligatoire |
|---|---|---|
| NEXT_PUBLIC_FORMSPREE_ID | ID du formulaire Formspree | oui |
| NEXT_PUBLIC_GA_ID | ID Google Analytics | non |
| ... | ... | ... |

## Fichiers generes

- [liste des fichiers de deploiement generes]

## Instructions de deploiement

### [Selon le type choisi]

[Instructions pas a pas pour deployer]
```

---

### Phase 4 — Livraison

Presenter un recap a l'utilisateur :

```
Deploiement configure pour [nom-client] :
- Type : [Vercel / Docker / Export statique]
- Fichiers generes : [liste]
- Config : docs/projets/[nom-client]/DEPLOY.md
- Variables a configurer : [liste des variables dans .env.example]

[Instructions specifiques selon le type]
```

---

## Regles

- **Ne pas deployer** — ce skill configure le deploiement mais ne lance pas le deploiement lui-meme
- **Build obligatoire** — ne pas configurer le deploiement si le build ne passe pas
- **Variables d'environnement** — ne jamais ecrire de vraies valeurs de secrets dans les fichiers generes. Utiliser des placeholders dans `.env.example`
- **Coherence avec BUILD.md** — les variables listees doivent correspondre aux choix techniques de BUILD.md
- **Docker standalone** — toujours utiliser l'output standalone de Next.js pour Docker (image minimale)
- **Export statique** — toujours verifier la compatibilite et avertir l'utilisateur des limitations
- Si aucun argument n'est fourni, demander le nom du client a l'utilisateur
