import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const locales = ['en', 'pt-br', 'zh-hans'];
const required = [
  'astro.config.mjs',
  'DESIGN.md',
  'BRAND.md',
  'CLOUDFLARE.md',
  'DEPLOYMENT.md',
  'I18N.md',
  'EDITORIAL-ILLUSTRATIONS.md',
  'src/content.config.ts',
  'src/data/editorial.ts',
  'src/data/concepts.ts',
  'src/pages/index.astro',
  'src/pages/en/index.astro',
  'src/pages/pt-br/index.astro',
  'src/pages/zh-hans/index.astro',
  'src/pages/en/blog/index.astro',
  'src/pages/pt-br/blog/index.astro',
  'src/pages/zh-hans/blog/index.astro',
  'src/pages/en/glossary.astro',
  'src/pages/pt-br/glossario.astro',
  'src/pages/zh-hans/glossary.astro',
  'src/pages/en/rss.xml.ts',
  'src/pages/pt-br/rss.xml.ts',
  'src/pages/zh-hans/rss.xml.ts',
  'src/pages/sitemap.xml.ts',
  'src/pages/llms.txt.ts',
  'public/brand/formasl.svg',
  'public/brand/forma-research-lab.svg',
  'public/favicon.svg',
  'public/robots.txt',
  'public/_headers',
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

const robots = fs.readFileSync(path.join(root, 'public/robots.txt'), 'utf8');
if (!robots.includes('Sitemap: https://formasl.org/sitemap.xml')) fail('robots.txt must reference the canonical sitemap.');
if (!robots.includes('Content-Signal: search=yes, ai-input=yes, ai-train=no')) fail('robots.txt must preserve the public Content Signals policy.');
const headers = fs.readFileSync(path.join(root, 'public/_headers'), 'utf8');
if (!headers.toLowerCase().includes('content-signal: search=yes, ai-input=yes, ai-train=no')) fail('public/_headers must preserve the public Content Signals policy.');

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
    const date = frontmatterValue(text, 'date');
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(`${path.relative(root, file)} date must be a calendar date in YYYY-MM-DD form.`);

    const end = text.indexOf('\n---', 4);
    const body = end >= 0 ? text.slice(end + 4).trim() : '';
    entries.push({
      locale,
      name,
      file,
      body,
      slug: frontmatterValue(text, 'slug'),
      translationKey: frontmatterValue(text, 'translationKey'),
      declaredLocale: frontmatterValue(text, 'locale'),
      draft: frontmatterValue(text, 'draft'),
      hero,
      date,
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
  const parts = localized.map((entry) => Number(entry.translationKey.slice(-2)));
  if (parts.sort((a, b) => a - b).join(',') !== '1,2,3,4,5,6,7,8') fail(`Series 01 parts for ${locale} must be exactly 1..8.`);
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
    if (!entry.hero) fail(`${path.relative(root, entry.file)} is missing its editorial figure.`);
    const heroPath = path.join(root, 'public', entry.hero.replace(/^\//, '').replace(/^public\//, ''));
    if (!fs.existsSync(heroPath)) fail(`${path.relative(root, entry.file)} references missing figure ${entry.hero}.`);
  }
}

const seriesKeys = series.map((entry) => `${entry.locale}:${entry.translationKey}`);
if (new Set(seriesKeys).size !== seriesKeys.length) fail('Duplicate translationKey detected within the same Series 01 locale.');

for (const locale of locales) {
  const example = entries.find((entry) => entry.locale === locale && entry.name === 'example-draft.md');
  if (example && example.draft !== 'true') fail(`${locale}/example-draft.md must remain draft.`);
}

const blogPostSource = fs.readFileSync(path.join(root, 'src/components/BlogPost.astro'), 'utf8');
if (blogPostSource.includes('post.data.authors')) fail('BlogPost must resolve authorship through the editorial registry, not legacy authors frontmatter.');
if (blogPostSource.includes('xDefaultPath={canonicalPath}')) fail('Article translations must not declare each localized canonical as x-default.');

console.log(`PASS: ${required.length} required files, 3 locales, ${entries.length} content entries.`);
console.log('PASS: Series 01 contains exactly 24 complete articles (8 x 3), with stable translation triplets, unique slugs, calendar dates and editorial figures.');
console.log('PASS: public discovery policy, design contract and editorial-authority routing are present.');
