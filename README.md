# dealdesk.studio

The marketing site for **Deal Desk Studio**, built with Docusaurus and deployed to GitHub Pages at
[dealdesk.studio](https://dealdesk.studio).

The product itself lives in [`dealdeskco/dealdesk`](https://github.com/dealdeskco/dealdesk) and is
served from `app.dealdesk.studio`. This repository holds only the public site: landing page,
pricing, docs, blog and legal pages.

## Running it

```bash
npm ci
npm start          # dev server on :3000
npm run build      # production build into ./build
npm run serve      # serve the built output
```

`onBrokenLinks` is set to `throw`, so a dead internal link fails the build rather than shipping.

## Conventions worth knowing

- **Brand constants live in `src/css/custom.css`** and are copied verbatim from the application's
  palette, so the site and the product do not drift apart. Change them in both places or neither.
- **`src/pages/index.module.css` is shared** by the landing page and `how-it-works`, so the two
  cannot diverge visually.
- **Pricing is duplicated** from `plans.mjs` in the application repo, which is the billing source
  of truth. Nothing enforces agreement between them — if a price changes there, change it here.
- **The contact form has no backend here.** It posts to `app.dealdesk.studio/api/contact`, which
  already owns the mail provider chain (SES, falling back to Resend), the branded templates and
  the rate limiting.

## Deployment

Pushing to `main` builds and publishes via `.github/workflows/deploy.yml`. `static/CNAME` pins the
custom domain; GitHub Pages needs the matching DNS records on the apex.
