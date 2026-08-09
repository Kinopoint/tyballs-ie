import pg from "pg";

function positiveInteger(name, fallback) {
  const value = Number(process.env[name] || fallback);
  if (!Number.isInteger(value) || value < 1) throw new Error(`${name} must be a positive integer.`);
  return value;
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required for retention cleanup.");

const enquiryMonths = positiveInteger("ENQUIRY_RETENTION_MONTHS", 18);
const windowHours = positiveInteger("SUBMISSION_WINDOW_RETENTION_HOURS", 48);
const intervalSeconds = positiveInteger("RETENTION_INTERVAL_SECONDS", 86_400);
const runOnce = process.argv.includes("--once");
const controller = new AbortController();

process.once("SIGINT", () => controller.abort());
process.once("SIGTERM", () => controller.abort());

function wait(milliseconds) {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, milliseconds);
    controller.signal.addEventListener("abort", () => {
      clearTimeout(timer);
      resolve();
    }, { once: true });
  });
}

async function cleanup(database) {
  const result = await database.query(
    `WITH deleted_enquiries AS (
       DELETE FROM enquiries
       WHERE lead_status <> 'booked'
         AND last_activity_at < now() - make_interval(months => $1::int)
       RETURNING 1
     ), deleted_windows AS (
       DELETE FROM submission_windows
       WHERE window_started_at < now() - make_interval(hours => $2::int)
       RETURNING 1
     )
     SELECT
       (SELECT count(*)::int FROM deleted_enquiries) AS enquiries,
       (SELECT count(*)::int FROM deleted_windows) AS submission_windows`,
    [enquiryMonths, windowHours],
  );

  console.info(JSON.stringify({
    event: "retention_cleanup",
    deleted: result.rows[0],
    enquiryMonths,
    windowHours,
    completedAt: new Date().toISOString(),
  }));
}

const database = new pg.Pool({ connectionString: databaseUrl, max: 2 });

do {
  await cleanup(database);
  if (runOnce) break;
  await wait(intervalSeconds * 1000);
} while (!controller.signal.aborted);

await database.end();
