import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { PageFaq } from "@/components/ui/page-faq";
import { siteConfig } from "@/config/site";
import { aproposFaq } from "@/data/faqs";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
	title: "La maison Bijou — joaillerie connectée à Sage",
	description:
		"Bijou est une démonstration e-commerce de joaillerie alimentée par l'API catalogue Extracom100, qui expose en lecture seule les articles d'une gestion Sage100.",
	alternates: { canonical: "/a-propos" },
};

const stats = [
	{ value: "70", label: "références au catalogue" },
	{ value: "13", label: "familles de produits" },
	{ value: "100%", label: "synchronisé depuis Sage" },
];

export default function AProposPage() {
	return (
		<div>
			<JsonLd
				data={[
					{
						"@context": "https://schema.org",
						"@type": "WebPage",
						name: "La maison Bijou",
						url: `${siteConfig.url}/a-propos`,
						description: metadata.description,
					},
					breadcrumbSchema([
						{ name: "Accueil", path: "/" },
						{ name: "La maison", path: "/a-propos" },
					]),
				]}
			/>

			<section className="border-b border-border bg-background-secondary">
				<div className="container max-w-3xl py-16 md:py-24">
					<p className="eyebrow">La maison</p>
					<h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">
						Une joaillerie, une gestion, un seul catalogue.
					</h1>
					<p className="mt-6 text-lg text-muted-foreground">
						{siteConfig.name} réunit bijouterie, horlogerie et orfèvrerie au sein d'un catalogue
						unique. Chaque pièce présentée provient directement de la gestion Sage de la boutique,
						exposée au web par l'API Extracom100.
					</p>
				</div>
			</section>

			<section className="container max-w-3xl py-16">
				<div className="grid grid-cols-3 gap-6 border-y border-border py-8 text-center">
					{stats.map((stat) => (
						<div key={stat.label}>
							<p className="font-display text-4xl text-gold md:text-5xl">{stat.value}</p>
							<p className="mt-2 text-xs text-muted-foreground">{stat.label}</p>
						</div>
					))}
				</div>

				<div className="mt-12 space-y-5 text-muted-foreground">
					<h2 className="font-display text-2xl text-ink">Le catalogue, sans double saisie</h2>
					<p>
						{siteConfig.name} s'appuie sur Extracom100 pour publier son catalogue en ligne sans
						ressaisir une seule fiche. Les articles, leurs prix, leurs familles et l'arborescence
						des catalogues sont lus en direct dans Sage100 ; le site se charge de la mise en forme,
						de la recherche et des filtres.
					</p>
					<p>
						Cette approche garantit que les informations présentées — référence, désignation, prix,
						variantes — restent cohérentes avec la gestion commerciale. Quand une pièce évolue dans
						Sage, elle évolue sur le site.
					</p>
				</div>

				<div className="mt-10">
					<Button asChild variant="gold" size="lg">
						<Link href="/catalogue">Parcourir le catalogue</Link>
					</Button>
				</div>
			</section>

			<PageFaq items={aproposFaq} />
		</div>
	);
}
