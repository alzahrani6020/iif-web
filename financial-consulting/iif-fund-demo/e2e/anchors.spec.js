/**
 * E2E: التحقق من أن المراسي (#id) تُحمّل الصفحة وتُظهر الأقسام المؤسسية.
 */
'use strict';

var { test, expect } = require('@playwright/test');

var ANCHOR_IDS = [
  'main-content',
  'trust-entry',
  'financing-request',
  'financial-consultation',
  'government-bot',
  'stakeholders',
  'selection-criteria',
  'governance-snapshot',
  'partners-trust',
  'contact',
  'terms',
  'compliance',
];

test.describe('Hash navigation', function () {
  for (var i = 0; i < ANCHOR_IDS.length; i++) {
    (function (anchorId) {
      test('visible: #' + anchorId, async function ({ page }) {
        await page.goto('/index.html#' + anchorId, {
          waitUntil: 'domcontentloaded',
          timeout: 90 * 1000,
        });
        var target = page.locator('#' + anchorId).first();
        await target.waitFor({ state: 'attached', timeout: 45 * 1000 });
        await target.scrollIntoViewIfNeeded();
        await expect(target).toBeVisible({ timeout: 30 * 1000 });
        if (anchorId !== 'main-content') {
          await expect(target).toBeInViewport({ ratio: 0.02 });
        } else {
          var box = await target.boundingBox();
          expect(box && box.height).toBeGreaterThan(200);
        }
      });
    })(ANCHOR_IDS[i]);
  }

  test('Arabic query + partners anchor', async function ({ page }) {
    await page.goto('/index.html?lang=ar#partners-trust', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#partners-trust')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  });
});

test.describe('Trust entry navigation', function () {
  test('nav.iif-trust-paths landmark', async function ({ page }) {
    await page.goto('/index.html#trust-entry');
    var nav = page.locator('nav.iif-trust-paths');
    await expect(nav).toBeVisible();
    await expect(nav).toHaveAttribute('aria-labelledby', 'iif-trust-paths-label');
  });

  test('path card links resolve', async function ({ page }) {
    await page.goto('/index.html#trust-entry');
    await page.locator('.iif-path-card[href="#financing-request"]').click();
    await expect(page).toHaveURL(/#financing-request/);
    await expect(page.locator('#financing-request')).toBeVisible();
  });
});
