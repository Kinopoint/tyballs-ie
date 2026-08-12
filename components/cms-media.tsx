import Image from "next/image";
import type { Media } from "@/payload-types";

export function CmsMedia({ media, className = "" }: { media: Media | string | null | undefined; className?: string }) {
  if (!media || typeof media === "string" || !media.url) return null;
  const mediaUrl = media.url.startsWith("https://tyballs.ie/") ? media.url.slice("https://tyballs.ie".length) : media.url;

  if (media.mimeType?.startsWith("video/")) {
    return <video autoPlay className={className} loop muted playsInline preload="metadata" src={mediaUrl} />;
  }

  return (
    <Image
      alt={media.alt}
      className={className}
      height={media.height ?? 1200}
      sizes="(max-width: 760px) 100vw, 50vw"
      src={mediaUrl}
      width={media.width ?? 1600}
    />
  );
}
