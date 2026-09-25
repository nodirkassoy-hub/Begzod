/* ============================================================
   SLIDE 19 — BUSINESS MODEL / PRICING
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el, badge } from '../components/ui.js';

export default {
  id: 'model',
  section: 's9',
  label: () => t('s19.title'),
  desc: () => t('s19.trial'),
  render() {
    const root = el('div.price');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s19.eyebrow') }),
      el('h2.s-title', { html: t('s19.title') }),
      el('p.s-sub', { text: t('s19.sub') }),
    ]));

    /* trial banner */
    const trial = el('div.glass.glass--lg.price__trial');
    trial.appendChild(el('div.price__trialIco', { html: icon('clock') }));
    trial.appendChild(el('div', null, [
      el('div.price__trialT', { text: t('s19.trial') }),
      el('p.price__trialD', { text: t('s19.trialNote') }),
    ]));
    trial.appendChild(el('div.price__trialTag', { text: '30 \u00d7 24' }));
    root.appendChild(trial);

    /* plans */
    const grid = el('div.price__grid');
    t('s19.plans').forEach((p, i) => {
      const card = el('div.glass.glass--lg.price__card' + (p.best ? '.is-best' : ''), { dataset: { d: String(i + 1) } });
      if (p.best) card.appendChild(el('div.price__bestTag', { text: '\u2713' }));
      card.appendChild(el('div.price__planName', { text: p.t }));
      card.appendChild(el('div.price__price', { html: `${p.p}<small>${p.u}</small>` }));
      card.appendChild(el('div.price__planDesc', { text: p.d }));
      card.appendChild(el('div.divider'));
      const cl = el('div.price__caps');
      p.caps.forEach((c) => cl.appendChild(el('div.price__cap', { html: `${icon('check', 13)}<span>${c}</span>` })));
      card.appendChild(cl);
      grid.appendChild(card);
    });
    root.appendChild(grid);
    root.appendChild(el('p.price__annual', { html: `${icon('star', 13)}<span>${t('s19.annual')}</span>` }));

    /* states + payments */
    const foot = el('div.price__foot');
    const st = el('div.glass.price__states');
    st.appendChild(el('div.label', { text: t('s19.statesTitle'), style: { marginBottom: '9px' } }));
    const sw = el('div.price__stateWrap');
    t('s19.states').forEach((s, i) => {
      const tone = s === 'ACTIVE' ? 'pos' : s === 'PAST_DUE' || s === 'SUSPENDED' || s === 'EXPIRED' ? 'warn' : s === 'CANCELLED' ? 'neg' : 'accent';
      sw.appendChild(el(`span.chip.chip--${tone}`, { text: s }));
    });
    st.appendChild(sw);
    st.appendChild(el('p.price__statesNote', { text: t('s19.statesNote') }));
    foot.appendChild(st);

    const pay = el('div.glass.price__pay');
    pay.appendChild(el('div.label', { text: t('s19.payTitle'), style: { marginBottom: '9px' } }));
    const pw = el('div.price__payWrap');
    t('s19.pays').forEach((p) => pw.appendChild(el('span.chip', { html: `${icon('wallet', 12)}<span>${p}</span>` })));
    pay.appendChild(pw);
    pay.appendChild(el('p.price__payNote', { text: t('s19.payNote') }));
    foot.appendChild(pay);
    root.appendChild(foot);

    return root;
  },
};
