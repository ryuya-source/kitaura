# KITAURA LAKESIDE RV park（Next.js）

v4/HTML/v0 の v0_kitaura.html と **UI を完全一致** させた Next.js 実装です。

## セットアップ

```bash
npm install
```

## 開発

```bash
npm run dev
```

http://localhost:3000 でトップ、/pet でペット同伴ルール、/contact でお問い合わせを表示します。

## 静的アセット（画像）

画像・`list.json` は `public/src/` 配下に配置してください。  
v0 と同一にするには、**v4/HTML/v0/src** の内容を **public/src** にコピーしてください。

- `public/src/futter_logo.png` - ロゴ
- `public/src/image_side.jpg` - TOP 背景
- `public/src/pet_section_sunset.png` - ペットセクション背景
- `public/src/anime/` - apology4.png, dog-kezukuroi.png など
- `public/src/dog_breeds/` - slide_01.png など
- `public/src/1-watter/`, `2_dog/`, `3_els/`, `4_nearby/`, `site_no1/`, `site_no2/`, `site_no3/` - 各 list.json と画像

## ビルド

```bash
npm run build
npm start
```

## 構成

- **app/page.tsx** - トップ（SP_0〜SP_8 セクション）
- **app/pet/page.tsx** - ペット同伴ルール
- **app/contact/page.tsx** - お問い合わせ
- **components/** - HeaderWithNav, BookingModal, ImageRow, Sp7AccessSection, Sp8MediaSection
- **app/globals.css** - v0 と同一のスタイル（＋ペットページ用）
