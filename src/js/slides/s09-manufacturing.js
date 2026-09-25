/* ============================================================
   SLIDE 09 — MANUFACTURING
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { costStructure } from '../data/demo.js';
import { donut } from '../components/chart.js';
import { el } from '../components/ui.js';

const FLOW_ICONS = ['box', 'list', 'factory', 'cart', 'users', 'cpu', 'zap', 'layers', 'checkCircle', 'calc', 'percent'];

export default {
  id: 'manufacturing',
  section: 's5',
  label: () => t('s09.title'),
  desc: () => t('s09.capsTitle'),
  render() {
    const root = el('div.mfg');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s09.eyebrow') }),
      el('h2.s-title', { html: t('s09.title') }),
      el('p.s-sub', { text: t('s09.sub') }),
    ]));

    const body = el('div.mfg__body');

    /* ---- left: chain ---- */
    const chainCard = el('div.glass.mfg__chain');
    chainCard.appendChild(el('div.panel__head', null, [
      el('div.ico.ico--sm', { html: icon('factory') }),
      el('div.panel__title', { text: t('s09.flowTitle') }),
      el('div', { style: { marginLeft: 'auto' } }, el('span.chip.chip--plain', { text: t('app.demoData') })),
    ]));
    const chain = el('div.mfg__chainList');
    t('s09.flow').forEach((f, i) => {
      const node = el('div.mfg__step', { dataset: { d: String(Math.min(8, i + 1)) } }, [
        el('div.mfg__stepIco', { html: icon(FLOW_ICONS[i] || 'check', 14) }),
        el('div.mfg__stepT', { text: f }),
      ]);
      chain.appendChild(node);
      if (i < t('s09.flow').length - 1) chain.appendChild(el('div.mfg__stepLine'));
    });
    chainCard.appendChild(el('div.panel__body.scrolly', null, chain));
    body.appendChild(chainCard);

    /* ---- right ---- */
    const right = el('div.mfg__right');

    const caps = el('div.glass.mfg__caps');
    caps.appendChild(el('div.panel__head', null, [el('div.panel__title', { text: t('s09.capsTitle') })]));
    const cl = el('div.mfg__capsList');
    t('s09.caps').forEach((c, i) => cl.appendChild(el('div.mfg__cap', { dataset: { d: String((i % 5) + 1) } }, [
      el('span.mfg__capIco', { html: icon('check', 12) }),
      el('span', { text: c }),
    ])));
    caps.appendChild(el('div.panel__body.scrolly', null, cl));
    right.appendChild(caps);

    const cost = el('div.glass.mfg__cost');
    cost.appendChild(el('div.panel__head', null, [
      el('div.panel__title', { text: t('s09.costTitle') }),
      el('span.chip.chip--plain', { text: t('app.demoData') }),
    ]));
    const cbody = el('div.panel__body');
    const row = el('div.mfg__costRow');
    const dhost = el('div.mfg__costDonut');
    row.appendChild(dhost);
    const lg = el('div.mfg__costLegend');
    t('s09.cost').forEach((c) => {
      const d = costStructure.find((x) => c.k.indexOf(x.k) === 0 || x.k.indexOf(c.k) === 0) || costStructure[0];
      lg.appendChild(el('div.mfg__costItem', null, [
        el('span.mfg__costDot', { style: { background: d.color } }),
        el('span.mfg__costK', { text: c.k }),
        el('span.mfg__costV.mono', { text: c.v + '%' }),
      ]));
    });
    row.appendChild(lg);
    cbody.appendChild(row);
    cost.appendChild(cbody);
    right.appendChild(cost);

    body.appendChild(right);
    root.appendChild(body);
    root._draw = () => {
      const d = root.querySelector('.mfg__costDonut');
      if (d) donut(d, costStructure, { size: 132, thick: 14, center: '100%', centerSub: t('s09.costTitle') });
    };
    return root;
  },
  onEnter() {
    const n = document.querySelector('.slide--manufacturing');
    if (n && n._draw) n._draw();
  },
};
