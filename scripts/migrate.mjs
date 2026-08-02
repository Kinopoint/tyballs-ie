import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run database migrations.");
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sql = await readFile(join(root, "db/migrations/001_initial.sql"), "utf8");
const client = new pg.Client({ connectionString: databaseUrl });

await client.connect();
await client.query(sql);
await client.end();

console.info("Database migration completed.");
