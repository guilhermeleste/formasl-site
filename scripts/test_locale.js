'use strict';
// Test root entrypoint client-side language resolution without a browser.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '../public-src/site/index.html');
const source = fs.readFileSync(root, 'utf8');
const match = source.match(/<script>([\s\S]*?)<\/script>/);
if (!match) throw Error('Language detector script missing');
function redirect(languages, saved, href) {
  let selected = null;
  const storage = new Map();
  if (saved) storage.set('forma-site-language', saved);
  const loc = {href: href || 'https://example.test/index.html', hash: '', replace(value) {selected = value;}};
  vm.runInNewContext(match[1], {
    navigator: {languages,language: languages[0] || 'en'},
    localStorage: {getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key,value)},
    location:loc, URL
  });
  return {selected,stored:storage.get('forma-site-language')};
}
const checks = [
  [['pt-BR','en-US'], null, null, '/pt/index.html'],
  [['en-US'], null, null, '/en/index.html'],
  [['zh-Hans-CN','en-US'], null, null, '/zh-CN/index.html'],
  [['fr-FR'], null, null, '/en/index.html'],
  [['zh-CN'], 'pt', null, '/pt/index.html'],
  [['en-US'], 'pt', 'https://example.test/index.html?lang=zh-CN', '/zh-CN/index.html'],
];
for(const [languages,saved,url,suffix] of checks) {
  const got=redirect(languages,saved,url);
  if(!got.selected.endsWith(suffix)) throw Error(JSON.stringify({languages,saved,url,suffix,got}));
}
console.log(JSON.stringify({locale_cases:checks.length,status:'PASS'},null,2));
