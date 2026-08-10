import pg from "pg";
import { getPayload } from "payload";
import config from "@payload-config";

type LegacyEnquiry = {
  id: string;
  created_at: Date;
  school: string;
  county: string;
  contact_name: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string;
  event_type: "debs" | "ty_ball" | null;
  year_size: number | null;
  estimated_attendance: number;
  preferred_date: string | null;
  preferred_location: string | null;
  attendance_band: "50_80" | "80_120" | "120_150" | "more_than_150" | null;
  referral_source: string | null;
  referral_other: string | null;
  joining_schools: string | null;
  message: string | null;
  privacy_notice_acknowledged_at: Date;
  marketing_consent: boolean;
  landing_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
  lead_status: "new" | "contacted" | "qualified" | "quote_sent" | "booked" | "lost";
  notification_status: "pending" | "sent" | "failed";
  notification_error: string | null;
  request_hash: string;
};

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required.");

const statusMap = {
  new: "new",
  contacted: "contacted",
  qualified: "proposal",
  quote_sent: "proposal",
  booked: "confirmed",
  lost: "closed",
} as const;

const pool = new pg.Pool({ connectionString, max: 2, connectionTimeoutMillis: 5_000 });
const payload = await getPayload({ config });
const result = await pool.query<LegacyEnquiry>("SELECT * FROM public.enquiries ORDER BY created_at ASC");
let migrated = 0;
let skipped = 0;

for (const enquiry of result.rows) {
  const existing = await payload.findByID({ collection: "enquiries", id: enquiry.id, disableErrors: true, depth: 0 });
  if (existing) {
    skipped += 1;
    continue;
  }

  await payload.create({
    collection: "enquiries",
    overrideAccess: true,
    data: {
      id: enquiry.id,
      status: statusMap[enquiry.lead_status],
      contact: {
        firstName: enquiry.first_name ?? undefined,
        lastName: enquiry.last_name ?? undefined,
        contactName: enquiry.contact_name,
        email: enquiry.email,
        phone: enquiry.phone,
      },
      contactName: enquiry.contact_name,
      schoolDetails: {
        school: enquiry.school,
        county: enquiry.county,
        joiningSchools: enquiry.joining_schools ?? undefined,
        yearSize: enquiry.year_size ?? undefined,
      },
      school: enquiry.school,
      county: enquiry.county,
      eventDetails: {
        eventType: enquiry.event_type ?? undefined,
        preferredDate: enquiry.preferred_date ?? undefined,
        preferredLocation: enquiry.preferred_location ?? undefined,
        attendanceBand: enquiry.attendance_band ?? undefined,
        estimatedAttendance: enquiry.estimated_attendance,
        message: enquiry.message ?? undefined,
      },
      preferredDate: enquiry.preferred_date ?? undefined,
      source: {
        referralSource: enquiry.referral_source ?? undefined,
        referralOther: enquiry.referral_other ?? undefined,
        landingPage: enquiry.landing_page ?? undefined,
        referrer: enquiry.referrer ?? undefined,
        utmSource: enquiry.utm_source ?? undefined,
        utmMedium: enquiry.utm_medium ?? undefined,
        utmCampaign: enquiry.utm_campaign ?? undefined,
        utmContent: enquiry.utm_content ?? undefined,
        utmTerm: enquiry.utm_term ?? undefined,
        gclid: enquiry.gclid ?? undefined,
        fbclid: enquiry.fbclid ?? undefined,
      },
      privacy: {
        noticeAcknowledgedAt: enquiry.privacy_notice_acknowledged_at.toISOString(),
        marketingConsent: enquiry.marketing_consent,
      },
      notification: {
        status: enquiry.notification_status,
        error: enquiry.notification_error ?? undefined,
      },
      requestHash: enquiry.request_hash,
      legacyCreatedAt: enquiry.created_at.toISOString(),
    },
  });
  migrated += 1;
}

payload.logger.info(`Legacy enquiry migration complete: ${migrated} migrated, ${skipped} already present.`);
await pool.end();
await payload.destroy();
