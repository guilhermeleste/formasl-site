# formasl-site

Public site for FormaSL, developed by Forma Research Lab.

## Scope

- minimal landing page;
- multilingual blog;
- English, Brazilian Portuguese, and Simplified Chinese from the first release;
- static output for Cloudflare Pages;
- public brand assets required by the site.

The site is an editorial and public-presence surface. It is **not** a semantic authority for the FormaSL language. Normative semantics, formalization, implementation, and language documentation remain owned by the FormaSL language repository.

## Local development

Requires Node.js 22.12.0 or newer.

```sh
npm install
npm run validate
npm run dev
npm run build
```

## Routes

- `/` — language gateway / `x-default`
- `/en/`
- `/pt-br/`
- `/zh-hans/`
- `/<locale>/blog/`
- `/<locale>/rss.xml`
- `/sitemap.xml`

See `I18N.md`, `BRAND.md`, and `DEPLOYMENT.md`.
