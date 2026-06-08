import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductSpecs } from "@/components/produit/product-specs";
import { ProductVariants } from "@/components/produit/product-variants";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { ProductImage } from "@/components/ui/product-image";
import { siteConfig } from "@/config/site";
import { getArticle } from "@/lib/api/catalog";
import { breadcrumbSchema, productSchema } from "@/lib/jsonld";
import { cleanSageText, formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ reference: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { reference } = await params;
	const article = await getArticle(decodeURIComponent(reference));
	if (!article) {
		return { title: "Article introuvable", robots: { index: false } };
	}
	const description = article.glossaires[0]?.text
		? cleanSageText(article.glossaires[0].text).slice(0, 155)
		: `${article.description} — ${article.family?.label ?? "pièce"} ${formatPrice(article.price)}. Découvrez cette pièce du catalogue ${siteConfig.name}.`;
	return {
		title: article.description,
		description,
		alternates: {
			canonical: `/produit/${encodeURIComponent(article.reference)}`,
		},
		openGraph: { title: article.description, description, type: "website" },
	};
}

export default async function ProductPage({ params }: Props) {
	const { reference } = await params;
	const article = await getArticle(decodeURIComponent(reference));
	if (!article) notFound();

	const descriptions = article.glossaires.map((entry) => cleanSageText(entry.text)).filter(Boolean);
	const crumbs = [
		{ name: "Accueil", path: "/" },
		{ name: "Catalogue", path: "/catalogue" },
		...article.catalogPath.map((node) => ({
			name: node.label,
			path: `/catalogue?cat=${node.level}:${node.id}`,
		})),
		{
			name: article.description,
			path: `/produit/${encodeURIComponent(article.reference)}`,
		},
	];

	return (
		<div className="container py-10 md:py-14">
			<JsonLd data={[breadcrumbSchema(crumbs), productSchema(article)]} />

			<nav
				aria-label="Fil d'ariane"
				className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground"
			>
				{crumbs.map((crumb, index) => (
					<span key={crumb.path} className="flex items-center gap-2">
						{index > 0 ? <span>/</span> : null}
						{index < crumbs.length - 1 ? (
							<Link href={crumb.path} className="hover:text-ink">
								{crumb.name}
							</Link>
						) : (
							<span className="text-ink">{crumb.name}</span>
						)}
					</span>
				))}
			</nav>

			<div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
				<div>
					<ProductImage
						article={article}
						className="aspect-square border border-border"
						sizes="(max-width: 1024px) 100vw, 50vw"
						priority
					/>
				</div>

				<div>
					{article.family ? <p className="eyebrow">{article.family.label}</p> : null}
					<h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">{article.description}</h1>
					{article.langue1 ? (
						<p className="mt-1 text-sm italic text-muted-foreground">{article.langue1}</p>
					) : null}
					<p className="mt-5 text-3xl font-semibold text-ink">{formatPrice(article.price)}</p>

					<div className="mt-8 space-y-8">
						<ProductVariants gammes={article.gammes} />
						<ProductSpecs article={article} />
					</div>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Button asChild variant="gold" size="lg">
							<Link href={`/contact?ref=${encodeURIComponent(article.reference)}`}>
								Demander cette pièce
							</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link href="/catalogue">Retour au catalogue</Link>
						</Button>
					</div>
				</div>
			</div>

			{descriptions.length > 0 ? (
				<section className="mt-16 max-w-3xl">
					<h2 className="font-display text-2xl text-ink">Description</h2>
					<div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
						{descriptions.map((text) => (
							<p key={text} className="whitespace-pre-line">
								{text}
							</p>
						))}
					</div>
				</section>
			) : null}

			<div className="mt-16">
				<Link
					href="/catalogue"
					className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
				>
					<ArrowLeft className="size-4" />
					Tout le catalogue
				</Link>
			</div>
		</div>
	);
}
