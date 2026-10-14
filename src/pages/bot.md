---
title: DealDeskBot
description: The crawler that reads a company's own website when that company asks Deal Desk to learn from it.
---

# DealDeskBot

If you saw `DealDeskBot/1.0 (+https://dealdesk.studio/bot)` in your logs, a Deal Desk customer asked
Deal Desk to read **their own** company website. Deal Desk drafts their proposals and RFP answers
from what the site says about their services and past work.

## What it does

- It reads only the site the customer typed in. That includes the same host with or without `www.`,
  but never other sites it links to.
- It obeys `robots.txt`. It follows the rules for `DealDeskBot` if there are any, otherwise the
  rules for `*`.
- It reads at most 30 pages. It starts with your sitemap and the pages that describe the company,
  and leaves blog archives and legal pages for last.
- It sends one request at a time, with a pause between them. It runs only when the customer adds or
  refreshes the site.
- It reads only public pages. It never signs in, fills in forms or runs scripts.

## Stopping it

To keep DealDeskBot off your site, add this to your `robots.txt`:

```
User-agent: DealDeskBot
Disallow: /
```

Questions: **info@dealdesk.studio**.
