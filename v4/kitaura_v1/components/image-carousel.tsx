"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SafeImage } from "@/components/safe-image"

interface ImageCarouselProps {
  images: string[]
  fallbackImages?: string[]
  altPrefix: string
  className?: string
  /** 画像の上に「前 1 / 10 次」のカウンター行を表示する */
  showCounter?: boolean
  /** 制御用: 現在のインデックス（showCounter で外に出す場合などに親で state を渡す） */
  current?: number
  /** 制御用: インデックス変更時のコールバック */
  onCurrentChange?: (index: number) => void
  /** 画像に渡す className（例: object-contain で切り抜けず表示） */
  imageClassName?: string
}

export function ImageCarousel({
  images,
  fallbackImages,
  altPrefix,
  className,
  showCounter,
  current: controlledCurrent,
  onCurrentChange,
  imageClassName,
}: ImageCarouselProps) {
  const imageCount = images.length
  const [internalCurrent, setInternalCurrent] = useState(0)
  const isControlled = controlledCurrent !== undefined && onCurrentChange != null
  const current = isControlled ? controlledCurrent : internalCurrent
  const setCurrent = isControlled
    ? (fn: (prev: number) => number) => onCurrentChange(fn(controlledCurrent))
    : setInternalCurrent

  if (imageCount === 0) return null

  const goPrev = () => setCurrent((prev) => (prev === 0 ? imageCount - 1 : prev - 1))
  const goNext = () => setCurrent((prev) => (prev === imageCount - 1 ? 0 : prev + 1))

  return (
    <div>
      {showCounter && (
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
            前 {current + 1} / {imageCount} 次
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
      )}
    <div className={cn("relative aspect-[4/3] overflow-hidden bg-secondary", className)}>
      <SafeImage
        key={current}
        src={images[current]}
        fallbackSrc={fallbackImages?.[current]}
        alt={`${altPrefix} ${current + 1}`}
        className={cn("h-full w-full object-cover", imageClassName)}
      />

      <div className="absolute inset-0 flex items-center justify-between px-3">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-full bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card"
          aria-label="前の写真"
        >
          <ChevronLeft className="h-4 w-4 text-foreground" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="rounded-full bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card"
          aria-label="次の写真"
        >
          <ChevronRight className="h-4 w-4 text-foreground" />
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {Array.from({ length: imageCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(() => i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === current ? "w-6 bg-card" : "w-1.5 bg-card/50"
            )}
            aria-label={`写真 ${i + 1}`}
          />
        ))}
      </div>
    </div>
    </div>
  )
}

