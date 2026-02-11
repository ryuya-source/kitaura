#!/bin/bash
cd "$(dirname "$0")"
echo "プレビュー用サーバーを起動しています..."
python3 -m http.server 8080 --bind 127.0.0.1 &
SERVER_PID=$!
sleep 1
echo ""
echo "ブラウザで開くURL: http://127.0.0.1:8080/HTML/v0/v0_kitaura.html"
echo "終了するには Ctrl+C を押してください。"
echo ""
open "http://127.0.0.1:8080/HTML/v0/v0_kitaura.html" 2>/dev/null || true
wait $SERVER_PID
