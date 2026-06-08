import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { buildQueryString, type CatalogueState } from "@/lib/catalogue-params";
import { cn } from "@/lib/utils";

type PageToken = { key: string; page: number | null };

function pageNumbers(current: number, total: number): PageToken[] {
	if (total <= 7) {
		return Array.from({ length: total }, (_, index) => ({
			key: `p${index + 1}`,
			page: index + 1,
		}));
	}
	const pages = new Set<number>([1, total, current]);
	for (let offset = 1; offset <= 1; offset += 1) {
		if (current - offset > 1) pages.add(current - offset);
		if (current + offset < total) pages.add(current + offset);
	}
	const sorted = [...pages].sort((a, b) => a - b);
	const result: PageToken[] = [];
	let previous = 0;
	for (const page of sorted) {
		if (page - previous > 1) result.push({ key: `gap-${previous}`, page: null });
		result.push({ key: `p${page}`, page });
		previous = page;
	}
	return result;
}

export function Pagination({ state, totalPages }: { state: CatalogueState; totalPages: number }) {
	if (totalPages <= 1) return null;

	const href = (page: number) => `/catalogue${buildQueryString({ ...state, page })}`;
	const current = state.page;

	return (
		<nav
			aria-label="Pagination du catalogue"
			className="mt-12 flex items-center justify-center gap-1.5"
		>
			{current > 1 ? (
				<Link
					href={href(current - 1)}
					rel="prev"
					aria-label="Page précédente"
					className="flex size-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-ink hover:text-ink"
				>
					<ChevronLeft className="size-4" />
				</Link>
			) : null}

			{pageNumbers(current, totalPages).map((token) =>
				token.page === null ? (
					<span
						key={token.key}
						className="flex size-10 items-center justify-center text-muted-foreground"
					>
						…
					</span>
				) : (
					<Link
						key={token.key}
						href={href(token.page)}
						aria-current={token.page === current ? "page" : undefined}
						className={cn(
							"flex size-10 items-center justify-center border text-sm transition-colors",
							token.page === current
								? "border-ink bg-ink text-background"
								: "border-border text-muted-foreground hover:border-ink hover:text-ink",
						)}
					>
						{token.page}
					</Link>
				),
			)}

			{current < totalPages ? (
				<Link
					href={href(current + 1)}
					rel="next"
					aria-label="Page suivante"
					className="flex size-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-ink hover:text-ink"
				>
					<ChevronRight className="size-4" />
				</Link>
			) : null}
		</nav>
	);
}
