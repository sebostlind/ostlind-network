# Östlind & Co Network

Public one-page site for ostlind.network. `npm run build` writes a static site to `dist/`.

## Run the site locally

1. Run `npm install`.
2. Run `npm run dev`.
3. Open http://127.0.0.1:4321.

`npm run build` writes `dist/`. `npm run preview` serves that folder.

## Deploy on Cloudflare Pages

Create a Pages project from this repository and use these settings.

- Framework preset is Astro.
- Build command is `npm run build`.
- Build output directory is `dist`.
- Root directory is the repository root.
- Production branch is `main`.
- Node.js version is 22.

The site does not need environment variables.

After the first successful deploy, attach the custom domain `ostlind.network` in the Pages project. Visible copy uses that apex name. Do not put `www` in the page text.

## Check the build

Run `npm run verify`. The command builds the site, serves `dist/`, and checks the page. The steps live in `.cursor/skills/verify-ostlind-network/SKILL.md`.
