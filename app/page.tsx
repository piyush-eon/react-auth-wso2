// Public landing page — no auth check, reachable by anyone. Links to the
// in-app /sign-up form (<SignUp />, see app/sign-up/page.tsx).
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4 pt-4 text-center">
      <Badge variant="outline">WSO2 Identity Platform</Badge>
      <h1 className="text-4xl font-semibold tracking-tight">React Auth Demo</h1>
      <p className="max-w-prose text-muted-foreground">Public home page.</p>
      <p className="max-w-prose text-muted-foreground">
        Sign in to reach <code>/dashboard</code>; <br /> Sign in as a user with
        the <code>admin</code> role to also reach <code>/admin</code>.
      </p>
      <p className="mt-1">
        No account yet?{" "}
        <Link
          href="/sign-up"
          className="text-primary underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
