# Simple FPV UGV

Simple UGV controller with a live first-person camera feed. The UGV runs on a
Raspberry Pi 5 The browser UI runs on a laptop and connects to the Pi over the
local network.

## Stack

**Backend** (`backend/`, runs on the Pi)

- Python 3 + FastAPI
- `uvicorn` (ASGI server)
- `gpiozero` + `lgpio` (motor control)
- `picamera2` (MJPEG camera stream)

**Frontend** (`frontend/`, runs on the laptop, served by FastAPI in prod)

- React + TypeScript
- Vite + `@vitejs/plugin-react`
- Tailwind CSS + shadcn/ui (Radix)
- `motion` for animations, `lucide-react` for icons

## Run it

### Backend (on the Pi, over SSH)

```bash
cd ~/ugv/backend
source ~/ugv/venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend (on the laptop, dev mode)

```bash
cd frontend
npm install
npm run dev
# open http://localhost:5173
```

The dev server proxies `/video` and `/ws` to the Pi at `192.168.0.133:8000`
(see `frontend/vite.config.ts`).

### Deploy to the Pi

```bash
./deploy.sh
```

Builds the frontend into `backend/static/`, rsyncs the backend to the Pi,
and restarts `uvicorn`. App is then served from `http://192.168.0.133:8000`.

## Project layout

```
backend/    — FastAPI server (motors, camera, WebSocket)
frontend/   — React app (Vite + Tailwind + shadcn)
deploy.sh   — build + rsync + restart on the Pi
CLAUDE.md   — conventions for working in this repo
```
