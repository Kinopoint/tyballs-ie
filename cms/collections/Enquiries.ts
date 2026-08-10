import type { CollectionConfig } from "payload";
import { sql } from "@payloadcms/db-postgres";
import { canManageContent, isAdmin, isAuthenticated } from "@/cms/access";

export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: { singular: "Enquiry", plural: "Enquiries" },
  admin: {
    group: "Enquiries",
    useAsTitle: "contactName",
    defaultColumns: ["createdAt", "contactName", "school", "county", "preferredDate", "status"],
  },
  defaultSort: "-createdAt",
  access: {
    create: () => false,
    delete: isAdmin,
    read: isAuthenticated,
    update: canManageContent,
  },
  fields: [
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      index: true,
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Proposal in progress", value: "proposal" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Closed", value: "closed" },
      ],
    },
    { name: "assignedTo", type: "relationship", relationTo: "users", index: true },
    { name: "lastContactedAt", type: "date", admin: { date: { pickerAppearance: "dayAndTime", displayFormat: "dd MMM yyyy, HH:mm" } } },
    { name: "internalNotes", type: "textarea", maxLength: 8_000 },
    {
      name: "contact",
      type: "group",
      fields: [
        { name: "firstName", type: "text" },
        { name: "lastName", type: "text" },
        { name: "contactName", type: "text", required: true, index: true },
        { name: "email", type: "email", required: true, index: true },
        { name: "phone", type: "text", required: true },
      ],
    },
    { name: "contactName", type: "text", required: true, index: true, admin: { hidden: true } },
    {
      name: "schoolDetails",
      type: "group",
      fields: [
        { name: "school", type: "text", required: true, index: true },
        { name: "county", type: "text", required: true, index: true },
        { name: "joiningSchools", type: "textarea" },
        { name: "yearSize", type: "number", min: 10, max: 2_000 },
      ],
    },
    { name: "school", type: "text", required: true, index: true, admin: { hidden: true } },
    { name: "county", type: "text", required: true, index: true, admin: { hidden: true } },
    {
      name: "eventDetails",
      type: "group",
      fields: [
        { name: "eventType", type: "select", options: [{ label: "Debs", value: "debs" }, { label: "TY Ball", value: "ty_ball" }] },
        { name: "preferredDate", type: "date", index: true, admin: { date: { pickerAppearance: "dayOnly", displayFormat: "dd MMM yyyy" } } },
        { name: "preferredLocation", type: "text" },
        {
          name: "attendanceBand",
          type: "select",
          options: [
            { label: "50–80", value: "50_80" },
            { label: "80–120", value: "80_120" },
            { label: "120–150", value: "120_150" },
            { label: "More than 150", value: "more_than_150" },
          ],
        },
        { name: "estimatedAttendance", type: "number", required: true },
        { name: "message", type: "textarea", maxLength: 2_000 },
      ],
    },
    { name: "preferredDate", type: "date", index: true, admin: { hidden: true } },
    {
      name: "source",
      type: "group",
      fields: [
        { name: "referralSource", type: "text" },
        { name: "referralOther", type: "text" },
        { name: "landingPage", type: "text" },
        { name: "referrer", type: "text" },
        { name: "utmSource", type: "text" },
        { name: "utmMedium", type: "text" },
        { name: "utmCampaign", type: "text" },
        { name: "utmContent", type: "text" },
        { name: "utmTerm", type: "text" },
        { name: "gclid", type: "text" },
        { name: "fbclid", type: "text" },
      ],
    },
    {
      name: "privacy",
      type: "group",
      fields: [
        { name: "noticeAcknowledgedAt", type: "date", required: true },
        { name: "marketingConsent", type: "checkbox", required: true, defaultValue: false },
      ],
    },
    {
      name: "notification",
      type: "group",
      fields: [
        { name: "status", type: "select", required: true, defaultValue: "pending", options: ["pending", "sent", "failed"] },
        { name: "error", type: "textarea", maxLength: 500 },
      ],
    },
    { name: "requestHash", type: "text", required: true, index: true, admin: { hidden: true } },
    { name: "legacyCreatedAt", type: "date", admin: { hidden: true } },
  ],
  hooks: {
    afterChange: [async ({ context, doc, operation, req }) => {
      if (operation !== "update" || context.skipLegacySync) return doc;
      const legacyStatus = {
        new: "new",
        contacted: "contacted",
        proposal: "qualified",
        confirmed: "booked",
        closed: "lost",
      }[doc.status as "new" | "contacted" | "proposal" | "confirmed" | "closed"];
      await req.payload.db.drizzle.execute(sql`UPDATE public.enquiries SET lead_status = ${legacyStatus}, last_activity_at = now() WHERE id = ${doc.id}::uuid`);
      return doc;
    }],
    afterDelete: [async ({ context, id, req }) => {
      if (!context.skipLegacySync) {
        await req.payload.db.drizzle.execute(sql`DELETE FROM public.enquiries WHERE id = ${id}::uuid`);
      }
    }],
  },
  versions: { maxPerDoc: 50 },
  timestamps: true,
};
