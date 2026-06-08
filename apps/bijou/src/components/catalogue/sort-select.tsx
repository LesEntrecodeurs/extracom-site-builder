"use client";

import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/catalogue-params";
import { useCatalogueNav } from "@/lib/use-catalogue-nav";

export function SortSelect() {
	const { state, apply } = useCatalogueNav();

	return (
		<label className="relative flex items-center gap-2 text-sm">
			<span className="text-muted-foreground">Trier&nbsp;:</span>
			<span className="relative">
				<select
					value={state.sort}
					onChange={(event) => apply({ sort: event.target.value })}
					className="h-10 appearance-none border border-border bg-card pl-3 pr-9 text-sm outline-none transition-colors focus:border-gold"
				>
					{SORT_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			</span>
		</label>
	);
}
