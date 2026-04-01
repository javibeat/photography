# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static photography portfolio website for **Estrela Photography** (estrela.photo), hosted on GitHub Pages. Single-page site with no build system, no package manager, and no framework — just HTML, CSS, and jQuery.

## Development

- **Local server**: Open with VS Code Live Server on port 5503 (configured in `.vscode/settings.json`), or any static file server
- **No build step**: Edit files directly; changes are live on reload
- **Deployment**: Push to `main` branch — GitHub Pages serves from it via CNAME `estrela.photo`

## Architecture

**Single-page layout** — `index.html` (1177 lines) contains everything: hero, about, services, portfolio grid, testimonials, and contact form. Navigation uses anchor links with Isotope filtering.

### Key libraries (all loaded from CDN or local JS)
- **jQuery 3.7.1** + jQuery Easing (CDN) — core DOM/animation
- **Isotope 2 + Packery** (`js/jquery.isotope2.min.js`, `js/packery-mode.pkgd.min.js`) — masonry portfolio grid layout
- **Fancybox** (`js/jquery.fancybox.pack.js`) — lightbox for image viewing
- **Bootstrap 3.4.1** (CDN) — grid system and responsive utilities
- **FontAwesome** (CDN kit) — icons throughout

### CSS structure
- `css/bundle.css` — main stylesheet (reset + all site styles bundled together)
- `css/images.css` — portfolio image-specific styles
- `css/responsive.css` — breakpoints at 1200px, 992px, 767px, 480px
- `css/contact.css` — contact form styles
- `css/flexslider.css`, `css/jquery.fancybox.css` — plugin styles

### JavaScript
- `js/main2.js` — site behavior: navigation, animations, browser detection, mobile handling
- `js/jquery.isotope.load.js` — initializes Isotope grid with packery layout and filter controls
- `js/preloader.js` — fade-out loading screen on window load

### Portfolio filtering
The nav menu filters portfolio items via Isotope. Filter categories: `artists`, `portrait`, `world`. Each `.element` div in the grid has category classes that Isotope uses for show/hide.

### Contact form
Submits to **Formspree** (`https://formspree.io/f/mdorjnyb`) via fetch API with a custom modal for success/error feedback. Logic is inline at the bottom of `index.html`.

### Performance approach
- CSS and fonts load async (media="print" with onload swap pattern)
- LCP image preloaded (`images/LexieBand.webp`)
- Scripts use `defer` attribute
- Images use `.webp` format where possible

### SEO
- Structured data (JSON-LD): Photograph, Organization, FAQPage, Service, ImageObject schemas
- Open Graph + Twitter Card meta tags
- `sitemap.xml` and `robots.txt` present
- Google Analytics via gtag (`G-K69QKZKL8R`)
- Content-Security-Policy header set via meta tag

## Important notes

- Images are large photography files — avoid committing unnecessary image changes
- Cache-busting uses `?v=N` query params on CSS/JS references in `index.html`; increment when updating those files
- The `404.html` is a standalone page with its own inline styles (references `css/styles.css` which does not exist — uses `css/reset.css` only)
