type PreviewDocument = Record<string, unknown>;

export function previewPath(path: string) {
  const params = new URLSearchParams({ path, secret: process.env.PREVIEW_SECRET || "" });
  return `/api/preview?${params.toString()}`;
}

export function pagePreviewPath(document: PreviewDocument) {
  const slug = typeof document.slug === "string" ? document.slug : "";
  return slug ? previewPath(`/${slug}`) : null;
}

export function eventPreviewPath(document: PreviewDocument) {
  const slug = typeof document.slug === "string" ? document.slug : "";
  return slug ? previewPath(`/events/${slug}`) : null;
}

export function venuePreviewPath(document: PreviewDocument) {
  const slug = typeof document.slug === "string" ? document.slug : "";
  return slug ? previewPath(`/venues/${slug}`) : null;
}
