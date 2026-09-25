/* ============================================================
   BALANS AI — DEMO DATA  (sample / illustrative only)
   Everything here is fabricated sample data used to make the
   interactive demo feel like a real product. Never presented
   as real customer data.
   ============================================================ */

export const MONTHS = ['Sen', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];

export const series = {
  revenue: [980, 1050, 1120, 1080, 1240, 1330, 1400, 1520, 1610, 1700, 1780, 1842],
  profit: [92, 104, 112, 108, 126, 138, 146, 158, 166, 172, 179, 184],
  expenses: [760, 820, 880, 850, 940, 1010, 1070, 1130, 1190, 1250, 1310, 1362],
  cashflow: [60, 88, 96, 74, 132, 150, 168, 178, 192, 210, 268, 312],
};

export const costStructure = [
  { k: 'material', v: 52, color: 'var(--neutral)' },
  { k: 'labour', v: 21, color: 'var(--pos)' },
  { k: 'machine', v: 12, color: 'var(--indigo-400)' },
  { k: 'energy', v: 8, color: 'var(--warn)' },
  { k: 'overhead', v: 7, color: 'var(--neg)' },
];

export const topProducts = [
  { k: 'Profil A-120', v: 96, label: '412 mln' },
  { k: 'Panel XL', v: 78, label: '338 mln' },
  { k: 'Komplekt B', v: 64, label: '271 mln' },
  { k: 'Modul C-9', v: 51, label: '224 mln' },
  { k: 'Uskuna D', v: 38, label: '168 mln' },
];

export const topCustomers = [
  { k: 'OOO Texnogroup', v: 96, label: '386 mln' },
  { k: 'AO Mega Stroy', v: 82, label: '329 mln' },
  { k: 'IP Karimov', v: 61, label: '248 mln' },
  { k: 'OOO Anor Textile', v: 44, label: '182 mln' },
  { k: 'IP Yusupov', v: 30, label: '124 mln' },
];

export const cashForecast = [
  { in: 120, out: 88, net: 32 }, { in: 96, out: 104, net: -8 },
  { in: 148, out: 92, net: 56 }, { in: 132, out: 118, net: 14 },
  { in: 168, out: 96, net: 72 }, { in: 110, out: 126, net: -16 },
];

/* ============================================================
   ROLE DASHBOARDS
   ============================================================ */
function kpi(k, v, u, d, ico, tone) { return { k, v, u, d, ico, tone: tone || 'a' }; }

