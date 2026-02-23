# Vercel プレビュー（v4）

このフォルダ（v4/kitaura_v1）は Next.js アプリです。kitaura リポジトリの **v4 ブランチ** で管理されています。

## すでにやったこと

- リポジトリ: **https://github.com/ryuya-source/kitaura**
- ブランチ: **v4**（main とは別）
- `v4` ブランチはリモートに push 済み

## Vercel でプレビューする手順

1. [Vercel](https://vercel.com) にログイン → **Add New Project**（または既存の kitaura プロジェクトを開く）
2. **Import Git Repository** で `ryuya-source/kitaura` を選択
3. 設定:
   - **Branch**: `v4`
   - **Root Directory**: `v4/kitaura_v1` を指定（**必須**。指定しないとビルドが失敗します）
   - **Framework Preset**: Next.js（自動検出）
4. **Deploy** を実行

既存の kitaura プロジェクトでプレビューのみ追加する場合:
- **Settings** → **Git** で **Production Branch** はそのまま（例: main）
- **Preview Branches** に `v4` が含まれるようにする
- または **Deployments** から **Branch** で `v4` を選び **Redeploy**（その際 Root Directory が `v4/kitaura_v1` になっているか確認）

以降、`v4` ブランチに push するたびに、Vercel がプレビュー用の URL を自動で発行します。

## 環境

- Node.js 18.x 以上
- `npm install` → `npm run build` でビルド
