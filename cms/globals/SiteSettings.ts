import type { GlobalConfig } from "payload";
import { canManageContent } from "@/cms/access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: { group: "Site" },
  access: {
    read: () => true,
    update: canManageContent,
  },
  fields: [
    { name: "siteName", type: "text", required: true, defaultValue: "TYBalls.ie" },
    {
      name: "siteDescription",
      type: "textarea",
      required: true,
      maxLength: 170,
      defaultValue: "TY Ball venue, food, entertainment, security and event coordination across Ireland from the team behind DebsGuru.ie.",
    },
    { name: "contactEmail", type: "email", required: true, defaultValue: "info@debsguru.ie" },
    { name: "whatsappNumber", type: "text", required: true, defaultValue: "353873431732" },
    { name: "whatsappLabel", type: "text", required: true, defaultValue: "Message us on WhatsApp" },
    {
      name: "socialLinks",
      type: "group",
      fields: [
        { name: "instagram", type: "text", required: true, defaultValue: "https://www.instagram.com/debsguru/" },
        { name: "facebook", type: "text", required: true, defaultValue: "https://www.facebook.com/DebsGuru" },
        { name: "tiktok", type: "text", required: true, defaultValue: "https://www.tiktok.com/@debsguru.ie" },
        { name: "debsGuru", type: "text", required: true, defaultValue: "https://debsguru.ie/" },
      ],
    },
    {
      name: "footerStatement",
      type: "textarea",
      required: true,
      maxLength: 240,
      defaultValue: "TYBalls.ie is brought to you by the team behind DebsGuru.ie.",
    },
    { name: "defaultSocialImage", type: "upload", relationTo: "media" },
  ],
};
