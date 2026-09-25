/* ============================================================
   SLIDE 17 — WHO IS IT FOR?
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';

const IND_ICONS = ['cart', 'truck', 'factory', 'layers', 'brief', 'users', 'ext', 'db'];
const USER_ICONS = ['brief', 'coin', 'scale', 'cart', 'box', 'users', 'factory'];

export default {
  id: 'audience',
  section: 's8',
  label: () => t('s17.title'),
  desc: () => t('s17.sub'),
  render() {
    const root = el('div.aud');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s17.eyebrow') }),
      el('h2.s-title', { html: t('s17.title') }),
      el('p.s-sub', { text: t('s17.sub') }),
    ]));

    const body = el('div.aud__body');

    /* industries */
    const left = el('div.aud__col');
    left.appendChild(el('div.label', { text: t('s17.indsTitle'), style: { marginBottom: '10px' } }));
    const ig = el('div.aud__grid');
    t('s17.inds').forEach((s, i) => {
      ig.appendChild(el('div.glass.glass--hi.aud__card', { dataset: { d: String((i % 5) + 1) } }, [
        el('div.ico.ico--sm' + (i % 3 === 1 ? '.ico--mint' : i % 3 === 2 ? '.ico--violet' : ''), { html: icon(IND_ICONS[i]) }),
        el('span.aud__cardT', { text: s }),
      ]));
    });
    left.appendChild(ig);
    body.appendChild(left);

    /* roles */
    const right = el('div.aud__col');
    right.appendChild(el('div.label', { text: t('s17.usersTitle'), style: { marginBottom: '10px' } }));
    const ug = el('div.aud__grid');
    t('s17.users').forEach((s, i) => {
      ug.appendChild(el('div.glass.glass--hi.aud__card.aud__card--user', { dataset: { d: String((i % 5) + 1) } }, [
        el('div.ico.ico--sm.ico--violet', { html: icon(USER_ICONS[i]) }),
        el('span.aud__cardT', { text: s }),
      ]));
    });
    right.appendChild(ug);
    body.appendChild(right);

    root.appendChild(body);
    return root;
  },
};
