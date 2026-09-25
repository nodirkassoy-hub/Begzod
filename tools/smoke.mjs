/* ============================================================
   Headless smoke test.
   jsdom cannot execute <script type="module">, so we build a DOM
   from index.html, install the browser globals, then import the
   real entry module against them.
   ============================================================ */
import { JSDOM, VirtualConsole } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const errors = [];
const log = [];
const ok = (m) => log.push('  \u2713 ' + m);
const bad = (m) => { log.push('  \u2717 ' + m); errors.push(m); };

const vc = new VirtualConsole();
vc.on('jsdomError', (e) => errors.push('[jsdomError] ' + (e.stack || e.message)));
vc.on('error', (...a) => errors.push('[console.error] ' + a.map(String).join(' ')));

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')
  .replace(/<script[^>]*type="module"[^>]*><\/script>/g, '');

const dom = new JSDOM(html, {
  url: 'http://127.0.0.1:4173/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
  virtualConsole: vc,
});

const { window } = dom;
window.matchMedia = (q) => ({
  matches: false, media: q, onchange: null,
  addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {},
  dispatchEvent() { return false; },
});
window.HTMLElement.prototype.scrollIntoView = function () {};
window.Element.prototype.scrollIntoView = window.HTMLElement.prototype.scrollIntoView;
if (!window.requestAnimationFrame) window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
if (!window.cancelAnimationFrame) window.cancelAnimationFrame = clearTimeout;

