/* Forma mdBook page contents: decorative layout enhancement, zero semantic authority.
 * Uses the headings already emitted by mdBook. No network or third-party code.
 */
(function () {
  'use strict';
  function boot() {
    var main = document.querySelector('#content main') || document.querySelector('.content main');
    if (!main || document.getElementById('forma-docs-toc')) return;
    var headings = Array.from(main.querySelectorAll('h2[id],h3[id]'));
    if (headings.length < 2) return;
    var lang = document.documentElement.getAttribute('lang') || 'en';
    var title = lang.indexOf('pt') === 0 ? 'Nesta pagina' : 'On this page';
    var aside = document.createElement('aside');
    aside.id = 'forma-docs-toc';
    aside.setAttribute('aria-label', title);
    var heading = document.createElement('strong');
    heading.textContent = title;
    aside.appendChild(heading);
    var list = document.createElement('ul');
    var mobile = document.createElement('details');
    mobile.className = 'forma-docs-toc-mobile';
    var summary = document.createElement('summary');
    summary.textContent = title;
    mobile.appendChild(summary);
    var mobileList = document.createElement('ul');
    headings.forEach(function (section) {
      function addLink(container) {
        var li = document.createElement('li');
        if (section.tagName === 'H3') li.className = 'forma-docs-toc-nested';
        var a = document.createElement('a');
        a.href = '#' + encodeURIComponent(section.id);
        a.textContent = section.textContent.trim();
        li.appendChild(a);
        container.appendChild(li);
      }
      addLink(list);
      addLink(mobileList);
    });
    aside.appendChild(list);
    mobile.appendChild(mobileList);
    var breadcrumb = main.querySelector('.forma-docs-breadcrumb');
    if (breadcrumb) breadcrumb.insertAdjacentElement('afterend', mobile);
    else main.insertAdjacentElement('afterbegin', mobile);
    document.body.appendChild(aside);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}());
