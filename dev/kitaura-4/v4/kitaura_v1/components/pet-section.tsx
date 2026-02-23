"use client"

import Link from "next/link"
import Image from "next/image"
import { Section } from "@/components/layout"
import { Container } from "@/components/layout"
import { StoryBookFlip } from "@/components/story-book-flip"

/** 犬種制限についての絵本 — 表紙(00.avif) + 1.avif ～ 10.avif を番号順に表示 */
const STORY_BOOK_BASE = "/srory-book"
const STORY_BOOK_V3 = "/srory-book/絵本v3.0"
const storyBookImages = [
  `${STORY_BOOK_V3}/00.avif`,
  `${STORY_BOOK_BASE}/1.avif`,
  `${STORY_BOOK_BASE}/2.avif`,
  `${STORY_BOOK_BASE}/3.avif`,
  `${STORY_BOOK_BASE}/4.avif`,
  `${STORY_BOOK_BASE}/5.avif`,
  `${STORY_BOOK_BASE}/6.avif`,
  `${STORY_BOOK_BASE}/7.avif`,
  `${STORY_BOOK_BASE}/8.avif`,
  `${STORY_BOOK_BASE}/9.avif`,
  `${STORY_BOOK_BASE}/10.avif`,
]

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

/** ルートページ用：ペットページの内容をそのまま表示（犬種制限についてセクション） */
export function PetSection() {
  return (
    <>
      <Section id="pet" className="-mt-px border-t-0 bg-background py-16 md:py-24">
        <Container size="narrow">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium tracking-widest text-primary">PET RULES</p>
            <div className="mt-2 flex items-center justify-center gap-3 md:gap-6">
              <Image
                src="/dog-kezukuroi.avif"
                alt=""
                width={56}
                height={72}
                className="h-12 w-auto object-contain md:h-14"
              />
              <h2 className="font-sans text-3xl font-bold text-foreground md:text-5xl">
                犬種制限について
              </h2>
              <Image
                src="/dog-kezukuroi.avif"
                alt=""
                width={56}
                height={72}
                className="h-12 w-auto scale-x-[-1] object-contain md:h-14"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              場内ルールをご案内しております。
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl bg-card shadow-sm">
            <div className="flex flex-col gap-8 px-6 py-5">
                <div>
                  <div className="text-center">
                    <h3 className="font-sans text-xl font-bold text-foreground md:text-2xl">
                      入場可能なワンちゃんについて
                    </h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      アレルギー反応が出にくい環境を維持するため、抜け毛の少ないシングルコートの犬種に限定しています。
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <h4 className="text-sm font-semibold tracking-wider text-primary">
                        同伴可能な犬種
                      </h4>
                      <div className="flex shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/dog-breed-card.png"
                          alt="同伴可能な犬種のイラスト"
                          className="h-16 w-auto object-contain md:h-20"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {allowedBreeds.map((breed) => (
                        <div
                          key={breed.name}
                          className="rounded-lg border border-border bg-secondary/50 p-4"
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
                  <div className="mt-6 rounded-lg bg-secondary p-5">
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
                  <div className="mt-6 flex justify-center">
                    <Image
                      src="/dogs-illustration.avif"
                      alt="多様な犬種のイラスト"
                      width={320}
                      height={240}
                      className="max-h-48 w-auto object-contain md:max-h-64"
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-8">
                  <h3 className="text-center font-sans text-xl font-bold text-foreground md:text-2xl">
                    なぜ犬種制限があるのか
                  </h3>
                  <div className="mt-6">
                    <StoryBookFlip images={storyBookImages} />
                  </div>
                </div>
              </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
