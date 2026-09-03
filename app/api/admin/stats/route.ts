// Same "admin" role check as RequireRole, enforced here as the real
// security boundary — a Next.js API route, not the separate Express
// server this demo used before. req.user is introspection + userinfo
// merged (see app/lib/verifyToken.ts).
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/verifyToken";

export async function GET(req: NextRequest) {
  const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
  const user = await verifyToken(token);

  if (!user) {
    return NextResponse.json({ error: "invalid or expired token" }, { status: 401 });
  }

  const rawRoles = user.roles;
  const roles = Array.isArray(rawRoles) ? rawRoles : typeof rawRoles === "string" ? [rawRoles] : [];
  if (!roles.includes("admin")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  return NextResponse.json({ totalUsers: 4213 });
}
