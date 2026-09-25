/* ============================================================
   BALANS AI — PRESENTATION ENGINE
   Navigation · keyboard · swipe · fullscreen · overview ·
   progress · rail · theme · locale-aware re-render
   ============================================================ */

import { icon } from './icons.js';
import { t, setLocale, locale } from './i18n/index.js';

const mqMobile = window.matchMedia('(max-width: 900px)');
const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- micro hyperscript (local to the engine) ---------- */
function h(spec, attrs, children) {
  let tag = 'div';
  const cls = [];
  const m = String(spec).match(/^[a-zA-Z0-9]+/);
  if (m) tag = m[0];
  (String(spec).match(/\.[^.#]+/g) || []).forEach((c) => cls.push(c.slice(1)));
  const node = document.createElement(tag);
  if (cls.length) node.className = cls.join(' ');
  if (attrs) {
    for (const k of Object.keys(attrs)) {
      const v = attrs[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') node.className += (node.className ? ' ' : '') + v;
      else if (k === 'html') {
        if (v instanceof Node) node.appendChild(v);
        else node.innerHTML = v;
      }
      else if (k === 'text') node.textContent = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
      else if (k === 'dataset' && typeof v === 'object') Object.assign(node.dataset, v);
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
      else node.setAttribute(k, v === true ? '' : v);
    }
  }
  ap(node, children);
  return node;
}
function ap(p, c) {
  if (c === null || c === undefined || c === false) return p;
  if (Array.isArray(c)) { c.forEach((x) => ap(p, x)); return p; }
  if (c instanceof Node) p.appendChild(c); else p.appendChild(document.createTextNode(String(c)));
  return p;
}

function brandMarkSvg() {
  return `<svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
    <path d="M15 32.5 24 14l9 18.5" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>
    <path d="M19.4 27.6h9.2" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".8"/>
  </svg>`;
}

export function createDeck(slides) {
  const state = { i: 0, slides, nodes: [], scale: 1, mobile: mqMobile.matches, overview: false };

  const app = document.getElementById('app');
  const deck = h('div.deck');

  /* ---------------- top bar ---------------- */
  const topbar = h('div.topbar');
  const brand = h('div.brand');
  brand.innerHTML = `<div class="brand__mark">${brandMarkSvg()}</div><div class="brand__name">BALANS<i> AI</i></div>`;
  brand.appendChild(h('div.brand__tag', { text: 'AI-POWERED BUSINESS OS' }));
  topbar.appendChild(brand);

  const sectionsHost = h('div.sections');
  topbar.appendChild(sectionsHost);
  topbar.appendChild(h('div.topbar__spacer'));

  const tools = h('div.tools');
  const lang = h('div.lang');
  ['uz', 'ru', 'en'].forEach((c) => {
    lang.appendChild(h(`button.lang__btn${c === locale() ? '.is-active' : ''}`, {
      type: 'button', text: c.toUpperCase(), dataset: { lang: c },
      onclick: () => setLocale(c),
    }));
  });
  tools.appendChild(lang);
  tools.appendChild(toolBtn('grid', t('app.overview'), () => toggleOverview(true)));
  tools.appendChild(toolBtn('max', t('app.fullscreen'), () => toggleFullscreen()));
  const themeBtn = toolBtn('moon', t('app.theme'), () => toggleTheme());
  themeBtn.dataset.role = 'theme';
  tools.appendChild(themeBtn);
  topbar.appendChild(tools);

  /* ---------------- viewport + stage ---------------- */
  const viewport = h('div.deck__viewport');
  const stage = h('div.deck__stage');
  viewport.appendChild(stage);
  deck.append(topbar, viewport);

  const rail = h('div.rail');

  /* ---------------- bottom bar ---------------- */
  const bottom = h('div.bottombar');
  const prev = h('button.navbtn', { html: icon('chevL'), title: t('app.prev'), 'aria-label': t('app.prev'), onclick: () => go(state.i - 1) });
  const nextB = h('button.navbtn', { html: icon('chevR'), title: t('app.next'), 'aria-label': t('app.next'), onclick: () => go(state.i + 1) });
  const counter = h('div.counter');
  const name = h('div.slide-name');
  const prog = h('div.progress', null, [h('div.progress__fill'), h('div.progress__ticks')]);
  bottom.append(prev, counter, prog, name, nextB);

  app.append(deck, rail, bottom);

  function toolBtn(ic, title, fn) {
    return h('button.tool', { html: icon(ic), title, 'aria-label': title, onclick: fn });
  }

  /* ---------------- slides ---------------- */
  function buildSlides() {
    stage.innerHTML = '';
    rail.innerHTML = '';
    state.nodes = slides.map((s, idx) => {
      const node = h(`section.slide.slide--${s.id}`, { dataset: { index: idx, section: s.section } });
      const content = s.render();
      node.appendChild(content);
      if (content) {
        for (const k of Object.keys(content)) {
          if (k.startsWith('_') && typeof content[k] === 'function') node[k] = content[k];
        }
      }
      stage.appendChild(node);
      rail.appendChild(h('button.rail__dot', {
        dataset: { index: idx, label: s.label() },
        'aria-label': s.label(), title: s.label(), onclick: () => go(idx),
      }));
      return node;
    });
  }

  function buildSections() {
    sectionsHost.innerHTML = '';
    const secs = [];
    slides.forEach((s, i) => {
      let cur = secs[secs.length - 1];
      if (!cur || cur.id !== s.section) { cur = { id: s.section, label: s.sectionLabel(), first: i }; secs.push(cur); }
    });
    secs.forEach((sec) => {
      sectionsHost.appendChild(h('button.sections__btn', {
        type: 'button', text: sec.label, dataset: { section: sec.id, index: sec.first },
        onclick: () => go(sec.first),
      }));
    });
  }

  /* ---------------- navigation ---------------- */
  function go(i, silent) {
    const idx = Math.max(0, Math.min(slides.length - 1, i));
    state.i = idx;
    applyState();
    if (!silent) history.replaceState(null, '', `#${idx + 1}`);
    const s = slides[idx];
    if (s && s.onEnter) s.onEnter();
  }

  function applyState() {
    state.nodes.forEach((n, i) => {
      n.classList.toggle('is-active', i === state.i);
      n.classList.toggle('is-past', i < state.i);
      n.setAttribute('aria-hidden', i === state.i ? 'false' : 'true');
    });
    rail.querySelectorAll('.rail__dot').forEach((d, i) => d.classList.toggle('is-active', i === state.i));
    const cur = slides[state.i];
    if (!cur) return;
    sectionsHost.querySelectorAll('.sections__btn').forEach((b) => {
      b.classList.toggle('is-current', b.dataset.section === cur.section);
    });
    counter.innerHTML = `<b>${String(state.i + 1).padStart(2, '0')}</b><span>/ ${String(slides.length).padStart(2, '0')}</span>`;
    name.textContent = cur.label();
    prog.firstElementChild.style.width = `${((state.i + 1) / slides.length) * 100}%`;
    prev.disabled = state.i === 0;
    nextB.disabled = state.i === slides.length - 1;
    document.title = `${cur.label()} \u2014 BALANS AI`;
    fit();
  }

  function fit() {
    if (state.mobile) { stage.style.transform = ''; return; }
    const s = Math.min((viewport.clientWidth - 8) / 1600, (viewport.clientHeight - 8) / 900);
    state.scale = Math.max(0.34, s);
    stage.style.transform = `scale(${state.scale})`;
  }

  function toggleFullscreen() {
    const d = document;
    if (!d.fullscreenElement) {
      const r = d.documentElement.requestFullscreen || d.documentElement.webkitRequestFullscreen;
      if (r) r.call(d.documentElement);
    } else {
      const x = d.exitFullscreen || d.webkitExitFullscreen;
      if (x) x.call(d);
    }
  }

  function toggleTheme() {
    const html = document.documentElement;
    const nxt = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', nxt);
    try { localStorage.setItem('balans.theme', nxt); } catch (e) { /**/ }
    themeBtn.innerHTML = icon(nxt === 'dark' ? 'moon' : 'sun');
    const s = slides[state.i];
    if (s && s.onTheme) s.onTheme();
  }

  /* ---------------- overview ---------------- */
  const overview = h('div.overview');
  const ovHead = h('div.overview__head', null, [
    h('div.overview__title', { text: t('app.overview') }),
    h('button.overview__close', { html: `${icon('x', 14)}<span>${t('app.close')}</span>`, onclick: () => toggleOverview(false) }),
  ]);
  const ovGrid = h('div.overview__grid');
  overview.append(ovHead, ovGrid);
  app.appendChild(overview);

  function buildOverview() {
    ovGrid.innerHTML = '';
    let lastSec = null;
    slides.forEach((s, i) => {
      if (s.section !== lastSec) {
        lastSec = s.section;
        ovGrid.appendChild(h('div.ovgroup__label', { text: s.sectionLabel() }));
      }
      ovGrid.appendChild(h('button.ovcard' + (i === state.i ? '.is-current' : ''), {
        type: 'button', dataset: { index: i },
        onclick: () => { toggleOverview(false); go(i); },
      }, [
        h('div.ovcard__n', { text: String(i + 1).padStart(2, '0') }),
        h('div.ovcard__t', { text: s.label() }),
        h('div.ovcard__d', { text: s.desc() }),
      ]));
    });
  }

  function toggleOverview(force) {
    state.overview = force !== undefined ? force : !state.overview;
    if (state.overview) buildOverview();
    overview.classList.toggle('is-open', state.overview);
  }

  /* ---------------- keyboard ---------------- */
  function onKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const ae = document.activeElement;
    if (ae && /INPUT|TEXTAREA|SELECT/.test(ae.tagName)) return;
    const k = e.key;
    if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') { e.preventDefault(); go(state.i + 1); }
    else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); go(state.i - 1); }
    else if (k === 'Home') { e.preventDefault(); go(0); }
    else if (k === 'End') { e.preventDefault(); go(slides.length - 1); }
    else if (k === 'f' || k === 'F' || k === '\u0430' || k === '\u0410') { e.preventDefault(); toggleFullscreen(); }
    else if (k === 'g' || k === 'G' || k === '\u043f' || k === '\u041f') { e.preventDefault(); toggleOverview(); }
    else if (k === 'Escape') { if (state.overview) toggleOverview(false); }
    else if (k === 'd' || k === 'D' || k === 'l' || k === 'L' || k === '\u0432' || k === '\u0412' || k === '\u0434' || k === '\u0414') { e.preventDefault(); toggleTheme(); }
    else if (/^[1-9]$/.test(k)) { e.preventDefault(); go(parseInt(k, 10) - 1); }
  }

  /* ---------------- swipe ---------------- */
  let tx = 0, ty = 0, tt = 0, tracking = false;
  function onStart(e) {
    if (e.touches.length !== 1) return;
    if (e.target.closest('.scrolly, .chat__log, .dash__body, input, textarea, .sugg')) return;
    tx = e.touches[0].clientX; ty = e.touches[0].clientY; tt = Date.now(); tracking = true;
  }
  function onEnd(e) {
    if (!tracking) return;
    tracking = false;
    const t2 = e.changedTouches[0];
    const dx = t2.clientX - tx, dy = t2.clientY - ty;
    if (Date.now() - tt > 900) return;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6) { dx < 0 ? go(state.i + 1) : go(state.i - 1); }
  }

  /* ---------------- mount ---------------- */
  function mount() {
    buildSlides();
    buildSections();
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', fit);
    mqMobile.addEventListener('change', (e) => {
      state.mobile = e.matches;
      document.body.classList.toggle('is-mobile', e.matches);
      fit();
    });
    viewport.addEventListener('touchstart', onStart, { passive: true });
    viewport.addEventListener('touchend', onEnd, { passive: true });
    document.addEventListener('fullscreenchange', fit);

    document.body.classList.toggle('is-mobile', state.mobile);

    const hash = parseInt((location.hash || '').replace('#', ''), 10);
    go(Number.isFinite(hash) && hash >= 1 && hash <= slides.length ? hash - 1 : 0, true);
  }

  function rerender() {
    state.nodes.forEach((n) => { if (typeof n._stop === 'function') { try { n._stop(); } catch (e) { /**/ } } });
    buildSlides();
    buildSections();
    buildOverview();
    applyState();
  }

  return { mount, go, rerender, toggleOverview, toggleFullscreen, toggleTheme, state, fit };
}

export { mqMobile, mqReduce };
