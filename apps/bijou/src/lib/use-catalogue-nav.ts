"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import {
	buildQueryString,
	type CatalogueState,
	parseCatalogueParams,
} from "@/lib/catalogue-params";

export function useCatalogueNav() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const state = useMemo(() => {
		const raw: Record<string, string | string[]> = {};
		for (const key of searchParams.keys()) {
			const all = searchParams.getAll(key);
			raw[key] = all.length > 1 ? all : all[0];
		}
		return parseCatalogueParams(raw);
	}, [searchParams]);

	const apply = useCallback(
		(changes: Partial<CatalogueState>, resetPage = true) => {
			const next: CatalogueState = {
				...state,
				...changes,
				page: resetPage ? 1 : (changes.page ?? state.page),
			};
			startTransition(() => {
				router.push(`/catalogue${buildQueryString(next)}`, { scroll: false });
			});
		},
		[router, state],
	);

	return { state, apply, isPending };
}
