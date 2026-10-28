import config from '../playwright.config';
export default {
  ...config,
  testDir: '../tests',
  webServer: undefined,
  use: { ...config.use, baseURL: process.env.QA_BASE ?? 'http://127.0.0.1:4348', channel: 'chrome' },
  projects: [{ name: 'checks', grepInvert: /@visual/, use: { channel: 'chrome' } }],
};
