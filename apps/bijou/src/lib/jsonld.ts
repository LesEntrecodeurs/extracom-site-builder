import { siteConfig } from "@/config/site";
import type { Article } from "@/lib/api/types";

const base = siteConfig.url;

export function organizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: siteConfig.name,
		url: base,
		description: siteConfig.description,
		email: siteConfig.email,
		telephone: siteConfig.phone,
	};
}

export function websiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.name,
		url: base,
		potentialAction: {
			"@type": "SearchAction",
			target: `${base}/catalogue?q={search_term_string}`,
			"query-input": "required name=search_term_string",
		},
	};
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${base}${item.path}`,
		})),
	};
}

export function itemListSchema(articles: Article[]) {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		numberOfItems: articles.length,
		itemListElement: articles.map((article, index) => ({
			"@type": "ListItem",
			position: index + 1,
			url: `${base}/produit/${encodeURIComponent(article.reference)}`,
			name: article.description,
		})),
	};
}

export function productSchema(article: Article) {
	const image = article.url || article.images.find((item) => item.url)?.url;
	return {
		"@context": "https://schema.org",
		"@type": "Product",
		name: article.description,
		sku: article.reference,
		...(article.barcode ? { gtin: article.barcode } : {}),
		...(image ? { image } : {}),
		...(article.family ? { category: article.family.label } : {}),
		...(article.weight
			? { weight: { "@type": "QuantitativeValue", value: article.weight, unitCode: "KGM" } }
			: {}),
		offers: {
			"@type": "Offer",
			price: article.price,
			priceCurrency: "EUR",
			availability: "https://schema.org/InStock",
			url: `${base}/produit/${encodeURIComponent(article.reference)}`,
		},
	};
}
