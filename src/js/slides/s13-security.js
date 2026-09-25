/* ============================================================
   SLIDE 13 — SECURITY & CONTROL
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';

const ICONS = ['db', 'lock', 'key', 'file', 'checkCircle', 'clock', 'shield', 'files', 'shield'];

export default {
  id: 'security',
  section: 's7',
  label: () => t('s13.title'),
  desc: () => t('s13.aiNote'),
  render() {
    const root = el('div.sec');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s13.eyebrow') }),
      el('h2.s-title', { html: t('s13.title') }),
      el('p.s-sub', { text: t('s13.sub') }),
    ]));

    /* ---------- chain ---------- */
    const chainCard = el('div.glass.glass--lg.sec__chain');
    chainCard.appendChild(el('div.sec__chainGlow'));
    const chain = el('div.sec__chainRow');
    t('s13.chain').forEach((c, i) => {
      chain.appendChild(el('div.sec__chainNode', { dataset: { d: String(i + 1) } }, [
        el('div.sec__chainIco', { html: icon(['user', 'lock', 'key', 'db', 'ai'][i]) }),
        el('div.sec__chainT', { text: c }),
      ]));
      if (i < t('s13.chain').length - 1) chain.appendChild(el('div.sec__chainArrow', { html: icon('arrowR', 16) }));
    });
    chainCard.appendChild(chain);
    root.appendChild(chainCard);

    /* ---------- items ---------- */
    const grid = el('div.sec__grid');
    t('s13.items').forEach((it, i) => {
      grid.appendChild(el('div.glass.sec__item', { dataset: { d: String((i % 5) + 1) } }, [
        el('div.sec__itemIco', { html: icon(ICONS[i]) }),
        el('span.sec__itemT', { text: it }),
      ]));
    });
    root.appendChild(grid);

    const foot = el('div.sec__foot');
    foot.appendChild(el('div.glass.sec__aiNote', { html: `${icon('shield', 16)}<span>${t('s13.aiNote')}</span>` }));
    foot.appendChild(el('p.sec__note', { text: t('s13.note') }));
    root.appendChild(foot);
    return root;
  },
};
