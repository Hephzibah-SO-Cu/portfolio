import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const OUT = "e2e/.shots/modal";
await mkdir(OUT, { recursive: true });
const b = await chromium.launch();
for (const [w, h, touch] of [
  [1440, 900, false],
  [1024, 768, false],
  [390, 844, true],
]) {
  const ctx = await b.newContext({
    viewport: { width: w, height: h },
    ...(touch ? { hasTouch: true, isMobile: true } : {}),
  });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3111/", { waitUntil: "networkidle" });
  await p.locator("#projects [data-rail]").scrollIntoViewIfNeeded();
  await p.waitForTimeout(1600);
  // Framez is centred at rest; open it.
  const card = p
    .locator("#projects [data-rail] > div")
    .filter({ hasText: "FRAMEZ" })
    .first();
  if (touch) await card.locator(".card-touch-actions button").tap();
  else {
    await card.hover();
    await card.getByRole("button", { name: /case study/i }).click();
  }
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/framez-${w}.png` });
  console.log(`${w} framez`);
  await ctx.close();
}
await b.close();
