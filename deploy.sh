#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ ! -f "$SCRIPT_DIR/.env" ]; then
  echo "✗ .env not found. Copy .env.example to .env and set PI_HOST." >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
source "$SCRIPT_DIR/.env"
set +a

PI_USER="seva"
PI_PATH="~/ugv"

echo "→ Building frontend..."
cd frontend && npm run build && cd ..

echo "→ Deploying to Pi..."
rsync -av --exclude='__pycache__' --exclude='*.pyc' \
  backend/ $PI_USER@$PI_HOST:$PI_PATH/backend/

echo "→ Restarting server..."
ssh $PI_USER@$PI_HOST \
  "pkill uvicorn || true; \
   cd $PI_PATH/backend && \
   source $PI_PATH/venv/bin/activate && \
   nohup uvicorn main:app --host 0.0.0.0 --port 8000 &"

echo "✓ Done. App running at http://$PI_HOST:8000"
