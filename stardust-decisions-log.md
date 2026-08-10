# Stardust decisions log

Findings and decisions made during the Stardust redesign pipeline, kept
up to date as work proceeds. Reverse-chronological.

---

## 2026-08-10 — Post-render correction: "product-finder" was real content, not a widget

**What happened.** The third and last placeholder box in the prototype
(labeled `product-finder`, right below the hero) was misclassified all
the way back at `extract` time. User identified it as the "Wir sind
für Sie da." quick-access section — a 4-tile accent-colored row
(Schaden melden / Prämie berechnen / Kontakt aufnehmen / Online-
Services nutzen) plus a 2-tile plain row (E-Banking / Kundenportal)
below — the page's primary task navigation, confirmed legible in
`evidence/before/Versicherung-und-Vorsorge-für-Privatkunden-Helvetia-ch-08-10-2026_10_29_AM.png`.

**Root cause.** Same lazy-load pattern as the two images fixed
earlier this session — extract's crawl wait window resolved before
this section's content settled, so it was captured empty and (wrongly)
generalized into the same "opaque client-side widget" bucket as the
genuinely-opaque product-finder tool.

**Fix.** Cropped and inspected the before-screenshot at full
resolution (had to work around no PIL/ImageMagick on this machine —
used a Playwright page displaying the PNG via `file://` + clipped
`page.screenshot()` to extract exact-pixel crops) to confirm tile
order, colors, and the 4+2 layout. Cross-referenced against
`ctas[]`/`body[18]` already captured in
`pages/ch-web-de-privatkunden-html.json` for verbatim titles,
descriptions, and hrefs — no new copy was invented. Rebuilt the
section with the correct accent-tile colors (green/purple/yellow/red,
matching the screenshot) and updated `stardust/prototypes/ch-web-de-
privatkunden-html-shape.md` accordingly. Data-section renamed
`product-finder` → `quick-access`.

**Process bug caught and fixed inline.** While re-adding the
provenance/critique block to the regenerated HTML, an `Edit` call
accidentally dropped the closing `-->` of the leading HTML comment,
which would have swallowed the entire `<head>`/`<body>` into a single
unterminated comment (blank-rendering page). Caught by re-running the
full verification suite (404/main-landmark/overflow checks) rather
than assuming the edit succeeded — confirms the value of re-verifying
after every regeneration, not just after the first one. Fixed and
re-verified clean.

**Net result:** this page now ships with **zero placeholders** — all
three original runtime-placeholder boxes (product-finder/quick-access,
FAQ-band image, self-check image) resolved to real captured content
across this session's two rounds of correction.

**Lesson for `extract`, reinforced.** A third instance of the same
lazy-load blind spot on one page is a strong signal this CMS lazy-
loads most in-page content blocks, not just images. Worth widening
`crawl.mjs`'s wait/scroll strategy for this site specifically before
the next `extract --refresh`, rather than treating each empty capture
as a one-off.

---

## 2026-08-10 — Post-render correction: 2 placeholder images resolved

**What happened.** User identified that 2 of the 3 placeholder boxes in
the rendered prototype (`faq-band`, `self-check`) were static images
the crawl failed to capture, not JS widgets like the third
(`product-finder`). Root cause: both are lazy-loaded `<img
data-src="...">` elements — the crawler's wait window resolved before
the lazy-load library swapped `data-src` into `src`, so extract
recorded them as empty/tiny and the earlier `_brand-extraction.json`
notes mis-generalized them as "opaque to extraction" alongside the
genuinely-opaque product-finder widget.

**Fix.** Re-fetched the live page directly with Playwright, scrolled
through it to trigger the lazy-load, and read the resolved `data-src`
values directly off the DOM (not guessed):
- FAQ band → `zusammenschluss.jpg` (1200×900, mother/daughter portrait)
- Self-check → `insurance-check.jpg` (1200×900, home-office desk scene)

Downloaded both to `stardust/prototypes/assets/` and wired them into
`ch-web-de-privatkunden-html-proposed.html` in place of the placeholder
boxes. No other image was touched. Re-ran the full check suite
(0 404s, 1 main landmark, 0 accessible-name collisions, 0 horizontal
overflow at all 7 viewports) — all still clean after the change.

