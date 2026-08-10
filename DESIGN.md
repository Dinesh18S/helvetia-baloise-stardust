---
name: Helvetia — target direction
description: Brand-faithful accessibility + hierarchy refresh of the Helvetia CH privatkunden design system, resolved by stardust:direct on 2026-08-10
colors:
  background: "#ffffff"
  surface: "#fafafa"
  primary: "#000d6e"
  border: "#e8e8e8"
  accent-yellow: "#fff9e8"
  accent-purple: "#f9f3ff"
  accent-green: "#e9fbf7"
  accent-red: "#ffeef1"
typography:
  h1:
    fontFamily: "BaloiseBold, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "38px"
    fontWeight: 700
    lineHeight: 1.263
    letterSpacing: "0.4px"
  h2:
    fontFamily: "BaloiseBold, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.4px"
  h3:
    fontFamily: "BaloiseBold, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.417
    letterSpacing: "0.4px"
  body:
    fontFamily: "BaloiseText, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "12px"
  pill: "9999px"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: "16px 24px"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "16px 24px"
  card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
---

# Design System: Helvetia (target direction)

## Overview

This is a **brand-faithful accessibility and hierarchy refresh**, not a
rebrand. Every token in the frontmatter above is inherited unchanged
from `stardust/current/_brand-extraction.json` — palette, primary
color, accent family, radii. What moves is structural: the type scale
gains a distinct H1/H2 step, fonts get a real fallback stack, and the
system gains explicit accessibility rules it did not have before. See
`stardust/direction.md` for the full reasoning trace and the
brand-faithful inversion log.

**Key Characteristics (unchanged from current state):**
- One dominant brand color (`#000d6e`) carrying both text and action
  roles.
- Flat surfaces at rest — shadow tokens exist but stay unused, as
  observed on the live site.
- Four pastel accent tones reserved to stat-tile and service-tile
  components only — kept accent-only per this direction's resolution
  of `T-PALETTE` (do not expand).

**What moves:**
- Type scale: ad-hoc (38 / 24 / 16, H1 = H2) → modular major-third
  (38 / 30 / 24, body 16 set independently as the readability floor).
- Font stacks: bare `BaloiseBold` / `BaloiseText` (no fallback) → real
  system fallback chains.
- Accessibility: implicit → explicit `a11y-first` constraint with
  named component-level rules (see § Components, § Do's and Don'ts).

## Colors

Unchanged from `stardust/current/DESIGN.md` — no palette move in this
direction. Role assignments and hex values are identical; see that
file for the full per-color citation. Reaffirmed here:

### Primary
- **Helvetia Navy** (`#000d6e`): still both the default text color and
  the primary action color. **The One-Navy Rule holds** — no neutral
  text-grey is introduced.

### Neutral
- **White** (`#ffffff`), **Off-white** (`#fafafa`), **Light Grey**
  (`#e8e8e8`) — unchanged.

### Accent (stat-tile + service-tile family)
- **Pale Yellow** (`#fff9e8`), **Pale Purple** (`#f9f3ff`), **Pale
  Green** (`#e9fbf7`), **Pale Red/Pink** (`#ffeef1`) — unchanged
  values. **Scope widened by one confirmed use**: the current-state
  extraction sampled zero occurrences of the red/pink tone with
  visible area, but this direction's brief confirms it is live in the
  privatkunden **service-tile row** (not just the stat-tile row the
  original crawl sampled). Recorded as a user correction to captured
  evidence — see `stardust/direction.md` § Gaps and questions. The
  accent family's *job* does not change (still reserved, still not a
  general-purpose palette); its *known deployment surface* widens by
  one component.

### Named Rules
**The One-Navy Rule.** Unchanged from current state — `#000d6e` is
both text and action color; no separate neutral-gray default is
introduced.

**The Two-Tile Rule (new).** The four pastel accents are reserved to
exactly two component roles: stat tiles and service tiles. They do not
migrate to buttons, links, section backgrounds, or any other surface.
This is the direction's resolution of `T-PALETTE` — kept, not
expanded.

## Typography

**Heading Font:** BaloiseBold, now with a real fallback stack:
`BaloiseBold, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`
**Body Font:** BaloiseText, same fallback pattern:
`BaloiseText, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`

**Character:** Unchanged — a single proprietary type family carrying
both weight roles. What's new is production hygiene: the current site
ships these as bare family names with no fallback, so a font-load
failure has no graceful degradation. This direction closes that gap
without touching the type family itself.

### Hierarchy (modular scale — major-third, 1.25×)

