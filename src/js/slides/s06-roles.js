/* ============================================================
   SLIDE 06 — ROLE-BASED EXPERIENCE
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';
import { roleDashboard, roleSwitcher, permCard, ROLE_LABEL } from '../components/dashboard.js';

let active = 'CEO';

export default {
  id: 'roles',
  section: 's3',
  label: () => t('s06.title'),
  desc: () => t('s06.sub'),
  render() {
    const root = el('div.roles6');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s06.eyebrow') }),
      el('h2.s-title', { html: t('s06.title').replace(/(FAQAT O\u02bbZIGA KERAKLI MA\u02bbLUMOTNI KO\u02bbRADI|ONLY WHAT THEY NEED|ТОЛЬКО НУЖНОЕ ЕМУ)/, '<em>$1</em>') }),
      el('p.s-sub', { text: t('s06.sub') }),
    ]));

    const body = el('div.roles6__body');

    /* ---- left: switcher + permissions ---- */
    const left = el('div.roles6__left');
    left.appendChild(el('div.label', { text: t('s06.switchLabel'), style: { marginBottom: '8px' } }));
    const sw = el('div.roles6__switcher');
    const switcher = roleSwitcher(active, (k) => { active = k; refresh(); });
    sw.appendChild(switcher);
    left.appendChild(sw);

    const permHost = el('div.roles6__perm');
    left.appendChild(permHost);
    body.appendChild(left);

    /* ---- right: dashboard ---- */
    const right = el('div.roles6__right');
    const dashHost = el('div.roles6__dash');
    right.appendChild(dashHost);
    body.appendChild(right);

    root.appendChild(body);

    function refresh() {
      sw.querySelectorAll('.role').forEach((b) => b.classList.toggle('is-active', b.dataset.role === active));
      permHost.innerHTML = '';
      permHost.appendChild(permCard(active));
      dashHost.innerHTML = '';
      dashHost.appendChild(roleDashboard(active));
    }
    refresh();

    return root;
  },
};
