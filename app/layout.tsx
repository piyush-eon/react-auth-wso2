// AsgardeoProvider (server) wraps the client-side provider and reads
// clientId/baseUrl/clientSecret from env vars automatically. Every route
// can use useAsgardeo() (client) or the `asgardeo` server helper.
//
// afterSignInUrl resolves to a full URL (e.g. http://localhost:3000/dashboard)
// and gets sent to WSO2 as the OAuth redirect_uri — that exact URL has to be
// registered in the console's Protocol tab too, not just the bare origin, or
// sign-in fails with invalid_callback / callback.not.match.
//
// preferences.i18n overrides copy the embedded components render — used here
// since the login flow's "Username" field label isn't editable in the
// console (unlike signup's field text). Read once at server start, so a
// dev-server restart is needed after changing these.
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AsgardeoProvider } from "@asgardeo/nextjs/server";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

// Every page needs a live session check, so nothing here can be
// statically prerendered.
export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Auth Demo",
  description:
    "WSO2 Identity Platform app-native authentication, built with Next.js.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AsgardeoProvider
          afterSignInUrl="/dashboard"
          preferences={{
            i18n: {
              bundles: {
                "en-US": {
                  translations: {
                    "elements.fields.username.label": "Email (Username)",
                    "elements.fields.username.placeholder": "Enter your email",
                  },
                },
              },
            },
          }}
        >
          <SiteHeader />
          <main className="flex-1 w-full max-w-xl mx-auto px-6 py-14 flex flex-col gap-7">
            {children}
          </main>
        </AsgardeoProvider>
      </body>
    </html>
  );
}
