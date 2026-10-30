/**
 * Every outbound link on the page, actually requested. A portfolio that
 * points at a dead demo is worse than one that does not link at all, and
 * the Framez backend in particular is known to be down.
 */
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();

await page.goto("http://localhost:3111/", { waitUntil: "networkidle" });

// Open every case study so the modal's links are in the DOM too.
const hrefs = await page.evaluate(() =>
  Array.from(document.querySelectorAll("a[href]"))
    .map((a) => a.getAttribute("href"))
    .filter((h) => h && !h.startsWith("#")),
);

const fromData = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("a[href^='http']").forEach((a) => out.push(a.href));
  return out;
});

const all = [...new Set([...hrefs, ...fromData])].filter((h) =>
  h.startsWith("http"),
);

console.log(`${all.length} external links\n`);

for (const url of all.sort()) {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    const flag = res.ok ? "ok " : "DEAD";
    console.log(`${flag} ${res.status} ${url}`);
  } catch (err) {
    console.log(`DEAD  -- ${url}  (${err.name}: ${err.message})`);
  }
}

await browser.close();
