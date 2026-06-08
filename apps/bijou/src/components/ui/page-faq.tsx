import { Plus } from "lucide-react";
import { JsonLd } from "@/components/ui/json-ld";

export type FaqItem = { question: string; answer: string };

export function PageFaq({
	items,
	title = "Questions fréquentes",
}: {
	items: FaqItem[];
	title?: string;
}) {
	if (items.length === 0) return null;

	return (
		<section className="border-t border-border py-16 md:py-20" aria-labelledby="faq-title">
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: items.map((item) => ({
						"@type": "Question",
						name: item.question,
						acceptedAnswer: { "@type": "Answer", text: item.answer },
					})),
				}}
			/>
			<div className="container max-w-3xl">
				<h2 id="faq-title" className="font-display text-3xl text-ink md:text-4xl">
					{title}
				</h2>
				<div className="mt-8 divide-y divide-border border-y border-border">
					{items.map((item) => (
						<details key={item.question} className="group py-5">
							<summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink">
								{item.question}
								<Plus className="size-5 shrink-0 text-gold transition-transform group-open:rotate-45" />
							</summary>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
