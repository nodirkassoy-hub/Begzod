/* ============================================================
   SLIDE 12 — BALANS AI DIFFERENTIATORS (5 pillars)
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';

const ICONS = ['ai', 'shield', 'target', 'layers', 'globe'];

export default {
  id: 'differentiators',
  section: 's6',
  label: () => t('s12.title'),
  desc: () => t('s12.note'),
  render() {
    const root = el('div.diff');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s12.eyebrow') }),
      el('h2.s-title', { html: t('s12.title') }),
      el('p.s-sub', { text: t('s12.sub') }),
    ]));

    const grid = el('div.diff__grid');
    t('s12.pillars').forEach((p, i) => {
      const card = el('div.glass.diff__card', { dataset: { d: String(i + 1) } });
      card.appendChild(el('div.diff__glow'));
      card.appendChild(el('div.diff__num', { text: p.n }));
      card.appendChild(el('div.diff__ico', { html: icon(ICONS[i]) }));
      card.appendChild(el('h3.diff__t', { text: p.t }));
      card.appendChild(el('p.diff__d', { text: p.d }));
      grid.appendChild(card);
    });
    root.appendChild(grid);

    const note = el('div.diff__note', { html: `${icon('checkCircle', 15)}<span>${t('s12.note')}</span>` });
    root.appendChild(note);
    return root;
  },
};
