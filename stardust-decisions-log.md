# Stardust decisions log

Findings and decisions made during the Stardust redesign pipeline, kept
up to date as work proceeds. Reverse-chronological.

---

## 2026-08-10 — Merger notice made its own distinct band; quick-access reverted to white

The merger notice (added earlier the same day, see entry below) still
read as "a strip floating on white" — its `--color-surface` (#fafafa)
background was too close to the surrounding sections' off-white tone
to register as its own distinct section. Changed to
`--color-accent-green` (#e9fbf7, already an existing captured-palette
token, no new value invented) as a full-bleed band, content still
constrained to the container width. It now sits with zero gap directly
below the hero — no CSS change was needed for the adjacency itself,
since sections are plain block siblings with no margin between them;
the "gap" the earlier round showed was a background-contrast illusion,
not a spacing bug.

That contrast fix exposed a second issue: the "Wir sind für Sie da"
quick-access section below was rendering on its own off-white
`surface-alt` background, which — now that the merger notice above it
is visibly distinct — read as a second, redundant off-white zone and
made the combined padding look oversized. Removed `class="surface-alt"`
from the quick-access section wrapper so it reverts to plain white;
its two plain tiles (E-Banking, Kundenportal) keep their own off-white
card background independently, so no visual affordance is lost there.
Padding was already the generic `--space-xxl` (48px) used by every
other section — confirmed via computed-style check, not adjusted.

Verified via computed styles (not just a screenshot): `.merger-notice`
`backgroundColor: rgb(233, 251, 247)` (#e9fbf7), `padding-block: 24px`
(`--space-lg`), 0px gap between hero bottom and merger-notice top;
quick-access `backgroundColor: rgba(0,0,0,0)` (transparent onto white),
`padding-block: 48px`. Full verification suite re-run: comment/charset
integrity, main-landmark count (1), zero accessible-name gaps, no
horizontal overflow at any of the 7 target viewports.

## 2026-08-10 — Merger notice moved out of the hero card; hero height capped

**Merger notice extracted.** The in-card demoted treatment (thin left
rule + outline button, from the previous round) still read as a
second message competing with the hero for attention. Removed from
the hero card entirely — the card now contains only H1 ("Mehr als
eine Versicherung"), the lede, and the single primary CTA ("Mehr über
Helvetia erfahren"). The merger fact now lives in its own full-width
section directly below: `--color-surface` background, one plain line
of body-size navy text with an inline underlined link, `--space-lg`
vertical padding, no icon/border/button. Caught and fixed a real bug
during verification: the new section's `class="merger-notice"` had
been left off the actual `<section>` tag (only the `data-section`
attribute was set), so the CSS rule silently matched nothing and the
strip rendered with a transparent background and the generic 48px
section padding instead of the specified `#fafafa` / 24px — computed-
style checks caught this before shipping (`backgroundColor` was
`rgba(0,0,0,0)` instead of `rgb(250,250,250)`), not just a visual
glance.

**Hero height capped.** Was `min-height: 560px` with no ceiling,
filling nearly the full viewport at common desktop heights. Now
`min-height: 420px; max-height: 62vh` — at a standard 1440×900
viewport this leaves ~480px visible below the fold, enough for the
merger notice and the top of the next section to show without
scrolling.

Re-ran the full check suite after both fixes: 0 404s, 1 `<main>`
landmark, 0 accessible-name collisions, 0 horizontal overflow at all
7 viewports, and confirmed via computed styles (not just a screenshot)
that the notice strip's background/padding/text color/link
underline all match spec exactly.

---

## 2026-08-10 — service-tiles: three rounds converging on a genuine redesign

**Round 1 (rejected by user).** Reproduced the live site's actual
layering — background photo positioned behind, card carousel in front,
overlapping it on the right. User reported this rendered wrong: the
image sat above the cards, covering card 3 and hiding card 4 entirely.
In hindsight, a narrow horizontal-scroll carousel track next to an
absolutely-positioned image is fragile — whether cards 3/4 are visibly
"hidden behind" the image or just "one scroll-click away" reads the
same to a user scanning the section, and the live site's own version
of this layering is exactly the defect being corrected, not a pattern
worth reproducing carefully.

**Round 2 (superseded by user before I finished implementing it).**
User redirected mid-fix: drop the layered reproduction entirely,
redesign instead. New structure: full-width photo band (16:9, rounded)
above a plain 4-up card row, carousel dropped since 4 always fits.

**Round 3 (final, implemented).** User refined once more to a proper
two-column layout: left = 4 cards in a static 2×2 grid, right = the
photo filling that block's full height. Implemented:
- `.service-layout`: CSS Grid, 1 column on mobile / `1.2fr 1fr` at
  ≥700px. DOM order is photo-first so the mobile stack reads
  "heading → photo → cards" without extra markup; `order` swaps the
  visual position back (cards left, photo right) at ≥700px — grid
  items honor `order` for auto-placement the same as flex items, no
  JS needed.
- `.service-grid`: 1 column below 480px (cards genuinely stacked, not
  a cramped 2-up), 2×2 from 480px up.
- Equal height / aligned baselines: each `.service-card` is
  `display:flex; flex-direction:column` with `flex-grow:1` on the
  body paragraph, pushing every card's "… ansehen" link to the same
  baseline regardless of description length; CSS Grid's default row
  stretch equalizes card height within each row.
- Carousel **removed entirely** from this section (component, track,
  controls) — kept exclusively on the article-teasers strip, the one
  place the card count (6) genuinely overflows a single row.
- Word-break: `hyphens: auto` + `overflow-wrap: break-word` on
  `.service-card h3` (relying on the existing `<html lang="de">`),
  heading size stepped down to 20px. Verified computationally
  (`hyphens` computed style = `auto`, `document.documentElement.lang`
  = `de`) rather than just eyeballed — "Hausratversicherung" renders
  on one line at the card widths this layout produces; the hyphenation
  rule stays in as a safety net for any narrower case.

Re-ran the full check suite after each of the three rounds: 0 404s,
1 `<main>` landmark, 0 accessible-name collisions, 0 horizontal
overflow at all 7 viewports, every time.

---

## 2026-08-10 — Four targeted fixes to the existing prototype

**1. Service-row background photograph restored.** Not present in the
structured capture at all — found via `getBoundingClientRect()` walk
of the live section's own `<img>` elements (it's a real positioned
`<img>`, not a CSS `background-image`, confirmed empty on a walk of
ancestor computed styles first). Real asset:
`home-versicherungen.jpg` (family piggyback-on-beach photo),
downloaded to `stardust/prototypes/assets/`. Placed in its own grid
column (content column ~57%, image column ~43% at ≥1024px) rather
than as a literal same-surface backdrop — this is the correction, not
a cosmetic choice: on the live site the card carousel overlaps the
photo far enough that a card label sits on top of it (illegible); a
separate-column layout makes that overlap structurally impossible
while still reproducing the real image at the real position.

**2. Merger CTA demoted.** H1 ("Mehr als eine Versicherung") and lede
("Helvetia – Ihre verlässliche Partnerin...") left untouched, exactly
as required. The merger banner ("Helvetia und Baloise sind jetzt
eins." + "Was der Zusammenschluss für Sie bedeutet") restyled from a
filled surface block with a solid-navy button (primary-CTA visual
weight) to a thin-left-rule notice line with regular-weight 14px text
and an outline button — a time-limited announcement now reads as one,
not as competing with the brand headline above it.

**3. Hover/focus-visible added to interactive + stat tiles.** Used
`--shadow-small` / `--shadow-normal` — captured tokens
(`_brand-extraction.json#motifs.shadows`) that were defined but never
activated anywhere, since the live site is flat-by-default. Activating
them here for state-response (never at rest) is DESIGN.md's own
sanctioned pattern, not a "stay flat" violation. Service-tile cards
use a `:has(.card-link:hover)` / `:has(.card-link:focus-visible)`
selector so the whole card lifts without restructuring the card into
one big anchor (the card's own "… ansehen" link stays exactly as it
was). Quick-access tiles (already single anchors) get direct
`:hover`/`:focus-visible`. Stat-tiles get a decorative `:hover` only —
they're informational, not links, so there's nothing to focus.
Verified via computed-style checks (not just screenshots, since a 2px
lift + a small shadow is close to imperceptible in a static capture):
`box-shadow` confirmed changing from `none` to the real
`--shadow-small` value on all three tile types on hover, and
`:focus-visible` confirmed engaging (`el.matches(':focus-visible')`)
with the distinct navy-border treatment on quick-access tiles.

**4. Both carousels checked for dropped cards.**
- **Stat row ("Wir sind Helvetia") was genuinely dropping 2 of 6
  entries.** The original build only carried the 4 stats whose numbers
  had already surfaced in the structured capture; 2 more
  ("Bäume in Schutzwaldprojekten gepflanzt", "Strom aus erneuerbaren
  Quellen") were visible in the live DOM with real icons already
  fetched but no number on hand, so they'd been intentionally left
  out rather than guessed. A direct live re-fetch this round found
  both real numbers (**265'000+** trees, **100%** renewable
  electricity) — all 6 are now real. Converted the section from a
  static 4-tile grid to a carousel (matching the service-tiles and
  article-teasers pattern) since 6 tiles no longer fit a fixed 4-up
  layout; all 6 confirmed present in the DOM and reachable via
  prev/next.
- **News-strip first-card clipping: could not reproduce.** Tested the
  current file's `[data-carousel=articles]` track at all 7 target
  viewports (1920 down to 360px) via `getBoundingClientRect()` —
  first card starts flush at the track's left edge with
  `scrollLeft: 0` at every width, no clip. Reported here rather than
  silently claimed fixed: if it's still visible in your browser,
  it may be viewport- or browser-specific in a way headless Chromium
  isn't reproducing — a screenshot or the exact viewport width would
  help pin it down.

Re-ran the full check suite after all four fixes: 0 404s, 1 `<main>`
landmark, 0 accessible-name collisions, 0 horizontal overflow at all
7 viewports.

---

## 2026-08-10 — Invented icon set replaced with real DAM assets

**What happened.** The service-tile and quick-access tile icons
(pastel circular badges with hand-drawn line glyphs — car, calculator,
headset, laptop, bank, portal, home, shield, plane) were authored from
scratch during the earlier prototype render. This violated the
project's hard no-invented-assets rule (`CLAUDE.md`): icons are a
brand asset exactly like colors and typefaces, and none of that set
was ever captured from the live site.

**Fix — fetched real assets, same method as `logo.svg`.** Navigated
the live page with Playwright, scrolled to trigger lazy-load, and read
every `svg[use href]` target near each tile's heading text. This
confirmed the live site uses **flat multicolour illustration SVGs**
hosted on the Helvetia DAM
(`/content/dam/os/ch/web/assets/graphics-and-icons/icons/*.svg`), not
line-stroke glyphs — matched every icon to its tile by DOM order and
downloaded all 17 real files to `stardust/prototypes/assets/icons/`:

| tile | real asset |
|---|---|
| Schaden melden | car-full-crash-one-car-green.svg |
| Prämie berechnen | calculator-purple.svg |
| Kontakt aufnehmen | contact-tangerine.svg |
| Online-Services nutzen | laptop-red.svg |
| E-Banking | online-banking-red.svg |
| Kundenportal | notebook-smartphone-red.svg |
| Autoversicherung | car-purple.svg |
| Hausratversicherung | couch-red.svg |
| Privathaftpflicht | liability-tangerine-(1).svg |
| Reiseversicherung | travel-insurance-for-air-travel-green.svg |
| stat: Kundinnen/Kunden | gender-neutral-family_purple.svg |
| stat: Jahre Kompetenz | warranty-red.svg |
| stat: Standorte | location-green.svg |
| stat: Mitarbeitende | corporate-health-management-helpline-tangerine.svg |
| Agentur finden (header + sidebar) | twenty-icons/location.svg |
| Schaden melden (sidebar) | twenty-icons/accident_2.svg |
| Schreiben Sie uns (sidebar) | twenty-icons/letter_closed.svg |

Icons now render bare (no badge/circle wrapper) with `aria-hidden`,
matching the live site exactly.

**A second, related correction fell out of re-verifying against the
evidence screenshot at full resolution:** the service-tile cards had
been given accent-pastel backgrounds (purple/green/red/yellow). Real
evidence shows these cards are a **plain neutral surface**
(`--color-surface`) — the pastel accent family is exclusive to
quick-access and stat-row tiles. Fixed in the same pass. This also
precisely relocates the direction's earlier T-PALETTE finding ("pink
confirmed live in the service-tile row"): the pink is `couch-red.svg`'s
own illustration color on the Hausratversicherung icon, not a tile
background accent — the background there is neutral.

**Two additions beyond the literal ask**, both direct extensions of
the same fix and same evidence: added real icons to the 4 stat-row
tiles and the 3 contact-band sidebar links, neither of which had
icons before (an omission, not a violation, but fixing it while the
real assets were already fetched and matched was the honest thing to
do rather than leaving an inconsistent half-fixed page).

**Not added:** two more stat-row icons (`leaf-purple.svg`,
`wind-turbine-red.svg`) were identified in the DOM fetch but their
corresponding stats ("Bäume in Schutzwaldprojekten gepflanzt", "Strom
aus erneuerbaren Quellen") have no captured numeric value — left out
rather than guessed, consistent with the standing no-invented-content
rule.

Re-ran the full check suite after the fix: 0 404s, 1 `<main>`
landmark, 0 accessible-name collisions, 0 leaked SVG markup in any
accessible name, 0 horizontal overflow at all 7 viewports. One
`detect.mjs` "warning"-severity finding (broken-image, line 19)
verified as a false positive — it matched literal prose inside this
file's own provenance comment, not a real `<img>` tag.

---

## 2026-08-10 — Two reverts: H1 restored, header structure restored

**1. H1 reverted from the merger statement back to "Mehr als eine
Versicherung".** The direction's original promotion of "Helvetia und
Baloise sind jetzt eins" to H1 over-corrected — user points out
`zusammenschluss.html` frames the merger as *"new identity, same
partner"*, i.e. "Mehr als eine Versicherung" **is** the current
post-merger promise, not a legacy tagline competing with it. Resolution:
H1 restored to "Mehr als eine Versicherung" (captured verbatim,
`headings[0]`). The merger fact keeps its structural upgrade — from a
12px *dismissible* strip to a *persistent, non-dismissible* banner
directly beneath H1, paired with its own CTA ("Was der Zusammenschluss
für Sie bedeutet" → `zusammenschluss.html`). Net effect versus the
original site: the merger message is now permanent and inline instead
of a one-time closeable notice, without dethroning the brand's
standing headline. Type scale (38/30/24) and CTA registry unchanged —
only the copy assigned to each slot moved. FAQ-band's CTA reverted in
lockstep to its own originally-captured target (`zusammenschluss.html`,
matching that section's own question) now that it no longer collides
with the hero's restored primary CTA.

**2. Header two-row structure restored; "Agentur finden" recovered.**
An earlier render had collapsed the header into a single row and, in
doing so, silently dropped "Agentur finden" — a captured, real link
(`ctas[label=Agentur finden]` → `/kontakt/beratung/agenturen.html`)
and a primary conversion path for an insurer. Restored the live
site's actual two-row structure: row 1 is audience switcher (left) →
search/login/language switcher → logo (right); row 2 is the main nav
(left) → Agentur finden, right-aligned with a location-pin icon. Both
rows collapse sensibly on mobile (row 2's nav goes behind the existing
hamburger; Agentur finden stays visible at every width since it's a
primary path, not secondary chrome).

**Known gap flagged, not fixed this pass:** the Immobilien and
Lebenssituationen main-nav hrefs are pattern-inferred (extrapolated
from the confirmed `/privatkunden/{{versicherungen,vorsorge,bank,
kontakt}}.html` shape), not directly captured in `pages/ch-web-de-
privatkunden-html.json`. Worth a direct check against the live site
before this ships.

**Process note.** Folded the full `_provenance` block (all prior
post-render corrections + critique/audit/adapt/motion) into the
Python generator script itself this round, rather than patching it
onto the generated HTML after the fact — the previous two rounds lost
that block on every regeneration and once nearly broke the file
(dropped HTML comment terminator). Future edits to this prototype
should extend the script, not hand-edit the generated output.

Re-ran the full check suite after both fixes: 0 404s, 1 `<main>`
landmark, 0 accessible-name collisions, 0 horizontal overflow at all
7 target viewports.

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
