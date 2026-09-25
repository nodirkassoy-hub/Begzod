/* ============================================================
   SLIDE 11 — COMPETITIVE LANDSCAPE (neutral, factual)
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';

const expanded = new Set();

export default {
  id: 'competitive',
  section: 's6',
  label: () => t('s11.title'),
  desc: () => t('s11.note'),
  render() {
    const root = el('div.comp');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s11.eyebrow') }),
      el('h2.s-title', { html: t('s11.title') }),
      el('p.s-sub', { text: t('s11.sub') }),
    ]));

    const body = el('div.comp__body');

    const grid = el('div.comp__grid');
    t('s11.comps').forEach((c, i) => {
      const open = expanded.has(i);
      const card = el('div.glass.comp__card' + (open ? '.is-open' : ''), { dataset: { d: String((i % 5) + 1), i: i } });
      card.appendChild(el('div.comp__cardTop', null, [
        el('div.comp__logo', { text: c.n.slice(0, 2) }),
        el('div', null, [
          el('div.comp__name', { text: c.n }),
          el('div.comp__desc', { text: c.d }),
        ]),
      ]));
      const caps = el('div.comp__caps');
      c.caps.forEach((cp) => caps.appendChild(el('span.chip', { text: cp })));
      card.appendChild(caps);
      card.appendChild(el('button.comp__more', {
        type: 'button',
        html: `${icon(open ? 'chevD' : 'chevR', 12)}<span>${open ? t('app.close') : t('s11.cta')}</span>`,
        onclick: (e) => {
          e.stopPropagation();
          if (open) expanded.delete(i); else expanded.add(i);
          card.classList.toggle('is-open');
          card.querySelector('.comp__more').innerHTML = `${icon(expanded.has(i) ? 'chevD' : 'chevR', 12)}<span>${expanded.has(i) ? t('app.close') : t('s11.cta')}</span>`;
        },
      }));
      card.addEventListener('click', () => card.querySelector('.comp__more').click());
      grid.appendChild(card);
    });
    body.appendChild(grid);
    root.appendChild(body);

    /* BALANS differentiation band */
    const band = el('div.glass.glass--lg.comp__band');
    band.appendChild(el('div.comp__bandGlow'));
    const bl = el('div.comp__bandLeft');
    bl.appendChild(el('div.comp__bandTitle', { text: t('s11.balansTitle') }));
    bl.appendChild(el('p.comp__bandSub', { text: t('s11.balansSub') }));
    band.appendChild(bl);
    const chips = el('div.comp__bandChips');
    t('s11.balans').forEach((b, i) => {
      chips.appendChild(el('span.comp__bandChip', { dataset: { d: String((i % 5) + 1) } }, [
        el('span.comp__bandNum', { text: '0' + (i + 1) }),
        el('span', { text: b }),
      ]));
    });
    band.appendChild(chips);
    root.appendChild(band);

    root.appendChild(el('div.slide__foot', null, [
      el('span', { text: t('s11.note') }),
      el('span.chip.chip--plain', { text: t('s11.balansTitle') }),
    ]));
    return root;
  },
};
