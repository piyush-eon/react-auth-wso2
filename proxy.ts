// asgardeoMiddleware wires WSO2 auth into every request. protectRoute()
// redirects signed-out visitors away from /dashboard, /profile, /admin;
// it also proactively refreshes the access token when it's close to
// expiry, so Server Components never see a stale one. Logout (via
// UserDropdown in SiteHeader.tsx) clears the session cookie and redirects
// through WSO2's sign-out endpoint, terminating the session org-wide too.
//
// The "admin" role check on /admin is enforced separately, in
// app/admin/page.tsx via RequireRole — not here.
import { asgardeoMiddleware, createRouteMatcher } from "@asgardeo/nextjs/middleware";

const isProtectedRoute = createRouteMatcher(["/dashboard*", "/profile*", "/admin*"]);

export default asgardeoMiddleware(async (asgardeo, req) => {
  if (isProtectedRoute(req)) {
    return await asgardeo.protectRoute();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
