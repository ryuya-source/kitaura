"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ImageCarousel } from "@/components/image-carousel"

interface StoryBookCarouselProps {
  images: string[]
}

export function StoryBookCarousel({ images }: StoryBookCarouselProps) {
  const [current, setCurrent] = useState(0)
  const count = images.length

  if (count === 0) return null

  const goPrev = () => setCurrent((prev) => (prev === 0 ? count - 1 : prev - 1))
  const goNext = () => setCurrent((prev) => (prev === count - 1 ? 0 : prev + 1))

  return (
    <>
      <div className="mb-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          aria-label="前"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm text-muted-foreground">
          前 {current + 1} / {count} 次
        </span>
        <button
          type="button"
          onClick={goNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          aria-label="次"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      {/* 参照: newsite pet (68-80) と同様 — スライダーラッパー・loading lazy・onError で非表示 */}
      <div className="pet-rules-slider mx-auto w-full max-w-5xl overflow-hidden rounded-xl bg-card shadow-sm">
        <ImageCarousel
          images={images}
          altPrefix="犬種制限の説明"
          className="aspect-[1748/1240] rounded-xl"
          imageClassName="pet-rules-slider__img object-cover object-center"
          imageLoading="lazy"
          current={current}
          onCurrentChange={setCurrent}
        />
      </div>
    </>
  )
}
