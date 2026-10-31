import { expect, test } from "@playwright/test";

/**
 * The type scale, enforced.
 *
 * Twenty-one distinct font sizes rendered on this page before the scale
 * existed, because every size was chosen where it was used. Collapsing them
 * was a day's work; keeping them collapsed is the hard part, and a ladder
 * nobody can check is a ladder that drifts back within a month.
 *
 * So this reads what the browser actually computed — not what the source
 * says, which can be a token resolving to nothing — and fails on anything
 * off the ladder, naming the element and its text so the offender is
 * findable rather than merely counted.
 */

/** The nine tokens, resolved at the viewport the test runs in. */
async function ladder(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    const probe = document.createElement("span");

    document.body.appendChild(probe);

    const sizes = [
      "--t-display",
      "--t-hero",
      "--t-h2",
      "--t-lead",
      "--t-logo",
      "--t-body",
      "--t-small",
      "--t-caption",
      "--t-label",
    ].map((name) => {
      const raw = cs.getPropertyValue(name).trim();

      /*
        Resolve each token through the browser rather than parsing the
        clamp() ourselves: four of the nine are fluid, and the whole point
        is to compare against what this viewport actually produces.
      */
      probe.style.fontSize = `var(${name})`;

      const px = getComputedStyle(probe).fontSize;

      return { name, raw, px };
    });

    probe.remove();

    return sizes;
  });
}

test("every rendered font size is on the scale", async ({ page }) => {
  test.slow();

  await page.goto("/", { waitUntil: "networkidle" });

  const scale = await ladder(page);

  // A token that resolves to nothing silently falls back to the inherited
  // 16px, which looks like a page that merely lost its hierarchy. It has
  // happened here once already, from a stale stylesheet.
  for (const t of scale) {
    expect(t.raw, `${t.name} is defined`).not.toBe("");
  }

  const allowed = new Set(scale.map((t) => t.px));

  const offenders = await page.evaluate(
    (allowedPx: string[]) => {
      const ok = new Set(allowedPx);
      const out: { size: string; tag: string; text: string }[] = [];

      document.querySelectorAll("body *").forEach((el) => {
        if (el.children.length) return;

        const text = el.textContent?.trim();

        if (!text) return;

        const size = getComputedStyle(el).fontSize;

        if (ok.has(size)) return;

        out.push({
          size,
          tag: el.tagName.toLowerCase(),
          text: text.slice(0, 48),
        });
      });

      return out;
    },
    [...allowed],
  );

  expect(
    offenders.map((o) => `${o.size}  <${o.tag}> ${o.text}`).join("\n"),
    "font sizes that are not one of the nine tokens",
  ).toBe("");
});

test("the scale stays small", async ({ page }) => {
  test.slow();

  await page.goto("/", { waitUntil: "networkidle" });

  const distinct = await page.evaluate(
    () =>
      new Set(
        [...document.querySelectorAll("body *")]
          .filter((e) => e.textContent?.trim() && !e.children.length)
          .map((e) => getComputedStyle(e).fontSize),
      ).size,
  );

  /*
    Nine tokens exist, but --t-display and --t-logo are a watermark and a
    wordmark that appear once each, so a page rendering more than nine
    distinct sizes means a tenth has been introduced somewhere.
  */
  expect(distinct, "distinct rendered font sizes").toBeLessThanOrEqual(9);
});
