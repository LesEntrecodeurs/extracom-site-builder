"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCatalogueNav } from "@/lib/use-catalogue-nav";

export function SearchBar() {
	const { state, apply } = useCatalogueNav();
	const [value, setValue] = useState(state.q);

	useEffect(() => {
		setValue(state.q);
	}, [state.q]);

	return (
		<search className="block w-full">
			<form
				onSubmit={(event) => {
					event.preventDefault();
					apply({ q: value.trim() });
				}}
				className="relative w-full"
			>
				<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					value={value}
					onChange={(event) => setValue(event.target.value)}
					placeholder="Rechercher une bague, un collier, une montre…"
					aria-label="Rechercher dans le catalogue"
					className="h-11 w-full border border-border bg-card pl-10 pr-10 text-sm outline-none transition-colors focus:border-gold"
				/>
				{value ? (
					<button
						type="button"
						aria-label="Effacer la recherche"
						onClick={() => {
							setValue("");
							apply({ q: "" });
						}}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink"
					>
						<X className="size-4" />
					</button>
				) : null}
			</form>
		</search>
	);
}
