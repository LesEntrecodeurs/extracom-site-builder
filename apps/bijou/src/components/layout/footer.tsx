import Link from "next/link";
import { navLinks, siteConfig } from "@/config/site";

export function Footer() {
	return (
		<footer className="mt-24 border-t border-border bg-background-secondary">
			<div className="container grid gap-10 py-14 md:grid-cols-3">
				<div>
					<p className="font-display text-2xl text-ink">{siteConfig.name}</p>
					<p className="mt-3 max-w-xs text-sm text-muted-foreground">
						{siteConfig.tagline}. Catalogue présenté à titre de démonstration, alimenté en direct
						par l'API Extracom100.
					</p>
				</div>

				<nav aria-label="Pied de page">
					<p className="eyebrow mb-4">Navigation</p>
					<ul className="space-y-2 text-sm">
						{navLinks.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									className="text-muted-foreground transition-colors hover:text-ink"
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div>
					<p className="eyebrow mb-4">Contact</p>
					<ul className="space-y-2 text-sm text-muted-foreground">
						<li>
							<a href={`mailto:${siteConfig.email}`} className="hover:text-ink">
								{siteConfig.email}
							</a>
						</li>
						<li>
							<a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-ink">
								{siteConfig.phone}
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="border-t border-border">
				<div className="container flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
					<p>
						© {new Date().getFullYear()} {siteConfig.legalName}. Tous droits réservés.
					</p>
					<p>Démonstration e-commerce — base Sage BIJOU.</p>
				</div>
			</div>
		</footer>
	);
}
