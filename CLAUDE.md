# CLAUDE.md

Context for AI assistants working in this repo.

## What this is

An interactive prototype built for a final-round product interview. It
demonstrates a proposed feature: surfacing patient care gaps inside workflows
the patient is already in, and closing them by booking the next appointment.

It is a **demo artifact**, not a product. It will be walked through live on a
screen share and also clicked through unattended by a reviewer beforehand. Both
audiences matter, which is why the right-hand notes panel exists.

It is not a real integration. Detection is stubbed, patients are invented,
there is no auth, no backend, and no network calls.

## The argument the prototype makes

Do not refactor this away. The structure encodes a specific product argument:

1. **Three surfaces, ordered by cost and risk.** Pre-arrival intake first
   (cheapest, highest conversion), lapsed patient second, staff queue third.
   The left rail order is the argument.
2. **The inspector toggle is the centerpiece.** "Show what's actually AI"
   labels every element as RULE, AI, EMR, or YOSI. The point is intellectual
   honesty: gap detection is deterministic logic, not AI. AI earns its place
   only in plain-language rewriting, sequencing, and channel/timing selection.
   The teal YOSI tags mark proprietary engagement data, which is the moat.
   If you touch the inspector, preserve that mapping.
3. **Unhappy paths are deliberate.** The declined branch, the 90-day
   suppression, "I had this done elsewhere," and the visible suppression log in
   the staff view are the credibility of the whole thing. Most prototypes only
   show the happy path. Do not trim these to simplify.
4. **The staff view exists because the practice is the buyer.** The number that
   matters is share closed with no staff touch, measured against a randomized
   holdout.

## Stack and commands

Vite + React 18 + Tailwind v4 (via `@tailwindcss/vite`). No other runtime deps.

```bash
npm install
npm run dev      # local, usually http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built output
```

## File map

```
src/YosiPrototype.jsx   the entire prototype, single file, ~700 lines
src/main.jsx            mounts it
src/index.css           Tailwind import + base body styles
vite.config.js          React + Tailwind plugins, and the Pages base path
.github/workflows/      builds and publishes to GitHub Pages on push to main
```

Keep it a single component file. It is easier to hand to someone, easier to
read in one pass, and the size does not justify splitting.

## Conventions

- **Color comes from the `C` object as inline styles.** Tailwind handles
  layout, spacing, and flex only. This was originally written to run in an
  environment without a Tailwind compiler, and keeping it means the component
  can be pasted anywhere. Do not convert colors to Tailwind classes.
- Palette is navy / teal / amber. `C.teal` means "proprietary Yosi data" in the
  inspector, so do not reuse it decoratively.
- `Marked` wraps anything the inspector should annotate. `Tag` renders the
  label. Add new annotated elements by wrapping in `Marked`, not by hand.
- Notes panel copy lives in the `NOTES` object, keyed `flow-step`. Every new
  step needs an entry or the panel silently falls back.

## Copy rules

- **No em dashes anywhere.** Use spaced hyphens for asides.
- Sentence case. Plain verbs. Active voice. A button says what happens when you
  press it, and the confirmation uses the same word.
- Patient-facing text is written from the patient's side of the screen. Say
  "you're due for a mammogram," not "care gap identified."
- No clinical jargon in patient copy. That is the point of the feature.

## Hard constraints

- **Never name a real company, customer, practice, or person.** All practices
  and patients are invented and must stay that way. "Riverside Primary Care" is
  fictional and deliberately generic.
- No real or realistic PHI. Invented names, rounded dates, no identifiers.
- No `localStorage`, no backend, no fetch. State is React state only.
- The header must keep its "prototype, fictional data" label visible.

## Known open items

- Only primary care is modeled. Two gap types: mammogram and A1c.
- The post-visit surface (surface 2 in the proposal) is described in the deck
  but not built. Pre-arrival and lapsed patient are the two that exist.
- Mobile layout stacks but has not been tested on a real device.