export const ROLE_DASH = {
  CEO: {
    kpis: [
      kpi('Daromad', '1 842', 'mln', '+14,2%', 'trend', 'a'),
      kpi('Sof foyda', '184', 'mln', '+11,0%', 'coin', 'm'),
      kpi('Naqd pul oqimi', '312', 'mln', '+6,4%', 'wallet', 'v'),
      kpi('Debitor qarz', '420', 'mln', '3 muddati o\u02bbtgan', 'inbox', 'r'),
    ],
    chart: 'main',
    panels: [
      { t: 'Eng yaxshi mahsulotlar', type: 'rank', data: topProducts },
      { t: 'Eng yirik mijozlar', type: 'rank', data: topCustomers },
    ],
    insight: 'Sotuv o\u02bbsishi asosiy marjali mahsulotlar hisobiga. Xarajatlar barqaror.',
  },
  ADMIN: {
    kpis: [
      kpi('Foydalanuvchilar', '128', '', '12 rol', 'users', 'a'),
      kpi('Rollar', '12', '', 'RBAC', 'lock', 'v'),
      kpi('Audit yozuvlari', '18 402', '', 'bugun +214', 'file', 'a'),
      kpi('Obuna', 'ACTIVE', '', 'Premium Plus', 'checkCircle', 'm'),
    ],
    chart: null,
    panels: [
      { t: 'Audit jurnali', type: 'rows', data: [
        { t: 'Rol o\u02bbzgartirildi \u2014 Ombor', m: 'admin \u00b7 14:22', v: 'OK', tone: 'pos' },
        { t: 'Yangi foydalanuvchi \u2014 savdo', m: 'admin \u00b7 12:04', v: 'OK', tone: 'pos' },
        { t: 'Hujjat tasdiqlandi \u2014 akt #4471', m: 'bosh.bux \u00b7 11:37', v: 'OK', tone: 'pos' },
        { t: 'Muvaffaqiyatsiz kirish urinishi', m: 'ip 10.2.4.19 \u00b7 09:58', v: '!', tone: 'warn' },
      ] },
    ],
    insight: null,
  },
  CHIEF: {
    kpis: [
      kpi('Aktivlar', '4 120', 'mln', 'Balans', 'scale', 'a'),
      kpi('Passivlar', '4 120', 'mln', 'Balans', 'scale', 'v'),
      kpi('Sof foyda', '184', 'mln', 'Oylik', 'coin', 'm'),
      kpi('Yopish davri', '3', 'kun', 'qoldi', 'clock', 'a'),
    ],
    chart: 'main',
    panels: [
      { t: 'Operatsiyalar', type: 'rows', data: [
        { t: 'Hisob-faktura #4820', m: 'OOO Texnogroup \u00b7 bugun', v: '+128 mln', tone: 'pos' },
        { t: 'Xarid to\u02bblovi #2210', m: 'IP Aliev \u00b7 bugun', v: '-64 mln', tone: 'neg' },
        { t: 'Ish haqi \u2014 avgust', m: 'HR \u00b7 kecha', v: '-96 mln', tone: 'neg' },
        { t: 'Kassa kirimi', m: 'Kassir \u00b7 kecha', v: '+42 mln', tone: 'pos' },
      ] },
    ],
    insight: null,
  },
  ACCOUNTANT: {
    kpis: [
      kpi('Operatsiyalar', '342', '', 'bu oy', 'list', 'a'),
      kpi('Hisob-fakturalar', '86', '', '12 kutilmoqda', 'file', 'v'),
      kpi('To\u02bblovlar', '268', '', 'bu oy', 'wallet', 'm'),
      kpi('Kontragentlar', '412', '', 'faol', 'users', 'a'),
    ],
    chart: null,
    panels: [
      { t: 'So\u02bbnggi operatsiyalar', type: 'rows', data: [
        { t: 'Kirim \u2014 tovarlar', m: 'sklad \u00b7 09:12', v: '+1 240', tone: 'pos' },
        { t: 'Chiqim \u2014 sotuv', m: 'savdo \u00b7 10:40', v: '-860', tone: 'neg' },
        { t: 'Bank \u2012 kirim', m: 'Payme \u00b7 11:02', v: '+420', tone: 'pos' },
        { t: 'Kassa \u2012 chiqim', m: 'kassa \u00b7 13:15', v: '-96', tone: 'neg' },
      ] },
    ],
    insight: null,
  },
  SALES: {
    kpis: [
      kpi('Buyurtmalar', '148', '', 'bu oy', 'cart', 'a'),
      kpi('Savdo hajmi', '1 842', 'mln', '+14,2%', 'trend', 'm'),
      kpi('Yangi mijozlar', '36', '', 'bu oy', 'users', 'v'),
      kpi('Voronka', '42', '', 'bitim', 'brief', 'a'),
    ],
    chart: 'sales',
    panels: [
      { t: 'Mijozlar', type: 'rank', data: topCustomers },
      { t: 'Buyurtmalar', type: 'rows', data: [
        { t: 'SO-1042 \u00b7 OOO Texnogroup', m: 'bugun \u00b7 yetkazish 26.09', v: '128 mln', tone: 'pos' },
        { t: 'SO-1041 \u00b7 AO Mega Stroy', m: 'bugun \u00b7 yetkazish 27.09', v: '96 mln', tone: 'pos' },
        { t: 'SO-1040 \u00b7 IP Karimov', m: 'kecha \u00b7 kutilmoqda', v: '54 mln', tone: 'warn' },
      ] },
    ],
    insight: null,
  },
  WAREHOUSE: {
    kpis: [
      kpi('Qoldiq (SKU)', '1 284', '', '4 ombor', 'box', 'a'),
      kpi('Bugungi kirim', '142', '', 'qabul', 'inbox', 'm'),
      kpi('Bugungi chiqim', '168', '', 'jo\u02bbnatildi', 'outbox', 'v'),
      kpi('Kam qoldiq', '2', '', 'minimumda', 'alert', 'r'),
    ],
    chart: 'stock',
    panels: [
      { t: 'Qoldiqlar', type: 'rows', data: [
        { t: 'Profil A-120', m: 'A-ombor \u00b7 polka 12', v: '3 420', tone: 'pos' },
        { t: 'Panel XL', m: 'B-ombor \u00b7 polka 04', v: '842', tone: 'warn' },
        { t: 'Komplekt B', m: 'A-ombor \u00b7 polka 21', v: '1 106', tone: 'pos' },
        { t: 'Modul C-9', m: 'B-ombor \u00b7 polka 09', v: '64', tone: 'neg' },
      ] },
      { t: 'Ko\u02bbchirishlar', type: 'rows', data: [
        { t: 'A \u2192 B ombor', m: 'Operator \u00b7 11:20', v: '240', tone: 'a' },
        { t: 'B \u2192 A ombor', m: 'Operator \u00b7 09:05', v: '120', tone: 'a' },
      ] },
    ],
    insight: null,
  },
  PURCHASING: {
    kpis: [
      kpi('Xarid buyurtmalari', '24', '', 'ochiq', 'truck', 'a'),
      kpi('Yetkazib beruvchilar', '86', '', 'faol', 'users', 'v'),
      kpi('Xarid hajmi', '968', 'mln', 'bu oy', 'calc', 'm'),
      kpi('Kutilayotgan', '6', '', 'yo\u02bblda', 'clock', 'a'),
    ],
    chart: null,
    panels: [
      { t: 'Yetkazib beruvchilar', type: 'rank', data: [
        { k: 'IP Aliev', v: 96, label: '284 mln' },
        { k: 'OOO Metall Plus', v: 74, label: '218 mln' },
        { k: 'Sinonim Trade', v: 58, label: '172 mln' },
        { k: 'OOO Eko Plast', v: 41, label: '126 mln' },
      ] },
      { t: 'Buyurtmalar', type: 'rows', data: [
        { t: 'PO-2210 \u00b7 IP Aliev', m: 'yo\u02bblda \u00b7 26.09', v: '64 mln', tone: 'warn' },
        { t: 'PO-2209 \u00b7 Metall Plus', m: 'tasdiqlangan', v: '128 mln', tone: 'pos' },
      ] },
    ],
    insight: null,
  },
  HR: {
    kpis: [
      kpi('Xodimlar', '128', '', '12 bo\u02bblim', 'users', 'a'),
      kpi('Ish haqi', '96', 'mln', 'avgust', 'wallet', 'm'),
      kpi('Ish vaqti', '1 024', 'soat', 'bu hafta', 'clock', 'v'),
      kpi('Ta\u02bbtil', '14', '', 'rejada', 'file', 'a'),
    ],
    chart: null,
    panels: [
      { t: 'Bo\u02bblimlar', type: 'rank', data: [
        { k: 'Ishlab chiqarish', v: 96, label: '58' },
        { k: 'Savdo', v: 62, label: '34' },
        { k: 'Ombor', v: 44, label: '22' },
        { k: 'Boshqaruv', v: 26, label: '14' },
      ] },
    ],
    insight: null,
  },
  PRODUCTION: {
    kpis: [
      kpi('Ish buyurtmalari', '18', '', 'ochiq', 'factory', 'a'),
      kpi('Bajarildi', '142', '', 'bu oy', 'checkCircle', 'm'),
      kpi('Tannarx', '1 362', 'mln', 'bu oy', 'calc', 'v'),
      kpi('Brak', '1,8', '%', 'me\u02bbyorga yaqin', 'alert', 'r'),
    ],
    chart: 'cost',
    panels: [
      { t: 'Ish buyurtmalari', type: 'rows', data: [
        { t: 'WO-1180 \u00b7 Profil A-120', m: 'rejalashtirilgan \u00b7 12.09', v: '840 dona', tone: 'a' },
        { t: 'WO-1179 \u00b7 Panel XL', m: 'bajarilmoqda \u00b7 62%', v: '520 dona', tone: 'warn' },
        { t: 'WO-1178 \u00b7 Komplekt B', m: 'tugallangan', v: '310 dona', tone: 'pos' },
      ] },
      { t: 'Tannarx tarkibi', type: 'cost', data: costStructure },
    ],
    insight: null,
  },
  CASHIER: {
    kpis: [
      kpi('Kassa qoldig\u02bbi', '18,4', 'mln', 'bugun', 'wallet', 'm'),
      kpi('Bugungi kirim', '42', 'mln', '14 operatsiya', 'inbox', 'a'),
      kpi('Bugungi chiqim', '12,6', 'mln', '6 operatsiya', 'outbox', 'v'),
      kpi('Cheklar', '86', '', 'bugun', 'file', 'a'),
    ],
    chart: null,
    panels: [
      { t: 'Kassa operatsiyalari', type: 'rows', data: [
        { t: 'Kirim \u00b7 IP Karimov', m: '14:22 \u00b7 naqd', v: '+8,4 mln', tone: 'pos' },
        { t: 'Chiqim \u00b7 ofis xarajati', m: '12:40 \u00b7 naqd', v: '-2,6 mln', tone: 'neg' },
        { t: 'Kirim \u00b7 AO Mega Stroy', m: '11:15 \u00b7 karta', v: '+18,0 mln', tone: 'pos' },
      ] },
    ],
    insight: null,
  },
  AUDITOR: {
    kpis: [
      kpi('Audit yozuvlari', '18 402', '', 'jami', 'file', 'a'),
      kpi('Hujjatlar', '4 218', '', 'tasdiqlangan', 'files', 'v'),
      kpi('Tasdiqlanmagan', '3', '', 'kutilmoqda', 'clock', 'r'),
      kpi('Yakuniy yopish', '31.08', '', 'imzo qo\u02bbyilgan', 'checkCircle', 'm'),
    ],
    chart: null,
    panels: [
      { t: 'Audit jurnali', type: 'rows', data: [
        { t: 'Hujjat o\u02bbzgartirildi \u2014 akt #4462', m: 'bosh.bux \u00b7 15:44', v: 'v2', tone: 'warn' },
        { t: 'Hujjat o\u02bbchirildi \u2014 loyiha', m: 'admin \u00b7 14:02', v: '!', tone: 'neg' },
        { t: 'Kirish \u00b7 bosh.bux', m: '08:31', v: 'OK', tone: 'pos' },
      ] },
    ],
    insight: null,
  },
};

