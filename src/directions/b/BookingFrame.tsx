"use client";
// The booking embed (Google Calendar) loads only once its panel has been opened — before that
// it costs the page nothing and sets no third-party cookie. Once opened it stays.
import { useState } from "react";
import { useChapter } from "./Chapter";

export default function BookingFrame({ id, src, title, className }: { id: string; src: string; title: string; className?: string }) {
  const { open } = useChapter();
  const [seen, setSeen] = useState(false);
  if (open[id] && !seen) setSeen(true); // remembered from the first opening on
  if (!seen) return <div className={className} aria-hidden="true" />;
  return <iframe src={src} title={title} className={className} loading="lazy" />;
}
