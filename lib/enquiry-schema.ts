import { z } from "zod";

const optionalTrackingValue = z.string().trim().max(500).optional().default("");

export const enquirySchema = z.object({
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().min(2).max(80),
  school: z.string().trim().min(2).max(160),
  schoolLocation: z.string().trim().min(2).max(120),
  joiningSchools: z.string().trim().max(500).optional().default(""),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().min(7).max(30).regex(/^[+()\-\s\d]+$/),
  enquiryType: z.enum(["debs", "ty_ball"]),
  preferredDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  preferredLocation: z.string().trim().min(2).max(160),
  yearSize: z.coerce.number().int().min(10).max(2_000),
  attendanceBand: z.enum(["50_80", "80_120", "120_150", "more_than_150"]),
  referralSource: z.enum(["previous_year", "friends_schools", "instagram", "tiktok", "google", "other"]),
  referralOther: z.string().trim().max(160).optional().default(""),
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
}).superRefine((value, context) => {
  if (value.referralSource === "other" && value.referralOther.length < 2) {
    context.addIssue({ code: "custom", message: "Please tell us how you heard about DebsGuru.", path: ["referralOther"] });
  }
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
