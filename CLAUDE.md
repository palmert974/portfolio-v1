# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deployment

This is a **zero-build static site** — no npm, no bundler, no compilation step. Editing a file and pushing to `master` is all that's needed; Vercel auto-deploys on push.

- **Live URL**: https://portfolio-v1-blond-rho.vercel.app
- **Repo**: https://github.com/palmert974/portfolio-v1
- **Deploy trigger**: `git push origin master`
- **vercel.json**: `{ "framework": null, "outputDirectory": "." }` — serves the repo root as-is

To preview locally, use any static file server:
```
python3 -m http.server 8080
# or: npx serve .
```

## Architecture

Four pages sharing one stylesheet and one JS file:

| File | Purpose |
|---|---|
| `index.html` | Hero + photo carousel + alternating timeline (full work history) |
| `about.html` | Bio, 6-item skill grid, timeline, education, leadership, references |
| `projects.html` | 2-column project card grid |
| `contact.html` | Formspree contact form + contact info sidebar |
| `styles.css` | All styles — design tokens, Bootstrap overrides, animations, components |
| `script.js` | Rotating hero text, IntersectionObserver scroll-reveal, Formspree AJAX, navbar scroll class |

## Design system

CSS custom properties (defined in `:root` in `styles.css`):
- `--base: #0e1113` — page background
- `--elevated: #151a1d` — card backgrounds
- `--accent: #d41f2a` — red, used for badges, highlights, borders, buttons
- `--muted: #a9b1b8` — secondary text (use `.text-muted-2`)

**Component classes to reuse:**
- `.btn-accent` — red filled button
- `.hover-lift` — card lift on hover
- `.animate-fade-in`, `.animate-fade-up`, `.animate-slide-left` — CSS entry animations
- `.scroll-reveal` — JS-driven reveal (IntersectionObserver adds `.active`)
- `.gradient-text` — animated red gradient on text
- `.tech-badge` — hoverable skill badge that turns accent-red

## Page structure conventions

Every page has the same **nav** (4 links, active class on current page) and **footer** (name + tagline + social links + year via `document.getElementById('year')`). When adding a page, copy both from any existing page.

**index.html timeline** uses alternating Bootstrap grid columns with `.timeline-card` / `.timeline-dot` / `.timeline-right`. Left-side cards go in `col-md-6 text-md-end`; right-side in `col-md-6 offset-md-6` with class `timeline-right` on the inner div.

**about.html timeline** uses a simpler `.timeline-item` with CSS `::before` / `::after` pseudo-elements for the dot and line — no grid required.

## Key integrations

- **Formspree endpoint** (`contact.html` form `action`): `https://formspree.io/f/xjkonjor` — AJAX-handled in `script.js`
- **Bootstrap**: loaded from CDN (5.3.3 CSS + JS bundle), no local copy
- **Bootstrap Icons**: CDN (1.11.0)
- **Resume PDF**: `assets/Tamara-Palmer-Resume-2025.pdf` — linked from `about.html` and `contact.html`

## Content ownership

This is Tamara Palmer's personal portfolio. Key facts to keep consistent across all pages:
- Email: TamaraPalmer013@yahoo.com
- Phone: (786) 453-6382
- GitHub: github.com/palmert974
- LinkedIn: linkedin.com/in/tamara-palmer-
- Location: Dallas, TX
- Current role: Associate DevOps Engineer @ AAA Auto Club Enterprises (Contract via WOS), Oct 2025–Present
