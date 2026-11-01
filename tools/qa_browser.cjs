'use strict';
// Node-port of scripts/qa_browser.py (playwright-python segfaults on this host).
// Same page set, locales, viewports, checks and evidence schema as the original.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const PAGES = ['index.html', 'fundamentos.html', 'formasl.html', 'arquitetura.html',
  'ecossistema.html', 'documentacao.html'];
const LOCALES = ['pt', 'en', 'zh-CN'];
const SIZES = [[1440, 900], [390, 844]];
const LOCALE_TAG = { pt: 'pt-BR', en: 'en-US', 'zh-CN': 'zh-CN' };

function main() {
  const args = process.argv.slice(2);
  const dirIdx = args.indexOf('--directory');
  const outIdx = args.indexOf('--out');
  const baseIdx = args.indexOf('--base-url');
  const remoteBase = baseIdx >= 0 ? args[baseIdx + 1].replace(/\/$/, '') : null;
  const root = path.resolve(dirIdx >= 0 ? args[dirIdx + 1] : 'dist');
  const out = path.resolve(outIdx >= 0 ? args[outIdx + 1] : 'evidence/browser-qa.json');

  class Handler extends require('node:http').Server { }
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(root, urlPath);
    try { if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html'); } catch { }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404); res.end('nf'); return; }
      const ext = path.extname(file);
      const type = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
        '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png' }[ext] || 'application/octet-stream';
      res.writeHead(200, { 'content-type': type });
      res.end(data);
    });
  });
  server.listen(0, '127.0.0.1', async () => {
    const base = remoteBase || `http://127.0.0.1:${server.address().port}`;
    const results = [];
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
    try {
      for (const lang of LOCALES) {
        for (const [width, height] of SIZES) {
          const ctx = await browser.newContext({ locale: LOCALE_TAG[lang], viewport: { width, height } });
          const page = await ctx.newPage();
          let errs = [];
          page.on('pageerror', (e) => errs.push(String(e)));
          for (const document of PAGES) {
            const resp = await page.goto(`${base}/${lang}/${document}`, { waitUntil: 'domcontentloaded' });
            await page.waitForTimeout(120);
            const overflow = await page.evaluate('document.documentElement.scrollWidth > window.innerWidth + 2');
            const h1Visible = await page.locator('h1').first().isVisible();
            const contact = page.locator('footer .footer-links a[href="mailto:hello@formasl.org"]');
            const contactCount = await contact.count();
            let contactStyle = false;
            let contactKeyboard = false;
            if (contactCount === 1) {
              contactStyle = await contact.evaluate((el) => {
                const own = getComputedStyle(el), sibling = getComputedStyle(el.previousElementSibling);
                return el.textContent === 'hello@formasl.org' &&
                  ['fontFamily', 'fontSize', 'color'].every((key) => own[key] === sibling[key]);
              });
              await contact.evaluate((el) => el.previousElementSibling.focus());
              await page.keyboard.press('Tab');
              contactKeyboard = await contact.evaluate((el) => el === document.activeElement &&
                el.matches(':focus-visible') && parseFloat(getComputedStyle(el).outlineWidth) > 0);
            }
            results.push({ lang, page: document, viewport: width, status: resp ? resp.status() : null,
              overflow, h1_visible: h1Visible, contact_count: contactCount,
              contact_style: contactStyle, contact_keyboard: contactKeyboard, errors: [...errs] });
            errs = [];
          }
          await page.goto(`${base}/index.html`, { waitUntil: 'domcontentloaded' });
          const localePaths = [`/${lang}/index.html`, `/${lang}/`];
          await page.waitForURL((url) => localePaths.includes(url.pathname), { timeout: 10000 });
          results.push({ locale_detection: lang, viewport: width,
            ok: localePaths.includes(new URL(page.url()).pathname) });
          await ctx.close();
        }
      }
    } finally {
      await browser.close();
      server.close();
    }
    const failures = results.filter((r) =>
      ('status' in r && (r.status !== 200 || r.overflow || !r.h1_visible ||
        r.contact_count !== 1 || !r.contact_style || !r.contact_keyboard || r.errors.length)) ||
      ('locale_detection' in r && !r.ok));
    const summary = { status: failures.length ? 'FAIL' : 'PASS', cases: results.length, failures };
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify({ summary, results }, null, 2) + '\n');
    console.log(JSON.stringify(summary, null, 2));
    process.exit(failures.length ? 1 : 0);
  });
}
main();
