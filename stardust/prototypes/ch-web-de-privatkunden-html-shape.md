<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-08-10T14:00:00Z
  page:             ch-web-de-privatkunden-html
  pageUrl:          https://www.helvetia.com/ch/web/de/privatkunden.html
  againstDirection: stardust/direction.md (Active 2026-08-10T13:00:00Z)
  consumedBy:       impeccable:craft
  readArtifacts:
    - stardust/current/pages/ch-web-de-privatkunden-html.json
    - stardust/current/assets/screenshots/ch-web-de-privatkunden-html.png
    - stardust/current/_brand-extraction.json
    - DESIGN.md
    - DESIGN.json
    - stardust/direction.md
    - stardust/prototypes/ch-web-de-privatkunden-html-improvements.md
  stardustVersion:  0.18.1
-->
---
slug: ch-web-de-privatkunden-html
url: https://www.helvetia.com/ch/web/de/privatkunden.html
register: brand
surprise: low
dominantDimension: ia-priority/merger-message-promotion
---

# Page shape: ch-web-de-privatkunden-html

## Sections (in render order)

1. **header** (system-component role: `header`) — **corrected
   2026-08-10, restored two-row structure matching the live site**
   (the intervening single-row render had collapsed the structure and
   dropped "Agentur finden" entirely — a primary conversion path for
   an insurer):
   - **Row 1**: audience switcher (Privatkunden / Unternehmen) left,
     then Suche + Login + language switcher (DE/FR/IT/EN), Helvetia
     wordmark right.
   - **Row 2**: main nav (Versicherung, Vorsorge, Bank, Immobilien,
     Lebenssituationen, Kontakt & Services) left, "Agentur finden"
     (with location-pin icon) right-aligned —
     `pages/ch-web-de-privatkunden-html.json#ctas[label=Agentur finden]`,
     href `/ch/web/de/privatkunden/kontakt/beratung/agenturen.html`,
     captured verbatim. **Known gap**: the Immobilien and
     Lebenssituationen nav-item hrefs are pattern-inferred (following
     the confirmed `/privatkunden/{{versicherungen,vorsorge,bank,kontakt}}.html`
     shape), not directly captured — worth verifying against the live
     site before ship.
   - The old 12px dismissible announcement strip that used to sit
     above this header is gone — its message now lives in the hero
     (section 2), no longer as header chrome.

2. **hero** — **corrected 2026-08-10, H1 reverted**: the merger
   statement's earlier promotion to H1 is undone per user correction
   — "Mehr als eine Versicherung" is the current post-merger brand
   promise (per the zusammenschluss.html page's own framing: new
   identity, same partner), not a stale tagline, so it stays H1. The
   merger fact is elevated from a *dismissible* 12px strip to a
   *persistent, non-dismissible* banner directly beneath H1 — a real
   structural improvement over the original site, short of replacing
   the headline. Full-bleed photo ground (same captured image: mother
   lifting child, `pages/ch-web-de-privatkunden-html.json#media.imgs[1]`,
   `startseite.jpg`), white overlay card, left-anchored.
   - **H1**: "Mehr als eine Versicherung" — captured verbatim
     (`pages/...#headings[0]`), restored to its original position.
   - **Merger banner** (persistent, no dismiss/close control): "Helvetia
     und Baloise sind jetzt eins." (`pages/...#body[0]`, captured
     verbatim) paired with CTA "Was der Zusammenschluss für Sie
     bedeutet" → `/ch/web/de/ueber-uns/zusammenschluss.html` (registry
     label, `DESIGN.json#extensions.ctaLabelRegistry`).
   - **Lede**: "Helvetia – Ihre verlässliche Partnerin für alle
     Finanzfragen." — captured verbatim, restored to its original
     position beneath the banner.
   - **CTA**: "Mehr über Helvetia erfahren" →
     `/ch/web/de/ueber-uns/helvetia-schweiz.html` (registry label;
     this is the original hero's own captured CTA, restored to
     primary position).

