import { test, expect, type Page } from '@playwright/test';
import { waitReady } from './_helpers';

async function goto(page: Page) {
  await page.goto('/strip-tracking/');
  await waitReady(page);
}

test.describe('strip tracking parameters', () => {
  test('strips only tracking parameters from a real messy URL, keeping legitimate ones, with no upload', async ({
    page,
  }) => {
    const external: string[] = [];
    page.on('request', (req) => {
      const url = req.url();
      if (!url.startsWith('http://localhost:4321') && !url.startsWith('data:') && !url.startsWith('blob:')) {
        external.push(url);
      }
    });

    await goto(page);
    const messy = 'https://example.com/product?id=42&utm_source=newsletter&color=red&fbclid=abc123';
    await page.locator('[data-testid="urls-input"]').fill(messy);

    const cleaned = page.locator('[data-testid="cleaned-url-0"]');
    await expect(cleaned).toHaveValue('https://example.com/product?id=42&color=red');

    const removed = page.locator('[data-testid="removed-params-0"]');
    await expect(removed).toContainText('utm_source=newsletter');
    await expect(removed).toContainText('fbclid=abc123');
    // Legitimate params never show up as "removed".
    await expect(removed).not.toContainText('id=42');
    await expect(removed).not.toContainText('color=red');

    expect(external, `unexpected cross-origin requests: ${external.join(', ')}`).toHaveLength(0);
  });

  test('processes a multi-line batch, one result per non-blank line', async ({ page }) => {
    await goto(page);
    const batch = [
      'https://a.example.com/?utm_source=x',
      '',
      'https://b.example.com/?gclid=y&keep=1',
    ].join('\n');
    await page.locator('[data-testid="urls-input"]').fill(batch);

    await expect(page.locator('[data-testid="cleaned-url-0"]')).toHaveValue('https://a.example.com/');
    await expect(page.locator('[data-testid="cleaned-url-1"]')).toHaveValue('https://b.example.com/?keep=1');
    // The blank line produced no third row.
    await expect(page.locator('[data-testid="url-result-2"]')).toHaveCount(0);
  });

  test('shows a URL unchanged with no removed-params list when it has no tracking parameters', async ({ page }) => {
    await goto(page);
    await page.locator('[data-testid="urls-input"]').fill('https://example.com/plain?color=red');
    await expect(page.locator('[data-testid="cleaned-url-0"]')).toHaveValue('https://example.com/plain?color=red');
    await expect(page.locator('[data-testid="no-change-0"]')).toBeVisible();
    await expect(page.locator('[data-testid="removed-params-0"]')).toHaveCount(0);
  });

  test('shows an inline error for an unparseable line without breaking the rest of the batch', async ({ page }) => {
    await goto(page);
    const batch = ['totally|invalid', 'https://good.example.com/?utm_medium=cpc&x=1'].join('\n');
    await page.locator('[data-testid="urls-input"]').fill(batch);

    await expect(page.locator('[data-testid="url-error-0"]')).toBeVisible();
    await expect(page.locator('[data-testid="cleaned-url-1"]')).toHaveValue('https://good.example.com/?x=1');
  });

  test('the "Load example" button fills the textarea and produces a result', async ({ page }) => {
    await goto(page);
    await page.locator('#load-example-action').click();
    await expect(page.locator('[data-testid="url-result-0"]')).toBeVisible();
  });

  test('the "Clear" button empties the textarea and the results', async ({ page }) => {
    await goto(page);
    await page.locator('#load-example-action').click();
    await expect(page.locator('[data-testid="url-result-0"]')).toBeVisible();
    await page.locator('#clear-action').click();
    await expect(page.locator('[data-testid="urls-input"]')).toHaveValue('');
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
  });

  test('"Copy" copies a single cleaned URL to the clipboard', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'clipboard permissions API is Chromium-only');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await goto(page);
    await page.locator('[data-testid="urls-input"]').fill('https://example.com/?utm_source=x&keep=1');
    await page.locator('#copy-action-0').click();
    await expect(page.locator('#copy-action-0')).toHaveText(/Copied/i);
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe('https://example.com/?keep=1');
  });

  test('"Copy all" copies every cleaned URL, one per line', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'clipboard permissions API is Chromium-only');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await goto(page);
    const batch = ['https://a.example.com/?utm_source=x', 'https://b.example.com/?gclid=y'].join('\n');
    await page.locator('[data-testid="urls-input"]').fill(batch);
    await page.locator('#copy-all-action').click();
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe('https://a.example.com/\nhttps://b.example.com/');
  });
});
