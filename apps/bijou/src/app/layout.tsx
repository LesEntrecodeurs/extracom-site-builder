import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import "./globals.css";

const display = Fraunces({
	subsets: ["latin"],
	variable: "--font-display",
	weight: ["400", "500", "600"],
	style: ["normal", "italic"],
	display: "swap",
});

const sans = Manrope({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: `${siteConfig.name} — ${siteConfig.tagline}`,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	openGraph: {
		type: "website",
		locale: siteConfig.locale,
		url: siteConfig.url,
		siteName: siteConfig.name,
		title: `${siteConfig.name} — ${siteConfig.tagline}`,
		description: siteConfig.description,
	},
	twitter: {
		card: "summary_large_image",
		title: `${siteConfig.name} — ${siteConfig.tagline}`,
		description: siteConfig.description,
	},
	robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="fr" className={cn(display.variable, sans.variable)}>
			<body className="font-sans antialiased">
				<Header />
				<main className="min-h-[60vh]">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
