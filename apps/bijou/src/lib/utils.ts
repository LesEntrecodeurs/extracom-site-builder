import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(value: number): string {
	return new Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: value % 1 === 0 ? 0 : 2,
	}).format(value);
}

export function formatWeight(kilograms: number): string {
	if (kilograms < 1) {
		return `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 }).format(kilograms * 1000)} g`;
	}
	return `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(kilograms)} kg`;
}

export function cleanSageText(raw: string): string {
	return raw
		.replace(/\r\n?/g, "\n")
		.replace(/\t/g, " ")
		.replace(/[ ]{2,}/g, " ")
		.split("\n")
		.map((line) => line.trim())
		.join("\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}