/* ============================================================
   AI CFO — Q&A BANK
   Answers are scripted sample responses. `perm` lists the roles
   allowed to receive a real answer; others get the permission
   denial message. `data:false` produces the insufficient-data
   reply.
   ============================================================ */
export const AI_QA = [
  {
    q: 'qa.profit',
    perm: ['CEO', 'CHIEF', 'ADMIN'],
    tag: 'FACT',
    a: 'qa.profit.a',
    chart: null,
  },
  {
    q: 'qa.expense',
    perm: ['CEO', 'CHIEF', 'ADMIN'],
    tag: 'FACT',
    a: 'qa.expense.a',
    chart: 'expense',
  },
  {
    q: 'qa.receivables',
    perm: ['CEO', 'CHIEF', 'ACCOUNTANT', 'ADMIN'],
    tag: 'FACT',
    a: 'qa.receivables.a',
    chart: 'receivables',
  },
  {
    q: 'qa.cashflow',
    perm: ['CEO', 'CHIEF', 'CASHIER', 'ADMIN'],
    tag: 'ESTIMATE',
    a: 'qa.cashflow.a',
    chart: 'cashflow',
  },
  {
    q: 'qa.product',
    perm: ['CEO', 'SALES', 'CHIEF', 'ADMIN'],
    tag: 'FACT',
    a: 'qa.product.a',
    chart: 'product',
  },
  {
    q: 'qa.stock',
    perm: ['CEO', 'WAREHOUSE', 'SALES', 'PRODUCTION', 'PURCHASING', 'ADMIN'],
    tag: 'FACT',
    a: 'qa.stock.a',
    chart: null,
  },
  {
    q: 'qa.cost',
    perm: ['CEO', 'PRODUCTION', 'CHIEF', 'ADMIN'],
    tag: 'FACT',
    a: 'qa.cost.a',
    chart: 'cost',
  },
  {
    q: 'qa.payroll',
    perm: ['CEO', 'HR', 'CHIEF', 'ADMIN'],
    tag: 'FACT',
    a: 'qa.payroll.a',
    chart: null,
  },
  {
    q: 'qa.supplier',
    perm: ['CEO', 'PURCHASING', 'ADMIN'],
    tag: 'FACT',
    a: 'qa.supplier.a',
    chart: 'supplier',
  },
  {
    q: 'qa.forecast',
    perm: ['CEO', 'CHIEF', 'ADMIN'],
    tag: 'ESTIMATE',
    a: 'qa.forecast.a',
    chart: null,
  },
  {
    q: 'qa.audit',
    perm: ['AUDITOR', 'ADMIN'],
    tag: 'FACT',
    a: 'qa.audit.a',
    chart: null,
  },
  {
    q: 'qa.today',
    perm: null,
    tag: 'FACT',
    a: 'qa.today.a',
    chart: null,
  },
  {
    q: 'qa.capabilities',
    perm: null,
    tag: 'FACT',
    a: 'qa.capabilities.a',
    chart: null,
  },
  {
    q: 'qa.overdue',
    perm: null,
    tag: 'FACT',
    a: 'qa.overdue.a',
    chart: null,
  },
  {
    q: 'qa.orders',
    perm: ['CEO', 'SALES', 'WAREHOUSE', 'PRODUCTION', 'ADMIN'],
    tag: 'FACT',
    a: 'qa.orders.a',
    chart: null,
  },
  {
    q: 'qa.unmapped',
    perm: null,          // null = allowed for everyone
    data: false,         // triggers the "not enough data" reply
    tag: null,
    a: 'qa.unmapped.a',
    chart: null,
  },
];

