"use client";
// A navigation link to a section of the home page. On the home page it scrolls there
// through the smooth-scroll (which otherwise fights a plain jump); elsewhere it is a link.
import Link from "next/link";
import type { ReactNode } from "react";

export default function AnchorLink({ href, className, children, ...rest }: { href: string; className?: string; children: ReactNode; "aria-current"?: "page" }) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const m = /^\/#(.+)$/.exec(href);
    if (!m || window.location.pathname !== "/") return;
    const el = document.getElementById(m[1]);
    if (!el) return;
    e.preventDefault();
    const w = window as Window & { __lenis?: { scrollTo: (t: Element, o?: { offset?: number }) => void } };
    if (w.__lenis) w.__lenis.scrollTo(el); // the section carries its own scroll margin for the bar
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  };
  return <Link href={href} className={className} onClick={onClick} {...rest}>{children}</Link>;
}
