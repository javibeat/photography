---
name: Estrela Photography
description: Dark-stage portfolio where the photography glows and booking is one tap away.
colors:
  bg: "#050506"
  bg-raised: "#0d0d0f"
  surface: "rgba(255, 255, 255, 0.045)"
  surface-hover: "rgba(255, 255, 255, 0.08)"
  hairline: "rgba(255, 255, 255, 0.09)"
  text: "#f5f5f7"
  muted: "#b0b0b6"
  faint: "#8e8e94"
  dusk-gold: "#ffb35c"
  dusk-rose: "#ff5e8a"
  dusk-violet: "#8b5cf6"
  whatsapp: "#25d366"
typography:
  display:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.7rem, 7.2vw, 5.6rem)"
    fontWeight: 640
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 3.4rem)"
    fontWeight: 620
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 580
    letterSpacing: "-0.01em"
  numeral:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.4rem, 3.4vw, 3.1rem)"
    fontWeight: 660
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 420
    lineHeight: 1.6
  label:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 540
    letterSpacing: "0.06em"
rounded:
  sm: "14px"
  lg: "24px"
  pill: "999px"
  focus: "4px"
spacing:
  gap-grid: "14px"
  gap-card: "18px"
  wrap-pad: "clamp(20px, 4vw, 40px)"
  section: "clamp(72px, 10vw, 130px)"
components:
  button-primary:
    backgroundColor: "{colors.text}"
    textColor: "#0a0a0b"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "#04310f"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  button-sm:
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  chip-active:
    backgroundColor: "{colors.text}"
    textColor: "{colors.bg}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  nav-pill:
    backgroundColor: "rgba(13, 13, 15, 0.55)"
    rounded: "{rounded.pill}"
    padding: "10px 12px 10px 22px"
  tile:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  plan-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "34px 30px"
  field-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
---

# Design System: Estrela Photography

> Scope: this file documents the **v2 site** (`/v2/`). The v1 site at the repo root is a legacy surface being replaced and is not governed by this system.

## Overview

**Creative North Star: "The Dark Stage"**

The site is a stage, not a page. A near-black room (`#050506`) where the photography is the only bright thing — work glows like product shots in an Apple keynote. UI is glass: translucent white panels (4.5% white) with 1px white hairlines and backdrop blur, floating over the stage. The world is brief-pinned to the Apple / bento / MacPaw / CleanMyMac family: bento grids, pill chrome, one variable typeface, restraint everywhere except the photographs.

One light source colors the room: the **Dubai dusk** (gold → rose → violet). It is used as *light* — soft radial glows bleeding into tile and section backgrounds — never as paint. No gradient text, no gradient buttons, no gradient borders. The only saturated solid is WhatsApp green, and it means exactly one thing: booking. The brand mark is a white script signature (`img/signature.webp`), used in nav, quote tile, and footer.

**Key Characteristics:**
- Near-black stage; photography supplies all richness; UI stays monochrome glass
- Dusk gradient appears only as soft radial light inside backgrounds
- Pill-shaped chrome (nav, buttons, chips, badges); 24px panels; 14px dense elements
- Single typeface (Geist variable); hierarchy by weight and tracking, not by family
- WhatsApp green = booking, everywhere and only there
- Motion is one authored moment (hero stagger) plus quiet scroll reveals

## Colors

A monochrome glass system over near-black, lit by three dusk hues and punctuated by one functional green.

### Primary
- **Dusk Gold** (`#ffb35c`): the interactive accent of the dusk trio — focus rings, checkmarks in plan lists, FAQ hover/open state, input caret and focused borders, in-copy links. The only dusk hue that touches UI states directly.
- **Dusk Rose** (`#ff5e8a`): quotation marks in testimonials, text selection background, form error text; radial glow behind the featured plan and quote tile.
- **Dusk Violet** (`#8b5cf6`): ambient light only — radial glows in the hero scrim, quote tile, and footer. Never on text or controls.

### Secondary
- **WhatsApp Green** (`#25d366`): booking CTAs (`.btn-whatsapp`, mobile nav circle) and form success text. Paired with dark-green ink `#04310f` for contrast.

