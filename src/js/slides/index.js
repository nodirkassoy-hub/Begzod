/* ============================================================
   BALANS AI — SLIDE REGISTRY
   ============================================================ */

import { t } from '../i18n/index.js';

import s01 from './s01-hero.js';
import s02 from './s02-problem.js';
import s03 from './s03-solution.js';
import s04 from './s04-how.js';
import s05 from './s05-ecosystem.js';
import s06 from './s06-roles.js';
import s07 from './s07-aicfo.js';
import s08 from './s08-command.js';
import s09 from './s09-manufacturing.js';
import s10 from './s10-ai-manufacturing.js';
import s11 from './s11-competitive.js';
import s12 from './s12-differentiators.js';
import s13 from './s13-security.js';
import s14 from './s14-documents.js';
import s15 from './s15-analytics.js';
import s16 from './s16-value.js';
import s17 from './s17-audience.js';
import s18 from './s18-scenario.js';
import s19 from './s19-model.js';
import s20 from './s20-roadmap.js';
import s21 from './s21-investor.js';
import s22 from './s22-final.js';
import s23 from './s23-demo.js';

const raw = [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12,
  s13, s14, s15, s16, s17, s18, s19, s20, s21, s22, s23];

export const SLIDES = raw.map((s) => Object.assign({}, s, {
  sectionLabel: () => t(`nav.${s.section}`),
}));

export default SLIDES;
