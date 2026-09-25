/* ============================================================
   BALANS AI — ICON REGISTRY
   Single stroke-weight family, 24×24 grid, currentColor.
   ============================================================ */

const P = {
  trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.6 9.6h3.6a1.9 1.9 0 010 3.8H9.6l3.9-.1"/>',
  wallet: '<path d="M3.5 8.2A2 2 0 015.5 6.2h11.8a2 2 0 012 2v7.6a2 2 0 01-2 2H5.5a2 2 0 01-2-2z"/><path d="M3.5 9.4h14"/><circle cx="16.4" cy="13.4" r="1.2"/>',
  inbox: '<path d="M3.5 12.6h4l1.4 2.4h6.2l1.4-2.4h4"/><path d="M6.3 5.6h11.4l3.3 7v3.9a2 2 0 01-2 2H5a2 2 0 01-2-2v-3.9z"/>',
  outbox: '<path d="M3.5 12.6h4l1.4 2.4h6.2l1.4-2.4h4"/><path d="M6.3 5.6h11.4l3.3 7v3.9a2 2 0 01-2 2H5a2 2 0 01-2-2v-3.9z"/><path d="M12 3.4v6.4M10 6.4l2-2 2 2"/>',
  box: '<path d="M12 3.4l8 4.2v8.8L12 20.6l-8-4.2V7.6z"/><path d="M4 7.6l8 4.2 8-4.2M12 11.8v8.8"/>',
  alert: '<path d="M12 4.2l8.4 15H3.6z"/><path d="M12 10v4M12 16.6v.1"/>',
  up: '<path d="M12 20V5"/><path d="M6.4 10.6L12 5l5.6 5.6"/>',
  down: '<path d="M12 4v15"/><path d="M6.4 13.4L12 19l5.6-5.6"/>',
  ai: '<path d="M12 3.2l1.9 5.1 5.1 1.9-5.1 1.9L12 17.2l-1.9-5.1L5 10.2l5.1-1.9z"/><path d="M18.6 16.4l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8z"/>',
  users: '<circle cx="9" cy="8.4" r="3.4"/><path d="M3.2 20c0-3.2 2.6-5.6 5.8-5.6s5.8 2.4 5.8 5.6"/><path d="M16.2 5.6a3.4 3.4 0 010 6.4M17.6 14.9c2 .8 3.4 2.7 3.4 5.1"/>',
  user: '<circle cx="12" cy="8.2" r="3.6"/><path d="M5 20.4c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2"/>',
  shield: '<path d="M12 3.2l7.4 2.8v6c0 4.4-3 7.6-7.4 9-4.4-1.4-7.4-4.6-7.4-9V6z"/><path d="M9.2 12.2l2 2 3.6-3.8"/>',
  lock: '<rect x="4.8" y="10.4" width="14.4" height="9.6" rx="2.4"/><path d="M8.2 10.4V7.8a3.8 3.8 0 017.6 0v2.6"/><path d="M12 14v2.6"/>',
  key: '<circle cx="8.2" cy="15.8" r="3.8"/><path d="M11 13l8-8M16.2 7.8l2.2 2.2M13.8 10.2l2.2 2.2"/>',
  file: '<path d="M13.6 3.4H7a2 2 0 00-2 2v13.2a2 2 0 002 2h10a2 2 0 002-2V9.4z"/><path d="M13.4 3.4v6h6"/><path d="M8.8 13.4h6.4M8.8 16.8h4.4"/>',
  files: '<path d="M8.6 7.4H6a2 2 0 00-2 2v9.2a2 2 0 002 2h9.2a2 2 0 002-2v-2.6"/><path d="M10 4.6h6.4L20 8.2v9.2a2 2 0 01-2 2h-1.4"/><path d="M9.4 4.6v3.6h4.2"/>',
  check: '<path d="M4.8 12.6l4.6 4.6L19.2 7.4"/>',
  checkCircle: '<circle cx="12" cy="12" r="8.6"/><path d="M8.4 12.4l2.6 2.6 4.8-5.2"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  chevR: '<path d="M9.4 5.4l6.6 6.6-6.6 6.6"/>',
  chevL: '<path d="M14.6 5.4L8 12l6.6 6.6"/>',
  chevD: '<path d="M5.4 9.4l6.6 6.6 6.6-6.6"/>',
  arrowR: '<path d="M4 12h15"/><path d="M13.6 6.6L19.4 12l-5.8 5.4"/>',
  arrowDR: '<path d="M6 18L18 6"/><path d="M8.6 6H18v9.4"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.4"/><path d="M15.6 15.6L20 20"/>',
  grid: '<rect x="3.6" y="3.6" width="7" height="7" rx="1.8"/><rect x="13.4" y="3.6" width="7" height="7" rx="1.8"/><rect x="3.6" y="13.4" width="7" height="7" rx="1.8"/><rect x="13.4" y="13.4" width="7" height="7" rx="1.8"/>',
  max: '<path d="M4 9V4.6h5M20 15v4.4h-5"/><path d="M20 9V4.6h-5M4 15v4.4h5"/>',
  min: '<path d="M9 4.6V9H4.6M15 19.4V15h4.4"/><path d="M15 4.6V9h4.4M9 19.4V15H4.6"/>',
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"/>',
  moon: '<path d="M20 14.4A8.4 8.4 0 019.6 4 8.6 8.6 0 1020 14.4z"/>',
  globe: '<circle cx="12" cy="12" r="8.6"/><path d="M3.6 12h16.8"/><path d="M12 3.4c2.4 2.4 3.6 5.3 3.6 8.6s-1.2 6.2-3.6 8.6c-2.4-2.4-3.6-5.3-3.6-8.6S9.6 5.8 12 3.4z"/>',
  play: '<path d="M7.6 4.8l11 7.2-11 7.2z"/>',
  pause: '<path d="M9 5.4v13.2M15 5.4v13.2"/>',
  restart: '<path d="M20 12a8 8 0 11-2.6-5.9"/><path d="M20.4 4.4v4.4h-4.4"/>',
  send: '<path d="M4 11.6L20 4.4l-3.4 15.4-4.6-5.4z"/><path d="M4 11.6l7.4 2.6"/>',
  factory: '<path d="M3.6 20.4V9.6l4.6 3.2V9.6l4.6 3.2V6.4l7.6 5v9z"/><path d="M7.4 20.4v-3.6M12 20.4v-3.6M16.6 20.4v-3.6"/>',
  cart: '<circle cx="9.4" cy="19.4" r="1.6"/><circle cx="17" cy="19.4" r="1.6"/><path d="M3 4.4h2.4l2.4 10.4h9.6l2-7.4H7"/>',
  truck: '<path d="M2.6 6.4h10.8v9.2H2.6z"/><path d="M13.4 9.6h3.8l3.2 3.4v2.6h-5z"/><circle cx="6.6" cy="18.4" r="1.8"/><circle cx="16.8" cy="18.4" r="1.8"/>',
  calc: '<rect x="4.6" y="3.4" width="14.8" height="17.2" rx="2.4"/><path d="M8 8h8M8 12h2.4M13.4 12H16M8 16h2.4M13.4 16H16"/>',
  brief: '<rect x="3.4" y="7.4" width="17.2" height="12.4" rx="2.4"/><path d="M9 7.4V5.6a2 2 0 012-2h2a2 2 0 012 2v1.8"/><path d="M3.4 12.6h17.2"/>',
  clock: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.4V12l3.4 2"/>',
  db: '<ellipse cx="12" cy="6.2" rx="7.4" ry="2.8"/><path d="M4.6 6.2v5.6c0 1.6 3.3 2.8 7.4 2.8s7.4-1.2 7.4-2.8V6.2"/><path d="M4.6 11.8v5.6c0 1.6 3.3 2.8 7.4 2.8s7.4-1.2 7.4-2.8v-5.6"/>',
  layers: '<path d="M12 3.4l8.4 4.2L12 11.8 3.6 7.6z"/><path d="M3.6 12.2L12 16.4l8.4-4.2M3.6 16.6L12 20.8l8.4-4.2"/>',
  target: '<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1"/>',
  zap: '<path d="M13.4 3.2L5.6 13.6h5.2l-1 7.2 7.8-10.4h-5.2z"/>',
  percent: '<path d="M18.4 5.6L5.6 18.4"/><circle cx="7.6" cy="7.6" r="2.4"/><circle cx="16.4" cy="16.4" r="2.4"/>',
  refresh: '<path d="M20 12a8 8 0 11-2.6-5.9"/><path d="M20.4 4.4v4.4h-4.4"/>',
  ext: '<path d="M14 4.6h5.4V10"/><path d="M19.4 4.6L10 14"/><path d="M18 14.6v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8.6a2 2 0 012-2h4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  list: '<path d="M8.6 6.6h11.8M8.6 12h11.8M8.6 17.4h11.8"/><path d="M4.2 6.6v.1M4.2 12v.1M4.2 17.4v.1"/>',
  star: '<path d="M12 3.6l2.6 5.4 5.8.8-4.2 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.6 9.8l5.8-.8z"/>',
  bank: '<path d="M3.6 9.4L12 4.4l8.4 5"/><path d="M5.6 9.4v8M10 9.4v8M14 9.4v8M18.4 9.4v8"/><path d="M3.6 19.6h16.8"/>',
  scale: '<path d="M12 4v16"/><path d="M6 20h12"/><path d="M4 8.6h16"/><path d="M4 8.6L1.8 14h4.4z"/><path d="M20 8.6L17.8 14h4.4z"/>',
  flow: '<rect x="3.4" y="3.4" width="6.4" height="6.4" rx="1.8"/><rect x="14.2" y="14.2" width="6.4" height="6.4" rx="1.8"/><path d="M9.8 6.6h4.6a2 2 0 012 2v5.6"/>',
  cpu: '<rect x="6.6" y="6.6" width="10.8" height="10.8" rx="2.4"/><path d="M10 3.4v3.2M14 3.4v3.2M10 17.4v3.2M14 17.4v3.2M3.4 10h3.2M3.4 14h3.2M17.4 10h3.2M17.4 14h3.2"/>',
  bolt: '<path d="M13.4 3.2L5.6 13.6h5.2l-1 7.2 7.8-10.4h-5.2z"/>',
  eye: '<path d="M2.6 12S6 6.4 12 6.4 21.4 12 21.4 12 18 17.6 12 17.6 2.6 12 2.6 12z"/><circle cx="12" cy="12" r="2.8"/>',
  eyeOff: '<path d="M4 4l16 16"/><path d="M10 5.2A8.6 8.6 0 0112 5c6 0 9.4 7 9.4 7a17 17 0 01-3 3.9M6.4 7.6A16.6 16.6 0 002.6 12S6 19 12 19c.9 0 1.7-.1 2.5-.3"/><path d="M9.6 9.8a2.9 2.9 0 004 4"/>',
};

