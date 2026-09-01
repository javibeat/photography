---
name: Estrela Photography — The Exposure Record
description: Booking page as the photographer's own darkroom exposure record — craft is the proof.
colors:
  paper: "#e9e5da"
  sheet: "#f4f2ea"
  ink: "#17140f"
  ink-2: "#454034"
  ink-3: "#5d5747"
  mag: "#e33d97"
  mag-deep: "#a8186a"
  z0: "#141210"
  z1: "#29251f"
  z2: "#3d382f"
  z3: "#524b3f"
  z4: "#675f50"
  z5: "#7d7462"
  z6: "#948b77"
  z7: "#aca38e"
  z8: "#c4bca8"
  z9: "#dcd5c4"
  z10: "#f4efe2"
typography:
  display:
    fontFamily: "Big Shoulders, 'Arial Narrow', sans-serif"
    fontSize: "clamp(3.4rem, 10.5vw, 6rem)"
    fontWeight: 560
    lineHeight: 0.92
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Big Shoulders, 'Arial Narrow', sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 3.2rem)"
    fontWeight: 540
    lineHeight: 0.96
    letterSpacing: "0.01em"
  title:
    fontFamily: "Big Shoulders, 'Arial Narrow', sans-serif"
    fontSize: "1.55rem"
    fontWeight: 560
    lineHeight: 1
    letterSpacing: "0.02em"
  body:
    fontFamily: "Courier Prime, 'Courier New', monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Courier Prime, 'Courier New', monospace"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.12em"
rounded:
  none: "0"
spacing:
  pad: "clamp(18px, 4vw, 44px)"
  rail-w: "66px"
  zone-top: "clamp(40px, 6vw, 72px)"
  zone-bottom: "clamp(56px, 8vw, 104px)"
components:
  bar-btn:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.none}"
    padding: "13px 18px"
  bar-btn-hold:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "13px 18px"
  bar-delta:
    backgroundColor: "{colors.mag}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 14px"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "11px 12px"
  sheet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
---

# Design System: Estrela Photography — The Exposure Record

> **Scope.** This file documents the live root site (`index.html`, `css/style.css`, `js/main.js`, `fonts/`) — the v3 "Exposure Record" world, promoted to the root on 2026-09-01. Previous worlds: v1 on branch `v1-backup`, v2 on branch `v2-design`. World source `operate-b-exposure-record-zone-sheets`, seed `a4cf319a`. Every value below is recorded from the built code.

## Overview

**Creative North Star: "The Exposure Record"**

The booking page is the photographer's own darkroom exposure record — craft is the proof. Instead of the dark full-bleed hero portfolio this category always ships (and the v2 it replaces), the artist lands on a warm paper working document already filled out about *them*: real AED numbers, real artist names, real delivery times, annotated with stop-deltas and hatch density marks. The page reads as a printer's paperwork; trust comes from precision, and booking is one tap.

The material system is physical: a grained paper field, translucent record sheets overlapping at slight angles, a backlit 11-step zone ramp serving as both chrome and navigation, and exactly one dichroic magenta — the darkroom filtration color — reserved for key rows and booking actions. The colophon states the doctrine on the page itself: "filtration only."

**Key Characteristics:**
- Warm paper ground with SVG fractal-noise grain baked into the body background
- Two voices only: ultra-condensed stamped caps (Big Shoulders) and typewriter tabular mono (Courier Prime)
- Squared corners everywhere; every rule is 1px ink
- One accent (dichroic magenta) with a hard scarcity doctrine
- Sheets carry mass: entrances drop, over-tilt, and settle with an overshoot ease
- Data lives in tables — `th`/`td` pairs with `font-variant-numeric: tabular-nums`

## Colors

An almost-monochrome warm paper/ink world where the 11-step zone ramp is the only tonal range and one magenta is the only chroma.

