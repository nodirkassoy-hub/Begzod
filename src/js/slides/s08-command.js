/* ============================================================
   SLIDE 08 — BUSINESS COMMAND CENTER (CEO dashboard)
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { series, MONTHS, topProducts, topCustomers } from '../data/demo.js';
import { areaChart, rankBars } from '../components/chart.js';
import { el, kpi, panel } from '../components/ui.js';

const ICO = { alert: 'alert', up: 'up', wallet: 'wallet', ai: 'ai' };

const SPARKS = [
  [42, 48, 44, 58, 62, 71, 68, 84],
  [18, 21, 19, 26, 31, 29, 36, 41],
  [12, 16, 14, 22, 25, 24, 33, 38],
  [30, 34, 41, 38, 47, 52, 49, 58],
  [22, 19, 26, 24, 31, 28, 34, 30],
  [55, 52, 58, 61, 57, 64, 62, 69],
];

export default {
  id: 'command',
  section: 's4',
  label: () => t('s08.title'),
  desc: () => t('s08.today'),
  render() {
    const root = el('div.cmd8');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s08.eyebrow') }),
      el('h2.s-title', { html: t('s08.title') }),
      el('p.s-sub', { text: t('s08.sub') }),
    ]));

    const body = el('div.cmd8__body');

    /* ---- KPI strip ---- */
    const kpis = el('div.cmd8__kpis');
    t('s08.kpis').forEach((k, i) => kpis.appendChild(kpi({
      k: k.k, v: k.v, u: k.u, d: k.d, ico: k.ico, tone: k.neg ? 'r' : (i % 3 === 1 ? 'm' : i % 3 === 2 ? 'v' : 'a'),
      spark: SPARKS[i % SPARKS.length],
    })));
    body.appendChild(kpis);

    const mid = el('div.cmd8__mid');

    /* ---- main chart ---- */
    const chartCard = el('div.glass.cmd8__chart');
    chartCard.appendChild(el('div.panel__head', null, [
      el('div.panel__title', { text: t('s08.charts.revenue') + ' / ' + t('s08.charts.profit') }),
      el('div.cmd8__legend', { html: `<span class="legend__i"><i style="background:var(--neutral)"></i>${t('s08.charts.revenue')}</span><span class="legend__i"><i style="background:var(--pos)"></i>${t('s08.charts.profit')}</span><span class="legend__i"><i style="background:var(--neg)"></i>${t('s08.charts.expenses')}</span>` }),
    ]));
    const host = el('div.cmd8__chartHost');
    chartCard.appendChild(host);
    mid.appendChild(chartCard);

    /* ---- what matters today ---- */
    const today = el('div.glass.cmd8__today');
    today.appendChild(el('div.panel__head', null, [
      el('div.ico.ico--sm.ico--amber', { html: icon('zap') }),
      el('div.panel__title', { text: t('s08.today') }),
    ]));
    const tl = el('div.cmd8__todayList');
    t('s08.todayItems').forEach((it, i) => {
      tl.appendChild(el('div.cmd8__todayItem', { dataset: { d: String(Math.min(8, i + 1)) } }, [
        el('div.cmd8__todayIco' + (it.ico === 'ai' ? '.cmd8__todayIco--ai' : it.ico === 'up' ? '.cmd8__todayIco--up' : ''), { html: icon(ICO[it.ico] || 'alert') }),
        el('div', null, [
          el('div.cmd8__todayT', { text: it.t }),
          el('div.cmd8__todayD', { text: it.d }),
        ]),
      ]));
    });
    today.appendChild(el('div.panel__body.scrolly', null, tl));
    mid.appendChild(today);
    body.appendChild(mid);

    /* ---- bottom: rankings ---- */
    const bottom = el('div.cmd8__bottom');
    const p1 = panel(t('s08.topProducts'), rankHost(topProducts.slice(0, 4)));
    const p2 = panel(t('s08.topCustomers'), rankHost(topCustomers.slice(0, 4)));
    bottom.append(p1, p2);
    body.appendChild(bottom);

    root.appendChild(body);
    root.dataset.chartPending = '1';

    root._draw = () => {
      const h = root.querySelector('.cmd8__chartHost');
      if (h) areaChart(h, [
        { data: series.revenue, color: 'var(--neutral)', width: 2.6 },
        { data: series.profit, color: 'var(--pos)', width: 2.2 },
        { data: series.expenses, color: 'var(--neg)', width: 1.8 },
      ], { w: 760, h: 250, labels: MONTHS });
    };

    return root;
  },
  onEnter() {
    const node = document.querySelector('.slide--command');
    if (node && node._draw) node._draw();
  },
};

function rankHost(data) {
  const w = el('div', { style: { display: 'grid', gap: '10px' } });
  const max = Math.max(...data.map((d) => d.v));
  data.forEach((d, i) => {
    w.appendChild(el('div', { dataset: { d: String(i + 1) } }, [
      el('div.hstack', { style: { justifyContent: 'space-between', marginBottom: '5px' } }, [
        el('span', { text: d.k, style: { fontSize: '12px', fontWeight: '600', color: 'var(--text-1)' } }),
        el('span.mono', { text: d.label, style: { fontSize: '11.5px', color: 'var(--text-2)' } }),
      ]),
      el('div.meter', null, el('i.meter__fill', { style: { width: ((d.v / max) * 100).toFixed(0) + '%', transitionDelay: (i * 90) + 'ms' } })),
    ]));
  });
  return w;
}
