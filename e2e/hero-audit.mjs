/**
 * Measure the hero's geometry at the widths our readers actually bring, so
 * the scaling problem can be fixed from numbers rather than from eyeballing
 * a screenshot. Reports the nav's bottom edge against the eyebrow's top edge
 * (the "Lagos hiding behind the navbar" bug), the rendered type sizes, and
 * how much of the viewport the portrait eats.
 */
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3111";

// The widths real devices report, not three round numbers.
const WIDTHS = [
  [320, 568],
  [360, 800],
  [375, 812],
  [390, 844],
  [414, 896],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1280, 800],
  [1366, 768],
  [1440, 900],
  [1536, 864],
  [1920, 1080],
  [2560, 1440],
  /*
    Real browser WINDOW heights, not screen heights. A maximised window on
    a 1080p screen is about 892px of viewport once the chrome is taken off,
    and that wide-but-short shape is where a portrait sized only by width
    grew to 96% of the viewport height.
  */
  [1366, 625],
  [1536, 790],
  [1920, 892],
  [2560, 1300],
];

const browser = await chromium.launch();

console.log(
  [
    "viewport".padStart(9),
    "navBot".padStart(7),
    "eyeTop".padStart(7),
    "gap".padStart(6),
    "h1px".padStart(6),
    "subpx".padStart(6),
    "portraitW".padStart(10),
    "%vw".padStart(5),
    "portraitL".padStart(10),
    "textR".padStart(6),
    "rail",
  ].join(" "),
);

for (const [w, h] of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1600); // entrance animations settle

  const m = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => (el ? el.getBoundingClientRect() : null);

    const nav = box(q("nav"));
    const eyebrow = [...document.querySelectorAll("#home p")].find((p) =>
      p.textContent.trim().startsWith("Lagos"),
    );
    const h1 =
      q("#home .relative.z-20 h1") ??
      [...document.querySelectorAll("#home h1")].pop();
    const sub = [...document.querySelectorAll("#home p")].find((p) =>
      p.textContent.includes("Building web, mobile"),
    );
    const portrait = q('#home img[alt="Busayo"]');
    const rail = [...document.querySelectorAll("#home h3")].find((n) =>
      n.textContent.includes("VISUAL STORYTELLING"),
    );

    const eb = box(eyebrow);
    const pb = box(portrait);
    const sb = box(sub);

    return {
      navBottom: nav ? Math.round(nav.bottom) : null,
      eyebrowTop: eb ? Math.round(eb.top) : null,
      h1px: h1 ? parseFloat(getComputedStyle(h1).fontSize) : null,
      subpx: sub ? parseFloat(getComputedStyle(sub).fontSize) : null,
      portraitW: pb ? Math.round(pb.width) : null,
      portraitLeft: pb ? Math.round(pb.left) : null,
      textRight: sb ? Math.round(sb.right) : null,
      railVisible: rail
        ? getComputedStyle(rail.closest("div").parentElement).display !== "none"
        : false,
      scrollW: document.documentElement.scrollWidth,
    };
  });

  const gap = m.eyebrowTop - m.navBottom;
  console.log(
    [
      String(`${w}x${h}`).padStart(9),
      String(m.navBottom).padStart(7),
      String(m.eyebrowTop).padStart(7),
      (gap >= 0 ? String(gap) : `${gap}!!`).padStart(6),
      String(Math.round(m.h1px)).padStart(6),
      String(Math.round(m.subpx)).padStart(6),
      String(m.portraitW).padStart(10),
      String(Math.round((m.portraitW / w) * 100)).padStart(5),
      String(m.portraitLeft).padStart(10),
      String(m.textRight).padStart(6),
      m.railVisible ? "yes" : "NO",
      m.scrollW > w ? `OVERFLOW ${m.scrollW}` : "",
    ].join(" "),
  );

  await ctx.close();
}

await browser.close();
