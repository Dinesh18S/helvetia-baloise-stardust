# The Stardust Redesign

Concept redesign of the Helvetia Baloise Swiss private customer page.
Unaffiliated with Helvetia Baloise. All brand assets, copy and imagery are
sourced from their own live properties. Nothing is invented.

Live: https://dinesh18s.github.io/helvetia-baloise-stardust/
French: https://dinesh18s.github.io/helvetia-baloise-stardust/stardust/prototypes/ch-web-fr-personnes-privees-html-proposed.html

---

## Part one: the case, written for the customer


Reading the CSS on helvetia.com tells you something the page itself does not
announce. The heading and body faces are `BaloiseBold` and `BaloiseText`,
self hosted and embedded directly. The type layer of the merged identity is
already in production. Your own zusammenschluss page states the intent
plainly: the new identity is the familiar Helvetia name combined with the
fresh Baloise design. That work shipped.

What has not followed it is the information architecture. Four things,
measured rather than asserted:

**The heading hierarchy has no first step.** H1 and H2 both compute to 38px.
There is no visual difference between the most important statement on the
page and a section label.

**The page is illegible to machines.** Lighthouse 13.3.0 scores this page
1 out of 2 on Agentic Browsing, with the accessibility tree reported as not
well formed, on both mobile and desktop runs. Links are flagged as not
crawlable, and interactive elements are missing accessible names. Nine
separate calls to action read "Mehr erfahren", against 41 distinct CTA labels
across the captured surface. A screen reader, a crawler and an AI assistant
answering "where do I report a claim with Helvetia" all face the same
problem. As search shifts toward synthesis, this stops being an
accessibility footnote and becomes a distribution question.

**The mobile experience collapses.** Mobile Lighthouse performance is 42
against 90 on desktop, on the same page. Largest Contentful Paint 6.2
seconds, First Contentful Paint 5.5 seconds, Total Blocking Time 1,040ms,
roughly 3,970ms of estimated savings available from render blocking requests
alone, plus 505 KiB of unused CSS and 489 KiB of unused JavaScript. Insurance
research happens on phones.

**The brand fonts have no safety net.** Computed style reports the stacks as
literally `BaloiseBold` and `BaloiseText` with no comma separated fallback. On
a slow connection, with no fallback and a six second LCP, there is no
graceful path.

**And the merger message does not say the same thing in every language.**
This is the finding that matters most for a group operating in eleven
markets. The German page says Helvetia and Baloise are now one. The French
announcement strip says the company is part of the Helvetia Baloise group.
The French FAQ band says something closer to the German. Same site, same
week, same rebrand, three different formulations of the single most
consequential fact the group has published. The French footer also carries
one fewer link in its Portail column than the German equivalent. These are
not translation errors. They are what happens when the same message is
authored separately per locale.

That last point is the commercial argument. This is what a single authored
source across markets is for. The page source shows you are on classic AEM:
`_jcr_content` appears 65 times in the rendered DOM, and the live page still
publishes `<meta name="editingPage" content="/content/os/ch/web/de/private-customers.html">`,
so the authoring path is leaking into production output. The move to Edge
Delivery is not a rebuild. It is the route to authoring these blocks once
and having every market inherit them, with the performance and machine
readability problems fixed as a property of the platform rather than as a
project.

**What the concept demonstrates.** The same page, same palette, same type
family, same voice, rebuilt against measured constraints. One `main`
landmark. Zero accessible name collisions. Contrast between 12:1 and 16.4:1,
which clears AAA. Zero horizontal overflow across seven viewport widths.
Eager loading with fetchpriority on the LCP image. Reduced motion respected.
Every heading a real step in a modular scale. Every call to action naming
its own destination.

---

## Part two: the four questions

### Which site, and why

`helvetia.com/ch/web/de/privatkunden.html`.

Four things made it the right target. It is a live and expensive problem: a
merged group mid rebrand across eleven markets and four language regions,
where the identity work has partly shipped and the structure has not caught
up. It is already on classic AEM, so the conversation is an upgrade rather
than a displacement. I verified that two ways: the live page still exposes
classic AEM conventions, `_jcr_content` paths, a `/content/dam/` asset tree
and a `/content/` author path in the `editingPage` meta, and Adobe's own
implementation partners have published Helvetia AEM engagements, including
Netcentric's Adobe Target rollout across their European properties. Its
audience skews older, which makes the accessibility findings
commercial rather than compliance driven. And it is headquartered in Basel.

