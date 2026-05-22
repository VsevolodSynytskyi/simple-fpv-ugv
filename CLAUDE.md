# Simple FPV UGV — RC Car Controller

RC car controller with live camera feed. Python backend on Raspberry Pi 5,
React frontend on Mac.

## Architecture

- `backend/` — FastAPI server. Runs on Pi. Controls motors via GPIO,
  streams camera via MJPEG, receives commands via WebSocket.
- `frontend/` — React app. Runs on Mac during dev, served by FastAPI
  in production from `backend/static/`.

## Dev workflow

Terminal 1 — Pi (via SSH):
```bash
cd ~/ugv/backend
source ~/ugv/venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

Terminal 2 — Mac:
```bash
cd frontend
npm run dev
# open http://localhost:5173
```

Deploy:
```bash
./deploy.sh
```

## Conventions

### Styling

- Use **Tailwind utility classes** for all styling. No inline `style={}`
  props except where required by third-party libs (e.g., Leaflet).
- Do NOT write custom CSS in `index.css` or create new `.css` files.
  The only CSS file is `src/index.css` which contains the Tailwind import.
- Use **shadcn/ui** components for interactive UI elements (dialogs,
  dropdowns, tooltips, popovers, etc.).
  Add new components via `npx shadcn@latest add <component>`.
- Dark theme is the default (CSS variables in `src/index.css`).
- Prefer named Tailwind classes over arbitrary values.

### Animations

- Use the `motion` library for all animations and transitions.
- Import from `"motion/react"` for React components.
- Prefer `motion` over CSS transitions/animations.

### Code Style

- Functional components only, no class components.
- Use named exports for components (except App which uses default export).
- TypeScript strict mode is enabled.
- Prefer `switch` statements over ternaries/`if` chains for multi-branch
  conditionals.
- Place component files in `src/` — organize into subdirectories as the
  project grows (`src/components/`, `src/hooks/`).

### Formatting (Prettier)

- **No semicolons**
- **Single quotes**
- **Trailing commas** in multi-line lists, objects, parameters
- **2-space indentation**
- **80 character line width**
- Tailwind classes are auto-sorted by `prettier-plugin-tailwindcss`

### Project Structure

```
src/
  main.tsx          — app entry
  App.tsx           — root component
  index.css         — Tailwind import only
  components/       — UI components
  hooks/            — custom React hooks
```

## Git

- **NEVER** commit, amend, or push without the user explicitly asking.

## Commands

- `npm run dev` — start dev server
- `npm run build` — type-check + production build
- `npm run lint` — ESLint
- `npm run format` — format all files with Prettier
- `npm run format:check` — check formatting without writing
- `npm run preview` — preview production build
