import type { FieldHook } from "payload";

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

export const populateSlug: FieldHook = ({ data, operation, value }) => {
  if (typeof value === "string" && value.trim()) return slugify(value);
  if ((operation === "create" || !value) && typeof data?.title === "string") return slugify(data.title);
  return value;
};
