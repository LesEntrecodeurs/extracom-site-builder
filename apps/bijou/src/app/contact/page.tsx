import { Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/json-ld";
import { PageFaq } from "@/components/ui/page-faq";
import { siteConfig } from "@/config/site";
import { contactFaq } from "@/data/faqs";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
	title: "Contact — joindre la maison Bijou",
	description:
		"Contactez la maison Bijou par e-mail ou téléphone. Mentionnez la référence d'une pièce du catalogue pour une réponse sous 24 à 48 heures.",
	alternates: { canonical: "/contact" },
};

export default async function ContactPage({
	searchParams,
}: {
	searchParams: Promise<{ ref?: string }>;
}) {
	const { ref } = await searchParams;

	return (
		<div>
			<JsonLd
				data={[
					{
						"@context": "https://schema.org",
						"@type": "ContactPage",
						name: "Contact Bijou",
						url: `${siteConfig.url}/contact`,
					},
					breadcrumbSchema([
						{ name: "Accueil", path: "/" },
						{ name: "Contact", path: "/contact" },
					]),
				]}
			/>

			<section className="container max-w-2xl py-16 md:py-24">
				<p className="eyebrow">Contact</p>
				<h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">
					Échanger avec la maison Bijou
				</h1>
				<p className="mt-5 text-lg text-muted-foreground">
					Une question sur une pièce, une demande de réservation ou de devis ?{siteConfig.name} vous
					répond sous 24 à 48 heures ouvrées.
				</p>

				{ref ? (
					<p className="mt-6 border border-gold/40 bg-gold-soft px-4 py-3 text-sm text-ink">
						Votre demande concerne la référence <span className="font-semibold">{ref}</span>. Pensez
						à la mentionner dans votre message.
					</p>
				) : null}

				<div className="mt-10 divide-y divide-border border-y border-border">
					<a
						href={`mailto:${siteConfig.email}${ref ? `?subject=Demande%20-%20réf.%20${encodeURIComponent(ref)}` : ""}`}
						className="flex items-center gap-4 py-5 text-ink transition-colors hover:text-gold"
					>
						<Mail className="size-5 text-gold" />
						<span>
							<span className="block text-xs uppercase tracking-wider text-muted-foreground">
								E-mail
							</span>
							{siteConfig.email}
						</span>
					</a>
					<a
						href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
						className="flex items-center gap-4 py-5 text-ink transition-colors hover:text-gold"
					>
						<Phone className="size-5 text-gold" />
						<span>
							<span className="block text-xs uppercase tracking-wider text-muted-foreground">
								Téléphone
							</span>
							{siteConfig.phone}
						</span>
					</a>
				</div>
			</section>

			<PageFaq items={contactFaq} />
		</div>
	);
}
