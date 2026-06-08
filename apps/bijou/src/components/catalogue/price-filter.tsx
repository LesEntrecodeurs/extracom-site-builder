"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCatalogueNav } from "@/lib/use-catalogue-nav";

export function PriceFilter() {
	const { state, apply } = useCatalogueNav();
	const [min, setMin] = useState(state.priceMin?.toString() ?? "");
	const [max, setMax] = useState(state.priceMax?.toString() ?? "");

	useEffect(() => {
		setMin(state.priceMin?.toString() ?? "");
		setMax(state.priceMax?.toString() ?? "");
	}, [state.priceMin, state.priceMax]);

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				apply({
					priceMin: min.trim() === "" ? null : Number(min),
					priceMax: max.trim() === "" ? null : Number(max),
				});
			}}
			className="space-y-3"
		>
			<div className="flex items-center gap-2">
				<input
					type="number"
					inputMode="numeric"
					min={0}
					value={min}
					onChange={(event) => setMin(event.target.value)}
					placeholder="Min"
					aria-label="Prix minimum"
					className="h-9 w-full border border-border bg-card px-2 text-sm outline-none focus:border-gold"
				/>
				<span className="text-muted-foreground">—</span>
				<input
					type="number"
					inputMode="numeric"
					min={0}
					value={max}
					onChange={(event) => setMax(event.target.value)}
					placeholder="Max"
					aria-label="Prix maximum"
					className="h-9 w-full border border-border bg-card px-2 text-sm outline-none focus:border-gold"
				/>
			</div>
			<Button type="submit" variant="outline" size="sm" className="w-full">
				Appliquer le prix
			</Button>
		</form>
	);
}
