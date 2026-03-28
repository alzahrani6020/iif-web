// @ts-check
const { defineConfig } = require('@playwright/test');

const E2E_PORT = process.env.E2E_PORT || '3336';

module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  use: {
    baseURL: `http://127.0.0.1:${E2E_PORT}`,
    trace: 'on-first-retry',
  },
  webServer: {
    command: `node scripts/dev-server.js`,
    env: { ...process.env, PORT: E2E_PORT },
    url: `http://127.0.0.1:${E2E_PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
