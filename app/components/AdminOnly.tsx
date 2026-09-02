// Same "roles" check as RequireRole, but hides one element inside a
// shared page instead of gating a whole route.
"use client";

import type { ReactNode } from "react";
import { useAsgardeo } from "@asgardeo/nextjs";
import { normalizeRoles } from "../lib/normalizeRoles";

export function AdminOnly({ children }: { children: ReactNode }) {
  const { user } = useAsgardeo();
  const roles = normalizeRoles(user?.roles);

  if (!roles.includes("admin")) {
    return null;
  }

  return <>{children}</>;
}
