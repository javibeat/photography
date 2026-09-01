# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static photography portfolio website for **Estrela Photography** (estrela.photo), hosted on GitHub Pages. Single-page site with no build system, no package manager, and no framework — just HTML, CSS, and jQuery. There are no tests, lint, or typecheck scripts; verification is manual in the browser.

## v1 / v2 status (September 2026)

A full redesign (**v2**) lives in `/v2/` — dark Apple/bento style, WhatsApp-first CTAs, targeting musicians/DJs/performers in Dubai. The old site (v1, described below) still serves at the root and is also preserved on branch `v1-backup`. v2 is `noindex` until approved; the swap checklist is in `V2-LAUNCH.md`. Product truth is in `PRODUCT.md`; visual system in `DESIGN.md`. v2 has its own self-contained assets (`v2/img/`, `v2/fonts/`, `v2/css/`, `v2/js/`) and no jQuery.

## Development

- **Local server**: `npm run serve` (or VS Code Live Server) on port 5503 → http://localhost:5503/v2/
- **No build step**: Edit files directly; changes are live on reload
- **Deployment**: Push to `main` — GitHub Pages serves it via CNAME `estrela.photo`
- **Tests**: `npm test` — Vitest suite in `tests/` covering v2 DOM behavior (filters, lightbox, menu, form) and static integrity (asset references, WhatsApp number, JSON-LD ↔ page consistency). Run before every commit that touches v2.
- **Lighthouse**: `npm run lighthouse` (needs the local server running). Targets: 100/100/100/100; SEO shows 69 locally only because of the intentional v2 noindex.

## QA procedure (before committing v2 changes)

1. `npm test` — all green.
2. Verify in a real browser (screenshots via Playwright in scratchpad, or manually): desktop 1440, mobile 390, mobile menu open, lightbox open. jsdom tests do NOT catch CSS-level bugs — a `display:flex` on `.lightbox` once overrode `[hidden]` and blocked every click on the page; only real-browser checks catch that class of failure.
3. Lighthouse ≥ current scores (Perf 99+ local).
4. Review `git diff` before committing.

## Architecture

### Everything is one Isotope grid — the URL hash is the router

`index.html` (~1200 lines) contains the whole site as `.element` divs inside `#container`, laid out by Isotope 2 with the Packery layout mode. The nav links (`#home`, `#about`, `#services`, `#artists`, `#portrait`, `#world`, `#portfolio`, `#clients-say`, `#contact`) are **not scroll anchors** — they are Isotope filters. `js/jquery.isotope.load.js` pushes the hash via jquery.ba-bbq, listens for `hashchange`, and applies `filter: '.' + hash` to the grid. Default filter is `home`.

So each "page" (about, services, contact…) is just the subset of `.element` divs carrying that class. An element can appear in several views by having multiple category classes, e.g. `class="element clearfix rectangle col1-1 home portfolio artists"`. To add content to a view, add its class to an element; to add a nav item, the hash in the link must match a class used on elements.

### Key libraries (CDN or local `js/`)
- **jQuery 3.7.1** + jQuery Easing (CDN) — core DOM/animation
- **Isotope 2 + Packery** (`js/jquery.isotope2.min.js`, `js/packery-mode.pkgd.min.js`) + **jquery.ba-bbq** (hash state) — grid layout and filtering
- **Fancybox** (`js/jquery.fancybox.pack.js`) — image lightbox
- **Bootstrap 3.4.1** (CDN) — grid system and responsive utilities
- **FontAwesome** (CDN kit) — icons

### CSS — what actually loads
Only these stylesheets are referenced by `index.html`:
- `css/bundle.css` — main stylesheet (reset, all site styles, and the responsive media queries)
- `css/images.css` — portfolio image-specific styles (loaded async)
- `css/jquery.fancybox.css` — lightbox styles (loaded async)

`css/responsive.css`, `css/contact.css`, and `css/flexslider.css` exist but are **not loaded** — don't edit them expecting changes on the site. `css/reset.css` is used only by `404.html`.

### JavaScript
- `js/main2.js` — site behavior: navigation, animations, browser detection, mobile handling
- `js/jquery.isotope.load.js` — grid init + hash-based filtering (see above)
- `js/preloader.js` — fade-out loading screen on window load

### Contact form
Submits to **Formspree** (`https://formspree.io/f/mdorjnyb`) via fetch, with a custom modal for success/error feedback. The submit handler is inline at the bottom of `index.html`.

### Performance approach
- Non-critical CSS and Google Fonts load async (`media="print"` with `onload` swap, plus `<noscript>` fallbacks)
- LCP image preloaded (`images/LexieBand.webp`)
- All scripts use `defer`
- Images use `.webp` where possible

### SEO
- Structured data (JSON-LD): Photograph, Organization, FAQPage, Service, ImageObject schemas in the `<head>`
- Open Graph + Twitter Card meta tags
- `sitemap.xml`, `robots.txt`, `manifest.json`, `humans.txt` present
- Google Analytics via gtag (`G-K69QKZKL8R`)

## Important notes

- **CSP**: a Content-Security-Policy meta tag in `index.html` whitelists external hosts per directive. Adding any new CDN script, stylesheet, font, or fetch endpoint requires updating it, or the resource is silently blocked.
- **Cache-busting**: CSS/JS references in `index.html` use `?v=N` query params — increment when changing those files.
- Images are large photography files — avoid committing unnecessary image changes. `images/_backup/` is gitignored.
- `404.html` is standalone with its own inline styles; it loads only `css/reset.css` plus CDN Bootstrap/fonts.
