/* ============================================================
   SLIDE 05 — COMPLETE BUSINESS ECOSYSTEM (16 modules)
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';

const ICONS = ['scale', 'cart', 'brief', 'box', 'truck', 'factory', 'users', 'files',
  'db', 'layers', 'target', 'bank', 'percent', 'file', 'checkCircle', 'ai'];

export default {
  id: 'ecosystem',
  section: 's2',
  label: () => t('s05.title'),
  desc: () => t('s05.sub'),
  render() {
    const root = el('div.eco');

    root.appendChild(el('div.s-head.eco__head', null, [
      el('div', null, [
        el('div.s-eyebrow', { text: t('s05.eyebrow') }),
        el('h2.s-title', { html: t('s05.title') }),
        el('p.s-sub', { text: t('s05.sub') }),
      ]),
      el('div.eco__count', { html: `<b>16</b><span>${t('s01.mods')}</span>` }),
    ]));

    const grid = el('div.eco__grid');
    t('s05.mods').forEach((m, i) => {
      const card = el('div.modcard.eco__card', { dataset: { d: String(Math.min(8, i % 8 + 1)) } });
      card.appendChild(el('div.modcard__glow'));
      card.appendChild(el('div.eco__cardTop', null, [
        el('div.ico.ico--sm' + (i % 4 === 1 ? '.ico--mint' : i % 4 === 2 ? '.ico--violet' : i % 4 === 3 ? '.ico--amber' : ''), { html: icon(ICONS[i]) }),
        el('span.modcard__n', { text: String(i + 1).padStart(2, '0') }),
      ]));
      card.appendChild(el('div.modcard__t', { text: m.t }));
      card.appendChild(el('div.modcard__d', { text: m.d }));
      grid.appendChild(card);
    });
    root.appendChild(grid);
    return root;
  },
};
