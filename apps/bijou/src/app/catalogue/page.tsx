import type { Metadata } from "next";
import { FiltersPanel } from "@/components/catalogue/filters-panel";
import { LimitSelect } from "@/components/catalogue/limit-select";
import { Pagination } from "@/components/catalogue/pagination";
import { ProductCard } from "@/components/catalogue/product-card";
import { SearchBar } from "@/components/catalogue/search-bar";
import { SortSelect } from "@/components/catalogue/sort-select";
import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/config/site";
import { getCatalogs, getFamilies, listArticles } from "@/lib/api/catalog";
import { ApiError } from "@/lib/api/client";
import type { ArticleListResponse } from "@/lib/api/types";
import {
	buildArticleQuery,
	PAGE_SIZE,
	parseCatalogueParams,
	type RawSearchParams,
} from "@/lib/catalogue-params";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
	title: "Catalogue — bijoux, montres et orfèvrerie",
	description:
		"Parcourez le catalogue Bijou : bagues, colliers, bracelets, montres et orfèvrerie. Filtrez par catalogue, famille et prix, triez et recherchez en quelques clics.",
	alternates: { canonical: "/catalogue" },
};

const EMPTY: ArticleListResponse = {
	data: [],
	pagination: { page: 1, limit: PAGE_SIZE, total: 0 },
};

export default async function CataloguePage({
	searchParams,
}: {
	searchParams: Promise<RawSearchParams>;
}) {
	const state = parseCatalogueParams(await searchParams);
	const query = buildArticleQuery(state);

	let result = EMPTY;
	let error: string | null = null;
	let families: Awaited<ReturnType<typeof getFamilies>> = [];
	let catalogs: Awaited<ReturnType<typeof getCatalogs>> = [];

	try {
		[result, families, catalogs] = await Promise.all([
			listArticles(query),
			getFamilies(),
			getCatalogs(),
		]);
	} catch (caught) {
		error =
			caught instanceof ApiError
				? caught.message
				: "Le catalogue est momentanément indisponible. Vérifiez que l'API tourne sur le port 3000.";
		[families, catalogs] = await Promise.all([
			getFamilies().catch(() => []),
			getCatalogs().catch(() => []),
		]);
	}

	const { data, pagination } = result;
	const totalPages = Math.max(1, Math.ceil(pagination.total / state.limit));
	const start = pagination.total === 0 ? 0 : (state.page - 1) * state.limit + 1;
	const end = Math.min((state.page - 1) * state.limit + data.length, pagination.total);

	return (
		<div className="container py-10 md:py-14">
			<JsonLd
				data={[
					breadcrumbSchema([
						{ name: "Accueil", path: "/" },
						{ name: "Catalogue", path: "/catalogue" },
					]),
					itemListSchema(data),
				]}
			/>

			<nav aria-label="Fil d'ariane" className="text-xs text-muted-foreground">
				<a href="/" className="hover:text-ink">
					Accueil
				</a>
				<span className="px-2">/</span>
				<span className="text-ink">Catalogue</span>
			</nav>

			<header className="mt-4 max-w-2xl">
				<p className="eyebrow">{siteConfig.tagline}</p>
				<h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">
					{state.q ? `Recherche : « ${state.q} »` : "Le catalogue"}
				</h1>
				<p className="mt-3 text-muted-foreground">
					{state.q
						? "Résultats classés par pertinence, filtrables et triables."
						: "Bijouterie or et argent, garde-temps et pièces d'orfèvrerie, mis à jour en direct depuis Sage."}
				</p>
			</header>

			<div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-10">
				<div className="lg:col-span-3">
					<FiltersPanel families={families} catalogs={catalogs} />
				</div>

				<div className="mt-6 lg:col-span-9 lg:mt-0">
					<div className="mb-6 flex flex-col gap-4">
						<SearchBar />
						<div className="flex flex-wrap items-center justify-between gap-3">
							<p className="text-sm text-muted-foreground" aria-live="polite">
								{pagination.total > 0
									? `${start}–${end} sur ${pagination.total} article${pagination.total > 1 ? "s" : ""}`
									: "Aucun article"}
							</p>
							<div className="flex items-center gap-3">
								<LimitSelect />
								<SortSelect />
							</div>
						</div>
					</div>

					{error ? (
						<p className="border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
							{error}
						</p>
					) : data.length === 0 ? (
						<div className="border border-border bg-card p-12 text-center">
							<p className="font-display text-2xl text-ink">Aucun article ne correspond</p>
							<p className="mt-2 text-sm text-muted-foreground">
								Élargissez votre recherche ou retirez quelques filtres.
							</p>
						</div>
					) : (
						<div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
							{data.map((article, index) => (
								<ProductCard key={article.reference} article={article} priority={index < 4} />
							))}
						</div>
					)}

					<Pagination state={state} totalPages={totalPages} />
				</div>
			</div>
		</div>
	);
}
