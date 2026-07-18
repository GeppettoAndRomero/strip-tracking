import { describe, it, expect } from 'vitest';
import { TRACKING_PARAMS, isTrackingParam } from '@/utils/trackingParams';

// The brief's minimum required coverage list (HANDBOOK batch-launch scope for
// strip-tracking) — every one of these must be on the list.
const REQUIRED = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'fbclid',
  'gclid',
  'gclsrc',
  'dclid',
  'msclkid',
  'mc_eid',
  'mc_cid',
  'igshid',
  'ref',
  'ref_src',
  'ref_url',
  '_ga',
  '_gl',
  'yclid',
  'twclid',
  'vero_id',
  'mkt_tok',
  'si',
];

describe('TRACKING_PARAMS', () => {
  it.each(REQUIRED)('includes the required parameter %s', (param) => {
    expect(TRACKING_PARAMS.has(param)).toBe(true);
  });

  it('stores every entry in lowercase (matching is case-normalized elsewhere)', () => {
    for (const key of TRACKING_PARAMS) {
      expect(key).toBe(key.toLowerCase());
    }
  });
});

describe('isTrackingParam', () => {
  it('matches a known tracking parameter', () => {
    expect(isTrackingParam('utm_source')).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(isTrackingParam('UTM_Source')).toBe(true);
    expect(isTrackingParam('FBCLID')).toBe(true);
  });

  it('does not match an unrelated parameter', () => {
    expect(isTrackingParam('id')).toBe(false);
    expect(isTrackingParam('page')).toBe(false);
    expect(isTrackingParam('color')).toBe(false);
  });
});
