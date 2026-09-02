// ── SECTION: Roles, groups, and protected routes ────────────────────────
// Behind proxy.ts's protectRoute() (signed-in check) AND RequireRole
// (admin role check) — a non-admin hitting this route bounces to
// /dashboard before the content below ever renders.
import { RequireRole } from "../components/RequireRole";

export default function AdminPanel() {
  return (
    <RequireRole allowed={["admin"]}>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">Only visible to users with the &quot;admin&quot; role.</p>
      </div>
    </RequireRole>
  );
}
