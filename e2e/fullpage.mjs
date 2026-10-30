import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const OUT = process.argv[2] ?? "e2e/.shots/full";
await mkdir(OUT, { recursive: true });
const b = await chromium.launch();
for (const [w, h] of [
  [1440, 900],
  [390, 844],
]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3111/", { waitUntil: "networkidle" });
  await p.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}/full-${w}.png`, fullPage: true });
  console.log(`${w} captured`);
  await ctx.close();
}
await b.close();
