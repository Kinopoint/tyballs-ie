import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const privatePaths = ["/admin", "/api", "/cms-api"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "anthropic-ai", "Google-Extended"],
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: "https://tyballs.ie/sitemap.xml",
    host: "tyballs.ie",
  };
}
