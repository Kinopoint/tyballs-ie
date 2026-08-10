import type { CollectionConfig } from "payload";
import { canManageContent, isAdmin, publishedOrAuthenticated } from "@/cms/access";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: { group: "Content", useAsTitle: "question", defaultColumns: ["question", "page", "_status", "updatedAt"] },
  access: {
    create: canManageContent,
    delete: isAdmin,
    read: publishedOrAuthenticated,
    update: canManageContent,
  },
  orderable: true,
  fields: [
    { name: "question", type: "text", required: true, maxLength: 220 },
    { name: "answer", type: "textarea", required: true, maxLength: 2_000 },
    {
      name: "page",
      type: "select",
      required: true,
      defaultValue: "home",
      options: [
        { label: "Home", value: "home" },
        { label: "Parents and schools", value: "parents-schools" },
        { label: "For committees", value: "for-committees" },
        { label: "Cost guide", value: "cost-guide" },
      ],
    },
  ],
  versions: { drafts: { autosave: false }, maxPerDoc: 25 },
  timestamps: true,
};
