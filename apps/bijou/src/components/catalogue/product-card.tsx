import Link from "next/link";
import { ProductImage } from "@/components/ui/product-image";
import type { Article } from "@/lib/api/types";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ article, priority }: { article: Article; priority?: boolean }) {
	const category = article.catalogPath.at(-1)?.label ?? article.family?.label;

	return (
		<Link
			href={`/produit/${encodeURIComponent(article.reference)}`}
			className="group flex flex-col border border-border bg-card transition-colors hover:border-gold"
		>
			<ProductImage
				article={article}
				className="aspect-square"
				sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
				priority={priority}
			/>
			<div className="flex flex-1 flex-col gap-1 p-4">
				{category ? (
					<span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
						{category}
					</span>
				) : null}
				<h3 className="font-display text-lg leading-snug text-ink">{article.description}</h3>
				<span className="mt-1 text-xs text-muted-foreground">Réf. {article.reference}</span>
				<span className="mt-auto pt-3 text-base font-semibold text-ink">
					{formatPrice(article.price)}
				</span>
			</div>
		</Link>
	);
}
