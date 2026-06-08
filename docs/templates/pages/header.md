# Header

> Herite de `_base-page.md` — inclut les sections de base + les sections specifiques ci-dessous.

---

## Informations generales

| Champ | Valeur |
|---|---|
| **Nom de la page** | Header (En-tete) |
| **Slug URL** | N/A (composant transversal) |
| **Type de page** | Header |
| **Priorite** | Haute |
| **Statut** | {{a rediger / en cours / valide}} |

---

## Objectifs de la page

### Objectif principal
Identifier l'entreprise et fournir un acces rapide aux actions et informations cles.

### Objectifs secondaires
- Renforcer l'identite de marque sur chaque page
- Donner acces aux informations de contact essentielles
- Faciliter l'acces aux actions prioritaires (contact, RDV, etc.)

### KPIs associes
- Taux de clic sur les elements du header
- Reconnaissance de marque

---

## Elements du header

### Zone gauche
- **Logo** : {{description du logo — texte, image, ou les deux}}
- **Lien** : Pointe vers l'accueil (`/`)

### Zone centrale
- {{Baseline / slogan de l'entreprise}} (optionnel)
- {{Barre de navigation principale}} (si integree au header)

### Zone droite
- {{Numero de telephone cliquable}}
- {{Bouton CTA : ex. "Prendre RDV", "Nous contacter"}}
- {{Icones reseaux sociaux}} (optionnel)
- {{Selecteur de langue}} (optionnel)

### Barre superieure (top bar) — optionnelle
{{Bandeau au-dessus du header avec informations complementaires}}
- {{Horaires d'ouverture}}
- {{Adresse}}
- {{Promotion ou annonce}}

---

## Comportement au scroll

| Comportement | Description |
|---|---|
| **Position initiale** | {{statique en haut de page}} |
| **Au scroll** | {{fixe (sticky) / disparait / reduit en taille / change de couleur}} |
| **Retour en haut** | {{reprend sa taille initiale / bouton "retour en haut"}} |

---

## Adaptations mobile

| Element | Desktop | Mobile |
|---|---|---|
| Logo | Taille standard | Reduit |
| Telephone | Visible en texte | Icone cliquable |
| CTA | Bouton avec texte | Bouton reduit ou icone |
| Navigation | Barre horizontale | Hamburger menu |
| Top bar | Visible | {{masquee / visible reduite}} |

---

## Wireframe ASCII

> Generer un wireframe ASCII sur mesure avec deux versions : desktop et mobile.
> Montrer les vrais elements du client : logo, baseline, top bar (si applicable), CTA, telephone.
> Adapter selon que le header inclut ou non une top bar, une baseline, etc.

---

## Composants fonctionnels

| Composant | Description | Obligatoire |
|---|---|---|
| Logo | Image/texte cliquable vers l'accueil | Oui |
| Navigation principale | Menu de navigation (ou lien vers) | Oui |
| CTA principal | Bouton d'action prioritaire | Non |
| Telephone | Numero cliquable (tel:) | Non |
| Top bar | Bandeau d'informations complementaires | Non |
| Recherche | Barre ou icone de recherche | Non |

---

## Contenu editorial

### Messages cles
- Le header communique l'identite de l'entreprise sans avoir besoin de le lire en detail
- {{Slogan ou baseline si applicable}}

### Ton et style
Sobre et professionnel — le header est un repere visuel, pas un espace de contenu.

---

## Maillage interne

### Liens entrants

| Page source | Ancre | Type |
|---|---|---|
| Toutes les pages | N/A (composant transversal) | Navigation |

### Liens sortants

| Page cible | Ancre | Type |
|---|---|---|
| Accueil | Logo | Navigation |
| Contact | {{ex: "Nous contacter"}} | CTA |
| {{Autres pages}} | {{ancre}} | Navigation |

### Liens transversaux

- **Menu** : Le header integre ou est adjacent au menu de navigation
- **Footer** : Pas de relation directe — le header et le footer encadrent la page

### Parcours utilisateurs passant par cette page

> Le header est present sur toutes les pages. Il offre un acces permanent aux actions prioritaires.

| Parcours | Role du header |
|---|---|
| {{parcours 1}} | Acces rapide au contact via CTA |
| {{parcours 2}} | Retour accueil via logo |

> Le header apparait sur toutes les pages — ses liens ont un poids SEO important.

---

## SEO

| Champ | Valeur |
|---|---|
| **Balises** | Le header utilise une balise `<header>` semantique |
| **Logo** | Alt text descriptif incluant le nom de l'entreprise |
| **Liens** | Ancres descriptives sur tous les liens du header |

---

## Notes et remarques

- Le header doit etre identique sur toutes les pages (coherence)
- {{Contraintes specifiques du client : charte, couleurs, etc.}}
