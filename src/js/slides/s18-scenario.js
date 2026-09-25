/* ============================================================
   SLIDE 18 — ONE DAY OF BUSINESS (cinematic timeline)
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el, badge } from '../components/ui.js';

let cur = -1;
let timer = null;
let playing = false;

export default {
  id: 'scenario',
  section: 's8',
  label: () => t('s18.title'),
  desc: () => t('s18.aiTitle'),
  render() {
    const root = el('div.day');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s18.eyebrow') }),
      el('h2.s-title', { html: t('s18.title') }),
      el('p.s-sub', { text: t('s18.sub') }),
    ]));

    const body = el('div.day__body');

    /* ---------- timeline ---------- */
    const tl = el('div.day__tl');
    const rail = el('div.day__rail', null, el('i.day__railFill'));
    tl.appendChild(rail);
    const items = t('s18.steps');
    const nodeHost = el('div.day__items');
    items.forEach((s, i) => {
      const node = el('div.day__item', { dataset: { d: String((i % 5) + 1), i: i } }, [
        el('div.day__dot'),
        el('div.day__time', { text: s.t }),
        el('div.day__card', null, [
          el('div.day__h', { text: s.h }),
          el('div.day__d', { text: s.d }),
        ]),
      ]);
      node.addEventListener('click', () => { stop(); setCur(i); });
      nodeHost.appendChild(node);
    });
    tl.appendChild(nodeHost);
    body.appendChild(tl);

    /* ---------- right: AI answer ---------- */
    const right = el('div.day__right');
    const q = el('div.glass.day__q');
    q.appendChild(el('div.ico.ico--sm', { html: icon('brief') }));
    q.appendChild(el('div', null, [
      el('div.label', { text: t('s18.steps.8.t') }),
      el('p.day__qTxt', { text: t('s18.steps.8.d') }),
    ]));
    right.appendChild(q);

    const ans = el('div.glass.glass--lg.day__ans');
    ans.appendChild(el('div.day__ansHead', null, [
      el('div.ico.ico--sm.ico--mint', { html: icon('ai') }),
      el('div.panel__title', { text: t('s18.aiTitle') }),
      el('div', { style: { marginLeft: 'auto' } }, badge(t('app.demoData'), 'demo')),
    ]));
    const al = el('div.day__ansList');
    t('s18.aiItems').forEach((a, i) => {
      al.appendChild(el('div.day__ansItem', { dataset: { d: String(i + 1) } }, [
        el('span.day__ansIco', { html: icon(['wallet', 'alert', 'calc', 'up'][i], 14) }),
        el('span', { text: a }),
      ]));
    });
    ans.appendChild(el('div.panel__body.scrolly', null, al));
    right.appendChild(ans);

    const ctrl = el('div.day__ctrl');
    const playBtn = el('button.btn.btn--primary.btn--sm', { html: `${icon('play')}<span>${t('s18.play')}</span>` });
    playBtn.addEventListener('click', () => (playing ? stop() : play()));
    ctrl.appendChild(playBtn);
    right.appendChild(ctrl);
    body.appendChild(right);

    root.appendChild(body);
    root.appendChild(el('div.slide__foot', null, [el('span', { text: t('s18.demoNote') })]));

    function setCur(i) {
      cur = i;
      root.querySelectorAll('.day__item').forEach((n, ni) => {
        n.classList.toggle('is-active', ni === i);
        n.classList.toggle('is-past', ni < i);
      });
      const fill = root.querySelector('.day__railFill');
      const items2 = root.querySelectorAll('.day__item');
      if (fill && items2.length) {
        const a = items2[i], b = items2[items2.length - 1];
        fill.style.height = ((a.offsetTop + a.offsetHeight / 2) / (b.offsetTop + b.offsetHeight / 2)) * 100 + '%';
      }
      const ansEl = root.querySelector('.day__ans');
      ansEl.classList.toggle('is-on', i >= items.length - 2);
      root.querySelectorAll('.day__ansItem').forEach((n, ni) => n.classList.toggle('is-on', i >= items.length - 1));
    }
    function play() {
      playing = true;
      playBtn.innerHTML = `${icon('pause')}<span>${t('s18.pause')}</span>`;
      setCur(cur < 0 ? 0 : cur);
      timer = setInterval(() => {
        if (cur >= items.length - 1) { stop(); return; }
        setCur(cur + 1);
      }, 1500);
    }
    function stop() {
      playing = false;
      if (timer) clearInterval(timer);
      timer = null;
      playBtn.innerHTML = `${icon('play')}<span>${cur >= items.length - 1 ? t('s18.replay') : t('s18.play')}</span>`;
    }
    root._setCur = setCur;
    root._stop = stop;

    setCur(0);
    return root;
  },
  onEnter() {
    const n = document.querySelector('.slide--scenario');
    if (n && n._stop) n._stop();
    if (n && n._setCur) n._setCur(0);
  },
};
