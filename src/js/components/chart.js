/* ============================================================
   BALANS AI — SVG CHART ENGINE
   Zero-dependency, viewBox-scaled, CSS-animated.
   ============================================================ */

const NS = 'http://www.w3.org/2000/svg';
let uid = 0;
const nid = (p) => `${p}${++uid}`;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------- geometry helpers ---------- */
function niceMax(v) {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / mag;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * mag;
}

function scaleLin(v, d0, d1, r0, r1) {
  if (d1 === d0) return r0;
  return r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
}

/** Catmull-Rom → cubic bezier smooth path. */
function smoothPath(pts) {
  if (!pts.length) return '';
  if (pts.length < 3) return pts.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ');
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(2)} ${c1y.toFixed(2)},${c2x.toFixed(2)} ${c2y.toFixed(2)},${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

function linePath(pts) {
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ');
}

/* ============================================================
   AREA / LINE CHART
   ============================================================ */
export function areaChart(el, series, opts = {}) {
  const o = Object.assign({
    w: 640, h: 260, pad: { t: 16, r: 12, b: 26, l: 40 },
    labels: [], area: true, dots: false, grid: true, animate: true,
    yFmt: (v) => v, legend: true, valueFmt: (v) => v,
  }, opts);
  if (!el) return;

  const all = series.flatMap((s) => s.data);
  const max = niceMax(Math.max(...all, 1) * 1.12);
  const min = Math.min(0, ...all);
  const iw = o.w - o.pad.l - o.pad.r;
  const ih = o.h - o.pad.t - o.pad.b;
  const n = series[0].data.length;

  const X = (i) => o.pad.l + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
  const Y = (v) => o.pad.t + ih - scaleLin(v, min, max, 0, ih);

  const gid = nid('ag');
  let svg = `<svg viewBox="0 0 ${o.w} ${o.h}" class="chart chart--area" preserveAspectRatio="none" role="img">`;
  svg += `<defs>`;
  series.forEach((s, si) => {
    svg += `<linearGradient id="${gid}g${si}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${s.color}" stop-opacity="${o.area ? .34 : 0}"/>
      <stop offset="1" stop-color="${s.color}" stop-opacity="0"/></linearGradient>`;
  });
  svg += `</defs>`;

  if (o.grid) {
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const v = min + ((max - min) / steps) * i;
      const y = Y(v).toFixed(1);
      svg += `<line x1="${o.pad.l}" y1="${y}" x2="${o.w - o.pad.r}" y2="${y}" class="chart__grid"/>`;
      svg += `<text x="${o.pad.l - 8}" y="${+y + 3.5}" class="chart__ylab" text-anchor="end">${esc(o.yFmt(v))}</text>`;
    }
  }

  o.labels.forEach((l, i) => {
    if (i % Math.ceil(n / 8) === 0 || i === n - 1) {
      svg += `<text x="${X(i).toFixed(1)}" y="${o.h - 6}" class="chart__xlab" text-anchor="middle">${esc(l)}</text>`;
    }
  });

  series.forEach((s, si) => {
    const pts = s.data.map((v, i) => ({ x: X(i), y: Y(v) }));
    const line = smoothPath(pts);
    if (o.area) {
      const base = Y(Math.max(min, 0));
      svg += `<path d="${line} L${X(n - 1).toFixed(2)} ${base.toFixed(2)} L${X(0).toFixed(2)} ${base.toFixed(2)} Z" fill="url(#${gid}g${si})" class="chart__area"/>`;
    }
    svg += `<path d="${line}" pathLength="1" fill="none" stroke="${s.color}" stroke-width="${s.width || 2.4}" stroke-linecap="round" class="chart__line"/>`;
    if (o.dots) {
      pts.forEach((p, i) => {
        svg += `<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${i === pts.length - 1 ? 4 : 2.6}" fill="${s.color}" class="chart__dot"/>`;
      });
    }
    if (s.lastLabel) {
      svg += `<text x="${(X(n - 1) - 6).toFixed(1)}" y="${(Y(s.data[n - 1]) - 10).toFixed(1)}" class="chart__val" text-anchor="end" fill="${s.color}">${esc(s.lastLabel)}</text>`;
    }
  });

  svg += `</svg>`;
  el.innerHTML = svg;
  return el;
}

/* ============================================================
   COLUMN / BAR CHART
   ============================================================ */
