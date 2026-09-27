---
name: verify-ostlind-network
description: "Build and check the Östlind & Co Network one-page site. Use when changing the page, copy, logo, or Cloudflare static output, and before calling the site done."
---

# Verify Östlind & Co Network

The site is one static page. A user reads the header and the sentence, then follows the email in the header. Prove that path against `astro preview` of `dist/`, not against source files alone.

## Launch

From the repository root:

1. Run `npm install` once, when `node_modules` is missing.
2. Run `npm run build`. Astro writes `dist/`.
3. Run `npx astro preview --host 127.0.0.1 --port 4321`.
4. The server is ready when `curl -fsS http://127.0.0.1:4321/` returns HTML whose title is `Östlind & Co Network`.

`npm run verify` does steps 2 through 4, runs the checks below, writes evidence, and stops the preview process it started.

Only one preview may use port 4321. Do not start a second one against the same port.

## Doctor

Run this before a manual drive, and whenever a check looks wrong.

```sh
curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4321/
curl -fsS -o /dev/null -w '%{http_code} %{content_type}\n' http://127.0.0.1:4321/logo.png
```

Both lines must print a `200`. The logo line must also name `image/png`. The listener on port 4321 must be the preview this run started. `dist/index.html` and `dist/logo.png` must exist.

## Drive

Prefer `npm run verify`. It fetches the page and the logo, checks the strings in the feature map, and saves screenshots.

To drive by hand while preview is up:

```sh
curl -fsS http://127.0.0.1:4321/ -o artifacts/verify/index.html
curl -fsS http://127.0.0.1:4321/logo.png -o artifacts/verify/logo.png
```

Open `http://127.0.0.1:4321/`. The header email is `mailto:sebastian@ostlind.net`.

Stable handles are the wordmark text, the heading text, the email link, and the ids `top` and `main`.

## Evidence

`npm run verify` writes these files and leaves them after the preview process exits.

- `artifacts/verify/report.txt` lists each PASS or FAIL line.
- `artifacts/verify/index.html` is the HTML the preview returned.
- `artifacts/verify/logo.png` is the logo the preview returned.
- `artifacts/verify/desktop.png` is a 1440-wide screenshot.
- `artifacts/verify/mobile.png` is a 390-wide screenshot.

A pass requires the report, both screenshots, and a zero failure count. The screenshots must show the white Ö in the header and the firm name. HTML checks alone are not enough for a visual change.

The page must include the firm name, Sebastian Östlind, `sebastian@ostlind.net`, and the visible label `ostlind.network`. It must not include `www.`, a `tel:` link, the word phone, or a footer.

## Cleanup

`npm run verify` sends SIGTERM to the preview process it spawned, then SIGKILL if that process is still alive. Stop a hand-started preview with the same pid. Do not kill every process named `node`. Do not delete `artifacts/verify/` during cleanup.

## Helpers

`scripts/verify.mjs` is the check. Run it as `npm run verify`.

Read `features/README.md` before a manual pass, then follow the feature file for the path you are proving.
