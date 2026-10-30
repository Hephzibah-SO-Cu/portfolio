import { expect, test } from "@playwright/test";
import { railCaption, settleRail } from "./rail";

/**
 * The rail moves sideways. A touchscreen swipes it and a trackpad has a
 * two-finger gesture, but an external mouse has no horizontal gesture at
 * all — its wheel scrolls the page straight past the work, and the rail
 * had nothing to click. Seven projects, five of them unreachable.
 *
 * So the rail carries three ways through it that need no gesture. Each is
 * tested here, because each is the only one some reader has.
 */
test.describe("the rail can be driven without a sideways gesture", () => {
  test.beforeEach(() => {
    test.skip(
      test.info().project.name !== "desktop",
      "this is about pointers that cannot swipe",
    );
  });

  const caption = (page: Parameters<typeof railCaption>[0]) =>
    railCaption(page).locator("h3");

  test("the next and previous buttons step through the work", async ({
    page,
  }) => {
    await page.goto("/");
    await settleRail(page);

    // The rail opens on Framez, the one mobile app, with three either side.
    await expect(caption(page)).toHaveText("Framez");

    await page.getByRole("button", { name: "Next project" }).click();
    await expect(caption(page)).toHaveText("HNG Connect");

    await page.getByRole("button", { name: "Previous project" }).click();
    await page.getByRole("button", { name: "Previous project" }).click();
    await expect(caption(page)).toHaveText("Zowasel Marketplace");
  });

  test("the buttons stop at the ends rather than wrapping silently", async ({
    page,
  }) => {
    await page.goto("/");
    await settleRail(page);

    const prev = page.getByRole("button", { name: "Previous project" });

    for (let i = 0; i < 4; i += 1) await prev.click({ force: true });

    await expect(caption(page)).toHaveText("CHEDCOM");
    await expect(prev).toBeDisabled();
  });

  test("clicking a card off to the side brings it to the middle", async ({
    page,
  }) => {
    await page.goto("/");
    await settleRail(page);
    await expect(caption(page)).toHaveText("Framez");

    await page.locator('#projects [data-rail] img[alt="HNG Connect"]').click();

    await expect(caption(page)).toHaveText("HNG Connect");
    // Moving to a project is not opening it.
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("clicking the card already in the middle opens its case study", async ({
    page,
  }) => {
    await page.goto("/");
    await settleRail(page);
    await expect(caption(page)).toHaveText("Framez");

    await page.locator('#projects [data-rail] img[alt="Framez"]').click();

    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("the arrow keys work while the pointer is merely over the rail", async ({
    page,
  }) => {
    await page.goto("/");
    await settleRail(page);
    await expect(caption(page)).toHaveText("Framez");

    /*
      Hover, do not click. A reader with a mouse has no reason to have
      clicked the rail first, and before this the keys only worked once it
      had focus.
    */
    await page.locator("#projects [data-rail]").hover();
    await page.keyboard.press("ArrowRight");

    await expect(caption(page)).toHaveText("HNG Connect");
  });
});
