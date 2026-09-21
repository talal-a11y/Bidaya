// The site's absolute URL. Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is
// decided (docs/decisions.md — the domain is open until milestone 9). Until then
// Vercel's own URL is used for canonicals and the sitemap.
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
