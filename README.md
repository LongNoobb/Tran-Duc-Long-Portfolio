# Tran Duc Long — Unity Developer Portfolio

A bilingual, responsive portfolio built with plain HTML, CSS and JavaScript. No build step or package installation is required.

Serve the repository with any static server, for example `python -m http.server 4173`, then open `http://localhost:4173/portfolio/`.

The portfolio lives at https://longtd.dev/portfolio/. The root URL https://longtd.dev/ displays a Work in progress page. Game prototypes remain at https://longtd.dev/prototype/ and are assembled from the prototype repository by the publishing workflow.

Portfolio source files are under `portfolio/`:

- `index.html`: page structure and bilingual personal information.
- `styles.css`: responsive layout, semantic design tokens and themes.
- `projects.js`: original project descriptions, screenshots, store links and video URLs.
- `app.js`: language/theme persistence, project filters, accessible project dialog, gallery and email copy.
- `DESIGN.md`: design decisions and maintenance guidelines.

Project details support direct links such as `/portfolio/#project-food-war`. Push to `main` to publish through `.github/workflows/publish-pages.yml`; the existing CNAME is preserved.
