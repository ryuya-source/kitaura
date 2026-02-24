"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

/** スクロール量（px）で opacity 0→1。大きいほどゆっくりフェードイン */
const FADE_RANGE_PX = 680
/** Sticky の親の高さ。この分スクロールする間、ヒーローが固定され次のセクションまで滞留する */
const HERO_SCROLL_HEIGHT = "280vh"

export function Hero() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    function update() {
      const y = window.scrollY
      setOpacity(Math.min(1, y / FADE_RANGE_PX))
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  const textVisible = opacity > 0

  return (
    <div className="relative" style={{ height: HERO_SCROLL_HEIGHT }}>
      {/* Sticky: このブロックが画面上に固定され、背景が「動いている間」テキストだけ固定してアニメーション */}
      <section className="sticky top-0 flex h-[90vh] items-center justify-center overflow-hidden bg-[#3d5240]">
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

        {/* GPU加速: opacity と transform のみ使用 */}
        <div
          className="relative z-10 flex flex-col items-center gap-1 px-4 text-center transition-opacity duration-150 ease-out"
          style={{
            opacity,
            transform: "translateY(-8vh)",
          }}
          aria-hidden={!textVisible}
        >
          <p className="text-lg font-bold tracking-widest text-[#faf8f5]/90 md:text-xl">
            北浦湖畔にある小さな RVパーク
          </p>
          <p className="text-lg font-bold tracking-widest text-[#faf8f5]/90 md:text-xl">
            全区画専用サニタリー棟完備
          </p>
          <p className="text-lg font-bold tracking-widest text-[#faf8f5]/90 md:text-xl">
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
