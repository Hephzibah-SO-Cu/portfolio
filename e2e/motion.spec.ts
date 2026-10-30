import { expect, test } from "@playwright/test";

/*
  prefers-reduced-motion was named in AGENTS.md and DESIGN_SYSTEM.md and
  implemented nowhere: the page ran a 12s looping watermark drift, an 8s
  pulsing glow and an infinite logo marquee regardless of the setting.

  Two mechanisms had to be covered, because they are different systems:
  the CSS keyframe animations, and Framer Motion's JavaScript-driven loops,
  which no stylesheet can reach. These tests fail if either regresses.
*/
test.describe("reduced motion is honoured", () => {
  test.use({ reducedMotion: "reduce" });

  test("the logo marquee stops animating", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const name = await page.evaluate(() => {
      const el = document.querySelector(".marquee-track");
      return el ? getComputedStyle(el).animationName : null;
    });

    expect(name === "none" || name === "").toBe(true);
  });

  test("the hero's looping motion settles instead of running forever", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);

    const watermark = page.locator("#home h1").first();

    const sample = async () =>
      watermark.evaluate((el) => getComputedStyle(el).transform);

    const first = await sample();
    await page.waitForTimeout(1500);
    const second = await sample();

    // Framer Motion's reducedMotion="user" drops transform animations.
    expect(second).toBe(first);
  });
});

test("without the preference, the marquee still moves", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  /*
    No scrollIntoViewIfNeeded here: it waits for the element to be stable,
    and a marquee that is working correctly never is. Read the computed
    style straight off the node instead.
  */
  const name = await page.evaluate(() => {
    const el = document.querySelector(".marquee-track");
    return el ? getComputedStyle(el).animationName : null;
  });

  expect(name).not.toBe("none");
  expect(name).not.toBeNull();
});
