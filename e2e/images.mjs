/**
 * Every image on the page, actually decoded. A wrong path in a next/image
 * src fails silently — the box keeps its space and renders nothing — so a
 * page that has lost half its pictures still looks structurally fine in a
 * screenshot taken from the top.
 */
import { chromium } from "@playwright/test";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1270, height: 593 } });

const failed = [];
p.on("response", (r) => {
  if (r.request().resourceType() === "image" && r.status() >= 400)
    failed.push(`${r.status()} ${r.url()}`);
});

await p.goto("http://localhost:3111/", { waitUntil: "networkidle" });
// walk the whole page so lazy images are asked for
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 400) {
  await p.evaluate((y) => scrollTo(0, y), y);
  await p.waitForTimeout(220);
}
// and open a case study, whose screenshots only mount on demand
await p.evaluate(() => scrollTo(0, 0));
await p.locator("#projects").scrollIntoViewIfNeeded();
await p.waitForTimeout(1200);
await p.locator('#projects [data-rail] img[alt="Framez"]').click();
await p.waitForTimeout(1500);

const broken = await p.evaluate(() =>
  [...document.querySelectorAll("img")]
    .filter((i) => i.complete && i.naturalWidth === 0)
    .map((i) => i.currentSrc || i.src),
);

const total = await p.evaluate(() => document.querySelectorAll("img").length);
console.log(`${total} <img> on the page`);
console.log(`${failed.length} image requests failed`);
failed.forEach((f) => console.log("  " + f));
console.log(`${broken.length} images decoded to nothing`);
broken.forEach((f) => console.log("  " + f));

await b.close();
process.exit(failed.length + broken.length ? 1 : 0);