Not the helvetia.com root, which is a country selector rather than a
homepage. Not helvetia-baloise.com, which is the investor facing group site.
The Swiss private customer page is the actual front door.

I nearly chose Victorinox instead. Roughly fifty country sites on a
competitor CMS, iconic brand equity, and a redesign of it would look far
better in a portfolio. I rejected it because the business case is weaker and
because a taste led redesign of a beloved brand proves less than a hierarchy
and accessibility case backed by numbers.

### What Stardust gave me that I kept

**The captured brand surface, in full.** 558 live CSS custom properties, the
computed type scale, the logo pulled from their own DAM at
`content/dam/os/ch/web/assets/graphics-and-icons/system/logo/helvetia-logo-rgb.svg`,
the three woff font files, the real multicolour product icons. Everything in
the concept traces to a captured selector, custom property or computed style.
This is why the note can make claims about their CSS at all.

**The One Navy Rule.** Extract identified that `#000d6e` carries both the
default text colour and the primary action colour, and flagged that
introducing a separate neutral text grey would be a departure from the system
rather than a cleanup. I kept that dual role exactly.

**Flat surfaces.** Four shadow tokens exist in the sheet and none render
visibly on any crawled page. Depth comes from flat colour contrast. Kept.

**The pastel accent family as a system.** I had read the four pastels as a
competing consumer language fighting the institutional navy. Extract showed
they are token defined and reserved to one component. That corrected me, and
they stayed.

**Its restraint.** Two things it declined to do are worth naming. Stardust's
headline feature is structured variation from a rolled seed, and it recorded
a reasoned decision not to roll one, on the grounds that my brief was a
constraint set rather than a request for exploration. And when it reached the
logo variant tension, only one variant having been captured, it refused to
act rather than fabricate a monochrome mark. It also wrote its own
supplementary Playwright pass when it found the bundled crawler captured CSS
custom properties but not computed typography, rather than filling the gap
with plausible values. On the French page it hit an extraction gap and went
back to the live DOM for real French text instead of translating the German,
which is the only reason the locale divergence above was found at all.

**The seven viewport sweep.** It caught two bugs invisible in a single
screenshot: a carousel leaking horizontal scroll width at narrow widths, and
the German compound "Versicherungskompetenz" overflowing its grid column.
The fix went in globally, so the French page inherited it.

### What I overrode

My first direction promoted the merger
statement to the H1, demoting "Mehr als eine Versicherung" to a subhead. It
rendered well. Then I read the destination page behind the announcement link,
which states that the new identity combines the Helvetia name with the
Baloise design and that they remain the customer's partner. So the wordmark
staying is deliberate and permanent, not a pending migration, and "Mehr als
eine Versicherung" is the current post merger promise rather than a stale
tagline. Replacing a permanent brand promise with a time limited
announcement is a downgrade. I kept the variant as evidence:
`variants/variant-a-merger-hero.html` against
`variants/variant-b-brand-promise.html`.

**Where the merger notice went, and why not a banner.** The live placement is
a full width strip above the logo. That region is where users have learned to
expect cookie consent and service messages, so it attracts banner blindness,
and it sits outside the content column entirely. Promoting it to the hero
overstates a temporary fact. It became its own full bleed band directly below
the hero, on the captured `accent-green` tone, left aligned to the content
column so it lines up with every other left edge on the page. Three steps up
from a system message strip, without displacing the brand promise.

**I answered the tensions instead of letting the tool answer them.** On
T-PALETTE, keep accent only, do not expand, and give one accent a second job
as the notice band. On T-SCALE, derive a modular scale from the site's own
values rather than imposing one. The result introduces exactly one new number
in the entire spec: H2 at 30px, because 24 x 1.25 = 30 and 30 x 1.25 = 37.5
reconciles back to their captured 38.

**I corrected the tool's evidence.** Extract recorded the pale pink accent
`#ffeef1` at zero occurrences, sampled with no visible area across five
pages. My own before capture shows it clearly on the Online Services tile.
I supplied the correction and it was logged with a citation rather than
silently accepted. That only surfaced because I read the extraction output
against my own evidence instead of trusting either one.

