import type { CollectionConfig } from "payload";
import { canManageContent, isAdmin, publishedOrAuthenticated } from "@/cms/access";
import { createSeoFields } from "@/cms/fields/seo";
import { populateSlug } from "@/cms/slug";
import { venuePreviewPath } from "@/cms/preview";

export const Venues: CollectionConfig = {
  slug: "venues",
  admin: { group: "Publishing", useAsTitle: "title", defaultColumns: ["title", "county", "_status", "updatedAt"], preview: venuePreviewPath },
  access: {
    create: canManageContent,
    delete: isAdmin,
    read: publishedOrAuthenticated,
    update: canManageContent,
  },
  fields: [
    { name: "title", type: "text", required: true, maxLength: 140 },
    { name: "slug", type: "text", required: true, unique: true, index: true, hooks: { beforeValidate: [populateSlug] } },
    { name: "county", type: "text", required: true, index: true, maxLength: 80 },
    { name: "area", type: "text", required: true, maxLength: 120 },
    { name: "summary", type: "textarea", required: true, maxLength: 500 },
    { name: "description", type: "richText", required: true },
    { name: "heroMedia", type: "upload", relationTo: "media", required: true },
    { name: "gallery", type: "relationship", relationTo: "galleries" },
    { name: "features", type: "array", maxRows: 12, fields: [{ name: "text", type: "text", required: true, maxLength: 180 }] },
    ...createSeoFields({}, { canonicalPathPrefix: "/venues" }),
  ],
  versions: { drafts: { autosave: false }, maxPerDoc: 25 },
  timestamps: true,
};
