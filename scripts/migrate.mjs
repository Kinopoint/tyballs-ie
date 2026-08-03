import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run database migrations.");
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const migrationsDirectory = join(root, "db/migrations");
const migrations = (await readdir(migrationsDirectory)).filter((name) => name.endsWith(".sql")).sort();
const client = new pg.Client({ connectionString: databaseUrl });

await client.connect();
for (const migration of migrations) {
  const sql = await readFile(join(migrationsDirectory, migration), "utf8");
  await client.query(sql);
}
await client.end();

console.info(`Database migrations completed: ${migrations.join(", ")}`);
