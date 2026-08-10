# Stardust decisions log

Findings and decisions made during the Stardust redesign pipeline, kept
up to date as work proceeds. Reverse-chronological.

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
