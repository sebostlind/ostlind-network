# Practice

The homepage sentence names the only three forms of client work. They are not separate pages or cards.

## Sub-features

- `practice-psychology` names organizational psychology.
- `practice-coaching` names executive coaching.
- `practice-leadership` names leadership consulting.

## How to get to it (user POV)

- Open the site and read the serif sentence under the header.

## Driving it with verify.mjs

Preconditions:

- Preview is healthy at `http://127.0.0.1:4321/`.
- `npm run verify` must report PASS for `hero`, `coaching`, `leadership`, and `psychology`.

- **Read the sentence.** Run `curl -fsS http://127.0.0.1:4321/ -o artifacts/verify/index.html`. The heading contains `organizational psychology`, `executive coaching`, and `leadership consulting`.
- **Proof.** `artifacts/verify/desktop.png` shows that sentence. There is no services grid.

## Gotchas

- Do not look for a `Services` heading or for `id="services"`. Those are not on this page.
- A passing logo check is not a passing practice check.
