import { mkdir, readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const ogDir = path.join(publicDir, 'og');
const locales = ['en', 'pt-br', 'zh-hans'];

const [formaslSvg, researchLabSvg] = await Promise.all([
  readFile(path.join(publicDir, 'brand', 'formasl.svg')),
  readFile(path.join(publicDir, 'brand', 'forma-research-lab.svg')),
]);

const dataUri = (buffer) => `data:image/svg+xml;base64,${buffer.toString('base64')}`;
const formasl = dataUri(formaslSvg);
const researchLab = dataUri(researchLabSvg);

const frontmatterValue = (text, field) => {
  const match = text.match(new RegExp(`^${field}:\\s*(?:"([^"]*)"|'([^']*)'|([^\\n]+))`, 'm'));
  return match ? (match[1] ?? match[2] ?? match[3]).trim() : null;
};

const genericCardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F3F0E8"/>
  <image href="${formasl}" x="72" y="66" width="330" height="76" preserveAspectRatio="xMinYMid meet"/>
  <rect x="72" y="198" width="58" height="3" fill="#A44332"/>
  <line x1="72" y1="486" x2="1128" y2="486" stroke="#171716" stroke-opacity="0.18"/>
  <image href="${researchLab}" x="72" y="526" width="220" height="48" preserveAspectRatio="xMinYMid meet"/>
</svg>`;

const touchIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#F3F0E8"/>
  <rect x="16" y="16" width="148" height="148" fill="none" stroke="#171716" stroke-opacity="0.14"/>
  <image href="${formasl}" x="18" y="70" width="144" height="40" preserveAspectRatio="xMidYMid meet"/>
</svg>`;

const articleJobs = [];
for (const locale of locales) {
  const sourceDir = path.join(root, 'src', 'data', 'blog', locale);
  const outputDir = path.join(ogDir, 'articles', locale);
  await mkdir(outputDir, { recursive: true });
  for (const name of await readdir(sourceDir)) {
    if (!name.endsWith('.md')) continue;
    const text = await readFile(path.join(sourceDir, name), 'utf8');
    if (frontmatterValue(text, 'draft') === 'true') continue;
    const translationKey = frontmatterValue(text, 'translationKey');
    const slug = frontmatterValue(text, 'slug');
    const hero = frontmatterValue(text, 'hero');
    const match = /^series-01-(\d{2})$/.exec(translationKey ?? '');
    if (!slug || !hero || !match) continue;
    const heroPath = path.join(publicDir, hero.replace(/^\//, ''));
    const heroSvg = await readFile(heroPath);
    const heroUri = dataUri(heroSvg);
    const part = match[1];
    const articleCardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F3F0E8"/>
  <image href="${formasl}" x="70" y="62" width="290" height="68" preserveAspectRatio="xMinYMid meet"/>
  <rect x="70" y="188" width="54" height="3" fill="#A44332"/>
  <text x="70" y="346" font-family="Arial, sans-serif" font-size="118" font-weight="600" letter-spacing="-5" fill="#171716">${part}</text>
  <line x1="70" y1="486" x2="1130" y2="486" stroke="#171716" stroke-opacity="0.18"/>
  <image href="${heroUri}" x="560" y="74" width="570" height="380" preserveAspectRatio="xMidYMid slice"/>
  <image href="${researchLab}" x="70" y="526" width="220" height="48" preserveAspectRatio="xMinYMid meet"/>
</svg>`;
    articleJobs.push(sharp(Buffer.from(articleCardSvg)).png({ palette: true }).toFile(path.join(outputDir, `${slug}.png`)));
  }
}

await mkdir(ogDir, { recursive: true });
await Promise.all([
  ...locales.map((locale) => sharp(Buffer.from(genericCardSvg)).png({ palette: true }).toFile(path.join(ogDir, `${locale}.png`))),
  ...articleJobs,
  sharp(Buffer.from(touchIconSvg)).png({ palette: true }).toFile(path.join(publicDir, 'apple-touch-icon.png')),
]);

console.log(`Generated ${locales.length} generic social previews, ${articleJobs.length} article previews and the touch icon.`);
