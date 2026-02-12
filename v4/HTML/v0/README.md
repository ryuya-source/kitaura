# 北浦_サイト改修

## 目的

`要件定義` を踏襲し、UIデザイン（プロトタイプ）を Next.js（`v4/v2_kitaura/`）に実装しています。

## UI

- 場所: `v4/kitauralakeside-rvpark-newsite/`（Next.js）
- 起点: `http://localhost:3000`（Next.js は 3000、静的 v0 は 3001）

### 起動（macOS）

```bash
cd v4/kitauralakeside-rvpark-newsite
npm ci
npm run dev
```

## バージョン管理

このディレクトリ配下は Git で管理できる想定です（`.gitignore` 同梱）。

## かんたん起動（ターミナル不要）

- `open-ui.command` をダブルクリックすると dev server を起動してブラウザで開きます

## 静的 HTML（v0）をローカルで画像付きで見る

`v0_kitaura.html` を **file://** で開くと、サイト1・2・3の画像が読み込まれません（ブラウザの制約）。  
Vercel と同じように画像を表示するには、**ローカルで HTTP サーバー** を使います。

1. **方法A（推奨）**  
   `open-v0-local.command` をダブルクリック  
   → **server.js** が起動し、**v0 フォルダをルート**に配信します。ブラウザで **http://localhost:3001/** が開き、`/` で v0_kitaura.html が表示されます。  
   ※ ポート 3000 は Next.js（kitauralakeside-rvpark-newsite）用です。v0 は 3001 で動きます。

2. **実機で確認する**  
   - **Next.js サイト**: 同じ Wi-Fi で **http://〈PCのIP〉:3000/**（例: http://192.168.11.10:3000/）
   - **静的 v0**: 起動時に表示される **http://〈あなたのPCのIP〉:3001/** を開いてください。

3. **方法B（ターミナル）**  
   ```bash
   cd v4/HTML/v0
   node server.js
   ```  
   ブラウザで **http://localhost:3001/** を開く。実機からは **http://〈PCのIP〉:3001/** でアクセス可能。

## 水回り写真（Pencil hme4H スクロールエリア）

- 画像は **`src/1-watter/`** に格納します。
- 表示枚数は **`src/1-watter/list.json`** の配列の長さで決まります。
- 枚数をフォルダの実画像数に合わせるには、v0 フォルダで以下を実行してください。

  ```bash
  cd v4/HTML/v0
  node update-1-watter-list.js
  ```
  これで `src/1-watter/` 内の画像ファイル名が list.json に書き出され、その枚数分だけページに表示されます。

