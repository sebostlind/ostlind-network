# Contact

The header email opens a mail draft. The closing line shows the public domain. There is no form and no footer.

## Sub-features

- `contact-email` links `sebastian@ostlind.net` with `mailto:sebastian@ostlind.net`.
- `contact-domain` links the label `ostlind.network` to `https://ostlind.network`.
- `contact-no-phone` shows no phone number and no `tel:` link.

## How to get to it (user POV)

- Choose `sebastian@ostlind.net` in the header.
- Or read `ostlind.network` in the second short paragraph.

## Driving it with verify.mjs

Preconditions:

- Preview is healthy at `http://127.0.0.1:4321/`.
- `npm run verify` must report PASS for `email`, `email text`, `domain label`, `absent www host`, `absent tel link`, `absent phone word`, and `absent footer`.

- **Read the header.** Run `curl -fsS http://127.0.0.1:4321/ -o artifacts/verify/index.html`. The HTML contains `mailto:sebastian@ostlind.net` and the visible address `sebastian@ostlind.net`.
- **Read the domain.** The closing paragraph shows `ostlind.network`. The link href is `https://ostlind.network`.
- **Confirm there is no phone or footer.** Search the saved HTML for `tel:`, `phone`, and `<footer`. All three are absent.
- **Proof.** The report file records those checks. Do not click the mailto link. The proof is the href.

## Gotchas

- A mailto link will open the local mail app. The proof is the href, not a sent message.
- Visible text must say `ostlind.network`, not a `www` host. The href may use `https`.
