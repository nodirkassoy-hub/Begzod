/* ============================================================
   SLIDE 10 — AI + MANUFACTURING
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';
import { aicfo, tagLegend } from '../components/aicfo.js';

export default {
  id: 'ai-mfg',
  section: 's5',
  label: () => t('s10.title'),
  desc: () => t('s10.sub'),
  render() {
    const root = el('div.aimfg');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s10.eyebrow') }),
      el('h2.s-title', { html: t('s10.title').replace(/(BIZNES KONTEKSTINI TUSHUNADI|UNDERSTANDS BUSINESS CONTEXT|ПОНИМАЕТ БИЗНЕС-КОНТЕКСТ)/, '<em>$1</em>') }),
      el('p.s-sub', { text: t('s10.sub') }),
    ]));

    const body = el('div.aimfg__body');

    const chatCol = el('div.aimfg__chat');
    chatCol.appendChild(aicfo({ role: 'PRODUCTION', script: t('s10.script'), showInput: true }).root);
    body.appendChild(chatCol);

    const rail = el('div.aimfg__rail');
    const labels = el('div.glass.glass--pad.aimfg__labels');
    labels.appendChild(el('div.label', { text: t('s10.eyebrow'), style: { marginBottom: '11px' } }));
    labels.appendChild(tagLegend(t('s10.labels')));
    rail.appendChild(labels);

    const ctx = el('div.glass.glass--pad.aimfg__ctx');
    ctx.appendChild(el('div.label', { text: t('s09.costTitle'), style: { marginBottom: '10px' } }));
    const chips = el('div.aimfg__ctxChips');
    ['Xomashyo narxi', 'Energiya', 'Brak', 'Ishchi kuchi', 'Iste\u02bcmol', 'Uskuna'].forEach((c, i) => {
      chips.appendChild(el('span.chip' + (i % 2 ? '.chip--accent' : ''), { text: c }));
    });
    ctx.appendChild(chips);
    rail.appendChild(ctx);
    body.appendChild(rail);

    root.appendChild(body);
    return root;
  },
};
