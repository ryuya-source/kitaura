# Vercel プレビュー（v5）

このフォルダ（v5）は Next.js アプリです。kitaura リポジトリの **v5 ブランチ** で管理されています。

## すでにやったこと

- リポジトリ: **https://github.com/ryuya-source/kitaura**
- ブランチ: **v5**（main とは別）
- `v5` ブランチはリモートに push 済み

## Vercel でプレビューする手順

1. [Vercel](https://vercel.com) にログイン → **Add New Project**
2. **Import Git Repository** で `ryuya-source/kitaura` を選択
3. 設定:
   - **Branch**: `v5`
   - **Root Directory**: `v5` を指定（**必須**。指定しないとビルドが失敗します）
   - **Framework Preset**: Next.js（自動検出）
4. **Deploy** を実行

以降、`v5` ブランチに push するたびに、Vercel がプレビュー用の URL を自動で発行します。

## 環境

- Node.js 18.x 以上
- `npm install` → `npm run build` でビルド
