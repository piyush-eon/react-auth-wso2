// UserProfile is a full editable panel, persisted back through SCIM2
// automatically — no form-handling code of your own.
"use client";

import { useEffect, useState } from "react";
import { SignedIn, UserProfile, useAsgardeo } from "@asgardeo/nextjs";

// Calls WSO2's SCIM2 /scim2/Me endpoint directly — http attaches the
// bearer token automatically, no Authorization header written by hand.
function ScimProfile() {
  const { http, isSignedIn } = useAsgardeo();
  const [userData, setUserData] = useState<unknown>(null);

  useEffect(() => {
    if (!isSignedIn || !http) return;

    (async () => {
      try {
        const response = await http.request({
          url: `${process.env.NEXT_PUBLIC_ASGARDEO_BASE_URL}/scim2/Me`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/scim+json",
          },
          method: "GET",
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    })();
  }, [http, isSignedIn]);

  return (
    <details className="rounded-lg border p-3">
      <summary className="cursor-pointer text-sm text-muted-foreground">
        Raw SCIM2 /scim2/Me response
      </summary>
      <pre className="mt-2 overflow-x-auto text-xs">
        {userData ? JSON.stringify(userData, null, 2) : "Loading…"}
      </pre>
    </details>
  );
}

// http.requestAll fires multiple requests together and resolves once
// every response is back, instead of awaiting them one at a time.
type ParallelUserData = {
  profile: unknown;
  discoverableApplications: unknown[];
};

function ParallelRequestsDemo() {
  const { http, isSignedIn } = useAsgardeo();
  const [userData, setUserData] = useState<ParallelUserData>({
    profile: null,
    discoverableApplications: [],
  });

  useEffect(() => {
    if (!isSignedIn || !http) return;

    const baseUrl = process.env.NEXT_PUBLIC_ASGARDEO_BASE_URL;
    const requests = [
      {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        method: "GET",
        url: `${baseUrl}/api/users/v1/me/applications`,
      },
      {
        headers: { Accept: "application/json", "Content-Type": "application/scim+json" },
        method: "GET",
        url: `${baseUrl}/scim2/Me`,
      },
    ];

    (async () => {
      try {
        const response = await http.requestAll(requests);
        setUserData({
          discoverableApplications: response[0].data.applications,
          profile: response[1].data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [http, isSignedIn]);

  return (
    <details className="rounded-lg border p-3">
      <summary className="cursor-pointer text-sm text-muted-foreground">
        Raw httpRequestAll response (profile + discoverable apps, in parallel)
      </summary>
      <pre className="mt-2 overflow-x-auto text-xs">{JSON.stringify(userData, null, 2)}</pre>
    </details>
  );
}

export default function Profile() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">Your profile</h1>
      <SignedIn>
        <UserProfile />
        <div className="flex flex-col gap-3">
          <ScimProfile />
          <ParallelRequestsDemo />
        </div>
      </SignedIn>
    </div>
  );
}
