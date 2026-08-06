import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-07T00:00:00.000Z");
  const routes = [
    { path: "", priority: 1, image: "/og/home.jpg" },
    { path: "/how-it-works", priority: 0.9, image: "/og/how-it-works.jpg" },
    { path: "/for-committees", priority: 0.85, image: "/og/for-committees.jpg" },
    { path: "/parents-schools", priority: 0.85, image: "/og/parents-schools.jpg" },
    { path: "/cost-guide", priority: 0.8, image: "/og/cost-guide.jpg" },
    { path: "/enquire", priority: 0.9, image: "/og/enquire.jpg" },
    { path: "/privacy", priority: 0.3, image: "/og/home.jpg" },
    { path: "/cookies", priority: 0.3, image: "/og/home.jpg" },
    { path: "/terms", priority: 0.3, image: "/og/home.jpg" },
  ] as const;

  return routes.map(({ path, priority, image }) => ({
    url: `https://tyballs.ie${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
    images: [`https://tyballs.ie${image}`],
  }));
}
