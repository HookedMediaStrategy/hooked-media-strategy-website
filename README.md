# Hooked Media Strategy — Website

The public marketing site for Hooked Media Strategy (HMS), a student-run digital marketing agency at UT Austin. This is a **plain HTML/CSS/JS site — no build step, no framework** — so any future member can open a file and edit it directly, no coding bootcamp required.

Live site: _add the deployed Cloudflare Pages URL here once live_

## Project structure

```
├── index.html          Home
├── about.html           Our Mission
├── team.html            Our Team
├── services.html        Our Services
├── structure.html       Our Structure
├── work.html             Our Work / portfolio
├── contact.html          Contact form + info
├── join.html              Recruitment / FAQs
├── privacy.html           Privacy Policy
├── accessibility.html    Accessibility Statement
├── 404.html                Not-found page
├── css/style.css          All site styling (colors, spacing, layout)
├── js/main.js              Mobile nav toggle, active-link highlight, contact form behavior
└── favicon.svg
```

Every page repeats the same `<header>` nav and `<footer>` blocks. If you add/rename a nav link, update it in **all HTML files** (a find-and-replace across `*.html` works well here).

## Editing content

Open any `.html` file in a text editor (VS Code recommended) and edit the text directly — headings are `<h1>`/`<h2>`/`<h3>`, paragraphs are `<p>`. To change colors, fonts, or spacing site-wide, edit the CSS variables at the top of [`css/style.css`](css/style.css) (e.g. `--coral`, `--navy-900`).

To add a new page, copy an existing page (e.g. `services.html`), change its content, and add a link to it in the nav (`<ul class="nav-links">`) and footer on every page.

## Running it locally

You'll need [Node.js](https://nodejs.org/) installed.

```bash
npm install
npm run dev
```

This starts a local preview (via Wrangler) — open the printed `localhost` URL in your browser. You can also just double-click `index.html` to preview it without a server, though the mobile menu and a couple of relative-path behaviors work best through `npm run dev`.

## Deploying to Cloudflare

The site deploys to **Cloudflare Pages** under the HookedMediaStrategy Cloudflare account.

**Automatic (recommended):** Every push to `main` on GitHub automatically deploys via the GitHub Action in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). This requires two repo secrets to be set once, under Settings → Secrets and variables → Actions:

- `CLOUDFLARE_API_TOKEN` — a Cloudflare API token with "Cloudflare Pages: Edit" permission on the HookedMediaStrategy account
- `CLOUDFLARE_ACCOUNT_ID` — the HookedMediaStrategy account ID (visible on the right side of any page in the Cloudflare dashboard)

**Manual deploy** (if you have Wrangler set up locally and are logged into the HookedMediaStrategy Cloudflare account):

```bash
npm run deploy
```

## Wiring up the contact form

The contact form on `contact.html` currently just shows a "thanks, but email us directly" message — it isn't connected to an inbox yet, since this is a static site with no backend. The easiest fix for a future member:

1. Sign up for a free [Formspree](https://formspree.io/) account (or similar) using the HMS Gmail.
2. Set the form's `action` attribute in `contact.html` to your Formspree endpoint and add `method="POST"`.
3. Add `data-wired="true"` to the `<form id="contact-form">` tag so `js/main.js` stops intercepting the submit.

## Questions

Reach out in the HMS officer group chat, or email hookedmediastrategy@gmail.com.
