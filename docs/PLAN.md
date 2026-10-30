# Portfolio — findings, plan and decisions

The working record for this site. Modelled on `XZWFRONT/docs/marketplace/PLAN.md`,
for the same reason: a chat window forgets, and a document does not.

Dates are WAT (UTC+1). Busayo's screen is **1270 x 593 CSS pixels** — a 1920
monitor at Windows 150% scaling — and that is the width everything here is
checked at, not 1920.

Last updated: 30 October 2026.

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

Five phases, in dependency order. Each ends with the suite green and a commit.
Nothing is pushed until Busayo says so.

### Phase 0 — the record (done)

This document. Everything above was only ever in a chat window that compacts.

### Phase 1 — bugs a visitor hits

Things that are broken, not opinions about them.

1. ~~The dialog clipping its own content (finding 1).~~ **Done 30 Oct.**
2. The hero-to-About seam (finding 8) — the gradient terminus is the wrong
   colour. One line.
3. The stray gold and brown in the Hero (finding 11) — decide whether they are
   palette or accident, then either name them as tokens or remove them.

### Phase 2 — the token layer

The system has to exist before anything can be made consistent *to* it, and
every later phase spends it.

1. **Close the type scale** — 21 sizes to 7 named tokens, absorbing the
   near-misses. Visual output should be near-identical; that is the point.
2. **Three letter-spacings**, each tied to a role: label, body, display.
3. **Every colour through a token**, opacity steps included, so "cream at 55%"
   is one name and not seven spellings.
4. **Adopt the Button that already exists** — 1 of 9 files to 9 of 9. This also
   closes findings 6 and 7 for free: one primary shape, one arrow glyph, because
   the glyph lives inside the component instead of at each call site.
5. **A test that keeps it true** — read every computed font-size, letter-spacing
   and colour on the page and assert the set is a subset of the tokens, naming
   the offending selector on failure. The marketplace lesson: the guarantee is a
   test, not a constant.

### Phase 3 — the navbar

Blocked on Busayo's decision, because "you were not meant to shrink the navbar"
stands until he lifts it. The work itself: the pill and its contents read which
section is under them and switch between a light and a dark treatment, with a
contrast test over all seven sections so it cannot regress.

### Phase 4 — what the page says

1. `openGraph` and a share image (finding 4) — highest payoff per line on the
   whole list, for a site whose job is being sent to people.
2. Numbers on the project labels (finding 5), starting with Zowasel Marketplace.
3. The name legible on the first screen (finding 3).
4. The hero callouts: decision, not leftover (finding 12).
5. "Scroll To Explore" becomes a cue (finding 13).

### Phase 5 — the page's tonal rhythm

Findings 9 and 10 — the two near-identical darks, and the four consecutive
creams. Design decisions, so they wait for Busayo.

---

## Decisions log

Newest first.

| Date | Decision | Why |
| --- | --- | --- |
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
