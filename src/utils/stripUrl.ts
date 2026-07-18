/**
 * Removes tracking query parameters from a URL, using only the browser's
 * built-in `URL` / `URLSearchParams` — no parsing library.
 *
 * Pure and synchronous: parsing and rewriting a handful of URLs is
 * effectively instant, so the widget calls this straight from render with no
 * debounce, worker, or effect involved (see StripTrackingTool.tsx).
 */
import { isTrackingParam } from './trackingParams';

export interface RemovedParam {
  key: string;
  value: string;
}

export interface StripResultOk {
  ok: true;
  /** The trimmed input line, as given. */
  original: string;
  /** The URL after removing tracking parameters (also unchanged if none matched). */
  cleaned: string;
  /** Every removed key/value pair, in their original order. */
  removed: RemovedParam[];
}

export interface StripResultErr {
  ok: false;
  original: string;
  code: 'invalidUrl';
}

export type StripResult = StripResultOk | StripResultErr;

export interface StripLine {
  /** 1-based line number in the original input (for error display). */
  line: number;
}

export type StripBatchLine = (StripResultOk | StripResultErr) & StripLine;

/**
 * Parse `value` as an absolute URL. If it has no scheme (a very common way
 * to paste a URL, e.g. `example.com/page?utm_source=x`), retry once with
 * `https://` assumed — the common case for a pasted link — before giving up.
 */
function parseUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    // fall through to the scheme-less retry below
  }
  if (!/^[a-z][a-z0-9+.-]*:/i.test(value)) {
    try {
      return new URL(`https://${value}`);
    } catch {
      // not a URL either way
    }
  }
  return null;
}

/** Strip tracking parameters from a single URL string. */
export function stripTrackingParams(input: string): StripResult {
  const original = input.trim();
  const url = parseUrl(original);
  if (!url) {
    return { ok: false, original, code: 'invalidUrl' };
  }

  // Collect the actual (case-preserved) keys to delete first — mutating
  // URLSearchParams while iterating it is unreliable — then delete each once
  // (a repeated key like `?utm_source=a&utm_source=b` is removed in one call).
  const keysToDelete: string[] = [];
  const seen = new Set<string>();
  for (const key of url.searchParams.keys()) {
    const lower = key.toLowerCase();
    if (isTrackingParam(key) && !seen.has(lower)) {
      seen.add(lower);
      keysToDelete.push(key);
    }
  }

  const removed: RemovedParam[] = [];
  for (const key of keysToDelete) {
    for (const value of url.searchParams.getAll(key)) {
      removed.push({ key, value });
    }
    url.searchParams.delete(key);
  }

  return { ok: true, original, cleaned: url.toString(), removed };
}

/**
 * Strip tracking parameters from every non-blank line of a multi-line batch.
 * Blank lines are silently skipped (not reported as errors); every other
 * line is processed independently, so one bad line never affects the rest.
 */
export function stripUrls(text: string): StripBatchLine[] {
  const lines = text.split(/\r\n|\r|\n/);
  const results: StripBatchLine[] = [];
  lines.forEach((raw, index) => {
    if (raw.trim() === '') return;
    results.push({ ...stripTrackingParams(raw), line: index + 1 });
  });
  return results;
}
