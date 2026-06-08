# Accueil — Boulangerie Martin

---

## Informations generales

| Champ | Valeur |
|---|---|
| **Nom de la page** | Accueil |
| **Slug URL** | `/` |
| **Type de page** | Accueil |
| **Priorite** | Haute |
| **Statut** | Valide |

---

## Objectifs de la page

### Objectif principal
Presenter la Boulangerie Martin et orienter les visiteurs vers les produits et le formulaire de commande.

### Objectifs secondaires
- Communiquer les horaires et l'adresse en un coup d'oeil
- Mettre en avant le savoir-faire artisanal (levain, farines bio)
- Creer la confiance avec les avis clients Google

### KPIs associes
- Taux de rebond < 50%
- Temps moyen sur page > 45 secondes
- Taux de clic vers /nos-produits > 20%

---

## Proposition de valeur

### Accroche principale
Du pain au levain, petri a la main, cuit chaque matin a Lyon 6e.

### Sous-accroche
Farines bio et locales, viennoiseries maison, patisseries de saison — depuis 2014.

### Preuves de credibilite
- 12 ans de savoir-faire artisanal
- 4.7/5 sur Google (47 avis)
- Farines 100% bio et locales

---

## Structure de la page

### Zone 1 — Hero / Section d'accroche
- **Fonction** : Capter l'attention, communiquer l'identite
- **Contenu** : Accroche "Du pain au levain, petri a la main, cuit chaque matin a Lyon 6e.", sous-accroche, bouton "Decouvrir nos produits", photo de la devanture ou du pain
- **Comportement** : Visible immediatement sans scroll

### Zone 2 — Horaires et localisation
- **Fonction** : Repondre a la question n°1 des visiteurs
- **Contenu** : Adresse (23 rue Duquesne, Lyon 6e), horaires (Mar-Sam 6h30-19h30, Dim 7h-13h), carte miniature
- **Comportement** : Lien vers Google Maps, telephone cliquable

### Zone 3 — Nos specialites
- **Fonction** : Presenter les categories de produits
- **Contenu** : 3 blocs — Pains au levain, Viennoiseries, Patisseries — avec photo, titre, accroche courte et lien "Voir la selection"
- **Comportement** : Liens vers la page /nos-produits (ancres par categorie)

### Zone 4 — Notre histoire (apercu)
- **Fonction** : Humaniser, creer la proximite
- **Contenu** : Photo de Pierre et Marie, texte court (3 phrases sur leur parcours), lien "En savoir plus"
- **Comportement** : Lien vers /a-propos

### Zone 5 — Temoignages clients
- **Fonction** : Renforcer la confiance
- **Contenu** : 3 avis Google selectionnes avec nom, note et extrait
- **Comportement** : Statique, lien vers la page Google pour voir tous les avis

### Zone 6 — Commande speciale (CTA final)
- **Fonction** : Convertir les visiteurs avec un besoin specifique
- **Contenu** : "Un gateau d'anniversaire ? Un plateau pour votre entreprise ? Passez commande !", bouton "Commander"
- **Comportement** : Lien vers /contact avec pre-selection "Commande speciale"

---

## Wireframe ASCII

```
+--------------------------------------------------+
|  [Logo Martin]  Accueil  Produits  A propos       |
|                          Contact   [Commander]     |
+==================================================+
|                                                    |
|   HERO                                             |
|   "Du pain au levain, petri a la main,             |
|    cuit chaque matin a Lyon 6e."                   |
|   [photo devanture / pain]                         |
|              [ Decouvrir nos produits ]             |
|                                                    |
+--------------------------------------------------+
|                                                    |
|   Horaires & Localisation                          |
|   23 rue Duquesne, Lyon 6e                         |
|   Mar-Sam 6h30-19h30 | Dim 7h-13h                 |
|   [📍 Carte mini]  [📞 04 XX XX XX XX]            |
|                                                    |
+--------------------------------------------------+
|                                                    |
|   +-------------+ +-------------+ +-------------+  |
|   | [photo]     | | [photo]     | | [photo]     |  |
|   | Pains au    | | Viennoise-  | | Patisseries |  |
|   | levain      | | ries        | |             |  |
|   | [Voir →]    | | [Voir →]    | | [Voir →]    |  |
|   +-------------+ +-------------+ +-------------+  |
|                                                    |
+--------------------------------------------------+
|                                                    |
|   Pierre et Marie, artisans depuis 2014            |
|   [photo equipe]  {{3 phrases}}                    |
|                   [En savoir plus →]               |
|                                                    |
+--------------------------------------------------+
|                                                    |
|   "Excellent pain !"  "Le meilleur..."  "Un ..."   |
|   ★★★★★ - Jean D.    ★★★★★ - Marie L. ★★★★★      |
|                                                    |
+--------------------------------------------------+
|                                                    |
|   Un gateau d'anniversaire ? Un plateau ?          |
|              [ Commander ]                         |
|                                                    |
+--------------------------------------------------+
|                   [FOOTER]                        |
+--------------------------------------------------+
```

