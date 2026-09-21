import type { Metadata } from "next";
import "@/styles/tokens.css";
import "@/styles/fonts.css";
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
      <body>
        <a href="#main" className="skip">{g.fields.skipLink}</a>
        {children}
      </body>
    </html>
  );
}
