#!/bin/zsh
# v0_kitaura.html をローカルサーバーで開く（画像が file:// で読めない問題を避ける）
set -euo pipefail

SCRIPT_DIR="${0:A:h}"
cd "${SCRIPT_DIR}"
PORT=5000
URL="http://127.0.0.1:${PORT}/v0_kitaura.html"

echo "[open-v0-local] 静的サーバーを起動します: http://localhost:${PORT}"
echo "終了するにはこのウィンドウを閉じてください。"
echo ""

_start_server() {
  if command -v npx &>/dev/null; then
    npx -y serve . -p "${PORT}"
  else
    python3 -m http.server "${PORT}"
  fi
}

_start_server &
SERVER_PID=$!

# サーバー起動待ち（最大15秒）
for _ in {1..30}; do
  if curl -fsS "http://127.0.0.1:${PORT}/" -o /dev/null 2>/dev/null; then
    break
  fi
  sleep 0.5
done

open "${URL}"
wait "${SERVER_PID}"
