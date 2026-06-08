# Menu

> Herite de `_base-page.md` — inclut les sections de base + les sections specifiques ci-dessous.

---

## Informations generales

| Champ | Valeur |
|---|---|
| **Nom de la page** | Menu (Navigation) |
| **Slug URL** | N/A (composant transversal) |
| **Type de page** | Menu |
| **Priorite** | Haute |
| **Statut** | {{a rediger / en cours / valide}} |

---

## Objectifs de la page

### Objectif principal
Permettre au visiteur de naviguer facilement vers toutes les sections du site.

### Objectifs secondaires
- Rendre la structure du site lisible en un coup d'oeil
- Mettre en avant les pages prioritaires
- Offrir une navigation fluide sur desktop et mobile

### KPIs associes
- Taux de clic sur les elements de navigation
- Profondeur de navigation moyenne

---

## Arborescence de navigation

### Navigation principale

```
├── Accueil
├── {{Rubrique 1}}
│   ├── {{Sous-page 1.1}}
│   └── {{Sous-page 1.2}}
├── {{Rubrique 2}}
│   ├── {{Sous-page 2.1}}
│   └── {{Sous-page 2.2}}
├── A propos
├── {{Rubrique N}}
└── Contact
```

### Navigation secondaire
{{Elements presents dans le menu mais avec une visibilite moindre (ex: FAQ, Glossaire, Blog)}}

- {{lien secondaire 1}}
- {{lien secondaire 2}}

### Navigation utilitaire (hors menu principal)
{{Elements de navigation hors menu : recherche, langue, espace client, etc.}}

- {{element utilitaire 1}}
- {{element utilitaire 2}}

---

## Comportement du menu

### Desktop
- **Type** : {{barre horizontale fixe / sticky / avec mega-menu}}
- **Sous-menus** : {{au survol / au clic / mega-menu avec descriptions}}
- **Position** : {{haut de page / laterale}}

### Mobile
- **Type** : {{hamburger / menu plein ecran / menu slide}}
- **Ouverture** : {{icone hamburger / bouton "Menu"}}
- **Sous-menus** : {{accordeon / pages successives}}
- **Fermeture** : {{croix / clic exterieur / swipe}}

### Comportement au scroll
- {{fixe en haut / disparait au scroll down, reapparait au scroll up / change de taille}}

---

## Elements du menu

| Element | Visible desktop | Visible mobile | Lien | Notes |
|---|---|---|---|---|
| Logo | Oui | Oui | / | Retour accueil |
| {{Rubrique 1}} | Oui | Oui | /{{slug}} | {{sous-menu : oui/non}} |
| {{Rubrique 2}} | Oui | Oui | /{{slug}} | |
| Contact | Oui | Oui | /contact | CTA mis en avant |
| {{Element utilitaire}} | Oui | {{oui/non}} | {{lien}} | |

---

## Wireframe ASCII

> Generer un wireframe ASCII sur mesure avec deux versions : desktop et mobile.
> Desktop : montrer la barre de navigation avec les vrais libelles du client.
> Mobile : montrer le menu hamburger ouvert avec l'arborescence reelle (sous-menus inclus).

---

## Composants fonctionnels

| Composant | Description | Obligatoire |
|---|---|---|
| Logo cliquable | Lien vers l'accueil | Oui |
| Liens principaux | Navigation vers les pages cles | Oui |
| Sous-menus | Acces aux sous-pages | Non |
| Bouton CTA | Action prioritaire mise en avant | Non |
| Barre de recherche | Recherche sur le site | Non |
| Selecteur de langue | Si site multilingue | Non |
| Icone hamburger (mobile) | Ouverture du menu mobile | Oui |

---

## Contenu editorial

### Messages cles
- Les libelles de menu doivent etre courts (1-3 mots), clairs et descriptifs
- Eviter le jargon — utiliser les termes que les visiteurs emploient
- {{convention de nommage specifique au client}}

### Ton et style
Neutre et fonctionnel — le menu est un outil de navigation, pas un espace editorial.

---

## Maillage interne

### Liens entrants

| Page source | Ancre | Type |
|---|---|---|
| Toutes les pages | N/A (composant transversal) | Navigation |

### Liens sortants

| Page cible | Ancre | Type |
|---|---|---|
| Accueil | Logo / "Accueil" | Navigation |
| {{Rubrique 1}} | {{libelle menu}} | Navigation |
| {{Rubrique 2}} | {{libelle menu}} | Navigation |
| A propos | "A propos" | Navigation |
| Contact | "Contact" | Navigation / CTA |
| {{Pages secondaires}} | {{libelle}} | Navigation secondaire |

### Liens transversaux

- **Header** : Le menu est integre ou lie au header
- **Footer** : Le footer reprend partiellement la navigation du menu

### Parcours utilisateurs passant par cette page

> Le menu est present sur toutes les pages. Il sert de pivot a tous les parcours.

| Parcours | Role du menu |
|---|---|
| {{parcours 1}} | Point d'acces vers {{page cible}} |
| {{parcours 2}} | Navigation entre {{page A}} et {{page B}} |

> Le menu est le principal vecteur de maillage interne — il distribue l'autorite SEO vers toutes les pages liees.

---

## SEO

| Champ | Valeur |
|---|---|
| **Balises** | Les liens du menu utilisent des ancres descriptives (pas de "cliquez ici") |
| **Structure** | Navigation balisee en `<nav>` avec aria-labels |
| **Mots-cles** | Les libelles de menu integrent les mots-cles principaux du site |

---

## Notes et remarques

- Le menu doit etre coherent entre toutes les pages du site
- Limiter a 7 elements maximum en navigation principale (regle ergonomique)
- {{Notes specifiques au client}}
