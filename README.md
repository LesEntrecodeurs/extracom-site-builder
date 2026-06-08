# Claude Site Builder

Workflow Claude Code pour creer des sites web — de vos sources brutes jusqu'au deploiement.

## Concept

Claude Site Builder transforme les materiaux d'un client (notes de reunion, briefs, captures d'ecran, contenus existants) en un site web complet : specifications metier, brief design, site Next.js et configuration de deploiement.

## Comment ca marche

Le workflow se deroule en **5 commandes** :

```
/new-project [client]  →  deposer les sources  →  /generate [client]  →  /design [client]  →  /build [client]  →  discussion/iteration  →  /deploy [client]
```

### Etape 1 — `/new-project [client]`

Cree le dossier du projet avec les sous-dossiers `sources/`, `sources/design/` et `pages/`.

```
projets/mon-client/
├── sources/          ← deposez vos materiaux ici
│   └── design/       ← references visuelles (logos, moodboards, palettes)
└── pages/            ← fiches pages generees ici
```

Deposez ensuite vos materiaux dans `sources/` : notes de reunion, briefs existants, captures d'ecran, contenus, images du logo, tout ce qui decrit le projet.

### Etape 2 — `/generate [client]`

Claude analyse toutes les sources et procede en 6 phases :

1. **Confirmation** — liste les fichiers trouves dans `sources/`
2. **Analyse** — lit tout, classe les informations par 6 axes (identite, objectifs, cible, contenu, fonctionnalites, contraintes)
3. **Recapitulatif** — presente une synthese + la liste de pages proposees + toutes les questions manquantes en un seul message
4. **Echange** — vous repondez, Claude ajuste, vous validez
5. **Generation** — produit toutes les fiches pages d'un coup (coherence du maillage garantie)
6. **Verification** — controle interne avant livraison

Chaque projet inclut au minimum **7 pages obligatoires** : Accueil, Menu, Header, Footer, Contact, A propos, Glossaire.

### Etape 3 — `/design [client]`

Claude genere le brief design a partir des fiches pages et des sources visuelles :

1. **Inventaire** — lit les fiches pages et les sources design
2. **Questionnaire visuel** — palette, typographie, ambiance, references
3. **Generation** — ecrit `DESIGN.md` (palette, typo, ambiance, direction composants)
4. **Verification** — coherence tonale, hex valides, polices existantes

Produit : `docs/projets/[client]/DESIGN.md`

### Etape 4 — `/build [client]`

Claude genere le site Next.js complet :

1. **Verification** — fiches pages, DESIGN.md, template
2. **Questions techniques** — contenu, i18n, SEO/analytics, media
3. **Lecture** — charge fiches + design + template, construit les routes en memoire
4. **Generation** — genere le projet dans `apps/[client]/`
5. **Build** — compile le projet (max 3 tentatives)
6. **Livraison** — recap + commande pour lancer en local

Stack : Next.js 15, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Framer Motion.

Produit : `apps/[client]/` + `docs/projets/[client]/BUILD.md`

### Etape 5 — `/deploy [client]`

Claude configure le deploiement selon le mode choisi :

1. **Verification** — le build passe
2. **Questions** — type (Vercel / Docker / export statique), domaine, variables d'env
3. **Generation** — fichiers de deploiement selon le type
4. **Livraison** — recap + instructions

Produit : fichiers de deploiement dans `apps/[client]/` + `docs/projets/[client]/DEPLOY.md`

## Ce que produit Claude Site Builder

### Fiches pages (`/generate`)

Pour chaque client, un dossier de fiches pages dans `projets/[client]/pages/` :

| Section | Contenu |
|---|---|
| Informations generales | Nom, slug, type, priorite |
| Objectifs | Principal, secondaires, KPIs |
| Structure de la page | Description zone par zone |
| Wireframe ASCII | Schema visuel de la page |
| Composants fonctionnels | Tableau des composants |
| Contenu editorial | H1, H2, messages cles, ton |
| CTA | Boutons d'action avec destinations |
| Maillage interne | Liens entrants/sortants, transversaux, parcours utilisateurs |
| SEO | Meta title, description, mots-cles |
| Notes | Points d'attention |

### Fichiers de suivi

| Fichier | Genere par | Contenu |
|---|---|---|
| `DESIGN.md` | `/design` | Palette, typographie, ambiance, direction composants |
| `BUILD.md` | `/build` | Config technique, routes, decisions |
| `DEPLOY.md` | `/deploy` | Type de deploiement, domaine, variables, instructions |

## Structure du projet

```
Claude Site Builder/
├── CLAUDE.md                       # Instructions centrales
├── README.md                       # Ce fichier
├── .claude/skills/                 # Les 5 commandes du workflow
│   ├── new-project/SKILL.md
│   ├── generate/SKILL.md
│   │   └── questions-reference.md  # Grille d'analyse (6 blocs)
│   ├── design/SKILL.md
│   ├── build/SKILL.md
│   └── deploy/SKILL.md
├── docs/
│   ├── templates/
│   │   ├── pages/                  # Templates de fiches pages
│   │   │   ├── _base-page.md
│   │   │   ├── accueil.md          # 7 templates obligatoires
│   │   │   ├── menu.md
│   │   │   ├── header.md
│   │   │   ├── footer.md
│   │   │   ├── contact.md
│   │   │   ├── a-propos.md
│   │   │   └── glossaire.md
│   │   ├── examples/
│   │   │   └── example-page-accueil.md
│   │   └── base-nextjs-vitrine.md  # Template architecture Next.js
│   └── projets/                    # Sortie — un dossier par client
│       └── [nom-client]/
│           ├── sources/
│           │   └── design/         # References visuelles
│           ├── pages/              # Fiches pages generees
│           ├── DESIGN.md           # Brief design
│           ├── BUILD.md            # Config technique
│           ├── DEPLOY.md           # Config deploiement
│           └── todo.md             # Informations manquantes
├── apps/                           # Sites web generes
│   └── [nom-client]/              # Site Next.js genere par /build
└── packages/                       # Libs partagees
```

## Conventions

- **Langue** : tout est en francais
- **Nommage** : `kebab-case`, sans accents (`a-propos.md`, `boulangerie-martin`)
- **Manques** : centralises dans `todo.md` (jamais dans les fiches pages)

## Prerequis

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installe et configure
- Un terminal dans le dossier `Claude Site Builder/`

## Utilisation rapide

```bash
# 1. Creer le projet
/new-project boulangerie-martin

# 2. Deposer vos sources dans projets/boulangerie-martin/sources/
#    (notes de reunion, briefs, captures d'ecran...)

# 3. Generer les fiches pages
/generate boulangerie-martin

# 4. Generer le brief design
/design boulangerie-martin

# 5. Generer le site Next.js
/build boulangerie-martin

# 6. Iterer sur le site (demandez des modifications)

# 7. Configurer le deploiement
/deploy boulangerie-martin
```
