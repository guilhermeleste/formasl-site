import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const required = [
  'astro.config.mjs',
  'src/content.config.ts',
  'src/pages/index.astro',
  'src/pages/en/index.astro',
  'src/pages/pt-br/index.astro',
  'src/pages/zh-hans/index.astro',
  'src/pages/en/blog/index.astro',
  'src/pages/pt-br/blog/index.astro',
  'src/pages/zh-hans/blog/index.astro',
  'src/pages/en/rss.xml.ts',
  'src/pages/pt-br/rss.xml.ts',
  'src/pages/zh-hans/rss.xml.ts',
  'src/pages/sitemap.xml.ts',
  'public/brand/formasl.svg',
  'public/brand/forma-research-lab.svg',
  'public/favicon.svg',
  'public/robots.txt',
  'I18N.md',
  'BRAND.md',
  'DEPLOYMENT.md',
  'src/pages/en/privacy.astro',
  'src/pages/pt-br/privacy.astro',
  'src/pages/zh-hans/privacy.astro',
];
const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing required files:\n' + missing.map((x) => `- ${x}`).join('\n'));
  process.exit(1);
}

const config = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
for (const token of ["'en'", "'pt-br'", "'zh-hans'", 'prefixDefaultLocale: true', 'redirectToDefaultLocale: false']) {
  if (!config.includes(token)) {
    console.error(`astro.config.mjs missing required i18n token: ${token}`);
    process.exit(1);
  }
}

const brandSvgs = ['public/brand/formasl.svg', 'public/brand/forma-research-lab.svg'];
for (const rel of brandSvgs) {
  const svg = fs.readFileSync(path.join(root, rel), 'utf8');
  if (/<text\b/i.test(svg)) {
    console.error(`${rel} contains live <text>; canonical wordmarks must remain outlined.`);
    process.exit(1);
  }
}

const markdownFiles = [];
for (const locale of ['en', 'pt-br', 'zh-hans']) {
  const dir = path.join(root, 'src/data/blog', locale);
  for (const name of fs.readdirSync(dir)) if (name.endsWith('.md')) markdownFiles.push(path.join(dir, name));
}
for (const file of markdownFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const field of ['locale:', 'slug:', 'translationKey:', 'title:', 'description:', 'date:', 'draft:']) {
    if (!text.includes(field)) {
      console.error(`${path.relative(root, file)} missing field ${field}`);
      process.exit(1);
    }
  }
}

console.log(`PASS: ${required.length} required files, 3 locales, ${markdownFiles.length} draft content entries, outlined wordmarks.`);
