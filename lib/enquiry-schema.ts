import { z } from "zod";

const optionalTrackingValue = z.string().trim().max(500).optional().default("");

export const enquirySchema = z.object({
  school: z.string().trim().min(2).max(160),
  county: z.string().trim().min(2).max(80),
  contactName: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().min(7).max(30).regex(/^[+()\-\s\d]+$/),
  estimatedAttendance: z.coerce.number().int().min(10).max(2_000),
  preferredDate: z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), "Invalid date"),
  dateFlexibility: z.enum(["exact", "same_week", "flexible", "not_sure"]),
  priorities: z.array(z.enum(["venue", "food", "dj", "photography", "entertainment", "not_sure"])).max(6),
  message: z.string().trim().max(2_000).optional().default(""),
  privacyConsent: z.literal(true),
  marketingConsent: z.boolean().optional().default(false),
  turnstileToken: z.string().min(1).max(2_048),
  landingPage: optionalTrackingValue,
  referrer: optionalTrackingValue,
  utmSource: optionalTrackingValue,
  utmMedium: optionalTrackingValue,
  utmCampaign: optionalTrackingValue,
  utmContent: optionalTrackingValue,
  utmTerm: optionalTrackingValue,
  gclid: optionalTrackingValue,
  fbclid: optionalTrackingValue,
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
