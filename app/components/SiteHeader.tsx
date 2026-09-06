// ── SECTION: Add login and logout ────────────────────────────────────────
// This app uses the in-app forms (<SignIn />, <SignUp /> — app-native
// authentication) as the only sign-in/sign-up UI, not SignInButton's
// redirect to WSO2's hosted page. SignedIn/SignedOut still conditionally
// render based on auth state; the header just links to /sign-in instead of
// rendering a SignInButton.
//
// UserDropdown bundles the signed-in display + sign-out into one component
// — see "Display user details" in the notes article for the alternatives
// (User render-prop, UserProfile panel, or reading useAsgardeo() directly).
"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserDropdown } from "@asgardeo/nextjs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-6 border-b bg-background/90 px-8 py-4 backdrop-blur">
      <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-extrabold text-primary-foreground">
          R
        </span>
        React Auth Demo
      </Link>

      <SignedIn>
        <nav className="ml-auto flex items-center gap-1">
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Dashboard
          </Link>
          <Link href="/profile" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Profile
          </Link>
          <Link href="/admin" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Admin
          </Link>
        </nav>
        <UserDropdown />
      </SignedIn>
      <SignedOut>
        <nav className="ml-auto flex items-center gap-2">
          <Link href="/sign-in" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Sign In
          </Link>
          <Link href="/sign-up" className={cn(buttonVariants({ size: "sm" }))}>
            Sign Up
          </Link>
        </nav>
      </SignedOut>
    </header>
  );
}
