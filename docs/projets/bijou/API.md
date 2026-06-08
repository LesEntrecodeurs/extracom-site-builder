# API Catalogue Extracom100 — contrat (POC BIJOU)

API REST **lecture seule** exposant le catalogue d'une boutique Sage100. Source : `~/dev/lec/extracom/docs/api/README.md` + `docs/api/postman_collection.json`. Boutique de démo : **BIJOU**.

## Accès

- **Base URL (local)** : `http://localhost:3000/api/v1`
- **Auth** : header `Authorization: Bearer ctk_live_xxxxx` (le token résout la boutique, pas de `shopName` dans l'URL)
- Token absent/inconnu → `401`. Variable d'env côté serveur : `EXTRACOM_API_TOKEN`, base : `EXTRACOM_API_BASE_URL`
- **Rate limit** : 120 req/min/IP, 600 req/min/token → `429` + `Retry-After`

## ⚠️ Point technique critique : GET avec corps JSON

`GET /api/v1/articles` attend ses filtres/tri/pagination dans le **corps JSON** de la requête GET. Le `fetch` natif de Node (undici) **refuse** un body sur GET (`TypeError`). Côté serveur, appeler l'API via **`undici.request`** (qui autorise body+GET) ou `axios`. Ne pas utiliser le `fetch` global pour cet endpoint.

## Endpoints

| Méthode | Chemin | Description |
|---|---|---|
| GET | `/articles` | Liste paginée (corps JSON: search/filter/sort/page/limit) |
| GET | `/articles/:reference` | Détail article (même forme qu'un item de liste) — 404 `ARTICLE_NOT_FOUND` |
| GET | `/catalogs` | Arbre catalogues 4 niveaux `{id,label,level,children}` |
| GET | `/families` | Liste plate `{code,label}` (familles utilisées seulement) |

### Corps de `/articles` (tous champs optionnels)

```json
{
  "search": "bague",
  "filter": { "family": "BIJOUXOR", "price": { "gte": 300, "lte": 400 } },
  "sort": [{ "field": "price", "direction": "desc" }],
  "page": 1,
  "limit": 50
}
```

- `search` : plein-texte sur référence + description, insensible casse/accents, multi-mots, tolérant pluriel, classé par pertinence. Idéal barre de recherche.
- `filter` : `{ champ: valeur | { op: valeur } }`. Valeur brute = `eq`. `family` filtre sur le **code**.
- Opérateurs : `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `like`, `in`. Filtre catalogue = AND par niveau.
- **Pagination** : `page` (≥1, défaut 1), `limit` (1–200, défaut 50). Réponse :

```json
{ "data": [ /* articles */ ], "pagination": { "page": 1, "limit": 50, "total": 70 } }
```

### Champs filtrables / triables

| Champ | Filtre | Tri |
|---|---|---|
| `reference` | eq, ne, like, in | ✅ |
| `description` | eq, ne, like | ✅ |
| `price` (number) | eq, ne, gt, gte, lt, lte | ✅ |
| `barcode` | eq, ne, in | ✅ |
| `weight` (kg) | eq, ne, gt, gte, lt, lte | ✅ |
| `family` | eq, ne, in (sur code) | ✅ |
| `catalogId1..4` | eq, ne, in (≥1) | — |

## Forme d'un Article (exemple réel : BAOR01)

```json
{
  "reference": "BAOR01",
  "description": "Bague Or et pierres",
  "langue1": "Gold ring with precious stones",
  "price": 588,
  "unit": "Unité",
  "barcode": "21731013",
  "url": "",
  "images": [],
  "weight": 0.00628,
  "weightGross": 0.017,
  "gammes": [{ "id": 1, "label": "Gamme 1", "items": [
    { "id": 1, "label": "Emeraude", "price": 588, "ean": "BAOR01EM" }
  ]}],
  "catalogId1": 2, "catalogId2": 12, "catalogId3": 17, "catalogId4": 0,
  "catalogPath": [
    { "id": 2, "label": "Bijoux", "level": 1 },
    { "id": 12, "label": "Or", "level": 2 },
    { "id": 17, "label": "Bagues", "level": 3 }
  ],
  "family": { "code": "BIJOUXOR", "label": "Bijouterie Or" },
  "glossaires": [{ "text": "Le titre (ou teneur en or pur)..." }],
  "customFields": [], "documents": [], "components": []
}
```

Structures imbriquées : `Gamme={id,label,items:[{id,label,price,ean}]}` (variantes), `Family={code,label}|null`, `Glossaire={text}`, `Document={name,url,mimeType,comment}`, `Image={url,mimeType,caption}`, `PathNode={id,label,level}`, `Component={reference,label,quantity}`, `CustomField={name,value}`.

## ⚠️ Données démo BIJOU

Dans la base démo, `url` (photo) et `images` sont **vides** (`""` / `[]`) — la boutique n'a pas d'`imgUrl` configurée. Le site doit gérer un **placeholder produit élégant** (initiales/réf + dégradé, ou motif) quand aucune image n'est dispo. `glossaires[].text` contient des descriptifs longs Sage avec des `\r` à nettoyer.

## Erreurs

`{ error, message, details }` — `401` (token), `400` (`INVALID_BODY`, `INVALID_FILTER_*`, `INVALID_SORT_*`, `INVALID_PAGE`, `INVALID_LIMIT`), `404` (`ARTICLE_NOT_FOUND`), `429` (rate limit).
