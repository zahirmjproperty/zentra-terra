/* ============================================================
   Mr Tanah × TERRA Residences — renderer + dwibahasa (BM/EN)
   Semua teks datang dari data/project.js. Fail ini tidak menyimpan fakta.
   ============================================================ */
(function () {
  'use strict';
  var D = window.TERRA;
  if (!D) return;

  /* ---------- Bahasa ---------- */
  var LS = 'terra-lang';
  function pickLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'en' || q === 'bm') return q;
    try { var s = localStorage.getItem(LS); if (s === 'en' || s === 'bm') return s; } catch (e) {}
    return 'bm';
  }
  var lang = pickLang();
  var T = function (k) { return (D.i18n[lang] && D.i18n[lang][k]) || (D.i18n.en[k] || ''); };
  var tourUrl = function (id) { return D.tourBase + encodeURIComponent(id); };
  var tourById = function (id) { return D.tours.filter(function (t) { return t.id === id; })[0]; };

  /* ---------- Ganti teks statik ---------- */
  function applyStatic() {
    document.documentElement.lang = T('htmlLang');
    var page = document.body.getAttribute('data-page') || 'home';
    document.title = page === 'project' ? T('dTitle') : T('title');
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', T('metaDesc'));
    var og = document.querySelector('meta[property="og:locale"]');
    if (og) og.setAttribute('content', lang === 'bm' ? 'ms_MY' : 'en_MY');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = T(el.getAttribute('data-i18n'));
      if (v) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.setAttribute('placeholder', T(el.getAttribute('data-i18n-ph')));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', T(el.getAttribute('data-i18n-aria')));
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-lang') === lang);
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
  }

  /* ---------- Hubungi / WhatsApp ---------- */
  function wireContact() {
    var digits = (D.contact.whatsapp || '').replace(/\D/g, '');
    var msg = lang === 'bm'
      ? 'Hi Mr Tanah, saya berminat dengan TERRA Residences oleh PJH. Boleh kongsi unit tersedia, harga semasa dan butiran lawatan?'
      : 'Hi Mr Tanah, I am interested in TERRA Residences by PJH. Please share available units, current pricing and viewing details.';
    document.querySelectorAll('.contact').forEach(function (a) {
      if (digits) {
        a.href = 'https://wa.me/' + digits + '?text=' + encodeURIComponent(msg);
      } else {
        a.href = D.contact.fallbackUrl;
      }
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
    document.querySelectorAll('.contact-display').forEach(function (el) {
      el.textContent = D.contact.whatsappDisplay;
    });
  }

  /* ---------- Halaman utama: kad VR ---------- */
  function renderTours() {
    var box = document.querySelector('#tour-cards');
    if (!box) return;
    box.innerHTML = '';
    D.tours.forEach(function (t) {
      var c = t[lang] || t.en;
      var card = document.createElement('article');
      card.className = 'tour-card reveal';
      card.innerHTML =
        '<img src="' + t.img + '" alt="' + c.label + '" loading="lazy" width="1600" height="1000">' +
        '<div class="card-copy">' +
          '<span class="eyebrow">' + T('vrCredit').replace(/\.$/, '') + '</span>' +
          '<h3></h3>' +
          '<p></p>' +
          '<a class="btn ghost-dark" data-tour="' + t.id + '" href="' + tourUrl(t.id) + '" target="_blank" rel="noopener noreferrer"></a>' +
        '</div>';
      card.querySelector('h3').textContent = c.label;
      card.querySelector('p').textContent = c.desc;
      card.querySelector('[data-tour]').textContent = T('vrCardBtn');
      box.appendChild(card);
    });
  }

  /* ---------- Halaman utama: statistik fakta ---------- */
  function renderStats() {
    var box = document.querySelector('#stats');
    if (!box) return;
    var keys = { loc: 'statLoc', type: 'statType', range: 'statRange' };
    box.innerHTML = '';
    D.facts.filter(function (f) { return keys[f.k]; }).forEach(function (f) {
      var d = document.createElement('div');
      var b = document.createElement('b');
      b.textContent = f.v[lang] || f.v.en;
      d.appendChild(b);
      d.appendChild(document.createTextNode(T(keys[f.k])));
      box.appendChild(d);
    });
  }

  /* ---------- Halaman butiran: fakta ---------- */
  function renderFacts() {
    var box = document.querySelector('#facts');
    if (!box) return;
    var labels = { loc: 'factLoc', type: 'factType', range: 'factRange', tenure: 'factTenure', setting: 'factSetting' };
    box.innerHTML = '';
    D.facts.forEach(function (f) {
      var d = document.createElement('div');
      var dt = document.createElement('dt'); dt.textContent = T(labels[f.k] || f.k);
      var dd = document.createElement('dd'); dd.textContent = f.v[lang] || f.v.en;
      d.appendChild(dt); d.appendChild(dd); box.appendChild(d);
    });
  }

  /* ---------- Halaman butiran: pelan ---------- */
  function renderLayouts() {
    var box = document.querySelector('#layout-grid');
    if (!box) return;
    var btnKey = { 'terra-a2-main': 'layoutMain360', 'terra-a2-dual': 'layoutDual360', 'terra-b1': 'layoutB1_360', 'terra-c': 'layoutC360' };
    box.innerHTML = '';
    D.layouts.forEach(function (L) {
      var card = document.createElement('article');
      card.className = 'layout-card reveal';
      var descKey = { 'Type A2': 'layoutA2Desc', 'Type B1': 'layoutB1Desc', 'Type C': 'layoutCDesc' }[L.name] || 'layoutA2Desc';
      var desc = T(descKey);
      var btns = L.tours.map(function (id) {
        var t = tourById(id); var c = t ? (t[lang] || t.en) : { label: id };
        return '<a class="btn" href="' + tourUrl(id) + '" target="_blank" rel="noopener noreferrer">' +
          (btnKey[id] ? T(btnKey[id]) : c.label) + ' ↗</a>';
      }).join('');
      card.innerHTML =
        '<div class="plan"><img src="' + L.plan + '" alt="" loading="lazy" data-plan></div>' +
        '<div class="layout-body"><h3></h3><p></p><div class="layout-actions">' + btns + '</div></div>';
      card.querySelector('h3').textContent = L.name;
      card.querySelector('p').textContent = desc;
      var img = card.querySelector('[data-plan]');
      img.alt = T('planAlt').replace('{name}', L.name.replace('Type ', ''));
      img.addEventListener('click', function () { openPlan(L.plan, img.alt); });
      box.appendChild(card);
    });
  }

  /* ---------- Halaman butiran: FAQ ---------- */
  function renderFaq() {
    var box = document.querySelector('#faq-list');
    if (!box) return;
    box.innerHTML = '';
    [1, 2, 3, 4].forEach(function (n) {
      var d = document.createElement('details');
      var s = document.createElement('summary'); s.textContent = T('faqQ' + n);
      var p = document.createElement('p'); p.textContent = T('faqA' + n);
      d.appendChild(s); d.appendChild(p); box.appendChild(d);
    });
  }

  /* ---------- Dialog lawatan ---------- */
  var dialog = document.querySelector('#tour-dialog');
  var frame = dialog ? dialog.querySelector('.frame') : null;
  var opener = null;

  function selectTour(id) {
    var t = tourById(id); if (!t) return;
    var c = t[lang] || t.en;
    var title = document.querySelector('#tour-title'); if (title) title.textContent = c.label;
    if (frame) {
      var ifr = document.createElement('iframe');
      ifr.title = c.label;
      ifr.src = tourUrl(id);
      ifr.allow = 'fullscreen; gyroscope; accelerometer; xr-spatial-tracking';
      ifr.allowFullscreen = true;
      ifr.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.replaceChildren(ifr);
    }
    var ext = document.querySelector('#tour-external');
    if (ext) ext.href = tourUrl(id);
    document.querySelectorAll('.tour-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.id === id));
    });
  }

  function buildSwitcher() {
    var sw = dialog ? dialog.querySelector('.tour-switch') : null;
    if (!sw) return;
    sw.innerHTML = '';
    D.tours.forEach(function (t) {
      var c = t[lang] || t.en;
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = c.label; b.dataset.id = t.id;
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () { selectTour(t.id); });
      sw.appendChild(b);
    });
  }

  function wireDialog() {
    if (!dialog) return;
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-tour]');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (typeof dialog.showModal !== 'function') return;
      e.preventDefault();
      opener = a;
      selectTour(a.dataset.tour);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
    var cl = dialog.querySelector('.close');
    if (cl) cl.addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('close', function () {
      if (frame) frame.replaceChildren();
      document.body.style.overflow = '';
      if (opener && opener.focus) opener.focus();
    });
  }

  /* ---------- Lightbox pelan ---------- */
  var planDialog = document.querySelector('#plan-dialog');
  function openPlan(src, alt) {
    if (!planDialog || typeof planDialog.showModal !== 'function') { window.open(src, '_blank'); return; }
    var img = planDialog.querySelector('img');
    img.src = src; img.alt = alt || '';
    planDialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  function wirePlanDialog() {
    if (!planDialog) return;
    var cl = planDialog.querySelector('.close');
    if (cl) cl.addEventListener('click', function () { planDialog.close(); });
    planDialog.addEventListener('close', function () { document.body.style.overflow = ''; });
    planDialog.addEventListener('click', function (e) { if (e.target === planDialog) planDialog.close(); });
  }

  /* ---------- Header, menu, reveal ---------- */
  function wireChrome() {
    var header = document.querySelector('.header');
    if (header) {
      var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
    var mb = document.querySelector('.menu-btn'), nav = document.querySelector('.header nav');
    if (mb && nav) mb.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      mb.setAttribute('aria-expanded', String(open));
    });
    nav && nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); mb && mb.setAttribute('aria-expanded', 'false'); }
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .06 });
      document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---------- Tukar bahasa ---------- */
  function wireLang() {
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        var next = b.getAttribute('data-lang');
        if (next === lang) return;
        lang = next;
        try { localStorage.setItem(LS, lang); } catch (e) {}
        var u = new URL(location.href);
        u.searchParams.set('lang', lang);
        history.replaceState(null, '', u);
        renderAll();
      });
    });
  }

  function renderAll() {
    applyStatic();
    renderTours();
    renderStats();
    renderFacts();
    renderLayouts();
    renderFaq();
    buildSwitcher();
    wireContact();
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderAll();
    wireDialog();
    wirePlanDialog();
    wireChrome();
    wireLang();
  });
})();
