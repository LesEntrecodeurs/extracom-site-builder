# DESIGN — Bijou

Direction esthétique : **luxe raffiné / joaillerie**. Sobre, chaud, éditorial. Aucune police générique (pas d'Inter/Roboto/Arial), pas de gradient violet sur blanc.

## Palette (CSS variables, `globals.css`)

| Token | Hex | Usage |
|---|---|---|
| `--background` | `#faf8f4` | Fond ivoire |
| `--background-secondary` | `#f3efe7` | Sections alternées, hero |
| `--ink` / `--foreground` | `#1c1a17` | Texte principal, boutons pleins |
| `--gold` | `#9c7c3c` | Accent or antique (eyebrow, prix, hover) |
| `--gold-soft` | `#efe6d2` | Fonds doux, placeholders |
| `--muted-foreground` | `#6f675b` | Texte secondaire |
| `--border` | `#e4ddd0` | Bordures fines |

## Typographie

- **Display** : Fraunces (serif éditorial, italique pour accents) — titres, prix, hero.
- **Sans** : Manrope — corps, UI, labels.
- Variables `--font-display` / `--font-sans` (next/font), classes `font-display` / `font-sans`.

## Signature visuelle

- `.eyebrow` : surtitre or, uppercase, letter-spacing large.
- Bordures fines (`1px`), radius minimal (`0.25rem`) → registre joaillerie, pas de cartes molles.
- Cartes produit : image carrée (placeholder dégradé or + initiales quand pas d'image), hover bordure or + léger zoom.
- Hero asymétrique : titre Fraunces massif (« le temps maîtrisé » en italique or) + mosaïque de 4 pièces.
- Familles en grille de tuiles séparées par filets (`gap-px` sur fond border).

## Composants réutilisables

`Button` (variants default/gold/outline/ghost/link), `ProductImage` (placeholder), `ProductCard`, `PageFaq` (+ FAQPage JSON-LD), `JsonLd`, `SearchBar`, `SortSelect`, `FiltersPanel` (CatalogTree + FamilyFilter + PriceFilter), `Pagination`, `ProductSpecs`, `ProductVariants`. Tous < 200 lignes, données éditoriales dans `src/data/`.

## Mobile-first

Tout en mobile-first (base 375px → `sm`/`md`/`lg`). Catalogue : filtres en `<details>` repliable sur mobile, sidebar fixe en `lg`. Grilles produit `grid-cols-2 md:grid-cols-3/4`.
