/* ============================================================
   Static audit: every t()/ta()/to() key must resolve in every
   locale; every statically-written class in el('...') must exist
   in the stylesheets.
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const problems = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.js')) out.push(p);
  }
  return out;
}
const jsFiles = walk(path.join(ROOT, 'src/js'));
const jsSrc = jsFiles.map((f) => fs.readFileSync(f, 'utf8'))
  .join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/(^|\s)\/\/.*$/gm, '$1');

/* ---------- flatten real locale objects ---------- */
function flatten(obj, prefix, out) {
  if (Array.isArray(obj)) {
    out.add(prefix);
    obj.forEach((v, i) => {
      const key = `${prefix}.${i}`;
      if (v && typeof v === 'object') flatten(v, key, out);
      else out.add(key);
    });
    return out;
  }
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') flatten(v, key, out);
    else out.add(key);
  }
  return out;
}
const locales = {};
for (const code of ['uz', 'en', 'ru']) {
  const mod = await import(`../src/js/i18n/${code}.js`);
  locales[code] = flatten(mod.default, '', new Set());
}

/* ---------- keys used in JS ---------- */
const used = new Set();
for (const re of [/\b(?:t|ta|to)\(\s*'([^']+)'\s*[,)]/g, /\b(?:t|ta|to)\(\s*'([^']+)'\s*\+/g]) {
  let m; while ((m = re.exec(jsSrc))) { if (m[1].endsWith('.')) continue; used.add(m[1]); }
}
for (const k of used) {
  if (!locales.uz.has(k)) problems.push(`MISSING KEY in uz: ${k}`);
  for (const c of ['en', 'ru']) if (!locales[c].has(k)) problems.push(`MISSING KEY in ${c}: ${k}`);
}

/* ---------- classes ---------- */
const css = ['tokens.css', 'base.css', 'components.css', 'slides.css']
  .map((f) => fs.readFileSync(path.join(ROOT, 'src/css', f), 'utf8')).join('\n');
const cssClasses = new Set([...css.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)].map((x) => x[1]));

const TAGS = new Set(['div','span','p','h1','h2','h3','h4','section','button','i','b','em','ul','li','a','svg','img','input','textarea','table','tr','td','th','strong','small','label','nav','main','header','footer','aside','article','figure','figcaption','canvas','video','audio','form','select','option','pre','code','blockquote','hr','br','noscript','iframe','template','slot','details','summary','dialog','progress','meter','fieldset','legend','output','picture','source','track','map','area','object','embed']);
const missing = new Set();
for (const re of [/el\(\s*'([a-zA-Z0-9_.\-]+)'/g, /h\(\s*'([a-zA-Z0-9_.\-]+)'/g]) {
  let m;
  while ((m = re.exec(jsSrc))) {
    const spec = m[1];
    const first = spec.split('.')[0].split('#')[0];
    if (!TAGS.has(first)) continue;            // not a tag -> not a class spec
    for (const c of spec.split('.')) if (c && !cssClasses.has(c) && !TAGS.has(c)) missing.add(c);
  }
}
[...missing].sort().forEach((c) => problems.push(`CSS CLASS not found: ${c}`));

/* ---------- report ---------- */
console.log(`i18n keys used in JS : ${used.size}`);
console.log(`keys defined          : uz=${locales.uz.size} en=${locales.en.size} ru=${locales.ru.size}`);
console.log(`css classes in CSS    : ${cssClasses.size}`);
console.log(`\n--- problems: ${problems.length} ---`);
problems.slice(0, 60).forEach((p) => console.log('  ' + p));
process.exit(problems.length ? 1 : 0);
