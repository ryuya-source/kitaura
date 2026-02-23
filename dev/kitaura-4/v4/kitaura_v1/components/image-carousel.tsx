"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SafeImage } from "@/components/safe-image"

const SWIPE_THRESHOLD = 50

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
  /** 下部のドットインジケーターを表示するか（省略時は true） */
  showDots?: boolean
  /** img の loading（参照: newsite pet と同様 lazy 指定） */
  imageLoading?: "lazy" | "eager"
  /** true のとき、表示中画像のアスペクト比に合わせて枠の高さを可変にする */
  variableAspect?: boolean
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
  showDots = true,
  imageLoading,
  variableAspect = false,
}: ImageCarouselProps) {
  const imageCount = images.length
  const [internalCurrent, setInternalCurrent] = useState(0)
  const isControlled = controlledCurrent !== undefined && onCurrentChange != null
  const current = isControlled ? controlledCurrent : internalCurrent
  const setCurrent = isControlled
    ? (fn: (prev: number) => number) => onCurrentChange(fn(controlledCurrent))
    : setInternalCurrent

  const [aspectRatio, setAspectRatio] = useState<{ w: number; h: number } | null>(null)
  const touchStartX = useRef<number | null>(null)

  const handleNaturalSize = useCallback((w: number, h: number) => {
    setAspectRatio({ w, h })
  }, [])

  useEffect(() => {
    if (variableAspect) setAspectRatio(null)
  }, [variableAspect, current])

  // 前後の画像をプリロード: 常に3枚（prev, current, next）をDOMに置き、next/image に読ませておく
  const prevIdx = (current - 1 + imageCount) % imageCount
  const nextIdx = (current + 1) % imageCount

  const goPrev = () => setCurrent((prev) => (prev === 0 ? imageCount - 1 : prev - 1))
  const goNext = () => setCurrent((prev) => (prev === imageCount - 1 ? 0 : prev + 1))

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }, [])

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current == null) return
      const endX = e.changedTouches[0].clientX
      const deltaX = endX - touchStartX.current
      touchStartX.current = null
      if (deltaX > SWIPE_THRESHOLD) goPrev()
      else if (deltaX < -SWIPE_THRESHOLD) goNext()
    },
    [goPrev, goNext]
  )

  if (imageCount === 0) return null

  const containerStyle =
    variableAspect
      ? { aspectRatio: aspectRatio ? `${aspectRatio.w} / ${aspectRatio.h}` : "4/3" }
      : undefined
  const containerAspectClass = variableAspect ? "" : "aspect-[4/3]"

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
    <div
      className={cn("relative overflow-hidden bg-secondary touch-pan-y", containerAspectClass, className)}
      style={containerStyle}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* 前・現在・次の3枚を常にDOMに置いてプリロードし、表示は current のみ */}
      {[prevIdx, current, nextIdx].map((idx, slot) => (
        <div
          key={`${slot}-${idx}`}
          className={cn(
            "absolute inset-0",
            slot === 1 ? "z-10" : "z-0 opacity-0 pointer-events-none"
          )}
          aria-hidden={slot !== 1}
        >
          <SafeImage
            src={images[idx]}
            fallbackSrc={fallbackImages?.[idx]}
            alt={`${altPrefix} ${idx + 1}`}
            className={cn("h-full w-full object-cover", imageClassName)}
            loading={slot === 1 ? imageLoading : "lazy"}
            onNaturalSize={slot === 1 && variableAspect ? handleNaturalSize : undefined}
          />
        </div>
      ))}

      <div className="absolute inset-0 z-20 flex items-center justify-between px-3" style={{ pointerEvents: "none" }}>
        <button
          type="button"
          onClick={goPrev}
          style={{ pointerEvents: "auto" }}
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
          style={{ pointerEvents: "auto" }}
        >
          <ChevronRight className="h-4 w-4 text-foreground" />
        </button>
      </div>

      {showDots && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5" style={{ pointerEvents: "none" }}>
          {Array.from({ length: imageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(() => i)}
              style={{ pointerEvents: "auto" }}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === current ? "w-6 bg-card" : "w-1.5 bg-card/50"
              )}
              aria-label={`写真 ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

