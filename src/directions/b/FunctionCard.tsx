"use client";
// A card that is a link: on a laptop it opens on hover and a click goes to its page; on a
// phone the first tap opens it, the second goes to the page.
import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";

export default function FunctionCard({ className, href, children }: { className: string; href: string; label?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if ((e.target as HTMLElement).closest("a") !== e.currentTarget) return; // Learn more is a link of its own
    if (window.matchMedia("(hover: none)").matches && !open) { e.preventDefault(); setOpen(true); }
  };
  return (
    <Link href={href} className={className} data-open={open || undefined} onClick={onClick}>
      {children}
    </Link>
  );
}
