import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
			<p className="eyebrow">Erreur 404</p>
			<h1 className="mt-4 font-display text-5xl text-ink md:text-6xl">Pièce introuvable</h1>
			<p className="mt-4 max-w-md text-muted-foreground">
				La page ou la référence demandée n'existe pas ou n'est plus au catalogue.
			</p>
			<div className="mt-8">
				<Button asChild variant="gold" size="lg">
					<Link href="/catalogue">Retour au catalogue</Link>
				</Button>
			</div>
		</div>
	);
}
