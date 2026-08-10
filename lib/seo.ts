import type { Metadata } from "next";

const staticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/og/home.jpg",
  imageAlt = "Guests arriving for a TY Ball in Ireland",
  noIndex = false,
}: PageMetadata): Metadata {
  const pageTitle = title.includes("TYBalls.ie") ? title : `${title} | TYBalls.ie`;
  const shouldIndex = !staticPreview && !noIndex;

  return {
    title,
    description,
    alternates: { canonical: path },
    applicationName: "TYBalls.ie",
    authors: [{ name: "TYBalls.ie by DebsGuru", url: "https://debsguru.ie/" }],
    creator: "TYBalls.ie by DebsGuru",
    publisher: "DebsGuru Ltd",
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: shouldIndex
        ? {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          }
        : { index: false, follow: false },
    },
    openGraph: {
      title: pageTitle,
      description,
      url: path,
      siteName: "TYBalls.ie",
      locale: "en_IE",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
    },
  };
}

export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tyballs.ie/" },
      { "@type": "ListItem", position: 2, name, item: `https://tyballs.ie${path}` },
    ],
  };
}
