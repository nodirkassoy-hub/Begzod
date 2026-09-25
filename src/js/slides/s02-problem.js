/* ============================================================
   SLIDE 02 — THE PROBLEM
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el, badge } from '../components/ui.js';

export default {
  id: 'problem',
  section: 's1',
  label: () => t('s02.title'),
  desc: () => t('s02.fragLabel'),
  render() {
    const root = el('div.prob');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s02.eyebrow') }),
      el('h2.s-title', { html: t('s02.title').replace(/(MA\u02bbLUMOT YETISHMASLIGI EMAS|LACK OF DATA|НЕ НЕХВАТКА ДАННЫХ)/, '<em>$1</em>') }),
      el('p.s-sub', { text: t('s02.sub') }),
    ]));

    const body = el('div.prob__body');

    /* ---------- left: fragmented sources ---------- */
    const left = el('div.prob__left');
    const map = el('div.glass.prob__map');
    map.appendChild(el('div.prob__mapHead', null, [
      el('span.label', { text: t('s02.fragLabel') }),
      el('span.chip.chip--warn', { text: '9 \u00d7 ' + t('s02.sources.0') }),
    ]));

    const cloud = el('div.prob__cloud');
    t('s02.sources').forEach((s, i) => {
      cloud.appendChild(el(`span.prob__chip`, {
        dataset: { d: String((i % 5) + 1) },
        html: `${icon(i % 3 === 0 ? 'db' : i % 3 === 1 ? 'file' : 'users', 13)}<span>${s}</span>`,
      }));
    });
    map.appendChild(cloud);

    const warn = el('div.prob__warn');
    warn.appendChild(el('div.prob__warnIco', { html: icon('alert') }));
    warn.appendChild(el('div', null, [
      el('div.prob__warnT', { text: t('s02.fragLabel') }),
      el('div.prob__warnD', { text: t('s02.note') }),
    ]));
    map.appendChild(warn);
    left.appendChild(map);
    body.appendChild(left);

    /* ---------- right: problems ---------- */
    const right = el('div.prob__right');
    right.appendChild(el('div.label', { text: t('s02.problemsTitle'), style: { marginBottom: '10px' } }));
    const list = el('div.prob__list');
    t('s02.problems').forEach((p, i) => {
      list.appendChild(el('div.prob__item', { dataset: { d: String((i % 4) + 1) } }, [
        el('div.prob__n', { text: String(i + 1).padStart(2, '0') }),
        el('div.prob__t', { text: p }),
      ]));
    });
    right.appendChild(list);
    body.appendChild(right);

    root.appendChild(body);
    return root;
  },
};
