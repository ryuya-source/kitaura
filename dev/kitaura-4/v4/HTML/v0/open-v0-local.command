#!/bin/zsh
# v0_kitaura.html をローカルサーバーで開く（画像が file:// で読めない問題を避ける）
# 同一Wi-Fiの実機からもアクセス可能（0.0.0.0 で待ち受け）
set -euo pipefail

SCRIPT_DIR="${0:A:h}"
cd "${SCRIPT_DIR}"
PORT=3001
HOST="0.0.0.0"
# vercel.json のリライトで / → /v0_kitaura.html になる
URL_LOCAL="http://127.0.0.1:${PORT}/"

# ローカルIPを取得（実機用）
get_local_ip() {
  ipconfig getifaddr en0 2>/dev/null || \
  ipconfig getifaddr en1 2>/dev/null || \
  (ifconfig 2>/dev/null | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
}

_start_server() {
  # server.js はこの v0 フォルダを必ずルートに配信。/ → v0_kitaura.html
  if [[ -f "${SCRIPT_DIR}/server.js" ]] && command -v node &>/dev/null; then
    node "${SCRIPT_DIR}/server.js"
  elif command -v npx &>/dev/null; then
    npx -y serve . -p "${PORT}" -l "tcp://${HOST}:${PORT}"
  else
    python3 -m http.server "${PORT}" --bind "${HOST}"
  fi
}

echo "[open-v0-local] 静的サーバーを起動します（ポート ${PORT}）"
echo ""
LOCAL_IP=$(get_local_ip)
if [[ -n "${LOCAL_IP}" ]]; then
  echo "  【実機で確認】同じWi-Fiのスマホ・タブレットで以下を開いてください:"
  echo "  → http://${LOCAL_IP}:${PORT}/"
  echo "     （/ で v0_kitaura.html が表示されます）"
  echo "  → http://${LOCAL_IP}:${PORT}/pet.html"
  echo ""
fi
echo "  PCブラウザ: ${URL_LOCAL}"
echo "  終了するにはこのウィンドウを閉じてください。"
echo ""

_start_server &
SERVER_PID=$!

# サーバー起動待ち（最大15秒）
for _ in {1..30}; do
  if curl -fsS "http://127.0.0.1:${PORT}/" -o /dev/null 2>/dev/null; then
    break
  fi
  sleep 0.5
done

open "${URL_LOCAL}"
wait "${SERVER_PID}"
