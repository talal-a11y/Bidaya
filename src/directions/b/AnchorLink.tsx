"use client";
// A navigation link. To a section of the home page it scrolls through the smooth-scroll
// (which otherwise fights a plain jump); elsewhere it is a link. Tapping one inside the
// phone menu closes the menu.
import Link from "next/link";
import type { ReactNode } from "react";

export default function AnchorLink({ href, className, children, ...rest }: { href: string; className?: string; children: ReactNode; "aria-current"?: "page" }) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const details = (e.currentTarget as HTMLElement).closest("details");
    if (details) details.removeAttribute("open");
    const m = /^\/#(.+)$/.exec(href);
    if (!m || window.location.pathname !== "/") return;
    const el = document.getElementById(m[1]);
    if (!el) return;
    e.preventDefault();
    const w = window as Window & { __lenis?: { scrollTo: (t: Element) => void } };
    if (w.__lenis) w.__lenis.scrollTo(el); else el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  };
  return <Link href={href} className={className} onClick={onClick} {...rest}>{children}</Link>;
}
