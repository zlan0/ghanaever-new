/* ── GhanaFront Shared JS v2 ─────────────────────────────────────── */

/* ── SVG Icons ─────────────────────────────────────────────────────── */
const ICONS = {
  home:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  politics:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  business:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  sports:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  tech:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  health:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13"/></svg>`,
  ent:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  world:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  search:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  moon:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  sun:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  chat:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  chatSm:  `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  chatLg:  `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  share:   `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  eye:     `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  trending:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  news:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/></svg>`,
  srcDot:  `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/></svg>`,
  close:   `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  send:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  imgPlaceholder: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke-width="0.9" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  check:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  down:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  ad:      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  externalLink: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  mail:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  megaphone:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
  subscribe:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  menu:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  rss:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>`,
  database:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  palette: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  popup:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
  nav:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="17" y2="12"/><line x1="3" y1="18" x2="13" y2="18"/></svg>`,
  gear:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  api:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 9l3 3-3 3"/><line x1="13" y1="15" x2="16" y2="15"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>`,
  plus:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  trash:   `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  save:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
  lock:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
};

/* ── Site Config (persisted in localStorage, editable from admin) ─── */
function getSiteConfig() {
  try {
    const stored = localStorage.getItem('gf_site_config');
    if (stored) return { ...defaultConfig(), ...JSON.parse(stored) };
  } catch(e) {}
  return defaultConfig();
}

function defaultConfig() {
  return {
    siteName: 'GhanaFront',
    siteTagline: 'Ghana News Today | Breaking News Accra',
    siteUrl: 'https://ghanafront.com',
    adminEmail: 'admin@ghanafront.com',
    primaryColor: '#ce1126',
    accentColor: '#d4993a',
    searchPlaceholder: 'Search Ghana news…',
    tickerSpeed: 18,
    tickerLabel: 'Breaking',
    breakingNews: [
      "Ghana's Economy Grows 6.2% in Q4 — IMF Confirms",
      "Black Stars Qualify for AFCON 2025 After Win vs Mali",
      "Parliament Passes Digital Economy Bill 167–52",
      "Accra Startup HealthBridge Raises $12M Series A",
      "GH₵ Hits 5-Month High Against Dollar",
      "Kuami Eugene World Tour — Accra Date Confirmed",
      "Free Malaria Vaccine Reaches 2M Children in Northern Ghana",
    ],
    trendingNews: [
      "Ghana's Parliament Passes Historic Digital Economy Bill",
      "Black Stars AFCON 2025 Squad Announced",
      "Accra Highway Expansion Phase 2 Begins",
      "Bank of Ghana Rate Decision Boosts Cedi",
      "HealthBridge $12M Series A Funding",
    ],
    menuLinks: ['Feed','Politics','Business','Sports','Tech','Health','Entertainment','World'],
    showSubscribePopup: true,
    showAdvertisePopup: true,
    subscribeDelay: 6000,
    rssSources: [
      { name: 'CitiNews', url: 'https://citinewsroom.com/feed/', active: true },
      { name: 'JoyOnline', url: 'https://www.myjoyonline.com/feed/', active: true },
      { name: 'GhanaWeb', url: 'https://www.ghanaweb.com/GhanaHomePage/rss/rss.xml', active: true },
      { name: 'Graphic Online', url: 'https://www.graphic.com.gh/feed', active: true },
      { name: 'Pulse Ghana', url: 'https://www.pulse.com.gh/rss', active: false },
    ],
    dbHost: 'localhost',
    dbPort: '5432',
    dbName: 'ghanafront',
    dbUser: 'admin',
  };
}

function saveSiteConfig(cfg) {
  localStorage.setItem('gf_site_config', JSON.stringify(cfg));
}

/* ── Placeholder backgrounds per category ─────────────────────────── */
const CAT_BG = {
  politics:     'linear-gradient(135deg,#fef9c3,#fefce8)',
  business:     'linear-gradient(135deg,#dcfce7,#f0fdf4)',
  sports:       'linear-gradient(135deg,#dbeafe,#eff6ff)',
  tech:         'linear-gradient(135deg,#f3e8ff,#faf5ff)',
  health:       'linear-gradient(135deg,#fee2e2,#fff1f2)',
  entertainment:'linear-gradient(135deg,#fce7f3,#fdf4ff)',
  world:        'linear-gradient(135deg,#fff7ed,#fffbeb)',
  general:      'linear-gradient(135deg,#f9fafb,#f3f4f6)',
};
const CAT_STROKE = {
  politics:'#fde047', business:'#86efac', sports:'#93c5fd',
  tech:'#c4b5fd', health:'#fca5a5', entertainment:'#f9a8d4',
  world:'#fdba74', general:'#d1d5db',
};

/* Rotating category placeholder icon sets */
const CAT_PLACEHOLDER_SETS = {
  politics: [
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="18" r="13" stroke="#fde047" stroke-width="1.4"/><polyline points="19.16 32.5 16.3 53.7 28 46.7 39.7 53.7 36.84 32.5" stroke="#fde047" stroke-width="1.4" stroke-linecap="round"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="8" y="10" width="40" height="28" rx="3" stroke="#fde047" stroke-width="1.4"/><line x1="8" y1="20" x2="48" y2="20" stroke="#fde047" stroke-width="1.4"/><line x1="22" y1="38" x2="22" y2="46" stroke="#fde047" stroke-width="1.4"/><line x1="34" y1="38" x2="34" y2="46" stroke="#fde047" stroke-width="1.4"/><line x1="14" y1="46" x2="42" y2="46" stroke="#fde047" stroke-width="1.4"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M28 8L34 22H50L37 31L41 45L28 36L15 45L19 31L6 22H22L28 8Z" stroke="#fde047" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  ],
  business: [
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><line x1="28" y1="4" x2="28" y2="52" stroke="#86efac" stroke-width="1.4"/><path d="M39 11H22a8 8 0 0 0 0 16h12a8 8 0 0 1 0 16H14" stroke="#86efac" stroke-width="1.4" stroke-linecap="round"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><polyline points="6 42 18 28 26 34 36 20 50 10" stroke="#86efac" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><polyline points="38 10 50 10 50 22" stroke="#86efac" stroke-width="1.4" stroke-linecap="round"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="8" y="26" width="10" height="22" rx="2" stroke="#86efac" stroke-width="1.4"/><rect x="23" y="18" width="10" height="30" rx="2" stroke="#86efac" stroke-width="1.4"/><rect x="38" y="10" width="10" height="38" rx="2" stroke="#86efac" stroke-width="1.4"/></svg>`,
  ],
  sports: [
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="20" stroke="#93c5fd" stroke-width="1.4"/><path d="M28 8a20 20 0 0 1 0 40M8 28h40M14 14l28 28M42 14 14 42" stroke="#93c5fd" stroke-width="0.8"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><polyline points="52 28 42 28 35 49 21 7 14 28 4 28" stroke="#93c5fd" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M28 6c-12.15 0-22 9.85-22 22s9.85 22 22 22 22-9.85 22-22" stroke="#93c5fd" stroke-width="1.4" stroke-linecap="round"/><path d="M38 6l8 8-8 8" stroke="#93c5fd" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  ],
  tech: [
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="6" y="8" width="44" height="30" rx="4" stroke="#c4b5fd" stroke-width="1.4"/><line x1="18" y1="48" x2="38" y2="48" stroke="#c4b5fd" stroke-width="1.4" stroke-linecap="round"/><line x1="28" y1="38" x2="28" y2="48" stroke="#c4b5fd" stroke-width="1.4"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M20 20 12 28l8 8" stroke="#c4b5fd" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 20l8 8-8 8" stroke="#c4b5fd" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><line x1="30" y1="16" x2="26" y2="40" stroke="#c4b5fd" stroke-width="1.4" stroke-linecap="round"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="8" y="14" width="40" height="28" rx="3" stroke="#c4b5fd" stroke-width="1.4"/><circle cx="28" cy="28" r="8" stroke="#c4b5fd" stroke-width="1.4"/><line x1="28" y1="14" x2="28" y2="20" stroke="#c4b5fd" stroke-width="1.4"/><line x1="28" y1="36" x2="28" y2="42" stroke="#c4b5fd" stroke-width="1.4"/></svg>`,
  ],
  health: [
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M28 49C28 49 6 36.3 6 21.5A12.5 12.5 0 0 1 28 16.5 12.5 12.5 0 0 1 50 21.5C50 36.3 28 49 28 49z" stroke="#fca5a5" stroke-width="1.4"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="20" y="6" width="16" height="44" rx="3" stroke="#fca5a5" stroke-width="1.4"/><rect x="6" y="20" width="44" height="16" rx="3" stroke="#fca5a5" stroke-width="1.4"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="20" stroke="#fca5a5" stroke-width="1.4"/><path d="M18 28h20M28 18v20" stroke="#fca5a5" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  ],
  entertainment: [
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M21 42V13L53 6V35" stroke="#f9a8d4" stroke-width="1.4" stroke-linecap="round"/><circle cx="14" cy="42" r="7" stroke="#f9a8d4" stroke-width="1.4"/><circle cx="46" cy="35" r="7" stroke="#f9a8d4" stroke-width="1.4"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><polygon points="22 12 44 28 22 44" stroke="#f9a8d4" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="6" y="6" width="44" height="44" rx="4" stroke="#f9a8d4" stroke-width="1.4"/><circle cx="28" cy="28" r="10" stroke="#f9a8d4" stroke-width="1.4"/><circle cx="28" cy="28" r="3" fill="#f9a8d4"/></svg>`,
  ],
  world: [
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="22" stroke="#fdba74" stroke-width="1.4"/><line x1="6" y1="28" x2="50" y2="28" stroke="#fdba74" stroke-width="1.4"/><path d="M28 6a36 36 0 0 1 9 22 36 36 0 0 1-9 22 36 36 0 0 1-9-22A36 36 0 0 1 28 6z" stroke="#fdba74" stroke-width="1.4"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M6 28h6l4-8 6 16 6-20 4 12h18" stroke="#fdba74" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><polygon points="28 6 34 20 50 20 37 30 42 44 28 35 14 44 19 30 6 20 22 20" stroke="#fdba74" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  ],
  general: [
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M10 50h36a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4H20a4 4 0 0 0-4 4v36a4 4 0 0 1-4 4zm0 0a4 4 0 0 1-4-4V28c0-2.2 1.8-4 4-4h4" stroke="#d1d5db" stroke-width="1.4" stroke-linecap="round"/><line x1="22" y1="20" x2="42" y2="20" stroke="#d1d5db" stroke-width="1.4" stroke-linecap="round"/><line x1="22" y1="28" x2="42" y2="28" stroke="#d1d5db" stroke-width="1.4" stroke-linecap="round"/><line x1="22" y1="36" x2="34" y2="36" stroke="#d1d5db" stroke-width="1.4" stroke-linecap="round"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="20" stroke="#d1d5db" stroke-width="1.4"/><line x1="8" y1="28" x2="48" y2="28" stroke="#d1d5db" stroke-width="1.4"/><line x1="28" y1="8" x2="28" y2="48" stroke="#d1d5db" stroke-width="0.7"/></svg>`,
    `<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="8" y="8" width="40" height="40" rx="4" stroke="#d1d5db" stroke-width="1.4"/><path d="M8 20h40M8 32h40M20 8v40M32 8v40" stroke="#d1d5db" stroke-width="0.7"/></svg>`,
  ],
};

/* Track which placeholder icon is shown per card */
const _placeholderIdx = {};
function getRotatingPlaceholder(cat, key) {
  const set = CAT_PLACEHOLDER_SETS[cat] || CAT_PLACEHOLDER_SETS.general;
  if (!_placeholderIdx[key]) _placeholderIdx[key] = Math.floor(Math.random() * set.length);
  return set[_placeholderIdx[key] % set.length];
}

/* ── Mock Data ─────────────────────────────────────────────────────── */
const MOCK_TRENDING = [
  { id:'1', title:"Ghana's Economy Grows 6.2% in Q4 — IMF Confirms", category:'business', source:'CitiNews', time:'2h' },
  { id:'2', title:"Black Stars Qualify for AFCON 2025 After Win vs Mali", category:'sports', source:'JoyOnline', time:'3h' },
  { id:'3', title:"Parliament Passes Digital Economy Bill 167–52", category:'politics', source:'GhanaWeb', time:'2h' },
  { id:'4', title:"Accra Startup HealthBridge Raises $12M Series A", category:'tech', source:'Graphic', time:'5h' },
  { id:'5', title:"GH₵ Hits 5-Month High Against Dollar", category:'business', source:'GhanaBizNews', time:'3h' },
  { id:'6', title:"Kuami Eugene World Tour — Accra Date Confirmed", category:'entertainment', source:'CitiNews', time:'6h' },
  { id:'7', title:"Free Malaria Vaccine Reaches 2M Children in Northern Ghana", category:'health', source:'GhanaWeb', time:'8h' },
];

const MOCK_ARTICLES = [
  { id:'h1', title:"Ghana's Parliament Passes Historic Digital Economy Bill in Landmark 167–52 Vote", summary:"The bill establishes a national digital infrastructure fund and creates pathways for fintech startups to access government contracts.", source:'CitiNews', category:'politics', published_at: new Date(Date.now()-7200000).toISOString(), views:24831, url:'#' },
  { id:'a1', title:"Black Stars Name 26-Man Squad for AFCON 2025 — Three Surprise Inclusions From Domestic League", summary:"Coach Otto Addo confirmed the squad with three uncapped domestic league players.", source:'JoyOnline', category:'sports', published_at: new Date(Date.now()-3600000).toISOString(), views:18200, url:'#' },
  { id:'a2', title:"GH₵ Hits 5-Month High Against Dollar Following Bank of Ghana Rate Decision", summary:"The cedi gained 2.3% following an unexpected rate cut by the monetary policy committee.", source:'Ghana Business News', category:'business', published_at: new Date(Date.now()-10800000).toISOString(), views:9700, url:'#' },
  { id:'a3', title:"Accra Startup Raises $12M Series A to Scale Mobile Health Platform Across West Africa", summary:"HealthBridge announced funding from European and US impact investors.", source:'Graphic Online', category:'tech', published_at: new Date(Date.now()-18000000).toISOString(), views:7100, url:'#' },
  { id:'a4', title:"Kuami Eugene Announces World Tour — Accra Show Confirmed for April at AICC", summary:"The Afrobeats star will perform in Accra with support from emerging Ghanaian artists.", source:'CitiNews', category:'entertainment', published_at: new Date(Date.now()-21600000).toISOString(), views:15400, url:'#' },
  { id:'a5', title:"Free Malaria Vaccination Reaches 2 Million Children in Northern Ghana Ahead of Schedule", summary:"The Health Ministry confirmed milestone coverage as part of the WHO-backed campaign.", source:'GhanaWeb', category:'health', published_at: new Date(Date.now()-28800000).toISOString(), views:6300, url:'#' },
  { id:'a6', title:"AU Summit: Ghana Tables AfCFTA Expansion Proposal to Cut Tariffs 40% by 2026", summary:"President's delegation presented a framework for reducing cross-border tariffs on manufactured goods.", source:'BBC Africa', category:'world', published_at: new Date(Date.now()-36000000).toISOString(), views:4800, url:'#' },
  { id:'a7', title:"Accra-Kumasi Highway Expansion: Phase 2 Construction Begins March 2025", summary:"The Ghana Highway Authority confirmed the second phase covering 120km will be completed by Q3 2026.", source:'GhanaWeb', category:'general', published_at: new Date(Date.now()-43200000).toISOString(), views:3200, url:'#' },
];

/* ── Utilities ─────────────────────────────────────────────────────── */
function timeAgo(isoString) {
  try {
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  } catch { return 'recently'; }
}

function isBreaking(isoString) {
  try { return Date.now() - new Date(isoString).getTime() < 3600000; }
  catch { return false; }
}

function fmtViews(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

async function shareArticle(title, id) {
  const url = `${location.origin}/pages/article.html?id=${id}`;
  if (navigator.share) { try { await navigator.share({ title, url }); return; } catch {} }
  navigator.clipboard.writeText(url);
}

/* ── API ───────────────────────────────────────────────────────────── */
async function apiFetch(path) {
  try {
    const base = (typeof API_BASE !== 'undefined') ? API_BASE : '';
    const r = await fetch(base + path, { signal: AbortSignal.timeout(4000) });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

/* ── Dark Mode ─────────────────────────────────────────────────────── */
function applyDark() {
  const isDark = localStorage.getItem('gf_dark') === '1';
  document.documentElement.classList.toggle('dark', isDark);
  const btn = document.getElementById('darkBtn');
  if (btn) btn.innerHTML = isDark ? ICONS.sun : ICONS.moon;
}
function toggleDark() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('gf_dark', isDark ? '1' : '0');
  const btn = document.getElementById('darkBtn');
  if (btn) btn.innerHTML = isDark ? ICONS.sun : ICONS.moon;
}

/* ── Header Builder ────────────────────────────────────────────────── */
function buildHeader(activePage = '') {
  const cfg = getSiteConfig();
  const pages = cfg.menuLinks || ['Feed','Politics','Business','Sports','Tech','Health','Entertainment','World'];
  return `
  <div class="ghana-bar"></div>
  <header class="header">
    <div class="header-inner">
      <a class="logo" href="../index.html">
        <div class="logo-mark">
          <div class="logo-mark-bg"></div>
          <div class="logo-mark-letter">${(cfg.siteName || 'GhanaFront')[0]}</div>
        </div>
        <span class="logo-name">${cfg.siteName || 'GhanaFront'}</span>
      </a>
      <button class="mobile-menu-btn" id="mobileMenuBtn" onclick="toggleMobileMenu()" aria-label="Menu">
        ${ICONS.menu}
      </button>
      <nav class="nav" id="mainNav">
        ${pages.map(p => `
          <a class="nav-link${p === activePage ? ' active' : ''}"
             href="${p === 'Feed' ? '../index.html' : `../pages/${p.toLowerCase()}.html`}">
            ${p}
          </a>`).join('')}
      </nav>
      <div class="search-wrap">
        <div class="search-box">
          ${ICONS.search}
          <input type="text" id="searchInput" placeholder="${cfg.searchPlaceholder || 'Search Ghana news…'}" autocomplete="off">
          <span class="search-kbd">⌘K</span>
        </div>
        <div class="search-suggestions" id="searchSugg"></div>
      </div>
      <div class="header-right">
        <button class="icon-btn ad-btn" onclick="openAdvertisePopup()" title="Advertise With Us">
          ${ICONS.megaphone}<span class="ad-btn-text">Advertise</span>
        </button>
        <button class="icon-btn sub-btn" onclick="openSubscribePopup()" title="Subscribe">
          ${ICONS.subscribe}
        </button>
        <button class="icon-btn" id="darkBtn" onclick="toggleDark()" title="Toggle theme"></button>
        <button class="icon-btn" id="chatToggleBtn" onclick="toggleChat()" title="AI Assistant">
          ${ICONS.chat}
        </button>
        <div class="live-chip">
          <div class="live-dot"></div>
          <span class="live-label">Live</span>
        </div>
      </div>
    </div>
    <div class="mobile-nav" id="mobileNav">
      ${pages.map(p => `
        <a class="mobile-nav-link${p === activePage ? ' active' : ''}"
           href="${p === 'Feed' ? '../index.html' : `../pages/${p.toLowerCase()}.html`}">
          ${p}
        </a>`).join('')}
      <div class="mobile-nav-footer">
        <button class="mobile-cta" onclick="openSubscribePopup();closeMobileMenu()">Subscribe Newsletter</button>
        <button class="mobile-cta mobile-cta-outline" onclick="openAdvertisePopup();closeMobileMenu()">Advertise With Us</button>
      </div>
    </div>
  </header>`;
}

function toggleMobileMenu() {
  document.getElementById('mobileNav')?.classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileNav')?.classList.remove('open');
}

/* ── Ticker Builder ────────────────────────────────────────────────── */
function buildTicker(items) {
  const cfg = getSiteConfig();
  const speed = cfg.tickerSpeed || 18;
  const label = cfg.tickerLabel || 'Breaking';
  let tickerItems = cfg.breakingNews && cfg.breakingNews.length
    ? cfg.breakingNews.map((t, i) => ({ id: String(i), title: t }))
    : items;
  const doubled = [...tickerItems, ...tickerItems];
  return `
  <div class="ticker">
    <div class="ticker-tag">
      <div class="ticker-blink"></div>${label}
    </div>
    <div class="ticker-track">
      <div class="ticker-reel" style="animation-duration:${speed}s">
        ${doubled.map(a => `
          <a class="ticker-item" href="${a.url || '#'}">
            <div class="ticker-sep"></div>
            ${a.title}
          </a>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ── Hero Card Builder ─────────────────────────────────────────────── */
function buildHero(article) {
  const cat = article.category || 'general';
  const bg  = CAT_BG[cat] || CAT_BG.general;
  const icon = getRotatingPlaceholder(cat, 'hero_' + article.id);
  const breaking = isBreaking(article.published_at);
  return `
  <a href="pages/article.html?id=${article.id}" class="hero">
    <div class="hero-body">
      <div>
        <div class="hero-tags">
          ${breaking ? `<span class="tag tag-breaking"><div class="ticker-blink"></div>Breaking</span>` : ''}
          <span class="tag tag-${cat}">${cat}</span>
        </div>
        <h2 class="hero-title">${article.title}</h2>
        <p class="hero-excerpt">${article.summary || ''}</p>
      </div>
      <div class="hero-foot">
        <div class="src-block">
          <div class="src-dot" style="color:white">${ICONS.srcDot}</div>
          <div>
            <div class="src-name">${article.source}</div>
            <div class="src-time">${timeAgo(article.published_at)}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${article.views ? `<div class="stat-pill">${ICONS.eye} ${fmtViews(article.views)}</div>` : ''}
          <button class="share-btn" onclick="event.preventDefault();shareArticle('${article.title.replace(/'/g,"\\'")}','${article.id}')">
            ${ICONS.share} Share
          </button>
        </div>
      </div>
    </div>
    <div class="hero-img-wrap">
      ${article.image_url
        ? `<img src="${article.image_url}" alt="${article.title}" loading="lazy">`
        : `<div class="hero-placeholder" style="background:${bg}">
             <div class="placeholder-inner">
               ${icon}
               <span class="placeholder-cat-label">${cat.toUpperCase()}</span>
             </div>
           </div>`}
    </div>
  </a>`;
}

/* ── Article Card Builder ──────────────────────────────────────────── */
function buildCard(article, index = 0) {
  const cat = article.category || 'general';
  const bg  = CAT_BG[cat] || CAT_BG.general;
  const icon = getRotatingPlaceholder(cat, 'card_' + article.id);
  return `
  <a href="pages/article.html?id=${article.id}" class="card" style="animation-delay:${index * 0.04}s">
    <div class="card-img-wrap">
      ${article.image_url
        ? `<img src="${article.image_url}" alt="${article.title}" loading="lazy">`
        : `<div class="card-placeholder" style="background:${bg}">
             <div class="placeholder-inner">
               ${icon}
             </div>
           </div>`}
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span class="tag tag-${cat}">${cat}</span>
        <span class="card-time">${timeAgo(article.published_at)}</span>
      </div>
      <div class="card-title">${article.title}</div>
      ${article.summary ? `<div class="card-excerpt">${article.summary}</div>` : ''}
      <div class="card-foot">
        <span class="card-src">${article.source}</span>
        <div class="card-stats">
          ${article.views ? `<div class="card-stat">${ICONS.eye} ${fmtViews(article.views)}</div>` : ''}
          <button class="card-action" onclick="event.preventDefault();shareArticle('${article.title.replace(/'/g,"\\'")}','${article.id}')">
            ${ICONS.share}
          </button>
        </div>
      </div>
    </div>
  </a>`;
}

/* ── Sidebar Builder ───────────────────────────────────────────────── */
/* ── Sidebar Builder ───────────────────────────────────────────────── */
const SIDEBAR_SECTIONS = [
  { id:'all',           label:'All News',      icon: ICONS.home     },
  { id:'politics',      label:'Politics',      icon: ICONS.politics },
  { id:'business',      label:'Business',      icon: ICONS.business },
  { id:'sports',        label:'Sports',        icon: ICONS.sports   },
  { id:'tech',          label:'Tech',          icon: ICONS.tech     },
  { id:'health',        label:'Health',        icon: ICONS.health   },
  { id:'entertainment', label:'Entertainment', icon: ICONS.ent      },
  { id:'world',         label:'World',         icon: ICONS.world    },
  { id:'general',       label:'General',       icon: ICONS.news     },
];

// Live counts fetched from API — keyed by category id
let _sidebarCounts = {};

async function fetchSidebarCounts() {
  // Reuse the articles already loaded if available, otherwise hit the API
  // We fetch a large page to count categories client-side
  const data = await apiFetch('/api/articles?category=all&limit=200&sort=recent');
  if (!data?.articles) return;

  const counts = { all: data.articles.length };
  for (const article of data.articles) {
    const cat = article.category || 'general';
    counts[cat] = (counts[cat] || 0) + 1;
  }
  _sidebarCounts = counts;

  // Update counts in the already-rendered sidebar without rebuilding it
  SIDEBAR_SECTIONS.forEach(s => {
    const countEl = document.querySelector(`.sidebar-btn[data-cat="${s.id}"] .s-count`);
    if (countEl) {
      const n = _sidebarCounts[s.id];
      countEl.textContent = n !== undefined ? n : '';
    }
  });
}

function buildSidebar(activeCategory = 'all', activeRegion = 'ghana') {
  const sections = SIDEBAR_SECTIONS.map(s => {
    const count = _sidebarCounts[s.id];
    return `
    <button class="sidebar-btn${s.id === activeCategory ? ' active' : ''}"
            data-cat="${s.id}"
            onclick="filterCategory('${s.id}',this)">
      <span class="si">${s.icon}</span>
      ${s.label}
      <span class="s-count">${count !== undefined ? count : ''}</span>
    </button>`;
  }).join('');

  const regions = ['ghana','africa','global'].map(r => `
    <button class="region-btn${r === activeRegion ? ' active' : ''}"
            onclick="filterRegion('${r}',this)">
      ${r.charAt(0).toUpperCase() + r.slice(1)}
    </button>`).join('');

  return `
  <aside class="left-col">
    <div style="margin-bottom:20px">
      <div class="sidebar-label">Sections</div>
      ${sections}
    </div>
    <div class="sidebar-divider"></div>
    <div style="margin-bottom:20px">
      <div class="sidebar-label">Region</div>
      ${regions}
    </div>
    <div class="sidebar-divider"></div>
    <div class="ad-widget" style="cursor:pointer" onclick="openAdvertisePopup()">
      <div class="ad-label">Advertisement</div>
      <div class="ad-block" style="height:90px">${ICONS.ad}<span style="font-size:10px;font-family:'Geist Mono',monospace;color:var(--subtle)">Advertise Here</span></div>
    </div>
  </aside>`;
}

/* ── Trending Sidebar Builder ──────────────────────────────────────── */
function buildTrendingSidebar(articles) {
  const items = articles.slice(0,7).map((a,i) => `
    <a href="pages/article.html?id=${a.id}" class="trend-item">
      <div class="trend-num">${String(i+1).padStart(2,'0')}</div>
      <div>
        <div class="trend-title">${a.title}</div>
        <div class="trend-meta">
          <span>${a.source}</span>
          <div class="trend-sep"></div>
          <span style="font-family:'Geist Mono',monospace">${a.time || '—'}</span>
        </div>
      </div>
    </a>`).join('');

  return `
  <aside class="right-col">
    <div class="widget">
      <div class="widget-title">
        ${ICONS.trending} Trending Now <div class="widget-line"></div>
      </div>
      ${items}
    </div>
    <div class="ad-widget" style="margin-bottom:20px;cursor:pointer" onclick="openAdvertisePopup()">
      <div class="ad-label">Advertise With Us</div>
      <div class="ad-block" style="height:190px">${ICONS.ad}<span style="font-size:10px;font-family:'Geist Mono',monospace;color:var(--subtle)">300×250 Slot Available</span></div>
    </div>
    <div class="widget">
      <div class="widget-title">
        ${ICONS.news} Sources <div class="widget-line"></div>
      </div>
      ${[['CitiNews','Ghana'],['JoyOnline','Ghana'],['GhanaWeb','Ghana'],['Graphic Online','Ghana'],['BBC Africa','Africa']].map(([n,r])=>`
        <div class="src-list-item">
          <span class="src-list-name">${n}</span>
          <span class="src-list-region">${r}</span>
        </div>`).join('')}
    </div>
    <div class="subscribe-widget">
      <div class="subscribe-widget-icon">${ICONS.mail}</div>
      <div class="subscribe-widget-title">Breaking News in Your Inbox</div>
      <div class="subscribe-widget-desc">Get instant alerts for major stories — free, no spam.</div>
      <button class="subscribe-widget-btn" onclick="openSubscribePopup()">Subscribe Free →</button>
    </div>
  </aside>`;
}

/* ── Chatbot ───────────────────────────────────────────────────────── */
const BOT_RESPONSES = [
  "Based on current reports, Ghana's economy grew 6.2% in Q4 — the strongest since 2019, confirmed by the IMF.",
  "The Black Stars squad for AFCON 2025 was confirmed by Coach Otto Addo, with three surprise domestic league inclusions.",
  "Parliament passed the Digital Economy Bill 167–52, creating a national digital infrastructure fund.",
  "The cedi hit a 5-month high after the Bank of Ghana cut its key rate to 27%, with inflation now at an 18-month low.",
  "The malaria vaccination programme reached 2 million children in northern Ghana ahead of schedule.",
];
let botIdx = 0;

function buildChatbot() {
  return `
  <div id="chatbot">
    <div class="chat-head">
      <div class="chat-avatar" style="color:white">${ICONS.chatSm}</div>
      <div class="chat-info">
        <div class="chat-name">GhanaFront AI</div>
        <div class="chat-status">
          <div class="chat-sdot"></div>Ask about any Ghana news topic
        </div>
      </div>
      <button class="chat-x" onclick="toggleChat()">${ICONS.close}</button>
    </div>
    <div class="chat-msgs" id="chatMsgs">
      <div class="msg-row">
        <div class="msg-av" style="color:white">${ICONS.chatSm}</div>
        <div class="bubble bot">Hi — I'm GhanaFront AI. Ask me anything about Ghana news.</div>
      </div>
    </div>
    <div class="chat-input-row">
      <input class="chat-input" id="chatInput" placeholder="e.g. What's happening in parliament?" />
      <button class="chat-send" id="chatSend">${ICONS.send}</button>
    </div>
  </div>
  <button id="fab" onclick="toggleChat()">${ICONS.chatLg}</button>`;
}

function initChat() {
  const input = document.getElementById('chatInput');
  const send  = document.getElementById('chatSend');
  if (!input || !send) return;
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
  send.addEventListener('click', sendChat);
}

function toggleChat() {
  const bot = document.getElementById('chatbot');
  if (!bot) return;
  bot.classList.toggle('open');
  if (bot.classList.contains('open')) {
    setTimeout(() => document.getElementById('chatInput')?.focus(), 80);
  }
}

async function sendChat() {
  const input = document.getElementById('chatInput');
  const msgs  = document.getElementById('chatMsgs');
  if (!input || !msgs) return;
  const q = input.value.trim();
  if (!q) return;
  input.value = '';
  document.getElementById('chatSend').disabled = true;
  msgs.innerHTML += `<div class="msg-row user"><div class="bubble user">${q}</div></div>`;
  msgs.innerHTML += `<div class="msg-row" id="typingRow"><div class="msg-av" style="color:white">${ICONS.chatSm}</div><div class="bubble bot"><div class="typing"><div class="tdot"></div><div class="tdot"></div><div class="tdot"></div></div></div></div>`;
  msgs.scrollTop = msgs.scrollHeight;
  let answer = null;
  const data = await apiFetch(`/api/chat`);
  if (data && data.answer) answer = data.answer;
  else { await new Promise(r => setTimeout(r, 800)); answer = BOT_RESPONSES[botIdx++ % BOT_RESPONSES.length]; }
  const typing = document.getElementById('typingRow');
  if (typing) typing.querySelector('.bubble').textContent = answer;
  msgs.scrollTop = msgs.scrollHeight;
  document.getElementById('chatSend').disabled = false;
}

/* ── Search ────────────────────────────────────────────────────────── */
let searchDebounce;
function initSearch() {
  const input = document.getElementById('searchInput');
  const sugg  = document.getElementById('searchSugg');
  if (!input || !sugg) return;
  input.addEventListener('input', e => {
    clearTimeout(searchDebounce);
    const q = e.target.value.trim();
    if (q.length < 2) { sugg.classList.remove('open'); return; }
    searchDebounce = setTimeout(async () => {
      const data = await apiFetch(`/api/search?q=${encodeURIComponent(q)}&limit=6`);
      const results = data?.results || MOCK_ARTICLES.filter(a =>
        a.title.toLowerCase().includes(q.toLowerCase())).slice(0,5);
      if (!results.length) { sugg.classList.remove('open'); return; }
      sugg.innerHTML = results.map(a => `
        <a class="suggestion-item" href="pages/article.html?id=${a.id}">
          <span class="tag tag-${a.category}">${a.category}</span>
          <span class="suggestion-title">${a.title}</span>
        </a>`).join('');
      sugg.classList.add('open');
    }, 300);
  });
  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !sugg.contains(e.target)) sugg.classList.remove('open');
  });
}

/* ── Advertise With Us Popup ──────────────────────────────────────── */
function buildAdvertisePopup() {
  return `
  <div class="popup-overlay" id="advertiseOverlay" onclick="handleOverlayClick(event,'advertiseOverlay')">
    <div class="popup-modal popup-advertise" role="dialog" aria-modal="true" aria-label="Advertise With Us">
      <button class="popup-close" onclick="closePopup('advertiseOverlay')" aria-label="Close">${ICONS.close}</button>
      <div class="popup-header">
        <div class="popup-icon-wrap popup-icon-ad">${ICONS.megaphone}</div>
        <h2 class="popup-title">Advertise With Us</h2>
        <p class="popup-subtitle">Reach millions of Ghanaians every day. Fill in the form and our team will be in touch within 24 hours.</p>
      </div>
      <form class="popup-form" id="advertiseForm" onsubmit="submitAdvertise(event)" novalidate>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">Your Name <span class="required">*</span></label>
            <input type="text" class="form-input" name="name" placeholder="Kwame Mensah" required autocomplete="name">
          </div>
          <div class="form-group">
            <label class="form-label">Email Address <span class="required">*</span></label>
            <input type="email" class="form-input" name="email" placeholder="kwame@company.com" required autocomplete="email">
          </div>
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">Phone Number <span class="required">*</span></label>
            <input type="tel" class="form-input" name="phone" placeholder="+233 20 000 0000" required autocomplete="tel">
          </div>
          <div class="form-group">
            <label class="form-label">Company <span class="form-opt">if applicable</span></label>
            <input type="text" class="form-input" name="company" placeholder="Company Ltd.">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Your Title <span class="form-opt">if applicable</span></label>
          <input type="text" class="form-input" name="jobtitle" placeholder="Marketing Manager, CEO…">
        </div>
        <div class="form-group">
          <label class="form-label">How may we help you / Advertisement Details <span class="required">*</span></label>
          <textarea class="form-textarea" name="details" placeholder="Describe your advertising goals, budget range, preferred formats (banner, sponsored content, newsletter, social), and any other details…" required rows="4"></textarea>
        </div>
        <button type="submit" class="form-btn form-btn-ad">
          ${ICONS.send} Send Enquiry
        </button>
      </form>
    </div>
  </div>`;
}

/* ── Subscribe Popup ──────────────────────────────────────────────── */
function buildSubscribePopup() {
  return `
  <div class="popup-overlay" id="subscribeOverlay" onclick="handleOverlayClick(event,'subscribeOverlay')">
    <div class="popup-modal popup-subscribe" role="dialog" aria-modal="true" aria-label="Subscribe Newsletter">
      <button class="popup-close" onclick="closePopup('subscribeOverlay')" aria-label="Close">${ICONS.close}</button>
      <div class="popup-header">
        <div class="popup-icon-wrap popup-icon-sub">${ICONS.mail}</div>
        <h2 class="popup-title">Get Breaking News First</h2>
        <p class="popup-subtitle">Subscribe free and never miss a story. All breaking news delivered straight to your inbox.</p>
      </div>
      <form class="popup-form" id="subscribeForm" onsubmit="submitSubscribe(event)" novalidate>
        <div class="form-group">
          <label class="form-label">Your Name</label>
          <input type="text" class="form-input" name="name" placeholder="Ama Owusu" autocomplete="name">
        </div>
        <div class="form-group">
          <label class="form-label">Email Address <span class="required">*</span></label>
          <input type="email" class="form-input" name="email" placeholder="ama@gmail.com" required autocomplete="email">
        </div>
        <div class="subscribe-checks">
          <p class="form-label" style="margin-bottom:8px">I want to receive:</p>
          <label class="check-label"><input type="checkbox" name="breaking" checked> <span>Breaking News (Instant alerts)</span></label>
          <label class="check-label"><input type="checkbox" name="daily" checked> <span>Daily Digest (Morning summary)</span></label>
          <label class="check-label"><input type="checkbox" name="politics"> <span>Politics &amp; Governance</span></label>
          <label class="check-label"><input type="checkbox" name="sports"> <span>Sports</span></label>
          <label class="check-label"><input type="checkbox" name="business"> <span>Business &amp; Economy</span></label>
        </div>
        <button type="submit" class="form-btn form-btn-sub">
          ${ICONS.subscribe} Subscribe — It's Free
        </button>
        <p class="form-disclaimer">No spam. Unsubscribe anytime. We respect your privacy.</p>
      </form>
    </div>
  </div>`;
}

/* ── Popup helpers ────────────────────────────────────────────────── */
function handleOverlayClick(e, id) {
  if (e.target === document.getElementById(id)) closePopup(id);
}

function closePopup(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  setTimeout(() => { if (document.getElementById(id)) document.getElementById(id).remove(); }, 300);
  document.body.style.overflow = '';
}

function openAdvertisePopup() {
  if (!document.getElementById('advertiseOverlay'))
    document.body.insertAdjacentHTML('beforeend', buildAdvertisePopup());
  requestAnimationFrame(() => document.getElementById('advertiseOverlay')?.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function openSubscribePopup() {
  if (!document.getElementById('subscribeOverlay'))
    document.body.insertAdjacentHTML('beforeend', buildSubscribePopup());
  requestAnimationFrame(() => document.getElementById('subscribeOverlay')?.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function submitAdvertise(e) {
  e.preventDefault();
  document.getElementById('advertiseForm').innerHTML = `
    <div class="form-success">
      <div class="success-check">✓</div>
      <h3>Enquiry Sent!</h3>
      <p>Our advertising team will contact you within 24 hours. Thank you for choosing GhanaFront.</p>
      <button class="form-btn form-btn-ad" onclick="closePopup('advertiseOverlay')">Close</button>
    </div>`;
}

function submitSubscribe(e) {
  e.preventDefault();
  document.getElementById('subscribeForm').innerHTML = `
    <div class="form-success">
      <div class="success-check">✓</div>
      <h3>You're Subscribed!</h3>
      <p>Welcome to GhanaFront. Breaking news will now land in your inbox first.</p>
      <button class="form-btn form-btn-sub" onclick="closePopup('subscribeOverlay')">Done</button>
    </div>`;
  localStorage.setItem('gf_subscribed', '1');
}

function initSubscribeAutoPopup() {
  const cfg = getSiteConfig();
  if (!cfg.showSubscribePopup) return;
  if (localStorage.getItem('gf_subscribed') || localStorage.getItem('gf_sub_dismissed')) return;
  setTimeout(() => {
    if (!document.getElementById('subscribeOverlay') && !document.getElementById('advertiseOverlay'))
      openSubscribePopup();
    localStorage.setItem('gf_sub_dismissed', '1');
  }, cfg.subscribeDelay || 6000);
}

/* ── Init ──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyDark();
  initSearch();
  initChat();
  initSubscribeAutoPopup();
});
