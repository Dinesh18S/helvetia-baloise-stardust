<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-08-10T13:00:00Z
  readArtifacts:
    - stardust/state.json
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/DESIGN.json
    - stardust/current/pages/ch-web-de-privatkunden-html.json
    - stardust/current/pages/ch-web-de-geschaeftskunden-html.json
    - stardust/current/pages/ch-web-de-ueber-uns-helvetia-schweiz-html.json
    - stardust/current/pages/ch-web-fr-personnes-privees-html.json
    - stardust/current/pages/index.json
  synthesizedInputs: []
  stardustVersion: 0.18.1
-->
---
title: "Promote the merger message to hero position; fix the type hierarchy, CTA vocabulary, and accessibility tree — brand-faithful"
resolvedAt: 2026-08-10T13:00:00Z
toolkitVersion: "v1.0 (stardust v2)"
schemaVersion: 1
---

# Active direction (2026-08-10T13:00:00Z)

## Phrase

> Direction: the merger is already in the CSS but not in the
> hierarchy. Keep: One-Navy Rule, BaloiseBold/BaloiseText, the four
> pastel accents (accent-only), flat surfaces, direct second-person
> register. Change: promote the merger message to primary hero
> position; give H1 a distinct step above H2; add real fallback
> stacks; give carousels a visible affordance; every interactive
> element gets an accessible name; document gets a main landmark;
> target a well-formed accessibility tree (Lighthouse Agentic
> Browsing 1/2 on both mobile and desktop). T-PALETTE: keep,
> don't expand (pink confirmed live in the service-tile row despite
> zero sampled occurrences). T-SCALE: adopt a modular scale (current
> 38/24/16 is ad-hoc, H1=H2=38px). CTA labels: nine "Mehr erfahren"
> become nine specific labels — root cause of the Lighthouse
> discernible-name failure and the Agentic Browsing 1/2 score.

## Restatement

This is a brand-faithful hierarchy and accessibility refresh, not a
rebrand: palette, primary color, type family, flat-surface treatment,
and voice register all stay pinned to the captured brand surface. What
moves is structural — the merger message is promoted from a dismissible
strip to the primary hero position (an IA-priority elevation, not a
cosmetic tweak); the type scale gains a real H1/H2 distinction via a
modular major-third progression; both brand fonts get production
fallback stacks; carousels gain a visible prev/next affordance instead
of clipping content; and the site gains an explicit, evidence-backed
`a11y-first` constraint (accessible names, a single `main` landmark,
destination-specific CTA labels) driven by measured Lighthouse
findings rather than a generic best-practice ask.

## Movements

- **register** — `brand` (unchanged, inherited)
- **expressive axis** — unchanged (`committed`, inherited from current
  state's visual commitment to navy + BaloiseBold; not moved toward
  `restrained` or `drenched`)
- **tone** — unchanged (`professional-warm`, direct second person)
- **density** — unchanged. Not moved by the phrase. Register is
  `brand` with a multi-audience, >5-section home page (per
  `intent-dimensions.md` § 4 hard floor), so `sectionPadding.desktop`
  is bounded ≤64px regardless of tier; stamped `balanced (default;
  bounded by multi-audience hard floor)`. Not asked as a separate
  question — the floor makes the tier choice practically moot, and
  this direction makes no layout-density claim either way.
- **distinctiveness** — unchanged (`distinctive` — brand already reads
  as itself; this direction does not push toward `singular`)
- **audience** — unchanged (Privatkunden, direct second-person; scope
  stays this page and its DE/FR siblings, `Unternehmen` out of scope)
- **ia-fidelity** — **`reimagined`**. Not auto-pinned by a trigger
  phrase (none of "verbatim"/"same IA"/"reimagine"/"rethink" appear
  literally), but the brief itself contains an explicit spine-level
  move — promoting the merger message into the primary hero position
  is an IA-priority elevation, which `verbatim`'s `locked` mutability
  would forbid. Resolved from the brief's own content rather than a
  separate question round, since the brief already answers it
  decisively. Stamped `reimagined`, narrowly scoped to the moves this
  direction explicitly names — not an open invitation for prototype to
  restructure further.
- **constraints** — `brand-faithful` (explicit), `a11y-first` (new,
  explicit — was implicit and unmet before), `no-invented-assets`
  (explicit: no invented pricing, customer numbers, or brand assets)

## Gaps and questions

