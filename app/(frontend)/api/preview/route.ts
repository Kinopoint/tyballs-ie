import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const allowedPaths = /^\/(?:$|how-it-works$|what-is-a-ty-ball$|cost-guide$|parents-schools$|for-committees$|enquire$|events\/[a-z0-9-]+$|venues\/[a-z0-9-]+$)/;

function secretsMatch(received: string, expected: string) {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "";
  const receivedSecret = request.nextUrl.searchParams.get("secret") || "";
  const expectedSecret = process.env.PREVIEW_SECRET || "";

  if (!expectedSecret || !secretsMatch(receivedSecret, expectedSecret) || !allowedPaths.test(path)) {
    return NextResponse.json({ error: "Invalid preview request." }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();
  return NextResponse.redirect(new URL(path, request.nextUrl.origin));
}

export async function DELETE() {
  const draft = await draftMode();
  draft.disable();
  return NextResponse.json({ preview: false });
}
