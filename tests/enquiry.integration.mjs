import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { SMTPServer } from "smtp-server";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const databaseName = `tyballs_test_${randomBytes(6).toString("hex")}`;
const admin = new pg.Client({ database: "postgres", host: "/tmp" });
const databaseUrl = `postgresql:///${databaseName}?host=%2Ftmp`;
const messages = [];
let app;
let smtp;
let db;
let appOutput = "";

function openPort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      server.close((error) => (error ? reject(error) : resolve(port)));
    });
  });
}

function waitForReady(child) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Next.js did not become ready in time.")), 20_000);
    const inspect = (chunk) => {
      const output = chunk.toString();
      if (output.includes("Ready")) {
        clearTimeout(timeout);
        resolve();
      }
    };
    child.stdout.on("data", inspect);
    child.stderr.on("data", inspect);
    child.once("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`Next.js exited before becoming ready (${code}).`));
    });
  });
}

await admin.connect();

try {
  await admin.query(`CREATE DATABASE ${databaseName}`);
  db = new pg.Client({ connectionString: databaseUrl });
  await db.connect();
  const migration = await readFile(join(root, "db/migrations/001_initial.sql"), "utf8");
  await db.query(migration);

  smtp = new SMTPServer({
    authOptional: true,
    disabledCommands: ["STARTTLS"],
    onAuth(_auth, _session, callback) {
      callback(null, { user: "integration" });
    },
    onData(stream, _session, callback) {
      let raw = "";
      stream.setEncoding("utf8");
      stream.on("data", (chunk) => { raw += chunk; });
      stream.on("end", () => { messages.push(raw); callback(); });
    },
  });
  const smtpPort = await openPort();
  await new Promise((resolve, reject) => {
    smtp.once("error", reject);
    smtp.listen(smtpPort, "127.0.0.1", resolve);
  });

  const appPort = await openPort();
  app = spawn(join(root, "node_modules/.bin/next"), ["start", "-p", String(appPort)], {
    cwd: root,
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      RATE_LIMIT_SALT: "integration-test-rate-limit-salt-with-sufficient-length",
      TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA",
      SMTP_HOST: "127.0.0.1",
      SMTP_PORT: String(smtpPort),
      SMTP_USER: "integration",
      SMTP_PASSWORD: "integration",
      SMTP_FROM: "TYBalls.ie <noreply@tyballs.ie>",
      ENQUIRY_NOTIFICATION_EMAIL: "info@debsguru.ie",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  app.stdout.on("data", (chunk) => { appOutput += chunk.toString(); });
  app.stderr.on("data", (chunk) => { appOutput += chunk.toString(); });
  await waitForReady(app);

  const endpoint = `http://127.0.0.1:${appPort}/api/enquiries`;
  const invalid = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.10" },
    body: JSON.stringify({ school: "" }),
  });
  assert.equal(invalid.status, 422);

  const payload = {
    school: "Integration Test School",
    county: "Kerry",
    contactName: "Test Committee Contact",
    email: "committee@example.ie",
    phone: "+353 87 123 4567",
    estimatedAttendance: 96,
    preferredDate: "2027-03-19",
    dateFlexibility: "same_week",
    priorities: ["venue", "dj"],
    message: "Integration test enquiry",
    privacyConsent: true,
    marketingConsent: false,
    turnstileToken: "XXXX.DUMMY.TOKEN.XXXX",
    landingPage: "https://tyballs.ie/enquire?utm_source=test",
    referrer: "https://example.ie/",
    utmSource: "test",
  };
  const accepted = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.10" },
    body: JSON.stringify(payload),
  });
  const acceptedBody = await accepted.json();
  assert.equal(accepted.status, 201, JSON.stringify(acceptedBody));
  assert.equal(acceptedBody.accepted, true);

  const stored = await db.query("SELECT school, estimated_attendance, notification_status, lead_status FROM enquiries");
  assert.equal(stored.rowCount, 1);
  assert.deepEqual(stored.rows[0], {
    school: "Integration Test School",
    estimated_attendance: 96,
    notification_status: "sent",
    lead_status: "new",
  });
  assert.equal(messages.length, 1);
  assert.match(messages[0], /New TYBalls\.ie enquiry/);
  assert.match(messages[0], /Integration Test School/);
  assert.match(messages[0], /No date has been reserved/);

  const duplicate = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.10" },
    body: JSON.stringify(payload),
  });
  assert.equal(duplicate.status, 200);
  const afterDuplicate = await db.query("SELECT count(*)::int AS count FROM enquiries");
  assert.equal(afterDuplicate.rows[0].count, 1);

  await db.end();
  db = undefined;
  console.info("Enquiry integration test passed with real PostgreSQL, HTTP, Turnstile test verification and SMTP delivery.");
} catch (error) {
  if (appOutput) console.error(appOutput);
  throw error;
} finally {
  if (app && app.exitCode === null) {
    app.kill("SIGTERM");
    await Promise.race([once(app, "exit"), new Promise((resolve) => setTimeout(resolve, 5_000))]);
  }
  if (db) await db.end();
  if (smtp) await new Promise((resolve) => smtp.close(resolve));
  await admin.query(`DROP DATABASE IF EXISTS ${databaseName}`);
  await admin.end();
}
