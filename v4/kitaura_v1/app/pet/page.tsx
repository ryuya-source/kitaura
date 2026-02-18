import type { Metadata } from "next"
import Link from "next/link"
import { PageLayout } from "@/components/layout"
import { Container } from "@/components/layout"
import { Section } from "@/components/layout"
import { PageHero } from "@/components/page-hero"
import { PageCta } from "@/components/page-cta"
import { SafeImage } from "@/components/safe-image"
import { Dog, ChevronLeft, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "犬種制限について | KITAURA LAKESIDE RV park",
  description: "入場可能なワンちゃんについて。アレルギー反応が出にくい環境を維持するため、抜け毛の少ないシングルコートの犬種に限定しています。",
}

const allowedBreeds = [
  { name: "プードル", desc: "スタンダード / ミディアム / トイ" },
  {
    name: "プードルミックス（○○プー）",
    desc: "※ 抜け毛が少ないなど、プードルの特徴を引き継いでいる場合",
  },
  { name: "ヨークシャーテリア", desc: null },
  { name: "ミニチュアシュナウザー", desc: null },
  { name: "ビションフリーゼ", desc: null },
  { name: "マルチーズ", desc: null },
  { name: "シーズー", desc: null },
  { name: "チャイニーズクレステッドドッグ", desc: null },
  { name: "オーストラリアン・ラブラドゥードル（AL）", desc: null },
]

export default function PetPage() {
  return (
    <PageLayout mainClassName="pt-16">
      <PageHero label="PET RULES" title="犬種制限について" icon={<Dog />} />

      <Section className="bg-background py-16 md:py-24">
        <Container size="narrow">
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            入場可能なワンちゃんについて
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            アレルギー反応が出にくい環境を維持するため、抜け毛の少ないシングルコートの犬種に限定しています。
          </p>

          <div className="mt-10">
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-primary">
              同伴可能な犬種
            </h3>
            <div className="flex flex-col gap-3">
              {allowedBreeds.map((breed) => (
                <div
                  key={breed.name}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <p className="font-medium text-foreground">{breed.name}</p>
                  {breed.desc && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {breed.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-secondary p-5">
            <p className="text-sm text-muted-foreground">
              {'詳しくは '}
              <Link
                href="/#rules"
                className="font-medium text-primary hover:underline"
              >
                利用規約・マナー
              </Link>
              {'をご確認ください'}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-secondary py-16 md:py-24">
        <Container size="narrow">
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            なぜ犬種制限があるのか
          </h2>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
              aria-label="前"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-muted-foreground">
              {'前 1 / 9 次'}
            </span>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
              aria-label="次"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl bg-card shadow-sm">
            <div className="aspect-[16/9] bg-muted">
              <SafeImage
                src="/placeholder.svg?height=500&width=900"
                alt="犬種制限の理由"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <PageCta />
    </PageLayout>
  )
}
