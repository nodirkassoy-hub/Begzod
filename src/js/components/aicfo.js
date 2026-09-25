/* ============================================================
   BALANS AI — AI CFO CHAT COMPONENT
   Scripted demo + permission-aware interactive Q&A.
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { AI_QA, AI_QA_TEXT } from '../data/demo.js';
import { areaChart, barChart, rankBars, forecastChart, donut } from './chart.js';
import { costStructure, series, MONTHS, topProducts, topCustomers, cashForecast } from '../data/demo.js';
import { el, badge } from './ui.js';

const TAG_CLASS = { FACT: 'fact', ESTIMATE: 'est', RECOMMENDATION: 'rec' };
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function tagHtml(tag) {
  if (!tag) return '';
  const cls = TAG_CLASS[tag] || 'nodata';
  return `<span class="tag tag--${cls}">${tag}</span>`;
}

function msgEl(role, text, tag) {
  const m = el(`div.msg.msg--${role}`);
  const lines = String(text).split('\n');
  const body = lines.map((l, i) => `${i ? '<br>' : ''}${l.replace(/^•\s*/, '<span style="color:var(--accent-soft)">•</span> ')}`).join('');
  m.appendChild(el(`div.msg__bubble`, { html: body }));
  m.appendChild(el('div.msg__meta', { html: tagHtml(tag) }));
  return m;
}

function typingEl() {
  return el('div.msg.msg--ai', null, el('div.msg__bubble', { html: `<span class="typing"><i></i><i></i><i></i></span>` }));
}

/* ---------- chart payloads for AI answers ---------- */
function renderAnswerChart(host, kind) {
  if (!kind) { host.style.display = 'none'; return; }
  host.style.display = '';
  switch (kind) {
    case 'cashflow':
      forecastChart(host, cashForecast, { w: 380, h: 130, labels: MONTHS.slice(0, 6) });
      break;
    case 'expense':
      barChart(host, [
        { v: 706, k: 'Xomashyo' }, { v: 286, k: 'Ish haqi' }, { v: 168, k: 'Uskuna' }, { v: 108, k: 'Energiya' }, { v: 94, k: 'Boshqa' },
      ], { w: 380, h: 130, labels: ['Xomashyo', 'Ish haqi', 'Uskuna', 'Energiya', 'Boshqa'] });
      break;
    case 'receivables':
      rankBars(host, [
        { k: 'OOO Texnogroup', v: 42, label: '42 mln', color: 'var(--neg)' },
        { k: 'IP Karimov', v: 26, label: '26 mln', color: 'var(--warn)' },
        { k: 'AO Mega Stroy', v: 16, label: '16 mln', color: 'var(--warn)' },
      ]);
      break;
    case 'product':
      rankBars(host, topProducts.slice(0, 4));
      break;
    case 'cost':
      donut(host, costStructure, { size: 130, thick: 13 });
      break;
    case 'supplier':
      rankBars(host, [
        { k: 'IP Aliev', v: 284, label: '284 mln' },
        { k: 'OOO Metall Plus', v: 218, label: '218 mln' },
        { k: 'Sinonim Trade', v: 172, label: '172 mln' },
      ]);
      break;
    default:
      areaChart(host, [{ data: series.revenue, color: 'var(--neutral)' }], { w: 380, h: 130, labels: MONTHS, area: true });
  }
}

/* ============================================================
   Resolve a question for a role
   ============================================================ */
export function resolve(roleKey, qaKey) {
  const item = AI_QA.find((q) => q.q === qaKey);
  if (!item) return { denied: false, noData: true };
  if (item.perm && !item.perm.includes(roleKey)) return { denied: true };
  if (item.data === false) return { noData: true };
  return { tag: item.tag, text: item.a, chart: item.chart };
}

function qaText(qaKey) {
  const code = t('meta.code');
  const e = AI_QA_TEXT[qaKey];
  if (!e) return { q: qaKey, a: '' };
  return e[code] || e.uz || e.en;
}

/* ============================================================
   CHAT WINDOW
   opts: { role, script, suggestions, interactive, showInput }
   ============================================================ */
export function aicfo(opts = {}) {
  const role = opts.role || 'CEO';
  const root = el('div.chatwrap');
  const chat = el('div.chat');

  /* head */
  const head = el('div.chat__head');
  head.appendChild(el('div.chat__ava', { html: icon('ai') }));
  head.appendChild(el('div', null, [
    el('div.chat__name', { text: t('s07.chatTitle') }),
    el('div.chat__stat', { html: `<i></i>${t('s07.chatStatus')}` }),
  ]));
  head.appendChild(el('div', { style: { marginLeft: 'auto' } }, badge(t('app.demoData'), 'demo')));
  chat.appendChild(head);

  /* log */
  const log = el('div.chat__log');
  chat.appendChild(log);

  /* input (decorative) */
  if (opts.showInput !== false) {
    const input = el('div.chat__input');
    input.appendChild(el('div.chat__field', { text: t('s07.placeholder') }));
    input.appendChild(el('div.chat__send', { html: icon('send') }));
    chat.appendChild(input);
  }
  root.appendChild(chat);

  /* suggestions */
  let suggHost = null;
  if (opts.interactive) {
    suggHost = el('div.sugg', { style: { marginTop: '10px' } });
    root.appendChild(suggHost);
  }

  /* ---------- api ---------- */
  const api = {
    root,
    log,
    scroll() { log.scrollTop = log.scrollHeight; },
    push(roleName, text, tag) {
      log.appendChild(msgEl(roleName, text, tag));
      api.scroll();
    },
    async type(roleName, text, tag, wait) {
      const tp = typingEl();
      log.appendChild(tp);
      api.scroll();
      await delay(wait || 620);
      tp.remove();
      api.push(roleName, text, tag);
    },
    async ask(qaKey) {
      const { q, a } = qaText(qaKey);
      api.push('user', q);
      await delay(240);
      const r = resolve(role, qaKey);
      if (r.denied) { await api.type('ai', t('s07.denied'), 'DENIED', 760); return; }
      if (r.noData) { await api.type('ai', t('s07.noData'), 'NO DATA', 760); return; }
      const tp = typingEl();
      log.appendChild(tp); api.scroll();
      await delay(760);
      tp.remove();
      const m = msgEl('ai', a, r.tag);
      if (r.chart) m.classList.add('msg--chart');
      if (r.chart) {
        const ch = el('div.aichart');
        m.querySelector('.msg__bubble').appendChild(ch);
        log.appendChild(m);
        renderAnswerChart(ch, r.chart);
      } else {
        log.appendChild(m);
      }
      api.scroll();
    },
    setSuggestions(list) {
      if (!suggHost) return;
      suggHost.innerHTML = '';
      list.forEach((k) => {
        const { q } = qaText(k);
        suggHost.appendChild(el('button.sugg__btn', { type: 'button', text: q, onclick: () => api.ask(k) }));
      });
    },
    clear() { log.innerHTML = ''; },
  };

  /* ---------- scripted playback ---------- */
  if (opts.script && opts.script.length) {
    (async () => {
      for (const step of opts.script) {
        if (step.role === 'user') { await delay(420); api.push('user', step.text); await delay(320); }
        else {
          const tp = typingEl(); log.appendChild(tp); api.scroll();
          await delay(760);
          tp.remove();
          const m = msgEl('ai', step.text, step.tag);
          if (step.chart) m.classList.add('msg--chart');
          if (step.chart) {
            const ch = el('div.aichart');
            m.querySelector('.msg__bubble').appendChild(ch);
            log.appendChild(m);
            renderAnswerChart(ch, 'cashflow');
          } else log.appendChild(m);
          api.scroll();
          await delay(420);
        }
      }
    })();
  }

  if (opts.suggestions) api.setSuggestions(opts.suggestions);
  return api;
}

/* ============================================================
   RULES SIDE CARD (FACT / ESTIMATE / RECOMMENDATION)
   ============================================================ */
export function aiRulesCard() {
  const card = el('div.glass.glass--pad.aicfo__rules');
  card.appendChild(el('div.label', { text: t('s07.rulesTitle'), style: { marginBottom: '10px' } }));
  const list = el('div', { style: { display: 'grid', gap: '8px' } });
  t('s07.rules').forEach((r) => {
    list.appendChild(el('div.bullet', { html: `${icon('check', 14)}<span>${r}</span>` }));
  });
  card.appendChild(list);
  return card;
}

export function tagLegend(items) {
  const w = el('div', { style: { display: 'grid', gap: '8px' } });
  items.forEach((it) => {
    w.appendChild(el('div.hstack', { style: { alignItems: 'flex-start', gap: '10px' } }, [
      el('span.tag.tag--' + (it.t === 'FACT' ? 'fact' : it.t === 'ESTIMATE' ? 'est' : 'rec'), { text: it.t, style: { marginTop: '2px', flex: '0 0 auto' } }),
      el('span', { text: it.d, style: { fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.45' } }),
    ]));
  });
  return w;
}
