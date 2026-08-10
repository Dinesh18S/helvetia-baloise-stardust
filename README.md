# The Stardust Redesign, Helvetia Baloise

Concept redesign of the Helvetia Baloise Swiss private customer page, built
with [Stardust](https://stardust.style) as a Claude Code plugin.

Take home exercise for Adobe, AEM Engineering, Basel. August 2026.

**Unaffiliated with Helvetia Baloise.** Every brand asset, font, icon, image
and line of copy is sourced from their own live properties or DAM. Nothing is
invented.

---

## See it

| | |
|---|---|
| **German, primary target** | [Live page](https://dinesh18s.github.io/helvetia-baloise-stardust/) |
| **French, layout stress test** | [Live page](https://dinesh18s.github.io/helvetia-baloise-stardust/stardust/prototypes/ch-web-fr-personnes-privees-html-proposed.html) |
| **The note** | [NOTE.md](NOTE.md) |

Original: [helvetia.com/ch/web/de/privatkunden.html](https://www.helvetia.com/ch/web/de/privatkunden.html)

---

## The short version

Their heading and body faces are already `BaloiseBold` and `BaloiseText`,
self hosted and embedded. The merged identity has shipped in production CSS.
What has not followed it is the structure.

- H1 and H2 both compute to 38px, so there is no hierarchy step
- Mobile Lighthouse 42 against 90 on desktop, same page, LCP 6.2 seconds
- Agentic Browsing 1 of 2, accessibility tree reported as not well formed
- Nine identical "Mehr erfahren" links against 41 distinct CTA labels
- Brand font stacks with no fallback behind them
- And the merger message does not say the same thing in German and French

That last one is the commercial argument, and it is in
[NOTE.md](NOTE.md).

---

## Measured result

Lighthouse 13.3.0, before and after.

| | Mobile before | Mobile after | Desktop before | Desktop after |
|---|---|---|---|---|
| Performance | 42 | 88 | 90 | 99 |
| Accessibility | 95 | 100 | 91 | 100 |
| Best Practices | 92 | 100 | 92 | 100 |
| SEO | 92 | 100 | 92 | 100 |
| Agentic Browsing | 1 of 2 | **2 of 2** | 1 of 2 | **2 of 2** |
| LCP | 6.2s | 3.1s | 1.4s | 0.8s |
| Total Blocking Time | 1,040ms | 220ms | 110ms | 0ms |

The performance rows are not like for like: a static page on GitHub Pages
against a full AEM application. The structural rows are.

Full reports in [`evidence/`](evidence/).

---

## What is in here

| Path | What it is |
|---|---|
| [`NOTE.md`](NOTE.md) | The submission note. Start here after the live page. |
| [`NOTES.md`](NOTES.md) | My raw working log, including where I got things wrong. |
| `stardust/prototypes/` | The two rendered pages, self contained HTML |
| `stardust/current/` | Captured brand surface: 558 CSS custom properties, fonts, logo, per page JSON, screenshots |
| `stardust/direction.md` | Full reasoning trace and the CTA label registry |
| `stardust/scripts/` | The crawler, plus the supplementary computed style pass Stardust wrote for itself |
| `variants/` | Variant A, rejected. Variant B, shipped. Reasons in the note. |
| `evidence/before/` | Before state: screenshots, both Lighthouse reports, the classic AEM source proof |
| `stardust-decisions-log.md` | Stardust's own log of the pipeline |
| `CLAUDE.md` | The guardrails written before anything ran |
| `DESIGN.md`, `DESIGN.json`, `PRODUCT.md` | Target spec |

The `postRenderCorrections` block inside each prototype's HTML head is a
timestamped record of every change made after the first render, and why.

---

## Scope

The six mega menus are not rebuilt. Only the language switcher is wired, all
other navigation is inert. Two sections are absent because their content is a
client rendered widget opaque to static capture, and I left them out rather
than substituting invented content. Third party chat and feedback widgets are
not reproduced.

Stated in full in [NOTE.md](NOTE.md).

---

## Pipeline

```
claude plugin marketplace add adobe/skills
claude plugin install stardust@adobe-skills
claude plugin marketplace add pbakaus/impeccable
claude plugin install impeccable@impeccable
```

```
/stardust:extract https://www.helvetia.com/ch/web/de/privatkunden.html
/stardust:direct
/stardust:prototype ch-web-de-privatkunden-html
/stardust:prototype ch-web-fr-personnes-privees-html
```

---

Selvadinesh Sasikumar · [selvadinesh.com](https://selvadinesh.com)
