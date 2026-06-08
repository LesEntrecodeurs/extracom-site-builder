# Claude Site Builder — De l'analyse des sources au deploiement

## Description

Claude Site Builder est un workflow Claude Code pour creer des sites web, de l'analyse des sources client jusqu'au deploiement. Le workflow couvre les specifications metier, le brief design, la generation du site et la configuration du deploiement.

## Langue

Toutes les interactions, fichiers générés et spécifications sont en **français**. Tout texte en français (contenu éditorial, labels, messages, alt, meta, commentaires de code orientés utilisateur) doit utiliser les **accents** correctement (é, è, ê, à, ù, ç, etc.). Pas de texte sans accents quand la langue est le français.

## Structure du projet

```
Claude Site Builder/
├── CLAUDE.md                          # Ce fichier — instructions centrales
├── package.json                       # Root — Yarn workspaces + Turbo
├── turbo.json                         # Configuration Turborepo
├── .claude/skills/                    # Skills du workflow (8 commandes)
│   ├── new-project/SKILL.md           # /new-project [client]
│   ├── generate/SKILL.md              # /generate [client]
│   │   └── questions-reference.md     # Grille d'analyse (6 blocs)
│   ├── variants/SKILL.md              # /variants [client] — 3 directions visuelles avant design
│   ├── design/SKILL.md               # /design [client]
│   ├── build/SKILL.md                # /build [client]
│   ├── deploy/SKILL.md               # /deploy [client]
│   ├── audit/SKILL.md                # /audit [client]
│   └── frontend-design/SKILL.md      # Skill Anthropic — anti-generic + direction esthetique
├── docs/                              # Workspace @claude-site-builder/docs
│   ├── package.json                   # Workspace package
│   ├── templates/
│   │   ├── pages/                     # Templates de fiches pages
│   │   │   ├── _base-page.md          # Template de base (herite par tous)
│   │   │   ├── accueil.md             # Pages obligatoires (7)
│   │   │   ├── menu.md
│   │   │   ├── header.md
│   │   │   ├── footer.md
│   │   │   ├── contact.md
│   │   │   ├── a-propos.md
│   │   │   └── glossaire.md
│   │   ├── examples/                  # Exemples remplis
│   │   │   └── example-page-accueil.md
│   │   ├── base-nextjs-vitrine.md     # Template architecture Next.js
│   │   └── base-workflow-docker.md   # Template workflows CI/CD Docker
│   └── projets/                       # Sortie — un dossier par client
│       └── [nom-client]/
│           ├── sources/               # Materiaux deposes par le client
│           │   └── design/            # References visuelles (logos, moodboards, palettes)
│           ├── pages/                 # Fiches pages generees
│           ├── DESIGN.md              # Brief design (palette, typo, ambiance)
│           ├── BUILD.md               # Config technique (stack, i18n, SEO, decisions)
│           ├── DEPLOY.md              # Config deploiement (type, domaine, variables)
│           └── todo.md                # Informations manquantes a fournir
├── apps/                              # Workspace apps/* — sites web generes
│   └── [nom-client]/                  # Site Next.js genere par /build
└── packages/                          # Workspace packages/* — libs partagees
```

## Workflow (7 etapes)

### Etape 1 — `/new-project [nom-client]`
Initialise le dossier du client dans `docs/projets/` avec les sous-dossiers `sources/`, `sources/design/` et `pages/`. L'utilisateur depose ensuite ses materiaux dans `sources/`.

### Etape 2 — `/generate [nom-client]`
Analyse toutes les sources, presente un recapitulatif avec les questions manquantes, puis genere l'ensemble des fiches pages dans `pages/`.

Le processus de generation suit 6 phases :
1. **Confirmation** — verifie les sources presentes
2. **Analyse** — lit tout le contenu de `sources/`, classe par les 6 axes
3. **Recapitulatif** — synthese + liste de pages proposees + questions manquantes
4. **Echange** — l'utilisateur repond, valide la liste de pages
5. **Generation** — genere toutes les pages en memoire (pour coherence maillage), puis ecrit
6. **Verification** — controle interne avant livraison

### Etape 3 — `/variants [nom-client]`
Genere **N directions visuelles tranchees** (par defaut 3, configurable via questionnaire). Chaque direction produit deux livrables : une fiche markdown **et un prototype HTML standalone** (ouvrable dans un navigateur, 4 sections minimum avec contenu reel des fiches pages). Produit `VARIANT.md` avec bloc YAML `questionnaire` memorisant les choix.

Le processus suit 5 phases :
1. **Lecture** — fiches pages, sources, 2-3 derniers DESIGN.md (anti-convergence)
2. **Questionnaire structure** — 8 questions via `AskUserQuestion` (direction esthetique, palette, typo, style hero, ton copy, animation, originalite, nombre de variations) + 2 textareas libres (sites inspirants, elements a conserver/eviter)
3. **Generation** — N directions nettement differentes + fichiers HTML standalone dans `docs/projets/[nom-client]/variants/direction-[N]-[slug].html`
4. **Presentation** — N fiches cote a cote + liens vers prototypes, l'utilisateur choisit via `AskUserQuestion`
5. **Sauvegarde** — ecrit `VARIANT.md` avec la direction validee + bloc `questionnaire` (consomme par `/design` pour ne pas reposer les questions deja tranchees)

Reference : `.claude/skills/frontend-design/SKILL.md` (skill Anthropic).

### Etape 4 — `/design [nom-client]`
Genere le brief design complet a partir des fiches pages et de `VARIANT.md`. Produit `DESIGN.md` avec palette, typographie, ambiance et direction des composants.

