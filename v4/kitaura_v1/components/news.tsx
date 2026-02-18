"use client"

import { useState } from "react"
import Link from "next/link"
import { Newspaper, Video, Instagram } from "lucide-react"
import { Section } from "@/components/layout"
import { Container } from "@/components/layout"
import { SectionHeading } from "@/components/section-heading"

type Tab = "news" | "media"

export function News() {
  const [tab, setTab] = useState<Tab>("news")

  return (
    <Section id="news" className="bg-background py-16 md:py-24">
      <Container>
        <SectionHeading label="NEWS & MEDIA" title="お知らせ・メディア" />

        {/* Tabs */}
        <div className="mx-auto mt-10 flex max-w-xs gap-2 rounded-lg bg-secondary p-1">
          <button
            onClick={() => setTab("news")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === "news"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Newspaper className="h-4 w-4" />
            お知らせ
          </button>
          <button
            onClick={() => setTab("media")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === "media"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Video className="h-4 w-4" />
            メディア
          </button>
        </div>

        {/* News Tab */}
        {tab === "news" && (
          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4">
            <article className="rounded-xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <time className="text-xs text-muted-foreground">2026年02月01日</time>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">お知らせ</span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-foreground">
                RV協会の全国アンケートで10位に選ばれました
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                〇〇ランキングにて当施設が全国10位に選出されました。
                {'※本文は仮テキストです（Pencilの内容に合わせて差し替えできます）'}
              </p>
            </article>

            <article className="rounded-xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <time className="text-xs text-muted-foreground">2026年01月25日</time>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">お知らせ</span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-foreground">
                小鳥（オウム・インコ等）の同伴について
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {'これまで禁止としておりました小鳥の同伴が可能になりますが、以下の条件付きとなります。'}
                <br />
                {'キャンピングカー利用の方のみ／1羽まで／必ずケージ内（放鳥不可）／鳴き声など周囲へのご配慮をお願いします。'}
              </p>
            </article>
          </div>
        )}

        {/* Media Tab */}
        {tab === "media" && (
          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4">
            <article className="rounded-xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <time className="text-xs text-muted-foreground">2026年01月01日</time>
              </div>
              <h3 className="mt-2 text-base font-semibold text-foreground">ARJべんちゃん</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                キャンピングカーや車中泊情報を発信する「ARJべんちゃん」チャンネルにてご紹介いただきました。
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span>2024年12月20日掲載</span>
                <span>0.2万回</span>
                <span>2.1K</span>
              </div>
            </article>

            <article className="rounded-xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <time className="text-xs text-muted-foreground">2025年08月15日</time>
              </div>
              <h3 className="mt-2 text-base font-semibold text-foreground">板倉 趣味チャンネル</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                インパルスの板倉俊之さんのYouTubeチャンネルにて、当施設をご利用いただいた様子が公開されています。
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span>2025年7月25日投稿</span>
                <span>54万回</span>
                <span>4.7K</span>
              </div>
            </article>
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

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            予約・空き確認
          </Link>
        </div>
      </Container>
    </Section>
  )
}
