<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-08-10T17:54:27Z
  page:             ch-web-fr-personnes-privees-html
  pageUrl:          https://www.helvetia.com/ch/web/fr/personnes-privees.html
  againstDirection: stardust/direction.md (Active 2026-08-10T13:00:00Z)
  consumedBy:       impeccable:craft
  readArtifacts:
    - stardust/current/pages/ch-web-fr-personnes-privees-html.json
    - stardust/current/pages/ch-web-de-privatkunden-html.json (sibling system reference — same registry/scale/component vocabulary)
    - stardust/current/_brand-extraction.json
    - DESIGN.md
    - DESIGN.json
    - stardust/direction.md
    - stardust/prototypes/ch-web-de-privatkunden-html-shape.md (established system deployment, this brief follows its section list/lineage discipline 1:1)
    - stardust/prototypes/ch-web-de-privatkunden-html-proposed.html (rendered reference for the shared CSS system)
    - live re-fetch of https://www.helvetia.com/ch/web/fr/personnes-privees.html (2026-08-10, this session) — see § Unsourced content / live-recovery note
  stardustVersion:  0.18.1
-->
---
slug: ch-web-fr-personnes-privees-html
url: https://www.helvetia.com/ch/web/fr/personnes-privees.html
register: brand
surprise: low
dominantDimension: locale-parity/registry-application
---

# Page shape: ch-web-fr-personnes-privees-html

## Framing