Le processus suit 4 phases :
1. **Inventaire** — lit les fiches pages, les sources design, et **priorite absolue a `VARIANT.md`** s'il existe (direction deja validee par l'utilisateur)
2. **Questionnaire visuel** — si VARIANT.md present, ne reposer que les questions restantes (assets, references complementaires). Sinon, questionnaire complet avec Question 0 sur la direction esthetique
3. **Generation** — ecrit `DESIGN.md` (6 sections) en utilisant VARIANT.md comme socle non negociable
4. **Verification** — hex valides, coherence tonale, polices existantes

### Etape 5 — `/build [nom-client]`
Genere le site Next.js complet dans `apps/[nom-client]/` a partir des fiches pages, du brief design et du template de base.

Le processus suit 6 phases :
1. **Verification** — fiches pages, DESIGN.md, template
2. **Questions techniques** — contenu, i18n, SEO/analytics, media
3. **Lecture** — charge fiches + DESIGN.md + template, construit routes/composants en memoire
4. **Generation** — genere le projet Next.js dans `apps/[nom-client]/`
5. **Build** — `yarn install` + build (max 3 tentatives)
6. **Livraison** — recap + commande dev

### Etape 6 — `/deploy [nom-client]`
Configure le deploiement du site selon le mode choisi (Vercel, Docker ou export statique).

Le processus suit 4 phases :
1. **Verification** — projet existe, build passe
2. **Questions** — type de deploiement, domaine, variables d'environnement (+ questions specifiques Docker si applicable)
3. **Generation** — fichiers de deploiement + `DEPLOY.md`. En mode Docker, genere aussi les workflows CI/CD GitHub Actions (reference : `docs/templates/base-workflow-docker.md`)
4. **Livraison** — recap + instructions

### Etape post-build — `/refine [nom-client] [scope]`
Skill d'iteration ciblee apres `/build`. Remplace les modifications ad hoc ("Claude, change ça") par un workflow structure :
1. **Scope** — choisir via `AskUserQuestion` : composant / section / page / site entier
2. **Type** — visuel / contenu / structure / technique
3. **Plan** — lister les fichiers a toucher (code + fichiers de suivi)
4. **Application** — charger uniquement le contexte necessaire, editer, synchroniser les fiches pages + DESIGN.md + BUILD.md + JSON-LD + llms.txt selon la regle de synchronisation
5. **Livraison** — recap concis, pas de build automatique

Se declenche aussi en langage naturel ("retouche cette card", "change cette section", "ajoute un bloc X").

Redirige vers `/restyle` si la demande touche a la direction artistique globale (couleurs dominantes, typographie, ambiance).

### Etape post-build — `/restyle [nom-client]`
Skill de changement de direction artistique globale. Pour "change la couleur primaire partout", "nouvelle typo pour tout le site", "rebranding", "refresh du look". Processus en 6 phases :
1. **Snapshot** — lit VARIANT.md + DESIGN.md + tokens + grep des hex hardcodes
2. **Questionnaire** (AskUserQuestion) — quoi changer (palette/typo/les deux/ambiance) + intensite (leger/marque/refonte totale)
3. **Proposition** — nouvelle palette complete ou pair typo, avec preview avant/apres, liste des fichiers impactes
4. **Validation** — diff synthetique, confirmation via `AskUserQuestion`
5. **Application** — MAJ VARIANT.md + DESIGN.md + globals.css + tailwind.config + remplacement des hex hardcodes + opengraph-image + llms.txt
6. **Livraison** — recap avec liste des points a verifier manuellement (contrastes, opengraph, JSON-LD)

Redirige vers `/refine` si modification localisee a un composant. Propose `/variants` si refonte totale.

Archive le changement en fin de VARIANT.md (bloc `restyled_at`, `previous_primary`, `reason`) pour rollback si besoin.

### Etape 7 — `/audit [nom-client]`
Audite le site genere sur 7 axes : SEO technique, SEO on-page, GEO (Generative Engine Optimization), CRO (conversion), accessibilite, performance et coherence fiches/code. Produit un rapport avec scores et actions prioritaires.

Le processus suit 5 phases :
1. **Verification** — projet existe, build passe, chargement du contexte
2. **Audit SEO technique** — sitemap, robots, JSON-LD, meta elements, semantique HTML
3. **Audit SEO on-page & contenu + GEO** — mots-cles, maillage, coherence fiches/code, optimisation pour les moteurs IA
4. **Audit CRO, accessibilite & performance** — test des 5 secondes, CTA, signaux de confiance, a11y, images
5. **Rapport** — scores par axe (7 axes), problemes critiques, recommandations, proposition de correction automatique

## Fichiers de suivi par projet

Chaque etape du workflow genere un fichier de suivi dans `docs/projets/[client]/` :

| Fichier | Genere par | Contenu |
|---|---|---|
| `DESIGN.md` | `/design` | Palette, typographie, ambiance, direction composants, references |
| `BUILD.md` | `/build` | Config technique (i18n, SEO, analytics, stack), routes, decisions |
| `DEPLOY.md` | `/deploy` | Type de deploiement, domaine, variables d'env, instructions |
| `AUDIT.md` | `/audit` | Scores par axe, problemes critiques, recommandations, corrections |
| `todo.md` | `/generate` | Elements manquants mentionnes dans les sources |

Ces fichiers documentent les decisions prises a chaque etape et servent de reference pour les re-generations.

