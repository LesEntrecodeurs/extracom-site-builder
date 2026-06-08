# BUILD — Bijou (POC e-commerce)

Site e-commerce de démonstration branché sur l'API catalogue Extracom100 (base Sage **BIJOU**). Catalogue en lecture seule : liste paginée + filtres + tri + recherche, fiches produit. Pas de panier ni de checkout.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS 3.4 + shadcn (new-york, CSS variables) · `tailwindcss-animate`
- `undici` pour l'appel `GET /articles` (corps JSON sur GET, impossible avec `fetch` natif)
- Polices : Fraunces (display serif) + Manrope (sans) via `next/font/google`
- App : `apps/bijou`, port dev **3002** (l'API tourne sur 3000)

## Variables d'environnement (`.env.local`, voir `.env.example`)

| Variable | Rôle |
|---|---|
| `EXTRACOM_API_BASE_URL` | Base API, ex. `http://localhost:3000/api/v1` |
| `EXTRACOM_API_TOKEN` | Token boutique `ctk_live_...` (serveur uniquement) |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (metadata, JSON-LD, sitemap) |

## Couche API (`src/lib/api/`)

- `client.ts` — `fetchJson` (global `fetch` + cache Next, pour `/families`, `/catalogs`, `/articles/:ref`) et `requestWithBody` (**undici**, pour `GET /articles` avec corps JSON). `ApiError` typée.
- `catalog.ts` — `listArticles` (cache 5 min), `getArticle` (404 → null), `getFamilies`/`getCatalogs` (cache 1 h), `getAllReferences` (sitemap).
- `types.ts` — types alignés sur le contrat (`Article`, `Family`, `CatalogNode`…). Voir `API.md`.

## Routes

| Route | Rendu | Contenu |
|---|---|---|
| `/` | Statique (ISR 5 min) | Hero, familles, pièces en vedette (API), FAQ |
| `/catalogue` | Dynamique | Liste + filtres (catalogue/famille/prix) + tri + recherche + pagination |
| `/produit/[reference]` | Dynamique | Détail : prix, variantes (gammes), specs, fil d'ariane catalogue, description |
| `/a-propos` | Statique | Présentation + FAQ |
| `/contact` | Dynamique | Coordonnées + préremplissage `?ref=` + FAQ |
| `robots.txt`, `sitemap.xml`, `opengraph-image` | — | SEO technique |

## État de l'URL (catalogue)

Source de vérité = `searchParams`, parsés par `src/lib/catalogue-params.ts` :
`q` (recherche), `famille` (répétable → `in`), `cat=<niveau>:<id>` (filtre catalogue AND par niveau), `prixMin`/`prixMax`, `tri` (pertinence/prix/nom/réf), `page` (12/page). Les composants client (`use-catalogue-nav.ts`) poussent les changements dans l'URL ; le Server Component refait l'appel API. Tout reste côté serveur, partageable et SEO-friendly.

## SEO / JSON-LD

- `generateMetadata` sur chaque page, title template `%s | Bijou`, canonical, OG/Twitter.
- Helpers `src/lib/jsonld.ts` : `Organization` + `WebSite` (accueil), `BreadcrumbList`, `ItemList` (catalogue), `Product` (détail), `FAQPage` (via `PageFaq`), `WebPage`/`ContactPage` (statiques).
- `robots.ts` autorise GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended. `public/llms.txt` présent.

## Spécificités données démo BIJOU

- Aucune image (`url`/`images` vides) → placeholder dégradé + initiales (`ProductImage`).
- `glossaires[].text` = descriptifs Sage avec `\r`/tabulations → nettoyés par `cleanSageText`.
- `catalogs` renvoie des `id` en string → convertis en nombre pour les filtres `catalogIdN`.

## Build & lint

- `yarn workspace @extracom-site-builder/bijou build` — OK (nécessite l'API up pour le prerender de `/` et `sitemap`, tous deux protégés par try/catch).
- `yarn check` (Biome) — clean.
