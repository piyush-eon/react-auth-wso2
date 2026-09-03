// The frontend's protectRoute()/RequireRole gate what RENDERS, not
// security — a request could still hit this API directly. WSO2 access
// tokens are opaque, so verification means asking the provider via OAuth
// 2.0 Token Introspection (RFC 7662), not verifying a signature locally.
const baseUrl = process.env.NEXT_PUBLIC_ASGARDEO_BASE_URL;
const clientId = process.env.NEXT_PUBLIC_ASGARDEO_CLIENT_ID; // not secret, just not bundled here
const clientSecret = process.env.ASGARDEO_CLIENT_SECRET;

let discoveryPromise: Promise<{ introspection_endpoint: string; userinfo_endpoint: string }> | null = null;

function getDiscovery() {
  discoveryPromise ??= fetch(`${baseUrl}/oauth2/token/.well-known/openid-configuration`).then((res) =>
    res.json(),
  );
  return discoveryPromise;
}

const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  if (!token) return null;

  try {
    const discovery = await getDiscovery();

    const introspectResponse = await fetch(discovery.introspection_endpoint, {
      body: new URLSearchParams({ token }),
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
    const introspection = await introspectResponse.json();

    if (!introspection.active) return null;

    // Introspection confirms validity and authorization context (scope,
    // client, expiry). User profile claims like roles/groups live on the
    // userinfo endpoint instead — the standard OIDC split — called here
    // with the caller's own token per RFC 6750.
    const userinfoResponse = await fetch(discovery.userinfo_endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userinfo = await userinfoResponse.json().catch(() => ({}));

    return { ...introspection, ...userinfo }; // roles/groups (if requested) come from userinfo, not introspection
  } catch {
    return null;
  }
}
