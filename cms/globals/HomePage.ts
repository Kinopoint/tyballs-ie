import type { GlobalConfig } from "payload";
import { canManageContent } from "@/cms/access";
import { createSeoFields } from "@/cms/fields/seo";
import { previewPath } from "@/cms/preview";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home page",
  admin: { group: "Pages", preview: () => previewPath("/") },
  access: {
    read: () => true,
    update: canManageContent,
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "TY Ball organisers across Ireland" },
        { name: "title", type: "text", required: true, defaultValue: "Planning a TY Ball?" },
        { name: "intro", type: "textarea", required: true, defaultValue: "A memorable night for your guests. One clear plan for you." },
        { name: "primaryButtonLabel", type: "text", required: true, defaultValue: "Booking Enquiry Form" },
        { name: "primaryButtonLink", type: "text", required: true, defaultValue: "/enquire" },
        { name: "secondaryButtonLabel", type: "text", required: true, defaultValue: "See how it works" },
        { name: "secondaryButtonLink", type: "text", required: true, defaultValue: "/how-it-works" },
      ],
    },
    {
      name: "highlights",
      type: "array",
      required: true,
      minRows: 3,
      maxRows: 3,
      defaultValue: [
        { icon: "venue", title: "Venue search", text: "Matched to your county, date and guest estimate" },
        { icon: "contact", title: "One coordinator", text: "One contact from first conversation to the night" },
        { icon: "shield", title: "A managed event", text: "Security, DebsGuru staff and hotel staff included" },
      ],
      fields: [
        {
          name: "icon",
          type: "select",
          required: true,
          options: [
            { label: "Venue", value: "venue" },
            { label: "Coordinator", value: "contact" },
            { label: "Managed event", value: "shield" },
          ],
        },
        { name: "title", type: "text", required: true, maxLength: 80 },
        { name: "text", type: "textarea", required: true, maxLength: 180 },
      ],
    },
    {
      name: "experience",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Your night" },
        { name: "title", type: "text", required: true, defaultValue: "Everything in its place." },
        {
          name: "categories",
          type: "array",
          required: true,
          minRows: 4,
          maxRows: 4,
          fields: [
            { name: "name", type: "text", required: true, maxLength: 80 },
            { name: "video", type: "upload", relationTo: "media", required: true },
            { name: "poster", type: "upload", relationTo: "media", required: true },
          ],
        },
      ],
    },
    {
      name: "proof",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Proven experience" },
        { name: "title", type: "text", required: true, defaultValue: "Over 10 years." },
        {
          name: "text",
          type: "textarea",
          required: true,
          defaultValue: "TYBalls.ie is brought to you by the team behind DebsGuru.ie, with thousands of students enjoying our events across Ireland.",
        },
        { name: "gallery", type: "relationship", relationTo: "galleries" },
      ],
    },
    {
      name: "steps",
      type: "array",
      required: true,
      minRows: 3,
      maxRows: 3,
      defaultValue: [
        { title: "Share the basics", text: "School, county, date and estimated attendance." },
        { title: "Review the plan", text: "See the venue, inclusions and pricing together." },
        { title: "Enjoy the night", text: "Your coordinator keeps the agreed plan moving." },
      ],
      fields: [
        { name: "title", type: "text", required: true, maxLength: 100 },
        { name: "text", type: "textarea", required: true, maxLength: 220 },
      ],
    },
    {
      name: "parentGuidance",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "For parents and schools" },
        { name: "title", type: "text", required: true, defaultValue: "Clear for everyone." },
        {
          name: "points",
          type: "array",
          required: true,
          minRows: 1,
          defaultValue: [
            { text: "Security is included in every booking" },
            { text: "DebsGuru and hotel staff run the event" },
            { text: "Parents are welcome to attend" },
          ],
          fields: [{ name: "text", type: "text", required: true, maxLength: 180 }],
        },
      ],
    },
    {
      name: "finalCallToAction",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Start with the basics" },
        { name: "title", type: "text", required: true, defaultValue: "Booking Enquiry Form" },
        { name: "text", type: "textarea", required: true, defaultValue: "Sending an enquiry does not reserve a date or create a booking." },
        { name: "buttonLabel", type: "text", required: true, defaultValue: "Open the form" },
        { name: "buttonLink", type: "text", required: true, defaultValue: "/enquire" },
      ],
    },
    ...createSeoFields({
      title: "TY Ball Organisers Ireland | TYBalls.ie by DebsGuru",
      description: "Plan a TY Ball in Ireland with venue sourcing, food, entertainment, security and staffed event coordination from the team behind DebsGuru.ie.",
      canonicalPath: "/",
    }),
  ],
  versions: { drafts: { autosave: false }, max: 25 },
};
