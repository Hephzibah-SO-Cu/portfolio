/**
 * Render the site at the widths real people arrive on and write the images to
 * disk, so a change can be looked at rather than assumed. Not a test — the
 * assertions live in the specs beside this file.
 *
 * node e2e/shots.mjs [outDir] [baseURL]
 */
import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const OUT = process.argv[2] ?? "e2e/.shots";
const BASE = process.argv[3] ?? "http://localhost:3111";

/** Same list the marketplace uses: shipped device defaults, not round numbers. */
const WIDTHS = [
  { w: 360, h: 780, who: "s23-tecno", touch: true },
  { w: 414, h: 896, who: "iphone-11", touch: true },
  { w: 768, h: 1024, who: "ipad-portrait", touch: true },
  { w: 1024, h: 768, who: "ipad-landscape", touch: true },
  { w: 1352, h: 878, who: "mbp-14", touch: false },
  { w: 1536, h: 996, who: "mbp-16", touch: false },
];

/** Scroll the whole page so every whileInView / GSAP reveal has fired. */
async function settle(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

for (const { w, h, who, touch } of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
    ...(touch ? { hasTouch: true, isMobile: true } : {}),
    // A touch device reports (hover: none); Playwright needs telling.
    ...(touch ? (devices["Pixel 7"].userAgent ? {} : {}) : {}),
  });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await settle(page);
  await page.screenshot({ path: `${OUT}/${w}-${who}.png`, fullPage: true });

  // The case study lives behind the modal, so capture that too.
  const card = page
    .locator("article", { hasText: "Zowasel Marketplace" })
    .first();
  if (await card.count()) {
    await card.scrollIntoViewIfNeeded();
    const trigger = card.getByRole("button", { name: /case study/i }).first();
    await trigger.click({ force: true }).catch(() => {});
    await page.waitForTimeout(700);
    if (await page.locator("text=A storefront, not a dashboard").count()) {
      await page.screenshot({
        path: `${OUT}/${w}-${who}-modal.png`,
        fullPage: true,
      });
    }
  }
  await context.close();
  console.log(`shot ${w}px (${who})`);
}

await browser.close();
console.log(`\nwritten to ${OUT}`);
