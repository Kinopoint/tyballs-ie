import type { Metadata } from "next";
import Link from "next/link";
import { CmsMedia } from "@/components/cms-media";
import { StructuredData } from "@/components/structured-data";
import { getPublishedEvents } from "@/cms/frontend";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "TY Ball Event Stories Ireland",
  description: "Explore approved TY Ball event stories and real event moments from TYBalls.ie and the team behind DebsGuru.ie.",
  path: "/events",
  imageAlt: "TY Ball event stories across Ireland",
});

export default async function EventsPage() {
  const events = await getPublishedEvents();
  return (
    <main id="main-content">
      <StructuredData data={breadcrumbSchema("Event stories", "/events")} />
      <section className="zip-inner-hero zip-shell zip-publishing-hero">
        <div className="zip-inner-copy"><p className="zip-eyebrow">Real event moments</p><h1>TY Ball stories</h1><p>Approved highlights from events planned and run by the DebsGuru team.</p></div>
      </section>
      <section className="zip-section zip-shell">
        {events.length ? (
          <div className="zip-publishing-grid">
            {events.map((event) => (
              <Link className="zip-publishing-card" href={`/events/${event.slug}`} key={event.id}>
                <div className="zip-publishing-media"><CmsMedia media={event.heroMedia} /></div>
                <div><p className="zip-eyebrow">{event.county}</p><h2>{event.title}</h2><p>{event.summary}</p></div>
              </Link>
            ))}
          </div>
        ) : <p className="zip-publishing-empty">No event stories are published yet.</p>}
      </section>
    </main>
  );
}
