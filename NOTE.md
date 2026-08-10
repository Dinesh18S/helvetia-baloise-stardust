# The Stardust Redesign

Concept redesign of the Helvetia Baloise Swiss private customer page.

Unaffiliated with Helvetia Baloise. All brand assets, copy and imagery come from their own live properties. Nothing has been invented.

Live: https://dinesh18s.github.io/helvetia-baloise-stardust/

French: https://dinesh18s.github.io/helvetia-baloise-stardust/stardust/prototypes/ch-web-fr-personnes-privees-html-proposed.html

---

## Part one: the case

Looking at the CSS on helvetia.com shows that the new Baloise design system is already live. The site uses `BaloiseBold` and `BaloiseText`, hosted directly on the site. The Helvetia/Baloise merger page also makes the direction clear: keep the Helvetia name and bring in the Baloise design.

The identity has changed. The structure of the site hasn't fully caught up.

A few things stood out from the measurements:

**The heading hierarchy is weak.** H1 and H2 both render at 38px, so the main heading and section headings don't feel different enough.

**The page is hard for machines to understand.** Lighthouse 13.3.0 gives the page 1/2 for Agentic Browsing. The accessibility tree is not well formed, some links aren't crawlable, and some interactive elements don't have accessible names. There are also nine CTAs that simply say "Mehr erfahren", even though there are 41 different CTA labels across the captured pages.

This is a problem for screen readers, crawlers and AI assistants trying to understand the site.

**Mobile is much slower.** Performance is 42 on mobile compared with 90 on desktop. Mobile LCP is 6.2s, FCP is 5.5s and Total Blocking Time is 1,040ms.

**The fonts have no fallback.** The computed font stacks are just `BaloiseBold` and `BaloiseText`, with no fallback fonts. If the fonts load slowly, there isn't a graceful fallback.

**The merger message isn't consistent across languages.** The German and French pages describe the merger differently. The French announcement, FAQ and footer also don't completely match the German version.

This is the finding I think matters most. If the same message is authored separately for every market, differences like this are easy to introduce. A shared source would make it easier to keep important messages consistent.

The site is also still using classic AEM. You can see this through things like `_jcr_content`, `/content/dam/` and the `editingPage` metadata.

That makes Edge Delivery a useful next step. The goal isn't to rebuild everything from scratch. It's to make the content easier to author, reuse across markets, and deliver with a lighter frontend.

**What the concept demonstrates:** the same brand, colours, type family and general voice, but with a clearer hierarchy, better accessibility, better mobile performance and clearer CTAs.

---

## Part two: the four questions

### Which site, and why

I chose:

`helvetia.com/ch/web/de/privatkunden.html`

It felt like the right target because the company is in the middle of a merger and rebrand, while the site's structure hasn't fully caught up.

It's also already running on classic AEM, so this is more of an upgrade story than a complete rebuild.

I also considered Victorinox. It would have made a strong portfolio piece, but the business case wasn't as interesting. Helvetia gave me a stronger opportunity to work with real accessibility, content and architecture problems.

I chose the Swiss private customer page rather than the Helvetia root because the root is mainly a country selector. I also didn't use the investor-facing Helvetia Baloise site.

### What Stardust gave me that I kept

**The captured brand system.** 558 CSS custom properties, the type scale, logo, three WOFF font files, product icons and other real brand assets were captured from the live site.

The concept is based on these values rather than inventing a new visual language.

**The One Navy Rule.** `#000d6e` is used for both default text and primary actions. I kept that instead of introducing a new neutral text colour.

**Flat surfaces.** The site has shadow tokens, but they don't visibly appear on the pages I checked. I kept the flat approach.

**The pastel accents.** I originally thought the pastel colours might be competing with the navy. The extracted CSS showed that they are part of the existing system and are used in specific components, so I kept them.

**The tool's restraint.** Stardust didn't invent things when the evidence wasn't there. For example, it didn't create a monochrome logo variant when only one real logo variant had been captured.

It also added a small Playwright pass when the first extraction didn't capture computed typography properly. On the French page, it went back to the live DOM for the real French copy instead of translating the German page. That helped uncover the language differences.

**The seven viewport checks.** These caught two problems that weren't obvious from a single screenshot: horizontal overflow from a carousel and the German word "Versicherungskompetenz" overflowing its grid column.

### What I changed

My first version made the merger message the H1 and moved "Mehr als eine Versicherung" down to a subheading.

I changed that after checking the actual merger page. The Helvetia name is staying, so "Mehr als eine Versicherung" is still the main brand promise. The merger announcement is important, but it shouldn't replace the main brand message.

