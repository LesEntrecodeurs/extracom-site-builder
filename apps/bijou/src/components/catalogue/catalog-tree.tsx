"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { CatalogNode } from "@/lib/api/types";
import { useCatalogueNav } from "@/lib/use-catalogue-nav";
import { cn } from "@/lib/utils";

function contains(node: CatalogNode, level: number | null, id: number | null): boolean {
	if (level === null || id === null) return false;
	if (node.level === level && Number(node.id) === id) return true;
	return node.children.some((child) => contains(child, level, id));
}

function descendants(node: CatalogNode, depth = 0): { node: CatalogNode; depth: number }[] {
	return node.children.flatMap((child) => [
		{ node: child, depth },
		...descendants(child, depth + 1),
	]);
}

function isActive(node: CatalogNode, level: number | null, id: number | null): boolean {
	return node.level === level && Number(node.id) === id;
}

export function CatalogTree({ catalogs }: { catalogs: CatalogNode[] }) {
	const { state, apply } = useCatalogueNav();
	const [open, setOpen] = useState<Set<string>>(
		() =>
			new Set(catalogs.filter((n) => contains(n, state.catLevel, state.catId)).map((n) => n.id)),
	);

	const select = (node: CatalogNode) => {
		const id = Number(node.id);
		if (isActive(node, state.catLevel, state.catId)) {
			apply({ catLevel: null, catId: null });
		} else {
			apply({ catLevel: node.level, catId: id });
		}
	};

	const toggle = (id: string) =>
		setOpen((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});

	return (
		<ul className="-mx-1 space-y-0.5">
			{catalogs.map((root) => {
				const expanded = open.has(root.id);
				const rootActive = isActive(root, state.catLevel, state.catId);
				return (
					<li key={root.id}>
						<div className="flex items-center">
							{root.children.length > 0 ? (
								<button
									type="button"
									onClick={() => toggle(root.id)}
									aria-label={expanded ? "Replier" : "Déplier"}
									aria-expanded={expanded}
									className="flex size-6 shrink-0 items-center justify-center text-muted-foreground hover:text-ink"
								>
									<ChevronRight
										className={cn("size-3.5 transition-transform", expanded && "rotate-90")}
									/>
								</button>
							) : (
								<span className="size-6 shrink-0" />
							)}
							<button
								type="button"
								onClick={() => select(root)}
								className={cn(
									"flex-1 py-1 text-left text-sm transition-colors hover:text-ink",
									rootActive ? "font-semibold text-gold" : "text-ink/80",
								)}
							>
								{root.label}
							</button>
						</div>

						{expanded ? (
							<ul className="mb-1 space-y-0.5">
								{descendants(root).map(({ node, depth }) => {
									const active = isActive(node, state.catLevel, state.catId);
									return (
										<li key={`${node.level}-${node.id}`}>
											<button
												type="button"
												onClick={() => select(node)}
												style={{ paddingLeft: `${depth * 14 + 30}px` }}
												className={cn(
													"block w-full py-1 text-left text-[0.82rem] transition-colors hover:text-ink",
													active ? "font-medium text-gold" : "text-muted-foreground",
												)}
											>
												{node.label}
											</button>
										</li>
									);
								})}
							</ul>
						) : null}
					</li>
				);
			})}
		</ul>
	);
}
