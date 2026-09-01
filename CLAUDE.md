# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static photography portfolio website for **Estrela Photography** (estrela.photo), hosted on GitHub Pages. Single-page site with no build system and no framework — just HTML, CSS, and vanilla JS.

The root serves the **v3 "Exposure Record"** design (September 2026): the page as a darkroom printer's working record — warm paper field, an 11-step zone-ramp rail as navigation, overlapping tilted "sheets", condensed stamped caps + typewriter mono, one dichroic magenta reserved for key rows and booking actions. Design history: v1 (jQuery/Isotope) on branch `v1-backup`; v2 "Dark Stage" (dark bento) on branch `v2-design` / tag `v2-final`. `/v2/` and `/v3/` hold redirect stubs to `/`. Product truth is in `PRODUCT.md`; the visual system in `DESIGN.md`.

## Development

- **Local server**: `npm run serve` (or VS Code Live Server) on port 5503 → http://localhost:5503/
- **No build step**: Edit files directly; changes are live on reload
- **Deployment**: Push to `main` — GitHub Pages serves it via CNAME `estrela.photo`
- **Tests**: `npm test` — Vitest suite in `tests/`: `dom.test.js` (loupe, index sheet, zone rail, form) and `static.test.js` (asset references, WhatsApp number, JSON-LD ↔ page consistency, noindex guard). Run before every commit.
- **Lighthouse**: `npm run lighthouse` (needs the local server running).

## QA procedure (before committing)

1. `npm test` — all green.
2. Verify in a real browser (Playwright screenshots in scratchpad, or manually): desktop 1440, mobile 390, index sheet open, loupe open. jsdom tests do NOT catch CSS-level bugs — an overlay's `display:flex` once overrode `[hidden]` and blocked every click; only real-browser checks catch that class of failure.
3. Review `git diff` before committing.

## Architecture

One page: `index.html` + `css/style.css` + `js/main.js`. No dependencies. Fonts self-hosted in `fonts/` (Big Shoulders variable, Courier Prime 400/700).

- **Zone ramp rail** (`.ramp-rail`): fixed 11-step grayscale rail, desktop vertical / mobile horizontal strip under the header. Sections are "zones" (0–VI, footer X); an IntersectionObserver in `main.js` tracks scroll and frames the active step in magenta. VII–IX are inert steps (the ramp's truth).
- **Sheets**: `.sheet`/`.print` elements carry `--tilt` rotations and reveal with overshoot (`--ease-settle`) via IO — "sheets carry mass". Reveal styles apply only under `.js`; no-JS renders fully visible. Overlaps (hero print plan, add-ons tucked under plan cards, lapped quotes) are deliberate world grammar.
- **Loupe** (lightbox): custom dialog in `main.js` with focus trap, arrow navigation, focus return. CSS guard: `.loupe[hidden] { display: none; }` MUST precede the `.loupe { display: flex; }` block or the invisible overlay swallows every click (regression covered by a static test).
- **Magenta scarcity**: `--mag`/`--mag-deep` appear only on key rows, bar-button delta cells, the header BOOK cell, active rail step, form focus/caret, selection, and booking links. Don't spread it.
- **Contact form**: Formspree (`https://formspree.io/f/mdorjnyb`) via fetch, status line with `role="status"`, error copy routes to WhatsApp.
- **CTAs**: WhatsApp deep links (`https://wa.me/971585324519`) with prefilled per-plan messages; tests assert the number.
- **Images**: responsive `.webp` sets in `img/` (480/800/1400/1600) with `.webp.json` provenance sidecars, referenced by absolute `/img/...` paths. `images/` holds the source masters — keep them; `images/_backup/` is gitignored.

### SEO / AI SEO
- JSON-LD `@graph`: Photographer, Person, WebSite, FAQPage, OfferCatalog, Reviews. Tests assert FAQ questions and prices stay in sync with the visible page.
- Open Graph + Twitter Card (`img/og.jpg`, a 1200×630 capture of the hero), canonical `https://estrela.photo/`.
- `sitemap.xml` (single URL), `robots.txt` (sitemap + `/llms.txt` pointer), `llms.txt`, `manifest.json`, `humans.txt`.

## Important notes

- **Cache-busting**: `css/style.css?v=N` and `js/main.js?v=N` in `index.html` — increment when changing those files.
- **Prices are load-bearing**: AED 1,300 / 1,500 / from 5,500 (+ add-ons 500/500/from 2,500) appear in the page AND the JSON-LD; a test enforces both. `PRODUCT.md` and `llms.txt` carry the same numbers — change all together.
- **`404.html`** is standalone: it loads `css/reset.css` (kept only for this) plus CDN Bootstrap/fonts and icons from `images/`.
- Images are large photography files — avoid committing unnecessary image changes.
