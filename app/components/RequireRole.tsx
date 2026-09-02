// Client-side "must have this role" guard — not part of WSO2's official
// guides. Checks the `roles` claim (see notes article for how to get a
// role onto a user). proxy.ts already handles the signed-in check.
"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAsgardeo } from "@asgardeo/nextjs";
import { normalizeRoles } from "../lib/normalizeRoles";

export function RequireRole({
  allowed,
  children,
}: {
  allowed: string[];
  children: ReactNode;
}) {
  const { user, isLoading } = useAsgardeo();
  const router = useRouter();

  const roles = normalizeRoles(user?.roles);
  const isAllowed = roles.some((role) => allowed.includes(role));

  useEffect(() => {
    if (!isLoading && !isAllowed) {
      router.replace("/dashboard");
    }
  }, [isLoading, isAllowed, router]);

  if (isLoading || !isAllowed) {
    return null;
  }

  return <>{children}</>;
}
