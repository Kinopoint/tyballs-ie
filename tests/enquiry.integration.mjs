import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { cp, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { SMTPServer } from "smtp-server";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const databaseName = `tyballs_test_${randomBytes(6).toString("hex")}`;
const restoreDatabaseName = `${databaseName}_restore`;
const upgradeDatabaseName = `${databaseName}_upgrade`;
const admin = new pg.Client({ database: "postgres", host: "/tmp" });
const databaseUrl = `postgresql:///${databaseName}?host=%2Ftmp`;
const messages = [];
let app;
let smtp;
let db;
let restoredDb;
let upgradeDb;
let appOutput = "";
let backupDirectory;
let mediaDirectory;

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

async function stopApp(child) {
  if (!child || child.exitCode !== null) return;
  child.kill("SIGTERM");
  const exited = await Promise.race([
    once(child, "exit").then(() => true),
    new Promise((resolve) => setTimeout(() => resolve(false), 5_000)),
  ]);
  if (!exited && child.exitCode === null) {
    child.kill("SIGKILL");
    await once(child, "exit");
  }
}

function runCommand(command, args, environment) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, env: environment, stdio: ["ignore", "pipe", "pipe"] });
    let output = "";
    child.stdout.on("data", (chunk) => { output += chunk.toString(); });
    child.stderr.on("data", (chunk) => { output += chunk.toString(); });
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? resolve(output) : reject(new Error(`${command} exited with ${code}: ${output}`)));
  });
}

await admin.connect();