**Lesson for `extract`.** The crawler's lazy-load handling should
distinguish "image element present with an unresolved `data-src`" from
"no image at this position" — the former is a static asset worth a
longer wait or a direct `data-src` read; only the latter is a genuine
JS-widget placeholder. Worth fixing in `stardust/scripts/crawl.mjs`
for future runs on this same site (the FAQ/Vorsorge/self-check pattern
suggests this CMS lazy-loads most in-page imagery this way).

---

## 2026-08-10 — `stardust:prototype ch-web-de-privatkunden-html`

**What ran.** Rendered `stardust/prototypes/ch-web-de-privatkunden-html-proposed.html`
against the resolved direction, delegated to `impeccable:craft` in
established-world/extend mode (PRODUCT.md + DESIGN.md already pinned
the system, so no concept-seed roll or visual-identity workshop ran).
Authored the page-shape brief first
(`stardust/prototypes/ch-web-de-privatkunden-html-shape.md`, 11
sections in render order with full Discipline 1-5+9 provenance:
captured-source lineage, anti-template pass, substrate transitions,
voice classification, reflex-reject/copy-cadence bypass reasoning for
the Mode A pinned fonts and captured-verbatim copy).

**Two real bugs found and fixed during the mandatory viewport sweep
(1920/1440/1280/800/414/375/360px)**, not visible in a single-viewport
screenshot:
1. Carousel sections leaked their internal horizontal-scroll width
   into the document's `scrollWidth` at narrow viewports (a
   `min-width:0` / `overflow:hidden` containment gap on the carousel
   wrapper — a classic flex/grid intrinsic-sizing trap).
2. The German compound word "Versicherungskompetenz" in the stat row
   forced a grid column wider than its track at 375px because no
   `overflow-wrap: break-word` was set — confirms the project's own
   French-stress-test discipline generalizes to German long-word
   wrapping too; fixed globally, not just for that one instance.

**Content-completeness gap surfaced.** Several visible sections on the
live page (FAQ band, Vorsorge/Anlegen teaser, self-check block) render
their heading/body copy via non-semantic elements the crawler's
`h1-h6`/`p`/`li`/`blockquote` selectors don't capture — the only
record of that copy is the Phase 2.5 vision-check screenshot from
extract. Reused it (transcribed from the captured screenshot, cited as
such), rather than treating it as unsourced/placeholder, since it's
directly observed real copy, not invented. Flagging for a future
`extract` pass: the crawler should widen its heading/body capture to
styled non-semantic elements, or this class of copy stays permanently
screenshot-only.

**Recovered real image URLs the structured capture missed.** Six
article-teaser thumbnail URLs were absent from `media.imgs[]` but
present, embedded, inside the crawler's `cta.label` field (a capture
quirk where nested `<img>` markup leaked into `textContent`). Extracted
via regex rather than guessing placeholder paths — all 6 images load
correctly in the rendered prototype.

