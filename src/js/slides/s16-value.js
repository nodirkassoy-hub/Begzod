/* ============================================================
   SLIDE 16 — BUSINESS VALUE
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';

const ICONS = ['eye', 'lock', 'ai', 'layers'];

export default {
  id: 'value',
  section: 's8',
  label: () => t('s16.title'),
  desc: () => t('s16.sub'),
  render() {
    const root = el('div.val');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s16.eyebrow') }),
      el('h2.s-title', { html: t('s16.title') }),
      el('p.s-sub', { text: t('s16.sub') }),
    ]));

    const grid = el('div.val__grid');
    t('s16.items').forEach((it, i) => {
      const card = el('div.glass.glass--lg.val__card', { dataset: { d: String(i + 1) } });
      card.appendChild(el('div.val__glow'));
      card.appendChild(el('div.val__ico', { html: icon(ICONS[i]) }));
      card.appendChild(el('div.val__n', { text: '0' + (i + 1) }));
      card.appendChild(el('h3.val__t', { text: it.t }));
      card.appendChild(el('p.val__d', { text: it.d }));
      grid.appendChild(card);
    });
    root.appendChild(grid);

    const note = el('div.val__note', { html: `${icon('checkCircle', 15)}<span>${t('s16.note')}</span>` });
    root.appendChild(note);
    return root;
  },
};
