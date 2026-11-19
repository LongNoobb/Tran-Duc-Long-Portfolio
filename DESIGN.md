# Tran Duc Long — Portfolio design

## Purpose

Introduce Long as a Unity developer, let visitors scan five real games, inspect screenshots and gameplay, then contact him. Preserve the original bilingual project descriptions, education, personal links, game assets, store URLs, and analytics.

## Visual direction

An editorial game-developer playground: a compact horizontal sticky header, large sans-serif introduction with an italic serif accent, and real gameplay shown as the primary visual. The default is a cool off-white canvas with a terracotta action color; the saved dark theme uses charcoal and peach. A forest-green contact section closes the page. The hero lets visitors manually preview Food War, Tap Away, or Blackout and open the selected project. Food War leads the work collection; the remaining projects use an open two-column layout instead of boxed dashboard cards.

Open Design supplies the brief, design-contract, and visual-review process. UI/UX Pro Max supplies contrast, focus, touch-target, responsive, and motion guidance. Its generated FAQ/documentation landing pattern was unsuitable for this portfolio and was discarded. Awesome Design MD’s Runway snapshot informs image-led composition, restrained surfaces, and an editorial hierarchy. This is an adaptation, not Runway branding: the portfolio keeps its own colors and actual project imagery. The Anime.js skill informed the decision to retain small CSS transitions without adding a library. The game-specific guideline and Smashfest UI skills were scoped out of website styling; their game HUD and toy-panel conventions do not fit this portfolio.

Reference: `awesome-design-md/references/library/runwayml/DESIGN.md`, snapshot `fcc70284932276d085f01ef9f83edde90b1258cb`. The site remains buildless HTML/CSS/JavaScript in its existing checkout. No hosting migration is part of the redesign.

## Tokens

The source of truth is `portfolio/styles.css`. The portfolio is served at `/portfolio/`.

The Work in progress page at `/` has a separate sketchbook direction: warm paper (#f5f2eb), charcoal ink (#292924), muted annotations (#68665e) and burnt orange (#b34225). Its inline CSS in `index.html` owns these tokens. Centered sans-serif display type pairs with an italic Georgia second line and monospace annotations. A decorative SVG shows an unfinished isometric block assembly above the title; only its loose piece floats, and reduced-motion disables that animation. A subtle dot grid, thin rules and generous space evoke a work in progress without a fictitious completion percentage or launch date. Keep the root page free of project content.

| Role | Dark | Light |
| --- | --- | --- |
| Background | #15191b | #f7f8fa |
| Surface | #1f2528 | #ffffff |
| Hover surface | #2b3439 | #ebeef2 |
| Foreground | #f3f4f1 | #202628 |
| Muted foreground | #b2bbc0 | #596369 |
| Secondary metadata | #9ca8ae | #657076 |
| Border | #3c474d | #d9dfe2 |
| Accent | #ffad8f | #bc4324 |
| On accent | #342016 | #ffffff |
| Accent surface | #3b2c26 | #fbece6 |

The contact panel has local semantic tokens: forest background #26372f, text #f8f6f1, muted #c0c8c4, accent #ffc2a5. Controls use 6–8px corners, image surfaces and sections 10–14px. Shadows are limited to portrait screenshot compositions. The tilted desktop showcase is static; it straightens on mobile.

## Typography and layout

Inter with Segoe UI and sans-serif fallbacks provides the body and headings. Georgia/Times New Roman provides only the italic hero accent. Body text is 16px or larger with 1.65–1.85 line height, action labels generally 14px, secondary metadata 12–13px. The small showcase eyebrow is 11px and nonessential. Main headings scale up to 80px. Vietnamese receives a smaller display size and looser line-height to protect accents.

The centered container is at most 1328px including 48px side gutters. Tablet gutters are 32px; mobile gutters are 22px, or 16px at <=370px. Below 760px the header becomes two rows, the hero and About section stack, and the featured project becomes image-first. Project cards become a single column below 540px. Sticky navigation has a matching anchor offset. Main controls target at least 44px in height. Filter counts are visible and announced.

## Interaction

- Hero preview choices and project filters are native buttons with pressed states. Previews never auto-advance. The visible filter count is announced through a status region.
- Project details use a native dialog with explicit keyboard wrapping: focus containment, Escape, explicit close, outside click, and return focus to the opener. Project hashes can be linked directly; browser Back closes details opened from a card.
- Galleries never auto-advance. Previous/next, thumbnails, arrow keys and horizontal swipe change screenshots; the full image is contained rather than cropped. Image errors provide a readable recovery message.
- YouTube is loaded only after an explicit action. An external YouTube link is available as a fallback. Closing the dialog removes the frame and stops playback.
- Language and theme preferences persist when browser storage is available; storage denial does not prevent use.
- Email links use mailto. Copy email provides a live status and a manual fallback on failure.
- Every icon-only control has an accessible name; visible keyboard focus uses the accent token. Motion is short and purpose-driven; reduced-motion removes transitions and smooth scrolling.

## Content and maintenance

`projects.js` preserves all five original projects, 30 screenshots, seven store links, and four gameplay video URLs. `asset/optimized/` contains WebP derivatives; originals remain unchanged. Run `python scripts/optimize-images.py` with Pillow installed only when regenerating assets. The delivered site has no Python dependency. Icons and avatars are at most 192px; screenshots are contained within 1440×1600. `app.js` provides short bilingual summaries without adding employment, experience, popularity, or contribution claims. Do not invent download counts, testimonials, project responsibilities, or availability. Reuse original assets and keep the gameplay screenshots readable.

Validate representative desktop and mobile viewports, both languages and themes, gallery navigation, browser history, keyboard focus, preference persistence, missing-resource handling, and reduced motion after substantive changes.
