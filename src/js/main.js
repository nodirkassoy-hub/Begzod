/* ============================================================
   BALANS AI — ENTRY POINT
   ============================================================ */

import { icon, brandMark } from './icons.js';
import { t, setLocale, locale, listeners } from './i18n/index.js';
import { createDeck } from './engine.js';
import { SLIDES } from './slides/index.js';

/* ---------- theme boot ---------- */
(function bootTheme() {
  let th = null;
  try { th = localStorage.getItem('balans.theme'); } catch (e) { /**/ }
  if (!th) th = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', th);
})();

(function bootLang() {
  document.documentElement.lang = locale();
})();

/* ---------- boot screen ---------- */
const boot = document.getElementById('boot');
function hideBoot() {
  boot.classList.add('is-done');
  setTimeout(() => boot.remove(), 600);
}

/* ---------- intro ---------- */
function buildIntro() {
  const intro = document.createElement('div');
  intro.className = 'intro';
  intro.id = 'intro';

  const inner = document.createElement('div');
  inner.className = 'intro__inner';

  inner.appendChild(div('intro__badge', `<i></i><span>${t('s01.label')}</span>`));

  const title = div('intro__title');
  title.innerHTML = `<span>${t('app.brand')}</span><em>${t('app.tagline')}</em>`;
  inner.appendChild(title);

  inner.appendChild(div('intro__sub', t('s01.sub')));

  const meta = div('intro__meta');
  ['Accounting', 'Sales', 'CRM', 'Warehouse', 'Purchasing', 'Manufacturing', 'HR', 'Documents', 'Analytics', 'AI CFO']
    .forEach((m) => meta.appendChild(div('chip chip--accent', m)));
  inner.appendChild(meta);

  const btn = document.createElement('button');
  btn.className = 'btn btn--primary';
  btn.style.height = '52px';
  btn.style.padding = '0 30px';
  btn.style.fontSize = '13px';
  btn.innerHTML = `${icon('play')}<span>${t('app.start')}</span>`;
  btn.addEventListener('click', (e) => { e.stopPropagation(); start(); });
  inner.appendChild(btn);

  inner.appendChild(div('intro__hint', t('app.startSub') + ' \u00b7 ' + t('app.keyboard')));

  intro.appendChild(inner);
  intro.addEventListener('click', () => start());
  document.getElementById('app').appendChild(intro);
  return intro;

  function div(cls, html) {
    const d = document.createElement('div');
    d.className = cls;
    if (html !== undefined) d.innerHTML = html;
    return d;
  }
}

let deck = null;
let introEl = null;
let started = false;

function start() {
  if (started) return;
  started = true;
  hideBoot();
  if (introEl) introEl.classList.add('is-hidden');
  if (deck) deck.go(0);
  document.body.classList.add('is-started');
}

/* ---------- build ---------- */
function build() {
  deck = createDeck(SLIDES);
  window.__deck = deck;
  deck.mount();

  introEl = buildIntro();

  /* language switch → full re-render of slides */
  listeners.add(() => {
    if (deck) deck.rerender();
    if (introEl && !started) {
      const fresh = buildIntro();
      introEl.replaceWith(fresh);
      introEl = fresh;
    }
    refreshLangButtons();
  });

  refreshLangButtons();
  setTimeout(hideBoot, 420);

  /* deep-link: #/start skips the intro */
  if (location.hash === '#start') start();

  /* first key press anywhere starts the deck */
  document.addEventListener('keydown', (e) => {
    if (started) return;
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter' || e.key === 'PageDown') {
      e.preventDefault();
      e.stopPropagation();
      start();
    }
  });
}

function refreshLangButtons() {
  document.querySelectorAll('.lang__btn').forEach((b) => {
    b.classList.toggle('is-active', b.dataset.lang === locale());
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
else build();
