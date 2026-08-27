import type { Metadata } from "next";
import type { Media } from "@/payload-types";

const staticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string | SocialImage;
  imageAlt?: string;
  noIndex?: boolean;
  follow?: boolean;
  type?: "article" | "website";
  publishedTime?: string;
  modifiedTime?: string;
};

type SocialImage = {
  url: string;
  width: number;
  height: number;
  type?: string;
};

export function getCmsSocialImage(media: string | Media | null | undefined): SocialImage | undefined {
  if (!media || typeof media !== "object" || !media.mimeType?.startsWith("image/")) return undefined;

  const social = media.sizes?.social;
  if (social?.url && social.mimeType?.startsWith("image/")) {
    return {
      url: social.url,
      width: social.width ?? 1200,
      height: social.height ?? 630,
      type: social.mimeType,
    };
  }

  if (!media.url) return undefined;
  return {
    url: media.url,
    width: media.width ?? 1200,
    height: media.height ?? 630,
    type: media.mimeType,
  };
}

export function socialImageOrFallback(media: string | Media | null | undefined, fallback: string): SocialImage | string {
  return getCmsSocialImage(media) ?? fallback;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = "/og/home.jpg",
  imageAlt = "Guests arriving for a TY Ball in Ireland",
  noIndex = false,
  follow = true,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadata): Metadata {
  const pageTitle = title.includes("TYBalls.ie") ? title : `${title} | TYBalls.ie`;
  const shouldIndex = !staticPreview && !noIndex;
  const shouldFollow = !staticPreview && follow;
  const socialImage = typeof image === "string"
    ? { url: image, width: 1200, height: 630, type: image.endsWith(".jpg") || image.endsWith(".jpeg") ? "image/jpeg" : undefined }
    : image;

  const openGraph = type === "article"
    ? {
        title: pageTitle,
        description,
        url: path,
        siteName: "TYBalls.ie",
        locale: "en_IE",
        type: "article" as const,
        publishedTime,
        modifiedTime,
        images: [{ ...socialImage, alt: imageAlt }],
      }
    : {
        title: pageTitle,
        description,
        url: path,
        siteName: "TYBalls.ie",
        locale: "en_IE",
        type: "website" as const,
        images: [{ ...socialImage, alt: imageAlt }],
      };

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
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow,
        ...(shouldIndex
          ? {
              "max-image-preview": "large" as const,
              "max-snippet": -1,
              "max-video-preview": -1,
            }
          : {}),
      },
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [{ url: socialImage.url, alt: imageAlt }],
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
