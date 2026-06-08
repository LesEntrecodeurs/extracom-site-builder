import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllReferences } from "@/lib/api/catalog";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const base = siteConfig.url;

	const staticRoutes: MetadataRoute.Sitemap = [
		{ url: base, changeFrequency: "weekly", priority: 1 },
		{ url: `${base}/catalogue`, changeFrequency: "daily", priority: 0.9 },
		{ url: `${base}/a-propos`, changeFrequency: "monthly", priority: 0.6 },
		{ url: `${base}/contact`, changeFrequency: "yearly", priority: 0.5 },
	];

	let products: MetadataRoute.Sitemap = [];
	try {
		const references = await getAllReferences();
		products = references.map((reference) => ({
			url: `${base}/produit/${encodeURIComponent(reference)}`,
			changeFrequency: "weekly",
			priority: 0.7,
		}));
	} catch {
		products = [];
	}

	return [...staticRoutes, ...products];
}
