"use client";
// One of the four functions. On a laptop the card opens on hover; on a phone a tap opens it.
import { useState } from "react";
import type { ReactNode } from "react";

export default function FunctionCard({ className, children }: { className: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={className} data-open={open || undefined}
      onClick={(e) => { if (window.matchMedia("(hover: none)").matches && !(e.target as HTMLElement).closest("a")) setOpen((o) => !o); }}>
      {children}
    </div>
  );
}