**Regle de synchronisation** : quand l'utilisateur demande une modification sur le site (code, contenu, structure, design, config...), toujours mettre a jour **tous les fichiers impactes** en meme temps que le code. Les fichiers doivent toujours refleter l'etat actuel du projet :

- **Modification de contenu/structure** (ajout/suppression de page, changement de texte, CTA, maillage) → mettre a jour les **fiches pages** dans `docs/projets/[client]/pages/`
- **Modification de design** (couleurs, typographie, composants, espacement) → mettre a jour **DESIGN.md**
- **Modification technique** (i18n, analytics, routes, dependances) → mettre a jour **BUILD.md**
- **Modification deploiement** (domaine, variables env, type de deploy) → mettre a jour **DEPLOY.md**

**Regle de propagation** : quand une page est ajoutee, supprimee ou renommee, propager le changement partout :

1. **Fiche page** — creer/supprimer/modifier la fiche dans `docs/projets/[client]/pages/`
2. **Menu** — mettre a jour la fiche `menu.md` et le composant de navigation dans le code (`navigation.ts`, Header, Footer)
3. **Header/Footer** — si la page doit apparaitre dans le header ou le footer, mettre a jour les fiches `header.md`/`footer.md` et les composants correspondants
4. **Maillage interne** — mettre a jour les liens entrants/sortants dans les fiches des pages liees
5. **Code** — creer/supprimer la route, le module, les sections dans `apps/[client]/src/`
6. **BUILD.md** — mettre a jour la table des routes
7. **Sitemap** — verifier que la nouvelle page est incluse (ou exclue si supprimee)
8. **JSON-LD** — mettre a jour le BreadcrumbList si la hierarchie change

9. **llms.txt** — mettre a jour `apps/[client]/public/llms.txt` quand : ajout/suppression de pages importantes, changement de chiffres cles (clients, collaborateurs, annees), ajout/modification de services ou secteurs, changement d'informations de contact. Ce fichier est la fiche d'identite du site pour les LLM — il doit toujours refleter l'etat actuel du site

Ne jamais creer une page sans la rendre accessible depuis la navigation. Ne jamais supprimer une page sans nettoyer les liens qui pointent vers elle.

En cas de doute, mettre a jour. Un fichier de suivi obsolete est plus nuisible qu'une mise a jour de trop.

## Stack technique

Le `/build` genere des sites avec la stack suivante (reference : `docs/templates/base-nextjs-vitrine.md`) :

- **Framework** : Next.js 15, React 19, TypeScript
- **Styling** : Tailwind CSS 4, shadcn/ui
- **Animations** : CSS natif (Tailwind `animate-*`, `transition-*`, `@keyframes`) + `tailwindcss-animate` — ne pas utiliser Framer Motion
- **i18n** : next-intl (si multilingue)
- **Formulaires** : React Hook Form + Zod
- **SEO** : generateMetadata natif Next.js

## Pages obligatoires (7)

Chaque projet doit contenir au minimum ces 7 pages :

1. **Accueil** — page d'entree du site
2. **Menu** — structure de navigation
3. **Header** — en-tete du site
4. **Footer** — pied de page
5. **Contact** — formulaire et informations de contact
6. **A propos** — presentation de l'entreprise
7. **Glossaire** — termes metier et definitions SEO

## Pages conditionnelles

Ces pages sont ajoutees selon les besoins identifies dans les sources :

- **Blog** — si le client prevoit du contenu editorial
- **Produit/Service** — si le client a des offres a detailler
- **FAQ** — si des questions frequentes sont identifiees
- **Temoignages** — si le client a des retours clients a valoriser
- **Landing page** — si des campagnes de conversion sont prevues
- **Page generique** — pour tout autre besoin specifique

Pour les pages conditionnelles, utiliser le template `docs/templates/pages/_base-page.md` comme base et adapter les sections au besoin specifique.

## Contenu de chaque fiche page

Chaque fiche page generee contient ces 10 sections :

1. **Informations generales** — nom, slug, type, priorite, statut
2. **Objectifs** — objectif principal, secondaires, KPIs
3. **Structure de la page** — description zone par zone (fonction, contenu, comportement)
4. **Wireframe ASCII** — representation schematique de la page, fidele aux zones
5. **Composants fonctionnels** — tableau des composants avec obligatoire oui/non
6. **Contenu editorial** — H1, H2, messages cles, ton et style
7. **Appels a l'action (CTA)** — tableau des CTA avec texte, destination, priorite
8. **Maillage interne** — liens entrants/sortants (tableaux avec ancre et type), liens transversaux (header/menu/footer), parcours utilisateurs passant par cette page
9. **SEO** — meta title, meta description, mots-cles, intention de recherche
10. **Notes et remarques** — points d'attention specifiques

## Principes transversaux (obligatoires sur tous les projets)

Ces 5 regles s'appliquent a **toutes** les etapes du workflow (`/generate`, `/design`, `/build`, `/audit`, `/deploy`). Aucun arbitrage ne peut les sacrifier.

### 1. Mobile-first systematique

Tout le CSS/Tailwind se developpe en **mobile-first** :
- Les classes de base (sans prefixe) ciblent mobile (375px)
- Les breakpoints progressent : `sm:` → `md:` → `lg:` → `xl:`
- Jamais de classes desktop par defaut surchargees ensuite pour mobile
- Tester systematiquement en 375px (iPhone SE) avant de valider une page
- Les layouts grid/flex s'empilent en mobile (`grid-cols-1`) et se deploient aux breakpoints (`md:grid-cols-3`)
- Les marges/paddings utilisent la progression (`py-12 md:py-20`)

