/**
 * Preact アイランド（クライアント UI）の文言。ロケール別。
 * ページレベル content (`en.ts` / `ja.ts`) とは別に、インタラクティブな
 * アイランドが表示する文字列をここに集約する。
 *
 * 重要: アイランドは locale を PROP で受け取り（SSR 時に存在）、
 * `document` 等から読まない。SSR とクライアントで同一文字列を描画して
 * hydration mismatch を防ぐ。
 *
 * 補間文字列は `{name}` / `{count}` のテンプレートを持ち、
 * アイランド側で `.replace('{name}', x)` する。
 */
export const ui = {
  en: {
    // StripTrackingTool
    inputHeading: 'Paste your URLs',
    inputSubtitle: 'One per line — a single URL works too.',
    textareaLabel: 'URLs to clean',
    textareaPlaceholder: 'https://example.com/page?utm_source=newsletter&id=42\nhttps://example.com/other?fbclid=abc123',
    oneUrlPerLine: 'One URL per line',
    loadExample: 'Load example',
    clear: 'Clear',
    resultsHeading: 'Results',
    resultsSummary: '{cleaned} URL(s) parsed, {changed} had tracking parameters removed',
    emptyState: 'Paste one or more URLs above to see cleaned results here.',
    copyAll: 'Copy all cleaned URLs',
    copyOne: 'Copy',
    copied: 'Copied',
    cleanedUrlAria: 'Cleaned URL',
    removedLabel: 'Removed:',
    noneRemoved: 'No tracking parameters found — URL is unchanged.',
    invalidUrl: 'Line {line}: "{input}" doesn’t look like a valid URL.',

    // InstallPrompt
    installHeading: 'Install app',
    installBody: 'Add to your home screen for quick access.',
    install: 'Install',
    later: 'Later',

    // ThemeToggle
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    themeLabel: 'Theme',

    // shared
    close: 'Close',
  },
  ja: {
    // StripTrackingTool
    inputHeading: 'URL を貼り付け',
    inputSubtitle: '1 行に 1 件。URL 1 件だけでも使えます。',
    textareaLabel: '処理する URL',
    textareaPlaceholder: 'https://example.com/page?utm_source=newsletter&id=42\nhttps://example.com/other?fbclid=abc123',
    oneUrlPerLine: '1 行につき URL 1 件',
    loadExample: '例を読み込む',
    clear: 'クリア',
    resultsHeading: '結果',
    resultsSummary: '{cleaned} 件を解析、うち {changed} 件からトラッキングパラメータを削除',
    emptyState: '上の欄に URL を貼り付けると、ここに変換結果が表示されます。',
    copyAll: 'すべてのクリーンな URL をコピー',
    copyOne: 'コピー',
    copied: 'コピーしました',
    cleanedUrlAria: 'クリーンな URL',
    removedLabel: '削除:',
    noneRemoved: 'トラッキングパラメータは見つかりませんでした（変更なし）。',
    invalidUrl: '{line} 行目: 「{input}」は有効な URL として認識できませんでした。',

    // InstallPrompt
    installHeading: 'アプリを追加',
    installBody: 'ホーム画面に追加すると、すぐに開けます。',
    install: '追加',
    later: 'あとで',

    // ThemeToggle
    themeToLight: 'ライトモードに切り替え',
    themeToDark: 'ダークモードに切り替え',
    themeLabel: 'テーマ',

    // shared
    close: '閉じる',
  },
  zh: {
    // StripTrackingTool
    inputHeading: '粘贴你的链接',
    inputSubtitle: '每行一个链接，单个链接也可以。',
    textareaLabel: '要处理的链接',
    textareaPlaceholder: 'https://example.com/page?utm_source=newsletter&id=42\nhttps://example.com/other?fbclid=abc123',
    oneUrlPerLine: '每行一个链接',
    loadExample: '加载示例',
    clear: '清空',
    resultsHeading: '结果',
    resultsSummary: '已解析 {cleaned} 个链接，其中 {changed} 个移除了追踪参数',
    emptyState: '在上方粘贴一个或多个链接，处理结果会显示在这里。',
    copyAll: '复制全部处理后的链接',
    copyOne: '复制',
    copied: '已复制',
    cleanedUrlAria: '处理后的链接',
    removedLabel: '已移除:',
    noneRemoved: '未发现追踪参数 — 链接未作改动。',
    invalidUrl: '第 {line} 行:“{input}” 看起来不是一个有效的链接。',

    // InstallPrompt
    installHeading: '安装应用',
    installBody: '添加到主屏幕，方便随时打开。',
    install: '安装',
    later: '以后再说',

    // ThemeToggle
    themeToLight: '切换到浅色模式',
    themeToDark: '切换到深色模式',
    themeLabel: '主题',

    // shared
    close: '关闭',
  },
  de: {
    // StripTrackingTool
    inputHeading: 'URLs einfügen',
    inputSubtitle: 'Eine pro Zeile — eine einzelne URL funktioniert auch.',
    textareaLabel: 'Zu bereinigende URLs',
    textareaPlaceholder: 'https://example.com/page?utm_source=newsletter&id=42\nhttps://example.com/other?fbclid=abc123',
    oneUrlPerLine: 'Eine URL pro Zeile',
    loadExample: 'Beispiel laden',
    clear: 'Leeren',
    resultsHeading: 'Ergebnisse',
    resultsSummary: '{cleaned} URL(s) analysiert, bei {changed} wurden Tracking-Parameter entfernt',
    emptyState: 'Füge oben eine oder mehrere URLs ein, um hier die bereinigten Ergebnisse zu sehen.',
    copyAll: 'Alle bereinigten URLs kopieren',
    copyOne: 'Kopieren',
    copied: 'Kopiert',
    cleanedUrlAria: 'Bereinigte URL',
    removedLabel: 'Entfernt:',
    noneRemoved: 'Keine Tracking-Parameter gefunden — URL unverändert.',
    invalidUrl: 'Zeile {line}: „{input}“ sieht nicht wie eine gültige URL aus.',

    // InstallPrompt
    installHeading: 'App installieren',
    installBody: 'Zum Startbildschirm hinzufügen, um es direkt zu öffnen.',
    install: 'Installieren',
    later: 'Später',

    // ThemeToggle
    themeToLight: 'Zum hellen Modus wechseln',
    themeToDark: 'Zum dunklen Modus wechseln',
    themeLabel: 'Design',

    // shared
    close: 'Schließen',
  },
  es: {
    // StripTrackingTool
    inputHeading: 'Pega tus URLs',
    inputSubtitle: 'Una por línea; una sola URL también funciona.',
    textareaLabel: 'URLs a limpiar',
    textareaPlaceholder: 'https://example.com/page?utm_source=newsletter&id=42\nhttps://example.com/other?fbclid=abc123',
    oneUrlPerLine: 'Una URL por línea',
    loadExample: 'Cargar ejemplo',
    clear: 'Vaciar',
    resultsHeading: 'Resultados',
    resultsSummary: '{cleaned} URL(s) analizadas, {changed} con parámetros de rastreo eliminados',
    emptyState: 'Pega una o varias URLs arriba para ver aquí los resultados limpios.',
    copyAll: 'Copiar todas las URLs limpias',
    copyOne: 'Copiar',
    copied: 'Copiado',
    cleanedUrlAria: 'URL limpia',
    removedLabel: 'Eliminado:',
    noneRemoved: 'No se encontraron parámetros de rastreo — la URL no cambió.',
    invalidUrl: 'Línea {line}: "{input}" no parece una URL válida.',

    // InstallPrompt
    installHeading: 'Instalar la app',
    installBody: 'Añádela a tu pantalla de inicio para tenerla siempre a mano.',
    install: 'Instalar',
    later: 'Más tarde',

    // ThemeToggle
    themeToLight: 'Cambiar al modo claro',
    themeToDark: 'Cambiar al modo oscuro',
    themeLabel: 'Tema',

    // shared
    close: 'Cerrar',
  },
} as const;

export type UiStrings = (typeof ui)['en'];
