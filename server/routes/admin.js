// Server-side version of RequireRole's "admin" check. req.user is
// introspection + userinfo merged (see verifyToken.js).
import { Router } from "express";
import { requireAuth } from "../verifyToken.js";

const router = Router();

router.get("/api/admin/stats", requireAuth, (req, res) => {
  // req.user.roles can be a single string or an array.
  const rawRoles = req.user.roles;
  const roles = Array.isArray(rawRoles) ? rawRoles : typeof rawRoles === "string" ? [rawRoles] : [];
  if (!roles.includes("admin")) return res.status(403).json({ error: "forbidden" });
  res.json({ totalUsers: 4213 });
});

export default router;
