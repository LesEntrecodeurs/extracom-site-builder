"use client";

import type { Family } from "@/lib/api/types";
import { useCatalogueNav } from "@/lib/use-catalogue-nav";
import { cn } from "@/lib/utils";

export function FamilyFilter({ families }: { families: Family[] }) {
	const { state, apply } = useCatalogueNav();

	const toggle = (code: string) => {
		const next = state.families.includes(code)
			? state.families.filter((item) => item !== code)
			: [...state.families, code];
		apply({ families: next });
	};

	return (
		<ul className="space-y-2">
			{families.map((family) => {
				const checked = state.families.includes(family.code);
				return (
					<li key={family.code}>
						<label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground hover:text-ink">
							<input
								type="checkbox"
								checked={checked}
								onChange={() => toggle(family.code)}
								className="sr-only"
							/>
							<span
								className={cn(
									"flex size-4 shrink-0 items-center justify-center border transition-colors",
									checked ? "border-gold bg-gold text-gold-foreground" : "border-border bg-card",
								)}
								aria-hidden="true"
							>
								{checked ? "✓" : ""}
							</span>
							<span className={cn(checked && "font-medium text-ink")}>{family.label}</span>
						</label>
					</li>
				);
			})}
		</ul>
	);
}
