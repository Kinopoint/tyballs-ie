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
  const transporter = nodemailer.createTransport({
    host: required("SMTP_HOST"),
    port,
    secure: port === 465,
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
      `Contact: ${enquiry.firstName} ${enquiry.lastName}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone}`,
      `Enquiring for: ${eventType}`,
      `Preferred date: ${enquiry.preferredDate}`,
      `Preferred event location: ${enquiry.preferredLocation}`,
      `People in school year: ${enquiry.yearSize}`,
      `Estimated total attendance: ${attendanceBands[enquiry.attendanceBand]}`,
      `How they heard about DebsGuru: ${referralSources[enquiry.referralSource]}`,
      `Message: ${message}`,
      "",
      "This is an enquiry only. No date has been reserved.",
    ].join("\n"),
    html: `
      <h1>New TYBalls.ie enquiry</h1>
      <p><strong>Enquiry ID:</strong> ${escapeHtml(id)}</p>
      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#dddddd">
        <tr><td><strong>School</strong></td><td>${escapeHtml(enquiry.school)}</td></tr>
        <tr><td><strong>School location</strong></td><td>${escapeHtml(enquiry.schoolLocation)}</td></tr>
        <tr><td><strong>Other joining schools</strong></td><td>${escapeHtml(joiningSchools)}</td></tr>
        <tr><td><strong>Contact</strong></td><td>${escapeHtml(`${enquiry.firstName} ${enquiry.lastName}`)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(enquiry.email)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(enquiry.phone)}</td></tr>
        <tr><td><strong>Enquiring for</strong></td><td>${escapeHtml(eventType)}</td></tr>
        <tr><td><strong>Preferred date</strong></td><td>${escapeHtml(enquiry.preferredDate)}</td></tr>
        <tr><td><strong>Preferred event location</strong></td><td>${escapeHtml(enquiry.preferredLocation)}</td></tr>
        <tr><td><strong>People in school year</strong></td><td>${enquiry.yearSize}</td></tr>
        <tr><td><strong>Estimated total attendance</strong></td><td>${escapeHtml(attendanceBands[enquiry.attendanceBand])}</td></tr>
        <tr><td><strong>How they heard about DebsGuru</strong></td><td>${escapeHtml(referralSources[enquiry.referralSource])}</td></tr>
        <tr><td><strong>Message</strong></td><td>${escapeHtml(message).replaceAll("\n", "<br>")}</td></tr>
      </table>
      <p><strong>This is an enquiry only. No date has been reserved.</strong></p>
    `,
  });
}
