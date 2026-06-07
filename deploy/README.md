# DFY Ads Management Funnel — AdOutreach

Static landing page for the **Done For You Ads Management** offer. Pure front-end
(HTML + CSS + React via in-browser Babel). **No build step.** Cloudflare Pages
just serves the files as-is.

## Structure

```
index.html          ← entry point (Cloudflare serves this at /)
tokens.css          ← design tokens (colors, type, spacing)
funnel.css          ← page styles
sections.jsx        ← nav, hero, marquee, offer, founder, testimonials…
vsl-player.jsx      ← video sales-letter player
faq-sections.jsx    ← supercut, book, FAQ
apply.jsx           ← apply form + footer
tweaks-panel.jsx    ← design-iteration controls (hidden in production)
assets/             ← logos, photos, favicon, OG share image
_headers            ← Cloudflare Pages caching + security headers
```

## Deploy to Cloudflare Pages (via GitHub)

### 1. Push this folder to a GitHub repo

```bash
cd deploy
git init
git add .
git commit -m "Initial commit: DFY Ads Management funnel"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

> Tip: make the contents of this `deploy/` folder the **root** of the repo
> (i.e. `index.html` should sit at the top level of the repo, not inside a
> `deploy/` subfolder). If you keep the subfolder, set the build output
> directory to `deploy` in step 2.

### 2. Connect the repo in Cloudflare

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**.
2. Pick your repo and the `main` branch.
3. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/`  *(or `deploy` if you kept the subfolder)*
4. **Save and Deploy.**

That's it — no build runs; Cloudflare serves the static files. Every push to
`main` redeploys automatically.

### 3. Custom domain

Pages → your project → **Custom domains** → add `ads.yourdomain.com` (or the
apex). Cloudflare provisions the SSL cert automatically.

## After you have a final URL — update these

The social/SEO meta tags currently point at the original adoutreach.com URL.
In `index.html`, update to your live URL so link previews and canonical are right:

- `<link rel="canonical" href="…">`
- `<meta property="og:url" content="…">`

The `og:image` uses a relative path (`assets/og-share.jpg`); some crawlers
prefer an absolute URL — swap to `https://your-domain/assets/og-share.jpg`
once the domain is live.

## Notes

- JSX is compiled in the browser by Babel (loaded from unpkg CDN). Zero build
  tooling, but there's a brief compile on first load. If page speed becomes a
  priority, the JSX can be pre-compiled to plain JS later.
- External images (YouTube thumbnails, testimonial portraits) load from their
  own CDNs at runtime — they are not bundled here.
- The Tweaks panel only appears inside the design tool; it stays hidden on the
  public site.
