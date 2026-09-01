import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const locales = ['en', 'pt-br', 'zh-hans'];
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
  'content/series-01/GLOSSARY-PT-EN-ZH-HANS.md',
];

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) fail('Missing required files:\n' + missing.map((x) => `- ${x}`).join('\n'));

const config = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
for (const token of ["'en'", "'pt-br'", "'zh-hans'", 'prefixDefaultLocale: true', 'redirectToDefaultLocale: false']) {
  if (!config.includes(token)) fail(`astro.config.mjs missing required i18n token: ${token}`);
}

for (const rel of ['public/brand/formasl.svg', 'public/brand/forma-research-lab.svg']) {
  const svg = fs.readFileSync(path.join(root, rel), 'utf8');
  if (/<text\b/i.test(svg)) fail(`${rel} contains live <text>; canonical wordmarks must remain outlined.`);
}

const frontmatterValue = (text, field) => {
  const match = text.match(new RegExp(`^${field}:\\s*(?:"([^"]*)"|'([^']*)'|([^\\n]+))`, 'm'));
  return match ? (match[1] ?? match[2] ?? match[3]).trim() : null;
};

const entries = [];
for (const locale of locales) {
  const dir = path.join(root, 'src/data/blog', locale);
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith('.md')) continue;
    const file = path.join(dir, name);
    const text = fs.readFileSync(file, 'utf8');
    for (const field of ['locale', 'slug', 'translationKey', 'title', 'description', 'date', 'draft']) {
      if (frontmatterValue(text, field) === null) fail(`${path.relative(root, file)} missing field ${field}`);
    }
    const hero = frontmatterValue(text, 'hero');
    const heroAlt = frontmatterValue(text, 'heroAlt');
    if ((hero && !heroAlt) || (!hero && heroAlt)) fail(`${path.relative(root, file)} must define hero and heroAlt together.`);

    const end = text.indexOf('\n---', 4);
    const body = end >= 0 ? text.slice(end + 4).trim() : '';
    entries.push({
      locale,
      name,
      file,
      text,
      body,
      slug: frontmatterValue(text, 'slug'),
      translationKey: frontmatterValue(text, 'translationKey'),
      declaredLocale: frontmatterValue(text, 'locale'),
      draft: frontmatterValue(text, 'draft'),
      hero,
    });
  }
}

for (const entry of entries) {
  if (entry.declaredLocale !== entry.locale) fail(`${path.relative(root, entry.file)} locale does not match its directory.`);
}

const series = entries.filter((entry) => /^series-01-\d{2}$/.test(entry.translationKey ?? ''));
const expectedKeys = Array.from({ length: 8 }, (_, index) => `series-01-${String(index + 1).padStart(2, '0')}`);
if (series.length !== 24) fail(`Series 01 must contain exactly 24 localized articles; found ${series.length}.`);

for (const locale of locales) {
  const localized = series.filter((entry) => entry.locale === locale);
  if (localized.length !== 8) fail(`Series 01 must contain exactly 8 articles for ${locale}; found ${localized.length}.`);
  const slugs = localized.map((entry) => entry.slug);
  if (new Set(slugs).size !== slugs.length) fail(`Duplicate Series 01 slug detected in ${locale}.`);
}

const allSeriesSlugs = series.map((entry) => entry.slug);
if (new Set(allSeriesSlugs).size !== allSeriesSlugs.length) fail('Duplicate Series 01 slug detected across locales; Astro content slugs must be globally unique.');

for (const key of expectedKeys) {
  const triplet = series.filter((entry) => entry.translationKey === key);
  if (triplet.length !== 3) fail(`${key} must have exactly three translations; found ${triplet.length}.`);
  const presentLocales = new Set(triplet.map((entry) => entry.locale));
  for (const locale of locales) if (!presentLocales.has(locale)) fail(`${key} is missing locale ${locale}.`);
  if (new Set(triplet.map((entry) => entry.draft)).size !== 1) fail(`${key} has inconsistent draft state across locales.`);
  for (const entry of triplet) {
    if (entry.body.length < 1000) fail(`${path.relative(root, entry.file)} body is unexpectedly short (${entry.body.length} chars).`);
    if (!entry.hero) fail(`${path.relative(root, entry.file)} is missing its editorial hero.`);
    const heroPath = path.join(root, 'public', entry.hero.replace(/^\//, '').replace(/^public\//, ''));
    if (!fs.existsSync(heroPath)) fail(`${path.relative(root, entry.file)} references missing hero ${entry.hero}.`);
  }
}

const seriesKeys = series.map((entry) => `${entry.locale}:${entry.translationKey}`);
if (new Set(seriesKeys).size !== seriesKeys.length) fail('Duplicate translationKey detected within the same Series 01 locale.');

for (const locale of locales) {
  const example = entries.find((entry) => entry.locale === locale && entry.name === 'example-draft.md');
  if (example && example.draft !== 'true') fail(`${locale}/example-draft.md must remain draft.`);
}

console.log(`PASS: ${required.length} required files, 3 locales, ${entries.length} content entries.`);
console.log('PASS: Series 01 contains exactly 24 complete articles (8 x 3), with complete translation triplets, unique slugs, consistent draft state, and local heroes.');
