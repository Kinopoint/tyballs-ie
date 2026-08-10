import type { Event, Faq, HomePage, Page, SiteSetting, Venue } from "@/payload-types";

export async function getHomePageContent(): Promise<HomePage | null> { return null; }
export async function getSiteSettings(): Promise<SiteSetting | null> { return null; }
export async function getPublishedFaqs(page: Faq["page"]): Promise<Faq[]> { void page; return []; }
export async function getPublishedPage(slug: Page["slug"]): Promise<Page | null> { void slug; return null; }
export async function getPublishedEvents(): Promise<Event[]> { return []; }
export async function getPublishedEvent(slug: string): Promise<Event | null> { void slug; return null; }
export async function getPublishedVenues(): Promise<Venue[]> { return []; }
export async function getPublishedVenue(slug: string): Promise<Venue | null> { void slug; return null; }
export async function getSitemapContent(): Promise<{ events: Event[]; venues: Venue[] }> { return { events: [], venues: [] }; }
