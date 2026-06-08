# Contact

> Herite de `_base-page.md` — inclut les sections de base + les sections specifiques ci-dessous.

---

## Informations generales

| Champ | Valeur |
|---|---|
| **Nom de la page** | Contact |
| **Slug URL** | `/contact` |
| **Type de page** | Contact |
| **Priorite** | Haute |
| **Statut** | {{a rediger / en cours / valide}} |

---

## Objectifs de la page

### Objectif principal
Permettre au visiteur de contacter l'entreprise facilement.

### Objectifs secondaires
- Offrir plusieurs moyens de contact (formulaire, telephone, email, adresse)
- Rassurer sur la reactivite (delai de reponse)
- Localiser l'entreprise si pertinent

### KPIs associes
- Nombre de soumissions du formulaire
- Taux de conversion (visite → contact)

---

## Formulaire de contact

### Champs du formulaire

| Champ | Type | Obligatoire | Validation |
|---|---|---|---|
| Nom | Texte | Oui | Min 2 caracteres |
| Prenom | Texte | Oui | Min 2 caracteres |
| Email | Email | Oui | Format email valide |
| Telephone | Tel | Non | Format telephone |
| Sujet | Select / Texte | {{Oui/Non}} | {{liste des sujets}} |
| Message | Textarea | Oui | Min 10 caracteres |
| Consentement RGPD | Checkbox | Oui | Doit etre coche |

### Options du sujet (si select)
- {{Demande d'information}}
- {{Demande de devis}}
- {{Reclamation}}
- {{Autre}}

### Comportement apres envoi
- **Message de confirmation** : {{ex: "Merci, votre message a bien ete envoye. Nous vous repondrons sous 48h."}}
- **Email de notification** : {{envoye a quelle adresse}}
- **Email de confirmation** : {{envoye au visiteur : oui/non}}

---

## Informations de contact directes

| Moyen | Detail |
|---|---|
| **Adresse** | {{adresse postale complete}} |
| **Telephone** | {{numero — cliquable sur mobile}} |
| **Email** | {{adresse email}} |
| **Horaires** | {{jours et heures d'ouverture}} |

---

## Localisation

### Carte
- **Afficher une carte** : {{oui/non}}
- **Service** : {{Google Maps / OpenStreetMap / autre}}
- **Adresse affichee** : {{adresse sur la carte}}

### Acces
- {{Indications d'acces : transport, parking, etc.}}

---

## Structure de la page

### Zone 1 — Titre et introduction
- **Fonction** : Accueillir et orienter le visiteur
- **Contenu** : Titre, phrase d'introduction invitant au contact
- **Comportement** : Statique

### Zone 2 — Formulaire de contact
- **Fonction** : Recueillir les demandes
- **Contenu** : Formulaire avec les champs decrits ci-dessus
- **Comportement** : Validation en temps reel, envoi asynchrone

### Zone 3 — Informations de contact
- **Fonction** : Offrir des alternatives au formulaire
- **Contenu** : Telephone, email, adresse, horaires
- **Comportement** : Telephone et email cliquables

### Zone 4 — Carte / Localisation
- **Fonction** : Localiser l'entreprise
- **Contenu** : Carte interactive + indications d'acces
- **Comportement** : Carte interactive (zoom, itineraire)

---

## Wireframe ASCII

> Generer un wireframe ASCII sur mesure a partir des zones ci-dessus.
> Montrer la disposition reelle : formulaire avec les vrais champs du client, coordonnees, carte si applicable.
> Adapter la mise en page (formulaire + coordonnees cote a cote ou empiles) selon le contenu.

---

## Composants fonctionnels

| Composant | Description | Obligatoire |
|---|---|---|
| Formulaire | Formulaire de contact avec validation | Oui |
| Coordonnees | Telephone, email, adresse | Oui |
| Carte | Carte interactive avec localisation | Non |
| Horaires | Jours et heures d'ouverture | Non |
| FAQ rapide | Reponses aux questions courantes avant contact | Non |

---

## Contenu editorial

### Titre principal (H1)
{{ex: "Contactez-nous" / "Parlons de votre projet" / "Une question ? Ecrivez-nous"}}

### Sous-titres (H2)
1. {{H2 — formulaire : "Envoyez-nous un message"}}
2. {{H2 — coordonnees : "Nos coordonnees"}}
3. {{H2 — localisation : "Ou nous trouver"}}

### Messages cles
- {{message 1 — reactivite : "Nous vous repondons sous 48h"}}
- {{message 2 — disponibilite}}
- {{message 3 — confiance : "Vos donnees restent confidentielles"}}

### Ton et style
Accueillant et rassurant — inciter au contact sans etre intrusif.

---

## Appels a l'action (CTA)

| CTA | Texte | Destination | Priorite |
|---|---|---|---|
| Principal | {{ex: "Envoyer mon message"}} | Soumission du formulaire | Haute |
| Secondaire | {{ex: "Appelez-nous directement"}} | tel:{{numero}} | Moyenne |

---

## Maillage interne

### Liens entrants

| Page source | Ancre | Type |
|---|---|---|
| Accueil | {{ex: "Contactez-nous"}} | CTA principal |
| Menu | "Contact" | Navigation |
| Header | {{ex: "Nous contacter"}} | CTA |
| Footer | "Contact" | Navigation |
| {{Autres pages}} | {{ex: "Contactez-nous"}} | CTA |

### Liens sortants

| Page cible | Ancre | Type |
|---|---|---|
| {{Accueil ou page remerciement}} | Redirection apres envoi | Automatique |

### Liens transversaux

- **Header** : CTA ou telephone pointant vers cette page
- **Menu** : Lien "Contact" dans la navigation principale
- **Footer** : Lien "Contact" dans la navigation secondaire

### Parcours utilisateurs passant par cette page

| Parcours | Etape precedente | Cette page | Etape suivante |
|---|---|---|---|
| Prospect chaud | Accueil ou Services | Contact | Page remerciement |
| Demande de devis | {{page service/produit}} | Contact | Page remerciement |
| Recherche adresse | Entree (Google) | Contact | Quitte satisfait |

---

## SEO

| Champ | Valeur |
|---|---|
| **Meta title** | {{ex: "Contact — Nom entreprise | Ville"}} |
| **Meta description** | {{ex: "Contactez Nom entreprise a Ville. Formulaire, telephone et adresse. Reponse sous 48h."}} |
| **Mot-cle principal** | {{ex: "contact nom-entreprise ville"}} |
| **Mots-cles secondaires** | {{ex: "telephone, adresse, horaires"}} |
| **Intention de recherche** | Transactionnelle |

---

## Notes et remarques

- Le formulaire doit etre conforme RGPD (consentement explicite, lien vers politique de confidentialite)
- {{Notes specifiques au client}}
