// UserProfile is a full editable panel, persisted back through SCIM2
// automatically — no form-handling code of your own. Name doesn't show up
// unless given_name/family_name are explicitly enabled for this app under
// Applications -> User Attributes (profile scope) in the console — not on
// by default, and attributeMapping only works once that's done.
"use client";

import { SignedIn, UserProfile } from "@asgardeo/nextjs";

export default function Profile() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Your profile</h1>
        <p className="text-muted-foreground">
          Edit any field below — changes save straight back through SCIM2, no
          form-handling code here.
        </p>
      </div>
      <SignedIn>
        <UserProfile
          attributeMapping={{
            firstName: "name.givenName",
            lastName: "name.familyName",
          }}
        />
      </SignedIn>
    </div>
  );
}
