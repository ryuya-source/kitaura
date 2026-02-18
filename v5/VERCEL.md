# Vercel プレビュー（v5）

このフォルダ（v5）は Next.js アプリです。Vercel でプレビューする手順です。

## リポジトリが `dev/4.rv_park` ルートの場合

1. [Vercel](https://vercel.com) で **Import Git Repository** から `ryuya-source/kitaura` を選択
2. **Branch**: `v5` を選択
3. **Root Directory**: `v5` を指定（重要）
4. **Framework Preset**: Next.js（自動検出）
5. Deploy

ブランチ `v5` に push するたびに、Vercel がプレビュー用の URL を発行します。

## 環境

- Node.js 18.x 以上
- `npm install` → `npm run build` でビルド
