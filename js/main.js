const CONTENT_FILES = {
  site: './content/site.json',
  nav: './content/nav.json',
  rooms: './content/rooms.json',
  entries: './content/entries.json',
  stats: './content/stats.json',
  contact: './content/contact.json'
};

const $ = (selector, root = document) => root.querySelector(selector);
const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');
const nl2br = (value = '') => escapeHtml(value).replaceAll('\n', '<br>');

async function loadJson(path) {
  const response = await fetch(path, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return response.json();
}

function artSvg(type) {
  const drawings = {
    tool: `<svg viewBox="0 0 160 120" aria-hidden="true"><path d="M20 72l118-40M40 22l68 82M24 36l112 62M80 12v96" stroke="#000" stroke-width="4" fill="none"/><circle cx="80" cy="60" r="20" fill="#fff" stroke="#000" stroke-width="4"/></svg>`,
    motion: `<svg viewBox="0 0 160 120" aria-hidden="true"><path d="M16 78c38-30 82-30 128 0v26c-46-30-90-30-128 0z" fill="none" stroke="#000" stroke-width="4"/><path d="M34 72v24M58 60v25M82 56v24M106 60v25M130 72v24" stroke="#000" stroke-width="2"/><circle cx="42" cy="42" r="24" fill="none" stroke="#000" stroke-width="4"/><rect x="24" y="42" width="36" height="44" fill="none" stroke="#000" stroke-width="3"/></svg>`,
    curio: `<svg viewBox="0 0 160 120" aria-hidden="true"><rect x="24" y="18" width="112" height="84" fill="none" stroke="#000" stroke-width="4"/><path d="M24 46h112M24 74h112M62 18v84M98 18v84" stroke="#000" stroke-width="2"/><circle cx="43" cy="32" r="8" fill="none" stroke="#000" stroke-width="2"/><path d="M76 60l10-10 10 10-10 10zM112 86c18-20 10-42-10-34" fill="none" stroke="#000" stroke-width="2"/></svg>`
  };
  return drawings[type] || drawings.curio;
}

function cabinetSvg() {
  return `<svg class="cabinet-svg" viewBox="0 0 760 460" role="img" aria-label="桌面和收藏柜线稿插画">
    <rect x="58" y="18" width="640" height="286" fill="none" stroke="#000" stroke-width="4"/>
    <path d="M58 86h640M58 154h640M58 222h640M184 18v286M318 18v286M462 18v286M594 18v286" fill="none" stroke="#000" stroke-width="2"/>
    <rect x="74" y="102" width="88" height="36" fill="none" stroke="#000" stroke-width="2"/><circle cx="92" cy="120" r="13" fill="none" stroke="#000" stroke-width="2"/><circle cx="133" cy="120" r="10" fill="none" stroke="#000" stroke-width="2"/>
    <circle cx="250" cy="118" r="38" fill="none" stroke="#000" stroke-width="2"/><path d="M214 118h72M250 80c26 27 26 50 0 76M250 80c-26 27-26 50 0 76" fill="none" stroke="#000" stroke-width="1.4"/>
    <g stroke="#000" stroke-width="2" fill="none"><path d="M344 42v44M370 38v48M396 46v40M422 34v52"/><path d="M334 86h98"/></g>
    <path d="M516 54c30-26 54-5 40 22-12 24-40 44-40 44s-30-29-38-52c-9-27 14-38 38-14z" fill="none" stroke="#000" stroke-width="2"/>
    <rect x="617" y="42" width="52" height="80" fill="none" stroke="#000" stroke-width="2"/><circle cx="643" cy="70" r="19" fill="none" stroke="#000" stroke-width="2"/><path d="M643 51v38M624 70h38" stroke="#000" stroke-width="1.4"/>
    <path d="M85 192h80M95 207h60M105 238h40" stroke="#000" stroke-width="2"/><rect x="214" y="178" width="62" height="82" fill="none" stroke="#000" stroke-width="2"/><path d="M224 194h42M224 212h42M224 230h42" stroke="#000" stroke-width="1.4"/>
    <rect x="356" y="182" width="74" height="58" fill="none" stroke="#000" stroke-width="2"/><path d="M356 206h74M380 182v58" stroke="#000" stroke-width="1.4"/>
    <rect x="492" y="174" width="70" height="70" fill="none" stroke="#000" stroke-width="2"/><path d="M506 232c18-46 34-46 44 0" fill="none" stroke="#000" stroke-width="1.6"/>
    <g><path d="M628 236c-11-38 5-64 28-74 22 18 24 44 10 74" fill="none" stroke="#000" stroke-width="2"/><path d="M656 162c-18 12-22 36-15 74M656 162c12 18 12 44 0 74" stroke="#000" stroke-width="1.2"/></g>
    <path d="M20 318h720l-48 108H68z" fill="none" stroke="#000" stroke-width="4"/><path d="M76 342h178M292 342h176M504 342h170M138 318v108M382 318v108M626 318v108" stroke="#000" stroke-width="2"/>
    <rect x="310" y="330" width="150" height="60" fill="none" stroke="#000" stroke-width="2"/><path d="M326 348h118M326 364h118M326 380h82" stroke="#000" stroke-width="1.3"/>
    <path d="M84 360l94-34 18 48-96 34z" fill="none" stroke="#000" stroke-width="2"/><path d="M528 390l58-52M566 340l16 18" stroke="#000" stroke-width="2"/><circle cx="506" cy="404" r="12" fill="none" stroke="#000" stroke-width="2"/>
  </svg>`;
}

function render({ site, nav, rooms, entries, stats, contact }) {
  document.documentElement.lang = site.lang || 'zh-CN';
  document.title = site.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = site.description || '';
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = site.ogTitle || site.title || '';
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = site.ogDescription || site.description || '';

  const navHtml = nav.map((item, index) => `<a href="${escapeHtml(item.href)}"${index === 0 ? ' class="active"' : ''}>${escapeHtml(item.label)}</a>`).join('');
  const sealLines = (site.sealLines || []).map(line => escapeHtml(line)).join('<br>');
  const railYear = (site.rail?.yearLines || []).map(line => escapeHtml(line)).join('<br>');
  const homeItems = (site.homePanel?.items || []).map(item => `<li><b>${escapeHtml(item.code)}</b><span>${escapeHtml(item.text)}</span></li>`).join('');
  const roomCards = rooms.map(room => `<article class="folio-card"><div class="ribbon mono">${escapeHtml(room.plate)}</div><div class="folio-art">${artSvg(room.art)}</div><div class="folio-text"><div class="roman">${escapeHtml(room.roman)}</div><div><h2>${escapeHtml(room.title)}<span>${escapeHtml(room.titleEn)}</span></h2></div><p>${escapeHtml(room.summary)}</p><a class="small-enter" href="#${escapeHtml(room.id)}" data-jump>ENTER →</a></div></article>`).join('');
  const roomSections = rooms.map(room => `<section class="room-section" id="${escapeHtml(room.id)}"><div class="room-label"><div class="no">${escapeHtml(room.roman)}</div><div class="txt">${escapeHtml(room.titleEn)}<br>${escapeHtml(room.title)}</div></div><div class="room-body"><h2>${escapeHtml(room.detailTitle)}</h2><p class="summary">${escapeHtml(room.detailSummary)}</p><div class="spec-grid">${(room.specs || []).map(spec => `<article class="spec"><div class="tag">${escapeHtml(spec.tag)}</div><h3>${escapeHtml(spec.title)}</h3><p>${escapeHtml(spec.text)}</p></article>`).join('')}</div><div class="jump-row">${(room.links || []).map(link => `<a class="outline-btn" href="${escapeHtml(link.href)}" data-jump>${escapeHtml(link.label)}</a>`).join('')}</div></div></section>`).join('');
  const entryHtml = entries.map(entry => `<div class="entry"><div class="num">${escapeHtml(entry.number)}</div><div class="topic">${escapeHtml(entry.title)}</div><div class="cat">${escapeHtml(entry.category)}</div><div class="date">${escapeHtml(entry.date)}</div></div>`).join('');
  const statHtml = (stats.items || []).map(item => `<div class="stat"><div class="ico">${escapeHtml(item.icon)}</div><div>${escapeHtml(item.label)}<span>${escapeHtml(item.labelEn)}</span></div><b>${escapeHtml(item.value)}</b></div>`).join('');
  const socialHtml = (contact.social || []).map(link => `<a href="${escapeHtml(link.href)}" data-jump>${escapeHtml(link.label)}</a>`).join(' / ');
  const footerLinks = (contact.footerLinks || []).map(link => `<a href="${escapeHtml(link.href)}"${link.href.startsWith('#') ? ' data-jump' : ''}>${escapeHtml(link.label)}</a>`).join(' / ');

  document.getElementById('app').innerHTML = `
    <div class="topbar"><div class="mark">${escapeHtml(site.brandMark)}</div><div class="center">${escapeHtml(site.topbarText)}</div><div class="right"><span>${escapeHtml(site.location)}</span><span class="sep">|</span><span>${escapeHtml(site.timezone)}</span><span class="sep">|</span><a href="#index">INDEX</a></div></div>
    <main class="wrap">
      <header class="mast"><div class="seal"><b>${sealLines}</b><span class="mono">${escapeHtml(site.sealCaption)}</span></div><div class="title-block"><div class="kicker">${escapeHtml(site.mastKicker)}</div><div class="site-title">${escapeHtml(site.siteTitle)}</div><div class="under-rule"></div><p class="mono">${escapeHtml(site.figureLabel)}</p></div><nav class="nav" aria-label="主导航">${navHtml}</nav></header>
      <section class="hero" id="home"><aside class="rail"><div class="mono">${nl2br(site.rail?.plate || '')}</div><div class="dots">${escapeHtml(site.rail?.dots || '')}</div><div class="year">${railYear}</div></aside><div class="hero-copy"><div class="mono plate">${escapeHtml(site.heroCabinet)}</div><h1><a class="hero-title-link" href="./archive-intro.html">${nl2br(site.heroTitle)}</a></h1><p class="deck">${escapeHtml(site.heroDeck)}</p><a class="enter" href="${escapeHtml(site.heroCta.href)}" data-jump>${escapeHtml(site.heroCta.label)}</a></div><figure class="illustration">${cabinetSvg()}<figcaption class="caption">${escapeHtml(site.illustrationCaption)}</figcaption></figure></section>
      <section class="about-panel" id="about"><div class="label-box"><div class="mono">${escapeHtml(site.homePanel.labelTop)}</div><div class="big">${(site.homePanel.bigLines || []).map(line => escapeHtml(line)).join('<br>')}</div><div class="mono">${escapeHtml(site.homePanel.labelBottom)}</div></div><div><h2 class="about-title">${escapeHtml(site.homePanel.title)}</h2><p>${escapeHtml(site.homePanel.body)}</p></div><div><ul class="about-list">${homeItems}</ul></div></section>
      <section class="modules" id="archive">${roomCards}</section>
      ${roomSections}
      <section class="lower" id="notes"><div class="entry-list"><div class="section-ribbon">编目<span>EDITORIAL LIST<br>—<br>FOLIO</span></div><div class="entries">${entryHtml}<a class="view-all" href="#notes" data-jump>VIEW ALL ENTRIES →</a></div></div><div class="stats" id="index"><div class="stats-head mono"><span>${escapeHtml(stats.heading)}</span><span>${escapeHtml(stats.cabinet)}</span></div>${statHtml}</div><aside class="note"><h3>${nl2br(stats.note?.title || '')}</h3><div class="mono">—</div><div class="leaf">${escapeHtml(stats.note?.symbol || '')}</div><p class="mono">${nl2br(stats.note?.geo || '')}</p></aside></section>
      <section class="contact-strip" id="contact"><div><h3>EMAIL</h3><p><a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a><br><span class="mono">用于项目合作、资料交换与网站内容更新。</span></p></div><div><h3>SOCIAL</h3><p>${socialHtml}<br><span class="mono">站内跳转已检查。</span></p></div><div><h3>STATUS</h3><p>${escapeHtml(contact.status)}<br><span class="mono">${escapeHtml(contact.statusEn)}</span></p></div></section>
      <footer class="footer"><div>${escapeHtml(site.footer.copyright)}</div><div>${escapeHtml(site.footer.rights)}</div><div>${escapeHtml(site.footer.built)}</div><div>${escapeHtml(site.footer.lastUpdate)}</div><div>${footerLinks}</div></footer>
    </main>`;

  wireInteractions();
}

function wireInteractions() {
  const navLinks = [...document.querySelectorAll('a[href^="#"]')];
  navLinks.forEach(a => a.addEventListener('click', () => {
    const id = a.getAttribute('href');
    if (id && id.length > 1 && document.querySelector(id)) setTimeout(() => history.replaceState(null, '', id), 0);
  }));
  const primaryNav = [...document.querySelectorAll('.nav a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        primaryNav.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  ['home', 'about', 'archive', 'notes', 'contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

async function init() {
  try {
    const [site, nav, rooms, entries, stats, contact] = await Promise.all([
      loadJson(CONTENT_FILES.site),
      loadJson(CONTENT_FILES.nav),
      loadJson(CONTENT_FILES.rooms),
      loadJson(CONTENT_FILES.entries),
      loadJson(CONTENT_FILES.stats),
      loadJson(CONTENT_FILES.contact)
    ]);
    render({ site, nav, rooms, entries, stats, contact });
  } catch (error) {
    console.error(error);
    document.getElementById('app').innerHTML = `<div class="error-state"><h1>内容加载失败</h1><p>请确认正在通过本地服务器或 GitHub Pages 访问，而不是直接双击 file:// 打开。推荐在项目根目录运行：<code>python3 -m http.server 8000</code>，然后访问 <code>http://127.0.0.1:8000/</code>。</p><p>错误信息：<code>${escapeHtml(error.message)}</code></p></div>`;
  }
}

init();
