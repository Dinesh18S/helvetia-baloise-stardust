# Product

<!-- impeccable:product-schema 1 -->
<!-- stardust:target — written by stardust:direct on 2026-08-10, resolving the redesign direction for https://www.helvetia.com/ch/web/de/privatkunden.html. Supersedes stardust/current/PRODUCT.md (descriptive) as the redesign's strategic record. See stardust/direction.md for the full reasoning trace. -->

## Platform

web

## Users

Two primary audiences, unchanged from the current site's own split:
**Privatkunden** (private/retail customers — individuals and families
buying personal insurance and retirement/pension products) and
**Unternehmen** (business customers, out of scope for this pass). This
direction targets the Privatkunden surface. Addressed in direct
second-person register throughout ("Sie leben Ihr Leben. Wir schützen,
was Ihnen wichtig ist.") — kept verbatim from the captured voice.

## Product Purpose

Unchanged in substance from `stardust/current/PRODUCT.md`: Helvetia is
a Swiss insurer offering property/casualty and retirement/pension
products to private customers. What changes is **what leads**: the
Helvetia–Baloise merger is now the primary hero-position message, not
a dismissible 12px strip above it. This is a hierarchy correction, not
a new product claim — the merger fact was already stated on the live
site; it was simply the least visually prominent thing on the page
despite being, per the direction brief, "the most consequential fact
the company has communicated in a decade."

## Positioning

**"Helvetia und Baloise sind jetzt eins"** — now stated as the primary
hero claim rather than a footnote. The breadth positioning captured in
the current-state snapshot (insurance + Vorsorge + banking/real-estate
as one integrated offer) stays, sourced from the same evidence
(`stardust/current/pages/ch-web-de-ueber-uns-helvetia-schweiz-html.json`);
it now reads as the direct consequence of the merger claim rather than
a separate message competing for attention.

## Operating Context

Unchanged: Swiss market, German-language primary, French/Italian/English
locales via a language switcher. This direction is designed German-first
and stress-tested against the captured French page
(`personnes-privees`) — French CTA/heading strings run measurably
longer than German and must not break the new type scale or CTA labels.

## Capabilities and Constraints

- **No invented brand assets, colours, typefaces, pricing, or customer
  numbers.** Every token, label, and claim in this spec traces to
  `stardust/current/_brand-extraction.json`, a captured page, or an
  explicit user correction logged in `stardust/direction.md`.
- All copy is reused from the captured pages
  (`stardust/current/pages/*.json`) or is a destination-specific CTA
  label derived mechanically from the link's own target — never
  fabricated marketing copy.
- Interactive tools that render as empty placeholders in the capture
  (product-finder/calculator, coverage self-check) remain out of scope
  for this visual-system pass — their content is opaque to extraction
  and is not redesigned here.

## Brand Commitments

- **The One-Navy Rule holds.** `#000d6e` stays the default text color
  *and* the primary action color. No neutral text-grey is introduced.
- **BaloiseBold / BaloiseText stay the type system**, now with a real
  system fallback stack behind each (see `DESIGN.md` § Typography) —
  the type layer itself is not renegotiated, only hardened.
- **The four pastel accents (yellow / purple / green / red-pink) stay
  accent-only**, reserved to the stat-tile and service-tile
  components. Not expanded into a general-purpose palette (T-PALETTE
  resolved: keep, don't expand). The red-pink tone is confirmed live
  in the privatkunden service-tile row per user correction — the
  original crawl sampled zero occurrences for it (see
  `stardust/direction.md` § Gaps and questions).
- **Flat surfaces stay flat.** Shadow tokens exist in the captured
  design-token sheet but render nowhere on the live site; the redesign
  does not introduce shadow usage that wasn't already live.
- **Logo:** unchanged, `stardust/current/assets/logo.svg`. No
  additional logo variant is synthesized this pass (only one variant
  was captured; sourcing a monochrome/inverted variant would require
  fabricating an asset that wasn't captured, which the no-invented-
  assets constraint forbids).

## Evidence on Hand

Same evidence base as `stardust/current/PRODUCT.md`: 5 live-rendered
pages, screenshots, and the aggregated brand surface. This direction
adds one **user-provided correction** to that evidence (the red-pink
accent's live usage in the service-tile row) and cites two Lighthouse
findings supplied by the user (discernible-name failures from
duplicate "Mehr erfahren" CTA text; Agentic Browsing score of 1/2 on
both mobile and desktop) as the accessibility evidence base — these
Lighthouse scores were not re-run by this pipeline; they are taken as
given per the direction brief.

## Product Principles

1. **Merger-first hierarchy.** The identity change leads the page; it
   does not trail behind a generic tagline. *Movement:* IA priority —
   promoted, not preserved-as-is (see `direction.md` § Movements).
2. **Distinct type steps.** Every heading level renders at a visually
   distinct size. H1 must outrank H2 — the current site's 38px/38px
   collision is a defect, not a brand trait. *Movement:* type scale,
   ad-hoc → modular (1.25 / major-third).
3. **Every destination has a name.** No two links with different
   targets share identical visible text. Nine "Mehr erfahren" become
   nine destination-specific labels. *Movement:* CTA vocabulary,
   fragmented-by-omission → specific.
4. **Flat and navy-anchored, deliberately.** No invented elevation, no
   invented neutral-grey text. What's flat stays flat; what's navy
   stays navy. *Movement:* none — explicit preservation.
5. **A well-formed accessibility tree is not optional.** Every
   interactive element gets an accessible name; the document gets a
   `main` landmark; carousels get a visible, operable affordance
   instead of clipping content mid-word. *Movement:* constraint set
   gains `a11y-first` explicitly (it was implicit and unmet before).

## Accessibility & Inclusion

**`a11y-first` is now an explicit constraint**, added because the
current site fails it measurably (per the direction brief: Lighthouse
Agentic Browsing scores 1 of 2 on both mobile and desktop; discernible-
name failures traced to duplicate CTA text; carousels clip their last
card mid-word at desktop width with no visible next/prev affordance).
Requirements for every page in scope:

- Every interactive element (link, button, carousel control) has a
  programmatically discoverable accessible name distinct from other
  elements pointing at a different destination.
- The document exposes exactly one `main` landmark wrapping the
  primary content.
- Carousels/card-strips expose visible, keyboard-operable prev/next
  controls (or an equivalent affordance) — no content may clip
  mid-word with no way to reveal it.
- This is a floor per project `CLAUDE.md`, now backed by measured
  evidence rather than asserted as a generic best practice.
