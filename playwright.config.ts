import { defineConfig, devices } from "@playwright/test";

/**
 * Three projects, because a portfolio is read on a laptop and on a phone and
 * the two behave differently in one way that matters: a phone never fires
 * :hover, and the project cards' actions used to live behind it.
 *
 * The desktop width is 1352 — the shipped default of a 14" MacBook Pro —
 * rather than a round 1280, because that is what people actually arrive on.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3111",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1352, height: 878 },
      },
    },
    { name: "android", use: { ...devices["Pixel 7"] } },
    { name: "iphone", use: { ...devices["iPhone 14"] } },
  ],

  webServer: {
    command: "npm run dev -- -p 3111",
    url: "http://localhost:3111",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
