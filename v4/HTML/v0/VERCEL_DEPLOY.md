# Vercel デプロイ手順（v0）

## 重要：画像を表示するための設定

**Root Directory を必ず `v4/HTML/v0` に設定してください。**

- これにより、デプロイのルートが v0 フォルダになり、相対パス `src/...` で画像・静的ファイルが正しく配信されます。
- Root Directory を空のままにすると、画像が 404 になります。

## 1. Vercel にリポジトリを接続

1. [vercel.com](https://vercel.com) にログイン
2. **Add New** → **Project**
3. 対象の Git リポジトリを **Import**

## 2. プロジェクト設定

- **Root Directory**: `v4/HTML/v0` を指定（必須）
- **Framework Preset**: Other
- **Build Command**: 未設定のまま
- **Output Directory**: 未設定のまま

## 3. デプロイ

**Deploy** をクリック。

## 4. 確認

- トップ: `https://あなたのプロジェクト.vercel.app/`（`vercel.json` で `/` → `/v0_kitaura.html` にリライト）
- 問い合わせ: `https://あなたのプロジェクト.vercel.app/contact.html`
- 送信完了: `https://あなたのプロジェクト.vercel.app/contact_complete.html`
- ペット同伴ルール: `https://あなたのプロジェクト.vercel.app/pet.html`

## ローカル・実機での確認

`v4/HTML/v0/` で `node server.js` を実行し、`http://localhost:3000/` または `http://<PCのIP>:3000/` で開く。同じ相対パスで画像が表示されます。
