---
name: build
description: Genere le site Next.js du projet client a partir des fiches pages et du brief design
argument-hint: "[nom-client]"
---

# /build [nom-client]

Genere le site Next.js complet du projet a partir des fiches pages, du brief design et du template de base.

## Declenchement

L'utilisateur lance `/build [nom-client]` ou `build [nom-client]`.

## Pre-requis

- Le dossier `docs/projets/[nom-client]/pages/` doit exister et contenir des fiches pages (sinon, suggerer `/generate [nom-client]` d'abord)
- Le template `docs/templates/base-nextjs-vitrine.md` doit etre present

## Instructions

Le processus se deroule en **6 phases sequentielles**. Ne jamais sauter une phase.

---

### Phase 1 — Verification

1. **Verifier** que `docs/projets/[nom-client]/pages/` existe et contient des fiches pages
2. **Verifier** que `docs/templates/base-nextjs-vitrine.md` est present
3. **Verifier** si `docs/projets/[nom-client]/DESIGN.md` existe :
   - Si present : le charger pour configurer le theme
   - Si absent : **afficher un warning** et proposer de lancer `/design [nom-client]` d'abord, ou continuer avec un theme par defaut
4. **Afficher** un resume :
   ```
   Verification pour [nom-client] :
   - Fiches pages : [N] pages trouvees
   - Brief design : [present/absent]
   - Template : base-nextjs-vitrine.md

   [Si DESIGN.md absent : "Warning : pas de brief design. Le site sera genere avec un theme par defaut. Lancez /design [nom-client] pour personnaliser."]

   Puis-je proceder a la configuration technique ?
   ```
5. **Attendre** la validation de l'utilisateur

---

### Phase 2 — Questions techniques

**Pre-remplir les reponses depuis les fiches pages** : avant de poser les questions, analyser les fiches pages pour detecter les informations deja presentes (langues mentionnees, formulaire de contact, etc.) et pre-remplir les valeurs en consequence.

Presenter a l'utilisateur **3 blocs de questions** avec les valeurs pre-remplies ou par defaut. L'utilisateur peut valider ou modifier.

Le contenu est toujours en **Markdown statique** (pas de CMS).

#### Bloc 1 — Formulaires
- **Backend formulaires** : Formspree / EmailJS / API custom (defaut: **Formspree**)

#### Bloc 2 — Internationalisation (i18n)
- **Multilingue** : oui / non — **detecter depuis les fiches pages** si le site est multilingue (langues mentionnees dans les sources, fiches pages avec contenus en plusieurs langues). Si detecte, pre-remplir a **oui** avec les langues identifiees
- Si oui : langues supportees, langue par defaut (defaut: **fr**)

#### Bloc 3 — SEO & Analytics
- **Sitemap** : oui / non (defaut: **oui**)
- **robots.txt** : oui / non (defaut: **oui**)
- **JSON-LD** (donnees structurees) : oui / non (defaut: **oui**)
- **llms.txt** (fichier Markdown pour les LLMs) : oui / non (defaut: **oui**)
- **Analytics** : Umami / GA4 / GTM / Plausible / aucun (defaut: **Umami**)
- Si Umami : **demander le Website ID** a l'utilisateur. Si fourni, l'ecrire en dur dans le provider. Si "plus tard", laisser une string vide et l'ajouter dans `docs/projets/[nom-client]/todo.md`

#### Bloc 4 — Media
- **Gestion des images** : Next.js Image natif / CDN externe (defaut: **natif**)

#### Bloc 5 — Tweaks live (opt-in)
- **Panneau de tweaks live** : oui / non (defaut: **non**)
  - Si **oui** : generer un composant `<TweaksPanel>` (bouton flottant bottom-right) qui permet au client d'ajuster en temps reel : theme clair/sombre, couleur d'accent, densite (spacing), intensite des animations. Les valeurs sont persistees en `localStorage` et appliquees via CSS custom properties sur `:root`. Voir la section dediee **"Tweaks live"** plus bas pour les details d'implementation.
  - Utile en phase de validation client (le client teste des variantes sans re-build). Peut etre masque/retire avant mise en prod finale.

> Presenter les questions de maniere claire avec les valeurs par defaut. L'utilisateur doit pouvoir repondre "ok" pour accepter tous les defauts ou ne modifier que ce qu'il souhaite.

---

### Phase 3 — Lecture

1. **Charger** toutes les fiches pages depuis `docs/projets/[nom-client]/pages/`
2. **Charger** `docs/projets/[nom-client]/DESIGN.md` si present
3. **Charger** le template `docs/templates/base-nextjs-vitrine.md`
4. **Construire en memoire** :
   - L'arbre des routes depuis les slugs des fiches pages
   - La liste des composants necessaires par page (depuis la section "Composants fonctionnels")
   - Le maillage interne (liens entre pages)
   - La configuration de navigation (depuis les fiches Menu, Header, Footer)

---

### Phase 4 — Generation

Generer le projet dans `apps/[nom-client]/` en suivant strictement le template `docs/templates/base-nextjs-vitrine.md`.

#### Stack technique

- **Framework** : Next.js 15, React 19, TypeScript
- **Styling** : Tailwind CSS 4, shadcn/ui
- **Animations** : CSS natif (keyframes + transitions via Tailwind + IntersectionObserver). Ne PAS installer Framer Motion sauf demande explicite du développeur pour des cas précis et localisés (layout animations, gestures, orchestration complexe)
- **i18n** : next-intl (si multilingue active)
- **Formulaires** : React Hook Form + Zod (si page contact presente)
- **SEO** : generateMetadata natif Next.js

#### Architecture generee

```
apps/[nom-client]/
├── package.json                    # @claude-site-builder/[nom-client]
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── public/
│   ├── images/
│   ├── fonts/
│   └── llms.txt              # Fiche d'identite du site pour les LLM (GEO)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout racine
│   │   ├── page.tsx                # Page d'accueil
│   │   ├── [slug]/page.tsx         # Pages dynamiques ou statiques
│   │   ├── sitemap.ts              # Si SEO active
│   │   ├── robots.ts               # Si SEO active
│   │   └── llms.txt/
│   │       └── route.ts            # Si llms.txt active (GEO)
│   ├── modules/
│   │   └── [page]/                 # Un module par page
│   │       └── sections/           # Sections de la page
│   │           ├── HeroSection.tsx
│   │           ├── ...Section.tsx
│   │           └── index.ts        # Re-export
│   ├── components/
│   │   ├── providers/              # Providers (analytics, cookies)
│   │   │   ├── cookie-consent.tsx  # Bandeau RGPD + hook useCookieConsent
│   │   │   └── umami.tsx           # Si analytics Umami
│   │   ├── ui/                     # Composants shadcn/ui
│   │   └── layout/                 # Header, Footer, LocaleSwitcher
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── LocaleSwitcher.tsx  # Si multilingue
│   ├── config/
│   │   ├── app.config.ts           # Configuration globale du site
│   │   ├── navigation.ts           # Structure de navigation
│   │   └── llms.config.ts          # Donnees pour llms.txt (si llms.txt active)
│   ├── i18n/                       # Si multilingue
│   │   ├── routing.ts
│   │   ├── request.ts
│   │   └── navigation.ts
│   ├── lib/
│   │   ├── utils.ts                # Utilitaires (cn, etc.)
│   │   └── jsonld.ts               # Helpers JSON-LD (WebSite, Organization, etc.)
│   └── styles/
│       └── globals.css             # Variables CSS + Tailwind
├── translations/                   # Si multilingue
│   ├── fr.json
│   └── en.json
└── .env.example
```

#### Regles de generation du code

1. **Suivre le template** `docs/templates/base-nextjs-vitrine.md` — respecter ses conventions, sa structure et ses patterns
2. **Theme depuis DESIGN.md** — mapper les couleurs de la palette vers des variables CSS dans `globals.css`, configurer Tailwind pour les utiliser
3. **Typographie depuis DESIGN.md** — importer les Google Fonts specifiees, les configurer dans le layout et Tailwind
4. **Contenu depuis les fiches pages** — chaque page doit refleter fidellement la structure, le contenu editorial, les CTA et le wireframe de sa fiche
5. **Maillage interne** — les liens entre pages doivent etre coherents avec le maillage defini dans les fiches
6. **Navigation** — construire Header, Footer et Menu depuis les fiches correspondantes. **Le Footer ne doit jamais contenir de balises de titre (`<h1>` a `<h6>`)** — utiliser des `<p>` ou `<span>` avec les classes de style appropriees pour les titres de colonnes du footer. Les balises hX dans le footer polluent la hierarchie des titres de chaque page et nuisent au SEO
7. **SEO + GEO (Generative Engine Optimization)** — optimisation complete pour les moteurs de recherche classiques ET les moteurs IA (Google AI Overviews, Perplexity, ChatGPT search) :

   **Metadata & balises :**
   - `generateMetadata` complet sur chaque page : title, description, openGraph (title, description, type, url, siteName), twitter (card, title, description)
   - URL canonique sur chaque page (`alternates.canonical`)
   - Balises `hreflang` si multilingue (gerees automatiquement par next-intl)

   **Image de partage OG/Twitter (obligatoire)** :
   - Creer `src/app/opengraph-image.tsx` a la racine de l'app — image par defaut pour toutes les pages
   - Creer `src/app/twitter-image.tsx` qui reexporte le meme rendu (`export { default, alt, contentType, size } from "./opengraph-image"`)
   - Utilise `ImageResponse` de `next/og` (integre a Next.js 15, pas de dependance externe)
   - Dimensions : 1200x630, format PNG
   - Design brande : fond degrade (couleurs secondaires du DESIGN.md), nom du client, baseline, URL du site
   - Les exports `alt`, `size` et `contentType` permettent a Next.js de generer automatiquement les meta tags `og:image` et `twitter:image`
   - Ne PAS mettre `images` manuellement dans le bloc `openGraph` du layout — la convention fichier prend le relais
   - Les pages qui ont leur propre visuel (ex: realisations, blog) peuvent surcharger avec leur propre `opengraph-image.tsx` dans leur dossier de route

   **Semantique HTML :**
   - Structure stricte : `<main>`, `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`
   - Hierarchie h1-h6 correcte : un seul `<h1>` par page, sous-titres en cascade
   - Listes (`<ul>`, `<ol>`) pour le contenu enumere — les moteurs IA extraient mieux les listes
   - Tableaux `<table>` avec `<thead>` et `<th>` pour les donnees tabulaires
   - `<address>` pour les coordonnees de contact
   - `<time datetime="...">` pour les dates

   **Donnees structurees JSON-LD** — creer `src/lib/jsonld.ts` avec des fonctions helper, injectees via `<script type="application/ld+json">` dans chaque page. Chaque type de page a des schemas obligatoires :

   | Type de page | JSON-LD obligatoires |
   |---|---|
   | Accueil | `WebSite` (name, url, description, publisher, potentialAction SearchAction), `Organization` (name, url, logo, contactPoint, sameAs), `LocalBusiness` (si adresse physique : name, address, telephone, openingHours, geo, image) |
   | A propos | `WebPage`, `BreadcrumbList` |
   | Contact | `WebPage`, `BreadcrumbList`, `ContactPage` |
   | FAQ | `WebPage`, `BreadcrumbList`, `FAQPage` (questions/reponses en Question/Answer) |
   | Service (liste) | `WebPage`, `BreadcrumbList`, `OfferCatalog` |
   | Service (detail) | `WebPage`, `BreadcrumbList`, `Service` (name, description, provider) |
   | Secteur / Landing | `WebPage`, `BreadcrumbList`, `FAQPage` (si bloc FAQ present) |
   | Page ville / locale | `WebPage`, `BreadcrumbList`, `LocalBusiness`, `FAQPage` (si bloc FAQ present) |
   | Portfolio (liste) | `WebPage`, `BreadcrumbList`, `ItemList` |
   | Portfolio (detail) | `WebPage`, `BreadcrumbList`, `CreativeWork` |
   | Glossaire (liste) | `WebPage`, `BreadcrumbList` |
   | Glossaire (detail) | `WebPage`, `BreadcrumbList`, `DefinedTerm` |
   | Blog (liste) | `WebPage`, `BreadcrumbList`, `ItemList` |
   | Blog (article) | `WebPage`, `BreadcrumbList`, `Article` (headline, datePublished, author, image) |
   | Mentions legales | `WebPage`, `BreadcrumbList` |
   | Politique confidentialite | `WebPage`, `BreadcrumbList` |

   Toute page qui contient un bloc FAQ en bas de page doit aussi inclure `FAQPage`. Les helpers doivent etre centralises dans `src/lib/jsonld.ts`.

   **Verification JSON-LD** — apres la generation de toutes les pages (fin de Phase 4), parcourir chaque fichier `page.tsx` genere et verifier qu'il contient les `<script type="application/ld+json">` correspondant a son type dans la matrice ci-dessus. Lister les pages non conformes et les corriger avant de passer a la Phase 5 (Build)

   **Fil d'Ariane (Breadcrumb)** :
   - Creer `src/components/ui/breadcrumb.tsx` : composant reutilisable affichant le chemin hierarchique (Accueil > Section > Page)
   - Afficher le fil d'Ariane sur toutes les pages sauf la page d'accueil
   - Utiliser une `<nav aria-label="Fil d'Ariane">` avec une liste `<ol>` et des separateurs visuels
   - Le dernier element (page courante) est un `<span aria-current="page">` (pas un lien)
   - Le JSON-LD `BreadcrumbList` doit correspondre exactement au fil d'Ariane visuel

   **GEO — Generative Engine Optimization (optimisations pour les moteurs IA)** :

   Le GEO optimise le contenu pour etre cite et referencé par les moteurs IA (Google AI Overviews, Perplexity, ChatGPT Search, Gemini, Bing Copilot, Claude). Il etend le SEO classique, il ne le remplace pas.

   **Principe fondamental — ecriture "answer-first"** :
   - Chaque section de page doit commencer par une reponse directe de 40-60 mots avant de developper
   - Le premier paragraphe sous chaque H2 doit etre auto-suffisant : un moteur IA doit pouvoir l'extraire seul et fournir une reponse coherente
   - Pas d'introductions generiques ni de phrases d'accroche vides avant la reponse

   **Structure du contenu pour l'extraction IA** :
   - Sections auto-contenues : chaque H2 forme un bloc independant avec une reponse complete (les LLM ne lisent pas la page entiere, ils extraient des fragments)
   - H2 formules comme des questions quand c'est pertinent (`"Pourquoi choisir une agence web locale ?"` plutot que `"Nos avantages"`)
   - Listes a puces (`<ul>`, `<ol>`) pour les avantages, services, etapes, caracteristiques — format privilegie par les AI Overviews et les featured snippets
   - Tableaux `<table>` avec `<thead>` et `<th>` pour les comparaisons et donnees structurees
   - Paragraphes courts (2-4 phrases max) — les LLM extraient mieux les blocs compacts

   **Densite de donnees et citations** :
   - Statistiques et chiffres cles en evidence (balises `<strong>`) — objectif : au moins 1 donnee chiffree par section de contenu significative
   - Les citations augmentent la visibilite IA de 30-40% — inclure des temoignages avec attribution complete (nom, role, entreprise)
   - Format temoignage : `<blockquote>` avec `<cite>` pour le nom et role — structure semantique que les LLM peuvent extraire
   - Chaque affirmation cle doit etre soutenue par un element de preuve (chiffre, exemple concret, temoignage)

   **Optimisation des entites** :
   - Nommer l'entreprise par son nom (ex: `"Les Entrecodeurs"`) plutot que `"nous"` ou `"notre equipe"` dans les contenus cles — les LLM associent les entites nommees aux reponses
   - Mentionner le nom de marque dans : le H1, le premier paragraphe, la meta description, au moins 2-3 fois dans le contenu
   - Lier l'entite a son contexte geographique et sectoriel (`"Les Entrecodeurs, agence web a Strasbourg"`)

   **Section FAQ obligatoire** :
   - Si une page FAQ existe, elle doit utiliser le schema `FAQPage` JSON-LD
   - Sur les pages services et pages villes, inclure un bloc FAQ en bas de page avec 3-5 questions pertinentes
   - Questions formulees comme les requetes conversationnelles des utilisateurs (`"Combien coûte un site vitrine ?"`, `"Quel est le délai de création ?"`)
   - Reponses directes en 40-80 mots chacune

   **Profondeur semantique** :
   - Eviter le contenu duplique entre les pages — chaque page doit avoir un angle unique et un contenu original
   - Couvrir les sous-themes lies au sujet principal (cluster semantique) pour renforcer l'autorite topique
   - Utiliser le vocabulaire specifique du domaine (pas de paraphrases generiques)

   **Accessibilite aux crawlers IA** :
   - `robots.ts` doit explicitement autoriser : `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Googlebot`, `Bingbot`
   - Ne pas bloquer les crawlers IA sauf demande explicite du client
   - Le contenu important doit etre dans le HTML rendu cote serveur (SSR/SSG), pas uniquement dans du JS client-side

   **llms.txt (fichier Markdown pour les LLMs)** :
   - Si llms.txt est active, generer `src/app/llms.txt/route.ts` (route handler Next.js) et `src/config/llms.config.ts` (donnees)
   - Le route handler sert `/llms.txt` au format `text/markdown` avec `dynamic = 'force-static'`
   - `llms.config.ts` contient les donnees extraites des fiches pages :
     - `summary` : la meta description de la fiche `accueil.md`
     - `about` : l'accroche principale et la sous-accroche de la fiche `accueil.md`
     - `pages` : pour chaque page navigable (exclure header, footer, menu), le titre (`title`), le slug (`path`) et la meta description (`description`)
   - Le contenu doit etre en francais avec les accents corrects
   - Suivre le pattern documente dans `docs/templates/base-nextjs-vitrine.md`

   **Technique :**
   - `sitemap.ts` avec `lastModified` sur chaque entree
   - `robots.ts` avec autorisation pour les bots IA : `Googlebot`, `Bingbot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`
   - Images : toujours `next/image` avec `alt` descriptif en francais, `loading="lazy"` sauf above the fold, `sizes` pour le responsive
   - Liens internes avec ancres textuelles pertinentes (pas de "cliquez ici")
   - URLs propres et lisibles (slugs depuis les fiches pages)
8. **llms.txt** — generer un fichier `llms.txt` accessible a la racine du site (`public/llms.txt` + route `/llms.txt`). Ce fichier presente le site de maniere structuree pour les LLM :

   ```
   # [Nom du client]

   > [Description courte — 1 phrase]

   [Description longue — 2-3 phrases avec secteur, localisation, services principaux]

   ## Services

   - [Service 1] : [description courte]
   - [Service 2] : [description courte]
   - ...

   ## Secteurs

   - [Secteur 1] : [description courte]
   - ...

   ## Contact

   - Adresse : [adresse]
   - Téléphone : [tel]
   - Email : [email]
   - Site : [url]

   ## Pages principales

   - [Titre page] : [url]
   - ...
   ```

   Le contenu est genere a partir des fiches pages, de `app.config.ts` et de la navigation. Le fichier doit etre factuel, concis et sans marketing — c'est une fiche d'identite du site pour les IA.

9. **Formulaires** — si la page Contact est presente, implementer le formulaire avec React Hook Form + Zod, connecte au backend choisi (Formspree par defaut)
10. **Analytics Umami** — si Umami est choisi, creer `src/components/providers/umami.tsx` avec le code suivant. Le provider doit **conditionner le chargement du script au consentement cookies** via `useCookieConsent()`. Ajouter `<UmamiProvider>` dans le layout racine, **a l'interieur** de `<CookieConsentProvider>` :
   ```tsx
   'use client';

   import { useEffect, type PropsWithChildren } from 'react';
   import { useCookieConsent } from './cookie-consent';

   export const UmamiProvider = ({ children }: PropsWithChildren) => {
     const { consent } = useCookieConsent();

     useEffect(() => {
       if (!consent) return;

       const websiteId = 'WEBSITE_ID';

       if (!websiteId) return;

       const existingScript = document.querySelector(
         'script[src="https://rk78sd.lesentrecodeurs.com/script.js"]'
       );

       if (existingScript) return;

       const script = document.createElement('script');
       script.src = 'https://rk78sd.lesentrecodeurs.com/script.js';
       script.setAttribute('data-website-id', websiteId);
       script.async = true;
       document.head.appendChild(script);
     }, [consent]);
     return <>{children}</>;
   };

   export const trackEvent = (
     eventName: string,
     eventData?: Record<string, any>
   ) => {
     const umami = (window as any).umami;

     if (!umami) return;

     return umami.track?.(eventName, eventData);
   };
   ```
11. **Responsive** — toutes les pages doivent etre responsive (mobile-first)
12. **Accessibilite** — respecter les bases : semantique HTML, alt sur les images, aria-labels sur les interactions. Regles supplementaires obligatoires (lint Biome a11y) :
   - **`type` explicite sur les boutons** — tout element `<button>` doit avoir un attribut `type` explicite (`type="button"` ou `type="submit"`). Ne jamais omettre le `type` car le comportement par defaut (`submit`) peut provoquer des soumissions de formulaire involontaires
   - **SVG decoratifs masques** — les SVG decoratifs (icones, formes, separateurs, vagues, fleches) doivent porter `aria-hidden="true"`. Seuls les SVG porteurs de sens (infographies, graphiques) conservent un `role="img"` avec un `<title>` descriptif
   - **Pas d'index de tableau comme cle React** — ne jamais utiliser l'index d'iteration (`map((item, index) => <X key={index}>`) comme `key`. Utiliser un identifiant unique et stable (slug, id, valeur unique). Si aucun identifiant naturel n'existe, en generer un a la construction des donnees
   - **Pas de handlers interactifs sur des elements statiques** — ne jamais placer `onClick`, `onKeyDown` ou d'autres handlers d'interaction sur des elements non interactifs (`<div>`, `<span>`, `<section>`, etc.). Utiliser un `<button>` (action) ou un `<a>` (navigation) a la place. Si un style particulier est necessaire, styler le `<button>` en consequence
   - **Props ARIA coherentes avec le role** — les attributs `aria-*` utilises sur un element doivent etre supportes par le role de cet element (implicite ou explicite). Par exemple, ne pas utiliser `aria-checked` sur un element qui n'a pas le role `checkbox`, `menuitemcheckbox`, `radio` ou `switch`
13. **Accents francais** — tout texte en francais dans le code (contenu, labels, aria-labels, alt, meta, placeholders, messages d'erreur) doit comporter les accents corrects
14. **Pas de commentaires superflus** — ne pas ajouter de commentaires evidents dans le JSX/TSX (`{/* Content */}`, `{/* Spacer */}`, `{/* Header */}`, etc.). Le code doit etre lisible par lui-meme. Ne commenter que la logique non evidente
15. **Consentement cookies (RGPD)** — si des analytics sont activees (Umami, GA4, GTM, Plausible), generer un systeme de consentement cookies :
   - Creer `src/components/providers/cookie-consent.tsx` : bandeau cookie en bas de page, stocke le choix dans `localStorage` (`cookie-consent: "accepted" | "refused"`), expose un hook `useCookieConsent()` qui retourne `{ consent: boolean | null, accept: () => void, refuse: () => void }`
   - Le bandeau doit : afficher un message clair en francais, proposer "Accepter" et "Refuser", disparaitre apres le choix, reapparaitre si le localStorage est vide
   - **Le provider analytics (Umami, GA4, etc.) ne doit charger le script QUE si le consentement est accorde** : verifier `useCookieConsent().consent === true` avant d'injecter le script
   - Le `<CookieConsentProvider>` doit envelopper les providers analytics dans le layout racine
   - Style du bandeau : fixe en bas, fond sombre, texte blanc, boutons visibles, responsive, z-index eleve, coherent avec le DESIGN.md

#### Generation du fichier BUILD.md

Generer aussi `docs/projets/[nom-client]/BUILD.md` documentant les decisions techniques :

```markdown
# Build — [Nom du client]

## Configuration technique

| Parametre | Valeur |
|---|---|
| Contenu | Markdown statique |
| Formulaires | [Formspree / EmailJS / API custom] |
| Multilingue | [oui / non] |
| Langues | [fr, en / ...] |
| Sitemap | [oui / non] |
| robots.txt | [oui / non] |
| JSON-LD | [oui / non] |
| llms.txt | [oui / non] |
| Analytics | [Umami / GA4 / GTM / Plausible / aucun] |
| Images | [natif / CDN] |

## Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS 4, shadcn/ui
- Animations CSS natives via Tailwind (pas de Framer Motion sauf demande explicite)
- [next-intl si multilingue]
- [React Hook Form + Zod si formulaires]

## Structure des routes

| Route | Page | Fiche source |
|---|---|---|
| / | Accueil | accueil.md |
| /contact | Contact | contact.md |
| /[slug] | [Nom] | [slug].md |

## Decisions et notes

- [Notes sur les choix faits pendant la generation]
```

---

### Phase 5 — Build

1. **Ajouter le script dev** : ajouter `"dev:[nom-client]": "turbo dev --filter=@claude-site-builder/[nom-client]"` dans les `scripts` du `package.json` racine
2. **Installer les dependances** : `yarn install` depuis la racine du monorepo
3. **Lancer le build** : `yarn turbo build --filter=@claude-site-builder/[nom-client]`
3. **Si le build echoue** :
   - Lire les erreurs
   - Corriger les fichiers concernes
   - Relancer le build
   - **Maximum 3 tentatives**. Si le build echoue apres 3 tentatives, presenter les erreurs restantes a l'utilisateur
4. **Si le build reussit** : passer a la phase 6

---

### Phase 6 — Livraison

Presenter un recap a l'utilisateur :

```
Site genere pour [nom-client] :
- Projet : apps/[nom-client]/
- Pages : [N] pages generees
- Build : [succes/echec]
- Config technique : docs/projets/[nom-client]/BUILD.md

Pour lancer le site en local :
yarn dev:[nom-client]

Prochaine etape :
- Iterez sur le site (demandez des modifications)
- Lancez /deploy [nom-client] quand vous etes pret
```

---

## Tweaks live (implementation)

> Activer uniquement si le Bloc 5 du questionnaire a ete valide. Sinon, ne **pas** generer ce composant — il ajoute du JS cote client que la plupart des sites de production n'ont pas besoin.

### Principe

Un petit bouton flottant bottom-right (icone sliders ou paintbrush) ouvre un panneau vertical qui contient 4 tweaks. Les changements sont instantanes, persistes dans `localStorage`, appliques via CSS custom properties sur `:root`.

### Tweaks proposes (minimum)

| Tweak | UI | CSS variables modifiees | Valeur defaut |
|---|---|---|---|
| **Theme** | Toggle clair/sombre | `--background`, `--foreground`, `--background-alt` | Clair |
| **Couleur d'accent** | 4-5 presets (pastilles cliquables) tires de la palette VARIANT/DESIGN | `--primary`, `--primary-light`, `--primary-hover` | Primaire de DESIGN.md |
| **Densite** | Slider 3 crans (compact / normal / aere) | `--spacing-section`, `--spacing-gap` | Normal |
| **Animations** | Toggle on/off/reduced (respecte `prefers-reduced-motion`) | `--anim-duration`, `--anim-scale` | On |

### Implementation technique

- Composant : `src/components/ui/tweaks-panel.tsx` (client component, `"use client"`)
- Provider : monte dans `src/app/layout.tsx` apres le `<ThemeProvider>` si present, sinon directement dans `<body>`
- Persistance : `localStorage` key = `tweaks-[nom-client]`, hydrate au mount avec check `typeof window !== "undefined"`
- CSS variables : declarees dans `src/app/globals.css` avec `:root { --primary: ...; ... }` et surchargees par le panel via `document.documentElement.style.setProperty(...)`
- Accessibilite : bouton flottant avec `aria-label="Ajuster l'apparence"`, panel ouvrable au clavier (Enter/Space), focus trap a l'ouverture
- Mobile : panel pleine largeur en dessous de `sm:`, largeur fixe 320px au-dessus
- Masquable : prop `enabled` (env var `NEXT_PUBLIC_TWEAKS_ENABLED=true`) pour le retirer en production sans rebuild (par defaut : **active** en dev, **desactive** via env var en prod si le client ne le veut plus visible apres validation)

### Ajout dans BUILD.md

Quand Bloc 5 est **oui**, documenter dans `docs/projets/[nom-client]/BUILD.md` la section "Tweaks live" avec la liste des tweaks actives, comment les activer/desactiver en production, et comment ajouter d'autres tweaks plus tard.

---

## Regles

- **Suivre le template** `docs/templates/base-nextjs-vitrine.md` — c'est la reference architecturale. Ne pas inventer une structure differente
- **Fidelite aux fiches pages** — le site genere doit correspondre aux specifications des fiches (structure, contenu, CTA, maillage)
- **Fidelite au brief design** — si DESIGN.md est present, respecter la palette, la typographie et la direction des composants
- **Code propre** — TypeScript strict, composants bien decoupes, pas de `any`
- **Pas de donnees factices** — utiliser le contenu des fiches pages. Si un contenu manque, utiliser un placeholder neutre (`—`)
- **Seuil de 1000 mots par page (non bloquant)** — avant de finaliser, verifier que chaque page (hors header, footer, menu, mentions legales) atteint au moins **1000 mots** de contenu textuel visible. Cette regle n'est **pas bloquante** et ne doit pas retarder la livraison. Si des pages sont sous le seuil, **lister explicitement les pages concernees a l'utilisateur** en fin de phase de generation et lui demander s'il souhaite fournir du contenu supplementaire pour les enrichir. Proposer des suggestions adaptees au contexte de chaque page (temoignages clients, bloc FAQ, chiffres cles, etude de cas, section avantages, comparatif, bloc de reassurance). L'utilisateur decide s'il enrichit ou non
- **Package name** — le package doit s'appeler `@claude-site-builder/[nom-client]`
- Si aucun argument n'est fourni, demander le nom du client a l'utilisateur