None asked this turn — the brief resolved every dimension that would
otherwise need a clarifying question (density's practical effect is
capped by the hard floor regardless of answer; ia-fidelity is
determined by the brief's own explicit hero-promotion instruction).
One evidence correction was accepted without a question, since it was
asserted as a direct observation by the user rather than a request:

1. **Correction:** `_brand-extraction.json#palette[role=accent-red]`
   recorded `occurrences: 0` (sampled with zero visible area across
   the 5 crawled pages). The user states this tone is live in the
   privatkunden service-tile row. **Resolution:** accepted as a
   user-provided correction to captured evidence, not re-verified by
   a new crawl this pass. Recorded in `DESIGN.json#extensions.
   colorMeta.accent-red.note` and in `PRODUCT.md` § Brand Commitments.
   If a future `extract --refresh` samples this tile with visible
   area, that becomes the primary evidence and this note is
   superseded.

## Anchor references

- (none — brand-faithful mode inherits the captured system directly;
  no external reference research was needed or performed)

## Anti-references

- The Generic-2026-SaaS silhouette (toolkit § 1) — standing guardrail,
  not specifically triggered here since no seed was rolled.
- Generic "insurer stock-photo template" drift — explicitly guarded in
  `PRODUCT.md` § Anti-references equivalent (Brand Commitments): fixing
  accessibility and hierarchy must not become an excuse to also swap
  in generic photography or invented marketing copy.

## Divergence inputs

- **seed** — not rolled. See `DESIGN.json#extensions.divergence.seed.reason`:
  the brief is execution-refinement only, with an explicit "keep as
  system" list; rolling an unrequested decade/craft/ground-family seed
  would contradict the brief's own constraint against inventing brand
  moves.
- **picked_by** — `user-constraint` (font deck, palette) /
  `mechanical-derivation` (type scale, CTA labels) / `not-applicable`
  (seed)
- **font deck** — `brand-inherited` (BaloiseBold / BaloiseText, now
  with real fallback stacks)
- **palette** — inherited from `_brand-extraction.json`, widened by one
  user-confirmed deployment (accent-red in service tiles); no new hue
  introduced
- **anti-toolbox audit** — 0 hits. No agent-default reflex was
  introduced; every change is either an inherited value or a
  mechanical derivation from evidence already on hand (H2 size derived
  from H1/H3; CTA labels derived from each link's own href).
- **brand-faithful inversions** — 4 emitted (pure-white retention, hex
  format retention, saturated-primary-as-text retention, reserved-color
  retention for the 4-tone accent family). Full text in
  `DESIGN.json#extensions.divergence.brand_faithful_inversions`.
- **type scale resolution (T-SCALE)** — ad-hoc (38/38/24/16, H1=H2)
  → modular major-third for the heading chain (38/30/24), body (16)
  held independently as the readability floor. H2=30px is the only new
  numeric value in this entire direction; it's derived as
  `24 × 1.25`, and `30 × 1.25 = 37.5 ≈ 38` reconciles back to the
  captured H1 value — the fix uses only values already implied by the
  live site's own two captured heading sizes.
- **CTA label resolution (T-cta-vocab)** — 9 "Mehr erfahren" instances
  (across `privatkunden` ×2, `geschaeftskunden` ×1, `ueber-uns` ×1,
  `index` ×5 — the `personnes-privees` French equivalents, "En savoir
  plus" ×2, get parallel treatment) resolved to destination-specific
  labels, derived mechanically from each link's own `href`. Full
  mapping in `DESIGN.json#extensions.ctaLabelRegistry.entries`:

  | href | new label |
  |---|---|
  | `/ch/web/de/ueber-uns/helvetia-schweiz.html` | Mehr über Helvetia erfahren |
  | `/ch/web/de/ueber-uns/zusammenschluss.html` | Was der Zusammenschluss für Sie bedeutet |
  | `/ch/web/fr/notre-profil/helvetia-suisse.html` | En savoir plus sur Helvetia |
  | `/ch/web/fr/notre-profil/fusion.html` | Ce que signifie la fusion pour vous |
  | `/corporate/.../fusionsunterlagen.html` | Zu den Fusionsunterlagen |
  | `/corporate/.../investor-relations.html` | Zu Investor Relations |
  | `/corporate/.../karriere.html` | Offene Stellen entdecken |
  | `/corporate/.../angebot/versicherungen.html` | Unser Versicherungsangebot entdecken |
  | `/corporate/.../medienmitteilungen.html` | Alle Medienmitteilungen lesen |

  Two links sharing the *same* destination (e.g. both instances of
  `helvetia-schweiz.html`) correctly keep the *same* label — the
  Lighthouse discernible-name failure is about identical text pointing
  at *different* destinations, not about label reuse per se.

## Command sequence (proposed)

1. `$stardust direct` (this command — writes `PRODUCT.md`, `DESIGN.md`,
   `DESIGN.json`, this file)
2. `$stardust prototype ch-web-de-privatkunden-html` — render the
   primary target with the promoted merger hero, new type scale,
   destination-specific CTAs, and the a11y component fixes
3. `$impeccable critique` — verify the a11y tree and hierarchy fixes
   landed without introducing off-brand moves
4. `$stardust prototype` (siblings) — apply the same registry/scale to
   `geschaeftskunden`, `ueber-uns`, `personnes-privees` once the
   primary target is approved

## User confirmation

> Direction supplied as a fully-resolved, decisive brief (keep/change
> lists, explicit tension resolutions, explicit accessibility targets)
> via the initial `$stardust direct` invocation. Treated as
> self-confirming — see restatement above for the full plan now on
> record; the user may correct any item before `prototype` runs.

## Pages in scope

- `ch-web-de-privatkunden-html` (primary target)
- `ch-web-de-geschaeftskunden-html`, `ch-web-de-ueber-uns-helvetia-schweiz-html`,
  `ch-web-fr-personnes-privees-html` (siblings — same registry/scale
  apply when each is prototyped)
- `index` (helvetia.com → helvetia-baloise.com corporate page) — out of
  scope for prototyping (this page was flagged `suspect` at extract
  time; its captured CTAs are used only as registry evidence above)
