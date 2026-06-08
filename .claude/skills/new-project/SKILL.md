---
name: new-project
description: Initialise le dossier d'un nouveau projet client
argument-hint: "[nom-client]"
---

# /new-project [nom-client]

Initialise le dossier d'un nouveau projet client.

## Declenchement

L'utilisateur lance `/new-project [nom-client]` ou `new-project [nom-client]`.

## Instructions

1. **Extraire le nom du client** depuis l'argument. Le convertir en slug kebab-case sans accents (ex: "Boulangerie Martin" → `boulangerie-martin`).

2. **Verifier que le dossier n'existe pas deja** dans `docs/projets/`. Si il existe, prevenir l'utilisateur et demander confirmation avant d'ecraser.

3. **Creer l'arborescence** :
   ```
   docs/projets/[nom-client]/
   ├── sources/
   │   └── design/
   └── pages/
   ```

4. **Confirmer la creation** a l'utilisateur avec un message :
   ```
   Projet "[nom-client]" initialise.
   Dossier cree : docs/projets/[nom-client]/

   Prochaine etape :
   1. Deposez vos sources dans docs/projets/[nom-client]/sources/
      (notes de reunion, briefs, captures d'ecran, contenus existants...)
      Pour les references visuelles (moodboards, logos, palettes...),
      utilisez docs/projets/[nom-client]/sources/design/
   2. Lancez /generate [nom-client]
   ```

## Regles

- Le nom du client doit etre en kebab-case, sans accents, en minuscules
- Ne creer aucun fichier — uniquement les dossiers
- Si aucun argument n'est fourni, demander le nom du client a l'utilisateur
