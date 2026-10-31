const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..', 'dist');
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(root, p);
  try { if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html'); } catch { if (fs.existsSync(file + '.html')) file = file + '.html'; }
  fs.readFile(file, (err, data) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200); res.end(data); });
});
server.listen(0, '127.0.0.1', async () => {
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(base + '/docs/conceitos/02-modelo-de-mundo.html', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  await page.click('#mdbook-theme-toggle');
  await page.waitForTimeout(300);
  console.log('THEME_LIST_HTML:', (await page.evaluate(() => document.getElementById('mdbook-theme-list')?.outerHTML?.slice(0, 700) || 'NO #mdbook-theme-list')));
  await page.click('#mdbook-search-toggle');
  await page.waitForTimeout(300);
  console.log('SEARCH_AREA_HTML:', await page.evaluate(() => {
    const cands = ['#mdbook-search', '#search-wrapper', '.searchbar-inner', '#mdbook-searchbar'];
    for (const c of cands) { const el = document.querySelector(c); if (el) return c + ' => ' + (el.closest('div')?.outerHTML || el.outerHTML).slice(0, 900); }
    return 'none';
  }));
  // simulate full search: set value + dispatch input AND keyup, then poll results area for 12s
  const res = await page.evaluate(() => new Promise((resolve) => {
    const sb = document.getElementById('mdbook-searchbar');
    sb.value = 'carrier';
    sb.dispatchEvent(new Event('input', { bubbles: true }));
    sb.dispatchEvent(new KeyboardEvent('keyup', { key: 'r', bubbles: true }));
    const t0 = Date.now();
    const poll = () => {
      const hosts = ['#mdbook-search-results', '#searchresults', '.search-results'];
      for (const h of hosts) {
        const el = document.querySelector(h);
        if (el) {
          const lis = el.querySelectorAll('li');
          if (lis.length) return resolve({ host: h, count: lis.length, first: lis[0].textContent.trim().slice(0, 140), after_ms: Date.now() - t0 });
        }
      }
      if (Date.now() - t0 > 12000) {
        return resolve({ host: null, count: 0, after_ms: Date.now() - t0,
          dom_ids: [...document.querySelectorAll('[id*="search" i]')].map(e => e.id) });
      }
      setTimeout(poll, 400);
    };
    poll();
  }));
  console.log('SEARCH_POLL:', JSON.stringify(res));
  await browser.close(); server.close();
});
