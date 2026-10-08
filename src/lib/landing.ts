// Landing-only mode (founder, 2026-10-08): on the published site, humans see the landing page and the
// Enquire button and nothing links onward; every page stays live and indexable. Previews are untouched.
import nav from "../../content/nav.json";
export const landingOnly = process.env.VERCEL_ENV === "production" && nav.landingOnly === true;
