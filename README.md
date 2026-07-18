# strip-tracking

Remove UTM, fbclid, gclid and other tracking parameters from one or more URLs, entirely
in your browser. Pasted URLs are never uploaded. Open source, works offline (PWA).

Part of [runlocally](https://runlocally.app) — small tools that run locally on your device.

## How it works

Each pasted URL (one per line — a single URL works too) is parsed with the browser's
own `URL` / `URLSearchParams` APIs. Any parameter on the hand-authored tracking list in
`src/utils/trackingParams.ts` is removed; everything else, including query parameters
the destination page actually needs, is left untouched. There is no server component,
so pasted URLs have no path off your device — not even to log them. The result for
each line shows the cleaned URL plus exactly which parameters were removed.

## Features

- Paste one URL, or many (one per line) — batch cleaning
- Shows exactly which tracking parameters were removed per URL, not just the end result
- Copy a single cleaned URL, or all of them at once
- Invalid lines show an inline error without affecting the rest of the batch
- Works offline (PWA), installable

## Develop

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build to dist/
```

Stack: Astro + Preact + TypeScript. No runtime dependency beyond Astro/Preact — the
stripping logic is `URL`/`URLSearchParams` only, no parsing library.

## Browser support

Works in any current browser with the `URL` and `URLSearchParams` APIs (Chrome, Edge,
Firefox, Safari) — there is no WebAssembly, Web Worker, or canvas dependency.

## License

[MIT](./LICENSE). Built and maintained by Geppetto. Some code is written with AI
assistance; all review and decisions are the maintainer's.
