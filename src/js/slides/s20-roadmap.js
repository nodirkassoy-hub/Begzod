/* ============================================================
   SLIDE 20 — ROADMAP
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el, badge } from '../components/ui.js';

export default {
  id: 'roadmap',
  section: 's9',
  label: () => t('s20.title'),
  desc: () => t('s20.sub'),
  render() {
    const root = el('div.road');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s20.eyebrow') }),
      el('h2.s-title', { html: t('s20.title') }),
      el('p.s-sub', { text: t('s20.sub') }),
    ]));

    const legend = el('div.road__legend');
    legend.appendChild(el('span', null, badge(t('s20.legend.live'), 'live')));
    legend.appendChild(el('span', null, badge(t('s20.legend.dev'), 'dev')));
    legend.appendChild(el('span', null, badge(t('s20.legend.plan'), 'plan')));
    root.appendChild(legend);

    const grid = el('div.road__grid');
    t('s20.phases').forEach((p, i) => {
      const card = el(`div.glass.glass--lg.road__card.road__card--${p.st}`, { dataset: { d: String(i + 1) } });
      card.appendChild(el('div.road__glow'));
      const head = el('div.road__head');
      head.appendChild(el('div.road__n', { text: p.n }));
      head.appendChild(el('div', { style: { marginLeft: 'auto' } }, badge(t('s20.legend.' + p.st), p.st === 'live' ? 'live' : p.st === 'dev' ? 'dev' : 'plan')));
      card.appendChild(head);
      card.appendChild(el('h3.road__t', { text: p.t }));
      const list = el('div.road__list');
      p.items.forEach((it) => list.appendChild(el('div.road__item', { html: `${icon(it.length ? 'check' : 'check', 13)}<span>${it}</span>` })));
      card.appendChild(list);
      grid.appendChild(card);
    });
    root.appendChild(grid);

    const track = el('div.road__track');
    track.appendChild(el('i.road__trackFill'));
    root.appendChild(track);
    return root;
  },
};
