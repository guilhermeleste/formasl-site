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

`public/robots.txt` in this repository is authoritative. Do not enable a Cloudflare feature that silently replaces it with a different managed policy.

The origin also sends `Content-Signal: search=yes, ai-input=yes, ai-train=no` through `public/_headers` so that HTML and Cloudflare Markdown conversions communicate the same preference.

## Markdown for Agents

Cloudflare Markdown for Agents may be enabled after the WhatsApp/Telegram access issue is understood. The site must remain fully functional when this feature is disabled.

After enabling it, verify on at least one article:

- `Accept: text/html` returns the normal page;
- `Accept: text/markdown` returns Markdown;
- the Markdown response includes `Vary: Accept`;
- the origin `Content-Signal` policy is preserved;
- HTML and Markdown represent the same editorial content.

Do not implement a second hand-maintained Markdown article tree.

## Language routing

The root `/` remains a static language gateway until the in-app browser incident is resolved. A later edge change may use explicit saved preference, then `Accept-Language`, then English fallback. Such a redirect must not be cached as a universal language decision and must not depend on client-side JavaScript.

Do not map `zh-TW`, `zh-HK`, `zh-MO` or `zh-Hant` silently to Simplified Chinese. Until a Traditional Chinese locale exists, use English as the fallback for those tags.

## Analytics

Cloudflare Web Analytics is intentionally not represented as active in the repository until it is actually enabled. Update the localized privacy notice in the same release that analytics becomes active.

Search Console and Bing Webmaster Tools verification should use a method that does not require DNS changes when a file/meta verification option is sufficient.

## Regression matrix

After any Cloudflare security, routing or Markdown change, re-test:

- WhatsApp Android/iOS in-app browser;
- Telegram Android/iOS in-app browser;
- direct Chrome/Safari on the same device/network;
- social preview fetching;
- `/`, each locale root, one article, `robots.txt`, sitemap and RSS.
