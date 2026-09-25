/* ============================================================
   SLIDE 01 — HERO
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { series, MONTHS } from '../data/demo.js';
import { areaChart } from '../components/chart.js';
import { el, badge, kpi } from '../components/ui.js';

let chartHost = null;
let insEl = null;

export default {
  id: 'hero',
  section: 's1',
  label: () => t('app.tagline'),
  desc: () => t('s01.sub'),
  render() {
    const root = el('div.hero');

    /* ---------- left column ---------- */
    const left = el('div.hero__left');
    left.appendChild(el('div.hero__label.rv', { html: `<i></i>${t('s01.label')}` }));

    const h1 = el('h1.hero__title.rv', { dataset: { d: '1' } });
    const txt = t('s01.title');
    h1.innerHTML = txt.replace(/(BITTA PLATFORMADA|ONE PLATFORM|НА ОДНОЙ ПЛАТФОРМЕ)/, '<em>$1</em>');
    left.appendChild(h1);

    left.appendChild(el('p.hero__sub.rv', { dataset: { d: '2' }, text: t('s01.sub') }));

    const ctas = el('div.hero__ctas.rv', { dataset: { d: '3' } });
    ctas.appendChild(el('button.btn.btn--primary', {
      html: `${icon('play')}<span>${t('s01.cta1')}</span>`,
      onclick: () => window.__deck && window.__deck.go(2),
    }));
    ctas.appendChild(el('button.btn.btn--ghost', {
      html: `${icon('flow')}<span>${t('s01.cta2')}</span>`,
      onclick: () => window.__deck && window.__deck.go(3),
    }));
    left.appendChild(ctas);

    const stats = el('div.hero__stats.rv', { dataset: { d: '4' } });
    t('s01.tiles').forEach((tl) => {
      stats.appendChild(el('div.hero__stat', null, [
        el('div.hero__statK', { text: tl.k }),
        el('div.hero__statV', { html: `${tl.v}<small>${tl.u}</small>` }),
        el('div.hero__statD.chip.chip--pos', { text: tl.d }),
      ]));
    });
    left.appendChild(stats);
    root.appendChild(left);

    /* ---------- right: command centre ---------- */
    const right = el('div.hero__right.rv', { dataset: { d: '2' } });
    const win = el('div.cmd');

    const bar = el('div.cmd__bar');
    bar.appendChild(el('div.cmd__dots', { html: '<i></i><i></i><i></i>' }));
    bar.appendChild(el('div.cmd__crumb', { html: `${icon('grid', 12)}<span>BALANS AI \u00b7 Business Command Center</span>` }));
    bar.appendChild(el('div.cmd__live', { html: `<i></i>${t('s01.live')}` }));
    win.appendChild(bar);

    const body = el('div.cmd__body');

    const tiles = el('div.cmd__tiles');
    [
      { k: t('s08.kpis.0.k'), v: '1 842', u: 'mln', d: '+14,2%', ico: 'trend', tone: 'a' },
      { k: t('s08.kpis.1.k'), v: '184', u: 'mln', d: '+11,0%', ico: 'coin', tone: 'm' },
      { k: t('s08.kpis.2.k'), v: '312', u: 'mln', d: '+6,4%', ico: 'wallet', tone: 'v' },
    ].forEach((o) => tiles.appendChild(kpi(o)));
    body.appendChild(tiles);

    const grid = el('div.cmd__grid');
    const chartCard = el('div.glass.cmd__chart');
    chartCard.appendChild(el('div.cmd__chartHead', null, [
      el('span.label', { text: t('s01.mods') }),
      el('div.cmd__legend', { html: `<span class="legend__i"><i style="background:var(--neutral)"></i>${t('s08.charts.revenue')}</span><span class="legend__i"><i style="background:var(--pos)"></i>${t('s08.charts.profit')}</span>` }),
    ]));
    chartHost = el('div.cmd__chartHost');
    chartCard.appendChild(chartHost);
    grid.appendChild(chartCard);

    const side = el('div.cmd__side');
    const ins = el('div.glass.cmd__insight');
    ins.appendChild(el('div.cmd__insHead', null, [
      el('div.ico.ico--sm.ico--mint', { html: icon('ai') }),
      el('span.label', { text: t('s01.ins') }),
    ]));
    insEl = el('p.cmd__insText', { text: t('s01.insText') });
    ins.appendChild(insEl);
    ins.appendChild(el('div.cmd__insTags', { html: '<span class="tag tag--fact">FACT</span><span class="tag tag--est">ESTIMATE</span><span class="tag tag--rec">RECOMMENDATION</span>' }));
    side.appendChild(ins);

    const mods = el('div.glass.cmd__mods');
    mods.appendChild(el('span.label', { text: t('s01.mods'), style: { display: 'block', marginBottom: '8px' } }));
    const mrow = el('div.cmd__modRow');
    ['Accounting', 'Sales', 'CRM', 'Warehouse', 'Purchasing', 'Manufacturing', 'HR', 'AI CFO'].forEach((m) => {
      mrow.appendChild(el('span.chip.chip--accent', { text: m }));
    });
    mods.appendChild(mrow);
    side.appendChild(mods);
    grid.appendChild(side);
    body.appendChild(grid);
    win.appendChild(body);
    right.appendChild(win);
    root.appendChild(right);

    return root;
  },
  onEnter() {
    if (chartHost && chartHost.isConnected) {
      areaChart(chartHost, [
        { data: series.revenue, color: 'var(--neutral)', width: 2.6 },
        { data: series.profit, color: 'var(--pos)', width: 2.2 },
      ], { w: 640, h: 200, labels: MONTHS });
    }
    const p = insEl;
    if (p && p.isConnected && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const full = t('s01.insText');
      p.textContent = '';
      let i = 0;
      (function step() {
        if (!p.isConnected) return;
        p.textContent = full.slice(0, ++i);
        if (i < full.length) setTimeout(step, 18);
      })();
    }
  },
};
