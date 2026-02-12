#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="${0:A:h}"

# Next.js UI（v4/v2_kitaura）を起動してブラウザで開く
APP_DIR="${SCRIPT_DIR}/v4/v2_kitaura"

cd "${APP_DIR}"

if [[ ! -d node_modules ]]; then
  echo "[open-ui] node_modules が無いので npm ci します"
  npm ci
fi

echo "[open-ui] dev server を起動します: http://localhost:3000"
npm run dev &
DEV_PID=$!

# 起動待ち（最大30秒）
for _ in {1..60}; do
  if curl -fsS "http://127.0.0.1:3000/" >/dev/null 2>&1; then
    break
  fi
  sleep 0.5
done

open "http://localhost:3000"

# このウィンドウを閉じると dev server も止まります
wait "${DEV_PID}"

