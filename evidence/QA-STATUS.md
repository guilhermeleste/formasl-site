# Forma Cloudflare v1 - test evidence (2026-10-31)

## Confirmed in this container

- Source site archive was inspected and extracted. It contains 70 HTML files and five shared assets.
- `scripts/build.py` compiled the institutional site without documentation, preserving the three locale trees.
- `scripts/validate.py dist` passed: 69 localized pages, five assets, 1,806 local links, 348 anchors.
- `scripts/smoke_http.py dist` passed: 10 static HTTP GET checks on a local Python HTTP server.
- `scripts/test_locale.js` passed: six root-language selection scenarios.
- `scripts/qa_browser_inline.py` passed: 36 visual render cases (six pages, three locales, two viewports). This test inlined CSS/images and OMITTED JS because the browser sandbox blocks local HTTP navigation; it does not prove runtime navigation.
- `scripts/test_pipeline.py` passed: mock mdBook builder exercised staging, branded HTML, release gate, sitemap, canonical tags, and nonmutation of source.
- Python syntax validation (`compileall`) passed.

## Not confirmed here

- Actual mdBook 0.5.2 build with the current full FormaSL checkout and projection dependencies.
- mdBook native search, responsive behavior, and all cross-chapter links on a compiled book.
- Cloudflare Pages project creation or deployment; no credentials were used.
- Browser-level HTTP navigation on the Cloudflare preview or the production custom domain.
- Native-speaker review of EN and Simplified Chinese pages.
- Exhaustive accessibility, CSP, contrast and device QA.

The release pipeline deliberately fails if the real mdBook cannot be compiled or if missing production inputs are not explicitly supplied. A site-only build cannot pass `--release`.
