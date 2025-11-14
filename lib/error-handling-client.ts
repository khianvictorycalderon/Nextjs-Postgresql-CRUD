'use client'
export default function handleClientError(err: unknown, contextMessage = "An error occurred") {
  const message = err instanceof Error ? err.message : String(err);

  // Alert the user
  alert(`${contextMessage}: ${message}`);
}