# React Auth Demo — Next.js, App-Native Authentication

Companion demo app for the "React Authentication" video/notes — WSO2 Identity Platform login, signup, MFA, social login, roles, protected routes, and a protected backend API, built with Next.js and **app-native authentication**: the whole sign-in/sign-up flow renders inside this app, no redirect to a hosted login page.

## Setup

### 1. Register the app in WSO2's console

WSO2 Identity Platform is available both as a downloadable, self-hosted product and as a fully managed SaaS — this project uses the SaaS version throughout, no local software required.

1. Sign up for the free tier at [wso2.com/identity-platform/developer](https://wso2.com/identity-platform/developer/) — no card required. New accounts land on WSO2's Setup Guide first — pick **Next.js** as the framework when it asks, and let it handle the application registration. If you don't get the Setup Guide, use the manual path below instead.
2. **Applications → New Application**, pick the **Next.js** quick-start template.
3. Name it, set the authorized redirect URL to `http://localhost:3000`.
4. Open the **Advanced** tab and check **"Enable app-native authentication API"**, then **Update**.
5. Open the **Protocol** tab and note the **Client ID** and **Client Secret**.
6. **Flows → Self Registration** — toggle it on via the switch in the top-right of the Flow Builder canvas.
7. **(For the admin demo) Set up the "admin" role:**
   - **User Management → Groups → New Group** — name it `admin`, assign your test user.
   - **User Management → Roles → New Role** — name it `admin`, audience **Application**, pick this app, pick any API resource/permission → **Finish**.
   - Open that role → **Groups** tab → add the `admin` group under **Local Groups** → **Update**.

### 2. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in `NEXT_PUBLIC_ASGARDEO_CLIENT_ID`, `NEXT_PUBLIC_ASGARDEO_BASE_URL`, and `ASGARDEO_CLIENT_SECRET` from the Protocol tab above.

### 3. Install and run

```bash
npm install   # also applies the patch in patches/ automatically, via postinstall
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 4. (Optional) Run the backend API demo

```bash
cd server
cp .env.example .env   # fill in ASGARDEO_BASE_URL, ASGARDEO_CLIENT_ID, ASGARDEO_CLIENT_SECRET
npm install
npm run dev
```

Then visit `/dashboard` while signed in and click "Call /api/admin/stats" — try it signed out (401), signed in as a non-admin (403), and signed in with the `admin` role from step 7 above (200).

## Project structure

```
app/
  layout.tsx              AsgardeoProvider (afterSignInUrl -> /dashboard for both sign-in and sign-up)
  page.tsx                Public home page
  sign-in/page.tsx         In-app <SignIn /> form (app-native)
  sign-up/page.tsx         In-app <SignUp /> form (app-native)
  dashboard/page.tsx       Protected — any signed-in user; backend API demo
  dashboard/actions.ts     Server Action — getAccessToken is server-only in this SDK
  profile/page.tsx         Protected — <UserProfile />, SCIM2, httpRequestAll demos
  admin/page.tsx           Protected — signed-in AND "admin" role
  components/
    SiteHeader.tsx         Nav + SignedIn/SignedOut + UserDropdown
    RequireRole.tsx         Client-side "admin" role guard
    AdminOnly.tsx            Same check, hides one element instead of a whole route
    normalizeRoles.ts        Shared helper — user.roles can be a string or an array
proxy.ts                   Route protection (protectRoute()) + proactive token refresh
server/                    Express backend — verifies tokens via OAuth introspection
patches/                   patch-package fixes for @asgardeo/react
```

## Learn more

- [WSO2 Identity Platform docs](https://wso2.com/identity-platform/docs/)
- [Next.js documentation](https://nextjs.org/docs)
