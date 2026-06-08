import "server-only";
import { unstable_cache } from "next/cache";
import { ApiError, fetchJson, requestWithBody } from "./client";
import type { Article, ArticleListResponse, ArticleQuery, CatalogNode, Family } from "./types";

export const listArticles = unstable_cache(
	async (query: ArticleQuery): Promise<ArticleListResponse> => {
		return requestWithBody<ArticleListResponse>("/articles", query);
	},
	["articles-list"],
	{ revalidate: 300, tags: ["articles"] },
);

export async function getArticle(reference: string): Promise<Article | null> {
	try {
		return await fetchJson<Article>(`/articles/${encodeURIComponent(reference)}`);
	} catch (error) {
		if (error instanceof ApiError && error.status === 404) {
			return null;
		}
		throw error;
	}
}

export const getFamilies = unstable_cache(
	async (): Promise<Family[]> => fetchJson<Family[]>("/families"),
	["families"],
	{ revalidate: 3600, tags: ["families"] },
);

export const getCatalogs = unstable_cache(
	async (): Promise<CatalogNode[]> => fetchJson<CatalogNode[]>("/catalogs"),
	["catalogs"],
	{ revalidate: 3600, tags: ["catalogs"] },
);

export async function getAllReferences(): Promise<string[]> {
	const references: string[] = [];
	let page = 1;
	const limit = 200;
	for (;;) {
		const { data, pagination } = await listArticles({ page, limit });
		references.push(...data.map((article) => article.reference));
		if (page * limit >= pagination.total || data.length === 0) {
			break;
		}
		page += 1;
	}
	return references;
}
