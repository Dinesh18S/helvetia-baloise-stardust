---
name: Helvetia — current state
description: Descriptive snapshot of the live Helvetia CH privatkunden design system, captured by stardust:extract on 2026-08-10
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
  heading:
    fontFamily: "BaloiseBold"
    fontSize: "38px"
    fontWeight: 700
    lineHeight: 1.263
    letterSpacing: "0.4px"
  subheading:
    fontFamily: "BaloiseBold"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.417
    letterSpacing: "0.4px"
  body:
    fontFamily: "BaloiseText"
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

# Design System: Helvetia (current state)

## Overview

This file describes the visual system as it exists on the live site today — it is not a proposed or invented direction. No creative north star or mood language is asserted here per stardust's extraction contract (`skills/extract/SKILL.md` § Phase 4): every statement below traces to a captured selector, CSS custom property, or computed style in `_brand-extraction.json`.

The system is a Swiss-insurer register: a single deep-navy primary color doing double duty as both body text and brand action color, a near-white/off-white neutral ground, warm lifestyle photography in hero positions, and four pastel accent tones reserved for a repeated stat-tile component. Typography runs on a proprietary self-hosted font family (`BaloiseBold` / `BaloiseText` / `BaloiseMedium`) — direct evidence that the Helvetia/Baloise merger referenced in the page copy ("Helvetia und Baloise sind jetzt eins") is already implemented in production CSS, not just announced in prose.

**Key Characteristics:**
- One dominant brand color (`#000d6e`) carrying both text and action roles — not a separate text-gray plus accent-blue split.
- Flat surfaces at rest; shadows exist only as small-elevation tokens, not seen deployed on the crawled pages.
- Four-color pastel family reserved specifically for stat/number tiles — not used elsewhere in the crawl.
- Ad-hoc type scale (38px / 24px / 16px), not a single consistent modular ratio.

## Colors

The palette is built from a 558-entry live design-token sheet (`--helvetia-*` custom properties); every hex below is a token value, not a sampled approximation.

### Primary
- **Helvetia Navy** (`#000d6e`): the site's single most load-bearing color. Used as body/heading text color on light backgrounds, as the background of the header nav-text, primary buttons, and the full-width contact CTA band, and as the footer background. Source: `--helvetia-color-primary` / `--helvetia-color-text-primary` / `--helvetia-color-background-primary`.

### Neutral
- **White** (`#ffffff`): base page background. Dominant by weighted area across all 5 pages.
- **Off-white** (`#fafafa`): secondary surface tone (`--helvetia-color-grey-1`), used for alternate section backgrounds.
- **Light Grey** (`#e8e8e8`): card/input borders and disabled-state backgrounds (`--helvetia-color-grey-3` / `--helvetia-color-border-grey`).

### Accent (stat-tile family only)
- **Pale Yellow** (`#fff9e8`): one of four stat-tile backgrounds (`--helvetia-color-background-yellow-light`).
- **Pale Purple** (`#f9f3ff`): stat-tile background (`--helvetia-color-purple-1`).
- **Pale Green** (`#e9fbf7`): stat-tile background (`--helvetia-color-background-green-light`).
- **Pale Red/Pink** (`#ffeef1`): present in the token sheet (`--helvetia-color-background-red-light`) but not observed with visible area on the 5 crawled pages — recorded from the token source, not from pixel sampling.

### Named Rules
**The One-Navy Rule.** The site does not separate "text gray" from "brand blue" — `#000d6e` is both. Any redesign token map that introduces a distinct neutral-text-gray as the default body color is a deliberate departure from the current system, not a neutral simplification.

## Typography

**Heading Font:** BaloiseBold (self-hosted, embedded as base64 `@font-face`, no observed fallback stack)
**Body Font:** BaloiseText (same embedding)
**Third weight:** BaloiseMedium (declared `font-weight: 400` despite the name — recorded as declared)

**Character:** A single proprietary type family carrying both weight roles (bold-only display face, regular-only text face) rather than a variable font or a display/body pairing from two different families.

### Hierarchy
- **H1/H2** (700, 38px, line-height 1.263): hero headline and major section headings — both crawled at the identical size, no distinct H1 step observed on these 5 pages.
- **H3** (700, 24px, line-height 1.417): sub-section headings (e.g. "Wir sind für Sie da.", stat-tile headline numerals use a different, uncaptured size).
- **Body** (400, 16px, line-height 1.625): paragraph copy.

