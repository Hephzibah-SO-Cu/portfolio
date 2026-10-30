/** Name every element that sticks out past the viewport, at a given width. */
import { chromium } from "@playwright/test";

const W = Number(process.argv[2] ?? 360);
const BASE = process.argv[3] ?? "http://localhost:3111";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: W, height: 780 },
  hasTouch: true,
  isMobile: true,
});
await page.goto(BASE, { waitUntil: "networkidle" });

const report = await page.evaluate((w) => {
  const out = [];
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.opacity === "0") continue;
    const right = r.left + r.width;
    if (right <= w + 1 && r.left >= -1) continue;

    // An element inside a deliberately scrollable rail, or clipped by an
    // ancestor, is not overflow: the page does not grow because of it.
    let contained = false;
    for (let p = el.parentElement; p; p = p.parentElement) {
      const ps = getComputedStyle(p);
      if (/auto|scroll|hidden|clip/.test(ps.overflowX)) {
        contained = true;
        break;
      }
    }
    if (contained) continue;

    out.push({
      tag: el.tagName.toLowerCase(),
      cls: (el.className?.baseVal ?? el.className ?? "")
        .toString()
        .slice(0, 50),
      text: (el.textContent ?? "").trim().slice(0, 40),
      left: Math.round(r.left),
      right: Math.round(right),
      over: Math.round(right - w),
    });
  }
  return {
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    offenders: out,
  };
}, W);

console.log(
  `viewport ${W}  documentElement.scrollWidth ${report.scrollWidth}  body ${report.bodyScrollWidth}`,
);
console.log(`unclipped elements past the edge: ${report.offenders.length}`);
for (const o of report.offenders.slice(0, 25)) {
  console.log(
    `  +${String(o.over).padStart(4)}px  <${o.tag}> ${o.cls} | ${o.text}`,
  );
}
await browser.close();
