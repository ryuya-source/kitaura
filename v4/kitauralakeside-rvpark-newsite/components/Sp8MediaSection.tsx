"use client";

import { useState } from "react";
import {
  ChevronDown,
  Megaphone,
  Camera,
  Eye,
  ThumbsUp,
  Instagram,
} from "lucide-react";
import InstagramEmbeds from "@/components/InstagramEmbeds";

type TabName = "news" | "media" | "notice";

const NOTICE_ITEMS = [
  {
    id: "sp8-notice-body-1",
    date: "2026年02月01日",
    title: "RV協会の全国アンケートで10位に選ばれました",
    body: (
      <>
        <h4>お知らせ</h4>
        <p>〇〇ランキングにて当施設が全国10位に選出されました。</p>
        <div className="sp8-media__acc-note">※本文は仮テキストです（Pencilの内容に合わせて差し替えできます）</div>
      </>
    ),
  },
  {
    id: "sp8-notice-body-2",
    date: "2026年01月25日",
    title: "小鳥（オウム・インコ等）の同伴について",
    body: (
      <>
        <h4>お知らせ</h4>
        <p>これまで禁止としておりました小鳥の同伴が可能になりますが、以下の条件付きとなります。</p>
        <p>キャンピングカー利用の方のみ／1羽まで／必ずケージ内（放鳥不可）／鳴き声など周囲へのご配慮をお願いします。</p>
      </>
    ),
  },
];

const MEDIA_ITEMS = [
  {
    id: "sp8-media-body-itakura",
    date: "2026年01月01日",
    title: "ARJべんちゃん",
    desc: "キャンピングカーや車中泊情報を発信する「ARJべんちゃん」チャンネルにてご紹介いただきました。",
    metaDate: "2024年12月20日掲載",
    views: "0.2万回",
    likes: "2.1K",
  },
  {
    id: "sp8-media-body-arj",
    date: "2025年08月15日",
    title: "板倉 趣味チャンネル",
    desc: "インパルスの板倉俊之さんのYouTubeチャンネルにて、当施設をご利用いただいた様子が公開されています。",
    metaDate: "2025年7月25日投稿",
    views: "54万回",
    likes: "4.7K",
  },
];

// 実際に埋め込みたい Instagram 投稿URL をここに追加（公開投稿のみ表示されます）
const INSTAGRAM_PERMALINKS: string[] = [
  // 例: "https://www.instagram.com/p/POST_SHORTCODE/",
  // 例: "https://www.instagram.com/reel/REEL_SHORTCODE/",
];

export default function Sp8MediaSection() {
  const [tab, setTab] = useState<TabName>("news");
  const [noticeOpenIds, setNoticeOpenIds] = useState<Set<string>>(() => new Set());
  const [mediaOpenIds, setMediaOpenIds] = useState<Set<string>>(() => new Set());

  const showNotice = tab === "news" || tab === "notice";
  const showMedia = tab === "news" || tab === "media";

  return (
    <section className="sp8-media" id="news">
      <div className="sp8-media__page">
        <h1 className="sp8-media__title">お知らせ・メディア</h1>
        <div className="sp8-media__tab-bar" role="tablist" aria-label="News・メディア・お知らせ">
          {(["news", "media", "notice"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              data-tab={t}
              className={`sp8-media__tab ${tab === t ? "is-active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t === "news" ? "News" : t === "media" ? "メディア" : "お知らせ"}
            </button>
          ))}
        </div>

        {/* お知らせ（News と お知らせで表示） */}
        {showNotice && (
          <section
            className="sp8-media__content is-active"
            data-panels="news notice"
          >
            {NOTICE_ITEMS.map((item) => (
              (() => {
                const isOpen = noticeOpenIds.has(item.id);
                return (
              <div
                key={item.id}
                className={`sp8-media__accordion ${isOpen ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="sp8-media__acc-head"
                  aria-expanded={isOpen}
                  aria-controls={item.id}
                  onClick={() => {
                    setNoticeOpenIds((prev) => {
                      const next = new Set(prev);
                      if (next.has(item.id)) next.delete(item.id);
                      else next.add(item.id);
                      return next;
                    });
                  }}
                >
                  <div className="sp8-media__acc-left">
                    <span className="sp8-media__date-icon">
                      <Megaphone size={12} strokeWidth={2} />
                    </span>
                    <span className="sp8-media__date">{item.date}</span>
                    <div className="sp8-media__acc-title">{item.title}</div>
                  </div>
                  <span className="sp8-media__chevron">
                    <ChevronDown size={9} strokeWidth={2} />
                  </span>
                </button>
                <div id={item.id} className="sp8-media__acc-body" hidden={!isOpen}>
                  {item.body}
                </div>
              </div>
                );
              })()
            ))}
          </section>
        )}

        {/* メディアカード（News と メディアで表示） */}
        {showMedia && (
          <section
            className="sp8-media__content is-active"
            data-panels="news media"
          >
            <div className="sp8-media__media-list">
              {MEDIA_ITEMS.map((item) => (
                (() => {
                  const isOpen = mediaOpenIds.has(item.id);
                  return (
                <div
                  key={item.id}
                  className={`sp8-media__media-card ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="sp8-media__media-head"
                    aria-expanded={isOpen}
                    aria-controls={item.id}
                    onClick={() => {
                      setMediaOpenIds((prev) => {
                        const next = new Set(prev);
                        if (next.has(item.id)) next.delete(item.id);
                        else next.add(item.id);
                        return next;
                      });
                    }}
                  >
                    <div className="sp8-media__media-head-left">
                      <span className="sp8-media__yt-icon">
                        <Camera size={12} strokeWidth={2} />
                      </span>
                      <span className="sp8-media__media-date">{item.date}</span>
                      <div className="sp8-media__media-title">{item.title}</div>
                    </div>
                    <span className="sp8-media__chevron">
                      <ChevronDown size={9} strokeWidth={2} />
                    </span>
                  </button>
                  <div id={item.id} className="sp8-media__media-body" hidden={!isOpen}>
                    <p className="sp8-media__media-desc">{item.desc}</p>
                    <div className="sp8-media__date-meta-row">
                      <span className="sp8-media__media-date">{item.metaDate}</span>
                      <span className="sp8-media__meta-item">
                        <span className="sp8-media__meta-icon"><Eye size={9} strokeWidth={2} /></span>
                        {item.views}
                      </span>
                      <span className="sp8-media__meta-item">
                        <span className="sp8-media__meta-icon"><ThumbsUp size={9} strokeWidth={2} /></span>
                        {item.likes}
                      </span>
                    </div>
                  </div>
                </div>
                  );
                })()
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="sp8-media__section-title">インスタグラム</h2>
          {INSTAGRAM_PERMALINKS.length ? (
            <InstagramEmbeds permalinks={INSTAGRAM_PERMALINKS} className="sp8-media__insta-grid" />
          ) : (
            <div className="sp8-media__insta-grid" aria-label="Instagram埋め込み（URL未設定）">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="sp8-media__insta-thumb" />
              ))}
            </div>
          )}
          <div className="sp8-media__follow">
            <span className="sp8-media__ig">
              <Instagram size={9} strokeWidth={2} />
            </span>
            <span>@kitaura_lakeside_rvpark をフォロー</span>
          </div>
        </section>
      </div>
    </section>
  );
}
