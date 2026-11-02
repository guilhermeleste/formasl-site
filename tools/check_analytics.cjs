'use strict';
// Real-browser regression for zone-injected analytics. No mocked collectors or
// raw beacon payloads/tokens in evidence. Run only against an authorized origin.
const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('node:util');
const { chromium } = require('playwright');

const { values } = parseArgs({ options: {
  'base-url': { type: 'string' },
  path: { type: 'string', multiple: true },
  out: { type: 'string' },
  mobile: { type: 'boolean', default: false },
} });
if (!values['base-url']) throw new Error('--base-url is required');
const base = new URL(values['base-url']);
const paths = values.path || ['/pt/', '/en/', '/zh-CN/', '/docs/pt/', '/docs/en/', '/docs/zh-CN/',
  '/docs/conceitos/02-modelo-de-mundo', '/docs/en/conceitos-02-modelo-de-mundo'];
const isCollector = url => new URL(url).pathname === '/cdn-cgi/rum';
const safeUrl = url => { const u = new URL(url); return u.origin + u.pathname; };

(async () => {
  const started = new Date().toISOString();
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const results = [];
  try {
    for (const route of paths) {
      const context = await browser.newContext(values.mobile
        ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }
        : { viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      const beacons = [], networkErrors = [], consoleErrors = [], requests = new Map();
      const cdp = await context.newCDPSession(page);
      await cdp.send('Network.enable');
      cdp.on('Network.requestWillBeSent', e => requests.set(e.requestId, e.request.url));
      cdp.on('Network.loadingFailed', e => {
        const url = requests.get(e.requestId);
        if (url && isCollector(url)) networkErrors.push({ url: safeUrl(url), error: e.errorText,
          cors: e.corsErrorStatus || null, blocked: e.blockedReason || null });
      });
      const byRequest = new Map();
      page.on('request', request => {
        if (request.method() !== 'POST' || !isCollector(request.url())) return;
        let body = {};
        try { body = request.postDataJSON() || {}; } catch { /* non-JSON fails the event-type check */ }
        const record = { url: safeUrl(request.url()), event_type: body.eventType ?? null,
          page_path: typeof body.location === 'string' ? new URL(body.location).pathname : null,
          status: null, failure: null };
        byRequest.set(request, record); beacons.push(record);
      });
      page.on('response', response => {
        const record = byRequest.get(response.request());
        if (record) record.status = response.status();
      });
      page.on('requestfailed', request => {
        const record = byRequest.get(request);
        if (record) record.failure = request.failure()?.errorText || 'requestfailed';
      });
      page.on('console', message => {
        if (message.type() === 'error' && /cloudflareinsights|cdn-cgi\/rum|CORS/.test(message.text()))
          consoleErrors.push(message.text().slice(0, 300));
      });
      let status = null, navigationError = null, scripts = [];
      try {
        const response = await page.goto(new URL(route, base).href, { waitUntil: 'load', timeout: 45000 });
        status = response?.status() ?? null;
        const deadline = Date.now() + 15000;
        while (Date.now() < deadline && !beacons.some(b => b.status !== null || b.failure))
          await page.waitForTimeout(100);
        await page.waitForTimeout(750);
        scripts = await page.locator('script[src*="cloudflareinsights.com/beacon"]').evaluateAll(nodes =>
          nodes.map(el => ({ src: el.src.split('?')[0], type: el.type || 'classic' })));
      } catch (error) { navigationError = String(error).slice(0, 300); }
      const pagePath = new URL(page.url()).pathname;
      const checks = {
        page_200: status === 200 && !navigationError,
        single_initializer: scripts.length === 1,
        accepted_pageload: beacons.filter(b => b.event_type === 1 && b.page_path === pagePath &&
          b.status === 204 && new URL(b.url).origin === base.origin && !b.failure).length === 1,
        no_failed_collectors: beacons.length > 0 && beacons.every(b =>
          b.status === 204 && !b.failure && new URL(b.url).origin === base.origin),
        no_cors_errors: networkErrors.length === 0 && consoleErrors.length === 0,
      };
      results.push({ route, final_path: pagePath, status, navigation_error: navigationError,
        scripts, beacons: structuredClone(beacons), network_errors: networkErrors,
        console_errors: consoleErrors, checks, ok: Object.values(checks).every(Boolean) });
      await context.close();
    }
  } finally { await browser.close(); }
  const report = { started_utc: started, ended_utc: new Date().toISOString(), base_url: base.origin,
    automated_qa_not_audience: true, mobile_emulated: values.mobile,
    cases: results.length, passed: results.filter(r => r.ok).length, results };
  if (values.out) {
    fs.mkdirSync(path.dirname(path.resolve(values.out)), { recursive: true });
    fs.writeFileSync(values.out, JSON.stringify(report, null, 2) + '\n');
  }
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = results.every(r => r.ok) ? 0 : 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
