// Behind proxy.ts's protectRoute() only — any signed-in user can reach
// this, regardless of role. AdminOnly below hides one element for admins
// specifically, without gating the whole page.
"use client";

import { useState } from "react";
import { AdminOnly } from "../components/AdminOnly";
import { fetchAccessToken } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function deleteUser() {
  alert("Pretend a user just got deleted.");
}

// Attaches the real access token to a request to our Express backend.
// The token comes from a server action (fetchAccessToken) since
// app-native's server-managed session never exposes it to client code.
function useProtectedFetch() {
  return async (url: string) => {
    const token = await fetchAccessToken();
    if (!token) {
      throw new Error("No access token — not signed in.");
    }
    return fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  };
}

function AdminStatsDemo() {
  const protectedFetch = useProtectedFetch();
  const [status, setStatus] = useState<number | null>(null);
  const [body, setBody] = useState<unknown>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const callAdminStats = async () => {
    setNetworkError(null);
    try {
      // Requires the Express server in /server running on :3001.
      const res = await protectedFetch("http://localhost:3001/api/admin/stats");
      setStatus(res.status);
      setBody(await res.json().catch(() => null));
    } catch {
      setStatus(null);
      setBody(null);
      setNetworkError(
        "Couldn't reach the backend. Is the Express server in /server running on :3001?",
      );
    }
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <Button onClick={callAdminStats} className="self-start">
          Call /api/admin/stats
        </Button>
        {networkError && <p className="text-sm text-destructive">{networkError}</p>}
        {status !== null && (
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
            {status} {JSON.stringify(body, null, 2)}
          </pre>
        )}
        <p className="text-sm text-muted-foreground">
          Try this signed out (401), signed in as a non-admin (403), and signed
          in as an admin (200) — three real responses, not just described.
        </p>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Every signed-in user can see this page.</p>
      </div>

      {/* Same "roles" check as RequireRole, applied inline instead of gating the whole page. */}
      <AdminOnly>
        <Button onClick={deleteUser} variant="destructive" className="self-start">
          Delete user
        </Button>
      </AdminOnly>

      <AdminStatsDemo />
    </div>
  );
}
