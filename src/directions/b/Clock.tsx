"use client";
// The time in the UAE, in the header bar — a fact, in mono, the way Aspen keeps its clocks.
import { useEffect, useState } from "react";

const fmt = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dubai" }).format(new Date());

export default function Clock({ label }: { label: string }) {
  const [t, setT] = useState<string>("");
  useEffect(() => {
    const tickNow = () => setT(fmt());
    const id = setInterval(tickNow, 15000);
    const raf = requestAnimationFrame(tickNow);
    return () => { clearInterval(id); cancelAnimationFrame(raf); };
  }, []);
  return <span><span>{label}</span> <time suppressHydrationWarning>{t}</time></span>;
}
