# Security Policy

`strip-tracking` runs entirely in your browser. There is no server component and no
account system, so the URLs you paste are never uploaded. Most classic web
vulnerabilities (server-side injection, auth bypass, data exfiltration via a backend)
do not apply.

We still take client-side security seriously — XSS, supply-chain issues in
dependencies, a service worker caching bug, or anything that could cause pasted input
to leave your device (including, for this tool specifically, ending up in the page's
own URL, query string, or browser history).

## Reporting a vulnerability

Please report suspected vulnerabilities privately, not in a public issue:

- Email: **security@runlocally.app**
- Or use GitHub's private vulnerability reporting (Security → Report a vulnerability).

Include what you found, steps to reproduce, and the impact you expect. We aim to
acknowledge within a few days. Please give us a reasonable window to ship a fix
before public disclosure.

## Scope

In scope:

- This repository's source and the deployed site.
- The URL-parsing/cleaning logic, the service worker, and the PWA manifest.
- Anything that could send pasted URLs (or metadata about them) off the device, or
  leak them into the page's own address bar, history, or storage.

Out of scope:

- Findings that require a compromised device or a malicious browser extension.
- Missing hardening headers that have no concrete exploit.

Thank you for helping keep users safe.