### Neutral
- **Stage** (`#050506`): page background, scrims, active-chip text. `bg-raised` (`#0d0d0f`) backs native popups (select options) and the nav glass tint.
- **Glass** (`rgba(255,255,255,0.045)`): resting surface for every panel — tiles, cards, inputs, ghost buttons, lightbox controls. **Glass Hover** (`rgba(255,255,255,0.08)`) is its interaction/open state.
- **Hairline** (`rgba(255,255,255,0.09)`): the universal 1px border. Hover borders brighten to `rgba(255,255,255,0.16–0.18)`.
- **Ink** (`#f5f5f7`): headings, primary buttons' fill, active chip fill. **Muted** (`#b0b0b6`): body copy, nav links, list items. **Faint** (`#8e8e94`): captions, placeholders, fine print, "or" separators.

### Named Rules
**The Light-Not-Paint Rule.** The dusk gradient (gold→rose→violet) exists only as soft `radial-gradient` light bleeding into tile, plan, and footer backgrounds at 10–32% alpha. It never fills text, never paints buttons, borders, or icons. Individual dusk hues may appear solid only in the small functional roles listed above.

**The Green-Means-Booking Rule.** WhatsApp green appears exclusively on booking actions and the form's success message. It is the conversion color; scarcity is the point.

**The Glass-Not-Gray Rule.** Surfaces are translucent white over the stage, never opaque grays. A panel's resting state is `rgba(255,255,255,0.045)` + 1px hairline; its active state raises alpha, not hue.

## Typography

**Display/Body Font:** Geist variable, weights 100–900, self-hosted (`fonts/geist-latin.woff2`), fallback `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.

**Character:** One quiet grotesk doing everything. Big sizes go tight (-0.03em to -0.035em tracking) and heavy-ish (620–660); body sits at a slightly-light 420. The white script signature image is the only non-Geist letterform and it is a brand mark, not type.

### Hierarchy
- **Display** (640, `clamp(2.7rem, 7.2vw, 5.6rem)`, lh 1.02, -0.035em): hero headline only. `text-wrap: balance`, max-width 14ch.
- **Headline** (620, `clamp(2rem, 4.6vw, 3.4rem)`, lh 1.08, -0.03em): section `h2`s. About's `h2` runs one notch smaller (`clamp(1.9rem, 3.6vw, 2.8rem)`).
- **Title** (580, 1.25rem): plan card names. Pull-quote variant: 540, `clamp(1.35rem, 2.4vw, 1.9rem)`, used in the signature quote tile and testimonials.
- **Numeral** (660, `clamp(2.4rem, 3.4vw, 3.1rem)`, lh 1, `font-variant-numeric: tabular-nums`): AED prices. The bento fact numerals (`72h`, `DXB`) run the same voice up to 3.6rem. Currency prefix is a small uppercase label in Faint.
- **Body** (420, 1.0625rem, lh 1.6): copy. Muted color; measures capped at 46–68ch depending on context.
- **Label** (540, 0.85rem, +0.06em, UPPERCASE): photo-tile tags and the AED currency marker. The only uppercase in the system.

### Named Rules
**The One-Face Rule.** Geist is the only typeface. Hierarchy comes from the variable axis (420→660) and tracking, never from a second family or a system display face.

**The Bare-Headline Rule.** Headings stand alone. No kicker, eyebrow, or overline above any heading — the section `h2` is the first line of every section.

## Layout

- **Container:** `.wrap` at max 1200px, inline padding `clamp(20px, 4vw, 40px)`. Narrow variant `.wrap-narrow` at 780px for FAQ and contact.
- **Section rhythm:** `padding-block: clamp(72px, 10vw, 130px)`; section head margin-bottom `clamp(36px, 5vw, 56px)`.
- **Bento** (why-book strip): 6-column grid, 150px auto-rows, dense flow, 14px gap. Photo tiles span 2×3 and 2×2; fact tiles 2×1; quote tile 4×1. Collapses to 2 columns ≤1000px, single column ≤560px (photo tiles switch to aspect-ratios 4/5 and 1/1).
- **Gallery:** 4-column grid, 190px auto-rows, dense flow, 14px gap. Verticals span 1×3, horizontals 2×2. 2 columns ≤820px.
- **Plans / quotes / form:** 18px gaps. Plans are 3-up, stacking to a 560px single column ≤1000px with the featured plan reordered first. Quotes 2-up → 1. Form rows 2-up → 1 ≤560px.
- **Breakpoints:** 1000px (grids collapse), 820px (nav switches to toggle + dropdown, gallery 2-col), 560px (single column, full-width hero buttons).
- **Hero:** full viewport (`100svh`, 92svh ≤560px), content bottom-anchored with `clamp(64px, 10vh, 120px)` bottom padding; the photograph fades into the stage via a vertical scrim ending in solid `bg` at 98%.

## Elevation & Depth

No decorative resting shadows. Depth comes from three materials: **glass** (translucent white fill + 1px hairline + `backdrop-filter: blur(14–24px) saturate(1.4)` on nav, mobile menu, lightbox), **scrims** (photos darken toward the stage via gradients so tiles and the hero dissolve into the background), and **ambient dusk light** (radial glows inside backgrounds).

### Shadow Vocabulary
Shadows exist only as a response to state or altitude:
- **Nav scrolled** (`0 12px 40px rgba(0,0,0,0.45)`): the pill gains a shadow (and a more opaque tint, 0.55→0.78) once `scrollY > 24`.
- **Primary hover glow** (`0 10px 34px rgba(255,255,255,0.18)`): white button lifts with a white glow.
- **WhatsApp hover glow** (`0 10px 34px rgba(37,211,102,0.35)`): green glow, same geometry.
- **Lightbox image** (`0 30px 80px rgba(0,0,0,0.6)`): the one deep shadow, on the enlarged photo.

### Named Rules
**The Shadow-As-State Rule.** Nothing casts a shadow at rest on the stage. Shadows appear on hover (button glows), on scroll (nav), or at the lightbox's altitude — then disappear.

## Shapes

Pill-and-panel language. **Pills** (999px) for all chrome: nav bar, every button, chips, badges, skip link. **Panels** (24px, `--radius`): bento tiles, plan cards, testimonial cards, about photo, mobile menu. **Dense elements** (14px, `--radius-sm`): gallery shots, FAQ rows, form fields, lightbox image, mobile menu links. **Circles**: lightbox controls, mobile WhatsApp nav button, plan-list check bullets. Focus outlines round to 4px. Every panel carries the 1px hairline border; borders never thicken, they brighten. No sharp corners anywhere in the UI.

## Components

### Navigation (glass pill)
- Fixed, centered, floating 14px from the top; pill of `rgba(13,13,15,0.55)` + hairline + `blur(20px) saturate(1.4)`.
- Contents: signature brand mark (22px tall), text links (0.92rem, weight 480, Muted → Ink on hover), and a small WhatsApp pill CTA.
- Scrolled state (`.is-scrolled`, past 24px): tint deepens to 0.78 alpha + shadow.
- ≤820px: links move into a dropdown glass panel (24px radius, 0.92 tint, fade/slide in); the bar keeps brand + a 40px circular WhatsApp green button + a two-line hamburger that crosses into an X via `aria-expanded`.

### Buttons
- **Shape:** pill (999px), padding 14px 26px (small: 10px 18px), weight 560, inline-flex with 10px gap for an 18px icon.
- **Primary:** Ink fill (`#f5f5f7`) with near-black text (`#0a0a0b`). Hover: lifts -2px + white glow. Active: presses to scale(0.98).
- **WhatsApp:** `#25d366` fill, `#04310f` text, always with the WhatsApp glyph. Reserved for booking (Green-Means-Booking Rule).
- **Ghost:** Glass fill + hairline; hover raises fill to Glass Hover and brightens border to 0.18.
- **Full** (`.btn-full`) stretches to 100% inside plan cards and the form.

