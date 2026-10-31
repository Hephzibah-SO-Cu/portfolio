/**
 * The share card, rendered from the site itself.
 *
 * Before this, the page's whole metadata was a title and the words
 * "Frontend & Product Engineer", so pasting the link into LinkedIn or
 * WhatsApp produced a bare blue line of text. For a site whose entire job
 * is being sent to people, that is the first impression and there is no
 * second one.
 *
 * It is a screenshot rather than a drawing, because a drawing is a second
 * copy of the design that starts going stale the moment the hero changes.
 * This cannot disagree with the site: it IS the site, at 1200x630.
 *
 * Run: node e2e/og.mjs        (writes public/og.jpg)
 */
import { chromium } from "@playwright/test";

const OUT = "public/og.jpg";

const browser = await chromium.launch();
const page = await browser.newPage({
  // The size every card validator expects, at 2x so the text is crisp when
  // a platform scales it down.
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});

await page.goto("http://localhost:3111/", { waitUntil: "networkidle" });

/*
  The navbar belongs to the site, not to a share card — and nextjs-portal is
  the dev server's own floating indicator, which is not part of the site at
  all and was sitting in the bottom-left corner of the first card rendered.
*/
await page.addStyleTag({
  content:
    "nav, [data-rail-caption], nextjs-portal { display: none !important; }",
});

await page.waitForTimeout(2500);

await page.screenshot({
  path: OUT,
  type: "jpeg",
  quality: 86,
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});

const { size } = await (await import("node:fs/promises")).stat(OUT);

console.log(`${OUT}  1200x630  ${Math.round(size / 1024)} KB`);

await browser.close();
