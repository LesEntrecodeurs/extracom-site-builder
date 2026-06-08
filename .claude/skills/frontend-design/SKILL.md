---
name: frontend-design
description: Cree des interfaces frontend distinctives et de qualite production. A utiliser quand l'utilisateur demande de construire des composants, pages ou applications web. Genere du code creatif et soigne qui evite les esthetiques IA generiques.
---

# frontend-design — Skill officielle Anthropic (adaptee FR)

Cette skill guide la creation d'interfaces frontend distinctives, de qualite production, qui evitent les esthetiques generiques "AI slop". Implementer du vrai code fonctionnel avec une attention exceptionnelle aux details et aux choix creatifs.

L'utilisateur fournit des besoins frontend : un composant, une page, une application ou une interface. Il peut donner du contexte sur l'objectif, la cible, les contraintes techniques.

---

## Design Thinking

**Avant de coder**, comprendre le contexte et **s'engager sur une direction esthetique AUDACIEUSE** :

- **Purpose** — Quel probleme cette interface resout-elle ? Qui l'utilise ?
- **Tone** — Choisir une direction tranchee : brutalement minimale, maximaliste chaotique, retro-futuriste, organique/naturelle, luxe/raffinee, ludique/jouet, editoriale/magazine, brutaliste/brute, art deco/geometrique, doux/pastel, industrielle/utilitaire, etc. Il existe de nombreuses saveurs possibles ; s'en inspirer et designer quelque chose qui est propre a la direction choisie.
- **Constraints** — Exigences techniques (framework, performance, accessibilite).
- **Differentiation** — Qu'est-ce qui rend cette interface **INOUBLIABLE** ? Quelle est la chose unique dont le visiteur se souviendra ?

**CRITIQUE** : choisir une direction conceptuelle claire et l'executer avec precision. Le maximalisme audacieux **ET** le minimalisme raffine fonctionnent — la cle est l'**intentionnalite**, pas l'intensite.

Implementer ensuite du code fonctionnel (HTML/CSS/JS, React, Vue, Next.js...) qui est :

- Production-grade et fonctionnel
- Visuellement frappant et memorable
- Coherent avec un point de vue esthetique clair
- Meticuleusement peaufine dans chaque detail

---

## Frontend Aesthetics Guidelines

### Typography

Choisir des polices **belles, uniques, interessantes**. Eviter les polices generiques (Arial, Inter). Opter pour des choix distinctifs qui elevent l'esthetique. Apparier une police d'affichage distinctive avec une police de corps raffinee.

### Color & Theme

S'engager sur une esthetique coherente. Utiliser des **variables CSS** pour la consistance. Les **couleurs dominantes avec des accents nets** surpassent les palettes timides et uniformement distribuees.

### Motion

Utiliser des animations pour les effets et micro-interactions. Privilegier les solutions **CSS-only** pour HTML pur. Utiliser la librairie Motion pour React quand disponible. Se concentrer sur les **high-impact moments** : un chargement de page bien orchestre avec **reveals staggered** (animation-delay) cree plus de delice que des micro-interactions eparpillees. Utiliser scroll-triggering et hover states qui **surprennent**.

### Spatial Composition

**Layouts inattendus**. Asymetrie. Overlap. Flux diagonal. Elements qui cassent la grille. Negative space genereux **OU** densite controlee.

### Backgrounds & Visual Details

Creer **atmosphere et profondeur** plutot que de rester sur des couleurs pleines. Ajouter des effets contextuels et textures qui correspondent a l'esthetique globale. Appliquer des formes creatives : **gradient meshes**, textures noise, patterns geometriques, transparences superposees, ombres dramatiques, bordures decoratives, curseurs custom, overlays grain.

---

## Anti-patterns — NE JAMAIS faire

NE JAMAIS utiliser d'esthetiques IA generiques :

- Polices **surexploitees** : Inter, Roboto, Arial, polices systeme
- **Gradients violets sur fonds blancs** (cliche)
- **Layouts et patterns de composants predictibles**
- **Cookie-cutter design** sans caractere specifique au contexte

Interpreter creativement et faire des choix **inattendus** qui semblent genuinement designes pour le contexte. **Aucun design ne doit etre identique a un autre**. Varier entre themes clairs et sombres, polices differentes, esthetiques differentes. NE JAMAIS **converger** sur des choix communs (Space Grotesk par exemple) entre plusieurs generations.

---

## Regle de complexite

**IMPORTANT** : faire correspondre la complexite d'implementation a la vision esthetique.

- **Designs maximalistes** → code elabore avec animations et effets etendus
- **Designs minimalistes ou raffines** → retenue, precision, attention meticuleuse au spacing, typographie, details subtils

**L'elegance vient de la bonne execution de la vision.**

---

## Usage dans Claude Press

Cette skill est **auto-activee** par les skills `/design` et `/build` du workflow Claude Press pour :

1. Forcer une **direction esthetique explicite** avant de generer le brief DESIGN.md
2. Eviter les generations de sites qui se ressemblent
3. Refuser les palettes generiques (gradients violets, fonts systeme) lors du build

Les skills `/design` et `/build` referencent explicitement ce document pour leurs regles esthetiques.

---

Source : [Anthropic frontend-design plugin](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design) — 277k+ installations (mars 2026).
