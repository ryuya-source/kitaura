"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

/**
 * vh 倍率ベースの定数（Pro Max = innerHeight 932px で従来の px 値と等価）
 * FIRST_LINE: 1行目がフェードインを始めるまでのスクロール量（vh 倍率）≈ 200px / 932px
 * LINE_FADE:  各行のフェードイン幅（vh 倍率）≈ [100, 1600, 1600]px / 932px
 * どの画面サイズでも viewport 高さに比例してスケールするため、体感が均一になる
 */
const FIRST_LINE_VH = 0.21
const LINE_FADE_VH = [0.11, 1.72, 1.72] as const
/** Sticky の親の高さ。この分スクロールする間、ヒーローが固定され次のセクションまで滞留する */
const HERO_SCROLL_HEIGHT = "510vh"

function lineOpacity(scrollY: number, index: number, vh: number): number {
  const firstLineOffset = FIRST_LINE_VH * vh
  const fadePx = LINE_FADE_VH.map((v) => v * vh)
  const rangeBefore = fadePx.slice(0, index).reduce((a, b) => a + b, 0)
  const start = firstLineOffset + rangeBefore
  const range = fadePx[index]
  return Math.min(1, Math.max(0, (scrollY - start) / range))
}

export function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [vh, setVh] = useState(0)

  useEffect(() => {
    function updateVh() {
      setVh(window.innerHeight)
    }
    updateVh()
    window.addEventListener("resize", updateVh)
    return () => window.removeEventListener("resize", updateVh)
  }, [])

  useEffect(() => {
    function update() {
      setScrollY(window.scrollY)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  const opacities = [0, 1, 2].map((i) => lineOpacity(scrollY, i, vh))
  const textVisible = opacities.some((o) => o > 0)

  return (
    <div className="relative" style={{ height: HERO_SCROLL_HEIGHT }}>
      {/* Sticky: このブロックが画面上に固定され、背景が「動いている間」テキストだけ固定してアニメーション */}
      <section className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[#3d5240]">
        {/* Background image - 北浦湖畔の夕景 */}
        <div className="absolute inset-0">
          <Image
            src="/hero-lakeside.avif"
            alt="北浦湖畔の夕景"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* 2行目表示タイミングで動画をフェードイン（GPU: opacity のみ） */}
        <div
          className="absolute inset-0 z-[1] transition-opacity duration-300 ease-out"
          style={{ opacity: opacities[1] }}
          aria-hidden={opacities[1] === 0}
        >
          <video
            src="/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover object-center"
            aria-hidden
          />
        </div>

        {/* GPU加速: opacity と transform のみ。1行ずつ順にフェードイン */}
        <div
          className="relative z-10 flex flex-col items-center gap-1 px-4 text-center"
          style={{ transform: "translateY(-8vh)" }}
          aria-hidden={!textVisible}
        >
          <p
            className="text-lg font-bold tracking-widest text-[#faf8f5]/90 transition-opacity duration-200 ease-out md:text-xl"
            style={{ opacity: opacities[0] }}
          >
            北浦湖畔にある小さな RVパーク
          </p>
          <p
            className="text-lg font-bold tracking-widest text-[#faf8f5]/90 transition-opacity duration-200 ease-out md:text-xl"
            style={{ opacity: opacities[1] }}
          >
            全区画専用サニタリー棟完備
          </p>
          <p
            className="text-lg font-bold tracking-widest text-[#faf8f5]/90 transition-opacity duration-200 ease-out md:text-xl"
            style={{ opacity: opacities[2] }}
          >
            プライベートに過ごす大人時間
          </p>
        </div>

        {/* Bottom curve */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full">
            <path d="M0 80V40C360 0 1080 0 1440 40V80H0Z" fill="var(--background)" />
          </svg>
        </div>
      </section>
    </div>
  )
}
