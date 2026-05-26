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

### Configure the Pi hostname

Copy `.env.example` to `.env` and set `PI_HOST` to your Pi's hostname or IP.
Both the dev proxy (`frontend/vite.config.ts`) and `deploy.sh` read from it.

```bash
cp .env.example .env
```

### Backend (on the Pi, over SSH)

```bash
make dev
```

### Frontend (on the laptop, dev mode)

```bash
cd frontend/
npm install
npm run dev
# open http://localhost:5173
```

The dev server proxies `/video` and `/ws` to the Pi at `$PI_HOST:8000`
(see `frontend/vite.config.ts`).

### Deploy to the Pi

One-time setup — enable passwordless SSH to the Pi so `rsync` and `ssh`
in `deploy.sh` run without prompts:

```bash
# Copy your public key to the Pi (asks for the Pi's password once).
# If you don't have an SSH key yet, run `ssh-keygen` first.
ssh-copy-id $PI_USER@$PI_HOST

# Verify — should print "ok" with no password prompt
ssh $PI_USER@$PI_HOST 'echo ok'
```

Then deploy:

```bash
./deploy.sh
```

Builds the frontend into `backend/static/`, rsyncs the backend to the Pi,
and restarts `uvicorn`. App is then served from `http://$PI_HOST:8000`.

## Project layout

```
backend/    — FastAPI server (motors, camera, WebSocket)
frontend/   — React app (Vite + Tailwind + shadcn)
deploy.sh   — build + rsync + restart on the Pi
CLAUDE.md   — conventions for working in this repo
```
