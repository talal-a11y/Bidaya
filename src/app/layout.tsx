import type { Metadata } from "next";
import "@/styles/tokens.css";
import "@/styles/fonts.css";
import "@/styles/fonts-b.css";
import "@/styles/global.css";
import { getGlobal } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const g = getGlobal();
  // dir is set here, never assumed in CSS; Arabic content follows later (CLAUDE.md §6).
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* the Latin face is on every page above the fold; fetching it first stops the swap from shifting the layout */}
        <link rel="preload" href="/fonts/readex-pro-var-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <a href="#main" className="skip">{g.fields.skipLink}</a>
        {children}
      </body>
    </html>
  );
}
