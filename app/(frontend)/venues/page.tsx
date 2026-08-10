import type { Metadata } from "next";
import Link from "next/link";
import { CmsMedia } from "@/components/cms-media";
import { StructuredData } from "@/components/structured-data";
import { getPublishedVenues } from "@/cms/frontend";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "TY Ball Venues Ireland",
  description: "Explore approved venue profiles for TY Balls across Ireland, with practical location and event information from the DebsGuru team.",
  path: "/venues",
  imageAlt: "TY Ball venues in Ireland",
});

export default async function VenuesPage() {
  const venues = await getPublishedVenues();
  return (
    <main id="main-content">
      <StructuredData data={breadcrumbSchema("Venues", "/venues")} />
      <section className="zip-inner-hero zip-shell zip-publishing-hero"><div className="zip-inner-copy"><p className="zip-eyebrow">Across Ireland</p><h1>TY Ball venues</h1><p>Published venue profiles matched to real event requirements.</p></div></section>
      <section className="zip-section zip-shell">
        {venues.length ? <div className="zip-publishing-grid">{venues.map((venue) => (
          <Link className="zip-publishing-card" href={`/venues/${venue.slug}`} key={venue.id}><div className="zip-publishing-media"><CmsMedia media={venue.heroMedia} /></div><div><p className="zip-eyebrow">{venue.area} · {venue.county}</p><h2>{venue.title}</h2><p>{venue.summary}</p></div></Link>
        ))}</div> : <p className="zip-publishing-empty">No venue profiles are published yet.</p>}
      </section>
    </main>
  );
}
