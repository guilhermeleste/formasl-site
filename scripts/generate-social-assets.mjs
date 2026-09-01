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

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

function wrapTitle(value, locale) {
  if (locale === 'zh-hans') {
    const chars = Array.from(value);
    const lines = [];
    for (let index = 0; index < chars.length; index += 12) lines.push(chars.slice(index, index + 12).join(''));
    return lines.slice(0, 4);
  }

  const max = 23;
  const words = value.split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  if (lines.length <= 4) return lines;
  return [...lines.slice(0, 3), lines.slice(3).join(' ')];
}

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
    const title = frontmatterValue(text, 'title');
    const match = /^series-01-(\d{2})$/.exec(translationKey ?? '');
    if (!slug || !hero || !title || !match) continue;

    const heroPath = path.join(publicDir, hero.replace(/^\//, ''));
    const heroSvg = await readFile(heroPath);
    const heroUri = dataUri(heroSvg);
    const part = Number(match[1]);
    const partLabel = locale === 'pt-br' ? `PARTE ${part}` : locale === 'zh-hans' ? `第 ${part} 部分` : `PART ${part}`;
    const titleLines = wrapTitle(title, locale);
    const titleFontSize = locale === 'zh-hans' ? 42 : 45;
    const titleLineHeight = locale === 'zh-hans' ? 54 : 53;
    const titleTspans = titleLines.map((line, index) => `<tspan x="70" dy="${index === 0 ? 0 : titleLineHeight}">${escapeXml(line)}</tspan>`).join('');

    const articleCardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F3F0E8"/>
  <image href="${formasl}" x="70" y="58" width="255" height="60" preserveAspectRatio="xMinYMid meet"/>
  <text x="70" y="178" font-family="Arial, 'Noto Sans CJK SC', 'Noto Sans CJK', sans-serif" font-size="18" font-weight="600" letter-spacing="1.6" fill="#67635D">${escapeXml(partLabel)}</text>
  <rect x="70" y="201" width="48" height="3" fill="#A44332"/>
  <text x="70" y="263" font-family="Arial, 'Noto Sans CJK SC', 'Noto Sans CJK', sans-serif" font-size="${titleFontSize}" font-weight="600" fill="#171716">${titleTspans}</text>
  <image href="${heroUri}" x="742" y="102" width="388" height="259" preserveAspectRatio="xMidYMid slice"/>
  <line x1="70" y1="486" x2="1130" y2="486" stroke="#171716" stroke-opacity="0.18"/>
  <text x="70" y="545" font-family="Arial, 'Noto Sans CJK SC', sans-serif" font-size="20" font-weight="600" fill="#171716">Guilherme Leste · FormaSL</text>
  <image href="${researchLab}" x="910" y="520" width="220" height="48" preserveAspectRatio="xMaxYMid meet"/>
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
