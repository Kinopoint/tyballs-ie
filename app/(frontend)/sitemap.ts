import type { MetadataRoute } from "next";
import { getSitemapContent } from "@/cms/frontend";
import { getCmsSocialImage } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 300;

const siteUrl = new URL("https://tyballs.ie");

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: "", priority: 1, image: "/og/home.jpg" },
    { path: "/how-it-works", priority: 0.9, image: "/og/how-it-works.jpg" },
    { path: "/for-committees", priority: 0.85, image: "/og/for-committees.jpg" },
    { path: "/parents-schools", priority: 0.85, image: "/og/parents-schools.jpg" },
    { path: "/cost-guide", priority: 0.8, image: "/og/cost-guide.jpg" },
    { path: "/enquire", priority: 0.9, image: "/og/enquire.jpg" },
    { path: "/events", priority: 0.75, image: "/og/home.jpg" },
    { path: "/venues", priority: 0.75, image: "/og/home.jpg" },
  ] as const;

  const staticRoutes: MetadataRoute.Sitemap = routes.map(({ path, priority, image }) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
    images: [absoluteUrl(image)],
  }));
  const { events, venues } = await getSitemapContent();
  const eventRoutes: MetadataRoute.Sitemap = events
    .filter((event) => !event.seo.noIndex)
    .map((event) => {
      const image = getCmsSocialImage(event.seo.image) ?? getCmsSocialImage(event.heroMedia);
      return {
        url: absoluteUrl(`/events/${event.slug}`),
        lastModified: new Date(event.updatedAt),
        changeFrequency: "monthly",
        priority: event.featured ? 0.75 : 0.65,
        images: image ? [absoluteUrl(image.url)] : undefined,
      };
    });
  const venueRoutes: MetadataRoute.Sitemap = venues
    .filter((venue) => !venue.seo.noIndex)
    .map((venue) => {
      const image = getCmsSocialImage(venue.seo.image) ?? getCmsSocialImage(venue.heroMedia);
      return {
        url: absoluteUrl(`/venues/${venue.slug}`),
        lastModified: new Date(venue.updatedAt),
        changeFrequency: "monthly",
        priority: 0.65,
        images: image ? [absoluteUrl(image.url)] : undefined,
      };
    });
  return [...staticRoutes, ...eventRoutes, ...venueRoutes];
}