### Primary
- **Dichroic Magenta** (`--mag` #e33d97): the darkroom filtration color. Appears only on: the header BOOK cell, bar-button delta cells, the KEY mark chip and key-row hatch, the active zone-ramp frame, the colophon swatch, and `::selection`. Ink text sits on it, never white.
- **Deep Filtration** (`--mag-deep` #a8186a): the pressed/interactive shade of the same filter — `.rec-book:hover`, focused field borders and inset ring, `:focus-visible` outline, `caret-color`, FAQ inline links, and form error text.

### Neutral
- **Paper** (`--paper` #e9e5da): the working field. Body background under the noise grain; also the resting fill of form inputs, so fields read as part of the paper until focused.
- **Sheet** (`--sheet` #f4f2ea): the record-sheet material — every `.sheet`, `.print`, the index sheet, and text-on-ink (bar buttons, inverted hovers).
- **Ink** (`--ink` #17140f): text, every 1px rule (`--rule` is an alias of ink), and the fill of primary bar buttons. Hairlines are this same ink diluted via `color-mix` to 25–35% — never a separate grey.
- **Ink 2** (`--ink-2` #454034): running copy (decks, intros, about paragraphs, colophon).
- **Ink 3** (`--ink-3` #5d5747): annotations — labels, table headers, zone-head tags, print numbers, placeholders.

### The Zone Ramp
Eleven fixed warm-grey steps, `--z0` #141210 (Zone 0) through `--z10` #f4efe2 (Zone X), same hue family as the ink/paper world. Used in exactly two places: the ramp-rail navigation (one step per zone, steps VII–IX inert at 50% opacity because the page has no zones there) and the 30px colophon ramp strip. Step text flips from `--z9`/`--z10` to `--z0` at step 5 for contrast.

### Named Rules
**The Filtration Rule.** Magenta exists for the key row and the booking action — plus the browser surfaces that echo them (selection, caret, focus ring). It never colors headings, body text, backgrounds, borders of non-key elements, or decoration. The footer prints the contract: "filtration only." Adding a second accent, or spending magenta on anything that isn't a key value or a path to booking, breaks the world.

**The One-Ink Rule.** There is no grey palette. Every line, border, and hairline is `--ink`, at full strength (1px rules) or diluted through `color-mix(in srgb, var(--rule) 25–35%, transparent)` for secondary table rules and zone-head fills.

## Typography

**Display Font:** Big Shoulders (variable 100–900, self-hosted woff2; fallback 'Arial Narrow', sans-serif)
**Body/Data Font:** Courier Prime 400 + 700 (self-hosted woff2; fallback 'Courier New', monospace)

**Character:** Stamped ultra-condensed caps over typewriter record-keeping. Everything Big Shoulders is uppercase, tight-tracked, and near-solid leading (0.92–1.15); everything that is data or annotation is Courier Prime, and every number sits in `font-variant-numeric: tabular-nums`.

### Hierarchy
- **Display** (560, `clamp(3.4rem, 10.5vw, 6rem)`, lh 0.92, ls 0.005em, uppercase): the hero headline only.
- **Headline** (540, `clamp(2rem, 4.6vw, 3.2rem)`, lh 0.96, ls 0.01em, uppercase): one per zone.
- **Title** (560, 1.55rem, lh 1, uppercase): plan names, closed with a 1px ink rule beneath. The logo stamp is the same voice at 600/1.05rem; pull quotes at 500/`clamp(1.3rem, 2.2vw, 1.7rem)`.
- **Body** (Courier 400, 1rem, lh 1.55): copy capped at 40–66ch (`.deck` 40ch, `.zone-intro` 62ch, FAQ answers 66ch), colored `--ink-2`.
- **Label** (Courier 700, 0.72rem, ls 0.12–0.14em, uppercase, `--ink-3`): field labels, zone heads, table headers, plan captions. Interactive labels (nav, bar buttons) run larger at 0.82–0.9rem/700 with 0.09–0.1em tracking.
- **Price numerals** (Courier 700, 2.1rem, tabular-nums): plan prices, with the AED unit as a Label.

### Named Rules
**The Two-Voices Rule.** Big Shoulders speaks (headlines, plan names, quotes, the stamp); Courier Prime records (everything else). No third face, no italics, and no mixed-case display — both voices are uppercase in headings and labels.

## Layout

A fixed **zone-ramp rail** (66px, `--rail-w`) runs the full left edge; header, `main`, and colophon all offset by `margin-left: var(--rail-w)`. Content zones are `<section class="zone">` blocks capped at 1240px (`--wrap`; 880px for `.zone-narrow` prose zones like FAQ and contact), padded `clamp(40px, 6vw, 72px)` top / `clamp(56px, 8vw, 104px)` bottom and `--pad` (`clamp(18px, 4vw, 44px)`) inline. Adjacent zones separate with a single 1px ink rule — no background changes between zones; the paper runs continuously.

Each zone opens with a **zone-head**: `Zone N · [tag]` in Label voice with a 35%-ink hairline (`.zone-fill`) stretched between number and tag.

Grids: hero is `minmax(280px, 5fr) 7fr`; contact prints are 4 columns with horizontal prints spanning 2; plans are 3 equal columns; quotes and about are 2-column. Overlap is a layout device, not an accident: the add-ons sheet tucks *under* the plan cards (`margin-top: -36px`, `z-index: 0` vs the plans' `1`), the hero print-plan sheet hangs off the photo's corner (`right: -18px; bottom: -34px`), and the second quote pulls left and down over the first's column (`left: -58px; margin-top: 34px`).

**Breakpoints:** ≤1100px drops the header meta cells. ≤900px is the structural break: `--rail-w` goes to 0, the rail becomes an 18px-tall horizontal strip glued under the 53px sticky header (`--head-h`), step numerals visually hidden; desktop nav swaps for the Index toggle + index sheet; hero, plans, quotes, and about stack to one column (key plan reordered first via `order: -1`); overlaps shrink but survive. ≤700px: prints go 2-column, field rows stack, hero bar buttons go full-width.

## Elevation & Depth

Depth is physical, not tonal: sheets float on real shadows over the paper, and translucency comes from `color-mix` + `backdrop-filter` so lower layers show through like tracing paper. The sticky record header is 92% paper with 6px blur; the hero print-plan sheet is 88% sheet with 2px blur; the loupe backdrop is 90% paper with `blur(8px) brightness(0.96)`.

### Shadow Vocabulary
- **Sheet at rest** (`--shadow-sheet: 0 12px 28px rgba(28, 22, 10, 0.16), 0 2px 6px rgba(28, 22, 10, 0.1)`): every sheet and print. Warm-toned, never neutral black.
- **Print lifted** (`0 18px 40px rgba(28, 22, 10, 0.24), 0 3px 8px rgba(28, 22, 10, 0.12)`): contact-print hover, paired with the tilt straightening to 0.
- **Loupe plate** (`0 30px 70px rgba(28, 22, 10, 0.35)`): the enlarged photo, highest surface in the world.
- **Bar-button hover** (`0 6px 16px rgba(28, 22, 10, 0.28)`): under the -2px lift; collapses to none on `:active`.

### Named Rules
**The Light-Not-Paint Rule.** The zone ramp is backlit, never repainted. Every step carries a faint internal radial glow (`rgba(255, 248, 228, 0.16)` warm light via `::before`); hover brightens the whole step with `filter: brightness(1.15)`; the active step burns brighter with an inset warm glow (`inset 0 0 16px rgba(255, 248, 228, 0.45)`) inside a 2px magenta frame. State is expressed as light passing through the step — the zone value pigments themselves never change.

## Shapes

**Squared corners everywhere.** Not a single `border-radius` exists in the system except the explicit `border-radius: 0` reset on form fields. Sheets, buttons, chips, inputs, the loupe — all hard-cornered.

**Rules are 1px ink.** Borders and dividers are `1px solid var(--rule)` at full strength for structure, or 25–35% ink hairlines for secondary table rows. The only thicker line in the world is the key plan's 2px border (`.plan-key`) and the 2px active-zone / focus frames.

**Tilt** is the sheet signature: each sheet sets `--tilt` inline (observed range -1.4deg to 0.8deg; most ±0.4–0.8deg, the hero print itself at exactly 0) applied via the `rotate` property. Prints straighten to 0 on hover.

**Hatch density** is the annotation language — 45° `repeating-linear-gradient` stripes, denser = more: the hold-button delta hatch (1px ink stripes at 50% on 5px pitch, min-width 42px), add-on chips (22x14px, 55% ink on 4px pitch; cross-hatched variant layers ±45° for the biggest delta), and the key row (magenta stripes at 28% on 6px pitch across `th`+`td`).

## Components

### Bar Buttons (`.bar-btn`)
The booking action as a two-cell record strip. **Anatomy:** an `inline-flex` bar with a 1px ink border containing a **label cell** (`.bar-label`, 13px 18px padding, Courier 700 0.9rem uppercase 0.09em) and a **delta cell** (`.bar-delta`, magenta fill, ink text, 0 14px, separated by a 1px sheet-colored rule) carrying the stop-delta: "72H", the plan price, or "→".
- **Primary** (`.bar-btn-book`): ink fill, sheet text, magenta delta. Optional leading inline-SVG icon (17px).
- **Hold** (`.bar-btn-hold`): sheet fill, ink text, and a hatch delta cell instead of magenta — a secondary action literally rendered as lower density.
- **Submit** (`.bar-btn-submit`): full-width, `justify-content: space-between`.
- **Hover:** lifts -2px with warm shadow on the settle ease; **active** drops back flat with no shadow.

### Sheets (`.sheet`)
The material: sheet fill, 1px ink border, `--shadow-sheet`, inline `--tilt`. Plans, quotes, the form, the about print, the print-plan overlay, and the add-ons sheet are all this one material.

**The Sheets-Carry-Mass Rule.** Placement is scroll-revealed under `.js` only: `.placed` starts transparent, 22px low, and +1.2deg over-rotated; `.is-placed` (added by IntersectionObserver at 10% visibility) settles it home over 0.5–0.7s on `--ease-settle: cubic-bezier(0.2, 1.3, 0.35, 1)` — the overshoot is the point: sheets land like paper with weight, not fades. The same ease drives every settling motion (button lift, print straightening, FAQ marker rotation). Under `prefers-reduced-motion` all durations collapse to 0.01ms and `.placed` is forced fully visible.

### Record Header (`.rec-header`)
Sticky, full-width, 92%-paper with blur, bottom 1px rule; a strip of bordered cells: the two-line stamp, aria-hidden meta cells (System / Location), text nav (hover inverts to ink/sheet), and the magenta BOOK cell with WhatsApp icon. On mobile the nav collapses to an Index toggle (`aria-expanded`, inverts when open) and BOOK becomes icon-only.

### Zone Ramp Rail (`.ramp-rail`)
The signature component: fixed 11-step vertical ramp, one flex-equal step per zone, each an anchor to its zone (steps VII–IX inert spans at 50% opacity, X → colophon). Steps are numbered in the zone's own contrast color; JS (IntersectionObserver, `rootMargin: '-40% 0px -55% 0px'`) moves `.is-active` — a 2px magenta inset frame with warm inset glow — to the zone in view. Mobile: horizontal 18px strip under the header, numerals clipped visually but kept for AT.

### Contact Prints (`.print`) + Loupe
Prints are `<button>` sheets with the image and a caption strip (`.print-cap`: number in ink-3 + name, top 1px rule). Hover straightens the tilt, deepens the shadow, bumps image contrast 1.04, and inverts the caption to ink/sheet. Clicking opens the **loupe**: a fixed dialog (`role="dialog"`, `aria-modal`) over the blurred paper, photo mounted on a 12px-padded sheet with the deepest shadow, 46px square bordered close/prev/next buttons (hover inverts), arrow-key navigation, Escape to close, body scroll locked, focus moved in and restored on close, Tab trapped across the dialog's buttons.

**The Hidden-First Loupe Guard.** `.loupe[hidden] { display: none; }` is declared *before* the `.loupe { display: flex; }` rule, and the markup ships with `hidden`. Any overlay that sets its own `display` must pair it with this guard — a v2 regression where `display: flex` overrode `[hidden]` once blocked every click on the page.

### Plans + Add-ons
Three plan sheets (title, rule, AED price in tabular numerals, spec table, bar button pinned to the bottom with `margin-top: auto`). The key plan gets the 2px border, an ink "Most booked" flag overlapping its top edge, and the magenta-hatched key row with KEY mark chip. The add-ons sheet slides under the cards' lower edge (negative margin, lower z-index) listing deltas with hatch chips — density encodes magnitude.

### Record Form (`.record-form`)
A sheet holding labeled fields: paper-filled inputs with 1px ink borders, zero radius. **Focus:** border and inset 1px ring go `--mag-deep`, fill brightens to sheet — the field literally comes forward off the paper. Select uses an inline data-URI chevron. Status line is `role="status"` `aria-live="polite"`; errors are bold `--mag-deep`. Submit posts to Formspree via fetch with explicit ok/error copy and a WhatsApp fallback in the error message.

### FAQ (`.faq`)
Native `details`/`summary` rows between 1px rules; a mono "+" marker rotates 45° on the settle ease when open; summary hover/open fills with sheet.

### Colophon
Zone X: the full 11-step ramp as a 30px horizontal strip, then a single row with copyright, footer nav, and the doctrine line "filtration only" beside a bordered 16x11px magenta swatch.

### Browser Surface
The world extends into the chrome: `::selection` is magenta with ink text, `caret-color` and `:focus-visible` (2px outline, 2px offset) are deep magenta, scrollbar is thin `ink-3`-on-paper, and the skip link is an ink/sheet bar that drops in at top-left on focus.

## Do's and Don'ts

### Do:
- **Do** keep magenta on booking paths and key values only — delta cells, KEY rows, the active zone frame, focus/caret/selection. The Filtration Rule is the identity.
- **Do** build every panel from the one sheet material: `--sheet` fill, 1px ink border, `--shadow-sheet`, a small inline `--tilt` (±0.4–0.8deg typical, never past ±1.4deg).
- **Do** put data in `th`/`td` tables with `font-variant-numeric: tabular-nums` and Label-voice headers — the page is a record, not a card deck.
- **Do** use `--ease-settle` for anything that moves into place, and collapse all motion under `prefers-reduced-motion`.
- **Do** scope reveal/entrance styles under `.js` so a no-JS load renders the full page visible (the `no-js` → `js` class swap is the only inline script).
- **Do** pair any self-displayed overlay with a preceding `[hidden] { display: none; }` guard and ship it `hidden` in markup.
- **Do** express quantity or intensity as hatch density (45° repeating gradients), and state as light (glow/brightness), not as new pigments.

### Don't:
- **Don't** add border-radius anywhere — squared corners are absolute, including inputs and images.
- **Don't** introduce a second accent, a grey scale, or colored rules: lines are 1px ink, full-strength or `color-mix`-diluted to 25–35%.
- **Don't** put white text on magenta or use magenta for headings, backgrounds, or decoration — ink on magenta, and only where the Filtration Rule allows.
- **Don't** repaint zone-ramp steps for hover/active state; the ramp is backlit — brighten or glow, never change the step's value.
- **Don't** add a third typeface, italics, or mixed-case display type; Big Shoulders stamps, Courier Prime records.
- **Don't** use icon fonts or emoji — the only icons are inline SVGs (WhatsApp, Instagram, loupe arrows/close) sized 16–20px and drawn in `currentColor`.
