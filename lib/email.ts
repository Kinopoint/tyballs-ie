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

  const priorities = enquiry.priorities.length ? enquiry.priorities.join(", ") : "Not specified";
  const date = enquiry.preferredDate || "Not specified";
  const message = enquiry.message || "No additional message";

  await transporter.sendMail({
    from: required("SMTP_FROM"),
    to: process.env.ENQUIRY_NOTIFICATION_EMAIL || "info@debsguru.ie",
    replyTo: enquiry.email,
    subject: `New TYBalls.ie enquiry — ${enquiry.school}`,
    text: [
      `Enquiry ID: ${id}`,
      `School: ${enquiry.school}`,
      `County: ${enquiry.county}`,
      `Contact: ${enquiry.contactName}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone}`,
      `Estimated attendance: ${enquiry.estimatedAttendance}`,
      `Preferred date: ${date}`,
      `Date flexibility: ${enquiry.dateFlexibility}`,
      `Priorities: ${priorities}`,
      `Message: ${message}`,
      "",
      "This is an enquiry only. No date has been reserved.",
    ].join("\n"),
    html: `
      <h1>New TYBalls.ie enquiry</h1>
      <p><strong>Enquiry ID:</strong> ${escapeHtml(id)}</p>
      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#dddddd">
        <tr><td><strong>School</strong></td><td>${escapeHtml(enquiry.school)}</td></tr>
        <tr><td><strong>County</strong></td><td>${escapeHtml(enquiry.county)}</td></tr>
        <tr><td><strong>Contact</strong></td><td>${escapeHtml(enquiry.contactName)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(enquiry.email)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(enquiry.phone)}</td></tr>
        <tr><td><strong>Estimated attendance</strong></td><td>${enquiry.estimatedAttendance}</td></tr>
        <tr><td><strong>Preferred date</strong></td><td>${escapeHtml(date)}</td></tr>
        <tr><td><strong>Date flexibility</strong></td><td>${escapeHtml(enquiry.dateFlexibility)}</td></tr>
        <tr><td><strong>Priorities</strong></td><td>${escapeHtml(priorities)}</td></tr>
        <tr><td><strong>Message</strong></td><td>${escapeHtml(message).replaceAll("\n", "<br>")}</td></tr>
      </table>
      <p><strong>This is an enquiry only. No date has been reserved.</strong></p>
    `,
  });
}
