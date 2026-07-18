import { describe, it, expect } from 'vitest';
import { stripTrackingParams, stripUrls } from '@/utils/stripUrl';

describe('stripTrackingParams', () => {
  it('removes tracking parameters while keeping legitimate ones, in their original order', () => {
    const result = stripTrackingParams(
      'https://example.com/product?id=42&utm_source=newsletter&color=red&fbclid=abc123'
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.cleaned).toBe('https://example.com/product?id=42&color=red');
    expect(result.removed).toEqual([
      { key: 'utm_source', value: 'newsletter' },
      { key: 'fbclid', value: 'abc123' },
    ]);
  });

  it('leaves a URL with no tracking parameters unchanged', () => {
    const result = stripTrackingParams('https://example.com/plain?color=red');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.cleaned).toBe('https://example.com/plain?color=red');
    expect(result.removed).toEqual([]);
  });

  it('removes every value of a repeated tracking key', () => {
    const result = stripTrackingParams('https://example.com/?utm_source=a&utm_source=b&keep=1');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.cleaned).toBe('https://example.com/?keep=1');
    expect(result.removed).toEqual([
      { key: 'utm_source', value: 'a' },
      { key: 'utm_source', value: 'b' },
    ]);
  });

  it('matches known tracking parameters case-insensitively', () => {
    const result = stripTrackingParams('https://example.com/?UTM_Source=x&keep=1');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.cleaned).toBe('https://example.com/?keep=1');
    expect(result.removed).toEqual([{ key: 'UTM_Source', value: 'x' }]);
  });

  it('trims surrounding whitespace before parsing', () => {
    const result = stripTrackingParams('   https://example.com/?utm_source=x&keep=1   ');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.cleaned).toBe('https://example.com/?keep=1');
  });

  it('accepts a scheme-less URL by assuming https', () => {
    const result = stripTrackingParams('example.com/page?utm_source=x&keep=1');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.cleaned).toBe('https://example.com/page?keep=1');
  });

  it('leaves the hash fragment untouched', () => {
    const result = stripTrackingParams('https://example.com/?utm_source=x&keep=1#section');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.cleaned).toBe('https://example.com/?keep=1#section');
  });

  it('strips the YouTube/Spotify share tracking parameter "si"', () => {
    const result = stripTrackingParams('https://open.spotify.com/track/abc?si=deadbeef1234');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.cleaned).toBe('https://open.spotify.com/track/abc');
    expect(result.removed).toEqual([{ key: 'si', value: 'deadbeef1234' }]);
  });

  it('returns an error for text that is not a URL', () => {
    // "|" is a forbidden host code point in every engine (unlike a bare space,
    // which some engines percent-encode instead of rejecting), so this stays
    // reliably invalid across Chromium/Firefox/WebKit and Node alike.
    const result = stripTrackingParams('totally|invalid');
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.code).toBe('invalidUrl');
  });

  it('returns an error for an empty line', () => {
    const result = stripTrackingParams('');
    expect(result.ok).toBe(false);
  });
});

describe('stripUrls', () => {
  it('processes one non-blank line per result, numbered from 1', () => {
    const results = stripUrls('https://a.example.com/?utm_source=x\n\nhttps://b.example.com/?gclid=y&keep=1');
    expect(results).toHaveLength(2);
    expect(results[0].line).toBe(1);
    expect(results[1].line).toBe(3); // the blank second line is skipped, not renumbered
  });

  it('does not let one invalid line stop the rest of the batch from being processed', () => {
    const results = stripUrls('totally|invalid\nhttps://example.com/?utm_source=x&keep=1');
    expect(results).toHaveLength(2);
    expect(results[0].ok).toBe(false);
    expect(results[1].ok).toBe(true);
    if (results[1].ok) {
      expect(results[1].cleaned).toBe('https://example.com/?keep=1');
    }
  });

  it('returns an empty array for blank input', () => {
    expect(stripUrls('')).toEqual([]);
    expect(stripUrls('   \n\n  ')).toEqual([]);
  });

  it('handles CRLF line endings', () => {
    const results = stripUrls('https://a.example.com/?utm_source=x\r\nhttps://b.example.com/?keep=1');
    expect(results).toHaveLength(2);
  });
});
