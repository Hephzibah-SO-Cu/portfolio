/** Hero only, at the widths real devices report, so it can be looked at. */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const OUT = process.argv[2] ?? "e2e/.shots/hero";
const BASE = "http://localhost:3111";
const WIDTHS = process.argv[3]
  ? process.argv[3].split(",").map((s) => s.split("x").map(Number))
  : [
      [320, 568],
      [375, 812],
      [414, 896],
      [768, 1024],
      [1024, 768],
      [1280, 800],
      [1440, 900],
      [1536, 790],
      [1920, 1080],
      [2560, 1440],
    ];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

for (const [w, h] of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600); // the navbar's GSAP entrance is 0.9s at 0.7s delay
  await page.screenshot({ path: `${OUT}/hero-${w}x${h}.png` });
  console.log(`${w}x${h}`);
  await ctx.close();
}

await browser.close();
