# {{NOM_PAGE}}

> Template de base — toutes les fiches pages heritent de cette structure.
> Supprimer cette ligne dans les fichiers generes.

---

## Informations generales

| Champ | Valeur |
|---|---|
| **Nom de la page** | {{nom_page}} |
| **Slug URL** | `/{{slug}}` |
| **Type de page** | {{type : accueil / contact / a-propos / etc.}} |
| **Priorite** | {{haute / moyenne / basse}} |
| **Statut** | {{a rediger / en cours / valide}} |

---

## Objectifs de la page

### Objectif principal
{{Quel est le but premier de cette page ?}}

### Objectifs secondaires
- {{objectif 2}}
- {{objectif 3}}

### KPIs associes
- {{indicateur mesurable 1}}
- {{indicateur mesurable 2}}

---

## Structure de la page

> Description fonctionnelle zone par zone, de haut en bas.

### Zone 1 — {{Nom de la zone}}
- **Fonction** : {{role de cette zone}}
- **Contenu** : {{description du contenu attendu}}
- **Comportement** : {{interactions ou logique particuliere}}

### Zone 2 — {{Nom de la zone}}
- **Fonction** : {{role de cette zone}}
- **Contenu** : {{description du contenu attendu}}
- **Comportement** : {{interactions ou logique particuliere}}

### Zone 3 — {{Nom de la zone}}
- **Fonction** : {{role de cette zone}}
- **Contenu** : {{description du contenu attendu}}
- **Comportement** : {{interactions ou logique particuliere}}

> Ajouter autant de zones que necessaire.

---

## Wireframe ASCII

> Generer un wireframe ASCII sur mesure pour cette page. Regles :
> - Chaque zone decrite dans "Structure de la page" doit apparaitre comme un bloc distinct
> - Inclure [HEADER] en haut et [FOOTER] en bas
> - Montrer la disposition des elements cles (textes, images, boutons, formulaires, colonnes)
> - Adapter la mise en page au contenu reel du client (pas de placeholder generique)
> - Utiliser des cadres `+---+`, des crochets `[ ]` pour les boutons, et des descriptions courtes pour le contenu

---

## Composants fonctionnels

| Composant | Description | Obligatoire |
|---|---|---|
| {{nom_composant}} | {{description}} | {{oui/non}} |

---

## Contenu editorial

### Titre principal (H1)
{{Proposition de H1}}

### Sous-titres (H2)
1. {{H2 — section 1}}
2. {{H2 — section 2}}
3. {{H2 — section 3}}

### Messages cles
- {{message 1 — ce que le visiteur doit retenir}}
- {{message 2}}
- {{message 3}}

### Ton et style
{{Description du ton attendu pour cette page}}

---

## Appels a l'action (CTA)

| CTA | Texte | Destination | Priorite |
|---|---|---|---|
| Principal | {{texte du bouton}} | {{page ou action cible}} | Haute |
| Secondaire | {{texte du bouton}} | {{page ou action cible}} | Moyenne |

---

## Maillage interne

### Liens entrants

| Page source | Ancre | Type |
|---|---|---|
| {{page_source}} | {{texte du lien}} | {{CTA / lien contextuel / navigation}} |

### Liens sortants

| Page cible | Ancre | Type |
|---|---|---|
| {{page_cible}} | {{texte du lien}} | {{CTA / lien contextuel / navigation}} |

### Liens transversaux

> Liens provenant des composants presents sur toutes les pages.

- **Header** : {{logo → accueil, CTA → contact, etc.}}
- **Menu** : {{lien vers cette page si present dans le menu}}
- **Footer** : {{lien vers cette page si present dans le footer}}

### Parcours utilisateurs passant par cette page

| Parcours | Etape precedente | Cette page | Etape suivante |
|---|---|---|---|
| {{nom du parcours}} | {{page precedente ou entree}} | {{Nom_page}} | {{page suivante}} |

---

## SEO

| Champ | Valeur |
|---|---|
| **Meta title** | {{60 caracteres max}} |
| **Meta description** | {{155 caracteres max}} |
| **Mot-cle principal** | {{mot-cle}} |
| **Mots-cles secondaires** | {{mot-cle 2, mot-cle 3}} |
| **Intention de recherche** | {{informationnelle / navigationnelle / transactionnelle}} |

---

## Notes et remarques

- {{Note ou point d'attention pour cette page}}
- {{Element a valider avec le client}}