I kept both directions in:

* `variants/variant-a-merger-hero.html`
* `variants/variant-b-brand-promise.html`

**I moved the merger notice.** The live site puts it in a strip above the logo. I moved it below the hero instead, so the main brand message stays in the hero and the merger information still gets a clear, full-width treatment.

**I adjusted the type scale.** I kept the site's existing values and added H2 at 30px. This gives the hierarchy a clearer step without introducing a completely new system.

**I corrected an extraction issue.** Stardust initially reported that the pale pink accent `#ffeef1` wasn't being used. My own capture showed it on the Online Services tile, so I corrected the finding and logged it rather than silently ignoring it.

**I redesigned the service section.** The live cards overlap a lifestyle image, one card is clipped, and one label sits over the model's face. I kept the same content but changed the layout to a 2x2 card grid next to a full-height image.

**I removed an unnecessary control.** The service section had previous/next arrows even though all four cards fit on screen. I removed them. The news carousel still keeps its controls because that content actually overflows.

**I added hover and focus states.** The live service and stat cards have links but don't have much visible interaction feedback. I added states using the existing design tokens.

**I kept the audience switcher as tabs.** An earlier version made it look like a filled button. That didn't match the live pattern, so I changed it back to tabs.

---

## What I would do next

### 1. Move it into Edge Delivery

`stardust:deploy` can turn the prototype sections into authorable Edge Delivery blocks.

That would be the next step toward making the concept something a content editor could actually maintain.

### 2. Rework the navigation

This is probably the biggest remaining problem.

The header has six mega menus and roughly 90 destinations, most of which are hidden behind hover. The visible page only exposes a small part of that content.

So the problem isn't that the site has too little information. A lot of it is hidden.

I'd build the navigation as its own block and make those destinations easier for both users and machines to discover.

### 3. Make the merger notice reusable

The merger notice should become one shared block that can be used across markets. That would make it easier to keep the wording consistent instead of maintaining separate versions for every locale.

### 4. Apply the same system to the other locales

After the German and French versions, I'd continue with the Italian and English pages using the same components, type scale and content rules.

### 5. Re-measure on a real deployment

The current performance numbers come from a static page on GitHub Pages. I'd run the same tests again once the concept is deployed through Edge Delivery.

---

## The measured result

Same tool in both cases: Lighthouse 13.3.0.

|                         | Mobile before | Mobile after | Desktop before | Desktop after |
| ----------------------- | ------------: | -----------: | -------------: | ------------: |
| Performance             |            42 |           88 |             90 |            99 |
| Accessibility           |            95 |          100 |             91 |           100 |
| Best Practices          |            92 |          100 |             92 |           100 |
| SEO                     |            92 |          100 |             92 |           100 |
| Agentic Browsing        |           1/2 |      **2/2** |            1/2 |       **2/2** |
| LCP                     |          6.2s |         3.1s |           1.4s |          0.8s |
| Total Blocking Time     |       1,040ms |        220ms |          110ms |           0ms |
| Cumulative Layout Shift |         0.014 |        0.001 |          0.095 |         0.001 |

The result I care about most is Agentic Browsing going from 1/2 to 2/2.

The live page has a malformed accessibility tree. The concept has a much clearer structure, which also helped it reach Accessibility 100.

One important caveat: the performance comparison isn't completely like-for-like. The concept is a static page on GitHub Pages, while the live site is a full AEM application with consent management, analytics, chat and other client-side features.

So I'd treat the performance numbers as directional. Accessibility, SEO, Best Practices and Agentic Browsing are more directly comparable.

Full reports are in `evidence/`.

---

## What this concept does not include

This is a static single-page concept, not a full rebuild.

The six mega menus are not rebuilt. Only the language switcher is wired; the other navigation links are inert.

Two sections are missing because they are client-rendered widgets that weren't practical to reproduce from the static capture:

* Product finder
* Coverage self check

I left them out rather than inventing replacement content.

Third-party chat and feedback widgets are also not reproduced.

Interaction states beyond hover and focus were not captured from the live site, so those states are designed rather than copied.

---

## Repository

* `stardust/current/` — captured brand surface
* `stardust/direction.md` — reasoning and direction
* `evidence/before/` — before-state Lighthouse reports
* `stardust-decisions-log.md` — Stardust's log
* `NOTES.md` — my notes and decisions
* `variants/` — alternative directions I explored and rejected

This is a concept based on the live site and measured constraints, not an official Helvetia Baloise redesign.