### Chips (gallery filters)
- Transparent pill + hairline, Muted text (0.92rem/500). Hover: Ink text + Glass fill. Active: inverts to Ink fill + Stage text, `aria-pressed` tracks state. Filtering hides shots with `display: none` (`.is-hidden`).

### Bento Tiles
- 24px-radius glass panels, hairline border, overflow hidden. Three species:
- **Photo tile:** full-bleed image + bottom scrim (`rgba(5,5,6,0.55)` → transparent at 45%) + uppercase Label tag pinned bottom-left. Hover zooms image to 1.045 over 1.2s.
- **Fact tile:** big Numeral (`72h`, `DXB`) + Muted support line; backgrounds carry gold (0.18) and rose (0.16) radial light respectively.
- **Quote tile:** pull-quote (24ch max) + 24px signature image; strongest dusk light in the system (violet 0.32 + rose 0.10 radials).

### Gallery Shots
- 14px-radius `<button>` elements (they open the lightbox) with cover images; hover zoom 1.04 over 1.1s. Vertical (1×3) and horizontal (2×2) spans on a dense grid.

### Plan Cards
- 24px glass panel, 34px 30px padding, column layout with 20px gap: Title, AED Numeral price (uppercase Faint currency above), check-list, full-width button.
- Check bullets: 16px glass circle + hairline with a Dusk Gold checkmark drawn in borders.
- Hover: lifts -4px, border brightens to 0.16, fill raises.
- **Featured:** rose radial light (0.13), warm border `rgba(255,140,160,0.28)`, Ink pill badge ("Most popular") overhanging the top, and the Primary (not Ghost) button. Ordered first when stacked.
- Add-ons run as a centered Faint/Muted one-liner below the grid.

