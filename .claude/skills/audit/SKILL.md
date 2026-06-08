---
name: audit
description: Audite le site genere du projet client (SEO, CRO, accessibilite, performance, contenu)
argument-hint: "[nom-client]"
---

# /audit [nom-client]

Audite le site genere d'un projet client sur 7 axes : SEO technique, SEO on-page, GEO (Generative Engine Optimization), CRO (conversion), accessibilite, performance et coherence contenu. Produit un rapport d'audit avec un score global et des actions prioritaires.

## Declenchement

L'utilisateur lance `/audit [nom-client]` ou `audit [nom-client]`.

## Pre-requis

- Le dossier `apps/[nom-client]/` doit exister (sinon, suggerer `/build [nom-client]` d'abord)
- Le build doit passer (`yarn turbo build --filter=@claude-site-builder/[nom-client]`)

## Instructions

Le processus se deroule en **5 phases sequentielles** couvrant **7 axes**. Ne jamais sauter une phase.

---

### Phase 1 — Verification

1. **Verifier** que `apps/[nom-client]/` existe
2. **Lancer le build** : `yarn turbo build --filter=@claude-site-builder/[nom-client]`
3. **Si le build echoue** : afficher les erreurs, proposer de corriger d'abord. Ne pas auditer un site qui ne compile pas
4. **Charger le contexte** :
   - Fiches pages depuis `docs/projets/[nom-client]/pages/`
   - `docs/projets/[nom-client]/DESIGN.md` si present
   - `docs/projets/[nom-client]/BUILD.md` si present
5. **Afficher** :
   ```
   Verification pour [nom-client] :
   - Projet : apps/[nom-client]/ present
   - Build : succes
   - Fiches pages : [N] pages
   - Brief design : [present/absent]
   - Config technique : [present/absent]

   Lancement de l'audit sur 7 axes. Cela peut prendre quelques minutes.
   ```

---

### Phase 2 — Audit SEO technique

Analyser les fichiers du projet pour verifier les elements SEO techniques.

#### 2.1 — Crawlabilite & indexation

| Point de controle | Ou verifier | Attendu |
|---|---|---|
| `sitemap.ts` present | `src/app/sitemap.ts` | Exporte toutes les routes publiques avec `lastModified` |
| `robots.ts` present | `src/app/robots.ts` | Autorise `Googlebot`, `Bingbot`, `GPTBot`, `ClaudeBot`, `PerplexityBot` |
| `llms.txt` present | `src/app/llms.txt/route.ts` | Retourne un Markdown valide avec H1 (nom du site), blockquote (resume) et liste des pages |
| Toutes les pages dans le sitemap | Croiser sitemap avec les fiches pages | Chaque page avec un slug doit apparaitre |
| Pas de pages orphelines | Verifier le maillage | Chaque page est accessible depuis la navigation |

#### 2.2 — Donnees structurees JSON-LD

| Schema | Ou | Obligatoire |
|---|---|---|
| `WebSite` | Page d'accueil | Oui — avec `name`, `url`, `description`, `publisher` |
| `Organization` | Page d'accueil | Oui — avec `name`, `url`, `logo`, `contactPoint` |
| `LocalBusiness` | Page d'accueil (si adresse physique) | Conditionnel |
| `WebPage` | Chaque page | Oui — avec `name`, `description`, `url`, `breadcrumb` |
| `BreadcrumbList` | Chaque page sauf accueil | Oui — coherent avec le fil d'Ariane visuel |
| `FAQPage` | Page FAQ (si elle existe) | Conditionnel |
| `Service` | Pages services (si elles existent) | Conditionnel |
| `ContactPage` | Page contact | Oui |

**Verification** : chaque JSON-LD doit etre un JSON valide, utiliser `@context: "https://schema.org"`, et contenir toutes les proprietes requises.

#### 2.3 — Meta elements

Pour **chaque page**, verifier :

| Element | Regle |
|---|---|
| `title` | Present, unique, 50-60 caracteres, contient le mot-cle principal |
| `description` | Present, unique, 150-160 caracteres, contient un CTA implicite |
| `openGraph.title` | Present, coherent avec title |
| `openGraph.description` | Present, coherent avec description |
| `openGraph.type` | Present (`website` pour accueil, `article` pour blog) |
| `openGraph.url` | Present, URL absolue |
| `openGraph.images` | Present, au moins une image. Verifier que `src/app/opengraph-image.tsx` existe a la racine (image par defaut). **Critique si absent** |
| `twitter.card` | Present (`summary_large_image`). Verifier que `src/app/twitter-image.tsx` existe a la racine |
| `alternates.canonical` | Present, URL absolue |

#### 2.4 — Semantique HTML

Pour **chaque page**, verifier dans le code JSX/TSX :

| Regle | Verification |
|---|---|
| Un seul `<h1>` par page | Compter les `<h1>` dans le module de la page |
| Hierarchie h1-h6 sans saut | Pas de h1 → h3 sans h2 intermediaire |
| Pas de hX dans le footer | Le footer ne doit contenir aucune balise `<h1>` a `<h6>` — utiliser `<p>` ou `<span>` pour les titres de colonnes |
| Structure semantique | Presence de `<main>`, `<section>`, `<nav>` |
| Images avec `alt` | Toutes les balises `next/image` ou `<img>` ont un `alt` descriptif en francais |
| Liens avec ancres pertinentes | Pas de "cliquez ici", "en savoir plus" sans contexte |
| `<address>` pour les coordonnees | Si page contact avec adresse/telephone |
| `<time datetime>` pour les dates | Si des dates sont affichees |

---

### Phase 3 — Audit SEO on-page & contenu

#### 3.1 — Mots-cles et contenu

Pour chaque page, croiser avec la fiche page correspondante :

**Mots-cles (principal + variations)** :

| Point de controle | Verification |
|---|---|
| Mot-cle principal dans le `<h1>` | Le H1 genere contient le mot-cle de la fiche |
| Mot-cle dans les 100 premiers mots | Le premier paragraphe de contenu visible contient le mot-cle |
| Mot-cle dans 2-3 sous-titres (h2) | Au moins 2 H2 contiennent une variation du mot-cle |
| Meta title contient le mot-cle | Verifier dans `generateMetadata` |
| Meta description contient le mot-cle | Verifier dans `generateMetadata` |
| Variations lexicales | Le mot-cle est decline (pluriel, synonymes, termes apparentes) — pas de stuffing repetitif |

**Mots-cles geographiques (SEO local)** :

| Point de controle | Verification |
|---|---|
| Ville presente dans le H1 de l'accueil | Le nom de la ville apparait dans le H1 de la page d'accueil |
| Ville dans la meta description de chaque page | Le nom de la ville est mentionne dans la meta description (pages locales) |
| Frequence de la ville | La ville apparait au moins 3-5 fois dans les pages accueil / contact / plan-d-acces / notre-cabinet |
| Couple ville + metier | Au moins 2-3 occurrences du type "[metier] a [ville]" ou "[ville] - [metier]" |
| Code postal dans adresse | Le code postal apparait dans le `<address>` et le JSON-LD LocalBusiness |
| Region ou zone de chalandise | Les pages cles mentionnent la region / agglomeration (ex: "Moselle", "Grand Est") |

**Volume de contenu** :

| Point de controle | Seuil | Verification |
|---|---|---|
| Seuil de 1000 mots (regle #11 CLAUDE.md) | 1000 mots minimum | Pages hors header/footer/menu/mentions-legales doivent atteindre ce volume de contenu visible. Signaler les pages en-dessous (non bloquant mais recommande) |
| Accueil — volume renforce | 1500 mots minimum | Page la plus critique pour le SEO local |
| Pages services / pages villes | 800-1200 mots | Volume adapte pour couvrir l'intention utilisateur |
| Pages pratiques (contact, plan-acces) | 500-800 mots | Moins de volume mais doivent contenir toutes les infos utiles |
| Blog / articles | 1200-2000 mots | Cible pour signaler l'expertise |

**Coherence et logique du contenu** :

| Point de controle | Verification |
|---|---|
| Titre H1 coherent avec le contenu | Le contenu de la page repond bien a ce que promet le H1 (pas de clickbait) |
| Progression logique des H2 | L'ordre des H2 suit un parcours narratif (intro → developpement → preuves → conclusion / CTA) — pas de sauts thematiques abruptes |
| Sections liees entre elles | Les sections partagent un fil conducteur — pas de juxtaposition de blocs sans lien |
| Pas de repetitions | Le meme argument/benefice n'est pas repete inchange dans plusieurs sections |
| Ton coherent sur toute la page | Le registre reste homogene (technique vs grand public) sans ruptures |
| Pas de contradiction | Aucune affirmation n'est contredite plus loin dans la page |

**Densite de donnees (GEO)** :

| Point de controle | Verification |
|---|---|
| Au moins 1 chiffre par section significative | Statistique, resultat, duree, pourcentage, nombre de clients... |
| Chiffres specifiques et non vagues | "+200% de trafic" et non "amelioration significative" |
| Dates et anciennete | "Depuis 2015", "4 ans d'experience" — signal de credibilite |
| Preuves sociales numeriques | Nombre de projets / clients / avis Google — dans le contenu ou via JSON-LD AggregateRating |

#### 3.2 — Maillage interne

| Point de controle | Verification |
|---|---|
| Liens entrants/sortants de chaque fiche | Chaque lien defini dans la section "Maillage interne" de la fiche existe dans le code |
| Ancres descriptives | Les textes d'ancre sont pertinents et varies (pas toujours le meme texte) |
| Pas de liens casses | Chaque `href` interne pointe vers une route existante |
| Navigation coherente | Header et Footer refletent les fiches `header.md` et `footer.md` |
| Fil d'Ariane present | Composant breadcrumb sur toutes les pages sauf accueil |
| Fil d'Ariane coherent avec JSON-LD | Le BreadcrumbList JSON-LD correspond au breadcrumb visuel |

#### 3.3 — Coherence fiches / code

| Point de controle | Verification |
|---|---|
| Structure des zones | Chaque zone definie dans la fiche a une section correspondante dans le code |
| CTA presents | Chaque CTA de la fiche est implemente dans la page |
| CTA destinations | Les liens des CTA pointent vers les bonnes pages |
| Contenu editorial | Le H1, les H2 et les messages cles de la fiche sont presents dans le code |

#### 3.4 — GEO (Generative Engine Optimization)

Le GEO optimise le contenu pour etre cite par les moteurs IA (Google AI Overviews, Perplexity, ChatGPT Search, Gemini, Bing Copilot, Claude). Il etend le SEO classique.

**Ecriture answer-first** :

| Point de controle | Verification |
|---|---|
| Reponse directe sous chaque H2 | Le premier paragraphe apres chaque H2 est auto-suffisant (40-60 mots), pas une introduction vague |
| Pas d'accroche vide avant la reponse | Pas de "Dans cet article, nous allons..." ou "Il est important de..." avant la reponse concrete |
| Sections auto-contenues | Chaque bloc H2 forme une reponse complete qu'un moteur IA peut extraire independamment |

**Structure optimisee IA** :

| Point de controle | Verification |
|---|---|
| H2 formules comme des questions | Au moins 30% des H2 sont formules comme des questions conversationnelles (quand pertinent) |
| Listes a puces pour les enumerations | Les avantages, services, etapes utilisent `<ul>` ou `<ol>` et non des paragraphes |
| Tableaux pour les comparaisons | Les donnees comparatives utilisent `<table>` avec `<thead>` et `<th>` |
| Paragraphes courts | 2-4 phrases max par paragraphe — pas de blocs de texte denses |

**Densite de donnees et citations** :

| Point de controle | Verification |
|---|---|
| Statistiques et chiffres cles | Presence de donnees chiffrees dans les sections de contenu (objectif : au moins 1 par section significative) |
| Temoignages avec attribution | Format `<blockquote>` + `<cite>` avec nom, role, entreprise — pas de temoignages anonymes |
| Affirmations soutenues | Les promesses de valeur sont etayees par des preuves (chiffres, exemples, temoignages) |

**Optimisation des entites** :

| Point de controle | Verification |
|---|---|
| Nom de marque explicite | L'entreprise est nommee par son nom (pas uniquement "nous"/"notre") dans le H1, premier paragraphe, meta description |
| Contexte geographique et sectoriel | Le nom est lie a sa localisation et son secteur au moins une fois (`"[Nom], agence web a [Ville]"`) |
| Frequence du nom de marque | Le nom apparait au moins 2-3 fois dans le contenu principal (hors header/footer) |

**Section FAQ — OBLIGATOIRE sur chaque page (regle #6 CLAUDE.md)** :

| Point de controle | Verification |
|---|---|
| FAQ obligatoire sur chaque page | Toute page (hors mentions legales, politique de confidentialite, header, footer, menu) inclut un bloc FAQ de 3 a 6 questions |
| Questions en 3eme personne avec nom de marque | « Comment [Marque] accompagne-t-elle ... ? » pour ancrage GEO |
| Reponses answer-first | 1ere phrase = reponse directe (40-60 mots), puis details |
| Pas de copier-coller entre pages | Chaque FAQ est specifique au sujet de la page |
| Maillage interne dans les FAQ | Si une reponse est developpee sur une autre page, la reponse FAQ inclut un lien interne vers cette page avec ancre descriptive (jamais "cliquez ici" seul) |
| JSON-LD FAQPage | Toute page avec bloc FAQ inclut le schema FAQPage (combine avec les autres schemas du type de page) |

**Sont critiques** (bloquants pour valider la page) :
- Page sans FAQ (hors exceptions : mentions legales, politique confidentialite)
- FAQ sans JSON-LD FAQPage
- Moins de 3 questions dans une FAQ

**Accessibilite aux crawlers IA** :

| Point de controle | Verification |
|---|---|
| robots.ts autorise les bots IA | `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended` sont autorises |
| llms.txt present et valide | `/llms.txt` retourne un Markdown avec le nom du site en H1 et la liste des pages principales |
| Contenu en HTML serveur | Le contenu principal est rendu cote serveur (SSR/SSG), pas uniquement en JS client |
| Pas de blocage des crawlers IA | Aucune regle `Disallow` ne cible les user-agents IA |

**Sont critiques pour le GEO** :
- robots.ts bloque les crawlers IA
- llms.txt absent ou mal forme
- Aucune section de contenu auto-contenue (tout depend du contexte precedent)
- Nom de marque absent du H1 et de la meta description
- FAQ absente sur une page (hors legales) — regle #6 CLAUDE.md
- FAQ sans JSON-LD FAQPage associe
- Pas de maillage interne dans les FAQ vers les pages qui developpent le sujet
- Ville / zone geographique absente des pages cles (accueil, contact, notre-cabinet)
- Page accueil sous 1000 mots (regle #11 CLAUDE.md)
- Aucune donnee chiffree dans les sections principales (signal de credibilite manquant pour les moteurs IA)
- Contenu incoherent ou contradictoire entre sections

---

### Phase 4 — Audit CRO, accessibilite & performance

#### 4.1 — CRO (Conversion Rate Optimization)

Analyser les pages cles (accueil, services, contact, landing pages) :

**Test des 5 secondes (above the fold)** :

| Critere | Verification |
|---|---|
| Proposition de valeur claire | Le hero de chaque page cle communique le quoi/pour qui/pourquoi en une phrase |
| CTA visible sans scroll | Au moins un CTA dans la hero section |
| Signal de confiance visible | Chiffre cle, temoignage, logo client, ou certification dans le hero |

**CTA** :

| Critere | Verification |
|---|---|
| Texte actionnable | Verbe d'action + benefice (`"Demander un devis gratuit"`, pas `"Envoyer"` ou `"Soumettre"`) |
| Hierarchie CTA | Un CTA primaire clair par section, pas de CTAs concurrents |
| Distribution sur la page | CTAs distribues (hero, milieu, fin), pas tous concentres au meme endroit |
| CTA final avec risk reversal | Dernier CTA accompagne d'un element de reassurance ("Sans engagement", "Reponse sous 24h") |

**Signaux de confiance** :

| Critere | Verification |
|---|---|
| Temoignages avec attribution | Nom, role, entreprise — pas de temoignages anonymes |
| Chiffres specifiques | Resultats concrets (`"+300% de visibilite"`) plutot que vagues (`"amelioration significative"`) |
| Preuves sociales | Nombre de clients, logos, notes, certifications |
| Placement strategique | Signaux de confiance pres des CTA et apres les promesses de valeur |

**Gestion des objections** :

| Objection courante | Reponse attendue |
|---|---|
| "Est-ce que c'est pour moi ?" | Cas d'usage, temoignages de profils similaires |
| "Est-ce que ca marche ?" | Resultats, etudes de cas, chiffres |
| "C'est complique ?" | Process en 3-5 etapes, "accompagnement", "cle en main" |
| "Pourquoi vous ?" | Differenciation, expertise, anciennete, certifications |

#### 4.2 — Accessibilite

| Critere | Verification |
|---|---|
| Semantique HTML | `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>` utilises correctement |
| Alt sur toutes les images | Pas d'alt vide sauf pour les images purement decoratives (`alt=""`) |
| `aria-label` sur les interactions | Boutons sans texte, icones cliquables, toggles |
| Hierarchie des titres | h1 → h2 → h3 sans saut de niveau |
| Contrastes | Les couleurs du DESIGN.md offrent un contraste suffisant (verifier les combinaisons texte/fond) |
| Focus visible | Les elements interactifs ont un style `:focus-visible` |
| Navigation au clavier | Les liens, boutons et champs de formulaire sont accessibles au clavier |
| Formulaire accessible | Labels associes aux inputs, messages d'erreur lies via `aria-describedby` |

#### 4.3 — Performance

| Critere | Verification |
|---|---|
| `next/image` pour toutes les images | Pas de `<img>` brutes, toujours le composant Next.js |
| `loading="lazy"` sauf above the fold | Les images hero ont `priority={true}`, les autres `loading="lazy"` |
| `sizes` sur les images responsives | Attribut `sizes` adapte au layout |
| Polices optimisees | Google Fonts via `next/font` (pas de `<link>` dans le head) |
| Pas de bundles inutiles | Pas de librairies lourdes non necessaires |
| Composants `'use client'` minimaux | Seuls les composants interactifs sont marques client |

---

### Phase 5 — Rapport d'audit

Generer le rapport en 3 parties : **scores**, **problemes critiques**, et **recommandations**.

#### 5.1 — Scores par axe

Attribuer un score sur 100 pour chaque axe, base sur le nombre de points conformes par rapport au total des points verifies :

```
Audit [nom-client] — Scores

| Axe                    | Score   | Statut  |
|------------------------|---------|---------|
| SEO technique          | [X]/100 | [emoji] |
| SEO on-page & contenu  | [X]/100 | [emoji] |
| GEO (moteurs IA)       | [X]/100 | [emoji] |
| CRO (conversion)       | [X]/100 | [emoji] |
| Accessibilite          | [X]/100 | [emoji] |
| Performance            | [X]/100 | [emoji] |
| Coherence fiches/code  | [X]/100 | [emoji] |
|------------------------|---------|---------|
| Score global           | [X]/100 | [emoji] |
```

Statuts :
- 90-100 : Excellent
- 75-89 : Bon
- 50-74 : A ameliorer
- 0-49 : Critique

#### 5.2 — Problemes critiques

Lister les problemes bloquants qui doivent etre corriges en priorite :

```
Problemes critiques (a corriger immediatement) :

1. [Axe] — [Description precise du probleme]
   Fichier : [chemin du fichier concerne]
   Impact : [SEO / Conversion / Accessibilite]
   Correction : [Description de la correction a appliquer]

2. ...
```

**Sont critiques** :
- Meta title ou description manquants
- JSON-LD invalide ou manquant sur une page obligatoire
- `<h1>` manquant ou multiple
- Lien interne casse
- Page definie dans une fiche mais absente du code
- CTA manquant sur la page d'accueil ou contact
- Images sans alt
- Sitemap incomplet
- robots.ts bloque les crawlers IA (GEO)
- Nom de marque absent du H1 et de la meta description (GEO)

#### 5.3 — Recommandations

Classer les recommandations en 3 categories :

**Quick wins** (5-10 minutes par correction) :
- Ajouts de meta manquants
- Corrections d'alt images
- Ajouts d'aria-labels
- Corrections d'ancres de liens

**Ameliorations importantes** (15-30 minutes) :
- Restructuration de contenu pour mieux couvrir les mots-cles
- Ajout de signaux de confiance manquants
- Correction de la hierarchie des titres
- Amelioration des CTA

**Evolutions strategiques** (necessite une reflexion ou des sources supplementaires) :
- Ajout de temoignages clients reels
- Ajout de cas d'usage ou etudes de cas
- Renforcement du maillage interne
- Amelioration de la proposition de valeur

#### 5.4 — Proposition de correction automatique

Apres avoir presente le rapport, demander a l'utilisateur :

```
Voulez-vous que je corrige automatiquement les problemes critiques et les quick wins ?
Cela concerne [N] corrections sur [M] fichiers.

[oui / non / choisir]
```

Si l'utilisateur accepte :
1. Appliquer les corrections dans le code
2. Mettre a jour les fiches pages si le contenu change
3. Relancer le build pour verifier que tout compile
4. Afficher un resume des corrections appliquees

#### 5.5 — Generation du fichier AUDIT.md

Generer `docs/projets/[nom-client]/AUDIT.md` avec le rapport complet :

```markdown
# Audit — [Nom du client]

**Date** : [date du jour]
**Score global** : [X]/100

## Scores par axe

| Axe | Score | Statut |
|---|---|---|
| SEO technique | [X]/100 | [statut] |
| SEO on-page & contenu | [X]/100 | [statut] |
| GEO (moteurs IA) | [X]/100 | [statut] |
| CRO (conversion) | [X]/100 | [statut] |
| Accessibilite | [X]/100 | [statut] |
| Performance | [X]/100 | [statut] |
| Coherence fiches/code | [X]/100 | [statut] |

## Problemes critiques

[Liste des problemes critiques avec fichier, impact et correction]

## Quick wins

[Liste des corrections rapides]

## Ameliorations importantes

[Liste des ameliorations recommandees]

## Evolutions strategiques

[Liste des evolutions a plus long terme]

## Corrections appliquees

[Si des corrections automatiques ont ete faites, les lister ici]
```

---

## Regles

- **Ne pas modifier le code sans accord** — presenter le rapport d'abord, corriger ensuite seulement si l'utilisateur le demande
- **Fidelite aux fiches pages** — l'audit compare le code genere aux fiches pages, pas a des standards inventes
- **Pas de faux positifs** — ne signaler que les vrais problemes. Si un element est absent des fiches pages, ce n'est pas une erreur dans le code
- **Pragmatisme** — un site vitrine n'a pas les memes exigences qu'un e-commerce. Adapter la severite au contexte
- **Scores honnetes** — ne pas gonfler les scores. Un 100/100 signifie que tous les points sont conformes, pas que le site est "parfait"
- **Accents** — tout texte en francais dans le rapport doit comporter les accents corrects
- Si aucun argument n'est fourni, demander le nom du client a l'utilisateur

## Reference — Bonnes pratiques SEO pour sites vitrines

### Meta elements

| Element | Regle | Exemple |
|---|---|---|
| Meta title | 50-60 caracteres, mot-cle au debut, benefice | `Création de sites web à Strasbourg \| Les Entrecodeurs` |
| Meta description | 150-160 caracteres, mot-cle + CTA implicite | `Agence web à Strasbourg spécialisée en sites vitrines et e-commerce. Devis gratuit sous 24h.` |
| URL slug | Minuscules, tirets, 3-5 mots, mot-cle | `/services/creation-site-web` |
| Canonical | URL absolue, auto-referente sur les pages uniques | `https://example.com/services/creation-site-web` |

### Formules CTA efficaces

| Type | Formule | Exemples |
|---|---|---|
| Action + Benefice | `[Verbe] + [ce qu'ils obtiennent]` | `Obtenir mon devis gratuit`, `Démarrer mon projet` |
| Problem-Solution | `Stop [douleur]. Start [resultat].` | `Fini les sites lents. Place à la performance.` |
| Benefit-First | `[Resultat] sans [sacrifice]` | `Un site professionnel sans prise de tête` |

### Signaux de confiance (du plus fort au plus faible)

1. Resultats specifiques avec chiffres (`+200% de trafic en 6 mois`)
2. Temoignages nommes avec role et entreprise
3. Nombre de clients ou projets (`50+ projets livres`)
4. Logos clients reconnaissables
5. Notes et avis (Google, Trustpilot)
6. Certifications et partenariats
7. Anciennete (`Depuis 2015`)

### Principes de psychologie appliques au CRO

| Principe | Application site vitrine |
|---|---|
| Reciprocite | Offrir de la valeur d'abord (audit gratuit, guide, conseil) avant de demander |
| Preuve sociale | Montrer que d'autres ont fait confiance (logos, temoignages, chiffres) |
| Autorite | Expertise demontree (certifications, cas d'etude, anciennete) |
| Rarete/Urgence | Utiliser avec parcimonie et honnetete (`Places limitees`, `Offre valable jusqu'au...`) |
| Aversion a la perte | Formuler en termes de ce qu'ils perdent a ne pas agir |
| Ancrage | Montrer la valeur haute avant le prix (`Valeur estimée : 5000€ — Votre investissement : 2500€`) |
| Reduction de friction | Minimiser l'effort percu (`En 3 etapes`, `Sans engagement`, `Reponse sous 24h`) |
