import { expect, test } from "@playwright/test";
import { centreCard, railCaption } from "./rail";

/**
 * The portfolio's job is to say what the last four months were. Until 29 Oct
 * 2026 it did not mention Zowasel anywhere, which a recruiter reads as a gap
 * rather than as an omission. These tests fail if that regresses.
 */

test("Zowasel is in Where I've Worked, and it is the entry that opens", async ({
  page,
}) => {
  await page.goto("/");

  const experience = page.locator("#experience");
  await experience.scrollIntoViewIfNeeded();

  await expect(experience.getByText("Zowasel.com Limited")).toBeVisible();
  await expect(
    experience.getByRole("heading", { name: "Frontend Software Engineer" }),
  ).toBeVisible();

  // The newest role is the one already expanded, so the first thing read is
  // the current work and not an internship from 2022.
  await expect(
    experience.getByText(/sole frontend engineer on the company's B2B/i),
  ).toBeVisible();
});

test("the marketplace and the website are both in Selected Work", async ({
  page,
}) => {
  await page.goto("/");

  /*
    Only the centred card carries a visible caption, so "is it on the page"
    is now "can it be brought to the middle".
  */
  await centreCard(page, "Zowasel Marketplace");
  await centreCard(page, "Zowasel.com");
});

test("the case study opens and leads with the decisions, not the features", async ({
  page,
}) => {
  await page.goto("/");

  const card = await centreCard(page, "Zowasel Marketplace");

  /*
    The hover overlay is suppressed under @media (hover: none), so on the
    phone projects the only way in is the touch actions row — which is the
    whole point of that row. Driving hover here passed by accident before
    the overlay was suppressed and would have hidden the regression.
  */
  if (test.info().project.name === "desktop") {
    await card.hover();
    await card
      .getByRole("button", { name: /view details/i })
      .first()
      .click();
  } else {
    await railCaption(page).locator(".card-touch-actions button").tap();
  }

  const dialog = page.locator("text=A storefront, not a dashboard");
  await expect(dialog).toBeVisible();

  for (const heading of [
    "Tokens generated, not written",
    "One core, two apps",
    "What I said no to",
    "How it was tested",
    "What I would do differently",
  ]) {
    await expect(page.getByText(heading, { exact: true })).toBeVisible();
  }

  // The thread the whole study hangs on.
  await expect(page.getByText(/719 hardcoded colour values/)).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("the website card points at the live site, nothing points at a private repo", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#projects").scrollIntoViewIfNeeded();

  const hrefs = await page
    .locator("#projects a")
    .evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href));

  expect(hrefs.some((h) => h.startsWith("https://zowasel.com"))).toBe(true);

  // The marketplace and website repos are private; linking them would 404
  // for every visitor.
  expect(
    hrefs.filter((h) => /github\.com\/.*(XZWFRONT|zowasel-website)/i.test(h)),
  ).toEqual([]);
});
