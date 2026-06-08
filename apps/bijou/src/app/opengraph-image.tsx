import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "90px",
				background: "#faf8f4",
				backgroundImage:
					"radial-gradient(circle at 75% 20%, rgba(156,124,60,0.18), transparent 55%)",
			}}
		>
			<div
				style={{
					fontSize: 30,
					letterSpacing: 12,
					textTransform: "uppercase",
					color: "#9c7c3c",
				}}
			>
				Maison de joaillerie
			</div>
			<div
				style={{
					fontSize: 150,
					color: "#1c1a17",
					marginTop: 16,
					fontWeight: 600,
				}}
			>
				{siteConfig.name}
			</div>
			<div style={{ fontSize: 42, color: "#6f675b", marginTop: 12 }}>{siteConfig.tagline}</div>
		</div>,
		size,
	);
}
