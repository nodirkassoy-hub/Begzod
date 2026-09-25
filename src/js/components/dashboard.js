/* ============================================================
   BALANS AI — ROLE DASHBOARD + ROLE SWITCHER
   ============================================================ */

import { icon } from '../icons.js';
import { t, to } from '../i18n/index.js';
import { ROLE_DASH, series, MONTHS, costStructure } from '../data/demo.js';
import { areaChart, barChart, donut, rankBars } from './chart.js';
import { el, clear, kpi, panel, badge } from './ui.js';

export const ROLE_LABEL = {
  CEO: { uz: 'CEO', en: 'CEO', ru: 'CEO', ico: 'brief' },
  ADMIN: { uz: 'Administrator', en: 'Administrator', ru: 'Администратор', ico: 'shield' },
  CHIEF: { uz: 'Bosh buxgalter', en: 'Chief Accountant', ru: 'Главный бухгалтер', ico: 'scale' },
  ACCOUNTANT: { uz: 'Buxgalter', en: 'Accountant', ru: 'Бухгалтер', ico: 'calc' },
  SALES: { uz: 'Savdo', en: 'Sales', ru: 'Продажи', ico: 'cart' },
  WAREHOUSE: { uz: 'Ombor', en: 'Warehouse', ru: 'Склад', ico: 'box' },
  PURCHASING: { uz: 'Xarid', en: 'Purchasing', ru: 'Закупки', ico: 'truck' },
  HR: { uz: 'HR', en: 'HR', ru: 'HR', ico: 'users' },
  PRODUCTION: { uz: 'Ishlab chiqarish', en: 'Production', ru: 'Производство', ico: 'factory' },
  CASHIER: { uz: 'Kassir', en: 'Cashier', ru: 'Кассир', ico: 'wallet' },
  AUDITOR: { uz: 'Auditor', en: 'Auditor', ru: 'Аудитор', ico: 'eye' },
};

function roleMeta(key) {
  const l = to(`s06.roles.${key}`);
  const lab = ROLE_LABEL[key] || { uz: key, en: key, ru: key, ico: 'user' };
  const code = t('meta.code');
  return { key, name: l.name || key, show: l.show || [], hide: l.hide || [], ico: lab.ico, label: lab[code] || lab.uz || key };
}

export function roleSwitcher(active, onChange, keys) {
  const wrap = el('div.roles');
  (keys || Object.keys(ROLE_LABEL)).forEach((k) => {
    const b = el(`button.role${k === active ? '.is-active' : ''}`, {
      type: 'button',
      html: `<i></i><span>${roleMeta(k).label}</span>`,
      onclick: () => onChange(k),
    });
    b.dataset.role = k;
    wrap.appendChild(b);
  });
  return wrap;
}

/* ---------------- chart renderers ---------------- */
function renderChart(host, kind) {
  clear(host);
  if (!kind) { host.style.display = 'none'; return; }
  host.style.display = '';
  if (kind === 'main') {
    areaChart(host, [
      { data: series.revenue, color: 'var(--neutral)', width: 2.6 },
      { data: series.profit, color: 'var(--pos)', width: 2.2 },
    ], { w: 620, h: 168, labels: MONTHS, dots: false });
  } else if (kind === 'sales') {
    barChart(host, series.revenue.slice(-7).map((v, i) => ({ v, k: MONTHS[i + 5] })), { w: 620, h: 168, labels: MONTHS.slice(-7) });
  } else if (kind === 'stock') {
    rankBars(host, [
      { k: 'Profil A-120', v: 3420, label: '3 420', color: 'var(--pos)' },
      { k: 'Komplekt B', v: 1106, label: '1 106', color: 'var(--neutral)' },
      { k: 'Panel XL', v: 842, label: '842', color: 'var(--warn)' },
      { k: 'Modul C-9', v: 64, label: '64', color: 'var(--neg)' },
    ]);
  } else if (kind === 'cost') {
    const box = el('div.hstack', { style: { gap: '18px', alignItems: 'center' } });
    const d = el('div', { style: { width: '150px', flex: '0 0 auto' } });
    donut(d, costStructure, { size: 150, thick: 15, center: '1 362', centerSub: 'mln' });
    const lg = el('div.legend', { style: { flexDirection: 'column', gap: '7px' } });
    costStructure.forEach((c) => lg.appendChild(el('div.legend__i', { html: `<i style="background:${c.color}"></i>${c.v}%` })));
    box.append(d, lg);
    host.appendChild(box);
  }
}

