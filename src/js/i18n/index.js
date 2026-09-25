/* ============================================================
   BALANS AI — i18n runtime
   Flat dot-path lookup with graceful fallback to the primary
   locale (UZ) so a missing key can never break a slide.
   ============================================================ */

import uz from './uz.js';
import en from './en.js';
import ru from './ru.js';

export const LOCALES = { uz, en, ru };
export const LOCALE_ORDER = ['uz', 'en', 'ru'];
export const PRIMARY = 'uz';

const cache = new Map();

function flatten(obj, prefix, out) {
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}

function dict(code) {
  if (!cache.has(code)) cache.set(code, flatten(LOCALES[code] || LOCALES[PRIMARY], '', {}));
  return cache.get(code);
}

let current = localStorage.getItem('balans.lang') || 'uz';
if (!LOCALES[current]) current = 'uz';

export const listeners = new Set();

export function locale() { return current; }

export function setLocale(code) {
  if (!LOCALES[code] || code === current) return current;
  current = code;
  try { localStorage.setItem('balans.lang', code); } catch (e) { /* private mode */ }
  document.documentElement.lang = code === 'uz' ? 'uz' : code;
  listeners.forEach((fn) => fn(code));
  return current;
}

/** Translate a dot-path key. Arrays are returned as-is. */
export function t(path, vars) {
  const d = dict(current);
  let v = d[path];
  if (v === undefined) v = dict(PRIMARY)[path];
  if (v === undefined) {
    if (import.meta.env?.DEV) console.warn('[i18n] missing key:', path);
    return path;
  }
  if (typeof v === 'string' && vars) {
    v = v.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));
  }
  return v;
}

/** Returns a translated array (falls back to primary locale). */
export function ta(path) {
  const d = dict(current);
  const v = d[path];
  if (v !== undefined) return v;
  return dict(PRIMARY)[path] || [];
}

/** Returns a translated object (falls back to primary locale). */
export function to(path) {
  const d = dict(current);
  const v = d[path];
  if (v !== undefined && v !== null && typeof v === 'object') return v;
  return dict(PRIMARY)[path] || {};
}

export function meta() { return LOCALES[current].meta || LOCALES[PRIMARY].meta; }
