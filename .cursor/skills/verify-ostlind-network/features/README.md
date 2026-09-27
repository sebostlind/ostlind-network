# Östlind & Co Network verification map

This directory is the source for checking the public one-page site. Read this index, then use the feature file for the path you are proving.

## Baseline preconditions

- Run commands from the repository root.
- Serve the built site with `npx astro preview --host 127.0.0.1 --port 4321`, or let `npm run verify` do that.
- Use `http://127.0.0.1:4321/`. Do not point the checks at another port.
- Do not drive a preview you did not start for this run. Port 4321 cannot be shared.

## Driving conventions

- Start from the top of the page.
- Prefer the visible link text and the heading text.
- Treat the curl commands as literal.
- `npm run verify` is the scripted drive. The curls in each feature file are the hand drive.

## Proof and skip reporting

- Save the fetched HTML and a screenshot, not only a status code.
- Record which feature file you followed.
- If a section id is missing, report that command and the failed check. Do not mark the section passed because another section rendered.

## Feature entry contract

Each feature file has an H1, one opening paragraph, and these H2 sections in order.

1. `Sub-features`
2. `How to get to it (user POV)`
3. `Driving it with verify.mjs`
4. `Gotchas`

## Features

- [Hero and navigation](./hero.md) covers the mark, the wordmark, and the serif sentence.
- [Practice](./services.md) covers the three forms of client work named in that sentence.
- [Contact](./contact.md) covers the header email and the domain label.
