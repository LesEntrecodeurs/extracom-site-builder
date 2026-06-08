---
name: refine
description: |
  Edite de facon ciblee un site client deja buildé : composant, section, page ou site entier.
  Charge uniquement le contexte necessaire selon le scope (pas tout le site en memoire).
  Synchronise automatiquement les fichiers de suivi (fiche page, DESIGN.md, BUILD.md, llms.txt, JSON-LD)
  selon la regle de synchronisation de CLAUDE.md.
  TRIGGER quand : l'utilisateur dit "retouche", "change cette section", "modifie la card",
  "j'aimerais ajuster", "rends ce hero plus X", "refonds le footer", "ameliore cette page",
  "remplace ce CTA", "ajoute une section Y", "supprime cet element", "corrige ce texte",
  sur un projet deja existant dans apps/.
  SKIP si : le projet n'existe pas encore dans apps/ (proposer plutot /build).
  REDIRECT si : la demande concerne un changement global de direction artistique (couleurs
  dominantes, typographie globale, ambiance) - rediriger vers /restyle.
argument-hint: "[nom-client] [scope optionnel]"
---

# /refine [nom-client] [scope]

Skill d'edition ciblee pour un site client deja genere. Remplace les modifications ad hoc "Claude, change ça" par un workflow structure qui garantit la coherence entre le code et les fichiers de suivi.

## Pre-requis

