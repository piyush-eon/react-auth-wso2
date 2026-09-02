// App-native sign-in: <SignIn /> renders WSO2's login form inside this
// app — no redirect to a hosted page. Requires "Enable app-native
// authentication API" on the application (Advanced tab), which only
// appears for apps registered via the Next.js quick-start template.
// MFA and social login (if configured in the console's Login Flow) show
// up automatically in the same form, no extra code here.
"use client";

import Link from "next/link";
import { SignIn } from "@asgardeo/nextjs";
import { Badge } from "@/components/ui/badge";

export default function SignInPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 pt-4 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="-mt-3 text-sm text-muted-foreground">
        Sign in to reach your dashboard, profile, and protected routes.
      </p>
      <div className="w-full text-left">
        <SignIn />
      </div>
      <p className="text-sm text-muted-foreground">
        No account?{" "}
        <Link
          href="/sign-up"
          className="text-primary underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

// Alternative: SignedOut + SignInButton redirects to WSO2's hosted login
// page instead of rendering the form inline — works on any app type, no
// app-native toggle needed. Not used here so the flow stays in-app.
