# formasl-site

Public website for FormaSL and Forma Research Lab.

## Local development

```bash
npm install
npm run design:lint
npm run validate
npm run dev
```

## Production build

```bash
npm run design:lint
npm run validate
npm run build
```

The site is an Astro static build. `DESIGN.md` is the operational design contract and is linted with a pinned `@google/design.md` CLI version. `BRAND.md` remains the upstream public brand baseline.

Cloudflare-specific production behavior and manual gates are documented in `CLOUDFLARE.md` and `DEPLOYMENT.md`.