**Gates (Phase 2.5-2.7).** Critique + audit run as a disclosed
single-context assessment (no sub-agent Task-tool orchestration used
this pass) rather than impeccable's dual-agent default — banner and
reasoning recorded in the file's `_provenance.critique.method`. Result:
0 P0/P1 across both. Verified directly: exactly one `<main>` landmark,
zero accessible-name collisions across differing CTA destinations (the
named Lighthouse discernible-name failure), contrast 12-16.4:1
(WCAG AAA-level) on every text/surface pairing, zero horizontal
overflow at all 7 target viewports after the two fixes above, LCP hero
image marked `eager`/`fetchpriority=high`, `prefers-reduced-motion`
correctly overrides `scroll-behavior`. 18 advisory-only detector
findings (micro-tokens — hover shades, small utility text sizes — used
outside DESIGN.md's minimal core scale); acknowledged, not blocking,
not promoted into DESIGN.md this pass.

**State:** `ch-web-de-privatkunden-html` → `prototyped`.

**Next:** open `stardust/prototypes/ch-web-de-privatkunden-html-proposed.html`
for review; say "approve" to advance it, or give a refinement phrase to
iterate. Siblings (`geschaeftskunden`, `ueber-uns`, `personnes-privees`)
remain `directed`, not yet prototyped.

---

## 2026-08-10 — `stardust:direct` — brand-faithful hierarchy + accessibility direction

**What ran.** User supplied a fully-resolved, decisive direction brief
(explicit keep/change lists, explicit tension resolutions for
`T-PALETTE` and `T-SCALE`, explicit accessibility targets citing
Lighthouse scores) directly at the `/stardust:direct` invocation.
Treated as self-confirming rather than re-asking the Phase 1
clarifying-question round — the brief already resolved density (moot
under the multi-audience hard floor) and `ia-fidelity` (the merger-
promotion move is a spine-level IA change, so stamped `reimagined`
rather than the unstated default).

**Mode.** Brand-faithful (Mode A) — signal-strong classification
(8-color palette, named type families). No rebrand trigger fired.
Seed (decade/craft/ground-family) deliberately **not rolled**: the
brief's own "keep as system" list covers palette, type, flat surfaces,
and register, so rolling an unrequested stylistic seed would have
contradicted the brief's explicit no-invention constraint. Recorded as
a reasoned non-roll in `DESIGN.json#extensions.divergence.seed`, not a
skipped step.

**Structural moves, each mechanically derived from evidence already on
hand — no new values invented:**
- Merger message promoted from a 12px dismissible strip to the primary
  hero position (`DESIGN.json#extensions.systemComponentRoles.merger-message`) —
  an explicit user-directed IA-priority elevation.
- Type scale: ad-hoc (38/38/24/16, H1=H2 collision) → modular
  major-third. The only new numeric value introduced is H2=30px,
  derived as `24 × 1.25` (H3 × ratio) and reconciling back to the
  captured H1 value (`30 × 1.25 = 37.5 ≈ 38`) — the fix uses only the
  two heading sizes the live site already had.
- Nine "Mehr erfahren" CTAs (2 privatkunden, 1 geschaeftskunden, 1
  ueber-uns, 5 on the corporate `index` page, plus 2 French
  equivalents on `personnes-privees`) resolved to destination-specific
  labels derived from each link's own `href`
  (`DESIGN.json#extensions.ctaLabelRegistry`) — this directly targets
  the Lighthouse discernible-name failure the user cited.
- New carousel-control component spec (visible 40px prev/next
  buttons) to fix the mid-word card clipping observed in the
  current-state screenshots.
- Real system fallback stacks added behind the bare `BaloiseBold` /
  `BaloiseText` family names.
- `a11y-first` promoted from implicit to an explicit, evidence-backed
  constraint in `PRODUCT.md` (single `main` landmark, destination-
  specific accessible names on every interactive element).

**Evidence correction accepted from the user.** The captured
`_brand-extraction.json` recorded the pale red/pink accent
(`#ffeef1`) at `occurrences: 0` — sampled with zero visible area
across the 5 crawled pages. The user states it is live in the
privatkunden service-tile row. Accepted as a direct-observation
correction (not re-verified by a new crawl this pass) and recorded
with citation in `DESIGN.json#extensions.colorMeta.accent-red.note`
and `PRODUCT.md` § Brand Commitments — superseded automatically if a
future `extract --refresh` samples it directly.

**Not actioned this pass:** `T-logo-variants` (only one logo variant
captured; sourcing a monochrome/inverted variant would require
fabricating an asset that wasn't captured — forbidden by the
no-invented-assets constraint). Left as an open item, not silently
dropped.

**Outputs:** `PRODUCT.md`, `DESIGN.md`, `DESIGN.json` (project root —
target spec), `stardust/direction.md` (full reasoning trace),
`stardust/prototypes/ch-web-de-privatkunden-html-improvements.md`
(Phase 2.5 brief for variant A). `stardust/state.json` updated: 4
pages (privatkunden + 3 siblings) `extracted` → `directed`; `index`
stays `extracted` (out of scope — flagged `suspect` at extract time).

**Next:** `$stardust prototype ch-web-de-privatkunden-html` — render
the primary target against the improvements list and the resolved
direction.

---

## 2026-08-10 — `stardust:extract` on https://www.helvetia.com/ch/web/de/privatkunden.html

**What ran.** Default 5-page crawl (no sitemap reachable at the origin; BFS
depth-1 from the entry page's own nav links). No user scope override was
given, so the default cap applied and the run proceeded without a
confirmation gate, per the extract skill's informational-output contract.

**Pages captured:** `privatkunden` (DE, primary target), `geschaeftskunden`
(DE, business-customer sibling), `ueber-uns/helvetia-schweiz` (DE, about),
`personnes-privees` (FR — the layout-stress-test locale required by this
project's `CLAUDE.md`), and `index` (helvetia.com root).

**Tooling decision.** The bundled reference crawler
(`stardust/scripts/crawl.mjs`) captures content, links, media, and CSS
custom properties, but does **not** read computed style (typography,
logo/favicon, radius, shadow, palette). Wrote a supplementary live
Playwright pass (`stardust/scripts/style-capture.mjs`) to fill that gap
rather than fabricating those values. Every number in
`_brand-extraction.json` traces to either the live computed-style capture
or the site's own 558-entry `--helvetia-*` CSS custom-property sheet — no
invented brand values, per the hard project rule.

**Key finding: the merged identity is already live in production.** The
site's own font-family names — `BaloiseBold`, `BaloiseText`,
`BaloiseMedium` — read directly via `getComputedStyle`, confirm the
"Helvetia und Baloise sind jetzt eins" banner copy is backed by an actual
shipped rebrand, not just an announcement. Brand primary color is
`#000d6e` (deep navy), used as both the default body-text color and the
primary action color — a genuinely unusual dual role worth preserving
deliberately rather than "cleaning up" into a separate text-gray.

**Data-quality caveats logged (not blocking):**
1. Cookie-consent banner remained visibly rendered in 2/5 screenshots
   (`geschaeftskunden`, `ueber-uns`) — consent dismissal is per-browser-
   context and this crawl ran `concurrency=4`. Confirmed the banner text
   is still correctly excluded from extracted headings/body/CTAs by the
   crawler's interstitial filter, so this is a screenshot-only artifact.
2. A client-side product-finder/calculator widget renders as an empty
   grey/mint placeholder on 3 pages — its content is opaque to static
   extraction; flagged rather than guessed at.
3. `index.json` (helvetia.com root → redirects to helvetia-baloise.com)
   captured a blocking country/language-selector modal instead of the
   real corporate homepage. Marked `suspect` in the Phase 2.5 vision
   check and **excluded from cross-page brand aggregation**; kept only
   as audit-trail evidence. Not re-escalated (headed-Chrome retry) since
   it's supplementary BFS-discovered evidence, not one of the primary
   IA-pillar targets, and the fact it would have evidenced (the merged
   identity) is already well-established from the other 4 pages.

**Tensions surfaced for `direct` (mechanical detectors only):**
- `T-scale` — heading/body sizes (38px / 24px / 16px) don't hold one
  consistent modular ratio.
- `T-logo-variants` — only one logo variant (default header wordmark)
  captured; no monochrome/inverted variant on hand.
- `T-color-imbalance` — 5 palette colors (off-white surface + all 4
  pastel accents) are used as `background` only, never as text/border/
  fill — the pastel family is reserved exclusively for the "Wir sind
  Helvetia" stat-tile component.

**Outputs:** `stardust/current/{PRODUCT.md, DESIGN.md, DESIGN.json,
brand-review.html, _brand-extraction.json, pages/*.json,
assets/{logo.svg, favicon.ico, fonts/*.woff, screenshots/*.png}}`,
`stardust/current/_crawl-log.json`, `stardust/state.json`.

**Next:** `$stardust direct` — resolve a redesign direction from this
current-state snapshot. Design must proceed German-first per project
`CLAUDE.md`, with the captured `personnes-privees` page used as the
French layout stress test.
