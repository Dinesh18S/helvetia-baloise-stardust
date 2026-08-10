<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-08-10T13:00:00Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/ch-web-de-privatkunden-html.json
    - stardust/current/DESIGN.md
    - direction brief supplied by the user (Lighthouse scores, computed-style observations)
  stardustVersion: 0.18.1
-->

# Improvements — ch-web-de-privatkunden-html

1. **[ia-clutter]** The Helvetia–Baloise merger announcement
   ("Helvetia und Baloise sind jetzt eins. Mehr dazu") renders as a
   12px dismissible grey strip above the hero — the same visual weight
   as a cookie notice — while the hero itself carries the generic
   tagline "Mehr als eine Versicherung." Per the direction brief, the
   merger is "the most consequential fact the company has communicated
   in a decade."
   *Fix:* Promote the merger message into the primary hero position
   (see `DESIGN.json#extensions.systemComponentRoles.merger-message`);
   the existing tagline becomes supporting copy beneath it rather than
   the lead.

2. **[contrast/dated-pattern]** H1 and H2 both compute to
   `fontSize: 38px, fontWeight: 700` (confirmed via
   `stardust/current/_style-capture/ch-web-de-privatkunden-html.json`
   § typography) — no visual hierarchy distinguishes a page title from
   a major section heading.
   *Fix:* Adopt the modular scale resolved in `DESIGN.md` § Typography
   — H1 stays 38px, H2 moves to 30px (major-third below H1, major-third
   above the unchanged 24px H3).

3. **[a11y]** Nine "Mehr erfahren" CTAs across the site's German pages
   point at nine different destinations with identical visible text —
   the root cause the user identifies for the Lighthouse discernible-
   name failure and the Agentic Browsing score of 1/2 on both mobile
   and desktop. On this page specifically, two instances point at
   `/ueber-uns/helvetia-schweiz.html` and
   `/ueber-uns/zusammenschluss.html` respectively.
   *Fix:* Apply the destination-specific labels from
   `DESIGN.json#extensions.ctaLabelRegistry` — "Mehr über Helvetia
   erfahren" and "Was der Zusammenschluss für Sie bedeutet."

4. **[missed-opportunity]** The insurance-category card row
   (Autoversicherung / Hausratversicherung / Privathaftpflicht /
   Reiseversicherung, confirmed in the current-state screenshot) and
   the "Wissenswertes" article-teaser strip both clip their last
   visible card mid-word at desktop width with no visible indication
   more content exists — swipe-only, no prev/next control.
   *Fix:* Add the carousel-control component from `DESIGN.json`
   (40px circular button, `aria-label="Nächste Karte"` /
   `"Vorherige Karte"`) to both strips.

5. **[a11y]** The document's primary content is not confirmed to sit
   inside a single `main` landmark (per the user's Lighthouse finding).
   *Fix:* Wrap the page's primary content region in exactly one
   `<main>` (or `role="main"`) landmark, distinct from the header/nav
   and footer regions already captured as system components.
