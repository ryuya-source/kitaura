# KITAURA LAKESIDE RVパーク - API・DB設計案

仕様書（機能要件）および v0_kitaura.html の画面・データ構造を前提にした API・DB 設計案です。

---

## 1. 前提の整理

| 項目 | 仕様 | 影響 |
|------|------|------|
| 予約受付 | LINE / メール / 電話（オンライン予約システムなし） | 予約用の自前DB・APIは不要 |
| お問い合わせ | FormSubmit（バックエンド不要） | 問い合わせ保存用DBは不要（オプションでログのみ検討可） |
| お知らせ・メディア | microCMS で管理 | お知らせ・メディアは microCMS API を利用 |
| YouTube | 再生数・いいね数は「手動 + API取得」の併用検討 | 統計キャッシュ用の軽いストアがあると便利 |
| 料金・サイト・アクセス | サイト案内・料金表・アクセスは静的情報 | 現状は静的/JSON で十分。将来の更新頻度でCMS化を検討 |

---

## 2. API設計案

### 2.1 案A: 外部APIのみ（推奨）

**構成**

- **お知らせ・メディア**: microCMS API をそのまま利用
- **YouTube統計**: 必要なら YouTube Data API v3 で再生数・いいね数を取得（ISR/キャッシュと組み合わせ）
- **料金・サイト・アクセス**: コード内の定数または JSON ファイル（`/public` や `src/data`）で管理。専用APIは作らない

**エンドポイント例（利用する外部API）**

| 用途 | エンドポイント | 取得元 |
|------|----------------|--------|
| お知らせ一覧（最大3件） | `GET https://kitauralakeside.microcms.io/api/v1/news?limit=3&orders=-publishedAt` | microCMS |
| メディア掲載一覧（最大5件） | 別APIまたは news の content で種別分け | microCMS |
| YouTube統計 | `GET https://www.googleapis.com/youtube/v3/videos?part=statistics&id={videoId}` | YouTube Data API v3 |

**Next.js 側の役割**

- Server Component または API Route で microCMS を呼び、`revalidate` や `fetch cache` でキャッシュ
- YouTube 統計は API Route（例: `/api/youtube-stats?id=xxx`）で取得し、キャッシュ（例: 1時間）してフロントに返す

**メリット**

- 自前バックエンドが不要で、Vercel のサーバーレスだけで完結する
- 仕様（FormSubmit・microCMS）と一致し、運用コストが小さい
- 実装が早く、保守しやすい

---

### 2.2 案B: BFF（Backend for Frontend）を薄く用意

**構成**

- フロントからは「自前の Next.js API Routes」だけ叩く
- API Routes 内で microCMS / YouTube を呼び、レスポンスを整形して返す

**例**

| クライアントが叩くAPI | 内部でやること |
|----------------------|----------------|
| `GET /api/news` | microCMS のお知らせを取得し、表示用に整形（NEW バッジ用の日付判定など） |
| `GET /api/media` | microCMS のメディア一覧を取得し、YouTube 統計を付与して返す |
| `GET /api/site-info` | 料金・サイト種別・アクセス情報を JSON から読み、1本で返す（任意） |

**メリット**

- フロントは「自サイトのAPI」だけ知っていればよい
- microCMS のスキーマ変更や YouTube の付け足しを BFF で吸収できる

**デメリット**

- API Routes の実装・テストの手間が少し増える

---

### 2.3 案C: 将来の予約・空き管理を見据えたAPI

- 現仕様では**予約・空き照会はLINE/メール/電話**のため、今は不要
- 将来「空き状況表示」や「簡易予約」を Web でやりたくなった場合に、  
  - 空き照会: `GET /api/availability?site=1&date=2026-02-15` のようなAPIを検討
  - 予約申込: フォーム送信先を自前APIにし、DB保存＋メール通知などに拡張

現時点では**設計のみメモし、実装は行わない**形で十分です。

---

## 3. DB設計案

### 3.1 案A: DBを置かない（推奨）

**方針**

- お知らせ・メディア: microCMS がデータストア
- お問い合わせ: FormSubmit がメール送信まで担当
- 料金・サイト・アクセス: リポジトリ内の JSON / 定数

**必要なテーブル**: なし

**メリット**

- インフラが増えず、Vercel + microCMS + FormSubmit だけで運用できる
- コスト・運用負荷が最小
- 仕様書の「FormSubmit」「microCMS」と一致

---

### 3.2 案B: 軽量なDBを補助的に使う

「お問い合わせを自前で残したい」「YouTube の再生数などを毎日集計したい」場合の**オプション**です。

**想定テーブル（例: Supabase / Vercel Postgres）**

| テーブル | 用途 | 主なカラム例 |
|----------|------|-----------------------------|
| `contact_logs` | お問い合わせのログ（FormSubmit の代わりに自前送信にする場合） | id, name, email, tel, hope_date, guests, check_in_time, pet_info, body, created_at |
| `youtube_stats_cache` | YouTube 統計のキャッシュ（Quota 節約） | video_id, view_count, like_count, fetched_at |

