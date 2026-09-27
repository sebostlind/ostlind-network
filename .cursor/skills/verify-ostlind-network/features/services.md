# Services

Services names the only three forms of client work: executive coaching, leadership consulting, and organizational psychology.

## Sub-features

- `services-open` reaches the section from the header.
- `services-three` shows those three headings and no extra service.

## How to get to it (user POV)

- Open the site and choose `Services` in the header.
- Or scroll to the `Services` heading.

## Driving it with verify.mjs

Preconditions:

- Preview is healthy at `http://127.0.0.1:4321/`.
- `npm run verify` must report PASS for `services`, `coaching`, `leadership`, and `psychology`.

- **Open Services.** Choose `Services`. Run `curl -fsS http://127.0.0.1:4321/#services -o artifacts/verify/services.html`. The HTML contains `id="services"` and the heading `Services`.
- **Read the three forms.** Stay in that section. The headings are `Executive coaching`, `Leadership consulting`, and `Organizational psychology`.
- **Proof.** `artifacts/verify/desktop.png` from `npm run verify` includes the Services heading and the three names when the window is tall enough to contain them.

## Gotchas

- The hash in the curl URL does not change the HTML. Assert `id="services"`, not a separate document.
- Do not treat a passing hero check as a passing services check.
