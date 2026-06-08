import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{ userAgent: "*", allow: "/" },
			{
				userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended"],
				allow: "/",
			},
		],
		sitemap: `${siteConfig.url}/sitemap.xml`,
		host: siteConfig.url,
	};
}