| Level | Size | Weight | Line-height | Letter-spacing | Basis |
|---|---|---|---|---|---|
| H1 | **38px** | 700 | 1.263 | 0.4px | captured value, kept as the top of the scale |
| H2 | **30px** | 700 | 1.2 | 0.4px | **new** — `24px × 1.25`, rounds to the captured H1 value one step down (`30 × 1.25 = 37.5 ≈ 38`), so the scale reconciles both captured anchors exactly |
| H3 | **24px** | 700 | 1.417 | 0.4px | captured value, kept as the scale's third rung |
| Body | 16px | 400 | 1.625 | normal | captured value, kept as the readability floor — **not** forced onto the same ratio chain as the heading scale (24/16 = 1.5, a different ratio); this is standard practice: the heading scale is a display progression, body size is set by readability, not by ratio inheritance |

**Resolution of `T-SCALE`:** the current site's H1 and H2 both compute
to 38px — no distinct step. This direction introduces exactly one new
value (H2 = 30px) derived mathematically from the two values already
captured on the live site (H3 × 1.25 = H2; H2 × 1.25 ≈ H1), so the fix
reconciles the existing evidence rather than inventing an unrelated
scale. `scaleAudit.kind` moves from `ad-hoc` to `modular`
(`major-third`, ratio 1.25) for the H1/H2/H3 chain.

### Named Rules
**The Distinct-Step Rule (new).** No two adjacent heading levels may
compute to the same rendered size. This directly fixes the H1/H2
collision; downstream `prototype` must not introduce a third
coincidental collision when composing page-level type.

## Layout

Unchanged from current state: container max-width `1496px`,
breakpoints `769 / 1024 / 1280 / 1440 / 1920px`, 4px base spacing
unit. No layout-system move in this direction.

## Elevation & Depth

Unchanged: flat by default. Shadow tokens exist in the design-token
sheet but are not deployed on the live site, and this direction does
not introduce new shadow usage. **The agent-default reflex toward
adding elevation on hover/focus states is inverted here** — focus
states use an outline/ring treatment consistent with the flat system,
not a new shadow.

## Shapes

Unchanged: `4px` (buttons) and `12px` (cards/teasers) radii in active
use; `9999px` pill radius available but unused, as captured.

## Components

### Buttons
Unchanged shape/color from current state (navy primary / white
secondary, 4px radius, 2px border). **New requirement:** every button
whose visible label is not unique to its destination on the page (icon-
only buttons, repeated "Mehr erfahren"-style CTAs) must carry an
`aria-label` naming its specific destination. See § Do's and Don'ts.

### Cards / Containers
Unchanged: white background, 12px radius, no shadow, no border.

### Carousels / Card Strips (new component spec)
The captured site's card strips (insurance-category row, article-
teaser strip) have no visible affordance — the current-state
screenshots show the last visible card clipping mid-word at desktop
width, with no indication more content exists. This direction adds:
- **Visible prev/next controls** (not swipe-only), rendered as
  40×40px circular buttons in `{colors.primary}` on `{colors.background}`,
  positioned at the strip's vertical center, outside the card row's
  clip boundary where space allows.
- Each control carries a distinct accessible name ("Vorherige Karte" /
  "Nächste Karte" — reused from German UI convention, not invented
  marketing copy).
- No card may render partially clipped without a means to reveal its
  full content — either the strip scrolls to show it fully, or it
  does not render as the last visible item.

### Navigation
Unchanged structurally (persistent header/footer, language switcher,
audience switcher). **New requirement:** the document exposes exactly
one `main` landmark wrapping primary content — the current site fails
this per the direction's Lighthouse evidence.

### Stat Tiles & Service Tiles (accent deployment)
The four pastel accents render here and only here. Stat tiles ("Wir
sind Helvetia") and service tiles (the privatkunden service row, where
the pale red/pink is confirmed live) share the same accent vocabulary
and the same 12px-radius card shape.

## Do's and Don'ts

### Do:
- **Do** keep `#000d6e` as both the default text color and the primary
  action color (The One-Navy Rule).
- **Do** keep the four pastel accents reserved to stat tiles and
  service tiles only (The Two-Tile Rule).
- **Do** give every heading level a visually distinct size — no two
  adjacent levels may collide (The Distinct-Step Rule).
- **Do** give every interactive element — link, button, carousel
  control — a programmatically discoverable accessible name that is
  unique when its destination is unique. Nine "Mehr erfahren" instances
  become nine destination-specific labels (see `stardust/direction.md`
  § Divergence inputs for the full mapping).
- **Do** wrap primary content in exactly one `main` landmark.
- **Do** give carousels/card strips a visible, operable prev/next
  affordance — never let content clip mid-word with no way to reveal
  it.
- **Do** treat French as a genuine layout stress test — verify the new
  type scale and the new CTA labels against `personnes-privees`, whose
  copy runs measurably longer than German.

### Don't:
- **Don't** introduce a neutral-gray body-text color — `#000d6e` stays
  dual-role.
- **Don't** expand the pastel accent family beyond stat/service tiles.
- **Don't** add shadow usage the live site doesn't already have — stay
  flat.
- **Don't** reuse identical CTA text for two links pointing at
  different destinations on the same page.
- **Don't** invent a logo variant, a font weight, a color, or a
  customer/pricing number not present in the captured evidence.
