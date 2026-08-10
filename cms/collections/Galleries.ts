import type { CollectionConfig } from "payload";
import { canManageContent, isAdmin, publishedOrAuthenticated } from "@/cms/access";
import { populateSlug } from "@/cms/slug";

export const Galleries: CollectionConfig = {
  slug: "galleries",
  admin: { group: "Content", useAsTitle: "title", defaultColumns: ["title", "slug", "_status", "updatedAt"] },
  access: {
    create: canManageContent,
    delete: isAdmin,
    read: publishedOrAuthenticated,
    update: canManageContent,
  },
  fields: [
    { name: "title", type: "text", required: true, maxLength: 140 },
    { name: "slug", type: "text", required: true, unique: true, index: true, hooks: { beforeValidate: [populateSlug] } },
    { name: "description", type: "textarea", maxLength: 800 },
    {
      name: "items",
      type: "array",
      required: true,
      minRows: 1,
      maxRows: 60,
      fields: [
        { name: "media", type: "upload", relationTo: "media", required: true },
        { name: "caption", type: "text", maxLength: 240 },
      ],
    },
  ],
  versions: { drafts: { autosave: false }, maxPerDoc: 25 },
  timestamps: true,
};
