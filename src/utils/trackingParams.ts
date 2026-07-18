/**
 * Query-string parameter names to strip from a URL.
 *
 * Hand-authored from public knowledge of how each platform tags outbound
 * links — this is a flat, independent list, not a port of any third-party
 * rules file (notably not ClearURLs' `rules.json`, which is GPL-3 and uses a
 * much richer per-domain/regex rule format; copying it would risk license
 * entanglement for a project that wants to stay MIT). Anyone can extend this
 * set with a one-line addition — no other file needs to change.
 *
 * Matching is case-insensitive (see stripUrl.ts): a param is compared here in
 * lowercase, so entries below are always lowercase.
 */
export const TRACKING_PARAMS: ReadonlySet<string> = new Set([
  // Google Analytics / Urchin Tracking Module — the de facto standard,
  // used far beyond Google's own products.
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'utm_source_platform',
  'utm_creative_format',
  'utm_marketing_tactic',

  // Google Analytics client/session identifiers carried on the URL itself
  // (as opposed to cookies) via Measurement Protocol linking.
  '_ga',
  '_gl',

  // Google/Google Ads click identifiers.
  'gclid',
  'gclsrc',
  'dclid', // Google Marketing Platform (DoubleClick)
  'wbraid',
  'gbraid',

  // Meta / Facebook / Instagram.
  'fbclid',
  'igshid',
  'igsh',

  // Microsoft Advertising (Bing Ads).
  'msclkid',

  // Mailchimp campaign tracking.
  'mc_eid',
  'mc_cid',

  // TikTok.
  'ttclid',

  // Twitter / X.
  'twclid',

  // Pinterest.
  'epik',

  // Yandex.
  'yclid',

  // HubSpot email tracking.
  '_hsenc',
  '_hsmi',

  // Marketo.
  'mkt_tok',

  // Vero.
  'vero_id',

  // Adobe / Omniture (Site Catalyst) click id.
  's_cid',

  // Generic referral tags used by many platforms and blogs (not tied to one
  // company, but overwhelmingly used for attribution rather than routing).
  'ref',
  'ref_src',
  'ref_url',

  // Share-link tracking token used by YouTube and Spotify.
  'si',
]);

/** True when `key` (compared case-insensitively) is on the removal list. */
export function isTrackingParam(key: string): boolean {
  return TRACKING_PARAMS.has(key.toLowerCase());
}
