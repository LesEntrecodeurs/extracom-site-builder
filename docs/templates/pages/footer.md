# Footer

> Herite de `_base-page.md` — inclut les sections de base + les sections specifiques ci-dessous.

---

## Informations generales

| Champ | Valeur |
|---|---|
| **Nom de la page** | Footer (Pied de page) |
| **Slug URL** | N/A (composant transversal) |
| **Type de page** | Footer |
| **Priorite** | Haute |
| **Statut** | {{a rediger / en cours / valide}} |

---

## Objectifs de la page

### Objectif principal
Fournir un acces complementaire aux informations legales, de contact et de navigation secondaire.

### Objectifs secondaires
- Rassurer le visiteur (mentions legales, certifications, reseaux sociaux)
- Offrir une navigation alternative en bas de page
- Renforcer le maillage interne

### KPIs associes
- Taux de clic sur les liens du footer
- Acces aux pages legales

---

## Structure du footer

### Colonnes

| Colonne | Titre | Contenu |
|---|---|---|
| Colonne 1 | {{A propos / L'entreprise}} | {{Logo, description courte, coordonnees}} |
| Colonne 2 | {{Navigation / Liens utiles}} | {{Liens vers les pages principales}} |
| Colonne 3 | {{Contact}} | {{Adresse, telephone, email, horaires}} |
| Colonne 4 | {{Suivez-nous / Reseaux}} | {{Icones reseaux sociaux, newsletter}} |

> Adapter le nombre de colonnes (2 a 4) selon le volume de contenu.

### Barre inferieure (copyright bar)
- {{Copyright © annee — Nom de l'entreprise}}
- {{Liens : Mentions legales | Politique de confidentialite | CGV | Plan du site}}
- {{Credits : Realisation par...}} (optionnel)

---

## Wireframe ASCII

> Generer un wireframe ASCII sur mesure montrant la disposition en colonnes du footer.
> Adapter le nombre de colonnes (2 a 4) et leur contenu au client reel.
> Inclure la barre copyright en bas avec les liens legaux applicables.

---

## Liens legaux obligatoires

| Page | Obligatoire | Slug |
|---|---|---|
| Mentions legales | Oui | /mentions-legales |
| Politique de confidentialite | Oui (si cookies/formulaires) | /politique-confidentialite |
| CGV / CGU | Si applicable | /cgv |
| Politique de cookies | Si cookies | /politique-cookies |
| Plan du site | Recommande (SEO) | /plan-du-site |

---

## Reseaux sociaux

| Reseau | URL | Icone |
|---|---|---|
| {{Facebook}} | {{url}} | Oui |
| {{Instagram}} | {{url}} | Oui |
| {{LinkedIn}} | {{url}} | Oui |
| {{Autre}} | {{url}} | Oui |

> Liens vers les reseaux sociaux en target="_blank" avec rel="noopener".

---

## Composants fonctionnels

| Composant | Description | Obligatoire |
|---|---|---|
| Logo ou nom | Rappel de l'identite en bas de page | Non |
| Liens de navigation | Navigation secondaire | Oui |
| Coordonnees | Adresse, telephone, email | Oui |
| Liens legaux | Mentions legales, confidentialite | Oui |
| Reseaux sociaux | Icones avec liens | Non |
| Newsletter | Formulaire d'inscription | Non |
| Copyright | Mention de droit d'auteur | Oui |

---

## Contenu editorial

### Messages cles
- Le footer rassure et offre une navigation de rattrapage
- {{Description courte de l'entreprise si presente dans le footer}}

### Ton et style
Informatif et factuel — le footer est utilitaire.

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
| {{Pages principales}} | {{libelle}} | Navigation secondaire |
| Contact | "Contact" | Navigation |
| Mentions legales | "Mentions legales" | Navigation legale |
| Politique de confidentialite | "Politique de confidentialite" | Navigation legale |
| {{Autres pages legales}} | {{libelle}} | Navigation legale |
| Plan du site | "Plan du site" | Navigation / SEO |

### Liens transversaux

- **Header** : Pas de relation directe — le footer complete le header
- **Menu** : Le footer reprend partiellement la navigation du menu

### Parcours utilisateurs passant par cette page

> Le footer est un filet de rattrapage — il offre une navigation alternative en fin de page.

| Parcours | Role du footer |
|---|---|
| Visiteur arrive en bas de page | Navigation de rattrapage vers pages cles |
| Recherche infos legales | Acces aux mentions legales / confidentialite |

> Le footer apparait sur toutes les pages — il renforce le maillage interne global.

---

## SEO

| Champ | Valeur |
|---|---|
| **Balises** | Le footer utilise une balise `<footer>` semantique |
| **Liens** | Ancres descriptives, pas de "cliquez ici" |
| **Plan du site** | Lien vers le sitemap HTML depuis le footer |

---

## Notes et remarques

- Le footer doit etre identique sur toutes les pages
- Ne pas surcharger — rester lisible et organise
- {{Notes specifiques au client}}
