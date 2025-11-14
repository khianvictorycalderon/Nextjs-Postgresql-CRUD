import { NextResponse } from "next/server";
import dev from "./dev-log";

export default function handleError(err: unknown, contextMessage = "An error occurred") {
  const message = err instanceof Error ? err.message : String(err);
  dev.log(`${contextMessage}: ${message}`);

  return NextResponse.json(
    { message: `${contextMessage}: ${message}` },
    { status: 500 }
  );
}