- `apps/[nom-client]/` doit exister (sinon : proposer `/build` d'abord)
- Les fichiers de suivi (`docs/projets/[nom-client]/` : pages, DESIGN.md, BUILD.md) existent

## Declenchement

Soit explicite : `/refine echo-bigi hero-accueil`
Soit par auto-detection via la description (voir TRIGGER ci-dessus).

---

## Instructions — 5 phases

### Phase 1 — Detection du client et du scope

Si aucun argument n'est fourni :
1. Lister les projets dans `apps/` et demander lequel
2. Demander le scope via `AskUserQuestion` (voir Phase 2)

Si l'utilisateur mentionne un element visuel ("cette card", "ce hero", "cette section"), identifier le fichier concerne :
- Chercher dans `apps/[client]/src/modules/*/sections/*.tsx` et `apps/[client]/src/components/ui/*.tsx`
- Si ambigu, lister les candidats et demander lequel

### Phase 2 — Questionnaire scope (AskUserQuestion)

Poser en un seul appel (2 questions max pour rester leger) :

```
Q1 — Scope de la modification
Options :
  - Un composant precis (card, bouton, element UI reutilisable)
  - Une section d'une page (hero, FAQ, CTA final, galerie...)
  - Une page entiere (restructuration, reordonnancement des sections)
  - Le site entier (header, footer, navigation, changement transverse)
  [ + Other... pour preciser si hybride ]

Q2 — Type de modification
Options :
  - Visuel (couleur, espacement, typo locale, animation)
  - Contenu (texte, CTA, titres, images, donnees)
  - Structure (ajout/retrait de sections, reorganisation, nouveaux composants)
  - Technique (accessibilite, SEO, performance, i18n)
  [ + Other... pour mix ]
```

**Skip la Phase 2** si la demande est evidente (ex: `/refine echo-bigi contact` = scope "une page" / type a preciser par l'utilisateur) ou si l'utilisateur a deja precise le scope en langage naturel.

### Phase 3 — Clarification

Si la demande initiale n'est pas assez precise, demander en texte libre :

> Decris precisement ce que tu veux changer. Plus tu es precis, plus la modification sera ciblee (ex: "retire le bloc temoignages et mets a la place 3 stats chiffrees").

Reformuler la demande pour verification :

> **Ce que je vais faire :**
> - [resume en 1-2 lignes]
>
> C'est bien ca ?

Attendre confirmation avant Phase 4.

### Phase 4 — Plan d'edition et application

1. **Plan** — lister tous les fichiers que la modification va toucher :
   ```
   Fichiers a modifier :
   - apps/[client]/src/modules/contact/sections/form-section.tsx (code)
   - docs/projets/[client]/pages/contact.md (fiche page)
   - docs/projets/[client]/DESIGN.md (si changement visuel)
   - docs/projets/[client]/BUILD.md (si changement technique)
   - apps/[client]/public/llms.txt (si changement de contenu visible)

   Fichiers JSON-LD a verifier : [liste selon scope]
   ```

2. **Charger uniquement le contexte necessaire** :
   - Scope composant/section : lire seulement les 1-3 fichiers concernes
   - Scope page : lire le module entier + la fiche page
   - Scope site : lire layout + nav + fichiers transverses
   - **Ne pas** recharger toutes les sections / toutes les pages si pas besoin

3. **Appliquer** les Edit en parallele (un seul message avec tous les tool_use) quand possible.

4. **Synchroniser les fichiers de suivi** — regle obligatoire (voir CLAUDE.md "Regle de synchronisation") :
   - Modif contenu/structure -> fiche page
   - Modif visuelle -> DESIGN.md
   - Modif technique (i18n, analytics, routes) -> BUILD.md
   - Modif deploiement -> DEPLOY.md
   - Modif de pages (ajout/suppression/renommage) -> propager sur menu, header, footer, maillage, sitemap, JSON-LD, llms.txt

5. **Ne pas** lancer `yarn build` sauf demande explicite de l'utilisateur (cf. memoire utilisateur : l'utilisateur build lui-meme).

### Phase 5 — Livraison

Afficher un recap concis :

```
Modifications appliquees pour [nom-client] :

Fichiers code :
- [liste]

Fichiers de suivi synchronises :
- [liste]

A verifier :
- [warnings eventuels : seuil 1000 mots, accessibilite, cohe maillage...]

Pour tester :
yarn dev:[nom-client]
```

Si la modification introduit un risque (regression potentielle, warning typescript, changement de route), le signaler explicitement.

---

## Regles

1. **Scope minimal** — ne jamais modifier plus que ce qui est demande. Si l'utilisateur demande "change ce CTA", ne pas refactorer la section entiere.
2. **Charger le minimum de contexte** — pour un refine sur une card, lire uniquement le fichier de la card + peut-etre 1 parent. Ne pas lire tout le site.
3. **Synchronisation obligatoire** — tout changement code doit s'accompagner d'une mise a jour des fichiers de suivi impactes. Le code et les fiches doivent rester alignes (cf. CLAUDE.md).
4. **Propagation des pages** — si on ajoute, supprime ou renomme une page : propager partout (fiche, menu, header, footer, maillage, route, sitemap, JSON-LD, llms.txt).
5. **Pas de build automatique** — ne jamais lancer `yarn build` ou `yarn dev` sans demande explicite. L'utilisateur gere le build lui-meme.
6. **Pas d'ajout de commentaires** — regle CLAUDE.md #9 : code sans commentaires paraphrasiques. Ajouter un commentaire uniquement pour un invariant non evident ou un workaround.
7. **Diff avant confirmation** — pour une modification significative (>5 lignes ou >2 fichiers), afficher un resume textuel du diff avant d'appliquer.
8. **Redirect pour changement de DA globale** — si la demande touche aux couleurs dominantes, a la typographie globale ou a l'ambiance, ne pas faire la modif ici : rediriger vers `/restyle` (ou l'implementer sur place si `/restyle` n'existe pas encore).
9. **Securite accents** — regle CLAUDE.md : tout texte francais doit conserver ses accents corrects (é, è, ê, à, ù, ç).
10. **Si aucun argument** : lister les projets disponibles dans `apps/` et demander.

---

## Exemples de declenchement

| Formulation utilisateur | Action |
|---|---|
| `/refine echo-bigi` | Demande scope + type, puis clarification |
| "rends le hero d'echo-bigi plus punchy" | Scope = hero-section, type = contenu/visuel |
| "supprime la section cabinet-photos" | Scope = section, propagation sur fiche page |
| "ajoute un bloc temoignages sur la page tarifs" | Scope = page, ajout structure |
| "le CTA du footer doit aller vers Doctolib" | Scope = composant footer |
| "change la couleur primaire pour du terracotta" | REDIRECT vers /restyle (DA globale) |
| "retire les 2 dernieres questions de la FAQ" | Scope = data, synchro llms.txt + JSON-LD |

---

## Workflow Claude Press (apres ajout)

```
/new-project → /generate → /variants → /design → /build → /audit → /deploy
                                                   ↓
                                              /refine  (iteration ciblee)
                                              /restyle (DA globale, a venir)
```

`/refine` intervient apres `/build` pour toutes les iterations ciblees. Il remplace les demandes "Claude, change ça" par un workflow outille qui garantit la coherence entre code et fichiers de suivi.
