import type { Gamme } from "@/lib/api/types";
import { formatPrice } from "@/lib/utils";

export function ProductVariants({ gammes }: { gammes: Gamme[] }) {
	const withItems = gammes.filter((gamme) => gamme.items.length > 0);
	if (withItems.length === 0) return null;

	return (
		<div className="space-y-6">
			{withItems.map((gamme) => (
				<div key={gamme.id}>
					<p className="eyebrow mb-3">{gamme.label}</p>
					<ul className="flex flex-wrap gap-2">
						{gamme.items.map((item) => (
							<li key={item.id} className="border border-border bg-card px-3 py-2 text-sm">
								<span className="font-medium text-ink">{item.label}</span>
								<span className="ml-2 text-muted-foreground">{formatPrice(item.price)}</span>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
