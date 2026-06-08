---
name: variants
description: |
  Genere N directions visuelles (hero + palette + typo + signature + ton) pour valider la DA avant build Next.js.
  Produit VARIANT.md avec la direction retenue, consomme par /design et /build.
  TRIGGER quand : l'utilisateur parle de direction design, DA, variantes visuelles, moodboard,
  palette, hero, "plusieurs styles", "quel look", avant un build, avant un /design.
  SKIP si : VARIANT.md existe deja et est valide (proposer plutot /design).
argument-hint: "[nom-client]"
---

# /variants [nom-client]

Genere **N directions visuelles tranchees** (par defaut 3) pour le projet client, chacune auto-suffisante (hero HTML + palette + typo + signature + ton). L'utilisateur choisit une direction, qui alimente `/design` et `/build`.

Reference obligatoire : `.claude/skills/frontend-design/SKILL.md` (anti-generique + directions esthetiques).

---

## Pre-requis

- `docs/projets/[nom-client]/pages/` doit contenir des fiches pages (sinon : suggerer `/generate` d'abord)
- `docs/projets/[nom-client]/sources/` existe (materiaux deposes par le client)

## Principe anti-convergence (CRITIQUE)

Avant de proposer les variantes :
1. Lire les 2-3 derniers `docs/projets/*/DESIGN.md` existants
2. Noter leur direction esthetique, polices, couleurs dominantes
3. Les variantes proposees **DOIVENT differer** de ces derniers projets
4. Si le secteur est similaire (ex: 2 cabinets medicaux d'affilee), changer explicitement de registre visuel

Reference : regle #5 "Diversifier le style entre projets" dans CLAUDE.md.

---

## Instructions — 5 phases

### Phase 1 — Lecture

1. Lire toutes les fiches pages dans `docs/projets/[nom-client]/pages/`
2. Identifier : secteur, ton editorial, cible, valeurs differenciantes
3. Lire `docs/projets/[nom-client]/sources/design/` si present (logos, moodboards, palettes existantes)
4. Lire les 2-3 derniers `docs/projets/*/DESIGN.md` (anti-convergence)
5. Si le client a impose une charte graphique (logo, couleurs), l'integrer comme contrainte

### Phase 2 — Questionnaire structure (AskUserQuestion)

Poser 2 appels `AskUserQuestion` de 4 questions chacun + 2 textareas libres a la fin. Les options permettent a l'utilisateur de cliquer plutot que de formuler — nettement plus rapide.

**Pre-remplir** chaque question quand les sources apportent une reponse evidente (pre-check mental). Si une question est totalement tranchee par les sources ou une charte existante, la skipper.

#### Appel 1 — Cadrage visuel (4 Q)

```
Q1 — Direction esthetique generale
Options :
  - Editorial / magazine (gros titres, typo expressive)
  - Premium studio (minimal, blanc, details soignes)
  - Brutaliste / audacieux (gros contrastes, grilles cassees)
  - Rester proche de l'existant (juste raffine)
  [ + Decide for me en Other... ]

Q2 — Palette / couleurs
Options :
  - Nouveau duo moderne (a definir ensemble)
  - Quasi-monochrome noir/blanc + 1 accent
  - Palette chaude (ivoire, terre, accent vif)
  - Palette froide / technique (gris bleute, cyan)
  [ + Decide for me en Other... ]

Q3 — Typographie
Options :
  - Sans-serif moderne distinctive (ni Inter ni Roboto)
  - Serif editorial pour titres + sans pour corps
  - Grotesque technique (JetBrains, IBM Plex, Space Grotesk)
  - Mix sans + mono (signaler dimension tech)
  [ + Decide for me en Other... ]

Q4 — Style du hero
Options :
  - Grande typographie + sous-titre, tres minimal
  - Hero avec visuel produit / capture a droite
  - Hero avec animation / element interactif
  - Hero editorial (pleine page, image atmospherique)
  [ + Decide for me en Other... ]
```

#### Appel 2 — Expression et tonalite (4 Q)

```
Q5 — Ton et copywriting
Options :
  - Garder le copy existant
  - Direct et punchy (phrases courtes)
  - Technique et precis (vocabulaire metier)
  - Humain et artisanal (on parle de craft, d'equipe)
  [ + Decide for me en Other... ]

Q6 — Niveau d'interactivite / animations
Options :
  - Sobre (micro-interactions au survol)
  - Moyen (transitions, scroll reveals, hover marques)
  - Riche (animations au scroll, hero anime, transitions marquees)
  [ + Decide for me en Other... ]

Q7 — Degre d'originalite
Options :
  - Safe (design propre, patterns reconnus)
  - Equilibre (propre mais 1-2 elements qui marquent)
  - Audacieux (on se permet du decalage, de l'inattendu)
  [ + Decide for me en Other... ]

Q8 — Combien de variations generer
Options :
  - 2 variations
  - 3 variations (recommande)
  - 5 variations
  [ + Other... pour saisir un nombre libre ]
```

#### Champs libres (apres les 2 appels)

Poser ensuite, en texte libre normal :

1. **Sites / studios qui t'inspirent ?** (URLs ou noms — aide a calibrer le gout)
2. **Elements a absolument conserver ou eviter ?** (ex: logo existant, section Alliances, palette charte-mere... ou au contraire supprimer)

Si l'utilisateur repond "rien" / "aucun" sur ces deux questions, passer directement a la Phase 3.

---

### Phase 3 — Generation des N directions

Generer N directions (selon Q8) **nettement distinctes entre elles** et **differentes des derniers projets**. La direction #1 colle au plus pres des reponses du questionnaire ; les suivantes prennent des risques progressifs dans les limites posees par Q7 (originalite).

Exemples de paires de directions a explorer (varier selon Q1) :
- Brutalist / Luxe / Organique
- Editorial magazine / Retro-futuriste / Industriel minimal
- Maximaliste / Soft pastel / Anthracite technique
- Art deco / Playful toy / Refined neutre

Pour chaque direction, generer une fiche **identique dans sa structure** :

```markdown
## Direction [N] — [Nom]

### Vibe
[1 phrase qui resume l'identite visuelle]

### Palette
| Role | Hex | Usage |
|---|---|---|
| Primaire | #XXXXXX | CTA, accents, italiques titres |
| Primaire clair | #XXXXXX | Fonds de section, hover |
| Secondaire | #XXXXXX | [role] |
| Fond | #XXXXXX | Arriere-plan |
| Fond alt | #XXXXXX | Sections alternees |
| Texte | #XXXXXX | Corps de texte |
| Texte doux | #XXXXXX | Descriptions, legendes |
| Bordure | #XXXXXX | Rings, separateurs |

### Typographie
- **Display (H1-H2)** : [nom Google Font] — [poids, style]
- **Sous-titres (H3-H4)** : [idem ou variante]
- **Corps** : [sans-serif distinctive, pas Inter/Roboto/Arial]

### Ton editorial
[Issu de Q5 : direct punchy / technique / artisanal / existant]

### Signature
[1 element visuel qui rend cette direction MEMORABLE : motif decoratif, animation, composition, detail typographique. Un seul, tranche.]

### Layout du hero
[Issu de Q4 : grande typo / visuel produit / animation / editorial pleine page]

### Niveau d'animation
[Issu de Q6 : sobre / moyen / riche]

### Hero HTML d'exemple
```html
<section style="background: #XXXXXX; padding: 80px 40px; font-family: 'X', serif;">
  [code HTML inline avec styles inline pour rendu immediat]
</section>
```

### Pour qui / pourquoi
[2-3 phrases : quel type de client/cible, quel probleme resolu, quel positionnement porte]
```

### Prototype HTML standalone (OBLIGATOIRE)

En plus de la fiche markdown, generer pour chaque direction un **fichier HTML ouvrable** dans `docs/projets/[nom-client]/variants/direction-[N]-[nom-slug].html`. L'utilisateur pourra l'ouvrir en double-cliquant et **ressentir** la direction plutot que de juste lire une fiche.

**Contenu du prototype** (page complete, pas juste le hero) :
1. `<head>` avec les `<link>` Google Fonts correspondant a la typo de la direction
2. `<style>` inline avec :
   - CSS custom properties de la palette (--primary, --bg, --text, etc.)
   - Reset minimal + styles typographiques (font-family sur body/headings)
   - Classes utilitaires pour les 3-4 sections (container, hero, grid, card)
3. `<body>` avec au moins **4 sections** tirees des fiches pages du client :
   - **Hero** — reprend le H1 + sous-titre de la page accueil + 1 CTA
   - **Section features/services** — 3 cards avec titres/descriptions tirees des fiches
   - **Section secondaire** (ton, signature visuelle appliquee — motif decoratif, citation, stats, mosaique...)
   - **Footer** — nom du client, tagline, liens principaux
4. Contenu reel issu des fiches pages (pas de Lorem ipsum)
5. Responsive minimal (media query `@media (max-width: 768px)`)

**Taille cible** : 150-300 lignes par fichier, auto-suffisant (aucune dependance externe sauf Google Fonts).

**Pourquoi** : un markdown + un snippet hero ne permettent pas de juger l'ensemble. Un HTML complet montre la direction dans un contexte realiste.

### Phase 4 — Presentation au user

Afficher les N fiches cote a cote avec un resume synthetique en tete + **liens vers les prototypes HTML** pour que l'utilisateur puisse les ouvrir :

```
N directions pour [nom-client] :

  ▸ Direction 1 — [Nom] : [vibe en 5 mots]
    Prototype : docs/projets/[nom-client]/variants/direction-1-[slug].html
  ▸ Direction 2 — [Nom] : [vibe en 5 mots]
    Prototype : docs/projets/[nom-client]/variants/direction-2-[slug].html
  ▸ Direction 3 — [Nom] : [vibe en 5 mots]
    Prototype : docs/projets/[nom-client]/variants/direction-3-[slug].html

Ouvre les prototypes dans un navigateur pour comparer.

[Les N fiches detaillees ci-dessous]
```

Puis proposer via `AskUserQuestion` :

```
Quelle direction te plait ?
Options :
  - Direction 1
  - Direction 2
  - Direction 3
  - Mix / ajustements (je precise)
```

Si l'utilisateur choisit "Mix / ajustements", lui demander en texte libre les ajustements souhaites (ex: "la 2 mais avec les couleurs de la 1").

### Phase 5 — Sauvegarde

Une fois l'utilisateur a choisi :
1. Ecrire `docs/projets/[nom-client]/VARIANT.md` avec la fiche complete de la direction retenue (ajustements integres)
2. Ajouter en tete du fichier :
   ```yaml
   ---
   source_skill: variants
   validated_at: YYYY-MM-DD
   questionnaire:
     direction: [reponse Q1]
     palette: [reponse Q2]
     typo: [reponse Q3]
     hero_style: [reponse Q4]
     ton: [reponse Q5]
     animation: [reponse Q6]
     originalite: [reponse Q7]
   ---
   ```
3. Afficher :
   ```
   Direction validee pour [nom-client] : [Nom]

   Fichier : docs/projets/[nom-client]/VARIANT.md

   Prochaine etape :
   Lancez /design [nom-client] — la skill utilisera cette variante comme base.
   ```

---

## Regles

1. **Questionnaire structure** — utiliser `AskUserQuestion` pour les 8 questions (pas de questions ouvertes au debut). Option "Decide for me" via le bouton "Other..." fourni automatiquement.
2. **Variantes nettement differentes** — pas N variations de "moderne et epure". Chaque direction est un engagement esthetique different.
3. **Anti-generique systematique** (voir frontend-design SKILL.md) :
   - Jamais : Inter, Roboto, Arial, polices systeme, gradients violets sur fond blanc
   - Toujours : signature visuelle unique et memorable
4. **Anti-convergence** — verifier les 2-3 derniers DESIGN.md du projet et s'assurer que les variantes n'en sont pas des clones.
5. **Polices distinctives** sur Google Fonts : Fraunces, Instrument Serif, Libre Caslon, DM Serif, Playfair, Cormorant, Manrope, Space Grotesk, JetBrains Mono, IBM Plex, Work Sans...
6. **Hero HTML inline** — le code fourni se rend dans un navigateur sans build, styles inline (pas de Tailwind).
7. **Palette complete** — jamais de `#XXXXXX` en placeholder, toujours 8 roles remplis.
8. **Ajustements acceptes** — si l'utilisateur demande un mix, regenerer la variante fusionnee avant de sauvegarder.
9. **Integration /design** — `/design` lit `VARIANT.md` + le bloc `questionnaire` pour ne pas reposer les questions deja tranchees.
10. **Si aucune ne convient** — proposer N nouvelles variantes en changeant explicitement de registre (ne pas iterer sur les memes directions).

---

## Workflow Claude Press

```
/new-project → /generate → /variants → /design → /build → /audit → /deploy
                                ↑
                        questionnaire structure ici
```

`/variants` intervient **entre `/generate`** (qui produit les fiches pages) **et `/design`** (qui produit DESIGN.md).
