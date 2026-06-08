import type { Article } from "@/lib/api/types";
import { formatWeight } from "@/lib/utils";

export function ProductSpecs({ article }: { article: Article }) {
	const rows: { label: string; value: string }[] = [
		{ label: "Référence", value: article.reference },
		article.family ? { label: "Famille", value: article.family.label } : null,
		article.unit ? { label: "Unité", value: article.unit } : null,
		article.weight ? { label: "Poids net", value: formatWeight(article.weight) } : null,
		article.weightGross ? { label: "Poids brut", value: formatWeight(article.weightGross) } : null,
		article.barcode ? { label: "Code-barres", value: article.barcode } : null,
	].filter((row): row is { label: string; value: string } => row !== null);

	return (
		<dl className="divide-y divide-border border-y border-border text-sm">
			{rows.map((row) => (
				<div key={row.label} className="flex justify-between gap-6 py-3">
					<dt className="text-muted-foreground">{row.label}</dt>
					<dd className="text-right font-medium text-ink">{row.value}</dd>
				</div>
			))}
		</dl>
	);
}