**運用イメージ**

- お問い合わせ: フォーム送信を API Route で受け、`contact_logs` に insert しつつ、メール送信（Resend 等）で通知
- YouTube: 定期実行（Cron）で API を叩き、`youtube_stats_cache` を更新。表示はキャッシュを読む

**注意**

- 仕様では「FormSubmit（バックエンド不要）」が確定のため、**まずはDBなしで進め、必要になったら案Bを検討**するのがおすすめです。

---

### 3.3 料金・サイト・アクセスを「データ」として整理する場合（DBではなくJSON/定数）

将来 microCMS や別CMS に移すまでは、リポジトリ内のデータで十分です。

**例: サイト別料金**

```ts
// src/data/pricing.ts または JSON
export const sitePricing = [
  { siteId: 1, name: "サイト1", size: "8m×15m", capacity: 5, amperage: 15, weekday: 6500, weekend: 9500, highSeason: 11000 },
  { siteId: 2, name: "サイト2", size: "11m×13m", capacity: 5, amperage: 15, weekday: 6500, weekend: 9500, highSeason: 11000 },
  { siteId: 3, name: "サイト3", size: "12m×9m", capacity: 3, amperage: 20, weekday: 7000, weekend: 10000, highSeason: 11500 },
];
```

**例: ペット料金・オプション**

- 2頭まで無料、3頭目以降 +500円/頭、最大4頭
- 人数追加 +2000円/名  
→ これも定数または短いJSONで保持可能

**例: アクセス（IC別所要時間）**

- 東関東: 鉾田IC 約15分、潮来IC 約30分
- 常磐: 土浦北IC 約50分  
→ 配列またはJSONで保持し、コンポーネントで参照

DB化するかは「管理者がブラウザから料金を変えたいか」で判断し、現時点では**ファイル/定数で十分**です。

---

## 4. 推奨案と理由

### 推奨: **APIは案A（外部APIのみ） + DBは案A（DBを置かない）**

**理由**

1. **仕様との一致**
   - 予約はLINE/メール/電話、問い合わせは FormSubmit、コンテンツは microCMS と明記されているため、自前の予約用・問い合わせ用DBは不要。

2. **コスト・運用**
   - Vercel + microCMS + FormSubmit だけで完結でき、DBや自前APIの運用・監視が不要。
   - 小規模サイトのうちは、これで十分機能する。

3. **実装スピード**
   - microCMS の既存エンドポイントをそのまま利用し、Next.js の fetch キャッシュや ISR で「お知らせ最大3件」「メディア最大5件」「NEWは7日間」を実装できる。
   - 料金・サイト・アクセスは v0_kitaura.html の構造に合わせて定数/JSON化すれば、すぐに実装可能。

4. **拡張性**
   - のちに「お問い合わせを自前で保存したい」なら案Bの `contact_logs` を追加すればよい。
   - 「空き状況API」が必要になった時点で、その時用のAPI・DBを設計すればよい。

**YouTube 再生数・いいね数について**

- 仕様: 「手動管理 + API取得の併用検討」
- 推奨: まずは microCMS に「再生数・いいね数」を手動入力するフィールドを用意し、表示はそれを使う。  
  必要になったら、API Route で YouTube Data API を叩き、レスポンスをキャッシュ（例: 1時間）して表示用に付与する形にすると、Quota を抑えつつ自動化できる。

---

## 5. 実装時のチェックリスト（推奨案ベース）

- [ ] microCMS: お知らせ（最大3件）・メディア（最大5件）の取得と、NEWバッジ（掲載後7日間）の判定
- [ ] 料金・サイト種別・アクセス: `src/data/*.ts` または JSON で定義し、SP_4 系画面で参照
- [ ] お問い合わせ: FormSubmit のアクション先とフォーム項目（名前・連絡先・希望日・人数・チェックイン時間・ペット情報・本文）のマッピング
- [ ] （任意）YouTube 統計: microCMS のメディアに `videoId` を入れ、API Route で統計取得＋キャッシュして表示
- [ ] 環境変数: microCMS / Google Maps / GA4 / FormSubmit /（必要なら）YouTube API を設定

---

## 6. まとめ

| 項目 | 推奨 | 理由 |
|------|------|------|
| API | 外部APIのみ（microCMS + 必要に応じて YouTube） | 自前バックエンド不要で仕様と一致し、開発・運用が軽い |
| DB | 置かない | 予約・問い合わせは既存サービスで完結。必要になったら contact_log / YouTube キャッシュ用を追加検討 |
| 料金・サイト・アクセス | コード内の定数または JSON | 更新頻度が低いため、現状はファイル管理で十分。将来CMS化は可能 |

この設計で進めれば、仕様を満たしつつ、将来の「問い合わせログ」「空き照会」などの拡張にも対応しやすいです。
