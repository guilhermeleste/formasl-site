# Cloudflare Pages deployment

The site is a fully static Astro build. No Cloudflare adapter is required.

## Pages build configuration

- Production branch: `main`
- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: `22.20.0` recommended; `22.19.0` or newer required by the current dependency graph.

## Optional environment variables

- `PUBLIC_GITHUB_URL` — public destination for the FormaSL language repository. Leave unset while that repository is not public.
- `PUBLIC_CONTACT_EMAIL` — defaults to `hello@formasl.org`.

## Domain

Attach `formasl.org` as the canonical domain. If `www.formasl.org` is attached, redirect it to `https://formasl.org`.

## Pre-launch checks

1. `npm install`
2. `npm run design:lint`
3. `npm run validate`
4. `npm run build`
5. Inspect `/en/`, `/pt-br/`, `/zh-hans/`, `/sitemap.xml`, `/llms.txt`, all RSS routes and at least one article per locale in a preview deployment.
6. Confirm `hello@formasl.org` and the public GitHub destination before enabling those links.
7. Run the Cloudflare access regression matrix documented in `CLOUDFLARE.md` before changing security, locale routing or Markdown negotiation at the edge.
