# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static photography portfolio website for **Estrela Photography** (estrela.photo), hosted on GitHub Pages. Single-page site with no build system, no package manager for the site itself, and no framework — just HTML, CSS, and vanilla JS.

Since **September 2026** the root serves the **v2 redesign**: dark Apple/bento style, WhatsApp-first CTAs, targeting musicians/DJs/performers in Dubai. The old jQuery/Isotope site (v1) is preserved on branch `v1-backup` and in git history; `/v2/` now only holds a redirect page to `/`. Product truth is in `PRODUCT.md`; the visual system in `DESIGN.md`; the launch record in `V2-LAUNCH.md`.

## Development

- **Local server**: `npm run serve` (or VS Code Live Server) on port 5503 → http://localhost:5503/
- **No build step**: Edit files directly; changes are live on reload
- **Deployment**: Push to `main` — GitHub Pages serves it via CNAME `estrela.photo`
- **Tests**: `npm test` — Vitest suite in `tests/` covering DOM behavior (filters, lightbox, menu, form) and static integrity (asset references, WhatsApp number, JSON-LD ↔ page consistency). Run before every commit.
- **Lighthouse**: `npm run lighthouse` (needs the local server running). Targets: 100/100/100/100 (Perf 99+ local).

## QA procedure (before committing)

1. `npm test` — all green.
2. Verify in a real browser (screenshots via Playwright in scratchpad, or manually): desktop 1440, mobile 390, mobile menu open, lightbox open. jsdom tests do NOT catch CSS-level bugs — a `display:flex` on `.lightbox` once overrode `[hidden]` and blocked every click on the page; only real-browser checks catch that class of failure.
3. Lighthouse ≥ current scores.
4. Review `git diff` before committing.

## Architecture

Everything lives in `index.html` (single page) + `css/style.css` + `js/main.js`. No external JS dependencies, no jQuery. Font is Geist, self-hosted (`fonts/geist-latin.woff2`).

- **Gallery**: category chips filter `.shot` elements via `data-filter`/`data-cat`; hidden shots get `.is-hidden`.
- **Lightbox**: custom, in `main.js`, opens on `.shot` click with focus trap. CSS regression guard: `.lightbox[hidden] { display: none; }` must exist or the invisible overlay blocks all page clicks (covered by a test, but only a real browser shows the symptom).
- **Mobile menu**: nav toggle button with `aria-expanded`; a compact green WhatsApp pill stays visible in the mobile nav bar.
- **Contact form**: submits to Formspree (`https://formspree.io/f/mdorjnyb`) via fetch with inline success/error feedback.
- **CTAs**: WhatsApp deep links (`https://wa.me/971585324519`) with prefilled per-package messages. The number is asserted by tests.
- **Images**: responsive `.webp` sets in `img/` (480/800/1400/1600 widths) with `.webp.json` provenance sidecars. The originals in `images/` are the source masters — keep them; `images/_backup/` is gitignored.

### SEO / AI SEO
- JSON-LD `@graph` in the head: Photographer, Person, WebSite, FAQPage, OfferCatalog, Reviews. Tests assert FAQ and prices stay in sync with the visible page.
- Open Graph + Twitter Card (`img/og.jpg`), canonical `https://estrela.photo/`.
- `sitemap.xml` (single URL), `robots.txt` (points at sitemap + `/llms.txt`), `llms.txt`, `manifest.json`, `humans.txt`.

## Important notes

- **Cache-busting**: `css/style.css?v=N` and `js/main.js?v=N` in `index.html` — increment `v` when changing those files.
- **`404.html`** is standalone: it loads `css/reset.css` (kept for this purpose only) plus CDN Bootstrap/fonts, and icons from `images/`.
- Images are large photography files — avoid committing unnecessary image changes.
- AED pricing (1,300 / 1,500 / from 4,500) appears in both the page and JSON-LD; change both together (a test enforces it).
