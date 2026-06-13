# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## Project overview

**Garage Tomi** is the marketing website for a French auto garage based in
Rozay-en-Brie (77540) that specializes in DPF/particulate-filter cleaning
("nettoyage FAP"), wheel alignment ("géométrie"), servicing, and general
mechanics ("mécanique générale").

It is a **static, multi-page website** — plain HTML, CSS, and vanilla
JavaScript. There is **no build step, no framework, no package manager, and
no backend**. Files are served as-is (the site is suited to GitHub Pages or
any static host). The primary content language is **French (`fr`)**, with a
client-side toggle to **Polish (`pl`)**.

## Repository structure

```
.
├── index.html      # Home / Accueil — hero, services preview, about, stats, reviews, gallery, CTA
├── fap.html        # Nettoyage FAP — DPF cleaning detail page (largest content page)
├── service.html    # Services — full list of services offered
├── avis.html       # Avis — customer reviews / testimonials
├── galerie.html    # Galerie — photo gallery
├── contact.html    # Contact — info, phone/WhatsApp CTAs, Google Maps embed
├── style.css       # Single shared stylesheet for all pages
├── script.js       # Shared JS: hamburger menu + language switcher
└── images/         # Local image assets (.jpeg)
    ├── laweta.jpeg
    ├── laweta1.jpeg
    └── maszynadofap.jpeg
```

Every `.html` page is standalone and links the same `style.css` and
`script.js`. There is no shared layout/template mechanism — the header, nav,
and footer markup is **duplicated** in each page.

## Running / previewing the site

No build or install is required. To preview locally, serve the directory with
any static server, e.g.:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Opening `index.html` directly in a browser also works, though the Google Maps
iframe and remote Unsplash images need network access.

## Key conventions

### Internationalization (FR / PL)
This is the most important convention in the codebase.

- Translatable elements carry **both** `data-fr` and `data-pl` attributes, and
  the visible text defaults to the French value:
  ```html
  <a href="service.html" data-fr="Services" data-pl="Usługi">Services</a>
  ```
- `script.js`'s `setLanguage(lang)` swaps every element's `textContent` to the
  matching `data-${lang}` attribute, updates `<html lang>`, and persists the
  choice in `localStorage` under the key `"language"`. On load it restores the
  saved language (defaults to `fr`).
- **When adding any new user-facing text, always provide both `data-fr` and
  `data-pl`** and set the default inner text to the French value. Text without
  these attributes will not translate.
- `setLanguage` overwrites `textContent`, so it only works on elements whose
  content is plain text (no child elements). Keep translatable nodes leaf-level.

### Page anatomy (repeated in every page)
1. `<head>` with `<meta charset>`, viewport, page-specific `<title>`
   (`Garage Tomi - <Page>`) and `<meta name="description">`, plus
   `<link rel="stylesheet" href="style.css">`.
2. `<header>` → `.container.navbar` with logo, `#menu-toggle` hamburger, the
   `#nav-links` nav, and the `.lang-switch` FR/PL buttons.
3. `<div class="menu-overlay" id="menu-overlay">` immediately after the header.
4. Page content in `<section>` blocks, each wrapping content in `.container`.
   Interior pages open with a `.page-banner`; the home page uses a `.hero`.
5. `<footer>` with the three-column `.footer-grid` (brand, navigation, contact).
6. A floating phone button `<a class="floating-phone" href="tel:...">`.
7. `<script src="script.js"></script>` as the last element before `</body>`.

When creating or editing a page, mirror this structure and copy the
header/footer markup from an existing page (e.g. `contact.html`) so navigation
stays consistent. The current page's nav link should get `class="active"`.

### Styling
- All styling lives in `style.css`. **Do not add per-page stylesheets.**
  Occasional small inline `style="..."` tweaks exist (e.g. in `contact.html`)
  but prefer existing classes.
- Theme is driven by CSS custom properties in `:root` (`style.css`). Use these
  tokens instead of hard-coded values:
  - Colors: `--primary` (#d90429 red), `--primary-hover`, `--secondary`
    (#1d3557 navy), `--accent` (#fca311 amber), `--bg-dark`, `--bg-light`,
    `--text`, `--text-light`, `--border`.
  - Other: `--shadow`, `--radius`, `--transition`, `--container` (1200px).
- Reusable building blocks: `.container`, `.btn`, `.btn-outline`, `.card`,
  `.grid`/`.grid-2`/`.grid-3`, `.section-title`, `.section-subtitle`, plus
  component classes (`.service-card`, `.testimonial-card`, `.gallery-grid`,
  `.stat-box`, `.page-banner`, `.cta`, etc.) and utilities (`.text-center`,
  `.mt-20/30/40`, `.mb-20/30`).
- Layout is responsive via grid + media queries at **992px, 768px, 576px**.
  The hamburger menu (`.menu-toggle`) only appears at ≤768px.

### JavaScript
- `script.js` is the only script and is shared by all pages. It does two
  things: wires up the hamburger menu (toggling `.show` on `#nav-links` and
  `#menu-overlay`) and provides `setLanguage()`.
- Keep JS dependency-free vanilla JS. The language buttons call
  `setLanguage('fr')` / `setLanguage('pl')` via inline `onclick`.
- Guard DOM lookups (the existing code checks elements exist before binding) so
  the shared script is safe across pages with slightly different markup.

### Contact details (single source of truth)
The garage's real contact info appears in headers/footers/CTAs:
- Phone / WhatsApp: **07 59 55 72 33** → `tel:+33759557233`,
  `https://wa.me/33759557233`
- Address: **22 Av. de l'Épi, 77540 Rozay-en-Brie**
- Hours: **Lundi – Samedi : 9h00 – 18h00**

If contact info changes, update it consistently across **all** pages (it is
duplicated in every header/footer and on `contact.html`).

> Known inconsistency: `index.html`'s hero "Prendre rendez-vous" button links
> to `wa.me/33673508809`, while everywhere else uses `wa.me/33759557233`.
> Treat `33759557233` as the canonical number unless told otherwise.

## Development workflow

- **Branch:** do all work on `claude/claude-md-docs-8ih1sy` (create it locally
  if missing). Never push to another branch without explicit permission.
- **Commits:** small, descriptive messages. The existing history uses
  GitHub-style "Update <file>.html" messages; prefer clearer messages
  describing the change.
- **Push:** `git push -u origin <branch-name>`; retry network failures with
  exponential backoff. Do **not** open a pull request unless explicitly asked.
- There are **no tests, linters, or CI** configured in this repo. Validate
  changes by previewing in a browser and checking that:
  1. New text has both `data-fr` and `data-pl` and toggles correctly.
  2. Navigation links and the active state are correct across pages.
  3. Layout holds at desktop and mobile widths (hamburger menu opens/closes).

## Gotchas

- Header/nav/footer are **duplicated per page** — a nav or footer change must
  be applied to every `.html` file. There is no include mechanism.
- Some markup is imperfect (e.g. the footer navigation block in `index.html`
  is missing a closing `</div>`). When editing nearby, fix obvious markup bugs
  rather than copying them forward.
- The site mixes **local images** (`images/*.jpeg`) with **remote Unsplash
  URLs** and a **Google Maps iframe**; the remote assets require network access
  to render.
</content>
</invoke>
