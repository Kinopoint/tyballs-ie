import type { MetadataRoute } from "next";
import { getSitemapContent } from "@/cms/frontend";

export const dynamic = "force-static";
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const staticRoutes: MetadataRoute.Sitemap = routes.map(({ path, priority, image }) => ({
    url: `https://tyballs.ie${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
    images: [`https://tyballs.ie${image}`],
  }));
  const { events, venues } = await getSitemapContent();
  const eventRoutes: MetadataRoute.Sitemap = events
    .filter((event) => !event.seo.noIndex)
    .map((event) => ({
      url: `https://tyballs.ie/events/${event.slug}`,
      lastModified: new Date(event.updatedAt),
      changeFrequency: "monthly",
      priority: event.featured ? 0.75 : 0.65,
      images: typeof event.heroMedia === "object" && event.heroMedia?.url ? [`https://tyballs.ie${event.heroMedia.url}`] : undefined,
    }));
  const venueRoutes: MetadataRoute.Sitemap = venues
    .filter((venue) => !venue.seo.noIndex)
    .map((venue) => ({
      url: `https://tyballs.ie/venues/${venue.slug}`,
      lastModified: new Date(venue.updatedAt),
      changeFrequency: "monthly",
      priority: 0.65,
      images: typeof venue.heroMedia === "object" && venue.heroMedia?.url ? [`https://tyballs.ie${venue.heroMedia.url}`] : undefined,
    }));
  return [...staticRoutes, ...eventRoutes, ...venueRoutes];
}
