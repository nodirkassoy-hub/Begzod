/* ============================================================
   SLIDE 22 — FINAL
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';

export default {
  id: 'final',
  section: 's11',
  label: () => t('s22.title'),
  desc: () => t('s22.sub'),
  render() {
    const root = el('div.fin');

    root.appendChild(el('div.fin__aura'));
    root.appendChild(el('div.fin__grid-lines'));

    const inner = el('div.fin__inner');
    inner.appendChild(el('div.fin__label.rv', { html: `<i></i>${t('s22.label')}` }));
    inner.appendChild(el('h2.fin__title.rv', { dataset: { d: '1' }, text: t('s22.title') }));

    const big = el('div.fin__big.rv', { dataset: { d: '2' } });
    big.innerHTML = `<span class="fin__bigTxt">${t('s22.big')}</span><span class="fin__bigAi">AI</span>`;
    inner.appendChild(big);

    inner.appendChild(el('p.fin__sub.rv', { dataset: { d: '3' }, text: t('s22.sub') }));

    const ctas = el('div.fin__ctas.rv', { dataset: { d: '4' } });
    ctas.appendChild(el('button.btn.btn--primary', {
      html: `${icon('zap')}<span>${t('s22.cta1')}</span>`,
      onclick: () => window.__deck && window.__deck.go(18),
    }));
    ctas.appendChild(el('button.btn', {
      html: `${icon('play')}<span>${t('s22.cta2')}</span>`,
      onclick: () => window.__deck && window.__deck.go(22),
    }));
    inner.appendChild(ctas);

    inner.appendChild(el('div.fin__mods.rv', { dataset: { d: '5' }, text: t('s22.mods') }));
    root.appendChild(inner);
    return root;
  },
};
