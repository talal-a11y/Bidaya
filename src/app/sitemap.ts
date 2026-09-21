import type { MetadataRoute } from "next";
import { getNotes, getPages, getReports } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const pages = getPages().map((p) => ({ url: `${base}${p.route}`, lastModified: new Date("2026-09-21") }));
  const entries = [...getReports(), ...getNotes()].map((e) => ({ url: `${base}/reports-and-notes/${e.slug}`, lastModified: new Date(e.date) }));
  return [...pages, ...entries];
}
