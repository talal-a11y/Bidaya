import { chromium } from "playwright";
import fs from "node:fs";
const sites = ["https://orchid.security","https://aspensearch.com","https://weevolveit.com","https://filmbot.com","https://rapidkert.com","https://landonorris.com"];
const browser = await chromium.launch();
const report = {};
for (const url of sites) {
  const name = new URL(url).hostname.replace(/^www\./,"").split(".")[0];
  const r = { url, libs: [], canvas: 0, webgl: 0, video: 0, fonts: [], scriptsKB: 0, title: "", h1: "", textSample: "", error: null };
  try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36" });
    const page = await ctx.newPage();
    const scripts = [];
    page.on("response", async (res) => { const ct = res.headers()["content-type"] || ""; if (ct.includes("javascript")) { try { const b = await res.body(); scripts.push({ url: res.url(), kb: Math.round(b.length/1024), text: b.toString("utf8").slice(0, 400000) }); } catch {} } });
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 }).catch(()=>{});
    await page.waitForTimeout(3000);
    r.title = await page.title();
    r.h1 = await page.locator("h1").first().innerText().catch(()=> "");
    r.textSample = (await page.evaluate(() => document.body.innerText.slice(0, 1500))).replace(/\s+/g," ");
    r.canvas = await page.locator("canvas").count();
    r.video = await page.locator("video").count();
    r.webgl = await page.evaluate(() => [...document.querySelectorAll("canvas")].filter(c => { try { return !!(c.getContext("webgl2")||c.getContext("webgl")); } catch { return false; } }).length);
    r.fonts = await page.evaluate(() => { const s = new Set(); document.fonts.forEach(f => s.add(f.family + " " + f.weight)); return [...s].slice(0, 20); });
    const all = scripts.map(s => s.text).join("\n");
    r.scriptsKB = scripts.reduce((a, s) => a + s.kb, 0);
    for (const [lib, re] of Object.entries({ gsap: /gsap|GSAP/, ScrollTrigger: /ScrollTrigger/, lenis: /lenis|Lenis/, three: /THREE|three\.module|WebGLRenderer/, rive: /rive|Rive/, framer: /framer-motion|framer/, webflow: /webflow/i, spline: /spline/i, lottie: /lottie/i, barba: /barba/i, splitType: /SplitText|split-type|SplitType/, pixi: /PIXI/, curtains: /curtains/i, locomotive: /locomotive/i })) if (re.test(all)) r.libs.push(lib);
    // scroll frames
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    r.pageHeight = total;
    for (const f of [0, 0.15, 0.3, 0.5, 0.7, 0.9]) {
      await page.evaluate((y) => window.scrollTo({ top: y }), Math.floor((total - 900) * f));
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `screenshots/refs/${name}-1440-${Math.round(f*100)}.png` });
    }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500);
    await page.screenshot({ path: `screenshots/refs/${name}-1440-full.png`, fullPage: true }).catch(()=>{});
    await ctx.close();
    const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" });
    const mp = await m.newPage();
    await mp.goto(url, { waitUntil: "networkidle", timeout: 45000 }).catch(()=>{});
    await mp.waitForTimeout(3000);
    await mp.screenshot({ path: `screenshots/refs/${name}-390-0.png` });
    const mt = await mp.evaluate(() => document.documentElement.scrollHeight);
    await mp.evaluate((y) => window.scrollTo({ top: y }), Math.floor(mt * 0.4)); await mp.waitForTimeout(1200);
    await mp.screenshot({ path: `screenshots/refs/${name}-390-40.png` });
    await m.close();
  } catch (e) { r.error = String(e.message).slice(0, 200); }
  report[name] = r;
  console.log(name, "done", r.error || "");
}
await browser.close();
fs.writeFileSync("screenshots/refs/report.json", JSON.stringify(report, null, 2));
for (const [n, r] of Object.entries(report)) console.log(`\n== ${n} ==\ntitle: ${r.title}\nh1: ${r.h1}\nlibs: ${r.libs.join(", ")} | canvas ${r.canvas} webgl ${r.webgl} video ${r.video} | js ${r.scriptsKB}KB | height ${r.pageHeight}\nfonts: ${r.fonts.join("; ")}\ntext: ${r.textSample.slice(0, 500)}`);
