/**
 * The navbar's contrast, over every surface it actually passes.
 *
 * axe cannot do this and never could: it reads declared colours, and the
 * bar is a translucent pill with a backdrop-filter sitting over photographs
 * and gradients. The thing a reader sees is a composited pixel that exists
 * nowhere in the stylesheet. That is why a bar failing WCAG AA on all seven
 * sections of this site — 3.36:1 at best, 1.42:1 over the hero — passed
 * every accessibility run we had.
 *
 * So this screenshots the bar and reads the pixels.
 *
 * Run: node e2e/navbar-contrast.mjs [width] [height]
 */
import { chromium } from "@playwright/test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PNG } from "pngjs";
import { readFileSync } from "node:fs";

const W = Number(process.argv[2] ?? 1270);
const H = Number(process.argv[3] ?? 593);

const lin = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.goto("http://localhost:3111/", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

const dir = mkdtempSync(join(tmpdir(), "navcontrast-"));

const stops = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("main > section").forEach((s, i) => {
    const r = s.getBoundingClientRect();
    out.push({
      id: s.id || `section-${i}`,
      // well inside the section, so we are not sampling its own edge
      y: Math.round(r.top + scrollY + Math.min(200, r.height / 2)),
    });
  });
  return out;
});

console.log(`navbar contrast at ${W}x${H}\n`);
console.log("surface            tone    pill        logo    links   verdict");
console.log("-".repeat(68));

let failures = 0;

for (const stop of stops) {
  await page.evaluate((y) => scrollTo(0, y), stop.y);
  await page.waitForTimeout(700);

  const info = await page.evaluate(() => {
    const nav = document.querySelector("nav");
    const r = nav.getBoundingClientRect();
    const logo = nav.querySelector("a");
    const link = nav.querySelectorAll("a")[1] ?? logo;
    return {
      box: { x: r.x, y: r.y, width: r.width, height: r.height },
      tone: getComputedStyle(nav).backgroundColor,
      logoColor: getComputedStyle(logo).color,
      linkColor: getComputedStyle(link).color,
    };
  });

  const shot = join(dir, `${stop.id}.png`);
  await page.screenshot({ path: shot, clip: info.box });

  const png = PNG.sync.read(readFileSync(shot));

  /*
    Sample the pill, not what is written on it.

    Sampling the middle of the bar at mid-height lands on the link glyphs,
    which drags the average down and reports a pill several shades darker
    than it is. The text is vertically centred and about 12px tall in a
    52px bar, so a band across the upper quarter — inside the rim, above
    the glyphs — is background and nothing else.
  */
  const y0 = Math.floor(png.height * 0.14);
  const y1 = Math.floor(png.height * 0.26);
  const x0 = Math.floor(png.width * 0.3);
  const x1 = Math.floor(png.width * 0.7);

  let r = 0,
    g = 0,
    b = 0,
    n = 0;
  for (let x = x0; x < x1; x++)
    for (let y = y0; y < y1; y++) {
      const i = (png.width * y + x) << 2;
      r += png.data[i];
      g += png.data[i + 1];
      b += png.data[i + 2];
      n++;
    }
  const pill = [Math.round(r / n), Math.round(g / n), Math.round(b / n)];

  /*
    Composite the ink over the pill before comparing them.

    The links are charcoal at 0.7 and the dark tone's are cream at 0.78, so
    reading only the first three numbers out of an rgba() treats a
    translucent ink as a solid one and reports a ratio nobody will ever
    see — 15:1 where the truth is 5.8:1. That is the same class of mistake
    that let the old bar pass every check it had.
  */
  const over = (css, bg) => {
    const n = css.match(/[\d.]+/g).map(Number);
    const a = n.length > 3 ? n[3] : 1;
    return [0, 1, 2].map((i) => Math.round(n[i] * a + bg[i] * (1 - a)));
  };

  const logoR = ratio(over(info.logoColor, pill), pill);
  const linkR = ratio(over(info.linkColor, pill), pill);

  const worst = Math.min(logoR, linkR);
  const ok = worst >= 4.5;
  if (!ok) failures++;

  const toneName = pill[0] + pill[1] + pill[2] > 330 ? "light" : "dark";

  console.log(
    `${stop.id.padEnd(18)}${toneName.padEnd(8)}rgb(${pill.join(",")})`.padEnd(
      42,
    ) +
      `${logoR.toFixed(2).padStart(6)}${linkR.toFixed(2).padStart(8)}   ${ok ? "PASS" : "FAIL"}`,
  );
}

console.log(`\nAA needs 4.5:1 for text under 24px. The nav links are 12px.`);
console.log(
  failures ? `\n${failures} surface(s) FAILED` : `\nall surfaces pass`,
);

await browser.close();
process.exit(failures ? 1 : 0);
