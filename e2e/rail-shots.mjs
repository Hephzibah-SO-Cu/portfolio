/**
 * The Projects rail, at rest and after scrolling, so the centre-card
 * mechanic can actually be looked at rather than inferred from numbers.
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const OUT = "e2e/.shots/rail";
const BASE = "http://localhost:3111";

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

for (const [w, h] of [
  [1920, 892],
  [1440, 900],
  [768, 1024],
  [390, 844],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  const section = page.locator("#projects");
  await section.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const s = document.querySelector("#projects");
    window.scrollTo(
      0,
      s.offsetTop + s.offsetHeight / 2 - window.innerHeight / 2,
    );
  });
  await page.waitForTimeout(1400);

  const centred = async () =>
    page.evaluate(
      () =>
        document.querySelector("[data-rail-caption] h3")?.textContent?.trim() ??
        "?",
    );

  console.log(`${w} at rest — centred: ${await centred()}`);
  await page.screenshot({ path: `${OUT}/rail-${w}-rest.png` });

  // Scroll the rail two cards to the right and look again.
  await page.evaluate(() => {
    const rail = document.querySelector("#projects [data-rail]");
    if (rail) rail.scrollLeft += 700;
  });
  await page.waitForTimeout(900);

  console.log(`${w} scrolled  — centred: ${await centred()}`);
  await page.screenshot({ path: `${OUT}/rail-${w}-scrolled.png` });

  await ctx.close();
}

await browser.close();