export function barChart(el, data, opts = {}) {
  const o = Object.assign({
    w: 640, h: 240, pad: { t: 14, r: 10, b: 26, l: 34 },
    color: 'var(--neutral)', color2: 'var(--pos)', labels: [], grid: true, gap: .38,
    yFmt: (v) => v, radius: 5,
  }, opts);
  if (!el) return;
  const max = niceMax(Math.max(...data.map((d) => d.v), 1));
  const iw = o.w - o.pad.l - o.pad.r;
  const ih = o.h - o.pad.t - o.pad.b;
  const n = data.length;
  const slot = iw / n;
  const bw = slot * (1 - o.gap);

  let svg = `<svg viewBox="0 0 ${o.w} ${o.h}" class="chart chart--bar" preserveAspectRatio="none" role="img"><defs>`;
  const gid = nid('bg');
  data.forEach((d, i) => {
    svg += `<linearGradient id="${gid}${i}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${d.color || o.color}"/><stop offset="1" stop-color="${d.color || o.color}" stop-opacity=".45"/></linearGradient>`;
  });
  svg += `</defs>`;

  if (o.grid) {
    for (let i = 0; i <= 4; i++) {
      const y = (o.pad.t + ih - (ih / 4) * i).toFixed(1);
      svg += `<line x1="${o.pad.l}" y1="${y}" x2="${o.w - o.pad.r}" y2="${y}" class="chart__grid"/>`;
      svg += `<text x="${o.pad.l - 7}" y="${+y + 3.5}" class="chart__ylab" text-anchor="end">${esc(o.yFmt((max / 4) * i))}</text>`;
    }
  }
  data.forEach((d, i) => {
    const h = Math.max(2, (d.v / max) * ih);
    const x = o.pad.l + slot * i + (slot - bw) / 2;
    const y = o.pad.t + ih - h;
    svg += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${bw.toFixed(2)}" height="${h.toFixed(2)}" rx="${o.radius}" fill="url(#${gid}${i})" class="chart__bar" style="--d:${(i * 70).toFixed(0)}ms"/>`;
    if (d.label) svg += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 5).toFixed(1)}" class="chart__val" text-anchor="middle" fill="${d.color || o.color}">${esc(d.label)}</text>`;
    const lab = (o.labels[i] !== undefined ? o.labels[i] : d.k) || '';
    svg += `<text x="${(x + bw / 2).toFixed(1)}" y="${o.h - 7}" class="chart__xlab" text-anchor="middle">${esc(lab)}</text>`;
  });
  svg += `</svg>`;
  el.innerHTML = svg;
  return el;
}

/* ============================================================
   DONUT
   ============================================================ */
export function donut(el, data, opts = {}) {
  const o = Object.assign({ size: 200, thick: 18, center: '', centerSub: '' }, opts);
  if (!el) return;
  const total = data.reduce((a, b) => a + b.v, 0) || 1;
  const r = (o.size - o.thick) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  let svg = `<svg viewBox="0 0 ${o.size} ${o.size}" class="chart chart--donut" role="img">`;
  svg += `<circle cx="${o.size / 2}" cy="${o.size / 2}" r="${r}" fill="none" stroke="var(--chart-grid)" stroke-width="${o.thick}"/>`;
  data.forEach((d, i) => {
    const frac = d.v / total;
    const len = frac * c;
    svg += `<circle cx="${o.size / 2}" cy="${o.size / 2}" r="${r}" fill="none" stroke="${d.color}"
      stroke-width="${o.thick}" stroke-linecap="butt"
      stroke-dasharray="${len.toFixed(2)} ${(c - len).toFixed(2)}"
      stroke-dashoffset="${(-acc * c).toFixed(2)}"
      transform="rotate(-90 ${o.size / 2} ${o.size / 2})" class="chart__arc" style="--d:${i * 110}ms"/>`;
    acc += frac;
  });
  if (o.center) {
    svg += `<text x="50%" y="47%" class="chart__donutv" text-anchor="middle">${esc(o.center)}</text>`;
    svg += `<text x="50%" y="60%" class="chart__donutl" text-anchor="middle">${esc(o.centerSub)}</text>`;
  }
  svg += `</svg>`;
  el.innerHTML = svg;
  return el;
}

