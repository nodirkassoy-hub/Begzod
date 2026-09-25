/* ============================================================
   SLIDE 14 — DOCUMENTS & APPROVALS
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';

export default {
  id: 'documents',
  section: 's7',
  label: () => t('s14.title'),
  desc: () => t('s14.flowDesc'),
  render() {
    const root = el('div.docs');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s14.eyebrow') }),
      el('h2.s-title', { html: t('s14.title') }),
      el('p.s-sub', { text: t('s14.sub') }),
    ]));

    const body = el('div.docs__body');

    /* ---- left: document types ---- */
    const left = el('div.docs__left');
    const types = el('div.glass.docs__types');
    types.appendChild(el('div.panel__head', null, [el('div.panel__title', { text: t('s14.center') })]));
    const gl = el('div.docs__typeGrid');
    t('s14.docs').forEach((d, i) => {
      gl.appendChild(el('div.docs__type', { dataset: { d: String((i % 5) + 1) } }, [
        el('span.docs__typeIco', { html: icon('file', 13) }),
        el('span', { text: d }),
      ]));
    });
    types.appendChild(el('div.panel__body.scrolly', null, gl));
    left.appendChild(types);

    /* ---- workflow ---- */
    const flow = el('div.glass.docs__flow');
    flow.appendChild(el('div.panel__head', null, [el('div.panel__title', { text: t('s14.center') })]));
    const steps = el('div.docs__steps');
    t('s14.flow').forEach((s, i) => {
      steps.appendChild(el('div.docs__step', { dataset: { d: String(i + 1) } }, [
        el('div.docs__stepN', { text: '0' + (i + 1) }),
        el('div.docs__stepT', { text: s }),
      ]));
      if (i < t('s14.flow').length - 1) steps.appendChild(el('div.docs__stepArrow', { html: icon('arrowR', 14) }));
    });
    steps.appendChild(el('p.docs__flowDesc', { text: t('s14.flowDesc') }));
    flow.appendChild(el('div.panel__body', null, steps));
    left.appendChild(flow);
    body.appendChild(left);

    /* ---- right: centre cards ---- */
    const right = el('div.docs__right');
    t('s14.centerItems').forEach((c, i) => {
      right.appendChild(el('div.glass.glass--hi.docs__card', { dataset: { d: String(i + 1) } }, [
        el('div.ico' + (i === 1 ? '.ico--mint' : i === 2 ? '.ico--violet' : ''), { html: icon(['files', 'flow', 'checkCircle'][i]) }),
        el('div', null, [
          el('div.docs__cardT', { text: c.t }),
          el('div.docs__cardD', { text: c.d }),
        ]),
      ]));
    });
    const preview = el('div.glass.docs__preview');
    preview.appendChild(el('div.panel__head', null, [
      el('div.panel__title', { text: t('s14.docs.0') }),
      el('span.chip.chip--warn', { text: t('s14.flow.2') }),
    ]));
    preview.appendChild(el('div.panel__body', null, el('div.docs__previewBody', {
      html: `
        <div class="docs__pvRow"><span>${t('s14.docs.0')} #4820</span><b>128 mln</b></div>
        <div class="docs__pvRow"><span>${t('s14.docs.1')}</span><b>OOO Texnogroup</b></div>
        <div class="docs__pvRow"><span>${t('s14.flow.1')}</span><b class="docs__pvOk">${t('s14.flow.2')}</b></div>
        <div class="docs__pvRow"><span>${t('s14.flow.3')}</span><b>16:40 \u00b7 admin</b></div>`,
    })));
    right.appendChild(preview);
    body.appendChild(right);

    root.appendChild(body);
    return root;
  },
};