/* ---------------- dashboard window ---------------- */
export function roleDashboard(roleKey, opts = {}) {
  const data = ROLE_DASH[roleKey] || ROLE_DASH.CEO;
  const meta = roleMeta(roleKey);
  const win = el('div.dash');

  const bar = el('div.dash__bar');
  bar.appendChild(el('div.dash__dots', { html: '<i></i><i></i><i></i>' }));
  bar.appendChild(el('div.dash__crumb', { html: `${icon('grid', 12)}<span>BALANS AI</span><span class="dash__sep">/</span><span>${meta.name}</span>` }));
  bar.appendChild(el('div.dash__barEnd', null, [
    el('span.dash__lock', { html: `${icon('lock', 12)}<span>${meta.name}</span>` }),
    badge(t('app.demoData'), 'demo'),
  ]));
  win.appendChild(bar);

  const body = el('div.dash__body');

  const kg = el('div.dash__kpis');
  data.kpis.forEach((k) => kg.appendChild(kpi(k)));
  body.appendChild(kg);

  const mid = el('div.dash__mid');
  const chartCard = el('div.glass.dash__chart');
  chartCard.appendChild(el('div.dash__chartHead', null, [
    el('span.label', { text: t('s23.kpiLabels.revenue') }),
  ]));
  const host = el('div.dash__chartHost');
  chartCard.appendChild(host);
  mid.appendChild(chartCard);
  renderChart(host, data.chart);

  const side = el('div.dash__side');
  data.panels.forEach((p) => {
    let inner;
    if (p.type === 'rows') inner = rowListLocal(p.data);
    else if (p.type === 'rank') inner = rankHost(p.data);
    else if (p.type === 'cost') inner = costHost(p.data);
    else inner = el('div');
    side.appendChild(panel(p.t, inner, { scroll: true }));
  });
  mid.appendChild(side);
  body.appendChild(mid);

  if (data.insight) {
    body.appendChild(el('div.dash__insight', { html: `${icon('ai', 15)}<div><b>${t('s01.ins')}</b><span>${data.insight}</span></div>` }));
  }
  win.appendChild(body);
  return win;
}

function rowListLocal(items) {
  const w = el('div.rows');
  items.forEach((r) => {
    const row = el('div.row');
    if (r.ico) row.appendChild(el('div.ico.ico--sm', { html: icon(r.ico) }));
    const c = el('div.grow');
    c.appendChild(el('div.row__t', { text: r.t }));
    if (r.m) c.appendChild(el('div.row__m', { text: r.m }));
    row.appendChild(c);
    if (r.v) {
      const tone = r.tone === 'pos' ? 'pos' : r.tone === 'neg' ? 'neg' : r.tone === 'warn' ? 'warn' : '';
      row.appendChild(el('div.row__end', null, el('div.row__v', { text: r.v, style: tone ? { color: `var(--${tone})` } : {} })));
    }
    w.appendChild(row);
  });
  return w;
}

function rankHost(data) {
  const w = el('div', { style: { display: 'grid', gap: '9px' } });
  const max = Math.max(...data.map((d) => d.v));
  data.forEach((d) => {
    const r = el('div', null, [
      el('div.hstack', { style: { justifyContent: 'space-between', marginBottom: '4px' } }, [
        el('span', { text: d.k, style: { fontSize: '11.5px', fontWeight: '600', color: 'var(--text-1)' } }),
        el('span.mono', { text: d.label, style: { fontSize: '11px', color: 'var(--text-2)' } }),
      ]),
      el('div.meter', null, el('i.meter__fill', { style: { width: ((d.v / max) * 100).toFixed(0) + '%' } })),
    ]);
    w.appendChild(r);
  });
  return w;
}

function costHost(data) {
  const w = el('div.hstack', { style: { gap: '14px', alignItems: 'center' } });
  const d = el('div', { style: { width: '110px', flex: '0 0 auto' } });
  donut(d, data, { size: 110, thick: 12 });
  const lg = el('div', { style: { display: 'grid', gap: '5px' } });
  data.forEach((c) => lg.appendChild(el('div.legend__i', { html: `<i style="background:${c.color}"></i>${c.v}%` })));
  w.append(d, lg);
  return w;
}

/* ---------------- permission summary card ---------------- */
export function permCard(roleKey) {
  const m = roleMeta(roleKey);
  const card = el('div.glass.perm');
  card.appendChild(el('div.perm__head', null, [
    el('div.ico.ico--sm', { html: icon(m.ico) }),
    el('div', null, [
      el('div.perm__name', { text: m.name }),
      el('div.perm__role', { text: roleKey }),
    ]),
  ]));
  const cols = el('div.perm__cols');
  const yes = el('div.perm__col');
  yes.appendChild(el('div.perm__lbl.perm__lbl--yes', { text: t('s06.show') }));
  const yl = el('div.perm__list');
  m.show.forEach((s) => yl.appendChild(el('div.perm__item', { html: `${icon('check', 12)}<span>${s}</span>` })));
  yes.appendChild(yl);
  const no = el('div.perm__col');
  no.appendChild(el('div.perm__lbl.perm__lbl--no', { text: t('s06.hide') }));
  const nl = el('div.perm__list');
  if (m.hide.length) m.hide.forEach((s) => nl.appendChild(el('div.perm__item.perm__item--no', { html: `${icon('x', 12)}<span>${s}</span>` })));
  else nl.appendChild(el('div.perm__empty', { text: '\u2014' }));
  no.appendChild(nl);
  cols.append(yes, no);
  card.appendChild(cols);
  return card;
}
