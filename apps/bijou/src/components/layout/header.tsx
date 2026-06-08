import Link from "next/link";
import { navLinks, siteConfig } from "@/config/site";

export function Header() {
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
			<div className="container flex h-16 items-center justify-between md:h-20">
				<Link href="/" className="flex flex-col leading-none">
					<span className="font-display text-2xl tracking-tight text-ink md:text-3xl">
						{siteConfig.name}
					</span>
					<span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
						Maison de joaillerie
					</span>
				</Link>

				<nav aria-label="Navigation principale">
					<ul className="flex items-center gap-6 text-sm md:gap-9">
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
			</div>
		</header>
	);
}
