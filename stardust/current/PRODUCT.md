# Product

<!-- impeccable:product-schema 1 -->
<!-- stardust:current-state — descriptive snapshot of the live site at https://www.helvetia.com/ch/web/de/privatkunden.html, written by stardust:extract on 2026-08-10. Not an interview: every section below is derived from captured page content and the brand surface (_brand-extraction.json). Sections marked _inferred_ are the agent's reading of the evidence, not a confirmed answer. -->

## Platform

web

## Users

_Inferred from page copy and navigation structure._ Two primary audiences, split at the top of every page's navigation: **Privatkunden** (private/retail customers — individuals and families buying personal insurance, pension/retirement (Vorsorge), and related banking products) and **Unternehmen** (business customers — companies and SMEs, "KMU"). This extraction focuses on the Privatkunden surface. Within that audience the copy addresses people making everyday-life insurance and retirement decisions (home, vehicle, travel, liability, health, pension planning), in direct second-person address ("Sie leben Ihr Leben. Wir schützen, was Ihnen wichtig ist.").

## Product Purpose

Helvetia is a Swiss insurer offering property/casualty insurance (auto, household contents, liability, travel, health/accident) and retirement/pension products (Vorsorge: life insurance, Säule 3a, disability income) to private customers, plus a parallel business-customer line. The privatkunden page functions as the top-level hub for this audience: hero + primary CTA, a "which insurance do I need" product-finder widget, a self-assessment tool ("Sind Sie richtig versichert?"), a contact/support band, and an editorial content strip (market commentary, guidance articles).

## Positioning

_Inferred._ The site's own banner headline across every crawled page states the current defining fact: **"Helvetia und Baloise sind jetzt eins"** (Helvetia and Baloise are now one) — the company is mid-merger/rebrand, actively surfacing "Mehr als eine Versicherung" (More than just insurance) as its post-merger tagline. The differentiator being claimed is breadth: an integrated offer spanning insurance, pension provision, wealth management, and banking/real-estate services (per the "Über uns" page), rather than a single-product insurer.

## Operating Context

Swiss market, German-language primary (this crawl), with parallel French, Italian, and English locales exposed via a language switcher (DE / FR / IT / EN) on every page. Customers reach account services (myHelvetia / myBaloise E-Banking / BVG online) via a "Login" entry point separate from the marketing surface. The site links out to sibling group properties (helvetia-baloise.com, the merged holding's corporate/investor site) via footer and "Mehr dazu" links about the merger.

## Capabilities and Constraints

- Insurance product categories observed in navigation: Fahrzeuge & Freizeit (auto, motorcycle, travel, pets, e-bike), Zuhause & Recht (household contents, liability, legal protection, building), Gesundheit (health, accident insurance).
- Vorsorge (pension/retirement) product categories: life insurance, disability income, death-benefit insurance, retirement income, Säule 3a, portability (Freizügigkeit).
- Interactive tools referenced but **not captured** by this extraction (client-side widgets that render as empty placeholders in the static crawl — see `_brand-extraction.json#_provenance.notes`): an insurance product-finder/calculator, and a "Sind Sie richtig versichert?" coverage self-check.
- Undecided / out of scope for this snapshot: pricing, underwriting rules, and any product mechanics beyond what the marketing copy states.

## Brand Commitments

- **Never invent brand assets, colours, or typefaces not sourced from the live site** — hard project rule (see project `CLAUDE.md`). Every value in `DESIGN.md`/`DESIGN.json` traces to a captured selector, CSS custom property, or computed style.
- Logo: the Helvetia wordmark (`assets/logo.svg`), captured from the live header.
- Typeface: a proprietary brand font family (`BaloiseBold` / `BaloiseText` / `BaloiseMedium`) — confirms the merged Helvetia/Baloise identity is already live in production CSS, not just in copy.
- Primary brand color: navy `#000d6e`, used as both the dominant text color and the primary action/section color — see `_brand-extraction.json#palette`.
- **Design language must be produced in German first**, with French run as the explicit layout-stress-test locale (project `CLAUDE.md`). This crawl captured both `privatkunden` (DE) and `personnes-privees` (FR) for that reason.
- No factual claims about products, prices, or coverage may be invented downstream; reuse the live page's own copy or generic placeholder text only.

## Evidence on Hand

- 5 live-rendered pages under `stardust/current/pages/`: `privatkunden` (DE, primary target), `geschaeftskunden` (DE, business-customer sibling — IA contrast), `ueber-uns/helvetia-schweiz` (DE, about/company), `personnes-privees` (FR, layout stress test), `index` (helvetia.com root — redirects to the merged group's corporate site; captured a blocking language-selector modal, see caveats in `_brand-extraction.json`).
- Full-page screenshots for all 5 pages under `stardust/current/assets/screenshots/`.
- Brand surface (palette, typography, motifs, components) aggregated in `stardust/current/_brand-extraction.json`, sourced from 558 live CSS custom properties plus computed-style sampling — not guessed.
- Before-state evidence already on hand at `evidence/before/` (Lighthouse reports, screenshots) predates this crawl and was not re-derived here.
- **Absences the redesign must not fabricate:** no pricing, no customer testimonials, no benchmark/rating claims beyond what the live copy already states (e.g. "über 1.3 Mio. Kunden", "seit über 160 Jahren" — reuse verbatim, do not invent new numbers).

## Product Principles

_Inferred from the captured surface; confirm before treating as durable._

1. **Breadth over single-product framing.** Every hero on the crawled pages leads with "more than insurance" — the redesign should keep the multi-product (insurance + Vorsorge + banking) framing visible early, not collapse it into a single-product pitch.
2. **Direct, warm, second-person register.** Copy consistently addresses "Sie" with short declarative sentences; avoid corporate-distant phrasing.
3. **Self-service before contact.** The page sequences a product-finder and self-check tool ahead of the contact band — orientation before escalation to human support.
4. **Merger transparency.** The Helvetia/Baloise merger is surfaced prominently and repeatedly (banner + dedicated "Mehr dazu" links) rather than buried — treat this as an active, not legacy, brand fact.

## Accessibility & Inclusion

_Not established by this extraction._ No accessibility-specific commitments were found in the captured copy. Per project `CLAUDE.md`: every interactive element in downstream work must get an accessible name, and the document must expose a main landmark — this is a project-level floor, not a fact observed on the live site.
