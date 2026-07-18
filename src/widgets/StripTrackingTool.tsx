/**
 * StripTrackingTool — the tool's only non-frozen widget.
 *
 * Paste one or more URLs (one per line — a single URL works too) into the
 * textarea; every line is re-parsed on each keystroke with `stripUrls()`
 * (URL/URLSearchParams only, see stripUrl.ts) and shown live below, one
 * result per line: the cleaned URL plus the tracking parameters that were
 * actually removed (struck through), so nothing is silently changed without
 * the user seeing it (HANDBOOK §15.3 "show, don't tell"). A line that isn't
 * a parseable URL shows an inline error instead of aborting the batch.
 *
 * No debounce: parsing a handful of URLs with the browser's own URL API is
 * effectively instant, so results are recomputed straight from render — no
 * effect, no worker, nothing async to race.
 *
 * The pasted text is held in local `useState` only. It is never written to
 * `window.location`, a query string, or any storage — the strongest version
 * of this tool's privacy claim is that the input has nowhere to go, not even
 * back into its own URL bar (see tests/e2e/covenants.spec.ts #7).
 */
import { useState, useEffect, useMemo, useCallback } from 'preact/hooks';
import { AppCard } from './AppCard';
import { stripUrls, type StripBatchLine, type StripResultOk } from '@/utils/stripUrl';
import { ui } from '@/i18n/ui';

const EXAMPLE = [
  'https://example.com/product?id=42&utm_source=newsletter&utm_medium=email&color=red&fbclid=abc123',
  'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=29a1a4c2f2f14f0a',
].join('\n');

const COPIED_FEEDBACK_MS = 2000;

interface StripTrackingToolProps {
  locale?: string;
}

