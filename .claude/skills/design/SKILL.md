---
name: design
description: |
  Genere le brief design complet du projet client (DESIGN.md : palette, typographie, ambiance,
  composants, references). S'appuie sur VARIANT.md si present (direction deja validee via /variants).
  TRIGGER quand : l'utilisateur parle de brief design, DESIGN.md, palette + typo + composants,
  ambiance visuelle, charte graphique complete, apres avoir valide une variante.
  SKIP si : DESIGN.md existe deja et est complet (proposer plutot /build).
argument-hint: "[nom-client]"
---

# /design [nom-client]

Genere le brief design du projet a partir des fiches pages et des sources visuelles du client.

## Declenchement

L'utilisateur lance `/design [nom-client]` ou `design [nom-client]`.

## Pre-requis

- Le dossier `docs/projets/[nom-client]/pages/` doit exister et contenir des fiches pages (sinon, suggerer `/generate [nom-client]` d'abord)

## Instructions

Le processus se deroule en **4 phases sequentielles**. Ne jamais sauter une phase.

---

### Phase 1 — Inventaire

1. **Verifier** que `docs/projets/[nom-client]/pages/` existe et contient des fiches pages
2. **Priorite absolue** : si `docs/projets/[nom-client]/VARIANT.md` existe, le lire. Ce fichier contient une direction esthetique deja validee par l'utilisateur via `/variants`. Dans ce cas :
   - Utiliser la palette, la typographie, la signature et le hero de VARIANT.md comme **socle non negociable** du DESIGN.md
   - Parser le bloc YAML `questionnaire` en tete de VARIANT.md (ton, animation, originalite, hero_style...) et **ne pas reposer ces questions** — elles sont deja tranchees
   - Ne poser que les questions restantes (assets, references complementaires)
3. **Lire les fiches pages** pour comprendre le projet (ton editorial, secteur, cible, contenu)
3. **Explorer** `docs/projets/[nom-client]/sources/design/` si le dossier contient des fichiers :
   - Images : analyser visuellement (logos, moodboards, captures de sites de reference, palettes)
   - Fichiers texte/markdown : lire le contenu (briefs design, notes sur les preferences visuelles)
4. **Explorer** aussi `docs/projets/[nom-client]/sources/` pour tout element visuel pertinent (logo, charte graphique, captures d'ecran)
5. **Site existant** — verifier si `docs/projets/[nom-client]/sources/site-existant.md` et `docs/projets/[nom-client]/sources/site-existant/` existent (generes par `/generate`). Si oui, lire le .md et analyser visuellement les images recuperees (logo, photos, visuels). Sinon, si les sources mentionnent un site web existant, tenter de le recuperer avec `curl` (pas WebFetch), sauvegarder le contenu et telecharger les images. Si le curl echoue, noter que le site est inaccessible et continuer
6. **Afficher** un resume de ce qui a ete trouve :
   ```
   Sources design trouvees :
   - [liste des fichiers dans sources/design/ si present]
   - [elements visuels trouves dans sources/]

   Fiches pages analysees : [N] pages
   ```

---

### Phase 2 — Questionnaire visuel

> **IMPORTANT — Direction esthetique audacieuse** : avant de poser les questions classiques (palette, typo), **commencer par poser la question de la direction esthetique globale**. Reference : `.claude/skills/frontend-design/SKILL.md`.
>
> Question 0 obligatoire : quelle **direction conceptuelle** ? Proposer 3-5 directions tranchees adaptees au secteur (ex: editoriale/magazine, brutaliste/raw, luxe/raffinee, retro-futuriste, organique/naturelle, maximaliste/chaotique, minimaliste/industrielle...). Chaque client doit avoir une direction UNIQUE — ne jamais converger sur la meme saveur (ex: "moderne et epure") pour tous les projets.
>
> **Anti-generique** — refuser systematiquement :
> - Polices : Inter, Roboto, Arial, polices systeme (privilegier Fraunces, Instrument Serif, Libre Caslon, DM Serif, Playfair, Cormorant, ou sans-serif distinctives comme Manrope, Work Sans uniquement en corps)
> - Gradients violets sur fond blanc (cliche IA)
> - Palettes "professionnelles" uniformes — preferer couleurs dominantes avec accents nets

Poser les questions **une par une**, en attendant la reponse de l'utilisateur avant de passer a la suivante. Pre-remplir chaque question si les sources apportent deja des elements.

#### Questions (dans l'ordre) :

1. **Palette de couleurs** — Avez-vous des couleurs existantes (logo, charte) ? Sinon, quelle ambiance coloree ? (ex: tons chauds, minimaliste noir/blanc, couleurs vives...)
2. **Typographie** — Avez-vous des polices imposees ? Sinon, quel style preferez-vous ? (ex: moderne sans-serif, classique serif, manuscrit...)
3. **Ambiance visuelle** — Comment decririez-vous l'atmosphere souhaitee ? (ex: professionnelle et sobre, chaleureuse et conviviale, moderne et audacieuse, luxueuse et epuree...)
4. **Sites de reference** — Y a-t-il des sites web dont vous aimez le style visuel ? (URLs)
5. **Assets existants** — Disposez-vous de : logo vectoriel (SVG/AI) ? Photos professionnelles ? Icones ? Illustrations ?

> **Regle** : poser chaque question individuellement, attendre la reponse, puis poser la suivante. Si les sources repondent deja a une question, pre-remplir la reponse et indiquer `(depuis les sources)` — l'utilisateur peut valider ou modifier. Ne poser que les questions pertinentes (sauter celles dont la reponse est evidente depuis les sources).

> Si l'utilisateur n'a pas de preferences marquees, proposer une direction coherente avec le secteur d'activite et le ton editorial des fiches pages.

---

### Phase 3 — Generation

Generer le fichier `docs/projets/[nom-client]/DESIGN.md` avec les 6 sections suivantes :

```markdown
# Brief Design — [Nom du client]

## 1. Palette de couleurs

| Role | Hex | Usage |
|---|---|---|
| Primaire | #XXXXXX | Couleur principale — CTA, accents, liens |
| Primaire clair | #XXXXXX | Fond de sections, hover |
| Secondaire | #XXXXXX | Complement — elements secondaires |
| Secondaire clair | #XXXXXX | Fonds alternes, badges |
| Accent | #XXXXXX | Mise en avant ponctuelle |
| Neutre fonce | #XXXXXX | Texte principal |
| Neutre moyen | #XXXXXX | Texte secondaire, bordures |
| Neutre clair | #XXXXXX | Fonds, separateurs |
| Fond principal | #XXXXXX | Arriere-plan du site |
| Fond secondaire | #XXXXXX | Sections alternees |
| Succes | #XXXXXX | Validations, confirmations |
| Erreur | #XXXXXX | Erreurs, alertes |
| Warning | #XXXXXX | Avertissements |

## 2. Typographie

| Usage | Famille | Style |
|---|---|---|
| Titres (H1-H2) | [famille] | [poids, taille relative, espacement] |
| Sous-titres (H3-H4) | [famille] | [poids, taille relative] |
| Corps de texte | [famille] | [poids, taille, interligne] |
| Navigation | [famille] | [poids, taille, casse] |
| Boutons/CTA | [famille] | [poids, taille, casse] |
| Code/technique | [famille] | [poids, taille] |

## 3. Ambiance visuelle

[Paragraphe descriptif de l'atmosphere visuelle globale : style, impression, references esthetiques, coherence avec le secteur et la cible]

## 4. Direction des composants

### Boutons
- Style : [arrondi/carre/pill]
- Ombre : [none/subtle/medium]
- Hover : [description de l'effet]

### Cartes
- Style : [bordure/ombre/flat]
- Coins : [arrondi px]
- Espacement interne : [compact/normal/spacieux]

### Formulaires
- Style des champs : [bordure complete/underline/filled]
- Labels : [au-dessus/flottant/inline]

### Images
- Style : [coins arrondis/carres/cercle pour avatars]
- Ratio par defaut : [16:9/4:3/libre]

### Espacement
- Approche : [compact/normal/aere]
- Sections : [espacement entre sections]

## 5. References visuelles

| URL | Notes |
|---|---|
| [url] | [ce qui est apprecie dans ce site] |

## 6. Sources design analysees

- [liste des fichiers analyses dans sources/design/ et sources/]
```

> **Regles de generation** :
> - Proposer une palette complete et coherente — ne pas laisser de `#XXXXXX`
> - Choisir des polices Google Fonts disponibles gratuitement
> - Rester coherent avec le ton editorial et le secteur identifies dans les fiches pages
> - Si le client a fourni un logo, extraire les couleurs dominantes pour la palette
> - Les codes hex doivent etre valides (6 caracteres, 0-9 A-F)

---

### Phase 4 — Verification

Avant de presenter le resultat, effectuer un controle interne :

1. **Sections remplies** — aucune section vide, aucun placeholder `#XXXXXX` restant
2. **Hex valides** — tous les codes couleur sont au format `#RRGGBB` valide
3. **Coherence tonale** — la palette et la typographie correspondent au ton editorial des fiches pages
4. **Polices existantes** — les familles de polices proposees existent sur Google Fonts
5. **Contraste** — verifier que le texte fonce sur fond clair est lisible (contraste suffisant)
6. **Corriger** les problemes trouves avant de livrer

### Message de fin

```
Brief design genere pour [nom-client] :
- Fichier : docs/projets/[nom-client]/DESIGN.md
- Palette : [N] couleurs definies
- Typographie : [N] familles selectionnees
- [Resume de l'ambiance en une phrase]

Prochaine etape :
Lancez /build [nom-client] pour generer le site.
```

---

## Regles

- **Ne rien inventer sans base** — s'appuyer sur les sources visuelles, le ton editorial et le secteur pour proposer des directions coherentes
- **Palette complete** — toujours fournir tous les roles de couleur (primaire, secondaire, accent, neutres, fond, etats)
- **Polices gratuites** — proposer uniquement des polices disponibles sur Google Fonts
- **Coherence** — la direction design doit correspondre au positionnement et a la cible identifies dans les fiches pages
- **DESIGN.md = source de verite** — toute modification de design (couleurs, typographie, composants, ambiance) doit etre repercutee dans `docs/projets/[nom-client]/DESIGN.md` en meme temps que dans le code. Le fichier DESIGN.md doit toujours refleter l'etat actuel du design du site
- Si aucun argument n'est fourni, demander le nom du client a l'utilisateur
