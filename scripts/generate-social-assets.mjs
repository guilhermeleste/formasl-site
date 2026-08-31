import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const ogDir = path.join(publicDir, 'og');

const [formaslSvg, researchLabSvg] = await Promise.all([
  readFile(path.join(publicDir, 'brand', 'formasl.svg')),
  readFile(path.join(publicDir, 'brand', 'forma-research-lab.svg')),
]);

const dataUri = (buffer) => `data:image/svg+xml;base64,${buffer.toString('base64')}`;
const formasl = dataUri(formaslSvg);
const researchLab = dataUri(researchLabSvg);

const cardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F3F0E8"/>
  <image href="${formasl}" x="80" y="76" width="430" height="94" preserveAspectRatio="xMinYMid meet"/>
  <rect x="80" y="218" width="68" height="4" fill="#A44332"/>
  <line x1="80" y1="472" x2="1120" y2="472" stroke="#171716" stroke-opacity="0.16"/>
  <image href="${researchLab}" x="80" y="512" width="245" height="56" preserveAspectRatio="xMinYMid meet"/>
</svg>`;

const touchIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#F3F0E8"/>
  <rect x="16" y="16" width="148" height="148" fill="none" stroke="#171716" stroke-opacity="0.14"/>
  <image href="${formasl}" x="18" y="70" width="144" height="40" preserveAspectRatio="xMidYMid meet"/>
</svg>`;

await mkdir(ogDir, { recursive: true });

await Promise.all([
  ...['en', 'pt-br', 'zh-hans'].map((locale) =>
    sharp(Buffer.from(cardSvg)).png({ palette: true }).toFile(path.join(ogDir, `${locale}.png`)),
  ),
  sharp(Buffer.from(touchIconSvg)).png({ palette: true }).toFile(path.join(publicDir, 'apple-touch-icon.png')),
]);

console.log('Generated social preview and touch icon assets.');