**I redesigned a section rather than reproducing it.** On the live page the
service cards sit half on top of a lifestyle photograph, the fourth card is
clipped, and a card label lands on a model's face. Reproducing that
faithfully would have imported the defect. The section became a 2x2 card
block beside a full height image, nothing clipped, all four cards at equal
height.

**I removed a control.** That section carries prev and next carousel arrows
for four cards that all fit in the viewport. The control had no function, so
it went. Removing an affordance is a harder call than adding one, and the
carousel stayed on the news strip where the card count genuinely overflows.

**I added states the live site does not have.** The service and stat tiles
contain links but had no hover or focus treatment. Both were added using
existing tokens, with focus visible distinguishable by more than colour.
This is an addition rather than a restoration, so it is an override.

**I restored a pattern the prototype got wrong.** An intermediate render
turned the Privatkunden and Unternehmen audience switcher into a filled pill,
which reads as a button. It is a tab. Reverted to the live pattern.

### What I would do next with another week

**Route it through Edge Delivery.** `stardust:deploy` converts the output
into authorable EDS blocks, each prototype section becoming one block. That
is the step that turns this from a concept into something a marketer edits
without an engineer, and it is what the whole locale argument depends on.

**Build the navigation as its own block.** This is the biggest deliberate
omission and the most interesting remaining problem. The header exposes six
mega menu panels and roughly 90 destinations, all gated behind hover, none of
it crawlable. The visible page body exposes maybe fifteen. So the
architecture is not thin, it is hidden, which is consistent with both the
crawlability flag and the Agentic Browsing score. That is where the
authoring burden and the machine legibility problem both actually live.

**Make the merger notice one block with a placement variable.** The instinct
that it belongs site wide is right; a home page treatment alone is not
enough. One authored block, placement chosen per page, all locales
inheriting the same sentence. Which also fixes the divergence.

**Then the remaining locales**, Italian and English, against the same
registry and scale, plus a copy governance pass so the announcement reads
identically in all four.

**And re-measure on a real deployment.** The numbers below are from a static
page on free hosting. The next thing I would want is the same measurement
taken on an actual Edge Delivery deployment.

---

## The measured result

Same tool both times, Lighthouse 13.3.0.

| | Mobile before | Mobile after | Desktop before | Desktop after |
|---|---|---|---|---|
| Performance | 42 | 88 | 90 | 99 |
| Accessibility | 95 | 100 | 91 | 100 |
| Best Practices | 92 | 100 | 92 | 100 |
| SEO | 92 | 100 | 92 | 100 |
| Agentic Browsing | 1 of 2 | **2 of 2** | 1 of 2 | **2 of 2** |
| LCP | 6.2s | 3.1s | 1.4s | 0.8s |
| Total Blocking Time | 1,040ms | 220ms | 110ms | 0ms |
| Cumulative Layout Shift | 0.014 | 0.001 | 0.095 | 0.001 |

The Agentic Browsing row is the one I would point at. The live page fails
with a malformed accessibility tree; the concept passes. That is the same
structural work that produced Accessibility 100, and it is what makes the
page legible to an assistant answering a customer's question about your
products, rather than only to a human with a mouse.

One caveat, stated plainly: the performance comparison is not like for like.
This is a static single page on GitHub Pages measured against a full AEM
application carrying consent management, analytics, a chat widget and client
rendered tools. Accessibility, Best Practices, SEO and Agentic Browsing are
the directly comparable rows, because those are structural rather than
infrastructural.

Full reports in `evidence/`.

---


This is a static single page concept.

The six mega menus are not rebuilt. Only the language switcher is wired; all
other navigation links are inert. Two sections are absent because their
content is a client rendered widget opaque to static capture, a product
finder and a coverage self check, and I left them out rather than
substituting invented content. Third party chat and feedback widgets are not
reproduced. Interaction states beyond hover and focus were not captured from
the live site and are therefore designed rather than matched.

Full working artifacts in the repository: `stardust/current/` holds the
captured brand surface, `stardust/direction.md` the reasoning trace,
`evidence/before/` the before state with both Lighthouse reports,
`stardust-decisions-log.md` the tool's own log and `NOTES.md` mine.
