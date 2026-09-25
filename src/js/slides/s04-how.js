/* ============================================================
   SLIDE 04 — HOW BALANS AI WORKS (interactive flow)
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el, flowNode, flowArrow } from '../components/ui.js';

const KIND = {
  'Mijoz': 'start', 'Customer': 'start', '\u041a\u043b\u0438\u0435\u043d\u0442': 'start',
  'AI CFO': 'ai',
  'Xarid': 'start', 'Purchasing': 'start', '\u0417\u0430\u043a\u0443\u043f\u043a\u0430': 'start',
  'Foyda': 'end', 'Profit': 'end', '\u041f\u0440\u0438\u0431\u044b\u043b\u044c': 'end',
};

let tab = 0;
let nodes = [];

function buildChain(host, items, note) {
  host.innerHTML = '';
  nodes = [];
  const wrap = el('div.chain');
  items.forEach((label, i) => {
    const node = el('div.chain__node', { dataset: { d: String(Math.min(8, i + 1)) } }, [
      el('div.chain__ico', { html: icon(KIND[label] === 'ai' ? 'ai' : KIND[label] === 'start' ? 'play' : KIND[label] === 'end' ? 'target' : 'check', 15) }),
      el('div.chain__label', { text: label }),
    ]);
    node.classList.add('chain__node--' + (KIND[label] || 'mid'));
    host.appendChild(node);
    if (i < items.length - 1) {
      const ar = el('div.chain__arrow', { html: icon('arrowR', 15) });
      host.appendChild(ar);
    }
  });
}

export default {
  id: 'how',
  section: 's2',
  label: () => t('s04.title'),
  desc: () => t('s04.takeaway'),
  render() {
    const root = el('div.how');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s04.eyebrow') }),
      el('h2.s-title', { html: t('s04.title') }),
      el('p.s-sub', { text: t('s04.sub') }),
    ]));

    /* tabs */
    const tabs = el('div.tabs.how__tabs');
    t('s04.tabs').forEach((lb, i) => {
      tabs.appendChild(el(`button.tab${i === tab ? '.is-active' : ''}`, {
        type: 'button', text: lb, dataset: { tab: i },
        onclick: () => { tab = i; root.querySelectorAll('.tab').forEach((b, bi) => b.classList.toggle('is-active', bi === i)); draw(); },
      }));
    });
    root.appendChild(tabs);

    const body = el('div.how__body');

    /* chain */
    const chainCard = el('div.glass.how__chain');
    chainCard.appendChild(el('div.how__chainHead', null, [
      el('span.label', { text: t('s04.tabs')[tab] }),
      el('span.chip.chip--plain', { text: t('app.demoData') }),
    ]));
    const chainHost = el('div.how__chainHost');
    chainCard.appendChild(chainHost);
    body.appendChild(chainCard);

    /* right column */
    const right = el('div.how__right');
    const noteCard = el('div.glass.glass--pad.how__note');
    noteCard.appendChild(el('div.ico.ico--sm.ico--mint', { html: icon('zap') }));
    noteCard.appendChild(el('p.how__noteTxt', { text: '' }));
    right.appendChild(noteCard);

    const take = el('div.glass.glass--pad.how__take');
    take.appendChild(el('div.label', { text: t('s04.eyebrow') }));
    take.appendChild(el('p.how__takeTxt', { text: t('s04.takeaway') }));
    right.appendChild(take);
    body.appendChild(right);

    root.appendChild(body);

    function draw() {
      const flows = t('s04.flows');
      buildChain(chainHost, flows[tab], t('s04.stepNote')[tab]);
      noteCard.querySelector('.how__noteTxt').textContent = t('s04.stepNote')[tab];
      root.querySelectorAll('.tab').forEach((b, bi) => b.classList.toggle('is-active', bi === tab));
    }
    draw();

    return root;
  },
};
