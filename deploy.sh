#!/bin/bash
set -e

PI_USER="seva"
PI_HOST="192.168.0.133"
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
