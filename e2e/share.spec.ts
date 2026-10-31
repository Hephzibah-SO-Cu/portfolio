import { expect, test } from "@playwright/test";

/**
 * What happens when the link is pasted somewhere.
 *
 * This page's entire metadata used to be a title and the words "Frontend &
 * Product Engineer", so a link in LinkedIn, WhatsApp or Slack came out as a
 * bare blue line of text. For a site whose job is being sent to people, the
 * unfurl is the first impression and there is no second one.
 *
 * The tags are only half of it: a meta pointing at a file that is not there
 * unfurls exactly like no meta at all, and nothing in a build complains. So
 * the image is requested too.
 */
test("the link unfurls with a card", async ({ page, request }) => {
  await page.goto("/");

  const meta = async (property: string) =>
    page
      .locator(`meta[property="${property}"], meta[name="${property}"]`)
      .first()
      .getAttribute("content");

  await expect
    .poll(() => meta("og:title"), "og:title")
    .toContain("Oluwabusayo Sina-Olulana");

  const description = await meta("og:description");
  expect(description, "og:description says what he does").toMatch(/Lagos/i);
  expect(
    (description ?? "").length,
    "og:description is long enough to be worth showing",
  ).toBeGreaterThan(60);

  expect(await meta("og:type"), "og:type").toBe("website");
  expect(
    await meta("twitter:card"),
    "a large card, not a thumbnail beside the text",
  ).toBe("summary_large_image");

  const image = await meta("og:image");

  expect(
    image,
    "og:image is absolute — a relative one cannot be fetched",
  ).toMatch(/^https?:\/\//);

  // The image a platform would actually go and ask for.
  const res = await request.get(image!);

  expect(res.status(), `${image} is served`).toBe(200);
  expect(res.headers()["content-type"], "og:image is an image").toMatch(
    /^image\//,
  );

  const bytes = (await res.body()).length;

  expect(bytes, "og:image is not an empty file").toBeGreaterThan(20_000);
  // LinkedIn stops at 5MB; well under it is also just good manners.
  expect(bytes, "og:image is small enough to be fetched quickly").toBeLessThan(
    2_000_000,
  );

  expect(await meta("og:image:width"), "declared width").toBe("1200");
  expect(await meta("og:image:height"), "declared height").toBe("630");
});