---

## Parcours utilisateur

| Profil visiteur | Parcours attendu |
|---|---|
| Habitant curieux | Accueil → Nos produits → Contact |
| Recherche horaires | Accueil (Zone 2) — quitte satisfait |
| Commande gateau | Accueil → Contact (commande speciale) |
| Entreprise locale | Accueil → Nos produits → Contact (plateau entreprise) |

---

## Composants fonctionnels

| Composant | Description | Obligatoire |
|---|---|---|
| Hero banner | Photo + accroche + CTA | Oui |
| Bloc horaires | Adresse, horaires, carte mini | Oui |
| Blocs produits | 3 cartes avec photo et lien | Oui |
| Temoignages | 3 avis Google | Oui |
| Bloc CTA commande | Incitation a la commande speciale | Oui |
| Apercu A propos | Photo equipe + texte court | Non |

---

## Contenu editorial

### Titre principal (H1)
Boulangerie Martin — Pain au levain artisanal a Lyon 6e

### Sous-titres (H2)
1. Nos specialites
2. Pierre et Marie, artisans boulangers depuis 2014
3. Ce que nos clients disent de nous
4. Envie d'une commande sur mesure ?

### Messages cles
- Le pain est fabrique sur place, chaque matin, avec des farines bio locales
- La boulangerie est un commerce de proximite, familial et chaleureux
- Les commandes speciales sont possibles et encouragees

### Ton et style
Chaleureux et convivial. Parler comme un artisan passione qui accueille ses clients. Eviter le jargon marketing.

---

## Appels a l'action (CTA)

| CTA | Texte | Destination | Priorite |
|---|---|---|---|
| Principal | Decouvrir nos produits | /nos-produits | Haute |
| Secondaire | Commander un gateau | /contact?sujet=commande | Haute |
| Tertiaire | Notre histoire | /a-propos | Basse |

---

## Maillage interne

### Liens entrants

| Page source | Ancre | Type |
|---|---|---|
| Toutes les pages | Logo / lien "Accueil" | Navigation (header/menu) |

### Liens sortants

| Page cible | Ancre | Type |
|---|---|---|
| Nos produits | "Decouvrir nos produits" | CTA principal |
| Nos produits | "Voir la selection" (x3) | Lien contextuel |
| A propos | "En savoir plus" | Lien contextuel |
| Contact | "Commander" | CTA secondaire |
| Google Maps | Carte miniature | Lien externe |
| Page Google avis | "Voir tous les avis" | Lien externe |

### Liens transversaux

- **Header** : Logo → Accueil (cette page), CTA → Contact
- **Menu** : Lien "Accueil" actif, liens vers toutes les rubriques
- **Footer** : Logo → Accueil, liens vers pages principales et legales

### Parcours utilisateurs passant par cette page

| Parcours | Etape precedente | Cette page | Etape suivante |
|---|---|---|---|
| Habitant curieux | Entree (Google "boulangerie lyon 6") | Accueil | Nos produits → Contact |
| Recherche horaires | Entree (Google "horaires boulangerie martin") | Accueil (Zone 2) | Quitte satisfait |
| Commande gateau | Entree (direct) | Accueil | Contact (commande speciale) |
| Entreprise locale | Entree (Google) | Accueil | Nos produits → Contact |

---

## SEO

| Champ | Valeur |
|---|---|
| **Meta title** | Boulangerie Martin — Pain au levain artisanal Lyon 6e |
| **Meta description** | Boulangerie artisanale a Lyon 6e. Pain au levain, viennoiseries maison et patisseries de saison. Farines bio et locales. Ouvert du mardi au dimanche. |
| **Mot-cle principal** | boulangerie artisanale lyon 6 |
| **Mots-cles secondaires** | pain au levain lyon, patisserie lyon 6, boulangerie bio lyon |
| **Intention de recherche** | Navigationnelle |

---

## Notes et remarques

- Les photos du hero et des produits sont disponibles sur le Facebook/Instagram du client
- Verifier les horaires exacts avec le client (jours feries, vacances d'ete)
- Le numero de telephone doit etre cliquable sur mobile (format tel:+33X...)
