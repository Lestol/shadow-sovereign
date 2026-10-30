// Site header for the player pages (published as nav.js by tools/pages.sh). Each page adds
// <script src="nav.js" defer></script>; the labels follow <html lang>, which every page sets when the language changes.
// Up to 640px wide the links fold into a menu button (☰) that slides a panel down under the header.
(function () {
  const LINKS = [
    ['index.html', 'Shadow Sovereign', 'Повелитель Теней'],
    ['guide.html', 'Guide', 'Гайд'],
    ['skills.html', 'Skills', 'Навыки'],
    ['items.html', 'Items', 'Предметы'],
    ['bestiary.html', 'Bestiary', 'Бестиарий'],
    ['changelog.html', 'Changelog', 'Версии'],
    ['https://www.nexusmods.com/divinityoriginalsin2definitiveedition/mods/557', 'Nexus', 'Nexus'],
  ];
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const css = document.createElement('style');
  css.textContent = `.ssnav{position:relative;z-index:50;display:flex;flex-wrap:wrap;align-items:center;gap:4px 18px;padding:12px 0;border-bottom:1px solid #3a2e4c;
    font-family:"Alegreya Sans","Segoe UI",system-ui,sans-serif;font-size:15px;font-weight:500;letter-spacing:.08em;max-width:1180px;margin:0 auto}
  .ssnav a{color:#a99cba;text-decoration:none;padding:4px 0;border-bottom:2px solid transparent}
  .ssnav a:hover{color:#e9e2f2}
  .ssnav a[aria-current="page"]{color:#d8b36a;border-bottom-color:#d8b36a}
  .ssnav a.home{color:#e9e2f2;font-family:"Cinzel","Cormorant SC",Georgia,serif;font-weight:700;margin-right:auto}
  .ssnav a:focus-visible,.ssnav button:focus-visible{outline:2px solid #b57dff;outline-offset:2px}
  .ssnav .links{display:flex;flex-wrap:wrap;gap:4px 18px}
  .ssnav .burger{display:none;font:inherit;font-size:22px;line-height:1;color:#e9e2f2;background:#1b1525;border:1px solid #3a2e4c;border-radius:6px;
    width:44px;height:44px;cursor:pointer;padding:0}
  @media (max-width:640px){
    .ssnav{flex-wrap:nowrap;padding:6px 0}
    .ssnav a.home{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .ssnav .burger{display:block;flex:none}
    .ssnav .links{position:absolute;left:0;right:0;top:calc(100% + 1px);flex-direction:column;flex-wrap:nowrap;gap:0;padding:6px 0;
      background:#120e19;border:1px solid #3a2e4c;border-radius:0 0 8px 8px;box-shadow:0 14px 30px rgba(0,0,0,.6);
      opacity:0;transform:translateY(-10px);visibility:hidden;pointer-events:none;transition:opacity .2s ease,transform .2s ease,visibility 0s linear .2s}
    .ssnav.open .links{opacity:1;transform:none;visibility:visible;pointer-events:auto;transition:opacity .2s ease,transform .2s ease,visibility 0s}
    .ssnav .links a{display:flex;align-items:center;min-height:48px;padding:0 18px;font-size:17px;border-bottom:0;border-left:3px solid transparent}
    .ssnav .links a[aria-current="page"]{border-left-color:#d8b36a;background:#1b1525}
  }
  @media (prefers-reduced-motion:reduce){.ssnav .links,.ssnav.open .links{transition:none;transform:none}}`;
  document.head.appendChild(css);
  const nav = document.createElement('nav');
  nav.className = 'ssnav';
  nav.setAttribute('aria-label', 'Site');
  document.body.prepend(nav);
  let open = false;
  const link = ([href, en, rus], ru, home) => {
    const ext = /^https?:/.test(href);
    return `<a href="${href}"${home ? ' class="home"' : ''}${href === here ? ' aria-current="page"' : ''}${ext ? ' target="_blank" rel="noopener"' : ''}>${ru ? rus : en}</a>`;
  };
  const draw = () => {
    const ru = document.documentElement.lang === 'ru';
    nav.classList.toggle('open', open);
    nav.innerHTML = link(LINKS[0], ru, true) +
      `<button class="burger" type="button" aria-controls="ssnav-links" aria-expanded="${open}" aria-label="${ru ? 'Меню' : 'Menu'}">${open ? '✕' : '☰'}</button>` +
      `<div class="links" id="ssnav-links">${LINKS.slice(1).map((l) => link(l, ru)).join('')}</div>`;
  };
  // open/close in place (no redraw: a tapped link must stay in the page to navigate)
  const set = (v, focus) => {
    if (open === v) return;
    open = v;
    nav.classList.toggle('open', open);
    const b = nav.querySelector('.burger');
    b.setAttribute('aria-expanded', open);
    b.textContent = open ? '✕' : '☰';
    if (focus) b.focus();
  };
  nav.addEventListener('click', (e) => {
    if (e.target.closest('.burger')) set(!open, true);
    else if (e.target.closest('.links a')) set(false);
  });
  document.addEventListener('click', (e) => { if (open && !nav.contains(e.target)) set(false); });
  document.addEventListener('keydown', (e) => { if (open && e.key === 'Escape') set(false, true); });
  matchMedia('(min-width:641px)').addEventListener('change', (m) => { if (m.matches) set(false); });
  draw();
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