const ALIAS = {
  revenue: 'trend', sales: 'cart', stock: 'box', warehouse: 'box', profit: 'coin',
  cash: 'wallet', payables: 'outbox', receivables: 'inbox', cost: 'calc',
  production: 'factory', manufacturing: 'factory', hr: 'users', crm: 'brief',
  purchasing: 'truck', documents: 'files', analytics: 'percent', reports: 'file',
  approval: 'checkCircle', aiCfo: 'ai', accounting: 'scale', budget: 'target',
  treasury: 'bank', projects: 'layers', assets: 'db', security: 'shield',
};

const cache = new Map();

export function icon(name, size) {
  const key = P[name] ? name : (ALIAS[name] || 'target');
  const body = P[key];
  const s = size ? ` width="${size}" height="${size}"` : '';
  return `<svg viewBox="0 0 24 24"${s} fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

export function hasIcon(name) { return !!(P[name] || ALIAS[name]); }

/** Brand mark — the BALANS AI "balance" glyph. */
export function brandMark(size = 30) {
  return `<svg viewBox="0 0 48 48" width="${size}" height="${size}" aria-hidden="true">
    <defs><linearGradient id="bm${size}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8FB4FF"/><stop offset=".5" stop-color="#FFFFFF"/><stop offset="1" stop-color="#7BF3D4"/>
    </linearGradient></defs>
    <path d="M15 32.5 24 14l9 18.5" fill="none" stroke="url(#bm${size})" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.4 27.6h9.2" fill="none" stroke="url(#bm${size})" stroke-width="3.2" stroke-linecap="round"/>
  </svg>`;
}
