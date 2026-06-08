---
name: generate
description: Analyse les sources du client et genere toutes les fiches pages du projet
argument-hint: "[nom-client]"
---

# /generate [nom-client]

Analyse les sources deposees par le client et genere l'ensemble des fiches pages du site.

## Declenchement

L'utilisateur lance `/generate [nom-client]` ou `generate [nom-client]`.

## Pre-requis

- Le dossier `docs/projets/[nom-client]/` doit exister (sinon, suggerer `/new-project [nom-client]` d'abord)
- Le dossier `docs/projets/[nom-client]/sources/` doit contenir au moins un fichier

## Instructions

Le processus se deroule en **6 phases sequentielles**. Ne jamais sauter une phase.

---

### Phase 1 — Confirmation

1. **Lister** le contenu du dossier `docs/projets/[nom-client]/sources/`
2. **Afficher** un message de confirmation :
   ```
   Le dossier sources/ contient N fichier(s) :
   - fichier1.md
   - fichier2.png
   - ...

   Puis-je les analyser pour generer les specifications du site ?
   ```
3. **Attendre** la validation de l'utilisateur avant de continuer

---

### Phase 2 — Analyse

1. **Lire TOUT** le contenu du dossier `sources/` :
   - Fichiers texte/markdown : lire le contenu integral
   - Images et screenshots : les analyser visuellement (logos, maquettes, captures d'ecran)
2. **Site existant** — si les sources mentionnent un site web existant du client :
   - Recuperer le HTML de la page d'accueil avec `curl -sL -k`
   - Extraire tous les liens internes du site pour decouvrir toutes les pages
   - Crawler chaque page interne avec `curl` pour extraire le contenu et les images
   - Sauvegarder l'analyse complete dans `docs/projets/[nom-client]/sources/site-existant.md` (titre, structure, textes extraits, couleurs/polices detectees, arborescence des pages)
   - Extraire **toutes** les URLs d'images de **toutes** les pages (logo, hero, photos de realisations, actualites, equipe, etc.) et les telecharger avec `curl` dans `docs/projets/[nom-client]/sources/site-existant/` en conservant le nom de fichier original
   - Generer `docs/projets/[nom-client]/sources/site-existant/images.md` : un fichier Markdown listant toutes les images avec leur URL source (tableau fichier/URL). Ce fichier est versionne dans git (les images binaires sont gitignored) et permet de re-telecharger les images avec `curl` si besoin
   - Ces fichiers serviront de reference pour les skills suivants (`/design`, `/build`) sans avoir a re-fetcher le site
3. **Charger** la reference de questions depuis `.claude/skills/generate/questions-reference.md`
3. **Classer** les informations trouvees selon les 6 axes :
   - Bloc 1 : Identite et contexte
   - Bloc 2 : Objectifs du site
   - Bloc 3 : Cible et positionnement
   - Bloc 4 : Contenu et pages
   - Bloc 5 : Fonctionnalites
   - Bloc 6 : Contraintes et priorites
4. **Identifier** les informations manquantes par rapport a la reference de questions

---

### Phase 3 — Recapitulatif

Presenter a l'utilisateur **UN SEUL message** structure en 3 parties :

#### Partie A — Synthese de comprehension
Resume structure de ce qui a ete compris du projet, organise par les 6 blocs.

#### Partie B — Liste de pages proposees
```
Pages obligatoires :
1. Accueil
2. Menu
3. Header
4. Footer
5. Contact
6. A propos
7. Glossaire

Pages specifiques :
8. [nom-page] — [justification depuis les sources]
9. [nom-page] — [justification depuis les sources]
```

#### Partie C — Questions manquantes
Uniquement les questions dont les reponses sont **necessaires pour generer les pages** et qui n'ont pas ete trouvees dans les sources. Ne poser que les questions **pertinentes** pour ce client (ne pas poser les questions e-commerce si le client ne vend pas en ligne, etc.).

> **Regle importante** : ne pas inventer de besoins. Si une information n'est pas dans les sources et n'a pas ete evoquee par le client, ne pas la demander. Se limiter a ce que les sources mentionnent explicitement.

Si des informations complementaires seraient utiles, suggerer a l'utilisateur d'ajouter des sources dans le dossier `sources/` plutot que de poser une longue liste de questions.

```
Informations manquantes :

[Bloc] :
- [question 1]
- [question 2]

Pour enrichir les specifications, vous pouvez aussi ajouter
des sources dans docs/projets/[nom-client]/sources/ (captures d'ecran
de l'ancien site, plaquettes, contenus existants...).
```

> Presenter les questions de maniere conversationnelle et groupee. L'utilisateur doit pouvoir repondre a tout en un seul message. Rester concis — peu de questions valent mieux qu'un interrogatoire.

---

### Phase 4 — Echange

1. **L'utilisateur repond** aux questions et valide/modifie la liste de pages
2. **Mettre a jour** la comprehension du projet avec les nouvelles informations
3. **Si des informations restent manquantes** apres la reponse, proposer a l'utilisateur d'ajouter des sources complementaires dans `sources/` puis relancer `/generate`. Ne pas insister — generer avec ce qui est disponible.
4. **Obtenir la validation finale** de la liste de pages avant de generer

---

### Phase 5 — Generation

1. **Generer TOUTES les pages en memoire d'abord** (sans ecrire de fichier) :
   - Cela permet d'assurer la coherence du maillage interne entre les pages
   - Chaque lien sortant d'une page doit correspondre a un lien entrant d'une autre page
   - Les parcours utilisateurs doivent etre coherents d'une page a l'autre

2. **Pour chaque page** :
   - Charger le template correspondant depuis `docs/templates/pages/`
     - Pages obligatoires : utiliser le template specifique (ex: `docs/templates/pages/accueil.md`)
     - Pages specifiques : utiliser `docs/templates/pages/_base-page.md` comme base
   - Remplir **toutes** les sections avec les informations du projet
   - Adapter le contenu au secteur d'activite et au ton du client
   - Generer un **wireframe ASCII** fidele aux zones decrites dans la structure
   - Remplir le **maillage interne** complet (liens entrants, sortants, transversaux, parcours)
   - Si une information manque, ecrire un contenu plausible ou neutre (ex: `—` dans un tableau, `#` pour un lien inconnu) — ne **jamais** ecrire `[A COMPLETER]` dans les fiches pages

3. **Verifier la coherence du maillage** entre toutes les pages avant d'ecrire

4. **Ecrire** tous les fichiers dans `docs/projets/[nom-client]/pages/[slug].md`

5. **Generer `docs/projets/[nom-client]/todo.md`** — fichier centralise listant **uniquement** les elements concrets que les sources mentionnent explicitement mais dont la valeur n'a pas ete fournie (ex: une URL evoquee en interview mais non transmise, une adresse mentionnee mais incomplete). Ne **pas** inventer de besoins — si une information n'est pas evoquee dans les sources, elle n'a pas sa place dans le todo. Le fichier peut etre vide ou tres court, c'est normal.

---

### Phase 6 — Verification

Avant de presenter le resultat a l'utilisateur, effectuer un controle interne :

1. **Pages obligatoires** : les 7 pages sont presentes
2. **Maillage coherent** : chaque lien sortant d'une page a un lien entrant correspondant sur la page cible (pas de lien vers une page inexistante)
3. **Wireframes** : chaque page a un wireframe ASCII correspondant a ses zones
4. **SEO** : chaque page a meta title, meta description, mots-cles, intention de recherche
5. **Sections remplies** : aucune section vide
6. **Todo** : le fichier `todo.md` ne contient que les elements explicitement mentionnes dans les sources mais non fournis
7. **Corriger** les problemes trouves avant de livrer

### Message de fin

```
Generation terminee pour [nom-client] :
- [N] fiches pages generees dans docs/projets/[nom-client]/pages/
- [Liste des pages avec leur slug]
- Todo : docs/projets/[nom-client]/todo.md ([X] element(s) a fournir)
```

---

## Regles

- **Ne rien inventer** — travailler exclusivement a partir des sources. Ne pas ajouter de contenus, de pages, de fonctionnalites ou de besoins qui ne sont pas dans les sources. Si une info manque, utiliser un contenu neutre (`—`, `#`) et passer, sans le signaler comme un manque
- **Todo minimal** — le fichier `todo.md` ne liste que les elements explicitement mentionnes dans les sources mais dont la valeur concrete n'a pas ete fournie (ex: URL evoquee mais non transmise). Ne jamais inventer de besoins. Si le todo est vide, ne pas le creer
- **Suggerer d'ajouter des sources** — si des informations seraient utiles, proposer a l'utilisateur de deposer des sources supplementaires dans `sources/` plutot que de creer une longue liste de questions ou de todo
- Remplir **toutes** les sections de chaque template — aucune section vide
- Les contenus editoriaux (H1, H2, messages, CTA) doivent etre adaptes au secteur et au ton du client
- Le SEO doit etre renseigne avec des mots-cles pertinents pour le secteur
- Le wireframe ASCII de chaque page doit refleter fidelement les zones decrites dans "Structure de la page"
- Le maillage interne doit etre coherent entre toutes les pages (pas de lien vers une page inexistante)
- Consulter les exemples dans `docs/templates/examples/` pour le niveau de detail attendu
- Ne **jamais** ecrire `[A COMPLETER]` dans les fiches pages — utiliser un contenu plausible ou neutre a la place
