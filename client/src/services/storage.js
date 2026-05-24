const KEYS = {
  shows: 'sc_shows',
  cues: 'sc_cues',
  mics: 'sc_mics',
  props: 'sc_props',
  reports: 'sc_reports',
  plan: 'sc_plan'
};

const read = (key, fallback = []) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const storage = {
  getShows: () => read(KEYS.shows),
  saveShows: (v) => write(KEYS.shows, v),
  getCues: () => read(KEYS.cues),
  saveCues: (v) => write(KEYS.cues, v),
  getMics: () => read(KEYS.mics),
  saveMics: (v) => write(KEYS.mics, v),
  getProps: () => read(KEYS.props),
  saveProps: (v) => write(KEYS.props, v),
  getReports: () => read(KEYS.reports),
  saveReports: (v) => write(KEYS.reports, v),
  getPlan: () => localStorage.getItem(KEYS.plan) || 'Solo Director',
  savePlan: (v) => localStorage.setItem(KEYS.plan, v)
};

export const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