### Named Rules
**The No-System-Fallback Rule.** `getComputedStyle` reports the heading/body stacks as literally just `BaloiseBold` / `BaloiseText` with no comma-separated fallback — if the font fails to load there is no observed graceful degradation captured. Downstream work should treat font-load failure as an open risk, not assume a safe fallback exists.

## Layout

Container max-width `1496px` (`--helvetia-container-size-normal`), with a compact variant at `896px` and a detail-page variant at `744px`. Breakpoints: `1920px` (full HD), `1440px` (widescreen), `1280px` (HD), `1024px` (desktop), `769px` (tablet) — read from `--helvetia-breakpoint-*` tokens. Spacing runs on a `4px` base unit via a two-tier token ladder: a mobile-first scale from `0.25rem` (4px) to `1rem` (16px), then a desktop-responsive scale continuing to `8rem` (128px) for section-level rhythm. Per-section padding/gap values were not captured at the individual-section level this pass (see `_brand-extraction.json#spacing.note`).

## Elevation & Depth

Flat by default. Four shadow tokens exist in the design-token sheet (`--helvetia-shadow-header`, `-small`, `-normal`, `-large`, all a soft navy-tinted `rgba(0,7,57,…)` rather than pure black) but none were observed actually deployed with visible effect on the 5 crawled screenshots — cards and buttons render with `box-shadow: none`. Depth, where it exists, appears to come from flat color contrast (white cards on off-white/navy sections) rather than shadow.

### Shadow Vocabulary
- **header** (`0 4px 4px 0 rgba(0,7,57,0.15)`): reserved for the site header per its token name; not visibly active in the captured screenshots.
- **small** (`0px 2px 5px 1px rgba(0,7,57,0.12)`)
- **normal** (`0 0 10px 0 rgba(0,7,57,0.15)`)
- **large** (`0 0 30px 0 rgba(0,7,57,0.15)`): named for modal/overlay use by convention; not confirmed deployed on a captured page.

## Shapes

Two radius steps in active use: `4px` (buttons, `--helvetia-radius-normal`) and `12px` (cards/teasers, `--helvetia-radius-large`). A third token, `9999px` (`--helvetia-radius-rounded`), exists in the sheet for pill shapes but was not observed on a visible element in this crawl.

## Components

### Buttons
- **Shape:** 4px radius, 2px solid border in all observed variants.
- **Primary:** navy background (`#000d6e`), white text, 16px/24px padding, 2px navy border.
- **Secondary:** white background, navy text, 16px/24px padding, 2px navy border — same shape and padding as primary, inverted fill.
- **Hover/Focus:** not captured this pass (static computed-style sampling only; no interaction states recorded).

### Cards / Containers
- **Corner Style:** 12px radius.
- **Background:** white.
- **Shadow Strategy:** none observed (see Elevation & Depth).
- **Border:** none observed on card containers.

### Navigation
- **Header:** persistent across all 5 crawled pages — search entry, login entry, language switcher (DE/FR/IT/EN), and an audience switcher (Privatkunden / Unternehmen). Nav link color inherits the navy primary; nav text computed to a system `sans-serif` fallback rather than the brand font in the sampled instance, worth confirming on a second pass.
- **Footer:** persistent 4-column link footer (Jobs & Karriere / Portal / Über uns / Blog) plus legal links (Impressum, Rechtliche Hinweise, Datenschutz, Cookies), navy background, white text.

### Stat Tiles (signature component)
A 4-up pastel-background tile row ("Wir sind Helvetia") pairing a large navy numeral with a short label, each tile a different accent color (yellow/purple/green/red family). Repeated on 4 of the 5 crawled pages with different numbers per entity (Helvetia CH vs. the merged Helvetia Baloise group) — a repeated structural component, not repeated content.

## Do's and Don'ts

### Do:
- **Do** keep `#000d6e` as both the default text color and the primary action color — this dual role is the system's defining trait, not an accident to correct.
- **Do** reserve the four pastel accent tones for stat/number tiles, matching current usage; they do not appear elsewhere in the crawl.
- **Do** treat French as a genuine layout stress test per project `CLAUDE.md` — `personnes-privees` copy runs measurably longer than the German equivalent in CTA labels and headings.

### Don't:
- **Don't** introduce a separate neutral-gray body-text color as a "cleanup" — the current system deliberately has none (see The One-Navy Rule).
- **Don't** assume shadow tokens are load-bearing; none render visibly on the crawled pages despite being defined in the token sheet.
- **Don't** invent pricing, coverage terms, or customer/rating numbers not already present in the captured copy (project `CLAUDE.md` hard rule).
