import { type Page } from '@playwright/test';

export const SAMPLE_URL = 'https://example.com/product?id=42&utm_source=newsletter&color=red&fbclid=abc123';

/** Wait until the island has hydrated and is ready to drive from a test. */
export async function waitReady(page: Page) {
  await page.waitForFunction(() => (window as Record<string, unknown>).__toolReady === true);
}

/**
 * Fill the textarea with `text` (a single URL by default) and wait for the
 * first result row to render. Stripping is synchronous (URL/URLSearchParams
 * only, see stripUrl.ts), so there is no debounce to wait out — just the
 * normal Preact re-render.
 */
export async function stripUrls(page: Page, text: string = SAMPLE_URL) {
  await page.locator('[data-testid="urls-input"]').fill(text);
  await page.locator('[data-testid="url-result-0"]').waitFor({ state: 'visible', timeout: 10_000 });
}
