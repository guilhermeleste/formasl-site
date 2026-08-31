# Cloudflare Pages deployment

The site is a fully static Astro build. No Cloudflare adapter is required.

## Pages build configuration

- Production branch: `main`
- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: `22.12.0` or newer

## Optional environment variables

- `PUBLIC_GITHUB_URL` — public destination for the FormaSL language repository. Leave unset while that repository is not public.
- `PUBLIC_CONTACT_EMAIL` — defaults to `hello@formasl.org`.

## Domain

Attach `formasl.org` as the canonical domain. If `www.formasl.org` is attached, redirect it to `https://formasl.org`.

## Pre-launch checks

1. `npm install`
2. `npm run validate`
3. `npm run build`
4. Inspect `/en/`, `/pt-br/`, `/zh-hans/`, `/sitemap.xml`, and all RSS routes in a preview deployment.
5. Confirm `hello@formasl.org` and the public GitHub destination before enabling those links.
