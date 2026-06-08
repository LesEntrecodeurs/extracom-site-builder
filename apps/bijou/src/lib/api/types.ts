export type Family = { code: string; label: string };

export type PathNode = { id: number; label: string; level: number };

export type GammeItem = {
	id: number;
	label: string;
	price: number;
	ean: string;
};

export type Gamme = { id: number; label: string; items: GammeItem[] };

export type Glossaire = { text: string };

export type ArticleImage = { url: string; mimeType: string; caption: string };

export type ArticleDocument = {
	name: string;
	url: string;
	mimeType: string;
	comment: string;
};

export type Component = {
	reference: string;
	label: string;
	quantity: number;
};

export type CustomField = { name: string; value: string };

export type Article = {
	reference: string;
	description: string;
	langue1: string;
	langue2: string;
	price: number;
	unit: string;
	barcode: string;
	url: string;
	images: ArticleImage[];
	weight: number;
	weightGross: number;
	gammes: Gamme[];
	catalogId1: number;
	catalogId2: number;
	catalogId3: number;
	catalogId4: number;
	catalogPath: PathNode[];
	family: Family | null;
	glossaires: Glossaire[];
	documents: ArticleDocument[];
	components: Component[];
	customFields: CustomField[];
};

export type Pagination = { page: number; limit: number; total: number };

export type ArticleListResponse = { data: Article[]; pagination: Pagination };

export type CatalogNode = {
	id: string;
	label: string;
	level: number;
	children: CatalogNode[];
};

export type SortDirection = "asc" | "desc";

export type SortField = "reference" | "description" | "price" | "barcode" | "weight" | "family";

export type ArticleQuery = {
	search?: string;
	filter?: Record<string, unknown>;
	sort?: { field: SortField; direction: SortDirection }[];
	page?: number;
	limit?: number;
};
