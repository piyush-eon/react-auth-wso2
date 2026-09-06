// App-native sign-up: <SignUp /> renders WSO2's registration form inside
// this app, using the self-registration flow under Flows -> Self
// Registration in the console.
"use client";

import Link from "next/link";
import { SignUp } from "@asgardeo/nextjs";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 pt-4 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Create an account
      </h1>
      <p className="-mt-3 text-sm text-muted-foreground">
        Sign up in seconds — no redirects, no hosted pages.
      </p>
      <div className="w-full text-left">
        <SignUp
          showTitle={false}
          showSubtitle={false}
          onComplete={(payload) => console.log(payload)}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

// Alternative: SignUpButton redirects to WSO2's hosted sign-up page
// instead of rendering the form inline. Not used here, same as SignIn.
