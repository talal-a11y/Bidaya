"use client";
// One of the four functions. The whole card is the button: on a laptop it opens on hover
// and a click goes to the function's page; on a phone the first tap opens it, the second
// goes to the page.
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

export default function FunctionCard({ className, href, label, children }: { className: string; href: string; label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const onClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) return; // Learn more is a link of its own
    const touch = window.matchMedia("(hover: none)").matches;
    if (touch && !open) { setOpen(true); return; }
    router.push(href);
  };
  return (
    <div className={className} data-open={open || undefined} role="link" tabIndex={0} aria-label={label}
      onClick={onClick} onKeyDown={(e) => { if (e.key === "Enter") router.push(href); }}>
      {children}
    </div>
  );
}
