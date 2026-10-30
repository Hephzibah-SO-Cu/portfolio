import { Page, expect } from "@playwright/test";

/**
 * Prominence in the Projects rail follows position, not the pointer: the
 * card nearest the middle is the one that scales up, and the rail's single
 * caption below it shows that project's title, description and actions.
 *
 * So a test that wants to act on a particular project has to bring it to
 * the middle first, exactly as a reader would. Cards carry no text of
 * their own any more, so a card is identified by its screenshot's alt.
 */
export function cardFor(page: Page, title: string) {
  return page
    .locator("#projects [data-rail] > div")
    .filter({ has: page.locator(`img[alt="${title}"]`) })
    .first();
}

export function railCaption(page: Page) {
  return page.locator("[data-rail-caption]");
}

/**
 * Wait until the rail has stopped moving itself.
 *
 * It centres on Framez once on mount and AGAIN once the card images have
 * loaded, because the cards report stale widths until then. Anything that
 * moves the rail in between gets yanked straight back — which is a race a
 * reader can lose too, but only for the first second of the page.
 */
export async function settleRail(page: Page) {
  const rail = page.locator("#projects [data-rail]");
  await rail.scrollIntoViewIfNeeded();

  await expect(railCaption(page).locator("h3")).not.toBeEmpty();

  await expect
    .poll(
      async () => {
        const read = () =>
          page.evaluate(
            () => document.querySelector("#projects [data-rail]")!.scrollLeft,
          );

        const first = await read();
        await page.waitForTimeout(250);

        return (await read()) === first;
      },
      { timeout: 10_000, intervals: [250, 500, 750] },
    )
    .toBe(true);
}

export async function centreCard(page: Page, title: string) {
  const rail = page.locator("#projects [data-rail]");
  await rail.scrollIntoViewIfNeeded();

  /*
    Wait for the rail to finish centring ITSELF before moving it. It centres
    on Framez once on mount and again when the card images have loaded — so
    a scroll issued before that second pass gets yanked straight back.
  */
  await expect(railCaption(page).locator("h3")).not.toBeEmpty();

  await expect
    .poll(
      async () => {
        await page.evaluate((wanted) => {
          const el = document.querySelector("#projects [data-rail]");

          if (!el) throw new Error("no rail");

          const target = Array.from(el.children).find(
            (child) =>
              child.querySelector("img")?.getAttribute("alt") === wanted,
          ) as HTMLElement | undefined;

          if (!target) throw new Error(`no card for ${wanted}`);

          el.scrollLeft =
            target.offsetLeft - el.clientWidth / 2 + target.offsetWidth / 2;
        }, title);

        /*
          Two things can pull the rail back after we move it: scroll-snap,
          and the component's own re-centre once the card images finish
          loading. So require the position to HOLD — sample scrollLeft,
          wait, sample again — rather than just be right for an instant.
        */
        const first = await page.evaluate(
          () => document.querySelector("#projects [data-rail]")!.scrollLeft,
        );
        await page.waitForTimeout(250);
        const second = await page.evaluate(
          () => document.querySelector("#projects [data-rail]")!.scrollLeft,
        );

        const shown =
          (await railCaption(page).locator("h3").textContent()) ?? "";

        return first === second && shown.trim() === title;
      },
      { timeout: 12_000, intervals: [250, 500, 750, 1000] },
    )
    .toBe(true);

  return cardFor(page, title);
}
