'use strict';
// CSP enforcement dry-run: serve dist with the production CSP header, exercise the
// site + mdBook interactions, and report every securitypolicyviolation / console error.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..', 'dist');
const headers = fs.readFileSync(path.join(root, '_headers'), 'utf8');
let CSP = '';
{
  const lines = headers.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '/*') {
      for (let j = i + 1; j < lines.length && lines[j].startsWith('  '); j++) {
        if (lines[j].trim().startsWith('Content-Security-Policy:')) CSP = lines[j].trim().replace('Content-Security-Policy: ', '');
      }
    }
  }
}
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(root, p);
  try { if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html'); }
  catch { if (fs.existsSync(file + '.html')) file = file + '.html'; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Security-Policy': CSP }); res.end('nf'); return; }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'Content-Security-Policy': CSP });
    res.end(data);
  });
});

server.listen(0, '127.0.0.1', async () => {
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const violations = []; const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 140)); });
  page.on('pageerror', e => errors.push('pageerror: ' + String(e).slice(0, 140)));
  await page.addInitScript(() => {
    window.__violations = [];
    document.addEventListener('securitypolicyviolation', (e) => {
      window.__violations.push({ directive: e.violatedDirective, blocked: (e.blockedURL || '').slice(0, 120), source: (e.sourceFile || '').slice(-60) });
    });
  });
  const grab = async () => await page.evaluate(() => (window.__violations || []).splice(0));

  const steps = [
    ['/', async () => {}],
    ['/pt/', async () => { await page.waitForTimeout(300); }],
    ['/en/', async () => {}],
    ['/zh-CN/', async () => {}],
    ['/pt/formasl.html', async () => {}],
    ['/pt/componente/formafs.html', async () => {}],
    ['/zh-CN/fundamentos.html', async () => {}],
    ['/nao-existe', async () => {}],
    ['/docs/', async () => {}],
    ['/docs/conceitos/02-modelo-de-mundo.html', async () => {
      // search interaction
      await page.click('#mdbook-search-toggle');
      await page.click('#mdbook-searchbar');
      await page.type('#mdbook-searchbar', 'carrier', { delay: 30 });
      await page.waitForTimeout(1800);
      // theme switch
      await page.click('#mdbook-theme-toggle');
      await page.click('#mdbook-theme-coal');
      await page.waitForTimeout(300);
      // sidebar toggle
      const menu = await page.$('#mdbook-menu-button');
      if (menu) { await menu.click().catch(() => {}); }
      // toc script breadcrumb link presence
      await page.evaluate(() => !!document.querySelector('.forma-docs-breadcrumb'));
    }],
    ['/docs/en/conceitos-02-modelo-de-mundo.html', async () => {}],
    ['/docs/autoridades/40-semantic-metagraph-formalization-contract.html', async () => {}],
  ];
  for (const [url, act] of steps) {
    await page.goto(base + url, { waitUntil: 'load' }).catch(e => errors.push('goto ' + url + ': ' + String(e).slice(0, 80)));
    await act();
    const v = await grab();
    for (const item of v) violations.push({ page: url, ...item });
  }
  await browser.close();
  server.close();
  const report = { csp_applied: CSP.slice(0, 60) + '...', violation_count: violations.length, violations, console_errors: errors };
  console.log(JSON.stringify(report, null, 1));
  fs.writeFileSync(path.join(__dirname, '..', 'evidence', 'csp-violation-test.json'), JSON.stringify(report, null, 2) + '\n');
  process.exit(violations.length || errors.length ? 1 : 0);
});