export function StripTrackingTool({ locale = 'en' }: StripTrackingToolProps) {
  const t = (ui as any)[locale] ?? ui.en;

  const [text, setText] = useState('');
  const [copiedRow, setCopiedRow] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  const results = useMemo<StripBatchLine[]>(() => stripUrls(text), [text]);
  const okResults = useMemo(
    () => results.filter((r): r is StripResultOk & { line: number } => r.ok),
    [results]
  );
  const changedCount = okResults.filter((r) => r.removed.length > 0).length;

  const copyText = useCallback(async (value: string): Promise<boolean> => {
    if (!navigator.clipboard) return false;
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Clipboard API can reject (permissions, insecure/embedded context);
      // the cleaned URL stays visible and selectable by hand either way.
      return false;
    }
  }, []);

  const copyRow = (i: number, value: string) => {
    void copyText(value).then((didCopy) => {
      if (!didCopy) return;
      setCopiedRow(i);
      setTimeout(() => setCopiedRow((cur) => (cur === i ? null : cur)), COPIED_FEEDBACK_MS);
    });
  };

  const copyAll = () => {
    if (okResults.length === 0) return;
    void copyText(okResults.map((r) => r.cleaned).join('\n')).then((didCopy) => {
      if (!didCopy) return;
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), COPIED_FEEDBACK_MS);
    });
  };

  const loadExample = () => setText(EXAMPLE);
  const clearAll = () => setText('');

  return (
    <div>
      <AppCard>
        <div style="margin-bottom: var(--space-4);">
          <h2 style="margin: 0 0 var(--space-1) 0; font-size: var(--fs-4); font-weight: 600;">
            {t.inputHeading}
          </h2>
          <p style="margin: 0; font-size: var(--fs-2); color: var(--color-subtle);">{t.inputSubtitle}</p>
        </div>

        <label class="visually-hidden" for="urls-input">
          {t.textareaLabel}
        </label>
        <textarea
          id="urls-input"
          data-testid="urls-input"
          class="app-field__textarea"
          style="width: 100%; min-height: 160px; font-family: var(--font-mono, monospace); font-size: var(--fs-2);"
          value={text}
          placeholder={t.textareaPlaceholder}
          spellcheck={false}
          onInput={(e) => setText((e.currentTarget as HTMLTextAreaElement).value)}
        />

        <div
          style="display: flex; justify-content: space-between; align-items: center; gap: var(--space-3); flex-wrap: wrap; margin-top: var(--space-3);"
        >
          <p style="margin: 0; font-size: var(--fs-1); color: var(--color-subtle);">{t.oneUrlPerLine}</p>
          <span style="display: flex; gap: var(--space-2);">
            <button id="load-example-action" type="button" class="app-button app-button--secondary" onClick={loadExample}>
              {t.loadExample}
            </button>
            <button
              id="clear-action"
              type="button"
              class="app-button app-button--ghost"
              onClick={clearAll}
              disabled={text === ''}
            >
              {t.clear}
            </button>
          </span>
        </div>
      </AppCard>

      <AppCard className="mt-6">
        <div
          style="display: flex; justify-content: space-between; align-items: center; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-4);"
        >
          <div>
            <h2 style="margin: 0 0 var(--space-1) 0; font-size: var(--fs-4); font-weight: 600;">
              {t.resultsHeading}
            </h2>
            {results.length > 0 && (
              <p class="num" style="margin: 0; font-size: var(--fs-1); color: var(--color-subtle);">
                {t.resultsSummary
                  .replace('{cleaned}', String(okResults.length))
                  .replace('{changed}', String(changedCount))}
              </p>
            )}
          </div>
          <button
            id="copy-all-action"
            type="button"
            class="app-button app-button--primary"
            onClick={copyAll}
            disabled={okResults.length === 0}
          >
            {copiedAll ? t.copied : t.copyAll}
          </button>
        </div>

        {results.length === 0 && (
          <p data-testid="empty-state" style="margin: 0; font-size: var(--fs-2); color: var(--color-subtle);">
            {t.emptyState}
          </p>
        )}

        <ul
          role="list"
          aria-label={t.resultsHeading}
          aria-live="polite"
          style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-3);"
        >
          {results.map((r, i) => (
            <li
              key={i}
              data-testid={`url-result-${i}`}
              style="padding: var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-surface);"
            >
              {r.ok ? (
                <>
                  <div style="display: flex; gap: var(--space-2); align-items: center; flex-wrap: wrap;">
                    <input
                      type="text"
                      readOnly
                      class="app-field__input"
                      data-testid={`cleaned-url-${i}`}
                      value={r.cleaned}
                      aria-label={t.cleanedUrlAria}
                      style="flex: 1 1 260px; min-width: 0; font-family: var(--font-mono, monospace); font-size: var(--fs-2);"
                      onFocus={(e) => (e.currentTarget as HTMLInputElement).select()}
                    />
                    <button
                      id={`copy-action-${i}`}
                      type="button"
                      class="app-button app-button--secondary"
                      onClick={() => copyRow(i, r.cleaned)}
                    >
                      {copiedRow === i ? t.copied : t.copyOne}
                    </button>
                  </div>
                  {r.removed.length > 0 ? (
                    <p
                      data-testid={`removed-params-${i}`}
                      style="margin: var(--space-2) 0 0 0; font-size: var(--fs-1); color: var(--color-subtle);"
                    >
                      {t.removedLabel}{' '}
                      {r.removed.map((p, j) => (
                        <span key={j} style="display: inline-block; margin-inline-end: var(--space-2);">
                          <s>
                            {p.key}={p.value}
                          </s>
                        </span>
                      ))}
                    </p>
                  ) : (
                    <p
                      data-testid={`no-change-${i}`}
                      style="margin: var(--space-2) 0 0 0; font-size: var(--fs-1); color: var(--color-subtle);"
                    >
                      {t.noneRemoved}
                    </p>
                  )}
                </>
              ) : (
                <p
                  role="alert"
                  data-testid={`url-error-${i}`}
                  style="margin: 0; color: var(--color-danger); font-size: var(--fs-2);"
                >
                  {t.invalidUrl.replace('{line}', String(r.line)).replace('{input}', r.original)}
                </p>
              )}
            </li>
          ))}
        </ul>
      </AppCard>

      <style>{`
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </div>
  );
}
