import path from "node:path";

const placeholderFragments = ["change-this", "use-the-", "replace-me", "example.com", "xxxxxxx"];

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  if (placeholderFragments.some((fragment) => value.toLowerCase().includes(fragment))) {
    throw new Error(`${name} still contains a placeholder value.`);
  }
  return value;
}

function positiveInteger(name, fallback) {
  const value = Number(process.env[name] || fallback);
  if (!Number.isInteger(value) || value < 1) throw new Error(`${name} must be a positive integer.`);
  return value;
}

function booleanFlag(name) {
  const value = required(name);
  if (value !== "true" && value !== "false") throw new Error(`${name} must be true or false.`);
  return value === "true";
}

const databaseUrl = new URL(required("DATABASE_URL"));
if (!databaseUrl.protocol.startsWith("postgres")) throw new Error("DATABASE_URL must use PostgreSQL.");

if (required("RATE_LIMIT_SALT").length < 32) throw new Error("RATE_LIMIT_SALT must contain at least 32 characters.");
if (required("PAYLOAD_SECRET").length < 32) throw new Error("PAYLOAD_SECRET must contain at least 32 characters.");
if (required("PREVIEW_SECRET").length < 32) throw new Error("PREVIEW_SECRET must contain at least 32 characters.");
const serverUrl = new URL(required("NEXT_PUBLIC_SERVER_URL"));
if (serverUrl.protocol !== "https:" && serverUrl.protocol !== "http:") throw new Error("NEXT_PUBLIC_SERVER_URL must use HTTP or HTTPS.");
if (!path.isAbsolute(required("CMS_MEDIA_DIRECTORY"))) throw new Error("CMS_MEDIA_DIRECTORY must be an absolute path.");
const turnstileEnabled = booleanFlag("TURNSTILE_ENABLED");
const publicTurnstileEnabled = booleanFlag("NEXT_PUBLIC_TURNSTILE_ENABLED");
if (turnstileEnabled !== publicTurnstileEnabled) {
  throw new Error("TURNSTILE_ENABLED and NEXT_PUBLIC_TURNSTILE_ENABLED must match.");
}
if (turnstileEnabled) {
  if (required("TURNSTILE_SECRET_KEY").length < 20) throw new Error("TURNSTILE_SECRET_KEY is not valid.");
  if (required("NEXT_PUBLIC_TURNSTILE_SITE_KEY").length < 20) throw new Error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not valid.");
}

if (booleanFlag("SMTP_ENABLED")) {
  const smtpPort = positiveInteger("SMTP_PORT", 587);
  if (smtpPort > 65_535) throw new Error("SMTP_PORT is outside the valid port range.");
  required("SMTP_HOST");
  required("SMTP_USER");
  required("SMTP_PASSWORD");
  if (!required("SMTP_FROM").includes("@")) throw new Error("SMTP_FROM must contain an email address.");
  if (!required("ENQUIRY_NOTIFICATION_EMAIL").includes("@")) throw new Error("ENQUIRY_NOTIFICATION_EMAIL must be an email address.");

  const requireTls = required("SMTP_REQUIRE_TLS");
  if (requireTls !== "true" && requireTls !== "false") throw new Error("SMTP_REQUIRE_TLS must be true or false.");
  if (smtpPort !== 465 && requireTls !== "true") throw new Error("SMTP_REQUIRE_TLS must be true unless SMTP uses implicit TLS on port 465.");
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
if (gtmId && !/^GTM-[A-Z0-9]+$/.test(gtmId)) throw new Error("NEXT_PUBLIC_GTM_ID must use the GTM-XXXX format.");
if (gtmId && /^GTM-X+$/.test(gtmId)) throw new Error("NEXT_PUBLIC_GTM_ID still contains a placeholder value.");

positiveInteger("ENQUIRY_RETENTION_MONTHS", 18);
positiveInteger("SUBMISSION_WINDOW_RETENTION_HOURS", 48);
positiveInteger("RETENTION_INTERVAL_SECONDS", 86_400);
positiveInteger("BACKUP_RETENTION_DAYS", 30);
positiveInteger("BACKUP_INTERVAL_SECONDS", 86_400);

console.info("Production environment validation passed.");
