import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/how-it-works", "/for-committees", "/parents-schools", "/cost-guide", "/enquire", "/privacy", "/cookies", "/terms"];
  return routes.map((route) => ({ url: `https://tyballs.ie${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/enquire" ? 0.9 : 0.7 }));
}