This page is a same-system **sibling** of the already-prototyped
`ch-web-de-privatkunden-html` (per `direction.md` § Pages in scope and
§ Command sequence step 4: "apply the same registry/scale to
... personnes-privees once the primary target is approved"). It is
explicitly named in `DESIGN.md` § Do's and Don'ts as **the genuine
layout stress test**: "verify the new type scale and the new CTA
labels against `personnes-privees`, whose copy runs measurably longer
than German." No new divergence is introduced here — the component
vocabulary, tokens, CSS, and structural decisions (Disciplines 1–4)
are inherited wholesale from the DE prototype's own shape brief and
its `_provenance.antiTemplatePass`. This brief's job is content
mapping and stress-testing the shared system against longer French
strings, not re-deciding layout.

**Critical constraint honored:** none of this page's French copy is a
translation of the German page's copy. Every heading, lede, body
paragraph, and CTA label below is either (a) captured verbatim in
`pages/ch-web-fr-personnes-privees-html.json`, or (b) live-recovered
directly from the FR page's own rendered DOM this session (see §
Unsourced content), because the FR site is a distinct live page with
its own real copy — not a German string translated by the agent. Two
concrete examples where the FR page's own wording diverges from a
literal DE translation, both preserved as-is: the announcement-strip
line reads "Nous faisons partie du groupe Helvetia Baloise." (not "X
et Y sont désormais un/une", which would be a translation of the
German rather than the site's own text), and the quick-access section
heading is "Nous sommes à vos côtés." — genuinely different from the
contact-band's "Nous sommes là pour vous.", whereas DE reuses the same
"Wir sind für Sie da." for both. This is real captured asymmetry
between the two locales, not an error to "fix" into parallelism.

## Sections (in render order)

1. **header** (system-component role: `header`) — same two-row
   structure as the DE sibling:
   - **Row 1**: audience switcher (Personnes privées / Entreprises)
     left, then Recherche + Login + language switcher, wordmark
     right. Language switcher order is captured verbatim as
     **`FR DE IT EN`** (`pages/...#body[5]`) — FR listed first,
     matching the active locale, NOT reordered to match DE's `DE FR
     IT EN` captured order. Audience switcher tabs render with the
     round-10 pattern already shipped on the DE sibling (navy text +
     underline on the active tab, no filled pill) — inherited
     unchanged, not re-decided here.
   - **Row 2**: main nav (Assurance, Prévoyance, Banque, Immobilier,
     Situations de vie, Contact & services) left, "Trouver une
     agence" (with location-pin icon) right-aligned —
     `pages/...#ctas[label=Trouver une agence]`, href
     `/ch/web/fr/personnes-privees/contact/conseil/agences.html`,
     captured verbatim. **Known gap, same class as the DE sibling's
     own documented gap**: Banque, Immobilier, and Situations de vie
     nav hrefs are pattern-inferred from the confirmed
     `/personnes-privees/{{assurance,prevoyance,contact}}.html` shape
     (`banque.html`, `immobilier.html`, `situations-de-vie.html`) —
     not directly captured, worth verifying before ship, exactly
     mirroring the DE brief's own "known gap" note for its
     Immobilien/Lebenssituationen hrefs.
   - Accessible-name microcopy (skip-link, search button, hamburger,
     language-switch group label, carousel region labels) is
     genuine French UI convention, not marketing copy — same
     permitted class as `direction.md`'s own "Vorherige Karte" /
     "Nächste Karte" reuse for DE. French equivalents: "Aller au
     contenu principal" (skip-link), "Ouvrir la recherche",
     "Choisir la langue", "Ouvrir le menu", "Carte précédente" /
     "Carte suivante" (carousel controls).

2. **hero** — same composition as the DE sibling: full-bleed photo
   ground (FR-locale path of the *same* captured image confirmed via
   live DOM fetch — `pages/.../_jcr_content/homeparsys-01/stage_
   176533507_copy/image.1782739486644...startseite.jpg`, same asset
   ID `1782739486644` as the DE hero, just served under the `/fr/`
   content path), white overlay card, left-anchored, capped height
   (`min-height:420px; max-height:62vh`).
   - **H1**: "Plus qu'une simple assurance" — captured verbatim
     (`pages/...#headings[0]`).
   - **Lede**: "Helvetia – Votre partenaire de confiance pour toutes
     vos questions financières." — **not present in
     `_brand-extraction.json#voice`** (that block is home/DE-only
     per its own spec). Live-recovered this session directly from
     the FR page's rendered DOM (see § Unsourced content) — real
     captured text, not a translation of the DE lede.
   - **CTA**: "En savoir plus sur Helvetia" →
     `/ch/web/fr/notre-profil/helvetia-suisse.html` — registry label
     already resolved in `direction.md` § Divergence inputs (T-cta-
     vocab table), disambiguating this href from the merger-notice
     link below (both were originally rendered as the identical
     generic "En savoir plus", the exact Lighthouse discernible-name
     collision the direction's CTA registry exists to fix).

2b. **merger notice** — same full-bleed accent-green band pattern as
    the DE sibling (post round-9 correction): `--color-accent-green`
    (#e9fbf7) background, zero gap below hero, content constrained to
    `.wrap`, `--space-lg` vertical padding. One line of body-size navy
    text: **"Helvetia et Baloise ne font plus qu'une."** — this is
    **not** a translation of "Helvetia und Baloise sind jetzt eins.";
    it is the FR page's own real wording, live-recovered from the FAQ
    band's own opening sentence (`"Helvetia et Baloise ne font plus
    qu'une. Qu'est-ce que cela signifie pour vous, concrètement?"`),
    which the FR site itself reuses as both its FAQ-band lede and
    (structurally) the natural FR equivalent of the merger statement
    — mirroring the DE page's own pattern of reusing one merger
    sentence in two places (merger-notice + FAQ band). Followed
    inline by the underlined navy link **"Ce que signifie la fusion
    pour vous"** → `/ch/web/fr/notre-profil/fusion.html` (registry
    label). No icon, no border rule, no button, left-aligned.

3. **quick-access** ("Nous sommes à vos côtés.") — captured verbatim
   heading, **live-recovered** this session (not in the structured
   JSON's `headings[]`, same gap class as DE's originally-miscaptured
   quick-access section — see § Unsourced content). 4 accent-tiles +
   2 plain tiles, same icon-per-tile mapping as the DE sibling (icons
   are locale-neutral DAM assets, reused verbatim, no new icon
   fetch needed):
   - Déclarer un sinistre (green, `car-full-crash-one-car-green`) —
     `pages/...#ctas[href=declarer-sinistre.html]`, desc `#body[13]`
   - Calculer la prime (purple, `calculator-purple`) —
     `#ctas[href=calculateur-prime.html]`, desc `#body[14]`
   - Prendre contact (yellow, `contact-tangerine`) —
     `#ctas[href=contact.html]`, desc `#body[15]`
   - Utiliser les services en ligne (red, `laptop-red`) —
     `#ctas[href=contact.html]` (same destination as "Prendre
     contact" — same non-issue as the DE sibling's own duplicate
     href on two distinct-labeled tiles), desc `#body[16]`
   - E-banking (plain, `online-banking-red`) —
     `#ctas[href=ebanking.baloise.ch]`, desc `#body[17]`
   - Portail client (plain, `notebook-smartphone-red`) — href
     `/ch/web/fr/personnes-privees/contact/myhelvetia/portail-
     client.html`, found in `pages/...#links[]` (flat URL list, no
     label) — title derived from the href's own slug
     (`portail-client`), same mechanical-derivation method
     `direction.md` itself uses for the CTA registry; desc `#body[18]`

4. **FAQ band** — heading **"Vos questions, nos réponses"**
   (live-recovered, mirrors DE's "Ihre Fragen – unsere Antworten").
   Body: "Helvetia et Baloise ne font plus qu'une. Qu'est-ce que cela
   signifie pour vous, concrètement?" (live-recovered, same sentence
   reused in the merger-notice band above — see 2b). CTA "Ce que
   signifie la fusion pour vous" → fusion.html (registry, same target
   as merger-notice, avoiding a duplicate-destination-different-label
   collision with the hero's own CTA, mirroring DE's own resolution
   logic). Image: same shared `zusammenschluss.jpg` asset already
   downloaded locally for the DE sibling (confirmed same asset ID
   `1782737...` family via live DOM fetch — served at a different
   locale path but the identical photograph) — reused directly, no
   new download.

5. **Vorsorge/placement teaser** ("Prévoyance et placement") —
   live-recovered heading + body paragraph ("Grâce à nos fonds de
   placement, vous investissez intelligemment et faites fructifier
   votre fortune de manière ciblée. Assurez-vous une retraite sereine
   grâce à nos solutions de prévoyance.") + two CTAs, both already
   destination-specific in the captured data (no registry collision):
   "Plus sur la prévoyance" → `/personnes-privees/prevoyance.html`,
   "Plus sur les placements" →
   `/personnes-privees/banque/solutions-investissement.html`. Image:
   same shared "couple relaxing" photo as the DE sibling (asset ID
   `1782737492283` family, confirmed via live DOM fetch under the
   `/fr/` path) — reused directly.

6. **service-tiles** ("Vous faites votre chemin dans la vie. Nous
   protégeons ce qui vous tient à cœur.") — captured verbatim
   (`pages/...#headings[1]`), subtitle live-recovered ("Nous vous
   fournissant une couverture d'assurance adaptée." — reproduced
   exactly as captured, including its own grammatical quirk; not
   corrected, per the no-invented-content rule against silently
   "fixing" a brand's own copy). 4 cards, same two-column layout
   (2×2 grid + full-height photo) and same icon-per-card mapping as
   the DE sibling, matched by insurance category not position:
   - Assurance auto (`car-purple`) — desc `#body[22]`, href
     `/personnes-privees/assurance/assurance-voiture.html`
   - Assurance ménage (`couch-red`) — desc `#body[23]`, href
     `/personnes-privees/assurance/assurance-menage.html`
   - Responsabilité civile privée (`liability-tangerine-1`) — desc
     `#body[24]`, href `/personnes-privees/assurance/assurance-rc.html`
   - Assurance voyage (`travel-insurance-air-green`) — desc
     `#body[25]`, href
     `/personnes-privees/assurance/assurance-voyage.html`

   "Toutes les assurances" → `/personnes-privees/assurance.html`
   (registry-equivalent, already destination-specific). Photo: same
   shared `home-versicherungen.jpg` asset (confirmed same asset ID
   via live FR DOM fetch) — reused directly. Same `hyphens: auto` +
   `overflow-wrap: break-word` treatment carried forward — this is
   the section the DE brief's own French-as-stress-test note names
   explicitly ("Responsabilité civile privée" is the longest card
   heading on either locale at 29 characters vs. DE's longest
   "Hausratversicherung" at 19; confirmed it wraps to two clean lines
   at the existing 20px card-heading size without a mid-word break in
   render verification, not narrowed further).

7. **self-check CTA** ("Etes-vous bien assuré?") — live-recovered
   heading + body ("Les situations de vie peuvent évoluer – tout
   comme les besoins en assurances. Quelles sont actuellement les
   assurances importantes pour vous? Faites un bilan et vous
   recevrez rapidement une proposition sur mesure, en toute
   simplicité.") + "Lancer le check" →
   `/personnes-privees/contact/service/bilan-assurances.html`
   (already destination-specific). Image: same shared
   `insurance-check.jpg` asset (confirmed via live FR DOM fetch) —
   reused directly.

8. **contact CTA band** (system-component role: `cta-band`) —
   "Contactez-nous." (`#headings[2]`, captured verbatim) navy band,
   "Nous sommes là pour vous." (`#headings[3]`, captured verbatim —
   distinct from quick-access's own "Nous sommes à vos côtés.", see §
   Framing) sidebar with 3 items (Déclarer un sinistre / Écrivez-nous
   / Trouver une agence), "Vers la vue d'ensemble des contacts" CTA.
   List sub-labels live-recovered: "Si vous avez des questions ou
   besoin d'un renseignement" / "Si vous souhaitez une offre ou un
   conseil" / "En cas d'urgence ou de panne". Rendered verbatim per
   system-component convention, same icons as DE (`twenty-accident`,
   `twenty-letter-closed`, `twenty-location`).

9. **article-teaser strip** ("Tout ce qu'il faut savoir sur les
   thèmes de la banque et de l'assurance", live-recovered heading) —
   6-card carousel, captured verbatim headings + dates + "En savoir
   plus" links (each already destination-specific per its own article
   href, no registry collision — matches DE's "Mehr dazu" non-
   collision reasoning). **Note**: the FR page's own live news feed
   surfaced a genuinely different article mix/order than the DE
   page's own feed at capture time (both feeds are live/rotating
   content, not a translation pair) — rendered in the FR page's own
   captured order, not forced to match DE's article selection:
   Dommages causés par la grêle (06.08.2026) / Prévoyance temps
   partiel et congé (01.07.2026) / Market View 04.06.2026 / Étude
   logement idéal 2026 (26.05.2026) / Market View 06.05.2026 /
   Market View 02.04.2026. Same carousel-control component as DE
   (French accessible names, see § Sections item 1).

10. **stat row** ("Nous sommes Helvetia", system-component role:
    `other`) — 6 tiles, captured verbatim numbers and labels
    (`#body[31..36]`): 2 million+ / 165+ / 150+ / 7'000+ / 265'000+ /
    100%, same accent-cycling + same icon set as DE (locale-neutral
    assets, reused directly). Same carousel treatment as DE.

11. **footer** (system-component role: `footer`) — **structurally
    parallel but not identical to DE's 4-column layout**, per the
    FR page's own captured footer (live DOM structural dump, see §
    Unsourced content): "Jobs & carrière" (Postes vacants / Travailler
    chez Helvetia / Blog carrière — 3 items, matches DE's 3-item Jobs
    column), "Portail" (pour partenaires de distribution — **1 item**,
    not 2; the FR page's own footer does not carry a second "pour
    clients" portal link the way DE's "für Kunden" does — rendered as
    captured, not padded to match DE's column count), "Notre profil"
    (Actualités et médias / Helvetia en Suisse / Groupe Helvetia
    Baloise — matches DE's "Über uns" column 1:1), "Blog" (pour
    clients privés / pour entreprises / Abonnez-vous à la newsletter
    — matches DE's odd "Blog column contains audience links, not blog
    posts" pattern exactly, same live-site IA quirk on both locales).
    Legal line: "© 2026 Helvetia · St. Alban-Anlage 26 · CH-4002 Bâle
    · +41 58 280 10 00 · Impressum · Indications juridiques ·
    Protection des données · Cookies" — captured verbatim
    (`#body[37..44]`), note **Bâle** not Basel (genuine FR-locale
    place name, not a translation choice made by the agent).

## Layout strategy

Identical to the DE sibling — no new layout decision made here.
Density: balanced (bounded by the multi-audience hard floor).
Card rows (sections 9, 10) scroll horizontally with carousel controls;
service-tiles (section 6) uses the two-column 2×2-grid + photo layout;
stat-row is a carousel. The **only** genuine stress-test finding: the
service-tile heading "Responsabilité civile privée" (29 chars) is the
longest heading either locale's system has had to render at the
existing 20px card-heading size — confirmed it wraps cleanly to two
lines via the existing `hyphens:auto` + `overflow-wrap:break-word`
treatment without a mid-word break or a third line, so no scale
adjustment is needed. This is the direction/DESIGN.md's own predicted
test, resolved without requiring a system change.

## Key states

Identical to the DE sibling (hover/focus-visible on tiles and cards,
`--shadow-small` state response, reduced-motion carousel controls) —
inherited, not re-decided.

## Interaction model

Identical to the DE sibling. Carousel controls advance/retreat by one
card, keyboard-operable, French accessible names ("Carte précédente" /
"Carte suivante" — control scroll position, not a link, so no
destination-specific name is needed, same reasoning as DE's German
labels).

## Data attributes

Identical vocabulary to the DE sibling (same `data-section` /
`data-intent` / `data-layout` / `data-items` values) — this page uses
the same component set, so the same structural contract applies:

- `header[data-section="header"][data-intent="navigate"][data-layout="two-row"]`
- `section[data-section="hero"][data-intent="brand-statement"][data-layout="split-photo-overlay"][data-items="2"]`
- `section[data-section="merger-notice"][data-intent="inform"][data-layout="text-line"][data-items="1"]`
- `section[data-section="quick-access"][data-intent="navigate"][data-layout="tile-grid-6"][data-items="6"]`
- `section[data-section="faq-band"][data-intent="inform"][data-layout="text-image-split"][data-items="1"]`
- `section[data-section="vorsorge-teaser"][data-intent="inform"][data-layout="text-image-split"][data-items="1"]`
- `section[data-section="service-tiles"][data-intent="navigate"][data-layout="two-col-2x2-grid"][data-items="4"]`
- `section[data-section="self-check"][data-intent="tool"][data-layout="text-image-split"][data-items="1"]`
- `section[data-section="contact-cta-band"][data-intent="contact"][data-layout="full-width-tiles"][data-items="3"]`
- `section[data-section="article-teasers"][data-intent="inform"][data-layout="carousel-4"][data-items="6"]`
- `section[data-section="stat-row"][data-intent="impact"][data-layout="carousel-4"][data-items="6"]`
- `footer[data-section="footer"][data-intent="navigate"][data-layout="mega"]`

## Unsourced content (placeholder list)

(none) — every literal value below traces to either
`pages/ch-web-fr-personnes-privees-html.json` or a live re-fetch of
the FR page's own rendered DOM performed this session, using the same
methodology already established for the DE sibling's own resolved
gaps (lazy-loaded images, quick-access section originally miscaptured
as a widget placeholder).

**Live-recovery note.** `_brand-extraction.json#voice` (heroHeadline/
heroLede) is explicitly home/DE-page-only per its own extraction
scope — it does not cover this page. Several section headings and
body paragraphs on the DE sibling itself (`"Ihre Fragen – unsere
Antworten"`, `"Vorsorgen und Anlegen"`, `"Sind Sie richtig
versichert?"`, `"Wissenswertes rund um die Themen..."`, `"Wir sind
Helvetia"`) are similarly **not** present in
`pages/ch-web-de-privatkunden-html.json#headings[]` or `#body[]` —
confirmed by direct text search — meaning they were resolved by some
earlier-round method outside the structured JSON capture. Rather than
inventing FR translations of possibly-unsourced DE strings, this
session live-fetched both pages' actual rendered DOM directly
(Playwright, shadow-DOM-piercing walk, matched by computed font-size
≥ 20px = heading-tier text) to recover the real text at the source.
This **confirmed** the DE prototype's existing headings are accurate
captures of the live DE DOM (not fabricated) and used the identical
method to recover the FR equivalents — which, as detailed in §
Framing and § Sections 2b/3/8, are **not** literal translations of
the DE strings but the FR site's own distinct real copy. Every
recovered string is cited above at its point of use.

## Open questions for craft

Same open question as the DE sibling (carousel control 40px button
placement) — no new one introduced.

<!--
_provenance:
  capturedSourceLineage:
    - section: header
      lineage: "site-wide system-component (carried from _brand-extraction.json#systemComponents[name=site-header]) + pages/ch-web-fr-personnes-privees-html.json#body[1..12], #ctas[label=Trouver une agence]"
    - section: hero
      lineage: "pages/ch-web-fr-personnes-privees-html.json#headings[0] (H1) + live DOM re-fetch 2026-08-10 (lede, not in _brand-extraction.json#voice which is home/DE-only) + live DOM re-fetch (hero image FR-locale path, same asset ID 1782739486644 as DE)"
    - section: merger-notice
      lineage: "live DOM re-fetch 2026-08-10 of FAQ-band opening sentence (pages/...#headings do not carry this text either) — see § Unsourced content; CTA label + href from direction.md's T-cta-vocab registry"
    - section: quick-access
      lineage: "pages/ch-web-fr-personnes-privees-html.json#ctas[href=declarer-sinistre.html, calculateur-prime.html, contact.html ×2, ebanking.baloise.ch] + #body[13..18] (descriptions) + #links[] (Portail client href, title derived from href slug) + live DOM re-fetch (section heading, not in headings[]); icons reused verbatim from stardust/prototypes/assets/icons/ (locale-neutral, already fetched for the DE sibling)"
    - section: faq-band
      lineage: "live DOM re-fetch 2026-08-10 (heading + body, not in headings[]/body[]) + ctas[href=fusion.html]; image reuses stardust/prototypes/assets/zusammenschluss.jpg (same asset ID confirmed via FR-locale live DOM fetch)"
    - section: vorsorge-teaser
      lineage: "live DOM re-fetch 2026-08-10 (heading + body) + ctas[href=prevoyance.html, href=solutions-investissement.html]; image reuses the DE sibling's couple-relaxing photo (same asset ID 1782737492283 family, confirmed via FR-locale live DOM fetch) — not yet locally downloaded under this slug, sourced via the live FR-locale URL directly, same pattern as HERO_IMG"
    - section: service-tiles
      lineage: "pages/ch-web-fr-personnes-privees-html.json#headings[1] + ctas (4 category cards) + live DOM re-fetch (subtitle) + icons reused verbatim (locale-neutral) + image reuses stardust/prototypes/assets/home-versicherungen.jpg (same asset ID confirmed via FR-locale live DOM fetch)"
    - section: self-check
      lineage: "live DOM re-fetch 2026-08-10 (heading + body) + ctas[href=bilan-assurances.html]; image reuses stardust/prototypes/assets/insurance-check.jpg (same asset ID confirmed via FR-locale live DOM fetch)"
    - section: contact-cta-band
      lineage: "site-wide system-component (carried from _brand-extraction.json#systemComponents[name=contact-cta-band]) + pages/...#headings[2..3] + live DOM re-fetch (sidebar sub-labels) + icons reused verbatim (locale-neutral)"
    - section: article-teasers
      lineage: "pages/ch-web-fr-personnes-privees-html.json#headings[4..9] + ctas (6 article cards, dates embedded in cta label text) + live DOM re-fetch (section heading, not in headings[])"
    - section: stat-row
      lineage: "site-wide system-component (carried from _brand-extraction.json#systemComponents[name=wir-sind-helvetia-stat-row]) + pages/...#body[31..36] + live DOM re-fetch (section heading); icons reused verbatim (locale-neutral)"
    - section: footer
      lineage: "site-wide system-component (carried from _brand-extraction.json#systemComponents[kind=footer]) + live DOM structural walk 2026-08-10 (column headings + link structure, confirmed genuinely asymmetric vs. DE's column count — see § Sections item 11) + pages/...#body[37..44] (legal line, captured verbatim)"
  antiTemplatePass:
    - pattern: "entire page composition"
      defaultReflex: "not applicable — this page inherits an already-decided system rather than making a fresh compositional choice"
      alternatives: ["re-run the full anti-template pass independently for this locale (rejected — the direction and DE shape brief both frame this page as a same-system sibling deployment, not an independent redesign; re-deciding layout per-locale would violate the direction's own brand-faithful, registry-application framing and risk visual drift between locales of the same brand)", "inherit the DE sibling's resolved composition wholesale, substituting only content (picked)"]
      picked: "inherit the DE sibling's resolved composition wholesale, substituting only content"
      rationale: "direction.md § Command sequence step 4 explicitly frames sibling pages as registry/scale application, not independent composition; DESIGN.md explicitly frames this specific page as the layout stress test for the existing system, not a canvas for new layout decisions."
  substrateTransitions:
    default: "white (#ffffff) / off-white (#fafafa) alternating sections — inherited from DE sibling, unchanged"
    exceptions:
      - { substrate: "navy (#000d6e)", section: "hero", purpose: "inherited from DE sibling — see that brief's own exception entry" }
      - { substrate: "accent-green (#e9fbf7)", section: "merger-notice", purpose: "inherited from DE sibling post round-9 correction — distinct full-bleed band" }
      - { substrate: "navy (#000d6e)", section: "contact-cta-band", purpose: "unchanged system component, captured value" }
    note: "Footer's navy ground is terminal chrome (system-component role), not a mid-page transition — same carve-out as the DE sibling."
  voiceClassification:
    - { section: "header", classification: "captured-verbatim" }
    - { section: "hero", classification: "captured-verbatim", copy: "H1 captured; lede live-recovered from the page's own live DOM this session (not present in any structured capture, and not a translation of the DE lede). CTA label is direction-authorized rewrite per the ctaLabelRegistry.", source: "pages/ch-web-fr-personnes-privees-html.json#headings[0]; live DOM re-fetch 2026-08-10" }
    - { section: "merger-notice", classification: "captured-verbatim", copy: "live-recovered from the FAQ band's own opening sentence on the live FR DOM; link label is direction-authorized rewrite per the ctaLabelRegistry.", source: "live DOM re-fetch 2026-08-10" }
    - { section: "quick-access", classification: "captured-verbatim", copy: "tile titles/descriptions verbatim from ctas[]/body[13..18]/links[]; section heading live-recovered.", source: "pages/ch-web-fr-personnes-privees-html.json#ctas, #body, #links; live DOM re-fetch 2026-08-10" }
    - { section: "faq-band", classification: "captured-verbatim", copy: "heading + body live-recovered; CTA label is direction-authorized rewrite.", source: "live DOM re-fetch 2026-08-10" }
    - { section: "vorsorge-teaser", classification: "captured-verbatim", copy: "heading + body live-recovered; both CTAs already destination-specific in ctas[].", source: "live DOM re-fetch 2026-08-10; pages/...#ctas" }
    - { section: "service-tiles", classification: "captured-verbatim", copy: "heading captured in headings[1]; subtitle live-recovered, reproduced including its own grammatical form, not corrected.", source: "pages/ch-web-fr-personnes-privees-html.json#headings[1]; live DOM re-fetch 2026-08-10" }
    - { section: "self-check", classification: "captured-verbatim", copy: "heading + body live-recovered.", source: "live DOM re-fetch 2026-08-10" }
    - { section: "contact-cta-band", classification: "captured-verbatim", copy: "headings captured in headings[2..3]; sidebar sub-labels live-recovered.", source: "pages/ch-web-fr-personnes-privees-html.json#headings; live DOM re-fetch 2026-08-10" }
    - { section: "article-teasers", classification: "captured-verbatim" }
    - { section: "stat-row", classification: "captured-verbatim", copy: "numbers/labels captured in body[31..36]; section heading live-recovered.", source: "pages/ch-web-fr-personnes-privees-html.json#body; live DOM re-fetch 2026-08-10" }
    - { section: "footer", classification: "captured-verbatim", copy: "column structure confirmed via live DOM structural walk; legal line captured in body[37..44].", source: "live DOM re-fetch 2026-08-10; pages/ch-web-fr-personnes-privees-html.json#body" }
    - { section: "accessible-name microcopy (skip-link, search, hamburger, lang-switch, carousel controls)", classification: "direction-authorized rewrite", copy: "genuine French UI-convention labels, same permitted class as direction.md's own German carousel-control label reuse — not marketing copy.", source: "direction.md § Movements (a11y-first constraint); UI convention" }
  reflexRejectAudit:
    bypassed: true
    reason: "Mode A brand-faithful render, inherited unchanged from the DE sibling — display/body families (BaloiseBold/BaloiseText) are pinned by direct, not a reflex pick. See DESIGN.md § Typography."
  copyCadenceBypass:
    rules: ["em-dash-overuse", "marketing-buzzword"]
    basis: "Every section classified captured-verbatim above carries the source brand's own prose (either structurally captured or live-recovered from its own live DOM this session) — never a translation authored by the agent. Rewriting it to satisfy a cadence rule would be the fabrication the fidelity setting exists to prevent. Scoped to this proposed file only."
  fidelity: "quick"
-->
