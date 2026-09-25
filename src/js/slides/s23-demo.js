/* ============================================================
   SLIDE 23 — INTERACTIVE DEMO (roles + AI CFO)
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { AI_QA, AI_QA_TEXT } from '../data/demo.js';
import { el, badge } from '../components/ui.js';
import { roleDashboard, roleSwitcher, ROLE_LABEL } from '../components/dashboard.js';
import { aicfo, aiRulesCard } from '../components/aicfo.js';

let active = 'CEO';

export default {
  id: 'demo',
  section: 's12',
  label: () => t('s23.title'),
  desc: () => t('s23.demoNote'),
  render() {
    const root = el('div.demo');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s23.eyebrow') }),
      el('h2.s-title', { html: t('s23.title') }),
      el('p.s-sub', { text: t('s23.sub') }),
    ]));

    const body = el('div.demo__body');

    /* ---------- left: role dashboard ---------- */
    const left = el('div.demo__left');
    const ctrl = el('div.demo__ctrl');
    ctrl.appendChild(el('span.demo__ctrlLabel', { text: t('s23.roleLabel') }));
    const swHost = el('div.demo__swHost');
    ctrl.appendChild(swHost);
    ctrl.appendChild(el('div', { style: { marginLeft: 'auto' } }, badge(t('s23.demoBanner'), 'demo')));
    left.appendChild(ctrl);

    const dashHost = el('div.demo__dash');
    left.appendChild(dashHost);
    body.appendChild(left);

    /* ---------- right: AI CFO ---------- */
    const right = el('div.demo__right');
    right.appendChild(el('div.label', { text: t('s23.aiLabel'), style: { marginBottom: '8px' } }));
    const chatHost = el('div.demo__chat');
    right.appendChild(chatHost);

    const suggCard = el('div.glass.glass--pad.demo__sugg');
    suggCard.appendChild(el('div.label', { text: t('s23.quick'), style: { marginBottom: '8px' } }));
    const suggRow = el('div.sugg');
    suggCard.appendChild(suggRow);
    right.appendChild(suggCard);
    right.appendChild(aiRulesCard());
    body.appendChild(right);

    root.appendChild(body);

    let chat = null;

    function buildChat() {
      chatHost.innerHTML = '';
      chat = aicfo({
        role: active,
        interactive: true,
        showInput: true,
      });
      chatHost.appendChild(chat.root);
    }

    function suggestionsFor(role) {
      const permitted = AI_QA.filter((q) => (!q.perm || q.perm.includes(role)) && q.data !== false);
      const denied = AI_QA.filter((q) => q.perm && !q.perm.includes(role));
      const noData = AI_QA.filter((q) => q.data === false);
      const list = permitted.slice(0, 3).map((q) => q.q);
      /* always surface the "not enough data" reply and one question the role
         may NOT answer, so both boundaries are visible in the demo */
      if (noData.length) list.push(noData[0].q);
      if (denied.length) list.push(denied[0].q);
      return list;
    }

    function isRestricted(role, key) {
      const q = AI_QA.find((x) => x.q === key);
      return !!(q && q.perm && !q.perm.includes(role));
    }

    function refresh() {
      swHost.innerHTML = '';
      swHost.appendChild(roleSwitcher(active, (k) => { active = k; refresh(); },
        ['CEO', 'ACCOUNTANT', 'SALES', 'WAREHOUSE', 'PRODUCTION']));
      dashHost.innerHTML = '';
      dashHost.appendChild(roleDashboard(active));
      buildChat();
      suggRow.innerHTML = '';
      suggestionsFor(active).forEach((k) => {
        const locked = isRestricted(active, k);
        suggRow.appendChild(el(`button.sugg__btn${locked ? '.sugg__btn--locked' : ''}`, {
          type: 'button',
          html: `${locked ? icon('lock', 11) : ''}<span>${questionText(k)}</span>`,
          title: locked ? t('s07.denied') : '',
          onclick: () => chat && chat.ask(k),
        }));
      });
    }

    function questionText(k) {
      const code = t('meta.code');
      const e = require_text(k);
      return (e && (e[code] || e.uz || e.en).q) || k;
    }
    function require_text(k) {
      // lazy import to avoid a cycle
      return TEXT[k];
    }

    refresh();
    return root;
  },
};

/* question texts (shared with the AI CFO component) */
const TEXT = AI_QA_TEXT;