**Le build et l'audit doivent verifier qu'aucune page ne casse en mobile.**

### 2. SEO et GEO prioritaires

Aucune decision visuelle, technique ou de contenu ne peut sacrifier le SEO/GEO :
- H1 unique par page, hierarchie H2→H6 respectee sans saut
- `generateMetadata` complet sur chaque page (title + description + canonical + OG + Twitter)
- Contenu en HTML serveur (SSR/SSG) — pas de contenu visible uniquement en JS client
- Mots-cles places : H1, 100 premiers mots, 2-3 H2, meta title, meta description, slug URL
- Maillage interne dense avec ancres descriptives (jamais "cliquez ici")
- Ton hybride GEO/CRO applique (voir section dediee)
- `llms.txt` present et a jour pour les crawlers IA
- `robots.ts` autorise GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended

### 3. Schemas JSON-LD obligatoires

**Tous les elements techniques SEO doivent etre mis en place** sur chaque page, sans exception :
- Matrice JSON-LD (voir plus bas) — respecter strictement selon le type de page
- `Organization`, `WebSite`, `LocalBusiness` sur l'accueil (si adresse)
- `BreadcrumbList` sur toutes les pages sauf home
- `FAQPage` des qu'une page contient un bloc FAQ (meme en bas de page)
- `Article`, `Service`, `DefinedTerm`, `CreativeWork`... selon la matrice
- Helpers centralises dans `src/lib/jsonld.ts`
- `sitemap.xml` inclut toutes les pages indexables
- `robots.txt` genere
- Images `opengraph-image.tsx` et `twitter-image.tsx` a la racine de `src/app/`

L'audit doit refuser de valider une page sans ses JSON-LD.

### 4. Direction esthetique obligatoire

`/design` commence **toujours** par la question d'une direction esthetique tranchee **avant** palette et typographie :
- Proposer 3-5 directions adaptees au secteur (editorial/magazine, brutalist/raw, luxe/raffinee, retro-futuriste, organique/naturelle, maximaliste/chaotique, minimaliste/industrielle, playful/ludique...)
- Pas de "moderne et epure" generique comme reponse par defaut
- Reference : `.claude/skills/frontend-design/SKILL.md` (adaptation FR du skill Anthropic)
- Anti-generique systematique : refuser polices Inter/Roboto/Arial/systeme, refuser gradients violets sur fond blanc, refuser composants cookie-cutter

### 5. Diversifier le style entre projets

Chaque client doit avoir une signature visuelle **unique**. Ne jamais converger sur les memes patterns :
- Varier les heros : typographie massive, photo immersive, split asymetrique, stats bande, quote centree, mosaique...
- Varier les layouts : card grid, liste divisee flat, sections alternees bg-white/bg-background, sections full-width, asymetrique titre/description
- Varier les composants : cards blanches, bandes horizontales, rangees divisees, callouts soft
- Varier les palettes : JAMAIS 2 clients consecutifs avec la meme base couleur + meme typo
- Varier les patterns decoratifs : grid, dots, rings, lines-h, waves, stripes — un par client

**Regle anti-convergence** : avant de lancer `/design` ou `/build`, verifier que le resultat envisage n'est pas le meme que les 2-3 derniers projets. Si similaire, changer de direction.

### 6. FAQ obligatoire sur chaque page (sauf legales)

Chaque page du site (hors mentions legales / politique de confidentialite / header / footer / menu) doit inclure un **bloc FAQ de 3 a 6 questions** contextuelles au contenu de la page.

**Regles de generation des FAQ :**
- Questions formulees en 3eme personne avec le nom de marque pour le GEO : "Comment [Marque] accompagne-t-elle les [cible] ?" (voir section "Regle de ton — voix hybride")
- Reponses answer-first (1ere phrase = reponse directe, 40-60 mots), puis details
- Entre 3 et 6 questions par page, contextuelles au sujet de la page
- Les questions doivent couvrir les objections, les doutes frequents et les precisions pratiques
- Copier-coller interdit entre pages : chaque FAQ est specifique a sa page

**Maillage interne via les FAQ — OBLIGATOIRE :**

Si une reponse est developpee sur une autre page du site, la reponse FAQ doit :
1. Donner une reponse breve et auto-suffisante (answer-first)
2. Ajouter un lien interne vers la page qui traite le sujet en profondeur
3. Utiliser une ancre descriptive (jamais "cliquez ici" ou "en savoir plus" seul)

