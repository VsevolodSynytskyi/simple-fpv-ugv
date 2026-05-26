#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if pgrep -f "uvicorn main:app" >/dev/null; then
  echo "→ Stopping existing uvicorn..."
  pkill -f "uvicorn main:app" || true
  for _ in $(seq 1 20); do
    pgrep -f "uvicorn main:app" >/dev/null || break
    sleep 0.25
  done
  if pgrep -f "uvicorn main:app" >/dev/null; then
    echo "→ Forcing kill..."
    pkill -9 -f "uvicorn main:app" || true
    sleep 0.5
  fi
fi

# shellcheck disable=SC1091
source "$SCRIPT_DIR/venv/bin/activate"

exec uvicorn main:app --host 0.0.0.0 --port 8000
