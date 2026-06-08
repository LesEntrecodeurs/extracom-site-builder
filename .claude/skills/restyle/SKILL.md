---
name: restyle
description: |
  Change la direction artistique globale d'un site client deja genere (palette, typographie,
  ambiance) et propage partout : VARIANT.md, DESIGN.md, tokens Tailwind, globals.css,
  composants avec couleurs hardcodees, og image, llms.txt.
  TRIGGER quand : l'utilisateur demande un changement de direction artistique globale,
  "change la couleur primaire", "nouvelle typo pour tout le site", "je veux tester une
  autre palette", "refresh du look", "rebranding", "change l'ambiance visuelle",
  "passe le site en dark mode par defaut", sur un projet deja existant dans apps/.
  SKIP si : changement localise a un composant ou une section (utiliser /refine a la place),
  ou projet non encore buildé (proposer /build).
argument-hint: "[nom-client]"
---

# /restyle [nom-client]

Skill de changement de direction artistique globale. Remplace les "Claude, change la couleur primaire partout" par un workflow qui garantit la coherence entre VARIANT.md, DESIGN.md et tout le code.

## Pre-requis

- `apps/[nom-client]/` doit exister (sinon : proposer `/build` d'abord)
- `docs/projets/[nom-client]/DESIGN.md` doit exister (sinon : proposer `/design` d'abord)

## Difference avec /refine

- `/refine` : change un composant ou une section (ex: "retire cette card")
- `/restyle` : change la DA globale qui se propage partout (ex: "change la palette")

Si l'utilisateur hesite, demander le scope.

---

## Instructions — 6 phases

### Phase 1 — Snapshot initial

Lire et afficher l'etat actuel :

1. **VARIANT.md** — direction actuelle, bloc `questionnaire` si present
2. **DESIGN.md** — palette complete, typographies, ambiance
3. **Tokens** — `apps/[client]/src/app/globals.css` (custom properties) et `tailwind.config.ts` si present
4. **Couleurs hardcodees** — grep les hex codes dans `apps/[client]/src/**/*.tsx` :
   ```bash
   grep -rE "#[0-9a-fA-F]{6}\b" apps/[client]/src --include="*.tsx" --include="*.ts" --include="*.css"
   ```
   Lister les fichiers et les occurrences.

Afficher un resume :
```
DA actuelle pour [nom-client] :
- Palette : primaire #2f6fb5 (bleu), accent #4280bc, etc.
- Typographie : Fraunces (display) + Manrope (body)
- Ambiance : [extrait DESIGN.md]

Couleurs hardcodees detectees dans le code : [N] occurrences dans [M] fichiers
```

### Phase 2 — Questionnaire (AskUserQuestion)

```
Q1 — Que veux-tu changer ?
Options :
  - Palette (couleurs : primaire, accent, fonds...)
  - Typographie (familles de polices)
  - Les deux (palette + typo)
  - Ambiance globale (palette + typo + esprit, refonte plus large)
  [ + Other... ]

Q2 — Intensite du changement
Options :
  - Ajustement leger (ex: meme famille, juste plus sature / teinte voisine)
  - Changement marque (ex: bleu -> terracotta, serif -> grotesque)
  - Refonte totale (nouvelle direction esthetique — pose la question de relancer /variants)
  [ + Other... ]
```

**Si "Refonte totale" (Q2)** : proposer de relancer `/variants [nom-client]` pour choisir une nouvelle direction proprement, au lieu de bricoler sur l'existant. Sortir du skill si l'utilisateur accepte.

### Phase 3 — Proposition de nouvelle DA

Selon les reponses, proposer :

**Si palette** : une nouvelle palette complete (meme structure que celle de DESIGN.md actuel, 8-13 roles). Avec :
- Contraste verifie sur texte principal (WCAG AA minimum, ratio >=4.5)
- Coherence avec l'ambiance choisie ou l'existante
- Exemples avant/apres sur 1 composant cle (hero ou CTA)

**Si typographie** : proposer 1-2 paires (display + body) avec preview textuelle :
```
AVANT : Fraunces (display) + Manrope (body)
APRES 1 : Instrument Serif (display) + Inter Display (body)
APRES 2 : DM Serif (display) + Work Sans (body)
```

**Si ambiance** : proposer une courte fiche (2-3 phrases) qui decrit l'esprit vise et les implications sur palette/typo/composants.

**Lister les fichiers qui seront modifies** :
```
Fichiers a modifier :
- docs/projets/[client]/VARIANT.md (ton + palette + signature)
- docs/projets/[client]/DESIGN.md (palette, typographie, ambiance)
- apps/[client]/src/app/globals.css (custom properties)
- apps/[client]/tailwind.config.ts (si tokens Tailwind)
- [N] fichiers .tsx avec couleurs hardcodees
- apps/[client]/src/app/opengraph-image.tsx (si palette change)
- apps/[client]/src/app/twitter-image.tsx (si palette change)
- apps/[client]/public/llms.txt (si rebranding avec nouveau nom/description)
```

### Phase 4 — Validation

Presenter un diff textuel condense pour que l'utilisateur valide :

```
DA AVANT :                    DA APRES :
Primaire : #2f6fb5            Primaire : #c2410c
Accent : #4280bc              Accent : #f59e0b
Fond : #eff5fb                Fond : #fef7ed
Display : Fraunces            Display : Instrument Serif
Body : Manrope                Body : Inter Display

Ambiance : "sobre et corporate"
       -> "chaleureux et editorial"
```

Puis `AskUserQuestion` :
```
Q — On applique ?
Options :
  - Oui, applique
  - Ajuster avant (je precise)
  - Annuler
```

### Phase 5 — Application

1. **Mettre a jour VARIANT.md** — palette, typographie, ambiance, signature. Ajouter en bas du fichier un bloc historique :
   ```yaml
   ---
   restyled_at: YYYY-MM-DD
   previous_primary: #2f6fb5
   reason: [raison de l'utilisateur]
   ---
   ```

2. **Mettre a jour DESIGN.md** — palette, typographie, ambiance, direction des composants si necessaire.

3. **Mettre a jour les tokens** :
   - `globals.css` : reecrire les `--primary`, `--foreground`, etc.
   - `tailwind.config.ts` si present : reecrire les couleurs custom
   - Les polices : si changement typo, mettre a jour le `<link>` Google Fonts dans `layout.tsx` et la classe Tailwind `font-*`

4. **Remplacer les hex codes hardcodes** dans les fichiers detectes (grep de phase 1). Utiliser `Edit` avec `replace_all` pour les occurrences homogenes (meme hex meme casse).

5. **Mettre a jour les images dynamiques** :
   - `src/app/opengraph-image.tsx`
   - `src/app/twitter-image.tsx`
   - Tout autre composant `ImageResponse` qui utilise la palette

6. **Mettre a jour llms.txt** si le rebranding touche le nom, la tagline ou la description du cabinet/projet.

7. **Ne pas** lancer `yarn build` — l'utilisateur le fera manuellement.

### Phase 6 — Livraison

Afficher un recap concis et des points a verifier :

```
Restyle applique pour [nom-client] :

Fichiers mis a jour :
- VARIANT.md : nouvelle palette + ton + signature
- DESIGN.md : palette (13 roles), typo (Instrument Serif + Inter Display)
- globals.css : 8 custom properties
- 14 fichiers .tsx : hex codes remplaces
- opengraph-image.tsx : nouveau fond + couleurs

A verifier manuellement :
- Lancer yarn dev:[nom-client] pour visualiser
- Verifier les contrastes a11y sur les sections clees (hero, CTA, FAQ)
- Verifier l'opengraph image generee (/opengraph-image)
- Verifier que les logos/photos clients s'integrent bien au nouveau fond
- Relancer /audit [nom-client] pour un check SEO/CRO/a11y complet

Ancien hex primaire (#2f6fb5) archive dans VARIANT.md si besoin de rollback.
```

---

## Regles

1. **Snapshot avant action** — toujours afficher l'etat actuel (phase 1) avant de proposer. L'utilisateur doit voir ce qui va changer.
2. **Diff avant application** — afficher avant/apres synthetique (phase 4) et obtenir confirmation explicite via `AskUserQuestion`.
3. **Grep hardcoded colors** — apres avoir change les tokens, chercher et remplacer tous les hex codes dans `.tsx`/`.ts`/`.css`. Les couleurs ne doivent pas rester en dur.
4. **Contraste WCAG** — la nouvelle palette doit respecter un ratio >=4.5 pour le texte principal sur fond. Verifier avec une estimation rapide (ex: via les outils standard ou un calcul sur les luminances).
5. **Ne pas casser les JSON-LD** — si `LocalBusiness.image` ou des URLs de logos changent, propager.
6. **Archive du changement** — garder trace du changement en fin de VARIANT.md (bloc `restyled_at`, `previous_primary`, `reason`). Permet un rollback si besoin.
7. **Pas de yarn build automatique** — utilisateur build lui-meme (memoire utilisateur).
8. **Redirect pour modif localisee** — si l'utilisateur dit "juste le CTA du hero", refuser et renvoyer vers `/refine`.
9. **Anti-convergence** — si apres restyle le projet ressemble trop a 1-2 autres clients recents, le signaler a l'utilisateur (regle CLAUDE.md #5).
10. **Refonte totale -> /variants** — si le user veut "changer radicalement", proposer `/variants` plutot que de bricoler sur l'existant.

---

## Exemples de declenchement

| Formulation utilisateur | Action |
|---|---|
| `/restyle echo-bigi` | Snapshot + questionnaire |
| "change la couleur primaire d'echo-bigi en terracotta" | Q1 = palette, Q2 = changement marque |
| "je veux tester une autre typo pour tout le site" | Q1 = typo |
| "refresh du look, ca fait trop corporate" | Q1 = ambiance globale |
| "rebranding complet" | Q2 = refonte totale -> propose /variants |
| "change juste le bouton du hero" | REDIRECT vers /refine (scope composant) |
| "passe le site en dark mode par defaut" | Q1 = palette (inversion fond/texte) |

---

## Workflow Claude Press

```
/new-project → /generate → /variants → /design → /build → /audit → /deploy
                              ↑                     ↓
                     /restyle (refonte)        /refine (iteration)
                                                   ↓
                                              /restyle (DA globale)
```

`/restyle` intervient apres `/build` pour les changements de direction artistique globale. `/refine` pour les changements localises. Les deux coexistent.
