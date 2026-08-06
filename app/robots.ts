import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "anthropic-ai", "Google-Extended", "bingbot"], allow: "/", disallow: "/api/" },
    ],
    sitemap: "https://tyballs.ie/sitemap.xml",
    host: "https://tyballs.ie",
  };
}
