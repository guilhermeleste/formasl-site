const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname,'..','dist');
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
  const consoleErrors = []; const failed = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 160)); });
  page.on('requestfailed', r => failed.push(r.url().slice(-60) + ' :: ' + (r.failure()?.errorText || '')));
  page.on('response', r => { if (r.status() >= 400) failed.push(r.url().slice(-60) + ' :: HTTP ' + r.status()); });

  // 1) code highlight on a rust/bash page
  await page.goto(base + '/docs/autoridades/user/OBSERVABILITY.html', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const hl = await page.evaluate(() => ({
    pre: document.querySelectorAll('pre').length,
    spans: document.querySelectorAll('pre code span').length,
    hljs_blocks: document.querySelectorAll('pre code.hljs').length,
  }));
  console.log('HIGHLIGHT', JSON.stringify(hl));

  // 2) search flow with generous waits
  await page.goto(base + '/docs/conceitos/02-modelo-de-mundo.html', { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  await page.click('#mdbook-search-toggle');
  await page.waitForTimeout(300);
  await page.type('#mdbook-searchbar', 'carrier', { delay: 60 });
  await page.waitForTimeout(6000);
  const search = await page.evaluate(() => {
    const hosts = ['#mdbook-search-results', '#searchresults', '.search-results', 'ol.results'];
    let list = [];
    for (const h of hosts) { const el = document.querySelector(h); if (el) { list = [...el.querySelectorAll('li')]; break; } }
    const text = list.map(l => l.textContent.trim()).filter(Boolean);
    return { count: list.length, first: text[0]?.slice(0, 140) || null,
             visible_results_container: !!document.querySelector('#mdbook-search-results, #searchresults') };
  });
  console.log('SEARCH', JSON.stringify(search));

  // 3) theme switch via real elements
  await page.click('#mdbook-theme-toggle');
  await page.waitForTimeout(250);
  const clickedCoal = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('#mdbook-theme-list button, #mdbook-theme-list li')];
    const coal = btns.find(b => b.textContent.trim() === 'Coal');
    if (coal) { coal.click(); return true; } return false;
  });
  await page.waitForTimeout(400);
  const theme = await page.evaluate(() => ({ clickedCoal: undefined, stored: localStorage.getItem('mdbook-theme'), cls: document.documentElement.className }));
  theme.clickedCoal = clickedCoal;
  console.log('THEME', JSON.stringify(theme));
  console.log('CONSOLE_ERRORS', JSON.stringify(consoleErrors.slice(0, 6)));
  console.log('FAILED_REQ', JSON.stringify(failed.slice(0, 6)));
  await browser.close(); server.close();
});
