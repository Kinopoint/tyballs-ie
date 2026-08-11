import type { CollectionConfig } from "payload";
import { canManageContent, isAdmin, publishedOrAuthenticated } from "@/cms/access";
import { createSeoFields } from "@/cms/fields/seo";
import { pagePreviewPath } from "@/cms/preview";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    group: "Pages",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
    preview: pagePreviewPath,
  },
  access: {
    create: canManageContent,
    delete: isAdmin,
    read: publishedOrAuthenticated,
    update: canManageContent,
  },
  fields: [
    { name: "title", type: "text", required: true, maxLength: 120 },
    {
      name: "slug",
      type: "select",
      required: true,
      unique: true,
      index: true,
      options: [
        { label: "How it works", value: "how-it-works" },
        { label: "Cost guide", value: "cost-guide" },
        { label: "Parents and schools", value: "parents-schools" },
        { label: "For committees", value: "for-committees" },
        { label: "Booking enquiry", value: "enquire" },
      ],
    },
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true, maxLength: 100 },
        { name: "title", type: "text", required: true, maxLength: 140 },
        { name: "intro", type: "textarea", required: true, maxLength: 500 },
        { name: "media", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "sections",
      type: "array",
      required: true,
      minRows: 1,
      maxRows: 12,
      admin: { description: "Section keys are used by the fixed site design. Edit copy and order; do not rename a key unless the frontend is updated." },
      fields: [
        { name: "key", type: "text", required: true, maxLength: 80 },
        { name: "eyebrow", type: "text", maxLength: 100 },
        { name: "title", type: "text", required: true, maxLength: 160 },
        { name: "text", type: "textarea", maxLength: 1_000 },
        {
          name: "items",
          type: "array",
          maxRows: 20,
          fields: [
            { name: "title", type: "text", required: true, maxLength: 160 },
            { name: "text", type: "textarea", required: true, maxLength: 1_000 },
          ],
        },
      ],
    },
    {
      name: "callToAction",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true, maxLength: 100 },
        { name: "title", type: "text", required: true, maxLength: 160 },
        { name: "text", type: "textarea", maxLength: 500 },
        { name: "buttonLabel", type: "text", required: true, maxLength: 80 },
        { name: "buttonLink", type: "text", required: true, maxLength: 240 },
      ],
    },
    ...createSeoFields({}, { canonicalPathPrefix: "" }),
  ],
  versions: { drafts: { autosave: false }, maxPerDoc: 25 },
  timestamps: true,
};
