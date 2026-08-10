#!/usr/bin/env node
/**
 * style-capture.mjs — supplementary pass for stardust:extract Phase 3.
 *
 * crawl.mjs (the bundled reference crawler) captures content + CSS custom
 * properties but not computed typography, logo/favicon, radius/shadow
 * samples, or @font-face files. This script fills that gap by visiting the
 * already-discovered page URLs a second time and reading computed styles +
 * network font responses directly from the live render.
 *
 * Usage: node style-capture.mjs --pages stardust/current/pages --out stardust/current/_style-capture
 */
import { mkdir, writeFile, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

function parseArgs(argv) {
  const a = { pagesDir: 'stardust/current/pages', out: 'stardust/current/_style-capture' };
  for (let i = 2; i < argv.length; i += 1) {
    const k = argv[i];
    if (k === '--pages') a.pagesDir = argv[(i += 1)];
    else if (k === '--out') a.out = argv[(i += 1)];
  }
  return a;
}

async function capture(page) {
  return page.evaluate(() => {
    const vis = (el) => {
      if (!el) return false;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };

    // --- logo locator chain: inline svg -> img logo-ish -> apple-touch-icon -> og:image -> favicon
    let logo = null;
    const header = document.querySelector('header') || document.body;
    const svgCandidate = header.querySelector('svg[class*="logo" i], a[class*="logo" i] svg, [class*="logo" i] svg');
    if (svgCandidate && vis(svgCandidate)) {
      logo = { source: 'inline-svg', sourceSelector: 'header svg[class*=logo]', markup: svgCandidate.outerHTML.slice(0, 20000) };
    } else {
      const imgCandidate = header.querySelector('img[class*="logo" i], img[alt*="logo" i], a[class*="logo" i] img, [class*="logo" i] img');
      if (imgCandidate && vis(imgCandidate)) {
        logo = { source: 'img', sourceSelector: 'header img[class*=logo]', src: imgCandidate.currentSrc || imgCandidate.src, alt: imgCandidate.alt || '', w: imgCandidate.naturalWidth, h: imgCandidate.naturalHeight };
      }
    }
    if (!logo) {
      const appleTouch = document.querySelector('link[rel="apple-touch-icon"]');
      if (appleTouch) logo = { source: 'apple-touch-icon', sourceSelector: 'link[rel=apple-touch-icon]', src: appleTouch.href };
    }
    if (!logo) {
      const og = document.querySelector('meta[property="og:image"]');
      if (og) logo = { source: 'og-image', sourceSelector: 'meta[property=og:image]', src: og.content };
    }

    // --- favicon (always captured independently)
    const faviconEl = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
    const favicon = faviconEl ? { src: faviconEl.href, type: faviconEl.type || null } : null;

    // --- typography: computed style per heading level + body, first visible match
    const typeSample = (sel) => {
      const els = [...document.querySelectorAll(sel)].filter(vis);
      if (!els.length) return null;
      // pick the largest-font instance (visually dominant), matching brand-surface's weighted-score intent
      let best = null; let bestScore = -1;
      for (const el of els) {
        const cs = getComputedStyle(el);
        const size = parseFloat(cs.fontSize) || 0;
        const weight = parseInt(cs.fontWeight, 10) || 400;
        const score = size * (weight / 400);
        if (score > bestScore) { bestScore = score; best = { fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, color: cs.color }; }
      }
      return best;
    };
    // body: MODE (not max-score) across real paragraphs — avoids bold-outlier bias
    const bodyMode = (() => {
      const els = [...document.querySelectorAll('main p, p')].filter((el) => vis(el) && (el.textContent || '').trim().length > 20);
      const counts = new Map();
      for (const el of els) {
        const cs = getComputedStyle(el);
        const key = JSON.stringify({ fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, color: cs.color });
        counts.set(key, (counts.get(key) || 0) + 1);
      }
      let best = null; let bestN = 0;
      for (const [k, n] of counts) if (n > bestN) { bestN = n; best = JSON.parse(k); }
      return best;
    })();

    const typography = {
      h1: typeSample('h1'),
      h2: typeSample('h2'),
      h3: typeSample('h3'),
      body: bodyMode,
      nav: typeSample('header nav a, nav a'),
    };

    // --- border-radius / box-shadow samples from VISUALLY-STYLED buttons/cards only
    // (raw `a[class*=button]` matches unstyled nav wrappers too; filter to elements
    // that actually carry a background, border, or radius so nav chrome doesn't
    // pollute the motif sample.)
    const isStyled = (cs) => cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.borderRadius !== '0px' || /^\d/.test(cs.borderWidth) && cs.borderStyle !== 'none';
    const sampleStyle = (sel) => {
      const els = [...document.querySelectorAll(sel)].filter(vis);
      const styled = els.map((el) => ({ el, cs: getComputedStyle(el) })).filter(({ cs }) => isStyled(cs));
      return styled.slice(0, 40).map(({ cs }) => ({ borderRadius: cs.borderRadius, boxShadow: cs.boxShadow, backgroundColor: cs.backgroundColor, color: cs.color, padding: cs.padding, fontWeight: cs.fontWeight, borderWidth: cs.borderWidth, borderColor: cs.borderColor }));
    };
    const buttons = sampleStyle('a[class*="button" i], button, [class*="btn" i], [class*="cta" i]');
    const cards = sampleStyle('[class*="card" i], [class*="teaser" i]');

    // --- background colors / text colors across visible elements (sampled, capped)
    const colorSamples = [];
    const walk = [...document.querySelectorAll('body, main, section, header, footer, div, article, a, button, h1, h2, h3, p')].slice(0, 800);
    for (const el of walk) {
      if (!vis(el)) continue;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const area = Math.round(r.width * r.height);
      if (area < 200) continue;
      colorSamples.push({ tag: el.tagName.toLowerCase(), bg: cs.backgroundColor, color: cs.color, area });
    }

    return {
      finalUrl: location.href,
      logo,
      favicon,
      typography,
      buttons,
      cards,
      colorSamples: colorSamples.slice(0, 800),
      themeColor: document.querySelector('meta[name="theme-color"]')?.content || null,
      htmlLang: document.documentElement.lang || null,
    };
  });
}

async function main() {
  const args = parseArgs(process.argv);
  await mkdir(args.out, { recursive: true });
  const files = (await readdir(args.pagesDir)).filter((f) => f.endsWith('.json'));
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  const page = await context.newPage();

  const fontFiles = new Map(); // url -> {url, contentType}
  page.on('response', (res) => {
    const u = res.url();
    if (/\.(woff2?|ttf|otf)(\?|$)/i.test(u)) {
      fontFiles.set(u, { url: u, status: res.status() });
    }
  });

  const results = [];
  for (const f of files) {
    const slug = f.replace(/\.json$/, '');
    const rec = JSON.parse(await readFile(path.join(args.pagesDir, f), 'utf8'));
    const url = rec.finalUrl || rec.url;
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(1500);
      const data = await capture(page);
      const out = { slug, url, ...data };
      await writeFile(path.join(args.out, `${slug}.json`), JSON.stringify(out, null, 2));
      results.push({ slug, ok: true });
      console.log(`[style] OK   ${slug}`);
    } catch (e) {
      results.push({ slug, ok: false, error: String(e) });
      console.log(`[style] FAIL ${slug}  ${e.message}`);
    }
  }
  await writeFile(path.join(args.out, '_fontFiles.json'), JSON.stringify([...fontFiles.values()], null, 2));
  await browser.close();
  console.log(`[style] done. ${results.filter((r) => r.ok).length}/${results.length} captured. fonts: ${fontFiles.size}`);
}

main();