3. **quick-access** ("Wir sind für Sie da.") — **corrected 2026-08-10**:
   originally miscaptured and rendered as an empty "product-finder
   widget" placeholder; it is real static content, the page's primary
   task navigation, not a JS widget. Rebuilt from
   `evidence/before/Versicherung-und-Vorsorge-*.png` (visual layout
   and tile colors) + `pages/ch-web-de-privatkunden-html.json` (titles/
   descriptions/hrefs, captured verbatim in `ctas[]` and `body[18]`).
   4 accent-tiles (Schaden melden/green, Prämie berechnen/purple,
   Kontakt aufnehmen/yellow, Online-Services nutzen/red) + 2 plain
   tiles (E-Banking, Kundenportal) below on the off-white surface. See
   `DESIGN.json` accent-family scope note — this is a **third**
   confirmed deployment surface for the reserved pastel accents
   (stat tiles, service tiles, and now quick-access tiles).

4. **FAQ band** ("Ihre Fragen – unsere Antworten") — unchanged
   composition. Heading + "Helvetia und Baloise sind jetzt eins. Was
   heisst das für Sie?" body copy (captured verbatim) + CTA.
   **Corrected 2026-08-10**: CTA reverted to its originally-captured
   target, "Was der Zusammenschluss für Sie bedeutet" →
   `zusammenschluss.html` — this matches the section's own question
   ("was heisst das für Sie?") and no longer collides with the hero's
   CTA now that the hero's primary CTA is back to "Mehr über Helvetia
   erfahren" → `helvetia-schweiz.html`. Image: real captured photo
   (`assets/zusammenschluss.jpg`, see § Unsourced content below).

5. **Vorsorge/Anlegen teaser** ("Vorsorgen und Anlegen") — unchanged.
   Captured body copy + two CTAs ("Mehr zu Vorsorgen" →
   `/vorsorge.html`, "Mehr zu Anlegen" → `/bank/anlageloesungen.html`)
   + captured photo (couple on couch). These labels are already
   destination-specific — no registry change needed.

