// Screenshots every page at 390px and 1440px against a running server (default http://localhost:3000).
// Output: screenshots/<page>-<width>.png — the folder is gitignored. Look at them before saying "done".
import { chromium } from "playwright";
import fs from "node:fs";

const base = process.env.BASE_URL || "http://localhost:3000";
const routes = ["/", "/founders", "/creatives-and-pre-preneurs", "/institutions", "/about", "/resources", "/work-with-us", "/general-inquiry", "/fees",
  "/fractional-coo-uae", "/fractional-cfo-uae", "/tech-and-projects", "/feasibility-and-advisory"];
fs.mkdirSync("screenshots", { recursive: true });
const browser = await chromium.launch();
const problems = [];
for (const width of [390, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") problems.push(`${width} ${page.url()} console: ${m.text()}`); });
  page.on("pageerror", (e) => problems.push(`${width} ${page.url()} pageerror: ${e.message}`));
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: "networkidle" });
    const name = r === "/" ? "home" : r.slice(1);
    await page.screenshot({ path: `screenshots/${name}-${width}.png`, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (overflow) problems.push(`${width} ${r}: horizontal scroll`);
    const h1s = await page.locator("h1").count();
    if (h1s !== 1) problems.push(`${width} ${r}: ${h1s} h1`);
  }
  await ctx.close();
}
await browser.close();
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log("screenshots: ok");
