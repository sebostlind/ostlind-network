# Hero and navigation

The page shows the white Ö, the underlined firm name, one serif sentence, and the email in the header.

## Sub-features

- `hero-mark` shows `public/logo.png` in the header and as the favicon.
- `hero-name` shows the wordmark `Östlind` and the full firm name in the sentence.
- `hero-sentence` states the practice in the page heading.
- `hero-mail` puts `sebastian@ostlind.net` in the header.

## How to get to it (user POV)

- Open `http://127.0.0.1:4321/`.
- Read the header, then the sentence below the empty gap.

## Driving it with verify.mjs

Preconditions:

- `npm run build` has written `dist/`.
- Preview is healthy at `http://127.0.0.1:4321/`.
- `npm run verify` must report PASS for `logo`, `favicon`, `wordmark`, `hero`, and `email text`.

- **Open the page.** Visit the site root. Run `curl -fsS http://127.0.0.1:4321/ -o artifacts/verify/index.html`. The file contains `<title>Östlind & Co Network</title>`, `src="/logo.png"`, and `class="wordmark"`.
- **Check the mark.** Request the logo. Run `curl -fsS -D - http://127.0.0.1:4321/logo.png -o artifacts/verify/logo.png`. The status is 200 and the body starts with the PNG signature.
- **Read the sentence.** The heading names organizational psychology, executive coaching, and leadership consulting.
- **Proof.** `artifacts/verify/desktop.png` shows the header mark, the underlined wordmark, and the sentence.

## Gotchas

- The logo file is a black square. On the near-black page the square is faint and the white Ö is the visible mark.
- The page has no footer and no button.
- `www.` must not appear in the HTML. The canonical and Open Graph URLs use `https://ostlind.network`.
