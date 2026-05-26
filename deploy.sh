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

: "${PI_USER:?PI_USER not set in .env}"
: "${PI_PATH:?PI_PATH not set in .env}"

echo "→ Building frontend..."
cd frontend && npm run build && cd ..

echo "→ Deploying to Pi..."
rsync -av --exclude='__pycache__' --exclude='*.pyc' \
  backend/ $PI_USER@$PI_HOST:$PI_PATH/

echo "✓ Done. SSH to the Pi and run ./run.sh from $PI_PATH to start the server."
