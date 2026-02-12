# Vercel デプロイ手順（v0）

## 1. Vercel にリポジトリを接続

1. [vercel.com](https://vercel.com) にログイン
2. **Add New** → **Project**
3. 対象の Git リポジトリを **Import**

## 2. プロジェクト設定

- **Root Directory**: `v4/HTML/v0` を指定
  - このフォルダがデプロイのルートになります（v0 内の HTML がそのまま公開されます）
- **Framework Preset**: Other
- **Build Command**: 未設定のまま
- **Output Directory**: 未設定のまま

## 3. デプロイ

**Deploy** をクリック。

## 4. 確認

- トップ: `https://あなたのプロジェクト.vercel.app/` → `vercel.json` で `/v0_kitaura.html` にリライト
- 問い合わせ: `https://あなたのプロジェクト.vercel.app/contact.html`
- 送信完了: `https://あなたのプロジェクト.vercel.app/contact_complete.html`
