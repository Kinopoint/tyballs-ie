import "server-only";
import { Pool } from "pg";

declare global {
  var tyBallsPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });
}

export function getDatabase() {
  const pool = globalThis.tyBallsPool ?? createPool();

  if (process.env.NODE_ENV !== "production") {
    globalThis.tyBallsPool = pool;
  }

  return pool;
}
