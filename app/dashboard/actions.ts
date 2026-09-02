// The access token lives server-side only, never exposed to client JS.
// A Client Component that needs it for a fetch call has to go through a
// server action like this one.
"use server";

import { asgardeo } from "@asgardeo/nextjs/server";

export async function fetchAccessToken() {
  const { getSessionId, getAccessToken } = await asgardeo();
  const sessionId = await getSessionId();

  if (!sessionId) {
    return undefined;
  }

  return getAccessToken(sessionId);
}
