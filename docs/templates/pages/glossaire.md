# Glossaire

> Herite de `_base-page.md` — inclut les sections de base + les sections specifiques ci-dessous.

---

## Informations generales

| Champ | Valeur |
|---|---|
| **Nom de la page** | Glossaire |
| **Slug URL** | `/glossaire` |
| **Type de page** | Glossaire |
| **Priorite** | Moyenne |
| **Statut** | {{a rediger / en cours / valide}} |

---

## Objectifs de la page

### Objectif principal
Definir les termes metier du secteur pour informer les visiteurs et capter du trafic SEO longue traine.

### Objectifs secondaires
- Positionner l'entreprise comme experte de son domaine
- Creer des pages d'entree SEO sur des requetes informationnelles
- Fournir un support de comprehension aux visiteurs non-inities

### KPIs associes
- Trafic organique sur les termes du glossaire
- Taux de rebond par definition
- Navigation vers les pages services depuis le glossaire

---

## Termes a definir

| Terme | Definition courte | Lien vers page | Priorite SEO |
|---|---|---|---|
| {{terme 1}} | {{definition en 1-2 phrases}} | {{/page-liee ou N/A}} | {{haute/moyenne/basse}} |
| {{terme 2}} | {{definition en 1-2 phrases}} | {{/page-liee ou N/A}} | {{haute/moyenne/basse}} |
| {{terme 3}} | {{definition en 1-2 phrases}} | {{/page-liee ou N/A}} | {{haute/moyenne/basse}} |

> Lister 10 a 30 termes cles du secteur d'activite du client.

---

## Organisation du glossaire

### Mode d'affichage
- **Format** : {{page unique avec ancres alphabetiques / une page par lettre / une page par terme}}
- **Navigation** : {{index alphabetique A-Z en haut de page}}
- **Recherche** : {{barre de recherche dans le glossaire : oui/non}}

### Structure de chaque definition
1. **Terme** (en titre H2 ou H3)
2. **Definition** : explication claire, accessible, 2-5 phrases
3. **Exemple** : illustration concrete dans le contexte du secteur (optionnel)
4. **Lien interne** : renvoi vers la page du site la plus pertinente
5. **Termes lies** : renvoi vers d'autres definitions du glossaire

---

## Strategie SEO du glossaire

### Approche
- Chaque terme cible une requete de type "qu'est-ce que {{terme}}" ou "definition {{terme}}"
- Les definitions sont completes mais concises pour viser la position zero (featured snippet)
- Les liens internes depuis chaque definition renforcent le maillage

### Mots-cles cibles par terme
| Terme | Requete cible | Volume estime |
|---|---|---|
| {{terme 1}} | {{requete recherchee}} | {{volume}} |
| {{terme 2}} | {{requete recherchee}} | {{volume}} |

---

## Structure de la page

### Zone 1 — Introduction
- **Fonction** : Presenter le glossaire et son utilite
- **Contenu** : Titre, texte d'introduction (2-3 phrases), index A-Z
- **Comportement** : Index cliquable avec ancres

### Zone 2 — Index alphabetique
- **Fonction** : Navigation rapide
- **Contenu** : Lettres A a Z, cliquables
- **Comportement** : Scroll vers la section correspondante

### Zone 3 — Definitions
- **Fonction** : Contenu principal
- **Contenu** : Liste des termes classes par ordre alphabetique
- **Comportement** : Chaque terme est un bloc avec definition, exemple, liens

### Zone 4 — CTA
- **Fonction** : Orienter vers l'action
- **Contenu** : "Besoin d'en savoir plus ? Contactez nos experts"
- **Comportement** : Lien vers contact

---

## Wireframe ASCII

> Generer un wireframe ASCII sur mesure a partir des zones ci-dessus.
> Montrer la disposition reelle : introduction, index alphabetique, blocs de definitions avec les vrais termes du client.
> Adapter au secteur (termes reels, nombre de definitions, liens vers les pages pertinentes).

---

## Composants fonctionnels

| Composant | Description | Obligatoire |
|---|---|---|
| Index A-Z | Navigation alphabetique | Oui |
| Bloc definition | Terme + definition + liens | Oui |
| Barre de recherche | Filtrage des termes | Non |
| Liens internes | Renvoi vers pages du site | Oui |
| Termes lies | Renvoi entre definitions | Non |

---

## Contenu editorial

### Titre principal (H1)
{{ex: "Glossaire — Les termes cles du/de la {{secteur}}"}}

### Introduction
{{Texte court expliquant pourquoi ce glossaire existe et a qui il s'adresse}}

### Ton et style
Pedagogique et accessible — expliquer simplement des concepts qui peuvent etre techniques.

---

## Appels a l'action (CTA)

| CTA | Texte | Destination | Priorite |
|---|---|---|---|
| Principal | {{ex: "Une question sur un terme ? Contactez-nous"}} | /contact | Moyenne |
| Secondaire | {{ex: "Decouvrir nos services"}} | /{{page-services}} | Basse |

---

## Maillage interne

### Liens entrants

| Page source | Ancre | Type |
|---|---|---|
| Footer | "Glossaire" | Navigation secondaire |
| Menu | "Glossaire" | Navigation secondaire |
| {{Pages avec termes techniques}} | {{terme}} | Lien contextuel |

### Liens sortants

| Page cible | Ancre | Type |
|---|---|---|
| {{Pages services}} | {{ex: "En savoir plus sur..."}} | Lien contextuel |
| Contact | {{ex: "Contactez nos experts"}} | CTA |
| {{Autres definitions}} | {{terme lie}} | Lien interne glossaire |

### Liens transversaux

- **Header** : Pas de lien direct vers le glossaire
- **Menu** : Lien "Glossaire" en navigation secondaire
- **Footer** : Lien "Glossaire" dans les liens utiles

### Parcours utilisateurs passant par cette page

| Parcours | Etape precedente | Cette page | Etape suivante |
|---|---|---|---|
| Entree SEO longue traine | Google (requete "definition X") | Glossaire | Pages services |
| Visiteur curieux | {{page contenu}} | Glossaire | Retour page precedente |

---

## SEO

| Champ | Valeur |
|---|---|
| **Meta title** | {{ex: "Glossaire du/de la secteur — Definitions et termes cles"}} |
| **Meta description** | {{ex: "Retrouvez toutes les definitions des termes cles du secteur. Glossaire complet par Nom entreprise."}} |
| **Mot-cle principal** | {{ex: "glossaire secteur"}} |
| **Mots-cles secondaires** | {{ex: "definition terme1, definition terme2"}} |
| **Intention de recherche** | Informationnelle |
| **Schema markup** | DefinedTermSet / FAQPage pour les definitions |

---

## Notes et remarques

- Le glossaire est un levier SEO majeur — chaque definition est une opportunite de positionnement
- Mettre a jour regulierement avec de nouveaux termes
- {{Notes specifiques au client}}
