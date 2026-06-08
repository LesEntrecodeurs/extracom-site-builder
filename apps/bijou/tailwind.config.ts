import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "1.5rem",
			screens: { "2xl": "1280px" },
		},
		extend: {
			colors: {
				background: "var(--background)",
				"background-secondary": "var(--background-secondary)",
				foreground: "var(--foreground)",
				ink: "var(--ink)",
				gold: {
					DEFAULT: "var(--gold)",
					soft: "var(--gold-soft)",
					foreground: "var(--gold-foreground)",
				},
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				border: "var(--border)",
				ring: "var(--ring)",
			},
			fontFamily: {
				display: ["var(--font-display)", "Georgia", "serif"],
				sans: ["var(--font-sans)", "system-ui", "sans-serif"],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 4px)",
				sm: "calc(var(--radius) - 8px)",
			},
			keyframes: {
				"fade-up": {
					from: { opacity: "0", transform: "translateY(12px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
			},
			animation: {
				"fade-up": "fade-up 0.5s ease-out both",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
