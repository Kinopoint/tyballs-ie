import { createHmac, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import type { PoolClient } from "pg";
import { getDatabase } from "@/lib/database";
import { sendEnquiryNotification } from "@/lib/email";
import { enquirySchema } from "@/lib/enquiry-schema";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

const attendanceEstimate = {
  "50_80": 65,
  "80_120": 100,
  "120_150": 135,
  more_than_150: 151,
} as const;

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function requestHash(ip: string) {
  const salt = process.env.RATE_LIMIT_SALT;
  if (!salt) throw new Error("RATE_LIMIT_SALT is not configured.");
  return createHmac("sha256", salt).update(ip).digest("hex");
}

export async function POST(request: NextRequest) {
  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ message: "The submitted data is not valid." }, { status: 400 });
  }

  if (typeof raw === "object" && raw !== null && "website" in raw && raw.website) {
    return NextResponse.json({ accepted: true }, { status: 202 });
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please check the highlighted details and try again.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const ip = clientIp(request);

  try {
    const verified = await verifyTurnstile(parsed.data.turnstileToken, ip === "unknown" ? "" : ip);
    if (!verified) {
      return NextResponse.json({ message: "The security check was not completed. Please try again." }, { status: 403 });
    }
  } catch (error) {
    console.error("Turnstile verification error", error);
    return NextResponse.json({ message: "The security check is temporarily unavailable. Please try again shortly." }, { status: 503 });
  }

  const hash = requestHash(ip);
  const enquiry = parsed.data;
  const id = randomUUID();
  const database = getDatabase();
  let client: PoolClient;

  try {
    client = await database.connect();
  } catch (error) {
    console.error("Database connection error", error);
    return NextResponse.json({ message: "The enquiry service is temporarily unavailable. Please try again shortly." }, { status: 503 });
  }

  try {
    await client.query("BEGIN");
    const rate = await client.query<{ submissions: number }>(
      `INSERT INTO submission_windows (request_hash, window_started_at, submissions)
       VALUES ($1, date_trunc('hour', now()) + floor(date_part('minute', now()) / 15) * interval '15 minutes', 1)
       ON CONFLICT (request_hash, window_started_at)
       DO UPDATE SET submissions = submission_windows.submissions + 1
       RETURNING submissions`,
      [hash],
    );

    if ((rate.rows[0]?.submissions ?? 0) > 5) {
      await client.query("ROLLBACK");
      return NextResponse.json({ message: "Too many enquiries were submitted. Please wait and try again." }, { status: 429 });
    }

    const duplicate = await client.query(
      `SELECT id FROM enquiries
       WHERE request_hash = $1 AND lower(email) = lower($2) AND lower(school) = lower($3)
         AND created_at > now() - interval '15 minutes'
       LIMIT 1`,
      [hash, enquiry.email, enquiry.school],
    );

    if (duplicate.rowCount) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { accepted: true, message: "We already received this enquiry. The team will be in touch." },
        { status: 200 },
      );
    }

    await client.query(
      `INSERT INTO enquiries (
        id, school, county, contact_name, first_name, last_name, email, phone,
        event_type, year_size, estimated_attendance, preferred_date, date_flexibility,
        preferred_location, attendance_band, referral_source, referral_other,
        joining_schools, priorities, message, privacy_consent_at, marketing_consent,
        landing_page, referrer, utm_source, utm_medium, utm_campaign, utm_content,
        utm_term, gclid, fbclid, request_hash
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::date, 'not_sure',
        $13, $14, $15, NULLIF($16, ''), NULLIF($17, ''), '{}', NULLIF($18, ''),
        now(), false, NULLIF($19, ''), NULLIF($20, ''), NULLIF($21, ''), NULLIF($22, ''),
        NULLIF($23, ''), NULLIF($24, ''), NULLIF($25, ''), NULLIF($26, ''), NULLIF($27, ''), $28
      )`,
      [
        id,
        enquiry.school,
        enquiry.schoolLocation,
        `${enquiry.firstName} ${enquiry.lastName}`,
        enquiry.firstName,
        enquiry.lastName,
        enquiry.email,
        enquiry.phone,
        enquiry.enquiryType,
        enquiry.yearSize,
        attendanceEstimate[enquiry.attendanceBand],
        enquiry.preferredDate,
        enquiry.preferredLocation,
        enquiry.attendanceBand,
        enquiry.referralSource,
        enquiry.referralOther,
        enquiry.joiningSchools,
        enquiry.message,
        enquiry.landingPage,
        enquiry.referrer,
        enquiry.utmSource,
        enquiry.utmMedium,
        enquiry.utmCampaign,
        enquiry.utmContent,
        enquiry.utmTerm,
        enquiry.gclid,
        enquiry.fbclid,
        hash,
      ],
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Enquiry persistence error", error);
    return NextResponse.json({ message: "We could not save the enquiry. Please try again shortly." }, { status: 503 });
  } finally {
    client.release();
  }

  try {
    await sendEnquiryNotification(id, enquiry);
    await database.query("UPDATE enquiries SET notification_status = 'sent' WHERE id = $1", [id]);
  } catch (error) {
    console.error("Enquiry notification error", { enquiryId: id, error });
    await database.query(
      "UPDATE enquiries SET notification_status = 'failed', notification_error = $2 WHERE id = $1",
      [id, error instanceof Error ? error.message.slice(0, 500) : "Unknown notification error"],
    );
  }

  return NextResponse.json(
    {
      accepted: true,
      id,
      message: "Thank you — your enquiry has been received. No date is reserved yet; the team will contact you to discuss availability.",
    },
    { status: 201 },
  );
}
