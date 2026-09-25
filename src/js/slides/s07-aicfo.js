/* ============================================================
   SLIDE 07 — AI CFO
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';
import { aicfo, aiRulesCard } from '../components/aicfo.js';

export default {
  id: 'aicfo',
  section: 's4',
  label: () => t('s07.title'),
  desc: () => t('s07.rulesTitle'),
  render() {
    const root = el('div.cfo');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s07.eyebrow') }),
      el('h2.s-title', { html: t('s07.title').replace(/(YOKI ULARNI SO\u02bbRANG|OR JUST ASK|ИЛИ ПРОСТО СПРОСИТЕ)/, '<em>$1</em>') }),
      el('p.s-sub', { text: t('s07.sub') }),
    ]));

    const body = el('div.cfo__body');

    /* chat */
    const chatCol = el('div.cfo__chat');
    chatCol.appendChild(aicfo({ role: 'CEO', script: t('s07.script'), showInput: true }).root);
    body.appendChild(chatCol);

    /* right rail */
    const rail = el('div.cfo__rail');
    rail.appendChild(aiRulesCard());

    const sugg = el('div.glass.glass--pad.cfo__sugg');
    sugg.appendChild(el('div.label', { text: t('s07.ask'), style: { marginBottom: '9px' } }));
    const row = el('div.sugg');
    t('s07.suggestions').forEach((s) => row.appendChild(el('button.sugg__btn', { type: 'button', text: s })));
    sugg.appendChild(row);
    rail.appendChild(sugg);
    body.appendChild(rail);

    root.appendChild(body);
    return root;
  },
};