Exemple :
> « Oui, le cabinet est conventionne secteur 1 — aucun depassement n'est pratique. Pour le detail des remboursements, consultez [notre page Tarifs](/tarifs) ou [la prise en charge par l'Assurance Maladie](/tarifs#prise-en-charge). »

**JSON-LD FAQPage obligatoire** sur toute page qui contient un bloc FAQ :
- Schema `FAQPage` avec `mainEntity` contenant chaque Q/A
- Integre via le helper `src/lib/jsonld.ts`
- La matrice JSON-LD (ci-dessous) est mise a jour en consequence : toute page avec bloc FAQ combine `FAQPage` avec les autres schemas de son type

### 7. Auto-diagnostic et propositions proactives sur VARIANT.md / DESIGN.md

Avant de lancer `/build` ou `/audit`, **inspecter** `docs/projets/[nom-client]/VARIANT.md` et `DESIGN.md`. Si l'un des deux est :
- **Incomplet** (sections vides, palette partielle, polices non specifiees, pas de signature)
- **Generique** (propose les polices interdites Inter/Roboto/Arial, palette "moderne epure" sans differenciation, pas de direction esthetique tranchee)
- **Incoherent** avec les fiches pages (ton editorial qui ne matche pas, secteur mal interprete)
- **Converge** avec les 2-3 derniers projets (memes patterns, memes polices, meme palette base)

Alors **ne pas se contenter de suivre le fichier tel quel**. Proposer proactivement :
- 1 diagnostic court (ce qui manque ou coince)
- 2-3 propositions concretes d'amelioration (direction alternative, polices distinctives, palette plus affirmee, signature visuelle manquante...)
- Demander confirmation avant d'ecrire la nouvelle version

Exemple :
> « Ton DESIGN.md propose Inter + palette bleue generique — ca va converger avec les 2 derniers cabinets medicaux. Je peux te proposer :
> 1. Fraunces + Manrope, palette sauge/terracotta (organique medical)
> 2. Instrument Serif + Inter Display, navy + accent corail (editorial serieux)
> 3. DM Serif + Work Sans, blanc + jaune-ambre (luxe rassurant)
> Tu veux que j'en applique une ou tu preferes autre chose ? »

**Ne jamais livrer un site en sachant que le VARIANT/DESIGN est mauvais** — le recadrage fait partie du role.

### 8. Composants reutilisables et fichiers sous 200 lignes

Regle de **qualite de code** appliquee a tous les sites generes (`/build`) et a toutes les modifications manuelles sur des projets clients :

**Composants reutilisables — obligatoire** :
- Tout pattern visuel qui apparait sur 2 pages ou plus doit etre un **composant partage** dans `src/components/ui/`
- Exemples : `PageFaq`, `FinalCta`, `Hero*`, `SectionHeader`, `StatsBand`, `AsymmetricHeading`, cards avec variantes...
- Les donnees (Q/R, labels, copy) sont dans `src/data/*.ts` — **pas** hardcodees dans les composants
- Chaque composant a une API claire (`props` typees) et documente son usage si non trivial

**Limite de 200 lignes par fichier — cible** :
- **200 lignes = cible** pour tout fichier (composant, page, section, data)
- Au-dela de 200 lignes : **decouper** en sous-composants ou extraire des utilitaires
- Les fichiers `sections/*.tsx` avec beaucoup de contenu hardcode doivent extraire les donnees vers `data/*.ts`
- Exception : fichiers de **donnees pures** (`page-faqs.ts`, `glossary.ts`) peuvent depasser 200 lignes — c'est du contenu, pas du code logique
- Exception : fichiers de config Tailwind / Next.js si necessaire

**Pourquoi** :
- Relecture : un fichier > 200 lignes est plus difficile a reviser et a maintenir
- Reutilisation : plus c'est granulaire, plus c'est reutilisable entre projets
- Performance Next.js : les composants plus petits sont plus faciles a traiter (tree-shaking, code-splitting)
- Collaboration : limite les conflits git

**Signaux de non-conformite** a detecter dans `/audit` et `/build` :
- Fichiers `.tsx` depassant 200 lignes (hors data)
- Meme section (Hero, FAQ, CTA) re-implementee dans plusieurs modules au lieu d'utiliser un composant partage
- Duplication de JSX similaire a 80%+ entre 2 fichiers
- Donnees hardcodees dans un composant alors qu'elles sont partagees

**Ne pas sur-decouper** : le code doit rester lisible. Un fichier de 180 lignes coherent vaut mieux que 3 fichiers de 60 lignes artificiellement separes.

### 9. Pas de commentaires dans le code

Regle par defaut sur **tout code genere** (pages Next.js, composants, helpers, hooks, data files, scripts) :

**Ne pas ecrire de commentaires** — code auto-documente via des identifiants clairs (noms de variables, fonctions, composants expressifs). Les exceptions sont **strictes** :

**Commentaires autorises** (rares) :
- **Contrainte cachee** : hack temporaire lie a un bug externe (ex: `// workaround Safari 17.2 crash on backdrop-filter`)
- **Invariant subtil** : regle metier non evidente pour un lecteur futur (ex: `// DDR doit etre < today-4w, sinon le calculateur divise par zero`)
- **Pourquoi un code semble bizarre** : explication breve si le code serait "reecrit" par un relecteur peu attentif

**Commentaires INTERDITS** :
- Commentaires qui decrivent ce que le code fait ("// Loop over items" au-dessus d'un `.map`)
- Commentaires de section (`// ==== Header ====`)
- JSDoc / TSDoc multi-lignes sur des fonctions simples
- Commentaires qui referencent le ticket / issue / PR (`// Fixes #123`) — ca va dans le commit message
- TODO / FIXME / XXX — ouvrir un ticket a la place
- Commentaires qui paraphrasent le nom de la variable/fonction

**Application dans les fichiers generes** :
- `/build` : le code Next.js genere ne contient aucun commentaire (sauf exceptions ci-dessus)
- `/audit` : signaler comme **quick win** la presence de commentaires superflus
- Modifications manuelles : si tu edites un fichier qui a des commentaires pre-existants, ne pas en ajouter. Supprimer ceux qui sont paraphrasiques.

**Pourquoi** :
- Les bons noms valent mieux que les commentaires
- Les commentaires se desynchronisent du code
- Le code bien ecrit n'a pas besoin d'etre explique ligne par ligne

---

## Regles de generation

1. **Ne rien inventer** — travailler exclusivement a partir des sources. Ne pas ajouter de contenus, pages, fonctionnalites ou besoins absents des sources. Si une info manque, utiliser un contenu neutre (`—`, `#`) sans le signaler
2. **Remplir toutes les sections** de chaque template — ne rien laisser vide
3. **Adapter au client** — chaque contenu doit refleter les sources et le secteur d'activite
4. **Todo minimal** — ne jamais ecrire `[A COMPLETER]` dans les fiches pages. Le fichier `todo.md` ne liste que les elements explicitement evoques dans les sources mais non fournis (ex: URL mentionnee en interview mais non transmise). Ne pas inventer de besoins. Si rien ne manque, ne pas creer le fichier
5. **Suggerer d'ajouter des sources** — si des informations seraient utiles, proposer a l'utilisateur de deposer des sources supplementaires dans `sources/` plutot que de creer des listes de besoins
6. **Coherence du maillage** — les liens entre pages, les CTA et le maillage doivent etre coherents (pas de lien vers une page inexistante)
7. **Wireframes fideles** — chaque wireframe ASCII doit correspondre aux zones decrites dans la structure
8. **Pas de technique/design dans les fiches pages** — les fiches pages restent au niveau metier (contenu, objectifs, structure fonctionnelle). Le design est dans `DESIGN.md`, la technique dans `BUILD.md`
9. **SEO a 100%** — le code genere doit etre optimise SEO de bout en bout : semantique HTML (h1-h6 hierarchiques, article, section, nav, main, aside), `generateMetadata` complet sur chaque page, balises Open Graph et Twitter Cards, JSON-LD (voir matrice ci-dessous), sitemap.xml, robots.txt, images avec alt descriptifs, liens internes avec ancres pertinentes, URLs propres, performance (lazy loading, next/image)

   **Image de partage OG/Twitter obligatoire** — chaque site genere doit inclure `src/app/opengraph-image.tsx` et `src/app/twitter-image.tsx` a la racine de l'app. Ces fichiers utilisent `ImageResponse` de `next/og` pour generer dynamiquement une image de partage brandee (1200x630, PNG) avec les couleurs et le nom du client. Next.js genere automatiquement les meta tags `og:image` et `twitter:image`. Ne pas mettre `images` manuellement dans le bloc `openGraph` du layout

   **Matrice JSON-LD obligatoire par type de page** — chaque page generee doit inclure les schemas JSON-LD correspondants. Verifier systematiquement apres generation que chaque page a ses schemas :

   | Type de page | JSON-LD obligatoires |
   |---|---|
   | Accueil | `WebSite`, `Organization`, `LocalBusiness` (si adresse physique) |
   | A propos | `WebPage`, `BreadcrumbList` |
   | Contact | `WebPage`, `BreadcrumbList`, `ContactPage` |
   | FAQ | `WebPage`, `BreadcrumbList`, `FAQPage` |
   | Service (liste) | `WebPage`, `BreadcrumbList`, `OfferCatalog` |
   | Service (detail) | `WebPage`, `BreadcrumbList`, `Service` |
   | Secteur / Landing | `WebPage`, `BreadcrumbList`, `FAQPage` (si bloc FAQ present) |
   | Page ville / locale | `WebPage`, `BreadcrumbList`, `LocalBusiness`, `FAQPage` (si bloc FAQ present) |
   | Portfolio (liste) | `WebPage`, `BreadcrumbList`, `ItemList` |
   | Portfolio (detail) | `WebPage`, `BreadcrumbList`, `CreativeWork` |
   | Glossaire (liste) | `WebPage`, `BreadcrumbList` |
   | Glossaire (detail) | `WebPage`, `BreadcrumbList`, `DefinedTerm` |
   | Blog (liste) | `WebPage`, `BreadcrumbList`, `ItemList` |
   | Blog (article) | `WebPage`, `BreadcrumbList`, `Article` |
   | Mentions legales | `WebPage`, `BreadcrumbList` |
   | Politique confidentialite | `WebPage`, `BreadcrumbList` |

   Toute page qui contient un bloc FAQ en bas de page doit aussi inclure `FAQPage`. Les helpers JSON-LD doivent etre centralises dans `src/lib/jsonld.ts`
10. **Accents obligatoires** — tout texte en francais dans le code (contenu, labels, aria-labels, alt, meta descriptions, titres, placeholders, messages d'erreur) doit comporter les accents corrects. Ecrire "Découvrez nos réalisations" et non "Decouvrez nos realisations"
11. **Seuil de 1000 mots par page (non bloquant)** — chaque page generee (hors header, footer, menu, mentions legales) devrait idealement contenir au moins **1000 mots** de contenu visible pour un bon referencement SEO. Cette regle n'est **pas bloquante** : si une page est en dessous du seuil, **signaler explicitement a l'utilisateur** quelles pages sont concernees et lui demander s'il souhaite fournir du contenu supplementaire pour les enrichir. Proposer des suggestions adaptees au contexte de la page (temoignages clients, bloc FAQ, chiffres cles, etude de cas, avantages detailles, comparatif, bloc de reassurance). L'utilisateur decide s'il enrichit ou non
12. **Glossaire obligatoire avec pages individuelles et tooltips** — tout site comportant un glossaire doit implementer le systeme complet suivant :
    - **Donnees centralisees** dans `src/data/glossary.ts` avec le type `GlossaryTerm` incluant : `term`, `slug`, `definition`, `longDescription` (2-3 paragraphes), `example`, `relatedPage?`, `relatedTerms`
    - **Pages individuelles** `/glossaire/[slug]` pour chaque terme, generees statiquement (`generateStaticParams`), avec `generateMetadata`, JSON-LD (`WebPage` + `BreadcrumbList` + `DefinedTerm`), breadcrumb, description longue, exemple concret, termes lies
    - **Tooltips automatiques** via `linkifyGlossaryTerms()` dans `src/lib/linkify.tsx` : detection automatique des termes du glossaire dans le texte, lien avec bordure pointillee et bulle de definition au survol pointant vers la page individuelle
    - **Composant `GlossaryTooltip`** dans `src/components/ui/glossary-tooltip.tsx` : lien discret + bulle au hover avec definition tronquee et CTA "Voir dans le glossaire"
    - **Application systematique** : appeler `linkifyGlossaryTerms(text)` dans tous les paragraphes de contenu du site (descriptions, FAQ, sections informatives). Ne pas appliquer aux titres (h1-h6), boutons ou labels UI
    - **Aliases de termes** : chaque terme peut avoir plusieurs variantes textuelles a matcher (pluriels, casses, abreviations). Les aliases sont configures dans `TERM_ALIASES` dans `linkify.tsx`
    - **Page index** `/glossaire` : noms des termes cliquables vers les pages individuelles, definitions linkifiees, recherche client-side, index alphabetique
    - **Sitemap** : inclure toutes les URLs `/glossaire/[slug]` avec priorite 0.5

## References SEO & CRO

Les bonnes pratiques SEO et CRO ci-dessous sont integrees dans le workflow. Elles s'appliquent a la generation (`/build`) et a l'audit (`/audit`).

### Sources

Ces references sont issues de l'analyse du projet [seomachine](https://github.com/seomachine) (workspace Claude Code open-source pour le contenu SEO) et adaptees au contexte des sites vitrines.

### Integration dans le workflow

| Element seomachine | Application Claude Press | Skill concerne |
|---|---|---|
| SEO guidelines (meta, keywords, structure) | Code genere avec meta optimises, hierarchie h1-h6, keyword placement | `/build` |
| CRO best practices (5-second test, CTA, trust signals) | Hero sections et CTAs des sites vitrines plus efficaces | `/build`, `/audit` |
| CRO analyst framework (Cialdini, cognitive load, objections) | Grille d'audit des pages generees | `/audit` |
| Copywriting principles (clarity > cleverness, benefits > features) | Guidelines de redaction pour les fiches pages et le contenu genere | `/generate`, `/build` |
| Marketing psychology (loss aversion, social proof, anchoring) | Reference pour la redaction des contenus et CTA | `/generate`, `/build` |
| Schema markup reference (JSON-LD types, proprietes requises) | Generation et verification des donnees structurees | `/build`, `/audit` |
| SEO audit framework (crawlability, on-page, E-E-A-T) | Audit post-build complet sur 6 axes | `/audit` |

### Regles SEO pour le code genere

#### Meta elements

| Element | Regle |
|---|---|
| Meta title | 50-60 caracteres, mot-cle principal au debut, benefice ou localisation a la fin. **Ne jamais inclure le nom de marque** dans le title de page : le root layout utilise un template (`%s | Marque`) qui l'ajoute automatiquement. Seule la page d'accueil utilise `{ absolute: "..." }` pour definir un title complet. Cette regle s'applique aussi aux champs `metaTitle` dans les fichiers de donnees (`cities.ts`, `services.ts`, `sectors.ts`, `products.ts`, etc.) |
| Meta description | 150-160 caracteres, mot-cle + proposition de valeur + CTA implicite |
| URL slug | Minuscules, tirets, 3-5 mots, contient le mot-cle principal |
| Canonical | URL absolue, auto-referente sur chaque page unique |
| Open Graph | title, description, type, url, images, siteName sur chaque page |
| Twitter Cards | card (`summary_large_image`), title, description, images |

#### Placement des mots-cles

Le mot-cle principal de chaque page (defini dans la fiche page, section SEO) doit apparaitre dans :
- Le `<h1>` (de preference au debut)
- Les 100 premiers mots du contenu visible
- 2-3 sous-titres `<h2>` (variations acceptees)
- La meta title et la meta description
- Le slug de l'URL

#### Maillage interne

- Ancres textuelles descriptives et variees (jamais "cliquez ici" ou "en savoir plus" seul)
- Chaque page doit etre liee depuis au moins une autre page
- Les liens doivent etre coherents avec la section "Maillage interne" de chaque fiche page
- Distribution naturelle des liens dans le contenu (pas de bloc de liens en bas de page)

### Regles CRO pour les sites vitrines

#### Above the fold (test des 5 secondes)

Chaque page cle (accueil, services, contact) doit communiquer en 5 secondes :
1. **Quoi** — ce que l'entreprise propose
2. **Pour qui** — a qui elle s'adresse
3. **Pourquoi** — pourquoi faire confiance
4. **Quoi faire** — le CTA principal

#### CTA

| Regle | Detail |
|---|---|
| Texte actionnable | Verbe d'action + benefice : `"Demander un devis gratuit"` pas `"Envoyer"` |
| Visible sans scroll | Au moins un CTA dans le hero de chaque page cle |
| Distribution | CTAs repartis sur la page (hero, milieu, fin) |
| Risk reversal | Element de reassurance pres du CTA final (`"Sans engagement"`, `"Réponse sous 24h"`) |
| Formule | `[Verbe d'action] + [ce qu'ils obtiennent] + [qualificatif optionnel]` |

#### Signaux de confiance (du plus fort au plus faible)

1. Resultats specifiques avec chiffres
2. Temoignages nommes (nom, role, entreprise)
3. Nombre de clients ou projets
4. Logos clients reconnaissables
5. Notes et avis (Google, Trustpilot)
6. Certifications et partenariats
7. Anciennete

#### Principes de psychologie appliques

| Principe | Application site vitrine |
|---|---|
| Reciprocite | Offrir de la valeur d'abord (audit gratuit, guide, conseil) |
| Preuve sociale | Logos, temoignages, chiffres de clients |
| Autorite | Certifications, cas d'etude, anciennete |
| Reduction de friction | `"En 3 étapes"`, `"Sans engagement"`, `"Réponse sous 24h"` |
| Aversion a la perte | Formuler en termes de ce qu'ils perdent a ne pas agir |

### Regles GEO (Generative Engine Optimization)

Le GEO optimise le contenu pour etre cite et reference par les moteurs IA (Google AI Overviews, Perplexity, ChatGPT Search, Gemini, Bing Copilot, Claude). Il etend le SEO classique, il ne le remplace pas. S'applique a `/build` (generation) et `/audit` (verification).

#### Ecriture answer-first

- Chaque section (H2) commence par une reponse directe de 40-60 mots
- Les sections sont auto-contenues : un moteur IA peut extraire un bloc H2 seul et fournir une reponse coherente
- Pas d'introductions generiques avant la reponse concrete

#### Structure pour extraction IA

- H2 formules comme des questions quand pertinent (`"Pourquoi choisir ..."` plutot que `"Nos avantages"`)
- Listes a puces pour les enumerations (format privilegie par les AI Overviews)
- Tableaux pour les comparaisons
- Paragraphes courts (2-4 phrases)

#### Optimisation des entites

- Nommer l'entreprise par son nom dans le H1, premier paragraphe, meta description (pas seulement "nous"/"notre")
- Lier le nom a son contexte geographique et sectoriel
- Frequence minimale : 2-3 mentions du nom de marque dans le contenu principal

#### Densite de donnees

- Au moins 1 donnee chiffree par section de contenu significative
- Temoignages avec attribution complete (`<blockquote>` + `<cite>`)
- Chaque promesse de valeur etayee par une preuve

#### Accessibilite crawlers IA

- `robots.ts` autorise : `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`
- Contenu en HTML serveur (SSR/SSG), pas uniquement en JS client-side
- **`llms.txt` obligatoire** — chaque site genere doit inclure un fichier `public/llms.txt` accessible a `/llms.txt`. Ce fichier est une fiche d'identite structuree du site pour les LLM (nom, description, services, secteurs, contact, pages principales). Contenu factuel et concis, sans marketing. Genere automatiquement par `/build` a partir des fiches pages et de la configuration du site

## Regle de ton — voix hybride (GEO + CRO)

Le site parle a la 1ere personne ("nous") pour la proximite avec le visiteur, tout en ancrant le nom de marque pour les moteurs IA (GEO). Les regles ci-dessous s'appliquent a `/build` (generation) et `/audit` (verification).

| Zone du site | Voix | Exemple |
|---|---|---|
| **FAQ — questions** | 3eme personne + nom de marque | "Comment Les Entrecodeurs accompagnent-ils les industriels ?" |
| **FAQ — reponses / content blocks** | 1ere phrase : ancrage entite (nom de marque en sujet). Suite : 1ere personne ("nous", "notre", "nos") | "Les Entrecodeurs deploient des solutions IA en production. Nous exploitons les meilleurs modeles du marche et nous les adaptons a vos cas d'usage." |
| **Hero, CTA, labels UI, navigation** | 1ere personne pure | "Nous contacter", "Voir nos realisations", "Nous developpons des solutions sur mesure" |
| **Recit historique (a propos)** | 3eme personne acceptable pour le storytelling des origines | "Les fondateurs decouvrent leur passion commune... ils creent une premiere societe au Quebec" |
| **Meta title / meta description** | Nom de marque obligatoire (SEO + GEO) | "Infogerance et cloud — Les Entrecodeurs a Metz" |

**Pourquoi** : les moteurs IA (Perplexity, ChatGPT Search, Google AI Overviews) extraient des blocs de texte hors contexte. Si une reponse FAQ commence par "Nous developpons", le LLM ne sait pas qui parle. L'ancrage entite en premiere phrase rend chaque bloc auto-suffisant et citable.

**Regle de frequence** : dans chaque reponse FAQ ou content block, le nom de marque doit apparaitre **au moins 1 fois** (en premiere phrase). Les mentions suivantes utilisent "nous/notre/nos". Ne pas sur-repeter le nom de marque — 1 ancrage par bloc suffit.

## Scripts de lancement local (Windows)

Chaque projet peut disposer de scripts Windows dans son dossier `apps/[client]/` :

- `start.bat` — lance l'application en mode developpement
- `stop.bat` — arrete l'application (kill le port)

**Regle** : quand l'utilisateur demande de lancer ou d'arreter une application cliente, utiliser ces scripts via `cmd.exe` :

```bash
# Lancer
cmd.exe /c "C:\Users\VH\projets\claude-site-builder\apps\[client]\start.bat"

# Arreter
cmd.exe /c "C:\Users\VH\projets\claude-site-builder\apps\[client]\stop.bat"
```

### Scripts existants

| Client | start.bat | stop.bat | Port |
|---|---|---|---|
| alliances-rfe | `apps/alliances-rfe/start.bat` | `apps/alliances-rfe/stop.bat` | 3001 |

## Conventions de nommage

- **Dossiers et fichiers** : `kebab-case`, sans accents (ex: `a-propos.md`, `boulangerie-martin`)
- **Nom du client** : slug en kebab-case derive du nom commercial
