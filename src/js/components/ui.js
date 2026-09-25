/* ============================================================
   BALANS AI — UI PRIMITIVES
   Tiny hyperscript + the shared visual components.
   ============================================================ */

import { icon } from '../icons.js';
import { sparkline } from './chart.js';

/** hyperscript: el('div.cls', {attrs}, [children]) */
export function el(spec, attrs, children) {
  let tag = 'div', cls = [];
  const m = String(spec).match(/^[a-zA-Z0-9]+/);
  if (m) tag = m[0];
  (String(spec).match(/\.[^.#]+/g) || []).forEach((c) => cls.push(c.slice(1)));
  (String(spec).match(/#[^.#]+/g) || []).forEach((id) => (attrs = attrs || {}, attrs.id = id.slice(1)));

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
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k in node && k !== 'list' && typeof v !== 'object') { try { node[k] = v; } catch (e) { node.setAttribute(k, v); } }
      else node.setAttribute(k, v === true ? '' : v);
    }
  }
  append(node, children);
  return node;
}

export function append(parent, children) {
  if (children === null || children === undefined || children === false) return parent;
  if (Array.isArray(children)) { children.forEach((c) => append(parent, c)); return parent; }
  if (children instanceof Node) { parent.appendChild(children); return parent; }
  parent.appendChild(document.createTextNode(String(children)));
  return parent;
}

export function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); return node; }

export function svg(markup) {
  const t = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  t.innerHTML = markup;
  return t;
}

/* ---------------- glass panel ---------------- */
export function glass(cls, children, attrs) {
  return el(`div.glass${cls ? '.' + cls : ''}`, attrs, children);
}

/* ---------------- KPI tile ---------------- */
export function kpi(o) {
  const tone = o.tone || 'a';
  const icoCls = tone === 'm' ? 'kpi__ico--mint' : tone === 'v' ? 'kpi__ico--violet'
    : tone === 'r' ? 'kpi__ico--rose' : tone === 'w' ? 'kpi__ico--amber' : '';
  const color = tone === 'm' ? 'var(--pos)' : tone === 'v' ? 'var(--indigo-400)'
    : tone === 'r' ? 'var(--neg)' : tone === 'w' ? 'var(--warn)' : 'var(--neutral)';
  const n = el('div.kpi');
  n.appendChild(el('div.kpi__top', null, [
    el(`div.kpi__ico${icoCls ? '.' + icoCls.replace('kpi__ico--', '') : ''}`, { html: icon(o.ico || 'trend') }),
    el('div.kpi__label', { text: o.k }),
  ]));
  const val = el('div.kpi__value');
  val.innerHTML = `${o.v}${o.u ? `<small>${o.u}</small>` : ''}`;
  n.appendChild(val);
  const foot = el('div.kpi__foot');
  if (o.d) {
    const tone2 = o.neg ? 'neg' : (String(o.d).trim().startsWith('-') ? 'neg' : 'pos');
    foot.appendChild(el(`span.chip.chip--${tone2}`, { text: o.d }));
  }
  if (o.spark) { const s = el('div'); s.innerHTML = sparkline(o.spark, color, 120, 30); n.appendChild(el('div.kpi__spark', null, s.firstChild)); }
  n.appendChild(foot);
  return n;
}

/* ---------------- panel ---------------- */
export function panel(title, body, opts = {}) {
  const p = el('div.glass.panel');
  const head = el('div.panel__head');
  if (opts.ico) head.appendChild(el('div.ico.ico--sm', { html: icon(opts.ico) }));
  head.appendChild(el('div.panel__title', { text: title }));
  if (opts.chip) head.appendChild(el('div', { style: { marginLeft: 'auto' }, html: opts.chip }));
  else head.appendChild(el('div.panel__dots', { html: '<i></i><i></i><i></i>' }));
  p.appendChild(head);
  p.appendChild(el('div.panel__body' + (opts.scroll ? '.scrolly' : ''), null, body));
  return p;
}

/* ---------------- chip ---------------- */
export function chip(text, tone) {
  return el(`span.chip${tone ? '.chip--' + tone : ''}`, { text });
}

export function badge(text, kind) {
  return el(`span.badge.badge--${kind}`, { html: `<i></i>${text}` });
}

/* ---------------- flow node ---------------- */
export function flowNode(label, kind) {
  return el(`div.flow__node${kind ? '.flow__node--' + kind : ''}`, {
    html: `${icon(kind === 'ai' ? 'ai' : kind === 'start' ? 'play' : kind === 'end' ? 'target' : 'check')}<span>${label}</span>`,
  });
}

export function flowArrow() {
  return el('div.flow__arrow', { html: icon('arrowR', 14) });
}

export function flowChain(items, opts = {}) {
  const wrap = el(`div.flow${opts.col ? '.flow--col' : ''}`);
  items.forEach((it, i) => {
    wrap.appendChild(flowNode(it.label || it, it.kind));
    if (i < items.length - 1) wrap.appendChild(flowArrow());
  });
  return wrap;
}

/* ---------------- rows list ---------------- */
export function rowList(items) {
  const w = el('div.rows');
  items.forEach((r) => {
    const row = el('div.row');
    if (r.ico) row.appendChild(el('div.ico.ico--sm', { html: icon(r.ico) }));
    const t = el('div.grow');
    t.appendChild(el('div.row__t', { text: r.t }));
    if (r.m) t.appendChild(el('div.row__m', { text: r.m }));
    row.appendChild(t);
    if (r.v) row.appendChild(el('div.row__end', null, el(`div.row__v${r.tone ? '.t-' + r.tone : ''}`, { text: r.v })));
    w.appendChild(row);
  });
  return w;
}

/* ---------------- bullets ---------------- */
export function bullets(items, tone) {
  const w = el('div.bullets');
  items.forEach((b) => {
    const ic = tone === 'warn' ? 'alert' : tone === 'pos' ? 'checkCircle' : 'check';
    w.appendChild(el(`div.bullet${tone ? '.bullet--' + tone : ''}`, {
      html: `${icon(ic)}<span>${b}</span>`,
    }));
  });
  return w;
}

/* ---------------- section header ---------------- */
export function slideHead(o) {
  const h = el('div.s-head');
  if (o.eyebrow) h.appendChild(el('div.s-eyebrow', { text: o.eyebrow }));
  h.appendChild(el('h2.s-title', { html: o.title }));
  if (o.sub) h.appendChild(el('p.s-sub', { text: o.sub }));
  return h;
}

/* ---------------- stat ---------------- */
export function stat(v, l, cls) {
  return el('div.stat', null, [
    el(`div.stat__v${cls ? '.' + cls : ''}`, { text: v }),
    el('div.stat__l', { text: l }),
  ]);
}
