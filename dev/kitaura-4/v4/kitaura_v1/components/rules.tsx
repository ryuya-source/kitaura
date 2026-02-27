"use client"

import { useState } from "react"
import { Clock, Shield, Users, Dog, Bird, ChevronDown } from "lucide-react"
import { Section } from "@/components/layout"
import { Container } from "@/components/layout"
import { SectionHeading } from "@/components/section-heading"

interface AccordionItemProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

function AccordionItem({ title, icon, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="overflow-hidden rounded-xl bg-card shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-6 py-5 text-left transition-colors hover:bg-secondary/50"
        aria-expanded={open}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <span className="flex-1 text-base font-semibold text-foreground">{title}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="border-t border-border px-6 py-5">{children}</div>}
    </div>
  )
}

export function Rules() {
  return (
    <Section id="rules" className="bg-background py-16 md:py-24">
      <Container>
        <SectionHeading label="RULES & MANNERS" title="利用規約・マナー" />

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
          {/* Check-in / Cancellation / Disclaimer */}
          <AccordionItem
            title="予約・キャンセル・その他"
            icon={<Clock className="h-5 w-5" />}
          >
            <div className="flex flex-col gap-6">
              {/* Check-in/out */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">チェックイン・アウト</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-secondary p-4 text-center">
                    <span className="block text-xs font-medium tracking-wider text-primary">IN</span>
                    <span className="mt-1 block text-lg font-bold text-foreground">{'13:00 〜 17:00'}</span>
                  </div>
                  <div className="rounded-lg bg-secondary p-4 text-center">
                    <span className="block text-xs font-medium tracking-wider text-primary">OUT</span>
                    <span className="mt-1 block text-lg font-bold text-foreground">{'〜 10:00'}</span>
                  </div>
                </div>
              </div>

              {/* Cancel Policy */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">キャンセルポリシー</h4>
                <div className="overflow-hidden rounded-lg border border-border">
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <span className="text-sm text-muted-foreground">{'1日前 〜 3日前'}</span>
                    <span className="text-sm font-semibold text-accent">宿泊代の50%</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-muted-foreground">当日</span>
                    <span className="text-sm font-semibold text-destructive">宿泊代の100%</span>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">免責事項・環境について</h4>
                <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
                  <p>場内での事故、盗難、ペット間のトラブル等について、当施設は一切の責任を負いません。</p>
                  <p>ゴミはサイト内のゴミ置き場で分別回収しております。</p>
                  <p>買い物はセブンイレブン 鉾田梶山店（徒歩30秒）が便利です。</p>
                  <p>県道に隣接しているため、時間帯によっては車両の走行音が聞こえる場合がございます。</p>
                  <p>暴力団およびその関係者のご利用はお断りいたします。</p>
                </div>
              </div>
            </div>
          </AccordionItem>

          {/* Basic Rules */}
          <AccordionItem
            title="基本ルール・禁止事項"
            icon={<Shield className="h-5 w-5" />}
          >
            <ul className="flex flex-col gap-4">
              <li>
                <p className="text-sm font-semibold text-foreground">{'クワイエットタイム：21:00 〜 翌7:00'}</p>
                <p className="mt-1 text-sm text-muted-foreground">話し声や生活音が隣のサイトに漏れないようご配慮ください</p>
              </li>
              <li>
                <p className="text-sm font-semibold text-foreground">直火禁止（焚き火台・焚き火シート必須）</p>
                <p className="mt-1 text-sm text-muted-foreground">床は指定の灰捨て場へ処理をお願いします</p>
              </li>
              <li>
                <p className="text-sm font-semibold text-foreground">騒音・音響の制限</p>
                <p className="mt-1 text-sm text-muted-foreground">音楽は隣のサイトに聞こえない音量で。アイドリング禁止。</p>
              </li>
              <li>
                <p className="text-sm font-semibold text-foreground">喫煙はご自身のサイト内のみ</p>
              </li>
              <li>
                <p className="text-sm font-semibold text-foreground">サッカーやフリスビー等、飛んでいく遊具の使用禁止</p>
              </li>
            </ul>
          </AccordionItem>

          {/* Group Rules */}
          <AccordionItem
            title="グループ利用の制限"
            icon={<Users className="h-5 w-5" />}
          >
            <ul className="flex flex-col gap-4">
              <li>
                <p className="text-sm font-semibold text-foreground">グループ利用不可</p>
                <p className="mt-1 text-sm text-muted-foreground">複数サイト予約、代表者名を変えての予約、現地での合流行為は一切禁止</p>
              </li>
              <li>
                <p className="text-sm font-semibold text-foreground">予約頻度の制限</p>
                <p className="mt-1 text-sm text-muted-foreground">土曜・祝日のご予約は、1組につき「月に1回まで」（連泊除く）</p>
              </li>
            </ul>
          </AccordionItem>

          {/* Pet Rules */}
          <AccordionItem
            title="ペット同伴規約"
            icon={<Dog className="h-5 w-5" />}
          >
            <div>
              <p className="mb-4 text-sm text-muted-foreground">愛犬と安心してお過ごしいただくため、マナーの遵守をお願いいたします。</p>
              <ul className="flex flex-col gap-4">
                <li>
                  <p className="text-sm font-semibold text-foreground">サイト外はリード着用</p>
                  <p className="mt-1 text-sm text-muted-foreground">犬が苦手な方もいらっしゃるため、サイト外はノーリード禁止といたします。共有スペースではリードは2m以内でお願いいたします。</p>
                </li>
                <li>
                  <p className="text-sm font-semibold text-foreground">噛みつき・破壊癖・常識の範囲を超えた無駄吠えがある場合はご利用いただけません。</p>
                </li>
                <li>
                  <p className="text-sm font-semibold text-foreground">制限外の動物の持ち込み禁止</p>
                  <p className="mt-1 text-sm text-muted-foreground">発覚した場合は、返金なしで即時退場とさせていただきます。</p>
                </li>
              </ul>
              <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
                ペット同士のトラブルについて、施設側は責任を負いかねます。
              </p>
            </div>
          </AccordionItem>


          {/* Birds */}
          <AccordionItem
            title="小鳥（オウム・インコ）の同伴について"
            icon={<Bird className="h-5 w-5" />}
          >
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{'✓'}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">キャンピングカー利用の方のみ<br />テント泊での同伴はできません</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{'✓'}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">2羽まで</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{'✓'}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">必ずケージ内でお過ごしください（放鳥不可）</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{'✓'}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">鳴き声など、周囲へのご配慮をお願いします</span>
              </li>
            </ul>
          </AccordionItem>
        </div>
      </Container>
    </Section>
  )
}
