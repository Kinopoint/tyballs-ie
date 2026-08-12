import "server-only";
import nodemailer from "nodemailer";
import type { EnquiryInput } from "@/lib/enquiry-schema";

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendEnquiryNotification(id: string, enquiry: EnquiryInput) {
  const port = Number(required("SMTP_PORT"));
  const secure = port === 465;
  const transporter = nodemailer.createTransport({
    host: required("SMTP_HOST"),
    port,
    secure,
    requireTLS: !secure && process.env.SMTP_REQUIRE_TLS !== "false",
    auth: {
      user: required("SMTP_USER"),
      pass: required("SMTP_PASSWORD"),
    },
  });

  const attendanceBands = { "50_80": "50–80", "80_120": "80–120", "120_150": "120–150", more_than_150: "More than 150" } as const;
  const referralSources = { previous_year: "Previous school year", friends_schools: "Friends / other schools", instagram: "Instagram", tiktok: "TikTok", google: "Google search", other: enquiry.referralOther } as const;
  const eventType = enquiry.enquiryType === "ty_ball" ? "TY Ball" : "Debs";
  const joiningSchools = enquiry.joiningSchools || "None specified";
  const message = enquiry.message || "No additional message";
  const contactName = `${enquiry.firstName} ${enquiry.lastName}`;
  const preferredDate = new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "long",
    timeZone: "Europe/Dublin",
    year: "numeric",
  }).format(new Date(`${enquiry.preferredDate}T12:00:00Z`));
  const replySubject = encodeURIComponent(`Re: TYBalls.ie enquiry — ${enquiry.school}`);
  const phoneHref = enquiry.phone.replace(/[^+\d]/g, "");

  await transporter.sendMail({
    from: required("SMTP_FROM"),
    to: process.env.ENQUIRY_NOTIFICATION_EMAIL || "info@debsguru.ie",
    replyTo: enquiry.email,
    subject: `New TYBalls.ie enquiry — ${enquiry.school}`,
    text: [
      `Enquiry ID: ${id}`,
      `School: ${enquiry.school}`,
      `School location: ${enquiry.schoolLocation}`,
      `Other joining schools: ${joiningSchools}`,
      `Contact: ${contactName}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone}`,
      `Enquiring for: ${eventType}`,
      `Preferred date: ${preferredDate}`,
      `Preferred event location: ${enquiry.preferredLocation}`,
      `People in school year: ${enquiry.yearSize}`,
      `Estimated total attendance: ${attendanceBands[enquiry.attendanceBand]}`,
      `How they heard about DebsGuru: ${referralSources[enquiry.referralSource]}`,
      `Message: ${message}`,
      "",
      "This is an enquiry only. No date has been reserved.",
    ].join("\n"),
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="color-scheme" content="dark">
    <style>
      @media only screen and (max-width:620px){.email-shell{width:100%!important}.email-pad{padding-left:22px!important;padding-right:22px!important}.summary-cell{display:block!important;width:100%!important;padding:0 0 12px!important}.detail-label{width:38%!important}.reply-button{display:block!important;text-align:center!important}}
    </style>
  </head>
  <body style="background:#080a14;margin:0;padding:0;-webkit-text-size-adjust:100%;">
    <div style="display:none;font-size:1px;color:#080a14;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">New booking enquiry from ${escapeHtml(enquiry.school)}.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#080a14;">
      <tr><td align="center" style="padding:28px 12px;">
        <table role="presentation" class="email-shell" width="620" cellspacing="0" cellpadding="0" border="0" style="background:#121522;border:1px solid #30354c;border-radius:18px;overflow:hidden;width:620px;max-width:100%;">
          <tr><td style="background:#171a2a;border-top:3px solid #ef3fb2;padding:25px 30px 22px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="color:#ffffff;font-family:Arial,sans-serif;font-size:24px;font-weight:700;letter-spacing:-.5px;">TY<span style="color:#ef3fb2;">Balls</span><span style="color:#6ed8ff;">.ie</span></td>
                <td align="right"><span style="background:#252942;border:1px solid #555c82;border-radius:999px;color:#c9ccef;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;padding:7px 10px;text-transform:uppercase;">New enquiry</span></td>
              </tr>
            </table>
          </td></tr>
          <tr><td class="email-pad" style="padding:34px 30px 28px;">
            <p style="color:#9c9fba;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.4px;margin:0 0 10px;text-transform:uppercase;">Booking enquiry form</p>
            <h1 style="color:#ffffff;font-family:Arial,sans-serif;font-size:30px;line-height:1.15;margin:0 0 10px;">${escapeHtml(enquiry.school)}</h1>
            <p style="color:#b8bbcf;font-family:Arial,sans-serif;font-size:15px;line-height:1.55;margin:0 0 26px;">A new ${escapeHtml(eventType)} enquiry is ready to review.</p>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
              <tr>
                <td class="summary-cell" width="33.33%" style="padding:0 8px 0 0;vertical-align:top;"><div style="background:#1b1f31;border:1px solid #343951;border-radius:12px;padding:14px;"><span style="color:#888da9;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Event</span><div style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:700;margin-top:6px;">${escapeHtml(eventType)}</div></div></td>
                <td class="summary-cell" width="33.33%" style="padding:0 4px;vertical-align:top;"><div style="background:#1b1f31;border:1px solid #343951;border-radius:12px;padding:14px;"><span style="color:#888da9;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Preferred date</span><div style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:700;margin-top:6px;">${escapeHtml(preferredDate)}</div></div></td>
                <td class="summary-cell" width="33.33%" style="padding:0 0 0 8px;vertical-align:top;"><div style="background:#1b1f31;border:1px solid #343951;border-radius:12px;padding:14px;"><span style="color:#888da9;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Attendance</span><div style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:700;margin-top:6px;">${escapeHtml(attendanceBands[enquiry.attendanceBand])}</div></div></td>
              </tr>
            </table>

            <h2 style="border-bottom:1px solid #30354b;color:#aeb3d4;font-family:Arial,sans-serif;font-size:12px;letter-spacing:1.2px;margin:0;padding:0 0 10px;text-transform:uppercase;">Contact</h2>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
              <tr><td class="detail-label" width="34%" style="color:#858aa5;font-family:Arial,sans-serif;font-size:13px;padding:12px 12px 5px 0;vertical-align:top;">Name</td><td style="color:#f4f4f8;font-family:Arial,sans-serif;font-size:14px;padding:12px 0 5px;">${escapeHtml(contactName)}</td></tr>
              <tr><td class="detail-label" style="color:#858aa5;font-family:Arial,sans-serif;font-size:13px;padding:5px 12px 5px 0;vertical-align:top;">Email</td><td style="font-family:Arial,sans-serif;font-size:14px;padding:5px 0;"><a href="mailto:${escapeHtml(enquiry.email)}" style="color:#6ed8ff;text-decoration:none;">${escapeHtml(enquiry.email)}</a></td></tr>
              <tr><td class="detail-label" style="color:#858aa5;font-family:Arial,sans-serif;font-size:13px;padding:5px 12px 12px 0;vertical-align:top;">Phone</td><td style="font-family:Arial,sans-serif;font-size:14px;padding:5px 0 12px;"><a href="tel:${escapeHtml(phoneHref)}" style="color:#6ed8ff;text-decoration:none;">${escapeHtml(enquiry.phone)}</a></td></tr>
            </table>

            <h2 style="border-bottom:1px solid #30354b;color:#aeb3d4;font-family:Arial,sans-serif;font-size:12px;letter-spacing:1.2px;margin:0;padding:0 0 10px;text-transform:uppercase;">School &amp; event</h2>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
              <tr><td class="detail-label" width="34%" style="color:#858aa5;font-family:Arial,sans-serif;font-size:13px;padding:12px 12px 5px 0;vertical-align:top;">School location</td><td style="color:#f4f4f8;font-family:Arial,sans-serif;font-size:14px;padding:12px 0 5px;">${escapeHtml(enquiry.schoolLocation)}</td></tr>
              <tr><td class="detail-label" style="color:#858aa5;font-family:Arial,sans-serif;font-size:13px;padding:5px 12px; padding-left:0;vertical-align:top;">Joining schools</td><td style="color:#f4f4f8;font-family:Arial,sans-serif;font-size:14px;padding:5px 0;">${escapeHtml(joiningSchools)}</td></tr>
              <tr><td class="detail-label" style="color:#858aa5;font-family:Arial,sans-serif;font-size:13px;padding:5px 12px 5px 0;vertical-align:top;">Preferred location</td><td style="color:#f4f4f8;font-family:Arial,sans-serif;font-size:14px;padding:5px 0;">${escapeHtml(enquiry.preferredLocation)}</td></tr>
              <tr><td class="detail-label" style="color:#858aa5;font-family:Arial,sans-serif;font-size:13px;padding:5px 12px 5px 0;vertical-align:top;">Students in year</td><td style="color:#f4f4f8;font-family:Arial,sans-serif;font-size:14px;padding:5px 0;">${enquiry.yearSize}</td></tr>
              <tr><td class="detail-label" style="color:#858aa5;font-family:Arial,sans-serif;font-size:13px;padding:5px 12px 12px 0;vertical-align:top;">Source</td><td style="color:#f4f4f8;font-family:Arial,sans-serif;font-size:14px;padding:5px 0 12px;">${escapeHtml(referralSources[enquiry.referralSource])}</td></tr>
            </table>

            <div style="background:#191d2d;border-left:3px solid #ef3fb2;border-radius:8px;padding:16px 18px;margin:0 0 25px;">
              <p style="color:#8f94af;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;margin:0 0 7px;text-transform:uppercase;">Committee message</p>
              <p style="color:#f1f1f6;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;margin:0;">${escapeHtml(message).replaceAll("\n", "<br>")}</p>
            </div>

            <a class="reply-button" href="mailto:${escapeHtml(enquiry.email)}?subject=${replySubject}" style="background:#ef3fb2;border-radius:10px;color:#ffffff;display:inline-block;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:13px 20px;text-decoration:none;">Reply to ${escapeHtml(enquiry.firstName)}</a>
          </td></tr>
          <tr><td class="email-pad" style="background:#0e111c;border-top:1px solid #292e43;padding:18px 30px;">
            <p style="color:#777d99;font-family:Arial,sans-serif;font-size:11px;line-height:1.5;margin:0 0 5px;">Enquiry ID: ${escapeHtml(id)}</p>
            <p style="color:#a2a6bd;font-family:Arial,sans-serif;font-size:12px;line-height:1.5;margin:0;"><strong style="color:#d6d8e3;">Enquiry only.</strong> No date or venue has been reserved.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`,
  });
}
