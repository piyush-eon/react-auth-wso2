// Shared by RequireRole.tsx and AdminOnly.tsx — user.roles can come back
// as either a single string (one role) or an array (multiple roles).
export function normalizeRoles(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (typeof value === "string") return [value];
  return [];
}
