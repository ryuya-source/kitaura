#!/bin/bash
cd "$(dirname "$0")"
PORT=8080
echo "プレビュー用サーバーを起動しています..."
python3 -m http.server $PORT --bind 0.0.0.0 &
SERVER_PID=$!
sleep 1
# 同じWi-Fi内の実機用にローカルIPを表示（Mac）
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || ifconfig 2>/dev/null | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}')
echo ""
echo "【PCブラウザ】"
echo "  http://127.0.0.1:$PORT/HTML/v0/v0_kitaura.html"
echo ""
if [ -n "$LOCAL_IP" ]; then
  echo "【同じWi-Fiの実機で確認】"
  echo "  スマホのブラウザで次のURLを入力:"
  echo "  http://${LOCAL_IP}:$PORT/HTML/v0/v0_kitaura.html"
  echo ""
fi
echo "終了するには Ctrl+C を押してください。"
echo ""
open "http://127.0.0.1:$PORT/HTML/v0/v0_kitaura.html" 2>/dev/null || true
wait $SERVER_PID
