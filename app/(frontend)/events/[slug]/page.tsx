import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { CmsMedia } from "@/components/cms-media";
import { StructuredData } from "@/components/structured-data";
import { getPublishedEvent } from "@/cms/frontend";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublishedEvent(slug);
  if (!event) return {};
  return createPageMetadata({
    title: event.seo.title,
    description: event.seo.description,
    path: event.seo.canonicalPath,
    image: typeof event.seo.image === "object" && event.seo.image?.url ? event.seo.image.url : undefined,
    imageAlt: event.title,
    noIndex: event.seo.noIndex ?? false,
  });
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getPublishedEvent(slug);
  if (!event) notFound();
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.eventDate,
    description: event.summary,
    url: `https://tyballs.ie/events/${event.slug}`,
    location: typeof event.venue === "object" && event.venue ? { "@type": "Place", name: event.venue.title, address: `${event.venue.area}, County ${event.venue.county}, Ireland` } : undefined,
    organizer: { "@id": "https://tyballs.ie/#organisation" },
  };
  return (
    <main id="main-content">
      <StructuredData data={[breadcrumbSchema(event.title, `/events/${event.slug}`), eventSchema]} />
      <article className="zip-publishing-detail zip-shell">
        <header><p className="zip-eyebrow">{event.county} · {new Intl.DateTimeFormat("en-IE", { dateStyle: "long" }).format(new Date(event.eventDate))}</p><h1>{event.title}</h1><p>{event.summary}</p></header>
        <div className="zip-publishing-detail-media"><CmsMedia media={event.heroMedia} /></div>
        <RichText className="zip-rich-text" data={event.story} />
      </article>
    </main>
  );
}
