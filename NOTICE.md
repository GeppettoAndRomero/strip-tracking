# Third-party notices

The source code in this repository is licensed under the [MIT License](./LICENSE).

This tool has no third-party components under a copyleft or other non-permissive
license, and no runtime dependency beyond the site framework itself — the URL
stripping logic (`src/utils/trackingParams.ts`, `src/utils/stripUrl.ts`) uses only
the `URL` / `URLSearchParams` APIs built into the browser. Its runtime dependencies
are all distributed under the MIT License:

- [Astro](https://astro.build/), [Preact](https://preactjs.com/) and
  [@astrojs/preact](https://github.com/withastro/astro/tree/main/packages/integrations/preact)
  — the site framework and rendering.

Each keeps its own MIT license and copyright; see the respective packages in
`node_modules` for the full license text.