/* Q&A text lives in the locale files so it can be translated. */
export const AI_QA_TEXT = {
  'qa.profit': {
    uz: { q: 'Bu oy foydamiz qancha?', a: 'Avgust oyida sof foyda 184 mln so\u02bbm.\nO\u02bbtgan oyga nisbatan 11% yuqori.' },
    en: { q: 'How much profit did we make this month?', a: 'Net profit for August is 184M UZS.\n11% higher than the previous month.' },
    ru: { q: 'Какая у нас прибыль в этом месяце?', a: 'Чистая прибыль за август — 184 млн сум.\nНа 11% выше, чем в прошлом месяце.' },
  },
  'qa.expense': {
    uz: { q: 'Eng katta xarajatim nima?', a: 'Eng katta xarajat bloki \u2014 xomashyo va materiallar: 706 mln so\u02bbm (oylik xarajatlarning 52%).\nUndan keyin \u2014 ish haqi 286 mln va energiya 108 mln.' },
    en: { q: 'What is our biggest expense?', a: 'The largest expense block is raw materials: 706M UZS (52% of monthly costs).\nFollowed by payroll at 286M and energy at 108M.' },
    ru: { q: 'Какой у нас самый большой расход?', a: 'Крупнейшая статья расходов — сырьё и материалы: 706 млн сум (52% месячных расходов).\nДалее — зарплата 286 млн и энергия 108 млн.' },
  },
  'qa.receivables': {
    uz: { q: 'Qaysi mijozlardan pul olishimiz kerak?', a: 'Muddati o\u02bbtgan 3 ta hisob-faktura, jami 84 mln so\u02bbm:\n\u2022 OOO Texnogroup \u2014 42 mln (12 kun)\n\u2022 IP Karimov \u2014 26 mln (18 kun)\n\u2022 AO Mega Stroy \u2014 16 mln (9 kun)' },
    en: { q: 'Which customers owe us money?', a: '3 invoices past due, 84M UZS in total:\n\u2022 OOO Texnogroup — 42M (12 days)\n\u2022 IP Karimov — 26M (18 days)\n\u2022 AO Mega Stroy — 16M (9 days)' },
    ru: { q: 'С кого нам получить оплату?', a: '3 просроченных счёта, всего 84 млн сум:\n\u2022 OOO Texnogroup — 42 млн (12 дней)\n\u2022 IP Karimov — 26 млн (18 дней)\n\u2022 AO Mega Stroy — 16 млн (9 дней)' },
  },
  'qa.cashflow': {
    uz: { q: 'Keyingi 30 kun cash flow qanday?', a: '30 kunlik prognoz: kirim 774 mln, chiqim 624 mln, sof +150 mln so\u02bbm.\nBu baholashdir \u2014 joriy qarzdarlik va rejalashtirilgan to\u02bblovlarga asoslangan.' },
    en: { q: 'What does cash flow look like for the next 30 days?', a: '30-day projection: inflow 774M, outflow 624M, net +150M UZS.\nThis is an estimate based on current receivables and planned payments.' },
    ru: { q: 'Каким будет денежный поток в ближайшие 30 дней?', a: 'Прогноз на 30 дней: приток 774 млн, отток 624 млн, нетто +150 млн сум.\nЭто оценка на основе текущей дебиторки и плановых платежей.' },
  },
  'qa.product': {
    uz: { q: 'Qaysi mahsulot eng ko\u02bbp foyda keltiryapti?', a: 'Eng yuqori foyda \u2014 Profil A-120: 96 mln so\u02bbm (marja 34%).\nUndan keyin: Panel XL \u2014 78 mln, Komplekt B \u2014 64 mln.' },
    en: { q: 'Which product brings the most profit?', a: 'Highest profit — Profil A-120: 96M UZS (34% margin).\nFollowed by Panel XL at 78M and Komplekt B at 64M.' },
    ru: { q: 'Какой товар приносит больше всего прибыли?', a: 'Наибольшая прибыль — Profil A-120: 96 млн сум (маржа 34%).\nДалее: Panel XL — 78 млн, Komplekt B — 64 млн.' },
  },
  'qa.stock': {
    uz: { q: 'Qaysi omborda mahsulot kam?', a: 'B-omborda 2 mahsulot minimum darajadan past:\n\u2022 Modul C-9 \u2014 64 dona (minimum 120)\n\u2022 Panel XL \u2014 842 dona (minimum 900)\nA-omborda qoldiqlar yetarli.' },
    en: { q: 'Which warehouse is low on stock?', a: 'Warehouse B has 2 items below minimum:\n\u2022 Modul C-9 — 64 units (min 120)\n\u2022 Panel XL — 842 units (min 900)\nWarehouse A stock is sufficient.' },
    ru: { q: 'На каком складе мало товара?', a: 'На складе B 2 позиции ниже минимума:\n\u2022 Modul C-9 — 64 шт. (минимум 120)\n\u2022 Panel XL — 842 шт. (минимум 900)\nНа складе A остатков достаточно.' },
  },
  'qa.cost': {
    uz: { q: 'Zavodda tannarx nima uchun oshdi?', a: 'Asosiy omil \u2014 xomashyo narxining oshishi (+7,4%).\nQo\u02bbshimcha ta\u02bbsir: energiya xarajati, brak darajasi va ishchi kuchi xarajati.' },
    en: { q: 'Why did factory cost increase?', a: 'The main driver is the rise in raw material prices (+7.4%).\nAdditional impact: energy cost, waste rate and labour cost.' },
    ru: { q: 'Почему выросла себестоимость на заводе?', a: 'Основной фактор — рост цен на сырьё (+7,4%).\nДополнительное влияние: затраты на энергию, уровень брака и стоимость рабочей силы.' },
  },
  'qa.payroll': {
    uz: { q: 'Ish haqi jamisi qancha?', a: 'Avgust oyi uchun ish haqi jamisi 286 mln so\u02bbm, 128 xodim.\nEng katta ulush \u2014 ishlab chiqarish bo\u02bblimi (58 xodim).' },
    en: { q: 'What is the total payroll?', a: 'Total payroll for August is 286M UZS across 128 employees.\nThe largest share is the production department (58 employees).' },
    ru: { q: 'Какой общий фонд зарплаты?', a: 'Общий фонд зарплаты за август — 286 млн сум, 128 сотрудников.\nНаибольшая доля — производственный цех (58 сотрудников).' },
  },
  'qa.supplier': {
    uz: { q: 'Eng yirik yetkazib beruvchi kim?', a: 'IP Aliev \u2014 284 mln so\u02bbm xarid hajmi (oylik xaridning 29%).\nKeyingi: OOO Metall Plus \u2014 218 mln.' },
    en: { q: 'Who is our largest supplier?', a: 'IP Aliev — 284M UZS of purchasing volume (29% of monthly purchases).\nNext: OOO Metall Plus at 218M.' },
    ru: { q: 'Кто наш крупнейший поставщик?', a: 'IP Aliev — 284 млн сум объёма закупок (29% месячных закупок).\nДалее: OOO Metall Plus — 218 млн.' },
  },
  'qa.forecast': {
    uz: { q: 'Kelasi oy savdo qanday bo\u02bbladi?', a: 'Joriy tendensiya asosida sentabr oyida savdo 1 920\u20131 980 mln so\u02bbm oralig\u02bbida kutiladi.\nBu prognoz baholashdir, kafolat emas.' },
    en: { q: 'What will sales look like next month?', a: 'Based on the current trend, September sales are expected in the 1 920\u20131 980M UZS range.\nThis is a forecast estimate, not a guarantee.' },
    ru: { q: 'Какими будут продажи в следующем месяце?', a: 'Исходя из текущего тренда, продажи в сентябре ожидаются в диапазоне 1 920\u20131 980 млн сум.\nЭто прогнозная оценка, не гарантия.' },
  },
  'qa.audit': {
    uz: { q: 'So\u02bbnggi audit yozuvlari qanday?', a: 'Bugun 214 ta audit yozuvi. 2 ta ogohlantirish:\n\u2022 muvaffaqiyatsiz kirish urinishi \u2014 09:58\n\u2022 hujjat o\u02bbzgartirildi \u2014 akt #4462 (v2).' },
    en: { q: 'What are the latest audit entries?', a: '214 audit entries today. 2 warnings:\n\u2022 failed login attempt — 09:58\n\u2022 document modified — act #4462 (v2).' },
    ru: { q: 'Какие последние записи аудита?', a: 'Сегодня 214 записей аудита. 2 предупреждения:\n\u2022 неудачная попытка входа — 09:58\n\u2022 документ изменён — акт #4462 (v2).' },
  },
  'qa.today': {
    uz: { q: 'Bugun biznesda eng muhim nima?', a: 'Sizning doirangizda bugun:\n\u2022 3 ta hisob-faktura muddati o\u02bbtgan \u2014 84 mln so\u02bbm\n\u2022 B-omborda 2 mahsulot minimum darajadan past\n\u2022 Savdo o\u02bbsishi o\u02bbrtgan oyg\u02bbga nisbatan +14%\nKo\u02bbrsatkichlar sizning rolingiz doirasida cheklangan.' },
    en: { q: 'What matters most in the business today?', a: 'Within your scope today:\n\u2022 3 invoices past due \u2014 84M UZS\n\u2022 2 warehouse items below minimum level\n\u2022 Sales up 14% vs the previous month\nMetrics are limited to your role scope.' },
    ru: { q: 'Что сегодня самое важное в бизнесе?', a: 'В вашей области сегодня:\n\u2022 3 просроченных счёта \u2014 84 млн сум\n\u2022 2 позиции на складе B ниже минимума\n\u2022 Рост продаж на 14% к прошлому месяцу\nПоказатели ограничены областью вашей роли.' },
  },
  'qa.capabilities': {
    uz: { q: 'Sen nima qila olasan?', a: 'Men sizning huquqlaringiz doirasida:\n\u2022 sof foyda, daromad va xarajatlarni ayta olaman\n\u2022 debitor va kreditor qarzni ko\u02bbrsataman\n\u2022 ombor qoldiqlari va kam qoldiq haqida ogohlantiraman\n\u2022 tannarx o\u02bbsishining omillarini tushuntiraman\n\u2022 cash flow prognozi beraman (baholash sifatida)\nMa\u02bblumot yetarli bo\u02bblmasa \u2014 buni ochiq aytaman.' },
    en: { q: 'What can you do?', a: 'Within your permissions I can:\n\u2022 report net profit, revenue and expenses\n\u2022 show receivables and payables\n\u2022 flag low warehouse stock\n\u2022 explain the drivers of a cost increase\n\u2022 give a cash-flow projection (as an estimate)\nIf data is insufficient, I say so.' },
    ru: { q: 'Что ты умеешь?', a: 'В рамках ваших прав я могу:\n\u2022 сообщать чистую прибыль, выручку и расходы\n\u2022 показывать дебиторскую и кредиторскую задолженность\n\u2022 предупреждать о низких остатках на складе\n\u2022 объяснять факторы роста себестоимости\n\u2022 давать прогноз денежного потока (как оценку)\nЕсли данных недостаточно \u2014 я честно об этом скажу.' },
  },
  'qa.overdue': {
    uz: { q: 'Muddati o\u02bbtgan hujjatlar bormi?', a: 'Sizning doirangizda 3 ta muddati o\u02bbtgan hujjat:\n\u2022 Hisob-faktura #4820 \u2014 OOO Texnogroup \u2014 42 mln\n\u2022 Hisob-faktura #4795 \u2014 IP Karimov \u2014 26 mln\n\u2022 Hisob-faktura #4808 \u2014 AO Mega Stroy \u2014 16 mln\nUlarni tasdiq markazida ko\u02bbrishingiz mumkin.' },
    en: { q: 'Are there any overdue documents?', a: '3 documents past due within your scope:\n\u2022 Invoice #4820 \u2014 OOO Texnogroup \u2014 42M\n\u2022 Invoice #4795 \u2014 IP Karimov \u2014 26M\n\u2022 Invoice #4808 \u2014 AO Mega Stroy \u2014 16M\nYou can review them in the Approval Centre.' },
    ru: { q: 'Есть ли просроченные документы?', a: '3 просроченных документа в вашей области:\n\u2022 Счёт #4820 \u2014 OOO Texnogroup \u2014 42 млн\n\u2022 Счёт #4795 \u2014 IP Karimov \u2014 26 млн\n\u2022 Счёт #4808 \u2014 AO Mega Stroy \u2014 16 млн\nИх можно посмотреть в центре согласования.' },
  },
  'qa.orders': {
    uz: { q: 'Nechta buyurtma kutilmoqda?', a: 'Hozircha 12 ta buyurtma jo\u02bbnatishni kutmoqda:\n\u2022 8 tasi bugun jo\u02bbnatilishi kerak\n\u2022 4 tasi ertaga\nB-omborda 2 mahsulot yetarli emas \u2014 jo\u02bbnatish kechikishi mumkin.' },
    en: { q: 'How many orders are awaiting shipment?', a: '12 orders are currently awaiting shipment:\n\u2022 8 are due to ship today\n\u2022 4 tomorrow\n2 items in warehouse B are insufficient \u2014 shipment may be delayed.' },
    ru: { q: 'Сколько заказов ожидает отгрузки?', a: 'Сейчас 12 заказов ожидают отгрузки:\n\u2022 8 должны отгрузиться сегодня\n\u2022 4 завтра\n2 позиции на складе B недостаточно \u2014 отгрузка может задержаться.' },
  },
  'qa.unmapped': {
    uz: { q: 'Raqobatchilar bilan solishtirish natijasi qanday?', a: 'Bu xulosani chiqarish uchun yetarli ma\u02bblumot mavjud emas. Tizimda bu ko\u02bbrsatkich bo\u02bbyicha ma\u02bblumot to\u02bbplanmagan.' },
    en: { q: 'How do we compare with competitors?', a: 'There is not enough data to draw this conclusion. No data has been collected for this metric in the system.' },
    ru: { q: 'Как мы сравниваемся с конкурентами?', a: 'Недостаточно данных для такого вывода. По этому показателю данные в системе не собраны.' },
  },
};

export const ROLE_KEYS = ['CEO', 'ADMIN', 'CHIEF', 'ACCOUNTANT', 'SALES', 'WAREHOUSE', 'PURCHASING', 'HR', 'PRODUCTION', 'CASHIER', 'AUDITOR'];