6. **service-tile card row** ("Sie leben Ihr Leben. Wir schützen, was
   Ihnen wichtig ist.") — 4 cards (Autoversicherung / Hausratversicherung
   / Privathaftpflicht / Reiseversicherung), captured verbatim
   headings + descriptions + hrefs. **Accessibility fix**: this strip
   clips its 4th card ("Reiseversicherung") mid-word at desktop width
   in the captured screenshot, with no visible affordance — add the
   `carouselControl` component (`DESIGN.json#extensions.componentStyle
   .carouselControl`) with `aria-label="Vorherige Karte"` /
   `"Nächste Karte"`. **Corrected 2026-08-10 (icon set + card
   background)**: cards are a plain neutral surface
   (`--color-surface`, #fafafa) — **not** the pastel accent family;
   confirmed by re-cropping `evidence/before/...png` at full
   resolution. Icons are real DAM-hosted flat illustrations
   (`car-purple.svg`, `couch-red.svg`, `liability-tangerine-(1).svg`,
   `travel-insurance-for-air-travel-green.svg`, fetched live from the
   DOM's `svg[use href]` targets), rendered bare with no badge/circle
   wrapper — an earlier pass invented a hand-drawn stroke-icon set on
   pastel circular badges, which violated the project's
   no-invented-assets rule. **Locates the confirmed pink**: the
   direction's T-PALETTE resolution said pink is "live in the
   service-tile row" — precisely located now: it's `couch-red.svg`'s
   own illustration color on the Hausratversicherung card, not a tile
   *background* accent (the tile background here is neutral, not
   pastel — pastel *backgrounds* are exclusive to quick-access and
   stat-row, per `DESIGN.md` § The Two-Tile Rule). Rendered
   using the icon-badge treatment, not the card background itself —
   card background stays white per `_brand-extraction.json
   #componentStyle.cards`.

7. **self-check CTA** ("Sind Sie richtig versichert?") — unchanged.
   Captured body copy + "Jetzt Check starten" →
   `/kontakt/services/versicherungscheck.html` (already destination-
   specific) + placeholder image (opaque to extraction).

8. **contact CTA band** (system-component role: `cta-band`, per
   `_brand-extraction.json#systemComponents[name=contact-cta-band]`)
   — "Kontaktieren Sie uns." navy band, "Wir sind für Sie da." sidebar
   with 3 items (Schaden melden / Schreiben Sie uns / Agentur finden),
   "Zur Kontaktübersicht" CTA. Render the captured block verbatim per
   system-component convention — no copy changes.

9. **article-teaser strip** ("Wissenswertes rund um die Themen Bank
   und Versicherung") — 4-card strip, captured verbatim headings +
   dates + "Mehr dazu" links (each already destination-specific per
   its own article href — no registry collision, since "Mehr dazu" is
   a different label from "Mehr erfahren" and each instance points to
   a distinct article). **Same accessibility fix as section 6**: the
   captured screenshot shows the 4th card clipping — add the
   `carouselControl` component here too.

10. **stat row** ("Wir sind Helvetia", system-component role: `other`
    per `_brand-extraction.json#systemComponents[name=wir-sind-helvetia-stat-row]`)
    — 4 pastel tiles (2 Mio.+ / 165+ / 150+ / 7'000+), captured
    verbatim numbers and labels. Render using the reserved accent
    family, unchanged.

11. **footer** (system-component role: `footer`) — unchanged, per
    `_brand-extraction.json#systemComponents[kind=footer]`.

## Layout strategy

- Density: balanced (per `direction.md` § Movements — bounded by the
  multi-audience hard floor regardless; ~64px desktop section padding).
- Single-column content flow at desktop, matching the captured site's
  own composition (no grid-system change proposed).
- Card rows (sections 6, 9) scroll horizontally with the new carousel
  controls at ≥1024px where the captured 4-up grid doesn't fit without
  clipping; collapse to a vertical stack at <768px (existing responsive
  behavior, unchanged).

## Key states

- Default — described above.
- Reduced motion — carousel controls are simple click/keyboard
  triggers, no scroll-jacking; `prefers-reduced-motion` has no special
  case since no motion is introduced this pass.

## Interaction model

- Hero primary/secondary CTAs → existing captured targets
  (zusammenschluss.html / helvetia-schweiz.html), relabeled per the
  registry.
- Carousel controls (sections 6, 9) → advance/retreat the card strip
  by one card; keyboard-operable (`<button>`, native focus + Enter/
  Space activation), each with a destination-neutral accessible name
  ("Vorherige Karte" / "Nächste Karte" — these control scroll
  position, not a link, so they don't need destination-specific
  names).
- All other CTAs → unchanged captured targets, relabeled only where
  the registry requires (sections 2, 4).

## Data attributes

- `header[data-section="header"][data-intent="navigate"][data-layout="two-row"]`
- `section[data-section="hero"][data-intent="brand-statement"][data-layout="split-photo-overlay"][data-items="2"]`
- `section[data-section="quick-access"][data-intent="navigate"][data-layout="tile-grid-6"][data-items="6"]`
- `section[data-section="faq-band"][data-intent="inform"][data-layout="text-image-split"][data-items="1"]`
- `section[data-section="vorsorge-teaser"][data-intent="inform"][data-layout="text-image-split"][data-items="1"]`
- `section[data-section="service-tiles"][data-intent="navigate"][data-layout="carousel-4"][data-items="4"]`
- `section[data-section="self-check"][data-intent="tool"][data-layout="text-image-split"][data-items="1"]`
- `section[data-section="contact-cta-band"][data-intent="contact"][data-layout="full-width-tiles"][data-items="3"]`
- `section[data-section="article-teasers"][data-intent="inform"][data-layout="carousel-4"][data-items="4"]`
- `section[data-section="stat-row"][data-intent="impact"][data-layout="grid-4"][data-items="4"]`
- `footer[data-section="footer"][data-intent="navigate"][data-layout="mega"]`

## Unsourced content (placeholder list)

(none) — all three original runtime-placeholder boxes are resolved to
real captured content as of the 2026-08-10 post-render corrections
below. This page ships with zero placeholders.

**Resolved 2026-08-10 (post-render correction):** `section[data-section="faq-band"] img`
and `section[data-section="self-check"] img` were originally listed
here as placeholders — the initial crawl recorded them as empty grey
blocks because both are lazy-loaded `<img>` elements whose real `src`
only resolves from a `data-src` attribute after the lazy-load library
fires, which the crawler's wait window didn't trigger for these two.
They are **not** JS widgets. Re-fetched the live page directly,
scrolled to trigger the lazy-load, and read the resolved `<img
data-src>` values:
- FAQ band: `.../textimageteaser_copy/image.1782737468969.transform-fp/1200x900/zusammenschluss.jpg`
  (alt: "zusammenschluss") → downloaded to `stardust/prototypes/assets/zusammenschluss.jpg`
- Self-check: `.../textimageteaser_1110_921583543/image.1782711230227.transform-fp/1200x900/insurance-check.jpg`
  (alt: "Helvetia Versicherungscheck") → downloaded to `stardust/prototypes/assets/insurance-check.jpg`

Both now render as real `<img>` elements in the proposed file.

**Resolved 2026-08-10 (second post-render correction):** the third
placeholder, `section[data-section="product-finder"]`, was itself
miscaptured — it is the real "Wir sind für Sie da." quick-access
section (6 tiles), not a JS widget. See § Sections item 3 above and
`DESIGN.json#extensions.ctaLabelRegistry` — none of these 6 tiles use
"Mehr erfahren"-style ambiguous labels so no registry entries were
needed. Data-section renamed `product-finder` → `quick-access`
throughout this brief and the rendered file.

## Open questions for craft

- Whether the carousel control's 40px circular button sits fully
  outside the card row (requiring extra horizontal padding on the
  section) or overlaps the row's edge — page-level layout call, no
  DESIGN.md guidance either way.

<!--
_provenance:
  capturedSourceLineage:
    - section: header
      lineage: "site-wide system-component (carried from _brand-extraction.json#systemComponents[name=site-header])"
    - section: hero
      lineage: "consolidates captured announcement strip (pages/ch-web-de-privatkunden-html.json#body[0]) + captured hero (pages/...#media.imgs[1], #headings[0]) — direction-authorized promotion, see direction.md#movements (ia-priority: merger-message)"
    - section: quick-access
      lineage: "pages/ch-web-de-privatkunden-html.json#ctas[href=schaden-melden.html, praemienrechner.html, kontakt.html ×2, ebanking.baloise.ch] + #body[18] (Kundenportal description) + evidence/before/Versicherung-und-Vorsorge-*.png (tile order, 4+2 layout, accent colors) — corrected 2026-08-10, see § Sections item 3; icons re-fetched live from the DOM 2026-08-10 (see § Sections item 6 note), stardust/prototypes/assets/icons/{car-full-crash-one-car-green,calculator-purple,contact-tangerine,laptop-red,online-banking-red,notebook-smartphone-red}.svg"
    - section: faq-band
      lineage: "pages/ch-web-de-privatkunden-html.json#headings[2] + surrounding body text + ctas[href=zusammenschluss.html]"
    - section: vorsorge-teaser
      lineage: "pages/ch-web-de-privatkunden-html.json#body + ctas[href=vorsorge.html, href=anlageloesungen.html]"
    - section: service-tiles
      lineage: "pages/ch-web-de-privatkunden-html.json#headings[1] + ctas (4 category cards) + evidence/before/Versicherung-und-Vorsorge-*.png (card background, full-resolution re-crop 2026-08-10) + live DOM icon fetch, stardust/prototypes/assets/icons/{car-purple,couch-red,liability-tangerine-1,travel-insurance-air-green}.svg"
    - section: self-check
      lineage: "pages/ch-web-de-privatkunden-html.json#ctas[href=versicherungscheck.html] + surrounding body"
    - section: contact-cta-band
      lineage: "site-wide system-component (carried from _brand-extraction.json#systemComponents[name=contact-cta-band]); sidebar icons added 2026-08-10, live DOM fetch, stardust/prototypes/assets/icons/{twenty-accident,twenty-letter-closed,twenty-location}.svg"
    - section: article-teasers
      lineage: "pages/ch-web-de-privatkunden-html.json#headings[4..9] + ctas (4 article cards)"
    - section: stat-row
      lineage: "site-wide system-component (carried from _brand-extraction.json#systemComponents[name=wir-sind-helvetia-stat-row]); icons added 2026-08-10, live DOM fetch, stardust/prototypes/assets/icons/{gender-neutral-family-purple,warranty-red,location-green,corporate-health-helpline-tangerine}.svg"
    - section: footer
      lineage: "site-wide system-component (carried from _brand-extraction.json#systemComponents[kind=footer])"
  antiTemplatePass:
    - pattern: "hero composition"
      defaultReflex: "centered-stack hero with two-button CTA pair"
      alternatives: ["centered-stack hero (rejected — the captured site uses a left-anchored overlay card on a full-bleed photo, which IS the brand's own signature hero shape)", "full-width type-only hero with no photo (rejected — drops the captured lifestyle photography that carries the brand's warm register)", "left-anchored overlay card on full-bleed photo (picked)"]
      picked: "left-anchored overlay card on full-bleed photo"
      rationale: "Matches the captured hero exactly (pages/...#media.imgs[1]); only the card's copy hierarchy changes (merger message promoted to H1), not the composition shape — per direction.md's brand-faithful mode, the composition itself is not a divergence target."
    - pattern: "card-strip / carousel"
      defaultReflex: "5-up image-card grid as category nav"
      alternatives: ["static 4-up grid with no overflow handling (rejected — this IS the current bug: cards clip mid-word with no affordance)", "vertical list (rejected — the captured site's 4-up horizontal shape is itself the brand's own signature catalogue pattern per _brand-extraction.json#motifs.patterns[card-grid]; replacing it would be an unrequested structural move)", "4-up grid + visible carousel controls (picked)"]
      picked: "4-up grid + visible carousel controls"
      rationale: "Direction brief names this exact fix by name ('give the carousels a visible affordance'); the underlying grid shape is preserved as brand-faithful, only the missing affordance is added."
    - pattern: "CTA band"
      defaultReflex: "full-width color-block CTA band with centered copy"
      alternatives: ["centered-copy variant (rejected — captured site uses a left-heading / right-sidebar-list split, which is the brand's own signature contact-band shape)", "left-heading / right-sidebar-list split (picked, matches captured system component verbatim)"]
      picked: "left-heading / right-sidebar-list split"
      rationale: "System-component role — rendered verbatim per _brand-extraction.json#systemComponents[name=contact-cta-band], no divergence considered or applied."
  substrateTransitions:
    default: "white (#ffffff) / off-white (#fafafa) alternating sections, matching the captured site's own rhythm"
    exceptions:
      - { substrate: "navy (#000d6e)", section: "hero", purpose: "carries the promoted merger statement — the captured site already uses navy as a high-emphasis section ground (contact band, footer); reusing it for the hero's overlay card would over-darken the photo, so the overlay CARD stays white-on-photo per the captured pattern — navy is NOT introduced as a new hero substrate, this exception line documents that the hero substrate stays photo+white-card, matching current state" }
      - { substrate: "navy (#000d6e)", section: "contact-cta-band", purpose: "unchanged system component, captured value" }
    note: "Footer's navy ground is treated as terminal chrome (system-component role), not counted as a mid-page substrate transition, consistent with page-shape-brief.md's system-component carve-out."
  voiceClassification:
    - { section: "header", classification: "captured-verbatim" }
    - { section: "hero", classification: "captured-verbatim", copy: "H1 and subhead text unchanged from capture; only position/hierarchy moved. CTA labels are direction-authorized rewrite per the ctaLabelRegistry.", source: "pages/ch-web-de-privatkunden-html.json#body[0], #headings[0]" }
    - { section: "quick-access", classification: "captured-verbatim", copy: "titles/descriptions verbatim from ctas[]/body[18]; tile layout and colors from evidence/before screenshot", source: "pages/ch-web-de-privatkunden-html.json#ctas, #body[18]; evidence/before/Versicherung-und-Vorsorge-*.png" }
    - { section: "faq-band", classification: "captured-verbatim", copy: "body copy unchanged; CTA label is direction-authorized rewrite." }
    - { section: "vorsorge-teaser", classification: "captured-verbatim" }
    - { section: "service-tiles", classification: "captured-verbatim" }
    - { section: "self-check", classification: "captured-verbatim" }
    - { section: "contact-cta-band", classification: "captured-verbatim" }
    - { section: "article-teasers", classification: "captured-verbatim" }
    - { section: "stat-row", classification: "captured-verbatim" }
    - { section: "footer", classification: "captured-verbatim" }
  reflexRejectAudit:
    bypassed: true
    reason: "Mode A brand-faithful render — display/body families (BaloiseBold/BaloiseText) are pinned by direct, not a reflex pick. See DESIGN.md § Typography."
  copyCadenceBypass:
    rules: ["em-dash-overuse", "marketing-buzzword"]
    basis: "Every section classified captured-verbatim above carries the source brand's own prose, reproduced exactly per the content-sourcing hierarchy. Rewriting it to satisfy a cadence rule would be the fabrication the fidelity setting exists to prevent. Scoped to this proposed file only."
  fidelity: "quick"
-->
