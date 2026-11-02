'use strict';
// mdBook 0.5.2 theme/search/structure QA against a locally served dist.
// Categories required by the work package: conceptual chapter, code-heavy
// language/authority chapter, extensive normative contract.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(process.argv[2] || 'dist');
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(root, p);
  try { if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html'); }
  catch { if (fs.existsSync(file + '.html')) file = file + '.html'; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('nf'); return; }
    res.writeHead(200, { 'content-type': file.endsWith('.css') ? 'text/css' : file.endsWith('.js') ? 'text/javascript' : 'text/html' });
    res.end(data);
  });
});

server.listen(0, '127.0.0.1', async () => {
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const PAGES = {
    conceptual_pt: '/docs/conceitos/02-modelo-de-mundo',
    conceptual_en: '/docs/en/conceitos-02-modelo-de-mundo',
    code_heavy: '/docs/autoridades/40-semantic-metagraph-formalization-contract',
    normative_contract: '/docs/contratos/01-autoridade-e-governanca',
  };
  const out = { pages: {} };
  for (const [name, url] of Object.entries(PAGES)) {
    await page.goto(base + url + '.html', { waitUntil: 'load' });
    out.pages[name] = await page.evaluate(() => ({
      path: location.pathname,
      lang: document.documentElement.lang,
      h1: document.querySelector('h1')?.textContent?.trim()?.slice(0, 60) || null,
      pre_blocks: document.querySelectorAll('pre').length,
      highlight_spans: document.querySelectorAll('pre code span').length,
      breadcrumb: !!document.querySelector('.forma-docs-breadcrumb'),
      brand_css: !![...document.styleSheets].find(s => (s.href || '').includes('forma-docs.css')),
      toc_script: !![...document.scripts].find(s => (s.src || '').includes('forma-docs-toc.js')),
      sidebar_links: document.querySelectorAll('#sidebar a, .sidebar a').length,
    }));
  }

  // Search flow (mdBook 0.5.2 ids discovered from live DOM)
  await page.goto(base + '/docs/conceitos/02-modelo-de-mundo.html', { waitUntil: 'load' });
  out.topbar_buttons = await page.evaluate(() =>
    [...document.querySelectorAll('button.icon-button')].map(b => ({ id: b.id, aria: b.getAttribute('aria-label') })));
  await page.click('#mdbook-search-toggle').catch(() => {});
  const sb = await page.$('#mdbook-searchbar');
  if (sb) {
    await sb.type('carrier', { delay: 40 });
    await page.waitForTimeout(1800);
    out.search = await page.evaluate(() => {
      const hosts = ['#mdbook-search-results', '#searchresults', '.search-results'];
      let list = [];
      for (const h of hosts) { const el = document.querySelector(h); if (el) { list = [...el.querySelectorAll('li, .result')]; break; } }
      const text = list.map(l => l.textContent.trim()).filter(Boolean);
      return { result_count: list.length, first: text[0]?.slice(0, 140) || null, visible: !!document.querySelector('#mdbook-searchbar:focus, .searchbar-inner:not([hidden])') || document.activeElement?.id === 'mdbook-searchbar' };
    });
  } else out.search = { error: 'no searchbar' };

  // Theme switch
  out.theme_before = await page.evaluate(() => localStorage.getItem('mdbook-theme'));
  const themeBtn = await page.$('#mdbook-theme-toggle');
  if (themeBtn) {
    await themeBtn.click();
    await page.waitForTimeout(200);
    out.theme_options = await page.evaluate(() =>
      [...document.querySelectorAll('#mdbook-theme-list li, #mdbook-theme-list button')].map(e => e.textContent.trim()));
    await page.evaluate(() => {
      const item = [...document.querySelectorAll('#mdbook-theme-list li, #mdbook-theme-list button')].find(e => /coal/i.test(e.textContent));
      if (item) item.click();
    });
    await page.waitForTimeout(300);
    out.theme_after = await page.evaluate(() => ({
      stored: localStorage.getItem('mdbook-theme'),
      html_class: document.documentElement.className,
      body_bg: getComputedStyle(document.body).backgroundColor,
    }));
  }

  // Sidebar toggle (mobile menu equivalent)
  const menuBtn = await page.$('#mdbook-menu-button, #sidebar-toggle, button[aria-label*="idebar" i]');
  if (menuBtn) {
    const before = await page.evaluate(() => document.documentElement.classList.contains('sidebar-visible'));
    await menuBtn.click();
    await page.waitForTimeout(200);
    const after = await page.evaluate(() => document.documentElement.classList.contains('sidebar-visible'));
    out.sidebar_toggle = { before, after, toggled: before !== after };
  }

  await browser.close();
  server.close();
  console.log(JSON.stringify(out, null, 1));
  const fail = [];
  for (const [k, v] of Object.entries(out.pages)) {
    if (!v.breadcrumb || !v.brand_css || !v.h1) fail.push(k + ': structure missing');
  }
  if (!out.search?.result_count) fail.push('search: no results');
  if (out.theme_after?.stored !== 'coal') fail.push('theme: coal not applied');
  if (out.sidebar_toggle && !out.sidebar_toggle.toggled) fail.push('sidebar: not toggled');
  process.exit(fail.length ? 1 : 0);
});
