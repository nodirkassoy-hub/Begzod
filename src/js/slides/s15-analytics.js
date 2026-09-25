/* ============================================================
   SLIDE 15 — ANALYTICS
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { series, MONTHS, topCustomers, topProducts } from '../data/demo.js';
import { areaChart, barChart, rankBars } from '../components/chart.js';
import { el } from '../components/ui.js';

let activeFilter = 0;

export default {
  id: 'analytics',
  section: 's7',
  label: () => t('s15.title'),
  desc: () => t('s15.sub'),
  render() {
    const root = el('div.ana');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s15.eyebrow') }),
      el('h2.s-title', { html: t('s15.title') }),
      el('p.s-sub', { text: t('s15.sub') }),
    ]));

    /* filters */
    const filters = el('div.ana__filters');
    t('s15.filters').forEach((f, i) => {
      filters.appendChild(el(`button.ana__filter${i === activeFilter ? '.is-active' : ''}`, {
        type: 'button', dataset: { f: i },
        html: `${icon('search', 12)}<span>${f}</span>${icon('chevD', 11)}`,
        onclick: () => {
          activeFilter = i;
          root.querySelectorAll('.ana__filter').forEach((b, bi) => b.classList.toggle('is-active', bi === i));
          draw();
        },
      }));
    });
    root.appendChild(filters);

    const body = el('div.ana__body');

    const c1 = el('div.glass.ana__chart');
    c1.appendChild(el('div.panel__head', null, [
      el('div.panel__title', { text: t('s15.charts.0.t') }),
      el('span.chip.chip--plain', { text: t('app.demoData') }),
    ]));
    c1.appendChild(el('div.panel__body', null, el('div.ana__chartHost')));
    body.appendChild(c1);

    const c2 = el('div.glass.ana__chart');
    c2.appendChild(el('div.panel__head', null, [el('div.panel__title', { text: t('s15.charts.1.t') })]));
    c2.appendChild(el('div.panel__body', null, el('div.ana__rankHost')));
    body.appendChild(c2);

    const right = el('div.ana__right');
    const c3 = el('div.glass.ana__chart');
    c3.appendChild(el('div.panel__head', null, [el('div.panel__title', { text: t('s15.charts.2.t') })]));
    c3.appendChild(el('div.panel__body', null, el('div.ana__rankHost2')));
    right.appendChild(c3);

    const dims = el('div.glass.glass--pad.ana__dims');
    dims.appendChild(el('div.label', { text: t('s15.filters.0'), style: { marginBottom: '9px' } }));
    const dw = el('div.ana__dimWrap');
    t('s15.dims').forEach((d) => dw.appendChild(el('span.chip.chip--accent', { text: d })));
    dims.appendChild(dw);
    right.appendChild(dims);
    body.appendChild(right);

    root.appendChild(body);
    root.appendChild(el('div.slide__foot', null, [el('span', { text: t('s15.note') }), el('span.chip.chip--plain', { text: t('app.demoData') })]));

    function draw() {
      const h1 = root.querySelector('.ana__chartHost');
      if (h1) areaChart(h1, [
        { data: series.revenue, color: 'var(--neutral)', width: 2.6 },
        { data: series.profit, color: 'var(--pos)', width: 2.2 },
      ], { w: 620, h: 210, labels: MONTHS });
      const h2 = root.querySelector('.ana__rankHost');
      if (h2) rankBars(h2, topCustomers.slice(0, 4));
      const h3 = root.querySelector('.ana__rankHost2');
      if (h3) rankBars(h3, topProducts.slice(0, 4));
    }
    root._draw = draw;

    return root;
  },
  onEnter() {
    const n = document.querySelector('.slide--analytics');
    if (n && n._draw) n._draw();
  },
};
