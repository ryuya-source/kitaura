import type { Metadata } from "next"
import Link from "next/link"
import { PageLayout } from "@/components/layout"
import { Container } from "@/components/layout"
import { Section } from "@/components/layout"
import { PageCta } from "@/components/page-cta"
import { StoryBookCarousel } from "@/components/story-book-carousel"

export const metadata: Metadata = {
  title: "犬種制限について | KITAURA LAKESIDE RV park",
  description: "入場可能なワンちゃんについて。アレルギー反応が出にくい環境を維持するため、抜け毛の少ないシングルコートの犬種に限定しています。",
}

const storyBookImages = Array.from(
  { length: 10 },
  (_, i) => `/srory-book/${i + 1}.png`
)

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
    <PageLayout>
      <Section className="bg-background pt-8 pb-16 md:pt-12 md:pb-24">
        <Container size="narrow">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium tracking-widest text-primary">PET RULES</p>
            <h1 className="mt-2 font-sans text-3xl font-bold text-foreground md:text-5xl">
              犬種制限について
            </h1>
          </div>
          <h2 className="font-sans text-2xl font-bold text-foreground md:text-3xl">
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
          <div className="mt-8 flex justify-center">
            <img
              src="/dogs-illustration.png"
              alt="多様な犬種のイラスト"
              className="max-h-48 w-auto object-contain md:max-h-64"
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-secondary py-16 md:py-24">
        <Container size="narrow">
          <h2 className="py-12 text-center font-sans text-2xl font-bold text-foreground md:py-16 md:text-3xl">
            なぜ犬種制限があるのか
          </h2>
          <div className="mt-8">
            <StoryBookCarousel images={storyBookImages} />
          </div>
        </Container>
      </Section>

      <PageCta showCta={false} />
    </PageLayout>
  )
}
