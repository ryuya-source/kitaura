# Vercel プレビューコメントの使い方

プレビューデプロイ上で「画面上の位置にコメントを残す」機能です。PR と連携し、コメントが GitHub 側にも反映されます。

---

## 1. 前提：Vercel と GitHub の連携

- Vercel に **GitHub リポジトリ（例: ryuya-source/kitaura）をインポート** したプロジェクトがあること
- ブランチへの push や **PR を作成すると、自動でプレビューデプロイ** が走ること
- PR に **Vercel Bot が「Preview URL」をコメント** してくれること

まだの場合は [Vercel Dashboard](https://vercel.com/dashboard) → Add New → Project → 対象リポジトリを選択してインポートしてください。  
**Root Directory** は Next サイトのルート（例: `v4/kitauralakeside-rvpark-newsite`）に合わせます。

---

## 2. コメント（Vercel Toolbar）を有効にする

コメントは **Vercel Toolbar** の一部です。プレビューで有効になっているか確認します。

### チーム単位

1. [Vercel Dashboard](https://vercel.com/dashboard) でチームを選択
2. **Settings** タブ
3. **General** の **Vercel Toolbar**
4. **Preview** を **On** に

### プロジェクト単位

1. 対象プロジェクトを開く
2. **Settings** → **General** の **Vercel Toolbar**
3. **Preview** を **Default**（チームに従う）または **On** に

※ 新規プロジェクトはデフォルトでプレビューにコメント有効になっていることが多いです。

---

## 3. プレビューコメントの使い方

### 3-1. プレビューURLを開く

1. GitHub で **PR を作成** する（または既存 PR に push）
2. デプロイ完了後、PR に **Vercel Bot のコメント** が付く（「Visit Preview」などのリンク）
3. その **Preview URL を開く**（要ログインの場合は Vercel アカウントでログイン）

### 3-2. コメントを付ける

- **キーボード:** プレビュー画面で **`c`** キーを押すと「コメント配置モード」になる
- **メニュー:** 画面上の **Vercel ツールバー**（通常は左下や下部）→ **Comment** を選択してから、コメントしたい場所をクリック

コメントを書いて送信すると、**その画面・位置に紐づいたコメント** として保存され、PR の会話としても参照できます。

### 3-3. その他の操作

- **メンション:** コメント内で **`@ユーザー名`** でチームメンバーに通知
- **絵文字:** **`:`** のあとに名前を入力（例: `:smile:`）で絵文字
- **スクショ:** コメント作成時に **＋** でファイル添付、**カメラアイコン** で画面キャプチャ（Chrome 拡張利用時はドラッグで範囲指定も可能）
- **マークダウン:** 太字・リスト・リンクなどに対応

---

## 4. コメントの確認・管理

- ツールバーの **Inbox** から、そのプレビュー上のコメント一覧を表示
- スレッドごとに **Resolved / Unresolved** でフィルタ可能
- コメントの **…** → **Copy Link** で該当コメントへのリンクをコピー可能

---

## 5. うまく表示されないとき

- **Vercel にログイン** しているか確認
- プロジェクトの **Vercel Toolbar** で **Preview** が **On** か確認
- 表示対象が **HTML のページ** であること（Next のページは OK。API ルートや静的ファイルだけの URL ではツールバーが出ないことがある）
- 本番やローカルで同じコメント機能を使う場合は [Vercel Toolbar in Production and Localhost](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost) を参照

---

## 参考リンク

- [Using Comments with Preview Deployments](https://vercel.com/docs/comments/using-comments)
- [Enabling and Disabling Comments](https://vercel.com/docs/comments/how-comments-work)
