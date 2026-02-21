"use client"

import { useState, useMemo } from "react"
import { ChevronDown, Instagram } from "lucide-react"
import { Section } from "@/components/layout"
import { Container } from "@/components/layout"
import { SectionHeading } from "@/components/section-heading"

type Category = "お知らせ" | "NEWS" | "メディア"

interface NewsItem {
  date: string // YYYY-MM-DD（ソート用）
  dateLabel: string
  category: Category
  title: string
  body: React.ReactNode
  mediaMeta?: { label: string; stats: string }
}

const ALL_ITEMS: NewsItem[] = [
  {
    date: "2026-02-01",
    dateLabel: "2026年02月01日",
    category: "お知らせ",
    title: "第3回RVパークアワード10位に選ばれました",
    body: "全国のRVパークの認知拡大・ブランドアップ・活用・普及の拡大を目的に、1年に1度「あなたが最も素敵だと思うRVパークは？」のもと、一般ユーザーから投票を募り、高い評価を得たRVパークに対し、1～10位を発表・表彰をするのが「RVパークアワード」です。",
  },
  {
    date: "2026-01-25",
    dateLabel: "2026年01月25日",
    category: "お知らせ",
    title: "小鳥（オウム・インコ等）の同伴について",
    body: "これまで禁止としておりました小鳥の同伴が可能になりますが、以下の条件付きとなります。キャンピングカー利用の方のみ／2羽まで／必ずケージ内（放鳥不可）／鳴き声など周囲へのご配慮をお願いします。",
  },
  {
    date: "2026-01-01",
    dateLabel: "2026年01月01日",
    category: "メディア",
    title: "ARJべんちゃん",
    body: "キャンピングカーや車中泊情報を発信する「ARJべんちゃん」チャンネルにてご紹介いただきました。",
    mediaMeta: { label: "2024年12月20日掲載", stats: "0.2万回 2.1K" },
  },
  {
    date: "2025-08-15",
    dateLabel: "2025年08月15日",
    category: "メディア",
    title: "板倉 趣味チャンネル",
    body: "インパルスの板倉俊之さんのYouTubeチャンネルにて、当施設をご利用いただいた様子が公開されています。",
    mediaMeta: { label: "2025年7月25日投稿", stats: "54万回 4.7K" },
  },
]

const LATEST_COUNT = 5

function ArticleCard({ item }: { item: NewsItem }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="overflow-hidden rounded-xl bg-card shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-3 p-6 text-left transition-colors hover:bg-secondary/50"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <time className="text-xs text-muted-foreground">{item.dateLabel}</time>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {item.category}
            </span>
          </div>
          <h3 className="mt-2 text-base font-semibold text-foreground">{item.title}</h3>
        </div>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-border px-6 pb-6 pt-2">
          <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          {item.mediaMeta && (
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span>{item.mediaMeta.label}</span>
              <span>{item.mediaMeta.stats}</span>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

const ITEMS_PER_PAGE = 5

export function News() {
  const [currentPage, setCurrentPage] = useState(1)

  const latestItems = useMemo(
    () => [...ALL_ITEMS].sort((a, b) => (a.date > b.date ? -1 : 1)).slice(0, LATEST_COUNT),
    []
  )

  const totalPages = Math.ceil(latestItems.length / ITEMS_PER_PAGE)
  const currentItems = latestItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <Section id="news" className="bg-background py-16 md:py-24">
      <Container>
        <SectionHeading label="NEWS & MEDIA" title="お知らせ・メディア" />

        {/* お知らせ・メディアをまとめた最新5件ずつページ表示 */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
          {currentItems.map((item, index) => (
            <ArticleCard key={`${item.date}-${item.category}-${index}`} item={item} />
          ))}
        </div>

        {/* ページネーション */}
        {totalPages > 1 && (
        <div className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`min-w-[2rem] rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
                currentPage === page
                  ? "text-black"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={`ページ ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ))}
        </div>
        )}

        {/* Instagram */}
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <div className="rounded-xl bg-card p-6 shadow-sm md:p-8">
            <h3 className="mb-2 flex items-center justify-center gap-2 text-lg font-semibold text-foreground">
              <Instagram className="h-5 w-5 text-accent" />
              インスタグラム
            </h3>
            <p className="text-sm text-muted-foreground">@kitaura_lakeside_rvpark をフォロー</p>
          </div>
        </div>

      </Container>
    </Section>
  )
}
