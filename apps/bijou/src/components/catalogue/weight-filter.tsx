"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCatalogueNav } from "@/lib/use-catalogue-nav";

export function WeightFilter() {
	const { state, apply } = useCatalogueNav();
	const [min, setMin] = useState(state.weightMinG?.toString() ?? "");
	const [max, setMax] = useState(state.weightMaxG?.toString() ?? "");

	useEffect(() => {
		setMin(state.weightMinG?.toString() ?? "");
		setMax(state.weightMaxG?.toString() ?? "");
	}, [state.weightMinG, state.weightMaxG]);

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				apply({
					weightMinG: min.trim() === "" ? null : Number(min),
					weightMaxG: max.trim() === "" ? null : Number(max),
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
					aria-label="Poids minimum en grammes"
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
					aria-label="Poids maximum en grammes"
					className="h-9 w-full border border-border bg-card px-2 text-sm outline-none focus:border-gold"
				/>
			</div>
			<Button type="submit" variant="outline" size="sm" className="w-full">
				Appliquer le poids (g)
			</Button>
		</form>
	);
}
