"use client";

import { SlidersHorizontal } from "lucide-react";
import { CatalogTree } from "@/components/catalogue/catalog-tree";
import { FamilyFilter } from "@/components/catalogue/family-filter";
import { PriceFilter } from "@/components/catalogue/price-filter";
import { WeightFilter } from "@/components/catalogue/weight-filter";
import type { CatalogNode, Family } from "@/lib/api/types";
import { countActiveFilters } from "@/lib/catalogue-params";
import { useCatalogueNav } from "@/lib/use-catalogue-nav";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section className="border-t border-border py-6 first:border-t-0 first:pt-0">
			<h3 className="eyebrow mb-4">{title}</h3>
			{children}
		</section>
	);
}

export function FiltersPanel({
	families,
	catalogs,
}: {
	families: Family[];
	catalogs: CatalogNode[];
}) {
	const { state, apply } = useCatalogueNav();
	const active = countActiveFilters(state);

	const body = (
		<>
			<div className="mb-2 flex items-center justify-between">
				<p className="font-display text-xl text-ink">Filtrer</p>
				{active > 0 ? (
					<button
						type="button"
						onClick={() =>
							apply({
								families: [],
								catLevel: null,
								catId: null,
								priceMin: null,
								priceMax: null,
								weightMinG: null,
								weightMaxG: null,
							})
						}
						className="text-xs text-gold underline-offset-2 hover:underline"
					>
						Tout effacer ({active})
					</button>
				) : null}
			</div>
			<Section title="Catalogue">
				<CatalogTree catalogs={catalogs} />
			</Section>
			<Section title="Famille">
				<FamilyFilter families={families} />
			</Section>
			<Section title="Prix (€)">
				<PriceFilter />
			</Section>
			<Section title="Poids (g)">
				<WeightFilter />
			</Section>
		</>
	);

	return (
		<>
			<details className="border border-border bg-card lg:hidden">
				<summary className="flex cursor-pointer items-center gap-2 p-4 text-sm font-medium">
					<SlidersHorizontal className="size-4" />
					Filtres
					{active > 0 ? (
						<span className="ml-auto inline-flex size-5 items-center justify-center bg-gold text-xs text-gold-foreground">
							{active}
						</span>
					) : null}
				</summary>
				<div className="border-t border-border p-4">{body}</div>
			</details>

			<aside className="hidden lg:block">{body}</aside>
		</>
	);
}
