import type { CollectionConfig, Where } from "payload";
import { ValidationError } from "payload";
import { canManageContent, isAdmin } from "@/cms/access";
import { createSeoFields } from "@/cms/fields/seo";
import { populateSlug } from "@/cms/slug";
import { eventPreviewPath } from "@/cms/preview";

export const Events: CollectionConfig = {
  slug: "events",
  admin: { group: "Publishing", useAsTitle: "title", defaultColumns: ["title", "eventDate", "county", "_status", "updatedAt"], preview: eventPreviewPath },
  access: {
    create: canManageContent,
    delete: isAdmin,
    read: ({ req }) => {
      if (req.user) return true;
      const publishedWithConsent: Where = { and: [{ _status: { equals: "published" } }, { photoConsentConfirmed: { equals: true } }] };
      return publishedWithConsent;
    },
    update: canManageContent,
  },
  fields: [
    { name: "title", type: "text", required: true, maxLength: 160 },
    { name: "slug", type: "text", required: true, unique: true, index: true, hooks: { beforeValidate: [populateSlug] } },
    { name: "eventDate", type: "date", required: true, index: true, admin: { date: { pickerAppearance: "dayOnly", displayFormat: "dd MMM yyyy" } } },
    { name: "county", type: "text", required: true, index: true, maxLength: 80 },
    { name: "venue", type: "relationship", relationTo: "venues" },
    { name: "summary", type: "textarea", required: true, maxLength: 500 },
    { name: "story", type: "richText", required: true },
    { name: "heroMedia", type: "upload", relationTo: "media", required: true },
    { name: "gallery", type: "relationship", relationTo: "galleries", required: true },
    { name: "featured", type: "checkbox", defaultValue: false, index: true },
    { name: "photoConsentConfirmed", type: "checkbox", required: true, defaultValue: false, admin: { description: "Confirm that all public media is approved for website use." } },
    ...createSeoFields(),
  ],
  hooks: {
    beforeChange: [({ data, originalDoc, req }) => {
      const status = data._status ?? originalDoc?._status;
      const consentConfirmed = data.photoConsentConfirmed ?? originalDoc?.photoConsentConfirmed;
      if (status === "published" && !consentConfirmed) {
        throw new ValidationError({
          collection: "events",
          errors: [{ message: "Confirm approval for all public media before publishing this event.", path: "photoConsentConfirmed" }],
          id: originalDoc?.id,
          req,
        });
      }
      return data;
    }],
  },
  versions: { drafts: { autosave: false }, maxPerDoc: 25 },
  timestamps: true,
};
