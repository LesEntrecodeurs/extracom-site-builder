export const siteConfig = {
	name: "Bijou",
	legalName: "Bijou — Maison de joaillerie",
	description:
		"Bijou présente son catalogue de bijouterie or et argent, montres et orfèvrerie. Découvrez bagues, colliers, bracelets et garde-temps, filtrables par famille, catalogue et prix.",
	tagline: "Joaillerie, horlogerie & orfèvrerie",
	url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002",
	locale: "fr_FR",
	email: "contact@bijou.example",
	phone: "+33 3 00 00 00 00",
} as const;

export const navLinks = [
	{ href: "/catalogue", label: "Catalogue" },
	{ href: "/a-propos", label: "La maison" },
	{ href: "/contact", label: "Contact" },
] as const;
