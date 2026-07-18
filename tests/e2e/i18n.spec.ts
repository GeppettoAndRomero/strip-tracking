import { test, expect } from '@playwright/test';
import { waitReady, stripUrls } from './_helpers';

// Content routing is engine-independent; one browser is enough.
test.describe('i18n', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'content routing (one engine)');
  });

  for (const loc of [
    { path: '/strip-tracking/', lang: 'en' },
    { path: '/strip-tracking/ja/', lang: 'ja' },
  ]) {
    test(`strips a URL on the ${loc.lang} route (#5)`, async ({ page }) => {
      await page.goto(loc.path);
      await waitReady(page);
      await stripUrls(page);
    });
  }

  test('serves every locale with the correct <html lang>', async ({ page }) => {
    const expected: Array<[string, string]> = [
      ['/strip-tracking/', 'en'],
      ['/strip-tracking/ja/', 'ja'],
      ['/strip-tracking/zh/', 'zh-Hans'],
      ['/strip-tracking/de/', 'de'],
      ['/strip-tracking/es/', 'es'],
    ];
    for (const [path, lang] of expected) {
      await page.goto(path);
      expect(await page.getAttribute('html', 'lang'), `lang on ${path}`).toBe(lang);
    }
  });
});
