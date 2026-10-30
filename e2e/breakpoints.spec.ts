import { expect, test } from "@playwright/test";

/**
 * The page must never be wider than the screen. It is the cheapest failure to
 * detect and the most damaging to leave in: a page that scrolls sideways reads
 * as broken however good the design is, and nobody reports it — they just go.
 *
 * This found a real one on its first run. The contact rows are flex, and a
 * flex item's min-width defaults to `auto`, so the span holding the email
 * address could not shrink below its own min-content width. At 360px the row
 * pushed the page out to 399px. Every Android phone in Nigeria is 360.
 *
 * The widths are device defaults, not round numbers — including the shipped
 * scaled resolutions of the 14" and 16" MacBook Pro, which is what people
 * reviewing this portfolio are most likely to open it on. 320 is in because
 * it is the floor below which nothing is expected to work.
 */
const WIDTHS = [
  { w: 320, h: 568, who: "iPhone SE, 1st gen — the floor" },
  { w: 360, h: 780, who: "Samsung S-series, Tecno" },
  { w: 414, h: 896, who: "iPhone 11" },
  { w: 768, h: 1024, who: "iPad portrait" },
  { w: 1024, h: 768, who: "iPad landscape" },
  { w: 1352, h: 878, who: '14" MacBook Pro, shipped default' },
  { w: 1536, h: 996, who: '16" MacBook Pro, shipped default' },
] as const;

test.describe("no page is wider than the screen", () => {
  for (const { w, h, who } of WIDTHS) {
    test(`at ${w}px (${who})`, async ({ page }) => {
      // The viewport is set per test, so running this on all three projects
      // would assert exactly the same thing three times over.
      test.skip(
        test.info().project.name !== "desktop",
        "viewport is set here, so one project is enough",
      );

      await page.setViewportSize({ width: w, height: h });
      await page.goto("/", { waitUntil: "networkidle" });

      const { scrollWidth, offenders } = await page.evaluate((width) => {
        const out: string[] = [];
        for (const el of Array.from(document.querySelectorAll("body *"))) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          const s = getComputedStyle(el);
          if (s.visibility === "hidden" || s.opacity === "0") continue;
          if (r.left + r.width <= width + 1 && r.left >= -1) continue;

          // Something inside a scrolling rail or a clipping parent does not
          // make the PAGE wider, so it is not what this test is about.
          let contained = false;
          for (let p = el.parentElement; p; p = p.parentElement) {
            if (/auto|scroll|hidden|clip/.test(getComputedStyle(p).overflowX)) {
              contained = true;
              break;
            }
          }
          if (contained) continue;

          const cls = (el.className ?? "")
            .toString()
            .replace(/\s+/g, " ")
            .slice(0, 40);
          out.push(
            `<${el.tagName.toLowerCase()}> ${cls} — ` +
              `${Math.round(r.left + r.width - width)}px past the edge`,
          );
        }
        return {
          scrollWidth: document.documentElement.scrollWidth,
          offenders: out,
        };
      }, w);

      expect(offenders, `elements sticking out at ${w}px`).toEqual([]);
      expect(
        scrollWidth,
        `document is wider than the ${w}px viewport`,
      ).toBeLessThanOrEqual(w + 1);
    });
  }
});