/* expose browser globals to the module scope */
const G = globalThis;
for (const k of ['window', 'document', 'navigator', 'location', 'history', 'localStorage',
  'sessionStorage', 'matchMedia', 'requestAnimationFrame', 'cancelAnimationFrame',
  'getComputedStyle', 'Node', 'Element', 'HTMLElement', 'SVGElement', 'CustomEvent',
  'Event', 'MouseEvent', 'KeyboardEvent', 'performance', 'screen']) {
  if (window[k] !== undefined) { try { G[k] = window[k]; } catch (e) { /**/ } }
}
G.window = window;
G.self = window;
G.globalThis = G;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  await import('../src/js/main.js');
  await sleep(1200);

  const doc = window.document;
  const slides = doc.querySelectorAll('.slide');
  log.push(`slides rendered: ${slides.length}`);
  if (slides.length !== 23) bad(`expected 23 slides, got ${slides.length}`); else ok('23 slides mounted');

  const deck = window.__deck;
  if (!deck) { bad('window.__deck missing'); return; }
  ok('deck engine present');

  const total = deck.state.slides.length;
  for (let i = 0; i < total; i++) {
    deck.go(i);
    await sleep(240);
    const node = doc.querySelector(`.slide[data-index="${i}"]`);
    const label = deck.state.slides[i].label();
    const kids = node ? node.querySelectorAll('*').length : 0;
    if (kids < 8) bad(`slide ${i + 1} (${label}) has only ${kids} nodes`);
    else ok(`slide ${String(i + 1).padStart(2, '0')} \u00b7 ${String(label).slice(0, 50)} \u00b7 ${kids} nodes`);
  }

  /* ---- locales ---- */
  for (const code of ['en', 'ru', 'uz']) {
    const btn = doc.querySelector(`.lang__btn[data-lang="${code}"]`);
    if (!btn) { bad(`lang button ${code} missing`); continue; }
    btn.click();
    await sleep(700);
    const t = doc.querySelector('.slide.is-active .s-title, .slide.is-active .hero__title, .slide.is-active .fin__title');
    log.push(`locale ${code} \u2192 ${t ? t.textContent.trim().slice(0, 58) : 'n/a'}`);
    if (doc.querySelectorAll('.slide').length !== 23) bad(`locale ${code} broke slide count`);
  }
  doc.querySelector('.lang__btn[data-lang="uz"]').click();
  await sleep(600);

  /* ---- re-render actually translates content (regression) ---- */
  deck.go(0);
  await sleep(300);
  const heroBefore = doc.querySelector('.slide--hero .hero__title').textContent.trim();
  const statBefore = doc.querySelector('.slide--hero .hero__statK').textContent.trim();
  doc.querySelector('.lang__btn[data-lang="en"]').click();
  await sleep(700);
  const heroAfter = doc.querySelector('.slide--hero .hero__title').textContent.trim();
  const statAfter = doc.querySelector('.slide--hero .hero__statK').textContent.trim();
  log.push(`hero: "${heroBefore}" -> "${heroAfter}"`);
  log.push(`kpi : "${statBefore}" -> "${statAfter}"`);
  if (heroBefore === heroAfter) bad('hero title did not re-translate on locale change');
  else ok('hero re-translates on locale change');
  doc.querySelector('.lang__btn[data-lang="uz"]').click();
  await sleep(600);

  /* ---- theme ---- */
  const before = doc.documentElement.getAttribute('data-theme');
  const tools = [...doc.querySelectorAll('.tool')];
  if (tools.length) tools[tools.length - 1].click();
  const after = doc.documentElement.getAttribute('data-theme');
  log.push(`theme ${before} \u2192 ${after}`);
  if (before === after) bad('theme did not toggle'); else ok('theme toggles');

  /* ---- overview ---- */
  deck.toggleOverview(true);
  await sleep(400);
  const cards = doc.querySelectorAll('.ovcard').length;
  log.push(`overview cards: ${cards}`);
  if (cards !== 23) bad('overview missing cards'); else ok('overview grid built');
  deck.toggleOverview(false);

  /* ---- role switcher ---- */
  deck.go(5);
  await sleep(500);
  const roles = doc.querySelectorAll('.slide--roles .role');
  log.push(`role buttons: ${roles.length}`);
  if (roles.length < 11) bad('role switcher incomplete');
  const firstDash = doc.querySelector('.slide--roles .dash');
  roles[4].click();
  await sleep(500);
  const secondDash = doc.querySelector('.slide--roles .dash');
  if (firstDash && secondDash && firstDash.innerHTML === secondDash.innerHTML) bad('dashboard did not change with role');
  else ok('role dashboard changes on switch');

  /* ---- AI CFO demo ---- */
  deck.go(22);
  await sleep(900);
  const sugg = doc.querySelectorAll('.slide--demo .sugg__btn');
  log.push(`demo suggestion buttons: ${sugg.length}`);
  if (sugg.length < 3) bad('AI demo suggestions missing');
  sugg[0].click();
  await sleep(2400);
  const msgs = doc.querySelectorAll('.slide--demo .msg').length;
  log.push(`chat messages after ask: ${msgs}`);
  if (msgs < 2) bad('AI chat did not respond'); else ok('AI chat responds to a question');

  /* ---- scenario autoplay ---- */
  deck.go(17);
  await sleep(600);
  const playBtn = [...doc.querySelectorAll('.slide--scenario .btn')][0];
  if (playBtn) { playBtn.click(); await sleep(2600); ok('scenario autoplay runs'); }
  else bad('scenario play button missing');

  /* ---- counter / progress ---- */
  const counter = doc.querySelector('.counter b').textContent;
  const width = doc.querySelector('.progress__fill').style.width;
  log.push(`counter=${counter} progress=${width}`);
  if (!width || width === '0%') bad('progress bar not advancing'); else ok('progress bar advances');

  /* ---- charts actually render ---- */
  const chartSlides = [1, 6, 8, 9, 15, 23];
  for (const i of chartSlides) {
    deck.go(i - 1);
    await sleep(400);
    const n = doc.querySelector(`.slide[data-index="${i - 1}"]`);
    const svgs = n.querySelectorAll('svg.chart').length;
    const paths = n.querySelectorAll('svg.chart path, svg.chart rect, svg.chart circle').length;
    if (!svgs || paths < 3) bad(`slide ${i} chart not drawn (svg=${svgs}, shapes=${paths})`);
    else ok(`slide ${i} chart drawn (${paths} shapes)`);
  }

  /* ---- keyboard navigation ---- */
  deck.go(0);
  await sleep(200);
  const ev = (key) => new window.KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
  window.dispatchEvent(ev('ArrowRight'));
  await sleep(180);
  const k1 = doc.querySelector('.counter b').textContent;
  window.dispatchEvent(ev('ArrowLeft'));
  await sleep(180);
  const k2 = doc.querySelector('.counter b').textContent;
  window.dispatchEvent(ev('End'));
  await sleep(180);
  const k3 = doc.querySelector('.counter b').textContent;
  window.dispatchEvent(ev('Home'));
  await sleep(180);
  const k4 = doc.querySelector('.counter b').textContent;
  log.push(`keyboard: right=${k1} left=${k2} end=${k3} home=${k4}`);
  if (k1 !== '02' || k2 !== '01' || k3 !== '23' || k4 !== '01') bad('keyboard navigation broken');
  else ok('keyboard navigation works');

  /* ---- hash routing ---- */
  deck.go(4, true);
  await sleep(120);
  log.push(`hash=${window.location.hash}`);

  /* ---- mobile layout class ---- */
  log.push(`body classes: ${doc.body.className || '(none)'}`);
}

try { await main(); } catch (e) { errors.push('[fatal] ' + (e.stack || e.message)); }

console.log(log.join('\n'));
console.log('\n--- runtime errors: ' + errors.length + ' ---');
errors.slice(0, 30).forEach((e) => console.log(e));
process.exit(errors.length ? 1 : 0);
