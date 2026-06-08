import type { ArticleQuery, SortDirection, SortField } from "@/lib/api/types";

export const PAGE_SIZE = 12;
export const LIMIT_MIN = 1;
export const LIMIT_MAX = 200;

export type SortOption = {
	value: string;
	label: string;
	field?: SortField;
	direction?: SortDirection;
};

export const SORT_OPTIONS: SortOption[] = [
	{ value: "pertinence", label: "Pertinence" },
	{ value: "prix-asc", label: "Prix croissant", field: "price", direction: "asc" },
	{ value: "prix-desc", label: "Prix décroissant", field: "price", direction: "desc" },
	{ value: "nom-asc", label: "Nom A→Z", field: "description", direction: "asc" },
	{ value: "nom-desc", label: "Nom Z→A", field: "description", direction: "desc" },
	{ value: "ref-asc", label: "Référence A→Z", field: "reference", direction: "asc" },
	{ value: "ref-desc", label: "Référence Z→A", field: "reference", direction: "desc" },
	{ value: "poids-asc", label: "Poids croissant", field: "weight", direction: "asc" },
	{ value: "poids-desc", label: "Poids décroissant", field: "weight", direction: "desc" },
	{ value: "famille-asc", label: "Famille A→Z", field: "family", direction: "asc" },
	{ value: "famille-desc", label: "Famille Z→A", field: "family", direction: "desc" },
	{ value: "barcode-asc", label: "Code-barres ↑", field: "barcode", direction: "asc" },
];

export type RawSearchParams = Record<string, string | string[] | undefined>;

export type CatalogueState = {
	q: string;
	families: string[];
	catLevel: number | null;
	catId: number | null;
	priceMin: number | null;
	priceMax: number | null;
	weightMinG: number | null;
	weightMaxG: number | null;
	sort: string;
	page: number;
	limit: number;
};

function firstValue(value: string | string[] | undefined): string | undefined {
	return Array.isArray(value) ? value[0] : value;
}

function toNumber(value: string | undefined): number | null {
	if (value === undefined || value.trim() === "") return null;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : null;
}

export function parseCatalogueParams(params: RawSearchParams): CatalogueState {
	const familiesRaw = params.famille;
	const families = Array.isArray(familiesRaw) ? familiesRaw : familiesRaw ? [familiesRaw] : [];

	let catLevel: number | null = null;
	let catId: number | null = null;
	const cat = firstValue(params.cat);
	if (cat?.includes(":")) {
		const [levelPart, idPart] = cat.split(":");
		const level = Number(levelPart);
		const id = Number(idPart);
		if (level >= 1 && level <= 4 && id >= 1) {
			catLevel = level;
			catId = id;
		}
	}

	const sortValue = firstValue(params.tri) ?? "pertinence";
	const sort = SORT_OPTIONS.some((option) => option.value === sortValue) ? sortValue : "pertinence";

	const page = Math.max(1, toNumber(firstValue(params.page)) ?? 1);
	const rawLimit = toNumber(firstValue(params.limit));
	const limit = rawLimit
		? Math.min(LIMIT_MAX, Math.max(LIMIT_MIN, Math.trunc(rawLimit)))
		: PAGE_SIZE;

	return {
		q: firstValue(params.q)?.trim() ?? "",
		families,
		catLevel,
		catId,
		priceMin: toNumber(firstValue(params.prixMin)),
		priceMax: toNumber(firstValue(params.prixMax)),
		weightMinG: toNumber(firstValue(params.poidsMin)),
		weightMaxG: toNumber(firstValue(params.poidsMax)),
		sort,
		page,
		limit,
	};
}

export function buildArticleQuery(state: CatalogueState): ArticleQuery {
	const filter: Record<string, unknown> = {};

	if (state.families.length === 1) {
		filter.family = state.families[0];
	} else if (state.families.length > 1) {
		filter.family = { in: state.families };
	}

	if (state.catLevel && state.catId) {
		filter[`catalogId${state.catLevel}`] = state.catId;
	}

	const price: Record<string, number> = {};
	if (state.priceMin !== null) price.gte = state.priceMin;
	if (state.priceMax !== null) price.lte = state.priceMax;
	if (Object.keys(price).length > 0) filter.price = price;

	const weight: Record<string, number> = {};
	if (state.weightMinG !== null) weight.gte = state.weightMinG / 1000;
	if (state.weightMaxG !== null) weight.lte = state.weightMaxG / 1000;
	if (Object.keys(weight).length > 0) filter.weight = weight;

	const sortOption = SORT_OPTIONS.find((option) => option.value === state.sort);
	const sort =
		sortOption?.field && sortOption.direction
			? [{ field: sortOption.field, direction: sortOption.direction }]
			: undefined;

	return {
		...(state.q ? { search: state.q } : {}),
		...(Object.keys(filter).length > 0 ? { filter } : {}),
		...(sort ? { sort } : {}),
		page: state.page,
		limit: state.limit,
	};
}

export function buildQueryString(state: Partial<CatalogueState>): string {
	const params = new URLSearchParams();
	if (state.q) params.set("q", state.q);
	for (const family of state.families ?? []) params.append("famille", family);
	if (state.catLevel && state.catId) {
		params.set("cat", `${state.catLevel}:${state.catId}`);
	}
	if (state.priceMin != null) params.set("prixMin", String(state.priceMin));
	if (state.priceMax != null) params.set("prixMax", String(state.priceMax));
	if (state.weightMinG != null) params.set("poidsMin", String(state.weightMinG));
	if (state.weightMaxG != null) params.set("poidsMax", String(state.weightMaxG));
	if (state.sort && state.sort !== "pertinence") params.set("tri", state.sort);
	if (state.limit && state.limit !== PAGE_SIZE) params.set("limit", String(state.limit));
	if (state.page && state.page > 1) params.set("page", String(state.page));
	const queryString = params.toString();
	return queryString ? `?${queryString}` : "";
}

export function countActiveFilters(state: CatalogueState): number {
	let count = state.families.length;
	if (state.catId) count += 1;
	if (state.priceMin !== null) count += 1;
	if (state.priceMax !== null) count += 1;
	if (state.weightMinG !== null) count += 1;
	if (state.weightMaxG !== null) count += 1;
	return count;
}
