"use client";

import type { CatalogNode } from "@/lib/api/types";
import { useCatalogueNav } from "@/lib/use-catalogue-nav";
import { cn } from "@/lib/utils";

function TreeNode({
	node,
	selectedLevel,
	selectedId,
	onSelect,
}: {
	node: CatalogNode;
	selectedLevel: number | null;
	selectedId: number | null;
	onSelect: (level: number, id: number) => void;
}) {
	const id = Number(node.id);
	const active = selectedLevel === node.level && selectedId === id;

	return (
		<li>
			<button
				type="button"
				onClick={() => onSelect(node.level, id)}
				className={cn(
					"w-full text-left text-sm transition-colors hover:text-ink",
					active ? "font-semibold text-gold" : "text-muted-foreground",
				)}
			>
				{node.label}
			</button>
			{node.children.length > 0 ? (
				<ul className="mt-1 space-y-1 border-l border-border pl-3">
					{node.children.map((child) => (
						<TreeNode
							key={child.id}
							node={child}
							selectedLevel={selectedLevel}
							selectedId={selectedId}
							onSelect={onSelect}
						/>
					))}
				</ul>
			) : null}
		</li>
	);
}

export function CatalogTree({ catalogs }: { catalogs: CatalogNode[] }) {
	const { state, apply } = useCatalogueNav();

	const select = (level: number, id: number) => {
		if (state.catLevel === level && state.catId === id) {
			apply({ catLevel: null, catId: null });
		} else {
			apply({ catLevel: level, catId: id });
		}
	};

	return (
		<ul className="space-y-1.5">
			{catalogs.map((node) => (
				<TreeNode
					key={node.id}
					node={node}
					selectedLevel={state.catLevel}
					selectedId={state.catId}
					onSelect={select}
				/>
			))}
		</ul>
	);
}