/* ============================================================
   HORIZONTAL RANK BARS
   ============================================================ */
export function rankBars(el, data, opts = {}) {
  const o = Object.assign({ color: 'var(--neutral)' }, opts);
  if (!el) return;
  const max = Math.max(...data.map((d) => d.v), 1);
  el.innerHTML = data.map((d, i) => `
    <div class="rank" style="--d:${i * 80}ms">
      <div class="rank__top"><span class="rank__k">${esc(d.k)}</span><span class="rank__v mono">${esc(d.label !== undefined ? d.label : d.v)}</span></div>
      <div class="rank__track"><i style="width:${((d.v / max) * 100).toFixed(1)}%;background:${d.color || o.color}"></i></div>
    </div>`).join('');
  return el;
}

/* ============================================================
   SPARKLINE (for KPI tiles)
   ============================================================ */
export function sparkline(data, color, w = 120, h = 34) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - 3 - ((v - min) / (max - min || 1)) * (h - 8),
  }));
  const gid = nid('sp');
  return `<svg viewBox="0 0 ${w} ${h}" class="spark" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${color}" stop-opacity=".38"/><stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${smoothPath(pts)} L${w} ${h} L0 ${h} Z" fill="url(#${gid})"/>
    <path d="${smoothPath(pts)}" pathLength="1" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" class="chart__line"/>
  </svg>`;
}

/* ============================================================
   CASH-FLOW FORECAST (bars + line)
   ============================================================ */
export function forecastChart(el, data, opts = {}) {
  const o = Object.assign({ w: 560, h: 170, labels: [] }, opts);
  if (!el) return;
  const max = niceMax(Math.max(...data.map((d) => Math.max(d.in, d.out)), 1));
  const iw = o.w - 8, ih = o.h - 18;
  const n = data.length, slot = iw / n, bw = slot * .26;
  const gid = nid('fc');
  let svg = `<svg viewBox="0 0 ${o.w} ${o.h}" class="chart chart--fc" preserveAspectRatio="none" role="img"><defs>`;
  svg += `<linearGradient id="${gid}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--pos)"/><stop offset="1" stop-color="var(--pos)" stop-opacity=".35"/></linearGradient>`;
  svg += `<linearGradient id="${gid}o" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--neg)"/><stop offset="1" stop-color="var(--neg)" stop-opacity=".35"/></linearGradient>`;
  svg += `</defs>`;
  const pts = [];
  data.forEach((d, i) => {
    const cx = slot * i + slot / 2;
    const hi = (d.in / max) * ih, ho = (d.out / max) * ih;
    svg += `<rect x="${(cx - bw - 1).toFixed(1)}" y="${(ih - hi).toFixed(1)}" width="${bw.toFixed(1)}" height="${hi.toFixed(1)}" rx="3" fill="url(#${gid}i)" class="chart__bar" style="--d:${i * 45}ms"/>`;
    svg += `<rect x="${(cx + 1).toFixed(1)}" y="${(ih - ho).toFixed(1)}" width="${bw.toFixed(1)}" height="${ho.toFixed(1)}" rx="3" fill="url(#${gid}o)" class="chart__bar" style="--d:${i * 45 + 25}ms"/>`;
    pts.push({ x: cx, y: ih - ((d.net / max) * ih) });
    if (o.labels[i]) svg += `<text x="${cx.toFixed(1)}" y="${o.h - 4}" class="chart__xlab" text-anchor="middle">${esc(o.labels[i])}</text>`;
  });
  svg += `<path d="${linePath(pts)}" fill="none" stroke="var(--neutral)" stroke-width="1.8" stroke-dasharray="4 4" class="chart__line" opacity=".7"/>`;
  svg += `</svg>`;
  el.innerHTML = svg;
  return el;
}

/* ============================================================
   ANIMATED COUNTER
   ============================================================ */
export function countUp(el, target, opts = {}) {
  const o = Object.assign({ dur: 900, dec: 0, sep: ' ' }, opts);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { el.textContent = fmt(target); return; }
  const t0 = performance.now();
  const fmt = (v) => v.toLocaleString('ru-RU', { minimumFractionDigits: o.dec, maximumFractionDigits: o.dec }).replace(/\u00a0/g, o.sep);
  function step(t) {
    const p = Math.min(1, (t - t0) / o.dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(target * e);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export { esc, niceMax };
