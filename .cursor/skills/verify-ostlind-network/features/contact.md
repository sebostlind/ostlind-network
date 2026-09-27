# Contact

Contact gives the email and the public domain. The email opens a mail draft. The domain is the visible label `ostlind.network`.

## Sub-features

- `contact-email` links `sebastian@ostlind.net` with `mailto:sebastian@ostlind.net`.
- `contact-domain` links the label `ostlind.network` to `https://ostlind.network`.
- `contact-no-phone` shows no phone number and no `tel:` link.

## How to get to it (user POV)

- Choose `Contact` in the header.
- Or choose `Write to Sebastian` in the hero. That link uses the same mailto.
- Or use the email in the footer.

## Driving it with verify.mjs

Preconditions:

- Preview is healthy at `http://127.0.0.1:4321/`.
- `npm run verify` must report PASS for `email`, `email text`, `domain label`, `contact`, `absent www host`, `absent tel link`, and `absent phone word`.

- **Open Contact.** Choose `Contact`. Run `curl -fsS http://127.0.0.1:4321/ -o artifacts/verify/index.html`. The HTML contains `id="contact"` and `mailto:sebastian@ostlind.net`.
- **Read the addresses.** The contact list shows `sebastian@ostlind.net` and `ostlind.network`. The domain link href is `https://ostlind.network`.
- **Confirm there is no phone.** Search the saved HTML for `tel:` and `phone`. Both are absent.
- **Proof.** `artifacts/verify/mobile.png` shows the contact block on a 390-wide viewport when the capture is tall enough. The report file records the string checks even if you do not click mailto.

## Gotchas

- A mailto link will open the local mail app. The proof is the href, not a sent message.
- Visible text must say `ostlind.network`, not a `www` host. The href may use `https`.
