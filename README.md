# Hooked Media Strategy — Website

The public marketing site for Hooked Media Strategy (HMS), a student-run digital marketing agency at UT Austin. This is a **plain HTML/CSS/JS site — no build step, no framework** — so any future member can open a file and edit it directly, no coding bootcamp required. It's deployed on **Cloudflare Workers** (static assets), which leaves room to add animations, interactivity, or edge logic (e.g. handling the contact form) later without switching platforms.

Live site: https://hookedmediastrategy.org (also reachable at https://hooked-media-strategy.hooked-media-strategy.workers.dev)

## Project structure

```
├── public/                    Everything that gets deployed
│   ├── index.html               Home
│   ├── about.html                Our Mission
│   ├── team.html                 Our Team
│   ├── services.html             Our Services
│   ├── structure.html            Our Structure
│   ├── work.html                  Our Work / portfolio
│   ├── contact.html               Contact form + info
│   ├── join.html                   Recruitment / FAQs
│   ├── privacy.html                Privacy Policy
│   ├── accessibility.html         Accessibility Statement
│   ├── 404.html                     Not-found page
│   ├── css/style.css               All site styling (colors, spacing, layout)
│   ├── js/main.js                   Mobile nav toggle, active-link highlight, contact form behavior
│   └── favicon.svg
├── wrangler.toml               Cloudflare Workers config (points at public/)
└── .github/workflows/deploy.yml   Auto-deploy on push to main
```

Everything in `public/` is what ends up live — nothing outside it gets deployed. Every page repeats the same `<header>` nav and `<footer>` blocks. If you add/rename a nav link, update it in **all HTML files** (a find-and-replace across `public/*.html` works well here).

## Editing content

Open any `.html` file in `public/` in a text editor (VS Code recommended) and edit the text directly — headings are `<h1>`/`<h2>`/`<h3>`, paragraphs are `<p>`. To change colors, fonts, or spacing site-wide, edit the CSS variables at the top of [`public/css/style.css`](public/css/style.css) (e.g. `--coral`, `--navy-900`). To add animations or new interactivity, extend [`public/js/main.js`](public/js/main.js) or add a new script tag — it's plain client-side JavaScript, no build step required.

To add a new page, copy an existing page (e.g. `public/services.html`), change its content, and add a link to it in the nav (`<ul class="nav-links">`) and footer on every page.

## Running it locally

You'll need [Node.js](https://nodejs.org/) installed.

```bash
npm install
npm run dev
```

This starts a local preview (via Wrangler) — open the printed `localhost` URL in your browser. You can also just double-click `public/index.html` to preview it without a server, though the mobile menu and a couple of relative-path behaviors work best through `npm run dev`.

## Deploying to Cloudflare

The site deploys as a **Cloudflare Worker** (static assets) under the HookedMediaStrategy Cloudflare account.

**Automatic (recommended):** Every push to `main` on GitHub automatically deploys via the GitHub Action in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). This requires two repo secrets to be set once, under Settings → Secrets and variables → Actions:

- `CLOUDFLARE_API_TOKEN` — a Cloudflare API token created from the "Edit Cloudflare Workers" template, scoped to the HookedMediaStrategy account
- `CLOUDFLARE_ACCOUNT_ID` — the HookedMediaStrategy account ID (visible on the right side of any page in the Cloudflare dashboard)

**Manual deploy** (if you have Wrangler set up locally and are logged into the HookedMediaStrategy Cloudflare account):

```bash
npm run deploy
```

## Custom domain

`hookedmediastrategy.org` is registered on Namecheap with nameservers pointed at Cloudflare. Both the bare domain and `www.hookedmediastrategy.org` are connected as Custom Domains on the Worker (see `[[routes]]` in `wrangler.toml`) so either works; every page sets `<link rel="canonical">` to the bare `hookedmediastrategy.org` URL so search engines treat that as the authoritative version.

If Google search results ever point at a dead/old URL again (e.g. after another domain change), verify the domain in [Google Search Console](https://search.google.com/search-console), submit `sitemap.xml`, and use the URL Inspection tool's "Request Indexing" on the affected pages to speed up re-crawling.

## Contact form

The contact form on `contact.html` is wired up via [Formspree](https://formspree.io/) (free tier, 50 submissions/month). Submissions are emailed to `hookedmediastrategy@gmail.com` — log in to formspree.io with that same Gmail account to view past submissions, check usage, or manage the form.

The form's `action` attribute points at the Formspree endpoint (`https://formspree.io/f/xrpbgpkj`), and `js/main.js` submits it via `fetch` so visitors get an inline "thanks" message instead of leaving the page. If the free tier's submission limit is ever hit, either upgrade the Formspree plan or swap in a different endpoint (update `action` in `contact.html`).

## Questions

Reach out in the HMS officer group chat, or email hookedmediastrategy@gmail.com.
