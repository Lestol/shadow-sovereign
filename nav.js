// Site header for the player pages (published as nav.js by tools/pages.sh). Each page adds
// <script src="nav.js" defer></script>; the labels follow <html lang>, which every page sets when the language changes.
(function () {
  const LINKS = [
    ['index.html', 'Shadow Sovereign', 'Повелитель Теней'],
    ['skills.html', 'Skills', 'Навыки'],
    ['items.html', 'Items', 'Предметы'],
    ['bestiary.html', 'Bestiary', 'Бестиарий'],
    ['https://www.nexusmods.com/divinityoriginalsin2definitiveedition/mods/557', 'Nexus', 'Nexus'],
  ];
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const css = document.createElement('style');
  css.textContent = `.ssnav{display:flex;flex-wrap:wrap;align-items:center;gap:4px 18px;padding:12px 0;border-bottom:1px solid #3a2e4c;
    font-family:"Cinzel",Georgia,serif;font-size:14px;letter-spacing:.06em;max-width:1180px;margin:0 auto}
  .ssnav a{color:#a99cba;text-decoration:none;padding:4px 0;border-bottom:2px solid transparent}
  .ssnav a:hover{color:#e9e2f2}
  .ssnav a[aria-current="page"]{color:#d8b36a;border-bottom-color:#d8b36a}
  .ssnav a.home{color:#e9e2f2;font-weight:700;margin-right:auto}
  .ssnav a:focus-visible{outline:2px solid #b57dff;outline-offset:2px}
  @media (max-width:480px){.ssnav a.home{flex-basis:100%}}`;
  document.head.appendChild(css);
  const nav = document.createElement('nav');
  nav.className = 'ssnav';
  nav.setAttribute('aria-label', 'Site');
  document.body.prepend(nav);
  const draw = () => {
    const ru = document.documentElement.lang === 'ru';
    nav.innerHTML = LINKS.map(([href, en, rus], i) => {
      const ext = /^https?:/.test(href);
      return `<a href="${href}"${i === 0 ? ' class="home"' : ''}${href === here ? ' aria-current="page"' : ''}${ext ? ' target="_blank" rel="noopener"' : ''}>${ru ? rus : en}</a>`;
    }).join('');
  };
  draw();
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
