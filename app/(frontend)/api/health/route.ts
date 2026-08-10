import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/database";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const database = getDatabase();

  try {
    await database.query("SELECT 1");
    return NextResponse.json(
      { status: "ok", checkedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Health check database error", error);
    return NextResponse.json(
      { status: "unavailable", checkedAt: new Date().toISOString() },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
