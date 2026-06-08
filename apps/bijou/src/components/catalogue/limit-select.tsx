"use client";

import { ChevronDown } from "lucide-react";
import { useCatalogueNav } from "@/lib/use-catalogue-nav";

const LIMITS = [6, 12, 24, 50, 100, 200];

export function LimitSelect() {
	const { state, apply } = useCatalogueNav();

	return (
		<label className="relative flex items-center gap-2 text-sm">
			<span className="text-muted-foreground">Par page&nbsp;:</span>
			<span className="relative">
				<select
					value={state.limit}
					onChange={(event) => apply({ limit: Number(event.target.value) })}
					className="h-10 appearance-none border border-border bg-card pl-3 pr-9 text-sm outline-none transition-colors focus:border-gold"
				>
					{LIMITS.map((value) => (
						<option key={value} value={value}>
							{value}
						</option>
					))}
				</select>
				<ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			</span>
		</label>
	);
}
