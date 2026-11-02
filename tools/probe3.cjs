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
  const reqs = [];
  page.on('response', r => { if (/searchindex/.test(r.url())) reqs.push(r.url().split('/').pop() + ' HTTP ' + r.status()); });

  await page.goto(base + '/docs/conceitos/02-modelo-de-mundo.html', { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  // THEME: real click on the coal button
  await page.click('#mdbook-theme-toggle');
  await page.waitForTimeout(200);
  await page.click('#mdbook-theme-coal');
  await page.waitForTimeout(500);
  console.log('THEME:', JSON.stringify(await page.evaluate(() => ({
    stored: localStorage.getItem('mdbook-theme'), cls: document.documentElement.className,
    body_bg: getComputedStyle(document.body).backgroundColor,
  }))));

  // SEARCH: real toggle + real typing, poll the CORRECT results host
  await page.click('#mdbook-search-toggle');
  await page.waitForTimeout(400);
  await page.click('#mdbook-searchbar');
  await page.type('#mdbook-searchbar', 'carrier', { delay: 50 });
  const search = await page.evaluate(() => new Promise((resolve) => {
    const t0 = Date.now();
    const poll = () => {
      const outer = document.getElementById('mdbook-searchresults-outer');
      const list = document.getElementById('mdbook-searchresults');
      const header = document.getElementById('mdbook-searchresults-header')?.textContent?.trim();
      const lis = list ? [...list.querySelectorAll('li')] : [];
      const visible = outer ? !outer.hidden && getComputedStyle(outer).display !== 'none' : false;
      if (lis.length || (header && /no result/i.test(header)) || Date.now() - t0 > 15000) {
        return resolve({ visible, header: header?.slice(0, 100), count: lis.length,
          first: lis[0]?.textContent?.trim()?.slice(0, 150) || null, after_ms: Date.now() - t0 });
      }
      setTimeout(poll, 400);
    };
    poll();
  }));
  console.log('SEARCH:', JSON.stringify(search));
  console.log('INDEX_REQUESTS:', JSON.stringify(reqs));
  await browser.close(); server.close();
});
