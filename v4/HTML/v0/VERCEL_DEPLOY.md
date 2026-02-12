# Vercel デプロイ手順

## 1. Vercel にリポジトリを接続

1. [vercel.com](https://vercel.com) にログイン
2. **Add New** → **Project**
3. 対象の Git リポジトリ（例: kitaura）を **Import**

## 2. プロジェクト設定

- **Root Directory**: `v4` を指定（**Edit** で変更）
  - これで `v4` フォルダがデプロイのルートになります
- **Framework Preset**: Other（そのまま）
- **Build Command**: 未設定のまま
- **Output Directory**: 未設定のまま

## 3. デプロイ

**Deploy** をクリック。

## 4. 確認

デプロイ後、次の URL でトップが開きます。

- `https://あなたのプロジェクト.vercel.app/`

`vercel.json` により `/` が `HTML/v0/v0_kitaura.html` にリライトされています。
