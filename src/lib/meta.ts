import type { Metadata } from "next";
import type { Page } from "./content";

export function pageMetadata(page: Page): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.route },
    openGraph: { title: page.title, description: page.description, url: page.route, type: "website", siteName: "Bidaya" },
  };
}
