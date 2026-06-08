import Image from "next/image";
import type { Article } from "@/lib/api/types";
import { cn } from "@/lib/utils";

function primaryImage(article: Pick<Article, "url" | "images">): string | null {
	if (article.url) return article.url;
	const withUrl = article.images.find((image) => image.url);
	return withUrl?.url ?? null;
}

function initials(reference: string): string {
	return (
		reference
			.replace(/[^a-zA-Z]/g, "")
			.slice(0, 2)
			.toUpperCase() || "BJ"
	);
}

type Props = {
	article: Pick<Article, "reference" | "description" | "url" | "images">;
	className?: string;
	sizes?: string;
	priority?: boolean;
};

export function ProductImage({ article, className, sizes, priority }: Props) {
	const src = primaryImage(article);

	if (src) {
		return (
			<div className={cn("relative overflow-hidden bg-muted", className)}>
				<Image
					src={src}
					alt={article.description}
					fill
					sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
					className="object-cover transition-transform duration-700 group-hover:scale-105"
					priority={priority}
				/>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background-secondary to-gold-soft",
				className,
			)}
			aria-hidden="true"
		>
			<span className="font-display text-4xl italic text-gold/70 transition-transform duration-700 group-hover:scale-110">
				{initials(article.reference)}
			</span>
			<span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(156,124,60,0.12),transparent_60%)]" />
		</div>
	);
}
