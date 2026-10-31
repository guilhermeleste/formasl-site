(() => {
  'use strict';
  const root = new URL(document.documentElement.dataset.siteRoot || '../', document.baseURI);
  const pagePath = document.documentElement.dataset.pagePath || 'index.html';
  const dataEl = document.getElementById('locale-dataset');
  let local = {};
  if (dataEl) { try { local = JSON.parse(dataEl.textContent); } catch (_) {} }
  const select = document.getElementById('language-select');
  if (select) select.addEventListener('change', () => {
    const choice = select.value;
    if (!['pt','en','zh-CN'].includes(choice)) return;
    try { localStorage.setItem('forma-site-language', choice); } catch (_) {}
    const next = new URL(choice + '/' + pagePath, root);
    next.hash = location.hash;
    window.location.assign(next.href);
  });
  const menu = document.getElementById('menu-button');
  const nav = document.getElementById('primary-nav');
  if (menu && nav) {
    function close() { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.textContent=local.menu||'Menu'; }
    menu.addEventListener('click', () => {const now=menu.getAttribute('aria-expanded') !== 'true';nav.classList.toggle('open',now);menu.setAttribute('aria-expanded',String(now));menu.textContent=now?(local.close||'Close'):(local.menu||'Menu');});
    document.addEventListener('keydown', ev=>{if(ev.key==='Escape')close();});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  }
  const progress = document.querySelector('.progress');
  if (progress) {
    let busy=false;
    function refresh(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?100*scrollY/max:0)+'%';busy=false;}
    window.addEventListener('scroll',()=>{if(!busy){busy=true;requestAnimationFrame(refresh);}}, {passive:true});
    window.addEventListener('resize',refresh);refresh();
  }
  document.querySelectorAll('[data-role-board]').forEach(board=>{
    const ids=['assignee','artifact','project','environment'];
    const detail=board.querySelector('[data-role-detail]');
    function pick(key){board.querySelectorAll('button[data-role]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.role===key)));
      board.querySelectorAll('line[data-role-line]').forEach(l=>l.classList.toggle('is-on',l.dataset.roleLine===key));
      const i=ids.indexOf(key);if(detail && i>=0)detail.textContent=local.fund?.roles?.[i+1] || '';
    }
    board.querySelectorAll('[data-role]').forEach(b=>b.addEventListener('click',()=>pick(b.dataset.role)));pick('project');
  });
  document.querySelectorAll('[data-world-demo]').forEach(box=>{
    const keys=['carrier','recipient','observer'];
    function pick(key){const i=keys.indexOf(key);if(i<0)return;const v=local.fund?.views?.[i];if(!v)return;
      box.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===key)));
      ['label','title','body','note'].forEach((f,j)=>{const el=box.querySelector('[data-world-'+f+']');if(el)el.textContent=v[j];});}
    box.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>pick(b.dataset.view)));pick('carrier');
  });
  document.querySelectorAll('[data-code-browser]').forEach(browser=>{
    const tabs=[...browser.querySelectorAll('[data-code-tab]')];const samples=[...browser.querySelectorAll('[data-code-sample]')];
    function pick(key,focus=false){tabs.forEach(b=>{const yes=b.dataset.codeTab===key;b.setAttribute('aria-selected',String(yes));b.tabIndex=yes?0:-1;if(yes&&focus)b.focus();});samples.forEach(s=>{s.hidden=s.dataset.codeSample!==key;});}
    tabs.forEach((b,i)=>{b.addEventListener('click',()=>pick(b.dataset.codeTab));b.addEventListener('keydown',ev=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(ev.key))return;ev.preventDefault();const n=tabs.length;let next=ev.key==='Home'?0:ev.key==='End'?n-1:(i+(ev.key==='ArrowRight'?1:-1)+n)%n;pick(tabs[next].dataset.codeTab,true);});});
    if(tabs[0])pick(tabs[0].dataset.codeTab);
  });
  document.querySelectorAll('[data-architecture]').forEach(board=>{
    const labels=local.arch?.compare||[];
    board.querySelectorAll('[data-arch-option]').forEach(b=>b.addEventListener('click',()=>{
      board.querySelectorAll('[data-arch-option]').forEach(n=>n.setAttribute('aria-pressed',String(n===b)));
      const output=board.querySelector('[data-arch-message]');if(output)output.textContent=labels[b.dataset.archOption==='a'?4:5]||'';
    }));
  });
  document.querySelectorAll('[data-ecosystem]').forEach(atlas=>{
    const keys=['formagraph','spatial','intelligence','formakv','forma-ui'];
    const texts={
      pt:[['FormaGraph Engine','Motor de grafos: caminhos, centralidade, comunidades e GNNs.','Grafo analítico e metagrafo não são idênticos.'],['Motor espacial Forma','Projeções em mapas, plantas e superfícies 3D com referência ao modelo.','As demonstrações 3D não equivalem a uma plataforma industrial completa.'],['Forma Intelligence','Pesquisa o treinamento de modelos fundacionais com dados e aplicações Forma.','Pesquisa em andamento; sem modelo fundacional concluído.'],['FormaKV','Motor de persistência chave-valor e recuperação.','Persistência física não estabelece autoridade semântica.'],['Forma UI','Framework reativo para interfaces e aplicações web.','Exibição e atualização não decidem a validade dos dados.']],
      en:[['FormaGraph Engine','Graph analytics: paths, centrality, communities and GNNs.','An analytical graph and a semantic metagraph are not identical.'],['Forma spatial engine','Maps, plans and 3D projections with references back to the model.','3D demonstrations do not establish a complete industrial platform.'],['Forma Intelligence','Research into foundation-model training using Forma data and applications.','Research stage; no completed foundation model is claimed.'],['FormaKV','Key-value persistence and recovery engine.','Physical storage does not establish semantic authority.'],['Forma UI','Reactive framework for web applications and interfaces.','Rendering does not determine data validity.']],
      'zh-CN':[['FormaGraph Engine','图分析：路径、中心性、社区与图神经网络。','分析图并不等同于语义元图。'],['Forma 空间引擎','将模型中的对象投影到地图、平面图和 3D 场景。','3D 演示不等同于完整工业级平台。'],['Forma Intelligence','研究利用 Forma 数据与应用训练基础模型。','仍处研究阶段，尚未宣称已完成基础模型。'],['FormaKV','键值持久化与恢复引擎。','物理存储不会赋予数据语义权威性。'],['Forma UI','用于 Web 应用的响应式界面框架。','显示数据不等于确立数据的有效性。']]
    };
    const current=document.documentElement.lang==='pt-BR'?'pt':document.documentElement.lang;
    function pick(key){const i=keys.indexOf(key);if(i<0)return;const v=texts[current]?.[i]||texts.en[i];atlas.querySelectorAll('[data-eco]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.eco===key)));
      ['title','body','small'].forEach((f,j)=>{const el=atlas.querySelector('[data-eco-'+f+']');if(el)el.textContent=v[j];});const cat=atlas.querySelector('[data-eco-category]');if(cat)cat.textContent=local.eco?.groups?.[i<3?0:i===3?1:4]||'';}
    atlas.querySelectorAll('[data-eco]').forEach(b=>b.addEventListener('click',()=>pick(b.dataset.eco)));pick('formagraph');
  });
  const side=[...document.querySelectorAll('.chapter-sidebar a[href^="#"]')];
  if(side.length&&'IntersectionObserver' in window){const targets=side.map(a=>document.getElementById(a.hash.slice(1))).filter(Boolean);
    const obs=new IntersectionObserver(entries=>{const shown=entries.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if(!shown.length)return;const hash='#'+shown[0].target.id;side.forEach(a=>{if(a.getAttribute('href')===hash)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});},{rootMargin:'-15% 0px -65% 0px'});targets.forEach(el=>obs.observe(el));}
})();