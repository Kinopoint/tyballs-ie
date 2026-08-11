import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { CmsMedia } from "@/components/cms-media";
import { StructuredData } from "@/components/structured-data";
import { getPublishedVenue } from "@/cms/frontend";
import { breadcrumbSchema, createPageMetadata, getCmsSocialImage } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getPublishedVenue(slug);
  if (!venue) return {};
  const image = getCmsSocialImage(venue.seo.image) ?? getCmsSocialImage(venue.heroMedia);
  return createPageMetadata({
    title: venue.seo.title,
    description: venue.seo.description,
    path: venue.seo.canonicalPath,
    image,
    imageAlt: venue.title,
    noIndex: venue.seo.noIndex ?? false,
  });
}

export default async function VenuePage({ params }: Props) {
  const { slug } = await params;
  const venue = await getPublishedVenue(slug);
  if (!venue) notFound();
  const placeSchema = { "@context": "https://schema.org", "@type": "Place", name: venue.title, description: venue.summary, url: `https://tyballs.ie/venues/${venue.slug}`, address: { "@type": "PostalAddress", addressLocality: venue.area, addressRegion: venue.county, addressCountry: "IE" } };
  return (
    <main id="main-content">
      <StructuredData data={[breadcrumbSchema(venue.title, `/venues/${venue.slug}`), placeSchema]} />
      <article className="zip-publishing-detail zip-shell">
        <header><p className="zip-eyebrow">{venue.area} · County {venue.county}</p><h1>{venue.title}</h1><p>{venue.summary}</p></header>
        <div className="zip-publishing-detail-media"><CmsMedia media={venue.heroMedia} /></div>
        <RichText className="zip-rich-text" data={venue.description} />
        {venue.features?.length ? <ul className="zip-venue-features">{venue.features.map((feature) => <li key={feature.id ?? feature.text}>{feature.text}</li>)}</ul> : null}
      </article>
    </main>
  );
}
