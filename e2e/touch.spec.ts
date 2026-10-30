import { expect, test } from "@playwright/test";
import { centreCard, railCaption } from "./rail";

/**
 * A project card's Live Site / GitHub / View Details actions lived inside an
 * overlay with `opacity: 0` until `onMouseEnter`. A touch screen never fires
 * hover, so on every phone and tablet those actions were unreachable: the
 * case study could not be opened at all, and the only way to see a live site
 * was to already know the URL.
 *
 * This runs on the phone projects, where it would have failed.
 */
test.describe("a project's actions are reachable without a mouse", () => {
  test.beforeEach(() => {
    test.skip(
      test.info().project.name === "desktop",
      "this is about devices that cannot hover",
    );
  });

  test("the case study opens from a tap", async ({ page }) => {
    await page.goto("/");

    await centreCard(page, "Zowasel Marketplace");

    const details = railCaption(page).locator(".card-touch-actions button", {
      hasText: /view details/i,
    });
    await expect(details).toBeVisible();

    // WCAG 2.5.8 asks for 24px; the row is built to 44 so a thumb clears it.
    const box = await details.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(24);

    await details.tap();
    await expect(page.getByText("A storefront, not a dashboard")).toBeVisible();
  });

  test("the hover overlay is suppressed where hover does not exist", async ({
    page,
  }) => {
    await page.goto("/");

    const card = await centreCard(page, "Zowasel Marketplace");

    // Shown, it would sit over the screenshot permanently and never respond.
    await expect(card.locator(".project-overlay")).toBeHidden();
  });

  test("any project can be brought to the middle and acted on", async ({
    page,
  }) => {
    await page.goto("/");

    /*
      This used to assert that every card showed its actions at once. It no
      longer does, and should not: a rail of seven cards each carrying a
      title, a paragraph and three buttons is a wall, not a shelf. The
      guarantee that matters is that nothing is unreachable — scroll a
      project to the middle and it becomes actionable.
    */
    for (const title of ["CHEDCOM", "Zowasel Marketplace", "DLMS — CU"]) {
      await centreCard(page, title);

      await expect(
        railCaption(page).locator(".card-touch-actions button"),
        `${title} is actionable once centred`,
      ).toHaveCount(1);
    }
  });
});
