/**
 * The vertical rhythm of the page, measured rather than eyeballed: every
 * section's own padding, and the real gap between what you can SEE at the
 * end of one section and the start of the next.
 */
import { chromium } from "@playwright/test";

const W = Number(process.argv[2] ?? 1270);
const H = Number(process.argv[3] ?? 593);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.goto("http://localhost:3111/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const rows = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("main > section").forEach((s) => {
    const cs = getComputedStyle(s);
    const r = s.getBoundingClientRect();
    out.push({
      id: s.id || s.className.slice(0, 22) || "(none)",
      top: Math.round(r.top + scrollY),
      h: Math.round(r.height),
      padT: cs.paddingTop,
      padB: cs.paddingBottom,
    });
  });
  return out;
});

console.log(`viewport ${W}x${H}\n`);
console.log("section                 height   pad-top  pad-bottom");
for (const r of rows) {
  console.log(
    `${r.id.padEnd(22)} ${String(r.h).padStart(6)}   ${r.padT.padStart(7)}  ${r.padB.padStart(10)}`,
  );
}

const rail = await page.evaluate(() => {
  const sec = document.querySelector("#projects");
  const header = sec.querySelector("div");
  const r = document.querySelector("#projects [data-rail]");
  const cap = document.querySelector("[data-rail-caption]");
  const cards = Array.from(r.children).map((c) => ({
    alt: c.querySelector("img")?.alt,
    w: Math.round(c.getBoundingClientRect().width),
  }));
  const box = r.querySelector("article > div");
  return {
    section: Math.round(sec.getBoundingClientRect().height),
    header: Math.round(header.getBoundingClientRect().height),
    headerMB: getComputedStyle(header).marginBottom,
    railH: Math.round(r.getBoundingClientRect().height),
    railPad: getComputedStyle(r).paddingTop,
    capH: Math.round(cap.getBoundingClientRect().height),
    capMT: getComputedStyle(cap).marginTop,
    cardBox: Math.round(box.getBoundingClientRect().height),
    cards,
    tokens: ["--card-w", "--card-w-mobile", "--card-h", "--gutter"].map(
      (t) =>
        `${t}=${getComputedStyle(document.documentElement).getPropertyValue(t).trim()}`,
    ),
  };
});
console.log("\n#projects internals:", JSON.stringify(rail, null, 2));

await browser.close();
