/* ============================================================
   SLIDE 21 — INVESTOR / PARTNER VIEW
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';

const ENGINE_ICONS = ['ai', 'layers', 'percent', 'lock', 'wallet', 'ext'];

export default {
  id: 'investor',
  section: 's10',
  label: () => t('s21.title'),
  desc: () => t('s21.sub'),
  render() {
    const root = el('div.inv');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s21.eyebrow') }),
      el('h2.s-title', { html: t('s21.title') }),
      el('p.s-sub', { text: t('s21.sub') }),
    ]));

    /* ---- companies ---- */
    const comps = el('div.inv__comps');
    t('s21.companies').forEach((c, i) => {
      comps.appendChild(el('div.glass.inv__comp', { dataset: { d: String(i + 1) } }, [
        el('div.inv__compIco', { html: icon('brief', 15) }),
        el('span.inv__compT', { text: c }),
        el('span.inv__compTag', { text: 'TENANT' }),
      ]));
    });
    root.appendChild(comps);

    root.appendChild(el('div.inv__connector', { html: `<svg viewBox="0 0 600 30" preserveAspectRatio="none"><path d="M0 0 L300 26 L600 0" fill="none" stroke="var(--stroke-2)" stroke-width="1.4" stroke-dasharray="5 5"/></svg>` }));

    /* ---- tenant platform ---- */
    const plat = el('div.glass.glass--lg.inv__plat');
    plat.appendChild(el('div.inv__platGlow'));
    plat.appendChild(el('div.inv__platTitle', { html: `${icon('db', 16)}<span>${t('s21.tenant')}</span>` }));
    const engines = el('div.inv__engines');
    t('s21.engines').forEach((e, i) => {
      engines.appendChild(el('div.inv__engine', { dataset: { d: String((i % 5) + 1) } }, [
        el('div.inv__engineIco', { html: icon(ENGINE_ICONS[i], 15) }),
        el('div', null, [
          el('div.inv__engineT', { text: e.t }),
          el('div.inv__engineD', { text: e.d }),
        ]),
      ]));
    });
    plat.appendChild(engines);
    root.appendChild(plat);

    /* ---- points ---- */
    const pts = el('div.glass.glass--pad.inv__points');
    pts.appendChild(el('div.label', { text: t('s21.pointsTitle'), style: { marginBottom: '11px' } }));
    const pl = el('div.inv__pointsList');
    t('s21.points').forEach((p, i) => {
      pl.appendChild(el('div.inv__point', { dataset: { d: String((i % 5) + 1) } }, [
        el('span.inv__pointIco', { html: icon('check', 12) }),
        el('span', { text: p }),
      ]));
    });
    pts.appendChild(pl);
    root.appendChild(pts);

    root.appendChild(el('div.slide__foot', null, [el('span', { text: t('s21.note') })]));
    return root;
  },
};
