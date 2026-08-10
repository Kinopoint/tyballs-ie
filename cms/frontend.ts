import "server-only";
import { connection } from "next/server";
import { draftMode } from "next/headers";
import type { Event, Faq, HomePage, Page, SiteSetting, Venue } from "@/payload-types";
import { getCms } from "@/cms/payload";

const staticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true";

export async function getHomePageContent(): Promise<HomePage | null> {
  if (staticPreview) return null;
  await connection();
  try {
    const payload = await getCms();
    const { isEnabled } = await draftMode();
    return await payload.findGlobal({ slug: "home-page", depth: 2, draft: isEnabled });
  } catch (error) {
    console.error("Unable to load CMS home page content.", error);
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSetting | null> {
  if (staticPreview) return null;
  await connection();
  try {
    const payload = await getCms();
    return await payload.findGlobal({ slug: "site-settings", depth: 1 });
  } catch (error) {
    console.error("Unable to load CMS site settings.", error);
    return null;
  }
}

export async function getPublishedFaqs(page: Faq["page"]): Promise<Faq[]> {
  if (staticPreview) return [];
  await connection();
  try {
    const payload = await getCms();
    const result = await payload.find({
      collection: "faqs",
      depth: 0,
      limit: 50,
      pagination: false,
      sort: "_order",
      where: { page: { equals: page } },
    });
    return result.docs;
  } catch (error) {
    console.error(`Unable to load CMS FAQs for ${page}.`, error);
    return [];
  }
}

export async function getPublishedPage(slug: Page["slug"]): Promise<Page | null> {
  if (staticPreview) return null;
  await connection();
  try {
    const payload = await getCms();
    const { isEnabled } = await draftMode();
    const result = await payload.find({
      collection: "pages",
      depth: 2,
      draft: isEnabled,
      limit: 1,
      pagination: false,
      where: { slug: { equals: slug } },
    });
    return result.docs[0] ?? null;
  } catch (error) {
    console.error(`Unable to load CMS page ${slug}.`, error);
    return null;
  }
}

export async function getPublishedEvents(): Promise<Event[]> {
  if (staticPreview) return [];
  await connection();
  try {
    const payload = await getCms();
    const { isEnabled } = await draftMode();
    const result = await payload.find({ collection: "events", depth: 2, draft: isEnabled, limit: 100, pagination: false, sort: "-eventDate" });
    return result.docs.filter((event) => isEnabled || event.photoConsentConfirmed);
  } catch (error) {
    console.error("Unable to load CMS events.", error);
    return [];
  }
}

export async function getPublishedEvent(slug: string): Promise<Event | null> {
  const events = await getPublishedEvents();
  return events.find((event) => event.slug === slug) ?? null;
}

export async function getPublishedVenues(): Promise<Venue[]> {
  if (staticPreview) return [];
  await connection();
  try {
    const payload = await getCms();
    const { isEnabled } = await draftMode();
    const result = await payload.find({ collection: "venues", depth: 2, draft: isEnabled, limit: 100, pagination: false, sort: "title" });
    return result.docs;
  } catch (error) {
    console.error("Unable to load CMS venues.", error);
    return [];
  }
}

export async function getPublishedVenue(slug: string): Promise<Venue | null> {
  const venues = await getPublishedVenues();
  return venues.find((venue) => venue.slug === slug) ?? null;
}

export async function getSitemapContent(): Promise<{ events: Event[]; venues: Venue[] }> {
  if (staticPreview || process.env.NEXT_PHASE === "phase-production-build") return { events: [], venues: [] };
  try {
    const payload = await getCms();
    const [eventResult, venueResult] = await Promise.all([
      payload.find({ collection: "events", depth: 1, limit: 100, pagination: false, sort: "-eventDate" }),
      payload.find({ collection: "venues", depth: 1, limit: 100, pagination: false, sort: "title" }),
    ]);
    return {
      events: eventResult.docs.filter((event) => event.photoConsentConfirmed),
      venues: venueResult.docs,
    };
  } catch (error) {
    console.error("Unable to load CMS sitemap content.", error);
    return { events: [], venues: [] };
  }
}
