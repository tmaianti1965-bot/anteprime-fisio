/* Template 04 Elegante — interazioni base, IIFE indipendenti */

/* Menu mobile */
(function () {
  var burger = document.getElementById('hamburger');
  var nav = document.getElementById('mainNav');
  if (!burger || !nav) return;
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* Anno corrente nel footer */
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* Cookie banner (scelta salvata in localStorage) */
(function () {
  var banner = document.getElementById('cookieBanner');
  if (!banner) return;
  var KEY = 'cookie-consent-martina';
  if (!localStorage.getItem(KEY)) banner.hidden = false;
  banner.addEventListener('click', function (e) {
    var choice = e.target.getAttribute('data-cookie');
    if (!choice) return;
    localStorage.setItem(KEY, choice);
    banner.hidden = true;
  });
})();

/* Rivelazione elementi allo scroll (fade-up) */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  var sel = '.section-head, .method, .service, .home-visit, .about-media, .about-copy, .review, .info-card, .dove-info, .dove-map, .trust-row';
  var els = Array.prototype.slice.call(document.querySelectorAll(sel));
  if (!els.length) return;
  els.forEach(function (el) {
    el.classList.add('reveal');
    var parent = el.parentElement;
    var idx = parent ? Array.prototype.indexOf.call(parent.children, el) : 0;
    el.style.transitionDelay = Math.min(idx, 5) * 55 + 'ms';
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
