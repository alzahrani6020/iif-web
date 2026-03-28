const { test, expect } = require('@playwright/test');

/**
 * يتحقق من متصفح حقيقي (Chromium): إما اللوحة مفتوحة أو نافذة الدخول.
 * تشغيل: npm run test:e2e
 */
test.describe('لوحة التحكم — E2E', () => {
  test('index + ?iif_admin_portal=1&open_dashboard=1', async ({ page }) => {
    await page.goto(
      '/financial-consulting/iif-fund-demo/index.html?iif_admin_portal=1&open_dashboard=1',
      { waitUntil: 'networkidle' }
    );
    await expect
      .poll(
        async () => {
          const dash = await page.locator('#dashboard-overlay').evaluate((el) =>
            el.classList.contains('is-open')
          );
          const auth = await page
            .locator('#auth-overlay')
            .evaluate((el) => el.classList.contains('is-open'))
            .catch(() => false);
          return dash || auth;
        },
        { timeout: 35_000 }
      )
      .toBeTruthy();
  });
});