try {
  await cp(join(root, "public"), join(root, ".next/standalone/public"), { recursive: true, force: true });
  await cp(join(root, ".next/static"), join(root, ".next/standalone/.next/static"), { recursive: true, force: true });

  await admin.query(`CREATE DATABASE ${databaseName}`);
  db = new pg.Client({ connectionString: databaseUrl });
  await db.connect();
  const migrationDirectory = join(root, "db/migrations");
  const migrationFiles = (await readdir(migrationDirectory)).filter((file) => file.endsWith(".sql")).sort();
  for (const migrationFile of migrationFiles) {
    await db.query(await readFile(join(migrationDirectory, migrationFile), "utf8"));
  }

  await admin.query(`CREATE DATABASE ${upgradeDatabaseName}`);
  upgradeDb = new pg.Client({ connectionString: `postgresql:///${upgradeDatabaseName}?host=%2Ftmp` });
  await upgradeDb.connect();
  await upgradeDb.query(`
    CREATE TABLE enquiries (
      created_at timestamptz NOT NULL DEFAULT now(),
      privacy_consent_at timestamptz NOT NULL,
      lead_status text NOT NULL DEFAULT 'new'
    );
    INSERT INTO enquiries (created_at, privacy_consent_at)
    VALUES (now() - interval '3 days', now() - interval '3 days');
  `);
  await upgradeDb.query(await readFile(join(migrationDirectory, "003_retention.sql"), "utf8"));
  const upgraded = await upgradeDb.query(`
    SELECT privacy_notice_acknowledged_at IS NOT NULL AS acknowledged,
           last_activity_at = created_at AS activity_backfilled
    FROM enquiries
  `);
  assert.deepEqual(upgraded.rows[0], { acknowledged: true, activity_backfilled: true });
  await upgradeDb.end();
  upgradeDb = undefined;
  await admin.query(`DROP DATABASE ${upgradeDatabaseName}`);

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
  mediaDirectory = await mkdtemp(join(tmpdir(), "tyballs-media-"));
  const commonAppEnvironment = {
    ...process.env,
    DATABASE_URL: databaseUrl,
    PAYLOAD_SECRET: "integration-payload-secret-with-sufficient-length",
    PREVIEW_SECRET: "integration-preview-secret-with-sufficient-length",
    CMS_MEDIA_DIRECTORY: mediaDirectory,
    RATE_LIMIT_SALT: "integration-test-rate-limit-salt-with-sufficient-length",
    TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA",
    SMTP_HOST: "127.0.0.1",
    SMTP_PORT: String(smtpPort),
    SMTP_USER: "integration",
    SMTP_PASSWORD: "integration",
    SMTP_FROM: "TYBalls.ie <noreply@tyballs.ie>",
    SMTP_REQUIRE_TLS: "false",
    ENQUIRY_NOTIFICATION_EMAIL: "info@debsguru.ie",
    HOSTNAME: "127.0.0.1",
  };
  app = spawn(process.execPath, [join(root, ".next/standalone/server.js")], {
    cwd: root,
    env: {
      ...commonAppEnvironment,
      NEXT_PUBLIC_SERVER_URL: `http://127.0.0.1:${appPort}`,
      TURNSTILE_ENABLED: "true",
      NEXT_PUBLIC_TURNSTILE_ENABLED: "true",
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
      SMTP_ENABLED: "true",
      PORT: String(appPort),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  app.stdout.on("data", (chunk) => { appOutput += chunk.toString(); });
  app.stderr.on("data", (chunk) => { appOutput += chunk.toString(); });
  await waitForReady(app);

  const health = await fetch(`http://127.0.0.1:${appPort}/api/health`);
  assert.equal(health.status, 200);
  const healthBody = await health.json();
  assert.equal(healthBody.status, "ok");
  assert.ok(Number.isFinite(Date.parse(healthBody.checkedAt)));

  const home = await fetch(`http://127.0.0.1:${appPort}/`);
  assert.equal(home.status, 200);
  const homeHtml = await home.text();
  assert.doesNotMatch(homeHtml, /noindex/i);
  assert.match(homeHtml, /<link[^>]*rel="canonical"[^>]*href="https:\/\/tyballs\.ie\/?"/i);

  const robots = await fetch(`http://127.0.0.1:${appPort}/robots.txt`);
  assert.equal(robots.status, 200);
  const robotsBody = await robots.text();
  assert.match(robotsBody, /^Sitemap:\s*https:\/\/tyballs\.ie\/sitemap\.xml\s*$/im);

  const sitemap = await fetch(`http://127.0.0.1:${appPort}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get("content-type") || "", /xml/i);
  const sitemapBody = await sitemap.text();
  assert.match(sitemapBody, /<loc>https:\/\/tyballs\.ie\/<\/loc>/);
  assert.doesNotMatch(sitemapBody, /https:\/\/tyballs\.ie\/tyballs-ie\//);

  const llms = await fetch(`http://127.0.0.1:${appPort}/llms.txt`);
  assert.equal(llms.status, 200);
  assert.match(llms.headers.get("content-type") || "", /text\/plain/i);
  assert.match(await llms.text(), /TYBalls\.ie/);

  const ogImage = await fetch(`http://127.0.0.1:${appPort}/og/home.jpg`);
  assert.equal(ogImage.status, 200);
  assert.match(ogImage.headers.get("content-type") || "", /image\/jpeg/i);
  assert.ok((await ogImage.arrayBuffer()).byteLength > 1_024);

  const missingPage = await fetch(`http://127.0.0.1:${appPort}/integration-route-that-must-not-exist-${databaseName}`);
  assert.equal(missingPage.status, 404);

  const adminPage = await fetch(`http://127.0.0.1:${appPort}/admin`);
  assert.equal(adminPage.status, 200);
  const protectedEnquiries = await fetch(`http://127.0.0.1:${appPort}/cms-api/enquiries`);
  assert.ok([401, 403].includes(protectedEnquiries.status));
  const formGet = await fetch(`http://127.0.0.1:${appPort}/api/enquiries`);
  assert.equal(formGet.status, 405);

  const endpoint = `http://127.0.0.1:${appPort}/api/enquiries`;
  const invalid = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.10" },
    body: JSON.stringify({ school: "" }),
  });
  assert.equal(invalid.status, 422);
  const invalidBody = await invalid.json();
  assert.ok(invalidBody.fields.yearSize);

  const payload = {
    firstName: "Test",
    lastName: "Committee Contact",
    school: "Integration Test School",
    schoolLocation: "Kerry",
    joiningSchools: "Partner School",
    email: "committee@example.ie",
    phone: "+353 87 123 4567",
    enquiryType: "ty_ball",
    preferredDate: "2027-03-19",
    preferredLocation: "Killarney",
    yearSize: 120,
    attendanceBand: "80_120",
    referralSource: "friends_schools",
    referralOther: "",
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

  const stored = await db.query("SELECT school, county, first_name, last_name, event_type, year_size, estimated_attendance, attendance_band, preferred_location, referral_source, joining_schools, notification_status, lead_status, privacy_notice_acknowledged_at IS NOT NULL AS privacy_notice_acknowledged FROM enquiries");
  assert.equal(stored.rowCount, 1);
  assert.deepEqual(stored.rows[0], {
    school: "Integration Test School",
    county: "Kerry",
    first_name: "Test",
    last_name: "Committee Contact",
    event_type: "ty_ball",
    year_size: 120,
    estimated_attendance: 100,
    attendance_band: "80_120",
    preferred_location: "Killarney",
    referral_source: "friends_schools",
    joining_schools: "Partner School",
    notification_status: "sent",
    lead_status: "new",
    privacy_notice_acknowledged: true,
  });
  const cmsStored = await db.query("SELECT school, county, status, contact_email, notification_status FROM cms.enquiries WHERE id = $1", [acceptedBody.id]);
  assert.equal(cmsStored.rowCount, 1);
  assert.deepEqual(cmsStored.rows[0], {
    school: "Integration Test School",
    county: "Kerry",
    status: "new",
    contact_email: "committee@example.ie",
    notification_status: "sent",
  });
  assert.equal(messages.length, 1);
  const deliveredMessage = messages[0].replace(/=\r\n/g, "");
  assert.match(deliveredMessage, /New TYBalls\.ie enquiry/);
  assert.match(deliveredMessage, /Integration Test School/);
  assert.match(deliveredMessage, /Partner School/);
  assert.match(deliveredMessage, /Estimated total attendance: 80=E2=80=93120/);
  assert.match(deliveredMessage, /No date has been reserved/);

  const duplicate = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.10" },
    body: JSON.stringify(payload),
  });
  assert.equal(duplicate.status, 200);
  const afterDuplicate = await db.query("SELECT count(*)::int AS count FROM enquiries");
  assert.equal(afterDuplicate.rows[0].count, 1);
  const cmsAfterDuplicate = await db.query("SELECT count(*)::int AS count FROM cms.enquiries");
  assert.equal(cmsAfterDuplicate.rows[0].count, 1);

  backupDirectory = await mkdtemp(join(tmpdir(), "tyballs-backup-"));
  await writeFile(join(mediaDirectory, "integration-media.txt"), "real media backup integration check\n", "utf8");
  await runCommand("sh", [join(root, "scripts/backup.sh"), "--once"], {
    ...process.env,
    DATABASE_URL: databaseUrl,
    BACKUP_DIRECTORY: backupDirectory,
    BACKUP_RETENTION_DAYS: "30",
    CMS_MEDIA_DIRECTORY: mediaDirectory,
  });
  const backupFiles = (await readdir(backupDirectory)).filter((file) => file.endsWith(".dump"));
  assert.equal(backupFiles.length, 1);
  const mediaBackupFiles = (await readdir(backupDirectory)).filter((file) => file.endsWith(".tar.gz"));
  assert.equal(mediaBackupFiles.length, 1);
  await admin.query(`CREATE DATABASE ${restoreDatabaseName}`);
  const restoreDatabaseUrl = `postgresql:///${restoreDatabaseName}?host=%2Ftmp`;
  await runCommand("pg_restore", ["--no-owner", "--no-privileges", `--dbname=${restoreDatabaseUrl}`, join(backupDirectory, backupFiles[0])], process.env);
  restoredDb = new pg.Client({ connectionString: restoreDatabaseUrl });
  await restoredDb.connect();
  const restored = await restoredDb.query("SELECT count(*)::int AS count FROM enquiries");
  assert.equal(restored.rows[0].count, 1);
  const restoredCms = await restoredDb.query("SELECT count(*)::int AS count FROM cms.enquiries");
  assert.equal(restoredCms.rows[0].count, 1);
  await restoredDb.end();
  restoredDb = undefined;
  await admin.query(`DROP DATABASE ${restoreDatabaseName}`);

  await db.query("UPDATE enquiries SET last_activity_at = now() - interval '19 months' WHERE id = $1", [acceptedBody.id]);
  await db.query("UPDATE cms.enquiries SET created_at = now() - interval '19 months' WHERE id = $1", [acceptedBody.id]);
  await db.query("INSERT INTO submission_windows (request_hash, window_started_at, submissions) VALUES ('expired-window', now() - interval '72 hours', 1)");
  const retentionOutput = await runCommand(process.execPath, [join(root, "scripts/retention.mjs"), "--once"], {
    ...process.env,
    DATABASE_URL: databaseUrl,
    ENQUIRY_RETENTION_MONTHS: "18",
    SUBMISSION_WINDOW_RETENTION_HOURS: "48",
  });
  assert.match(retentionOutput, /"enquiries":1/);
  assert.match(retentionOutput, /"submission_windows":1/);
  const afterRetention = await db.query("SELECT count(*)::int AS count FROM enquiries");
  assert.equal(afterRetention.rows[0].count, 0);
  const cmsAfterRetention = await db.query("SELECT count(*)::int AS count FROM cms.enquiries");
  assert.equal(cmsAfterRetention.rows[0].count, 0);

  await stopApp(app);
  app = undefined;
  appOutput = "";

  const dataCapturePort = await openPort();
  app = spawn(process.execPath, [join(root, ".next/standalone/server.js")], {
    cwd: root,
    env: {
      ...commonAppEnvironment,
      NEXT_PUBLIC_SERVER_URL: `http://127.0.0.1:${dataCapturePort}`,
      TURNSTILE_ENABLED: "false",
      NEXT_PUBLIC_TURNSTILE_ENABLED: "false",
      SMTP_ENABLED: "false",
      PORT: String(dataCapturePort),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  app.stdout.on("data", (chunk) => { appOutput += chunk.toString(); });
  app.stderr.on("data", (chunk) => { appOutput += chunk.toString(); });
  await waitForReady(app);

  const dataCaptureEndpoint = `http://127.0.0.1:${dataCapturePort}/api/enquiries`;
  const smtpMessagesBeforeDataCapture = messages.length;
  const dataCapturePayload = {
    ...payload,
    school: "Data Capture Mode School",
    email: "data-capture@example.ie",
    turnstileToken: "",
    message: "Integration test enquiry without external integrations",
  };
  const dataCaptureAccepted = await fetch(dataCaptureEndpoint, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.20" },
    body: JSON.stringify(dataCapturePayload),
  });
  const dataCaptureBody = await dataCaptureAccepted.json();
  assert.equal(dataCaptureAccepted.status, 201, JSON.stringify(dataCaptureBody));
  assert.equal(dataCaptureBody.accepted, true);

  const dataCaptureStored = await db.query(
    "SELECT school, email, notification_status, lead_status FROM enquiries WHERE id = $1",
    [dataCaptureBody.id],
  );
  assert.equal(dataCaptureStored.rowCount, 1);
  assert.deepEqual(dataCaptureStored.rows[0], {
    school: "Data Capture Mode School",
    email: "data-capture@example.ie",
    notification_status: "pending",
    lead_status: "new",
  });
  const dataCaptureCmsStored = await db.query(
    "SELECT school, contact_email, notification_status, status FROM cms.enquiries WHERE id = $1",
    [dataCaptureBody.id],
  );
  assert.equal(dataCaptureCmsStored.rowCount, 1);
  assert.deepEqual(dataCaptureCmsStored.rows[0], {
    school: "Data Capture Mode School",
    contact_email: "data-capture@example.ie",
    notification_status: "pending",
    status: "new",
  });
  assert.equal(messages.length, smtpMessagesBeforeDataCapture);
  assert.doesNotMatch(appOutput, /Error verifying Nodemailer transport/);

  await db.end();
  db = undefined;
  console.info("Enquiry integration test passed with real PostgreSQL, SEO routes, enabled Turnstile/SMTP delivery, disabled data-capture persistence, backup/restore and retention cleanup.");
} catch (error) {
  if (appOutput) console.error(appOutput);
  throw error;
} finally {
  await stopApp(app);
  if (db) await db.end();
  if (restoredDb) await restoredDb.end();
  if (upgradeDb) await upgradeDb.end();
  if (smtp) await new Promise((resolve) => smtp.close(resolve));
  await admin.query(`DROP DATABASE IF EXISTS ${restoreDatabaseName}`);
  await admin.query(`DROP DATABASE IF EXISTS ${upgradeDatabaseName}`);
  await admin.query(`DROP DATABASE IF EXISTS ${databaseName}`);
  await admin.end();
  if (backupDirectory) await rm(backupDirectory, { recursive: true, force: true });
  if (mediaDirectory) await rm(mediaDirectory, { recursive: true, force: true });
}
