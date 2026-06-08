import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/catalogue/product-card";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { PageFaq } from "@/components/ui/page-faq";
import { siteConfig } from "@/config/site";
import { homeFaq } from "@/data/faqs";
import { getFamilies, listArticles } from "@/lib/api/catalog";
import type { Article, Family } from "@/lib/api/types";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";

export default async function HomePage() {
	let featured: Article[] = [];
	let families: Family[] = [];
	try {
		const [list, fam] = await Promise.all([
			listArticles({ sort: [{ field: "price", direction: "desc" }], limit: 8 }),
			getFamilies(),
		]);
		featured = list.data;
		families = fam;
	} catch {
		featured = [];
	}

	return (
		<>
			<JsonLd data={[websiteSchema(), organizationSchema()]} />

			<section className="border-b border-border bg-background-secondary">
				<div className="container grid gap-10 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
					<div>
						<p className="eyebrow">{siteConfig.tagline}</p>
						<h1 className="mt-4 font-display text-5xl leading-[1.05] text-ink md:text-6xl lg:text-7xl">
							L'éclat de l'or,
							<br />
							<span className="italic text-gold">le temps maîtrisé.</span>
						</h1>
						<p className="mt-6 max-w-md text-lg text-muted-foreground">
							{siteConfig.name} présente sa collection de bijoux, montres et pièces d'orfèvrerie —
							un catalogue vivant, mis à jour en direct depuis Sage.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Button asChild variant="gold" size="lg">
								<Link href="/catalogue">
									Découvrir le catalogue
									<ArrowRight className="size-4" />
								</Link>
							</Button>
							<Button asChild variant="outline" size="lg">
								<Link href="/a-propos">La maison</Link>
							</Button>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						{featured.slice(0, 4).map((article, index) => (
							<ProductCard key={article.reference} article={article} priority={index < 2} />
						))}
					</div>
				</div>
			</section>

			{families.length > 0 ? (
				<section className="container py-16 md:py-20">
					<div className="flex items-end justify-between">
						<h2 className="font-display text-3xl text-ink md:text-4xl">Explorer par famille</h2>
						<Link href="/catalogue" className="hidden text-sm text-gold hover:underline sm:inline">
							Tout voir
						</Link>
					</div>
					<ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
						{families.map((family) => (
							<li key={family.code}>
								<Link
									href={`/catalogue?famille=${encodeURIComponent(family.code)}`}
									className="flex h-full items-center bg-card p-5 text-sm font-medium text-ink transition-colors hover:bg-gold-soft"
								>
									{family.label}
								</Link>
							</li>
						))}
					</ul>
				</section>
			) : null}

			{featured.length > 4 ? (
				<section className="container py-8 md:py-12">
					<div className="flex items-end justify-between">
						<h2 className="font-display text-3xl text-ink md:text-4xl">Pièces d'exception</h2>
						<Link
							href="/catalogue?tri=prix-desc"
							className="hidden text-sm text-gold hover:underline sm:inline"
						>
							Voir plus
						</Link>
					</div>
					<div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
						{featured.slice(0, 4).map((article) => (
							<ProductCard key={article.reference} article={article} />
						))}
					</div>
				</section>
			) : null}

			<PageFaq items={homeFaq} />
		</>
	);
}
