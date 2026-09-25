/* ============================================================
   SLIDE 03 — THE SOLUTION (hub & spokes)
   ============================================================ */

import { icon } from '../icons.js';
import { t } from '../i18n/index.js';
import { el } from '../components/ui.js';

const MOD_ICONS = ['scale', 'cart', 'brief', 'box', 'truck', 'factory', 'users', 'files', 'percent', 'ai'];

export default {
  id: 'solution',
  section: 's2',
  label: () => t('s03.title'),
  desc: () => t('s03.msg.0'),
  render() {
    const root = el('div.sol');

    root.appendChild(el('div.s-head', null, [
      el('div.s-eyebrow', { text: t('s03.eyebrow') }),
      el('h2.s-title', { html: t('s03.title').replace(/(YAGONA RAQAMLI MARKAZI|SINGLE DIGITAL CENTRE|ЕДИНЫЙ ЦИФРОВОЙ ЦЕНТР)/, '<em>$1</em>') }),
      el('p.s-sub', { text: t('s03.sub') }),
    ]));

    const body = el('div.sol__body');

    /* ---------- radial diagram ---------- */
    const stage = el('div.sol__stage');
    const inner = el('div.sol__inner');
    const W = 470, H = 470, CX = W / 2, CY = H / 2, R = 178;
    const mods = t('s03.mods');

    const svgWrap = el('div.sol__wires');
    let paths = '';
    mods.forEach((m, i) => {
      const a = (-90 + (360 / mods.length) * i) * (Math.PI / 180);
      const x = CX + Math.cos(a) * R, y = CY + Math.sin(a) * R;
      const mx = CX + Math.cos(a) * 62, my = CY + Math.sin(a) * 62;
      paths += `<path d="M${CX} ${CY} Q${mx} ${my} ${x.toFixed(1)} ${y.toFixed(1)}" stroke="url(#solG)" stroke-width="1.4" opacity=".55" style="--i:${i}"/>`;
    });
    svgWrap.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" width="${W}" height="${H}">
      <defs><linearGradient id="solG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="var(--accent-3)" stop-opacity=".9"/>
        <stop offset="1" stop-color="var(--accent)" stop-opacity=".25"/>
      </linearGradient></defs>${paths}</svg>`;
    inner.appendChild(svgWrap);

    const hub = el('div.sol__hub');
    hub.innerHTML = `${icon('layers', 22)}<b>${t('s03.hub')}</b><span>${t('s03.hubSub')}</span>`;
    inner.appendChild(hub);

    mods.forEach((m, i) => {
      const a = (-90 + (360 / mods.length) * i) * (Math.PI / 180);
      const x = CX + Math.cos(a) * R, y = CY + Math.sin(a) * R;
      inner.appendChild(el('div.sol__node', {
        dataset: { d: String((i % 5) + 1) },
        style: { left: x + 'px', top: y + 'px' },
      }, [
        el('span.sol__nodeIco', { html: icon(MOD_ICONS[i] || 'check', 14) }),
        el('span', { text: m }),
      ]));
    });

    stage.appendChild(inner);
    const diagWrap = el('div.sol__diag');
    diagWrap.appendChild(stage);
    body.appendChild(diagWrap);

    /* ---------- right: message ---------- */
    const right = el('div.sol__right');
    const msgCard = el('div.glass.glass--pad.sol__msg');
    t('s03.msg').forEach((m, i) => {
      msgCard.appendChild(el('div.sol__msgLine', { dataset: { d: String(i + 1) } }, [
        el('span.sol__msgNum', { text: '0' + (i + 1) }),
        el('span.sol__msgTxt', { text: m }),
      ]));
    });
    msgCard.appendChild(el('div.divider', { style: { margin: '12px 0' } }));
    msgCard.appendChild(el('p.sol__msgSub', { text: t('s03.msgSub') }));
    right.appendChild(msgCard);

    const conv = el('div.glass.glass--pad.sol__conv');
    conv.appendChild(el('div.label', { text: t('s03.eyebrow'), style: { marginBottom: '9px' } }));
    conv.appendChild(el('div.sol__convFlow', null,
      ['Excel', 'Telegram', 'CRM', 'Ombor'].map((s) => el('span.chip', { text: s }))
        .concat([el('span.sol__convArrow', { html: icon('arrowR', 13) })])
        .concat([el('span.chip.chip--accent', { text: t('s03.hub') })])
    ));
    right.appendChild(conv);
    body.appendChild(right);

    root.appendChild(body);
    return root;
  },
};
