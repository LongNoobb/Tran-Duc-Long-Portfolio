# Tran Duc Long — Portfolio design

## Purpose

Introduce Long as a Unity developer, let visitors scan five real games, inspect screenshots and gameplay, then contact him. Preserve the original bilingual project descriptions, education, personal links, game assets, store URLs, and analytics.

## Visual direction

A quiet developer workspace with editorial typography and colorful game imagery. A fixed identity rail on desktop becomes a compact sticky identity and navigation bar on mobile. The hero composes existing game screenshots; Food War leads the project collection. Other projects follow in a two-column grid, collapsing to a single column below 560px.

Open Design supplies the design-contract and visual-review process. UI/UX Pro Max supplies interaction, contrast, focus, responsive and motion guidance. Its generated FAQ page pattern was unsuitable for this portfolio and was discarded. The Awesome Design MD Runway snapshot informs image-led composition, restrained surfaces, and typography; it is inspiration rather than a copy of Runway branding. The actual font is Inter with Segoe UI and sans-serif fallbacks. No proprietary font or external brand assets are used.

Reference: `awesome-design-md/references/library/runwayml/DESIGN.md`, snapshot `fcc70284932276d085f01ef9f83edde90b1258cb`. The site remains buildless HTML/CSS/JavaScript in its existing checkout.

## Tokens

The source of truth is `portfolio/styles.css`. The portfolio is served at `/portfolio/`.

The Work in progress page at `/` has a separate sketchbook direction: warm paper (#f5f2eb), charcoal ink (#292924), muted annotations (#68665e) and burnt orange (#b34225). Its inline CSS in `index.html` owns these tokens. Centered sans-serif display type pairs with an italic Georgia second line and monospace annotations. A decorative SVG shows an unfinished isometric block assembly above the title; only its loose piece floats, and reduced-motion disables that animation. A subtle dot grid, thin rules and generous space evoke a work in progress without a fictitious completion percentage or launch date. Keep the root page free of project content.

| Role | Dark | Light |
| --- | --- | --- |
| Background | #111412 | #f6f7f2 |
| Identity rail | #151816 | #eef0e9 |
| Surface | #1a1e1b | #ffffff |
| Foreground | #f0f2ed | #20271f |
| Muted foreground | #a2aaa3 | #596451 |
| Secondary metadata | #858f87 | #64705f |
| Border | #303931 | #d4d9cd |
| Accent | #b6eb93 | #365c25 |
| On accent | #182512 | #ffffff |
| Accent surface | #273323 | #e0ebd5 |

The art panel uses a subtle grid, with flat surfaces behind the screenshot collage. Shadows are limited to the composited game screens. Rounded corners: 4–8px for metadata and controls, 12–16px for cards and dialogs. Content spacing follows a 4–8px base with 24px card gutters and 43–64px section spacing.

## Typography and layout

Inter 400–750; large medium-weight headlines, 28–43px section titles, and muted body copy. Headlines scale to the viewport. Vietnamese uses looser leading and tracking to preserve accents. Main content uses a maximum width with 24–70px gutters; the desktop rail is 210–236px. At <=760px, navigation and preferences remain reachable at the top. At 761–1000px the hero emphasizes text to avoid squeezing its illustration.

## Interaction

- All project filters are native buttons with pressed states and an announced result count.
- Project details use a native dialog with explicit keyboard wrapping: focus containment, Escape, explicit close, outside click, and return focus to the opener. Project hashes can be linked directly; browser Back closes details opened from a card.
- Galleries never auto-advance. Previous/next, thumbnails, arrow keys and horizontal swipe change screenshots; the full image is contained rather than cropped. Image errors provide a readable recovery message.
- YouTube is loaded only after an explicit action. An external YouTube link is available as a fallback. Closing the dialog removes the frame and stops playback.
- Language and theme preferences persist when browser storage is available; storage denial does not prevent use.
- Email links use mailto. Copy email provides a live status and a manual fallback on failure.
- Every icon-only control has an accessible name; visible keyboard focus uses the accent token. Motion is short and purpose-driven; reduced-motion removes transitions and smooth scrolling.

## Content and maintenance

`projects.js` preserves all five original projects, 30 screenshots, seven store links, and four gameplay video URLs. `app.js` provides short bilingual summaries without adding employment, experience, popularity, or contribution claims. Do not invent download counts, testimonials, project responsibilities, or availability. Reuse original assets and keep the gameplay screenshots readable.

Validate representative desktop and mobile viewports, both languages and themes, gallery navigation, browser history, keyboard focus, preference persistence, missing-resource handling, and reduced motion after substantive changes.
