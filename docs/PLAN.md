# Portfolio — findings, plan and decisions

The working record for this site. Modelled on `XZWFRONT/docs/marketplace/PLAN.md`,
for the same reason: a chat window forgets, and a document does not.

Dates are WAT (UTC+1). Busayo's screen is **1270 x 593 CSS pixels** — a 1920
monitor at Windows 150% scaling — and that is the width everything here is
checked at, not 1920.

Last updated: 31 October 2026. Phase 1 complete; Phase 2 next.

---

## Where this stands

Three commits on `master`, **none pushed**. The site is not live yet. Delivery
is no longer time-boxed (Busayo, 30 Oct: "i'm not making delivery time based
anymore for now, i just want us to do very good/proper work").

Done this session, verified and committed:

- The hero scales from a 1440 reference instead of stepping at breakpoints;
  "Lagos, Nigeria" no longer hides behind the navbar on short screens.
- Selected Work is a position-driven rail: whichever card reaches the middle
  comes forward, and one caption below the rail changes with it.
- The rail can be driven without a sideways gesture — buttons, click-to-centre,
  arrow keys on hover — because an external mouse has no horizontal gesture and
  five of seven projects were unreachable with one.
- One `--section-y` rhythm for the whole page, replacing six hand-set paddings.
- Two paragraphs moved out of About into Beyond Code and Contact.
- `prefers-reduced-motion` honoured in both CSS and Framer Motion.

---

## The WWAD check (30 October)

"What would Apple do", as defined for the marketplace in
`XZWFRONT/docs/marketplace/PLAN.md` item 8: **text, elements and images that
explain themselves, so users need little help finding their way.** Not "make it
look like Apple" — the editorial look, the square corners and the cream palette
are deliberate and stay.

Apple's pages were read at 1270 x 593 on 30 Oct. Three principles worth taking:

1. **One primary action, one secondary, always the same two shapes**, repeated
   identically down the whole page, so you learn it once.
2. **The name is the headline.** Product name, one line of what it is, one line
   of when, two buttons. In that order, every time.
3. **Every claim carries its number.** `14.2" or 16.3"`, `From $2899` — never
   "a beautiful display".

### Findings

Ranked by severity. Status is kept current.

| # | Finding | Evidence | Status |
|---|---|---|---|
| 1 | **The case study dialog clipped its own content unreachably.** On a 593px-tall window the dialog was 557px and its content 828px. The live-site link (y=755) and the "1 of 6" screenshot dots (y=812) were cut off, with no scrollbar; a mouse wheel moved `scrollTop` 0px across ten events. | Measured, and confirmed by Busayo on his own screen (screenshots 103–105, 30 Oct). | **Fixed 30 Oct.** See decisions log. |
| 2 | **The navbar fails WCAG AA on every section of the site.** Best case 3.36:1 against a 4.5:1 requirement for 12px text; 1.42–1.80:1 over the three dark sections, where it is effectively invisible. | Composited pixels sampled behind the pill at seven scroll positions, contrast computed against the real text colours. Table below. | **Open.** Needs Busayo's call — hands off the navbar stands. |
| 3 | **Nobody's name is legible on the first screen.** `BUSAYO` renders at 203px **at opacity 0.04**. The tab title carries the full name; the nav says "HO."; the headline says "Software Engineer". | Computed styles read from the live page. | **Open.** |
| 4 | **Nothing unfurls when the link is shared.** `metadata` has `title` and `description` only — no `openGraph`, no image. On LinkedIn or WhatsApp it is a bare blue link. | `src/app/layout.tsx`. | **Open.** |
| 5 | **Six of seven projects carry no number.** Only Framez has one ("Built in 72 Hours"). The rest are categories: Current Work, Shipped, Ongoing Work, Team Collaboration, Premium Ecommerce, Final Year Project. Zowasel Marketplace is the largest thing here and its label is "Current Work". | `src/lib/data/projects.ts`, `exhibitLabel`. | **Open.** |
| 6 | **"View Details" means two different things.** In Experience it expands the row in place (`↓`, toggling to "Hide Details"); in Selected Work it opens a dialog. Same words, same weight, different outcome. | `Experience.tsx:274`, `Projects.tsx`. | **Open.** |
| 7 | **Two arrow glyphs on two adjacent buttons.** `View Work ↗` and `Get In Touch →`. `↗` conventionally means "leaves the site"; neither does. | Hero. | **Open.** |
| 8 | **A hard seam between the hero and About.** The hero gradient ends on `#E7DDD1`; the section beneath is `#F5F0E8`. Sampled down the page edge: `y=20 rgb(227,217,205)` then `y=40 rgb(245,240,232)` — a 23-point step in one row. | Pixel sample. | **Open.** |
| 9 | **Beyond Code and Contact are two different darks 8 points apart** (`#141414` and `#1C1C1A`) — too close to read as a choice, too far to be one block. | Section backgrounds. | **Open.** |
| 10 | **Four consecutive cream sections**, ~2,700px of identical `#F5F0E8` (About, marquee, Selected Work, Experience), so the middle of the page has no sense of progress. | Measured section heights. | **Open.** |
| 11 | **Colours outside the token set are live in the Hero**: `#C7A06A` (a gold, in two places) and `#6B5D4F`. Busayo, 30 Oct: the gold was ChatGPT's invention and was never the palette. | `Hero.tsx:117, 214, 378, 385`. | **Open.** |
| 12 | **The hero's three callouts argue with the line above them.** Subtitle says "Building web, mobile and full-stack products"; the callouts are Visual Storytelling / Live Production / Systems Thinking, two of which are not software. May be deliberate now that Beyond Code makes the same argument — worth being a decision rather than a leftover. | Hero. | **Open, Busayo's call.** |
| 13 | **"Scroll To Explore"** is an instruction where a cue would do. Apple shows a sliver of the next section instead. | Hero. | **Open, low.** |
| 14 | **Nothing on the page can be verified by a stranger** — no reference, no named colleague, no quote. The marquee shows tools, not people. Only worth adding **if real**: invented testimonials are already a problem to clean up on the Zowasel website. | — | **Open, Busayo's call.** |

**Checked and fine:** `public/cv.pdf` exists, dated 29 Oct.

### Navbar contrast, measured 30 Oct

Composited pixel behind the pill, versus the real text colours
(`--charcoal` #1C1C1A for the logo, `--warm-grey` #6B6560 for links and icons).

| navbar over | pill renders as | logo | links + icons |
|---|---|---|---|
| Hero | `rgb(80,79,77)` | 2.09 | **1.42** |
| About | `rgb(197,192,185)` | 9.44 | **3.18** |
| Tech marquee | `rgb(193,192,191)` | 9.40 | **3.16** |
| Selected Work | `rgb(199,198,192)` | 9.97 | **3.36** |
| Experience | `rgb(200,195,189)` | 9.75 | **3.28** |
| Beyond Code | `rgb(79,77,75)` | 2.03 | **1.46** |
| Contact | `rgb(66,64,62)` | 1.65 | **1.80** |

AA needs 4.5:1 for text under 24px. The links are 12px.

The cause is structural, not a tuning problem. The pill is white translucency
with a white rim and a white inset highlight — built for a dark backdrop — and
the text inside it is dark grey, built for a light one:

```ts
background: "rgba(255,255,255,.06)"
border:     "1px solid rgba(255,255,255,.18)"
boxShadow:  "inset 0 1px rgba(255,255,255,.15)"
color:      "var(--warm-grey)"              // #6B6560
```

It only ever worked over the hero portrait, which is mid-tone, and stopped
working there too when the portrait was capped to 80vh on 30 Oct. axe does not
catch it because axe cannot compute contrast through a translucent layer over
an image.

---

## The design-language audit (30 October)

Apple's consistency is a closed set of values plus components that are the only
way to emit them. Ours, counted:

| | ours | target |
|---|---|---|
| distinct `fontSize` values | **21** | 7 |
| distinct `letterSpacing` values | **11** | 3 |
| hard-coded colour literals | **~30** | 0 |
| inline `style={{…}}` blocks | **142** | — |
| shared CSS classes | **25** | — |

Four headline clamps exist within 0.25rem of each other — `clamp(1.5rem,
2.5vw, 3rem)`, `clamp(1.5rem, 5vw, 2.5rem)`, `clamp(1.6rem, 2.4vw, 2.5rem)`,
`clamp(1.5rem, 2.6vw, 2.25rem)` — four ways to say "section heading".
`0.6/0.65/0.7/0.75rem` are all one label; `0.85/0.875/0.9/0.95rem` are all one
small text.

`#F5F0E8` is written out four times and is `--cream`, which already exists.
`rgba(245, 240, 232, …)` is cream again at seven opacities; `rgba(28, 28, 26,
…)` is charcoal at five. `rgba(245,240,232,0.92)` and `rgba(245, 240, 232,
0.92)` are the same colour spelled two ways, so grep cannot pair them.

And `src/components/ui/Button.tsx` already exports exactly the right API —
`variant: "filled" | "outline"`, `size: "sm" | "md"`, `showArrow` — and
**exactly one file imports it**. The other eight that render buttons hand-roll
an inline style object each time.

---

## Plan of action

Six phases in dependency order. Nothing is pushed until the whole thing is
done — Busayo, 30 Oct: "i want us to push when we've actually gone". Each
phase ends with the suite green, the page rendered and looked at, and a
commit.

### How Apple's three principles map onto the phases

The WWAD study is not a separate workstream; it is what the phases are *for*.
Each principle lands somewhere specific, and nowhere does it mean copying the
look — the square corners, the cream palette and the editorial type stay.

| Apple principle | Where it lands here |
| --- | --- |
| One primary action, one secondary, always the same two shapes | **Phase 2.4** — adopting the `Button` component makes the shape unforgeable, and retires the `↗`/`→` split and the two meanings of "View Details" |
| The name is the headline | **Phase 4.3** — the name legible on the first screen, where today it is 203px at 4% opacity |
| Every claim carries its number | **Phase 4.2** — six of seven project labels are categories, not evidence |
| A closed set of values, emitted only through components | **Phase 2** in full, and the test in 2.5 that keeps the set closed |
| Nothing on the page needs explaining | **Phase 1** (things that were simply broken) and **Phase 3** (a navbar you cannot read is a navigation you cannot use) |

---

### Phase 1 — things that are broken  ✅ complete

1. ~~The dialog clipping its own content unreachably (finding 1).~~ **Done 30 Oct.**
2. ~~The hero gradient ending on a colour the page does not use (finding 8).~~ **Done 30 Oct.**
3. ~~Every raster to WebP.~~ **Done 30 Oct**, 6.48 MB to 1.13 MB.
4. ~~The rail dropping rapid taps.~~ **Done 30 Oct.**
5. ~~The two stray colours (finding 11).~~ **Done 31 Oct — Phase 1 is
   closed.** `#6B5D4F` became `--warm-grey`: a
   near-miss at distance 18.8, and 5.60:1 to 5.06:1 on cream, both passing AA.
   `#C7A06A` **awaits Busayo** — a genuinely different colour, 56.9 from
   `--accent`, used for the LAGOS hairline, the GET IN TOUCH border and that
   button's 8% hover fill, and *more* legible on the dark hero than `--accent`
   is (7.60:1 against 5.10:1), which is probably why it survived. Either name
   `#C7A06A` was folded into `--accent` rather than kept: it scores 2.14:1
   on cream, under even the 3:1 non-text bar, so it could never have been
   the site's accent. See the decisions log.

**Verified by:** the suite, `e2e/images.mjs`, and a pixel sample across each seam.

---

### Phase 2 — the token layer

This comes before everything else because every later phase spends it. The
visual output should be *nearly identical* when it is finished; that is the
point. It collapses near-misses onto their nearest real value — it is not a
redesign.

**2.1 Close the type scale — 21 sizes to 7.** Define `--t-display`,
`--t-hero`, `--t-h2`, `--t-lead`, `--t-body`, `--t-small` and `--t-label` in
`globals.css`, then replace in this order so each step can be looked at on its
own:

- the four section-heading clamps that land within 0.25rem of each other —
  `clamp(1.5rem, 2.5vw, 3rem)`, `clamp(1.5rem, 5vw, 2.5rem)`,
  `clamp(1.6rem, 2.4vw, 2.5rem)`, `clamp(1.5rem, 2.6vw, 2.25rem)` — with `--t-h2`;
- `0.6 / 0.65 / 0.7 / 0.75rem` with `--t-label`. Dropping `0.6rem` is a bonus:
  at 9.6px it was borderline unreadable anyway;
- `0.85 / 0.875 / 0.9 / 0.95rem` with `--t-small`;
- `1rem` with `--t-body`, `1.125rem` with `--t-lead`.

**2.2 Three letter-spacings, each tied to a role.** `0.18em` for an eyebrow
label, `0` for body, `-0.04em` for display. Eleven exist today, with
`0.08 / 0.1 / 0.12 / 0.15 / 0.2 / 0.25em` all doing "uppercase label".

**2.3 Every colour through a token, opacity steps included.** `#F5F0E8` is
`--cream` written out four times; `rgba(245,240,232, …)` is cream again at
seven opacities and `rgba(28,28,26, …)` is charcoal at five. Naming the steps
(`--cream-70`, `--ink-12`) makes "cream at 55%" one word, and removes the pair
that differ only by a space — which grep cannot currently pair.

**2.4 Adopt the `Button` that already exists.** `src/components/ui/Button.tsx`
exports `variant: "filled" | "outline"`, `size: "sm" | "md"` and `showArrow`,
and exactly one of the nine files that render buttons imports it. Bringing the
other eight across is what makes the primary/secondary shape unforgeable, and
it closes findings 6 and 7 as a side effect: the arrow glyph stops being a
per-call-site choice, and "View Details" can only mean one thing once it is
one component.

**2.5 A test that keeps the set closed.** `e2e/tokens.spec.ts` walks every
element on the page, reads computed `font-size`, `letter-spacing` and `color`,
and asserts each is in the token set, naming the offending selector on
failure. Without it the ladder drifts back within a month. The marketplace
lesson applied: the guarantee is a test, not a constant.

**Verified by:** the new token test, the full suite, and a before/after
screenshot of every section at 1270 — the two should be hard to tell apart.

---

### Phase 3 — the navbar

**Unblocked 30 Oct** (Busayo: "yes we're touching the navbar but not the
height please"). The height stays 52px and `--nav-h` / `--nav-safe` do not
move, so nothing that lays itself out against the top of the viewport has to
be re-checked.

The problem is structural, not a tuning job: the pill is white translucency
with a white rim and a white inset highlight — built for a dark backdrop —
carrying dark grey text built for a light one. It passes nowhere.

1. The navbar observes which section is beneath it, via an
   `IntersectionObserver` reading a `data-tone="light" | "dark"` attribute the
   sections declare — so the tone is a property of the section rather than a
   list of ids kept inside the navbar, which would go stale the first time a
   section is added.
2. Two treatments. On a light backdrop: dark text as today, a cream-tinted
   pill, and a dark hairline rim instead of a white one. On a dark backdrop:
   cream text and icons, a dark-tinted pill, and the white rim it was designed
   for.
3. Both cross the AA line for 12px text with margin, rather than landing on it.
4. The change rides the existing `0.4s ease` and is suppressed under
   `prefers-reduced-motion` like everything else.

**Verified by:** a new `e2e/navbar-contrast.spec.ts` that samples the
composited pixel behind the pill at every section and fails under 4.5:1. The
existing axe run cannot do this — it cannot compute contrast through a
translucent layer over an image, which is exactly why this shipped unnoticed.

---

### Phase 4 — what the page actually says

1. **`openGraph` and a share image.** Today the metadata is a title and
   `description: "Frontend & Product Engineer"`, so the link unfurls as a bare
   blue link. Highest payoff per line on the whole list for a site whose job
   is being sent to people, and it must be live **before the URL goes to a
   single person** — a first impression is not re-rollable. Needs `openGraph`
   and `twitter` blocks plus a 1200x630 image; `opengraph-image.tsx` can
   generate it from the hero so it never goes stale.
2. **A number on every project label.** Six of seven are categories: Current
   Work, Shipped, Ongoing Work, Team Collaboration, Premium Ecommerce, Final
   Year Project. Only Framez carries evidence ("Built in 72 Hours") — which is
   why Framez currently reads as more impressive than the marketplace. Zowasel
   Marketplace is the largest thing here and needs a figure Busayo will stand
   behind. The numbers come from him; none are invented.
3. **The name legible on the first screen.** `BUSAYO` is 203px at opacity
   0.04, and the tab title is the only other place the full name appears. The
   watermark stays — the fix is that it stops being the only one.
4. **The hero callouts become a decision** (finding 12), now that Beyond Code
   makes the same argument deliberately.
5. **"Scroll To Explore" becomes a cue** rather than an instruction (finding 13).

**Verified by:** the deployed URL through a card validator, plus the content tests.

---

### Phase 5 — the page's tonal rhythm

Design calls, so they wait for Busayo.

1. Beyond Code `#141414` and Contact `#1C1C1A` are 8 points apart — too close
   to read as a choice, too far to be one block (finding 9).
2. About, the marquee, Selected Work and Experience are ~2,700px of identical
   `#F5F0E8` (finding 10). Apple alternates two near-whites constantly for
   exactly this reason.
3. Finding 14, something a stranger can verify — **only if real**. Invented
   testimonials are already a problem to clean up on the Zowasel website, and
   the same mistake here would be worse.

---

### Phase 6 — ship

1. Push to `master`, which deploys to Vercel.
2. Confirm the live build matches local at 1270x593, and on a real phone.
3. Re-run `e2e/links.mjs` against the deployed URL rather than localhost.
4. Only then does the link go to anybody.

## Decisions log

Newest first.

| Date | Decision | Why |
| --- | --- | --- |
| 2026-10-31 | **One accent. The gold is gone.** `#C7A06A` is replaced by `--accent` in all three places it appeared — the hairline under LAGOS, NIGERIA, the GET IN TOUCH border, and that button's 8% hover fill, which becomes `rgba(196,113,74,.08)`. Phase 1 is closed. | Busayo delegated the call: "if the gold doesn't flow with the cream, replace it with something that does". It does not, and the number says so plainly — **2.14:1 on cream, under even the 3:1 non-text bar**, so it could never appear on a cream surface and was always going to be a hero-only exception needing its own rule. `--accent` works on both surfaces (3.19 on cream, 5.10 on near-black) and already has a cream-safe text sibling in `--accent-ink` at 5.13. The earlier argument for keeping the gold — 7.60:1 on near-black against `--accent`'s 5.10 — turned out not to apply to anything: all three uses are a rule, a border and a fill, none of them text, so the bar is 3:1 and both clear it. Two colours were doing one job in a single eyeful: the full stop after "Engineer" was terracotta while the button border 200px away was gold. |
| 2026-10-30 | **The navbar may be changed, but not its height.** Busayo: "yes we're touching the navbar but not the height please". 52px stands, and so do `--nav-h` and `--nav-safe`, so nothing that lays itself out against the top of the viewport has to be re-checked. This lifts the hands-off rule for colour and contents only. | The height is load-bearing in a way the colours are not: the hero reads `--nav-safe` to keep "Lagos, Nigeria" clear of the pill, and that was a real bug once already. |
| 2026-10-30 | **`#6B5D4F` becomes `--warm-grey`; `#C7A06A` is left for Busayo.** The brown sat 18.8 from `--warm-grey` — a drift, not a decision — and the swap moves "Scroll To Explore" from 5.60:1 to 5.06:1 on cream, both over AA. The gold is 56.9 from `--accent`, which is a different colour rather than a near-miss, and it is the border of GET IN TOUCH, the hairline under LAGOS, NIGERIA, and that button's 8% hover fill. | Busayo, 30 Oct, said the gold was ChatGPT's invention and never the palette. Both things are true at once: it was never chosen, and it is the most visible accent in the hero. A 2x crop shows the full stop after "Engineer" in `--accent` terracotta beside a gold button border 200px away — two colours doing one job. It is also *more* legible on near-black than `--accent` (7.60:1 against 5.10:1), so replacing it is a trade and not a cleanup. |
| 2026-10-30 | **Nothing is pushed until all six phases are done.** | Busayo: "i want us to push when we've actually gone". The earlier recommendation to deploy first and keep improving is withdrawn. |
| 2026-10-30 | **Every raster is WebP, and nothing picks its own format any more.** 42 PNG/JPEG files, 6.48 MB, became 1.13 MB — 82.6% smaller, `public/` 8.6 MB to 3.3 MB. Each file was encoded twice, lossless and quality 82, and the smaller of the two kept, which is why the flat marquee logos are lossless and the photographs are not; a file was only replaced if the WebP actually came out smaller. The five `beyond/` images were renamed to kebab-case on the way through, because `/beyond/After Hours.jpg` was shipping a space in a URL. `TechMarquee` carried `logo === "javascript" \|\| logo === "supabase" ? "jpg" : "png"` — a hard-coded list of which two logos happened to be JPEG, so a logo added in any other format silently 404'd. One extension now. A new check, `e2e/images.mjs`, walks the whole page and opens a case study, then fails on any image request over 400 or any `<img>` that decoded to nothing. | Busayo, 30 Oct: "all the big sized images on this portfolio site, convert them to webp… i dont want my site to be loading things slow". The check exists because a wrong `src` in `next/image` is silent: the box keeps its space and renders nothing, so a page that has lost half its pictures still looks structurally fine in a screenshot taken from the top. |
| 2026-10-30 | **Stepping through the rail queues.** The Next and Previous buttons and the arrow keys used to read `centeredIndex`, which follows the scroll POSITION — and the scroll is smooth, so two quick taps both read the same index, both asked for the same card, and the second tap did nothing. There is now a `target` state set with a functional updater, so a second tap composes onto the first one's result even inside the same React batch. It is cleared when the rail arrives (adjusted during render, not in an effect) and when the reader takes over the scrolling by wheel or pointer. A ref was tried first and rejected by the React Compiler's immutability rule — correctly, since a ref could not have composed within a batch either. | Found by `e2e/rail-mouse.spec.ts`, which clicks Previous four times in a row. It read as a flaky test and was a real defect: anyone tapping the arrows at speed got fewer cards than taps. |
| 2026-10-30 | **The suite's timeout is 60s, not the 30s default**, with `test.slow()` on the two axe sweeps. Two failures chased in this session were both timeouts, not regressions: tests that take 7-10s alone reach 30s three workers deep on a loaded machine, and a timeout reads in the summary exactly like a real failure. | Every spec here waits on a page that is genuinely animating — the rail re-centres itself once its images load, and a card has to be polled to the middle before it can be acted on. |
| 2026-10-30 | **The case study dialog scrolls.** `.project-dialog` becomes a flex column and `.project-dialog-grid` a `flex: 1 1 auto; min-height: 0` child. The first attempt — changing `grid-template-rows: none` to `minmax(0, 1fr)` — was correct about the row and **did not fix it**, which is recorded here because it is the interesting half: the grid carried `height: 100%` against a parent that had only a `max-height`, and a max-height does not make a height definite, so the grid resolved to `auto`, its row to max-content, and the dialog clipped 271px of itself with `overflow: hidden`. A definite height on the parent is what makes the copy column's own `overflow-y: auto` engage. The copy column is now `tabIndex={0}` with `role="region"`, because making a pane scrollable makes it a scrollable region and axe caught it immediately — the same violation the Selected Work rail had after its cards became images. | Busayo, 30 Oct: "either the new modal you did isnt working or it's just shit… i cant even scroll down to see the other details". He was right, and it was worse than a WWAD nitpick: the live-site link and the repo link — the most valuable action on a portfolio — were unreachable on his own screen. It was invisible at 900px tall, which is why it shipped. |
| 2026-10-30 | **Findings get written down, in this repo.** A chat window compacts; this does not. Modelled on the marketplace plan because that pattern has already survived a month of compactions. | Busayo, 30 Oct: "i hope the details of these findings that you're making are being recorded". They were not. |
| 2026-10-30 | **Delivery stops being time-boxed.** | Busayo, 30 Oct: "5pm has passed but i'm not making delivery time based anymore for now, i just want us to do very good/proper work". |
| 2026-10-30 | **Apple is read for its discipline, not its skin.** Square corners, the cream palette and the editorial type stay. What transfers is the closed value set, one primary action shape, and a number under every claim. | Copying pills and SF Pro would be copying the surface of the thing that makes Apple consistent, instead of the thing itself. |
| 2026-10-30 | **The rail is driveable without a sideways gesture**, via buttons, click-to-centre and arrow keys on hover — and the wheel is deliberately **not** hijacked. | A mouse has no horizontal gesture, so five of seven projects were unreachable with one. Hijacking the wheel would fight the reader every time they scroll down the page. |
| 2026-10-30 | **Card sizes are derived from a measurement, not a guess**: the rail at 200% browser zoom, doubled. The vw terms topped out near 2040px, so every ordinary laptop was served the middle of the clamp. | Busayo's reference screenshot at 200%. The lesson is the same one as the hero audit: check against the width the user actually has, not the one the monitor advertises. |

---

## Standing notes

- **Busayo's viewport is 1270 x 593**, not 1920 x 1080. Audit there first.
- Real device widths matter more than three convenient test widths; a 1024px
  bug was missed that way once already on the marketplace.
- Never quote the shell clock at him — it runs about 2h39m ahead of WAT.
- The site is checked by rendering and looking at it, not by reasoning about
  the CSS.
