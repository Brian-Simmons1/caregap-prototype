# Care gap prototype

Interactive prototype: care gaps surfaced and closed inside flows the patient
is already in. Three flows (pre-arrival intake, lapsed patient, staff queue)
plus an inspector toggle that labels every element as rule, AI, EMR read, or
proprietary data.

Fictional patients. Stubbed detection logic. No authentication.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Deploy to GitHub Pages

1. Create the repo on GitHub and push this folder to `main`.
2. Repo Settings > Pages > Build and deployment > Source: **GitHub Actions**.
3. Push. The workflow in `.github/workflows/deploy.yml` builds and publishes.

The site lands at `https://<user>.github.io/caregap-prototype/`.

**If you name the repo something else,** change `base` in `vite.config.js` to
match, or the page loads blank with 404s on the JS bundle. That is the single
most common way this breaks.

## Files

- `src/YosiPrototype.jsx` — the whole prototype, one file
- `src/main.jsx` — mounts it
- `vite.config.js` — React + Tailwind plugins, and the Pages `base` path
