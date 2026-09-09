/* Kydos — interacciones */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- Año ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Header que se achica al scrollear ---- */
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('is-stuck', window.scrollY > 16); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Menú móvil ---- */
  var toggle = document.getElementById('navToggle');
  var drawer = document.getElementById('drawer');
  var setDrawer = function (open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    drawer.classList.toggle('is-open', open);
    document.body.classList.toggle('is-locked', open);
  };
  toggle.addEventListener('click', function () {
    setDrawer(toggle.getAttribute('aria-expanded') !== 'true');
  });
  drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setDrawer(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setDrawer(false); toggle.focus(); }
  });

  /* ---- Scroll suave compensando el nav fijo ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var h = nav.getBoundingClientRect().height || 76;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - h + 2,
                        behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  /* ---- Fade suave al entrar en viewport ---- */
  var revealables = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduce) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        ro.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    revealables.forEach(function (el) { ro.observe(el); });
  }

  /* ---- Scrollspy ---- */
  var links = [].slice.call(document.querySelectorAll('.nav__link'));
  var sections = links.map(function (l) { return document.querySelector(l.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- Skeleton: la imagen aparece cuando terminó de cargar ---- */
  document.querySelectorAll('.media').forEach(function (box) {
    var img = box.querySelector('img');
    if (!img) return;
    var done = function () { img.classList.add('is-loaded'); box.classList.add('is-ready'); };
    if (img.complete && img.naturalWidth) done();
    else { img.addEventListener('load', done); img.addEventListener('error', done); }
  });

  /* ---- 3D: inclinación y brillo especular en las tarjetas ---- */
  if (finePointer && !reduce) {
    document.querySelectorAll('.card, .plan').forEach(function (card) {
      var raf = null;
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
        if (!raf) raf = requestAnimationFrame(function () {
          card.style.transform = 'perspective(900px) rotateX(' + ((py - .5) * -5).toFixed(2) +
                                 'deg) rotateY(' + ((px - .5) * 7).toFixed(2) + 'deg) translateY(-4px)';
          raf = null;
        });
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }
})();
