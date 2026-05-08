"use client"

import { useBookingModal } from "@/components/booking-modal-context"
import { Check } from "lucide-react"
import { Section } from "@/components/layout"
import { Container } from "@/components/layout"
import { SectionHeading } from "@/components/section-heading"

export function Pricing() {
  const { openBookingModal } = useBookingModal()
  return (
    <Section id="pricing" className="bg-secondary py-16 md:py-24">
      <Container>
        <SectionHeading label="PRICING" title="料金" />

        {/* Site Price Table */}
        <div className="mx-auto mt-12 max-w-3xl">
          <h3 className="mb-6 text-center text-lg font-semibold text-foreground">サイト別料金</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] overflow-hidden rounded-xl bg-card text-sm shadow-sm">
              <thead>
                <tr className="border-b border-border bg-primary/5">
                  <th className="px-4 py-4 text-left font-semibold text-foreground">項目</th>
                  <th className="px-4 py-4 text-center font-semibold text-foreground">サイト1</th>
                  <th className="px-4 py-4 text-center font-semibold text-foreground">サイト2</th>
                  <th className="px-4 py-4 text-center font-semibold text-foreground">サイト3</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-3.5 font-medium text-foreground">広さ</td>
                  <td className="px-4 py-3.5 text-center text-muted-foreground">{'8m × 15m'}</td>
                  <td className="px-4 py-3.5 text-center text-muted-foreground">{'11m × 13m'}</td>
                  <td className="px-4 py-3.5 text-center text-muted-foreground">{'12m × 9m'}</td>
                </tr>
                <tr className="border-b border-border bg-secondary/50">
                  <td className="px-4 py-3.5 font-medium text-foreground">定員</td>
                  <td className="px-4 py-3.5 text-center text-muted-foreground">5名</td>
                  <td className="px-4 py-3.5 text-center text-muted-foreground">5名</td>
                  <td className="px-4 py-3.5 text-center text-muted-foreground">3名</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3.5 font-medium text-foreground">電員容量</td>
                  <td className="px-4 py-3.5 text-center text-muted-foreground">15A</td>
                  <td className="px-4 py-3.5 text-center text-muted-foreground">15A</td>
                  <td className="px-4 py-3.5 text-center text-muted-foreground">20A</td>
                </tr>
                <tr className="border-b border-border bg-secondary/50">
                  <td className="px-4 py-3.5 font-medium text-foreground">平日料金</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-primary">{'¥6,500'}</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-primary">{'¥6,500'}</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-primary">{'¥7,000'}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3.5 font-medium text-foreground">土・日・祝・祝前日</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-accent">{'¥9,500'}</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-accent">{'¥9,500'}</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-accent">{'¥10,000'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-medium text-foreground">ハイシーズン</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-destructive">{'¥11,000'}</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-destructive">{'¥11,000'}</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-destructive">{'¥11,500'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {'※ハイシーズンはGW期間、7/20〜8/31の土曜、花火大会開催日、年末年始12/31〜1/2'}
          </p>
        </div>

        {/* Pet & Options */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-card p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">ペット料金・頭数制限</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-muted-foreground">{'基本料金：2頭まで無料'}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-muted-foreground">{'追加料金：3頭目以降は1頭につき＋500円'}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-muted-foreground">{'受入上限：最大4頭まで同伴可能'}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-card p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">オプション</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-muted-foreground">{'人数追加は+2,000円／1名（大人・子供・幼児共通）'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={openBookingModal}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            予約・空き確認
          </button>
        </div>
      </Container>
    </Section>
  )
}
