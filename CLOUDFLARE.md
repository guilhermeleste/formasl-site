# Cloudflare production contract

Status: operational contract for `formasl.org`.

The repository is the source of truth for the static site, `robots.txt`, public response headers and editorial assets. Cloudflare may provide edge security, caching, analytics and Markdown conversion, but must not become a hidden source of editorial meaning.

## Public access gate

A reported production issue affects links opened from WhatsApp and Telegram. Diagnose it in Cloudflare Security Events before adding new edge behavior.

Reproduce separately:

- a human opening `/`, one locale home and one article inside WhatsApp;
- the same inside Telegram;
- the corresponding social-preview crawler fetching the HTML and `og:image`;
- the same URLs in the device's normal browser.

Inspect WAF, Bot Fight/Super Bot Fight, Browser Integrity Check, rate limiting, Under Attack Mode and custom/managed challenge rules. Do not solve this with a broad user-agent allowlist unless a narrowly scoped rule is demonstrably required.

Public static `GET` and `HEAD` requests for HTML, CSS, assets, `robots.txt`, sitemap, RSS and editorial resources should not require an interstitial challenge without a demonstrated security need.

## robots.txt

`public/robots.txt` defines the repository's base policy. Cloudflare AI Crawl Control is intentionally enabled and prepends a managed policy to the response; the managed policy is not a replacement for the repository file.

The current effective policy is materially compatible with the intended boundary: search and AI retrieval/input remain allowed for the declared retrieval agents, while AI training crawlers are disallowed. The origin also sends `Content-Signal: search=yes, ai-input=yes, ai-train=no` through `public/_headers` so that HTML and any future Cloudflare Markdown conversion communicate the same preference.

## Markdown for Agents

The current plan exposes the Markdown for Agents control as unavailable (`Upgrade plan`). The site therefore remains HTML-only and fully functional without a parallel Markdown implementation. If the feature becomes available, verify on at least one article:

- `Accept: text/html` returns the normal page;
- `Accept: text/markdown` returns Markdown;
- the Markdown response includes `Vary: Accept`;
- the origin `Content-Signal` policy is preserved;
- HTML and Markdown represent the same editorial content.

Do not implement a second hand-maintained Markdown article tree.

## Language routing

The root `/` is redirected at the Cloudflare edge using an explicit `?locale=` gateway choice (persisted as `formasl_locale`), then the saved cookie, then `Accept-Language`, then English fallback. Redirects are limited to `/`, use `302`, and are not cacheable as a shared language decision; localized routes remain static and cacheable. The implementation does not depend on client-side JavaScript.

Do not map `zh-TW`, `zh-HK`, `zh-MO` or `zh-Hant` silently to Simplified Chinese. Until a Traditional Chinese locale exists, use English as the fallback for those tags.

## Analytics

Cloudflare Web Analytics RUM Lite is enabled for `formasl.org` with automatic installation and no cookie/localStorage-based usage measurement. The localized privacy notice describes aggregate page-performance/navigation metrics and the remaining infrastructure/security logs. Do not add GA4, GTM, session replay or heatmaps.

Search Console and Bing Webmaster Tools verification should use a method that does not require DNS changes when a file/meta verification option is sufficient.

## Regression matrix

After any Cloudflare security, routing or Markdown change, re-test:

- WhatsApp Android/iOS in-app browser;
- Telegram Android/iOS in-app browser;
- direct Chrome/Safari on the same device/network;
- social preview fetching;
- `/`, each locale root, one article, `robots.txt`, sitemap and RSS.
