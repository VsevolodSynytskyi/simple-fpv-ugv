# Simple FPV UGV — RC Car Controller

RC car controller with live camera feed. Python backend on Raspberry Pi 5,
React frontend on Mac.

## Architecture

- `backend/` — FastAPI server. Runs on Pi. Controls motors via GPIO,
  streams camera via MJPEG, receives commands via WebSocket.
- `frontend/` — React app. Runs on Mac during dev, served by FastAPI
  in production from `backend/static/`.

## Dev workflow

in the project folder, on PI (via SSH)
```bash
make dev
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

## Visual Style

This project follows a strict visual language documented in `frontend/VISUAL_STYLE.md`.

**Always read `frontend/VISUAL_STYLE.md` before:**

- Creating any new component
- Adding colors, spacing, or motion
- Choosing radii, typography, or z-index values

Do not introduce visual patterns not covered by that document without asking first.

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

### Component encapsulation

- Components should be self-contained "lego bricks." Call hooks at the
  level of the component that needs the data — avoid prop drilling and
  avoid passing hook return values down the tree.
- When a shared resource (e.g. the command WebSocket) is needed by
  multiple components, expose it through a hook backed by a
  module-level singleton, so each consumer can call the hook directly
  without re-creating the resource. See `hooks/useWebSocket.ts`.
- Parent components should compose children, not wire them together
  with props.

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
