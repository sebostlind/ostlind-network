# Hero and navigation

The first screen shows the white Ö, the firm name, a short positioning line, and a link that writes to Sebastian. The header links jump to the later sections.

## Sub-features

- `hero-mark` shows `public/logo.png` in the header and as the favicon.
- `hero-name` shows the heading `Östlind & Co Network`.
- `hero-cta` points `Write to Sebastian` at `mailto:sebastian@ostlind.net`.
- `hero-nav` jumps to Who it's for, Services, Approach, About, and Contact.

## How to get to it (user POV)

- Open `http://127.0.0.1:4321/`.
- Use the header links, or scroll.

## Driving it with verify.mjs

Preconditions:

- `npm run build` has written `dist/`.
- Preview is healthy at `http://127.0.0.1:4321/`.
- `npm run verify` may replace the hand steps below. It must report PASS for `logo`, `favicon`, `hero`, `email`, and each section id.

- **Open the page.** Visit the site root. Run `curl -fsS http://127.0.0.1:4321/ -o artifacts/verify/index.html`. The file contains `<title>Östlind & Co Network</title>` and `src="/logo.png"`.
- **Check the mark.** Request the logo. Run `curl -fsS -D - http://127.0.0.1:4321/logo.png -o artifacts/verify/logo.png`. The status is 200 and the body starts with the PNG signature.
- **Read the hero.** Stay on the page. The heading text is `Östlind & Co` and `Network`. The paragraph names organizational psychology, executive coaching, and leadership consulting.
- **Use the nav.** Choose `Contact`. The URL hash is `#contact` and the heading `Contact` is in view.
- **Proof.** Run `npm run verify` when you want the scripted pass. `artifacts/verify/desktop.png` shows the header mark and the firm name.

## Gotchas

- The logo file is a black square. On the black page only the white Ö is visible. A missing image looks like empty header space, so check the request, not only the screenshot.
- `www.` must not appear in the HTML. The canonical and Open Graph URLs use `https://ostlind.network`.