### Quote Figures (testimonials)
- 24px glass panel, 38px 36px padding. Blockquote at pull-quote size with Dusk Rose curly quotes supplied by `::before/::after`; Faint attribution line 18px below.

### FAQ (details/summary)
- 14px glass rows, 10px apart. Summary: weight 540, flexed with an 18px plus icon (Faint). Hover and open turn summary/icon Dusk Gold; open rotates the plus 45° into an ×, and the row's fill raises to Glass Hover. Answers are Muted, 68ch max; in-copy links are Dusk Gold.

### Form Fields
- Label (0.88rem/540, Muted) over a 14px-radius glass input, 14px 16px padding, hairline border. Caret Dusk Gold; placeholder Faint.
- Hover brightens border; focus swaps to `border-color: dusk-gold` + Glass Hover fill (outline suppressed — the border is the focus style here).
- Select uses an inlined chevron SVG data-URI; options backed by `bg-raised`.
- Status line (`role="status" aria-live="polite"`): Muted while sending, WhatsApp green on success, Dusk Rose on error (error copy redirects to WhatsApp). Submit button disables during the request.

### Lightbox
- Full-screen `role="dialog" aria-modal="true"`: 0.92 stage tint + `blur(14px)`, image capped at `min(92vw, 1300px)` × 86svh with the system's deepest shadow.
- Controls are 48px glass circles (close top-right, prev/next mid-edges); hover scales 1.06.
- Behavior: opens from any gallery shot, navigation wraps within *currently filtered* shots, Esc closes, arrows step, Tab is trapped among the three buttons, focus moves to close on open and returns to the originating shot on close. Body scroll locks while open.
- **The Hidden-First Rule.** `.lightbox[hidden] { display: none; }` is declared *before* the `.lightbox { display: flex; }` block and must stay. Without it the flex display overrides `hidden`, leaving an invisible full-screen overlay that swallows every click on the page.

### Motion
- **Curve:** everything moves on `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`. Hovers 0.25–0.4s; transforms 0.3–0.5s; image zooms 1.1–1.2s.
- **The Authored-Moment Rule.** The hero load stagger (title → sub → actions rising 28px over 1s at 0s/0.1s/0.2s delays) is the site's one authored entrance. Scroll reveals (`.reveal`: 26px rise, 0.9s, IntersectionObserver, fire once) are applied sparingly — bento tiles and section heads only — and only the bento gets internal stagger (0.08s steps). Content never hides behind animation: reveal styles apply only under the `.js` class, and no-JS pages render fully visible.

## Do's and Don'ts

### Do:
- **Do** keep a WhatsApp booking action reachable within one tap from every region of the page (nav, hero, each plan card, contact) — it is the product's primary conversion path.
- **Do** give every panel the same skin: `rgba(255,255,255,0.045)` fill + 1px `rgba(255,255,255,0.09)` hairline; interaction raises fill/border alpha, nothing else.
- **Do** fade photography into the stage with scrims ending in `#050506` — images belong to the room, they don't sit in frames.
- **Do** keep the accessibility invariants: global `:focus-visible` = 2px Dusk Gold outline, 3px offset, 4px radius; skip link revealed on focus; lightbox focus trap + focus return; `prefers-reduced-motion` collapses all animation/transition durations to 0.01ms and forces `.reveal` visible; scroll-behavior falls back to auto.
- **Do** use `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`) for any new movement, and keep new reveals off unless the element is a bento tile or section head.
- **Do** ship images as responsive `.webp` (`srcset` + `sizes`, explicit width/height, `loading="lazy"` below the hero) — performance is part of the brand promise.

### Don't:
- **Don't** fill text with the dusk gradient, or use it on buttons, borders, icons, or any UI chrome — it is background light only (Light-Not-Paint Rule).
- **Don't** add kickers, eyebrows, or overlines above headings (Bare-Headline Rule).
- **Don't** use WhatsApp green for anything except booking CTAs and the form success state.
- **Don't** introduce opaque gray surfaces, a second typeface, sharp corners, or decorative resting shadows.
- **Don't** reorder the lightbox CSS: `[hidden] { display: none }` must precede the `display: flex` rule (Hidden-First Rule).
- **Don't** let motion gate content — any element animated on scroll must be fully visible without JavaScript and under reduced motion.
