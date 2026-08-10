import path from "node:path";
import type { CollectionConfig } from "payload";
import { canManageContent, isAdmin } from "@/cms/access";

const mediaDirectory = process.env.CMS_MEDIA_DIRECTORY || path.resolve(process.cwd(), "media");

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "orientation", "updatedAt"],
  },
  access: {
    create: canManageContent,
    delete: isAdmin,
    read: () => true,
    update: canManageContent,
  },
  fields: [
    { name: "alt", type: "text", required: true, maxLength: 180 },
    { name: "caption", type: "textarea", maxLength: 500 },
    { name: "credit", type: "text", maxLength: 160 },
    {
      name: "orientation",
      type: "select",
      required: true,
      defaultValue: "vertical",
      options: [
        { label: "Vertical", value: "vertical" },
        { label: "Horizontal", value: "horizontal" },
        { label: "Square", value: "square" },
      ],
    },
  ],
  upload: {
    staticDir: mediaDirectory,
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "video/mp4", "video/webm"],
    focalPoint: true,
    crop: true,
    imageSizes: [
      { name: "card", width: 720, height: 960, position: "centre", formatOptions: { format: "webp", options: { quality: 82 } } },
      { name: "wide", width: 1600, height: 900, position: "centre", formatOptions: { format: "webp", options: { quality: 84 } } },
      { name: "social", width: 1200, height: 630, position: "centre", formatOptions: { format: "webp", options: { quality: 84 } } },
    ],
  },
  timestamps: true,
};
