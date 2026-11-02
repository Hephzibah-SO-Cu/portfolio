import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { centreCard, railCaption } from "./rail";

/**
 * WCAG 2.2 AA on the page and on the case-study modal. The modal is checked
 * separately because it is the part a reader spends the longest in and the
 * part no static check ever sees.
 */
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

function format(
  violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"],
) {
  return violations
    .map(
      (v) =>
        `${v.id} (${v.impact}): ${v.help}\n    ${v.nodes.map((n) => n.target.join(" ")).join("\n    ")}`,
    )
    .join("\n");
}

/**
 * Sections fade in on scroll, so a scan run too early sees half-transparent
 * text and reports contrast failures that are not real — and, worse, skips
 * anything still at opacity 0 and misses failures that are.
 *
 * Waiting for "nothing is mid-fade" does not work here: the hero holds a
 * watermark at a permanent 0.04 and a glow animating between 0.7 and 1
 * forever, so that condition is never true. The reveals are all 0.8s with at
 * most 0.15s of delay, so a bounded settle after the scroll is what makes
 * the scan deterministic.
 */
async function revealEverything(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
  });

  await page.waitForTimeout(1500);

  /*
    Deliberately NOT scrolled back to the top.

    It used to be, and that was the bug: a scroll reveal is tied to where
    the page is, so returning to the top put the last Where I've Worked
    entries back below the fold and part-way through their fade. axe then
    reported them as contrast failures — which, at that instant, they were.
    axe reads the whole document whatever the scroll position, so there is
    nothing to gain by rewinding and a real failure to invent.

    Then wait for the staggered entries themselves, rather than for a
    duration that happened to be long enough on two devices out of three.
  */
  await expect
    .poll(
      () =>
        page.evaluate(() =>
          [...document.querySelectorAll(".exp-entry")].every(
            (e) => Number(getComputedStyle(e).opacity) > 0.99,
          ),
        ),
      { timeout: 25_000, intervals: [200, 400, 600, 1000] },
    )
    .toBe(true);
}

/*
  Both of these are slow on purpose and need the room: an axe sweep of a whole
  page takes tens of seconds on its own, and the modal test first has to bring
  a card to the middle of the rail, which polls until the rail stops moving
  itself. Run three workers deep on a loaded machine and the 30s default is
  reached before anything has gone wrong — a timeout that reads, in the
  summary, exactly like an accessibility violation.
*/
test("the page has no accessibility violations", async ({ page }) => {
  test.slow();
  await page.goto("/", { waitUntil: "networkidle" });

  await revealEverything(page);

  const { violations } = await new AxeBuilder({ page })
    .withTags(TAGS)
    .analyze();
  expect(format(violations)).toBe("");
});

test("the case study modal has no accessibility violations", async ({
  page,
}, info) => {
  test.slow();
  await page.goto("/", { waitUntil: "networkidle" });

  const card = await centreCard(page, "Zowasel Marketplace");

  if (info.project.name === "desktop") {
    await card.hover();
    await card
      .getByRole("button", { name: /case study/i })
      .first()
      .click();
  } else {
    await railCaption(page).locator(".card-touch-actions button").tap();
  }

  await expect(page.getByText("A storefront, not a dashboard")).toBeVisible();
  await page.waitForTimeout(1500);

  const { violations } = await new AxeBuilder({ page })
    .withTags(TAGS)
    .analyze();
  expect(format(violations)).toBe("");
});
