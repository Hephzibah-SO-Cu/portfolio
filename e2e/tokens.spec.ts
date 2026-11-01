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

/*
  The palette, guarded at the source rather than in the browser.

  A rendered colour cannot tell you where it came from: #F5F0E8 and
  var(--cream) composite to exactly the same pixel, and a stray tan reads as
  a perfectly ordinary colour. So this one reads the files. Every base colour
  is defined once in globals.css as a channel, and nothing else may write a
  colour literal — before this, --cream appeared as #F5F0E8 five times and as
  rgba(245,240,232, …) at eleven different opacities, two of which differed
  only by a space.
*/
test("no colour literal is written outside the palette definition", async () => {
  const { readdir, readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");

  const walk = async (dir: string): Promise<string[]> => {
    const entries = await readdir(dir, { withFileTypes: true });

    return (
      await Promise.all(
        entries.map((e) => {
          const p = join(dir, e.name);

          if (e.isDirectory()) return walk(p);

          return e.name.endsWith(".tsx") ? [p] : [];
        }),
      )
    ).flat();
  };

  const files = await walk(join(process.cwd(), "src"));
  const offenders: string[] = [];

  for (const file of files) {
    const source = await readFile(file, "utf8");

    // Comments explain what a colour USED to be; they are not styling.
    const code = source
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");

    /*
      The lookbehind stops an HTML entity being read as a colour. `&#183;`,
      the middot in the hero's byline, is three valid hex digits behind a
      hash, and the first run of this test failed on exactly that.
    */
    const found = code.match(/(?<![&\w])#[0-9A-Fa-f]{3,8}\b|rgba\([^)]*\)/g);

    if (found) {
      offenders.push(
        `${file.split("src")[1]}: ${[...new Set(found)].join(", ")}`,
      );
    }
  }

  expect(
    offenders.join("\n"),
    "colour literals outside src/app/globals.css",
  ).toBe("");
});

/*
  Family and weight, which the size test could not see.

  Before this, three section headings rendered at exactly the same size in
  three different treatments — Inter bold, Playfair regular and Playfair
  bold — and every size assertion passed, because they agreed about the one
  thing that was already policed. Four weights were in use and uppercase
  labels appeared at three of them.
*/
test("only two families and three weights are in use", async ({ page }) => {
  test.slow();

  await page.goto("/", { waitUntil: "networkidle" });

  const used = await page.evaluate(() => {
    const out: { fam: string; weight: string; text: string; size: string }[] =
      [];

    document.querySelectorAll("main *").forEach((el) => {
      const text = el.textContent?.trim();

      if (!text || el.children.length) return;

      const cs = getComputedStyle(el);

      out.push({
        fam: cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
        weight: cs.fontWeight,
        size: cs.fontSize,
        text: text.slice(0, 40),
      });
    });

    return out;
  });

  /*
    Read the two families out of the CSS variables rather than naming them
    here, so that swapping the display serif is a change in layout.tsx and
    not a change in this test as well. What is asserted is that the page
    uses those two and nothing else — which is the rule — not which two they
    happen to be.
  */
  const declared = await page.evaluate(() => {
    /* next/font puts these on <body> as a class, not on :root */
    const cs = getComputedStyle(document.body);
    const first = (v: string) =>
      cs.getPropertyValue(v).split(",")[0].replace(/["']/g, "").trim();

    return [first("--font-playfair"), first("--font-inter")].sort();
  });

  const families = [...new Set(used.map((u) => u.fam))].sort();

  expect(
    families,
    `only the two declared families: ${declared.join(" and ")}`,
  ).toEqual(declared);

  const weights = [...new Set(used.map((u) => u.weight))].sort();

  expect(
    weights,
    "regular for body and display, medium for labels, bold for the wordmark and job titles",
  ).toEqual(["400", "500", "700"]);

  /*
    Every uppercase label is medium. They had drifted to 400, 500 and 700,
    and three of them were reaching 12px through Tailwind's text-xs rather
    than through the token — which lands on the same pixel and so slipped
    past the size test entirely.
  */
  const labels = used.filter((u) => u.size === "12px");

  const offLadder = labels.filter((u) => u.weight !== "500");

  expect(
    offLadder.map((u) => `${u.weight}  ${u.text}`).join("\n"),
    "12px labels that are not medium",
  ).toBe("");
});

/*
  Every section heading is one thing.
*/
test("the section headings agree with each other", async ({ page }) => {
  test.slow();

  await page.goto("/", { waitUntil: "networkidle" });

  const headings = await page.evaluate(() =>
    [...document.querySelectorAll("main h2")].map((h) => {
      const cs = getComputedStyle(h);
      return {
        text: (h.textContent ?? "").trim().slice(0, 30),
        fam: cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
        weight: cs.fontWeight,
        size: cs.fontSize,
      };
    }),
  );

  expect(
    headings.length,
    "there are section headings to check",
  ).toBeGreaterThan(1);

  const shapes = [
    ...new Set(headings.map((h) => `${h.fam} ${h.weight} ${h.size}`)),
  ];

  expect(
    shapes.join("\n"),
    `every h2 should be set the same way; got:\n${headings.map((h) => `${h.fam} ${h.weight} ${h.size}  ${h.text}`).join("\n")}`,
  ).toHaveLength(shapes[0].length);
});
