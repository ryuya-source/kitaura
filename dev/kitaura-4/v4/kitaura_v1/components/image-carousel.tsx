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
  /** サイト案内と同一仕様: 画像上に前後ボタン＋下部ドットインジケーター */
  variant?: "default" | "site"
  /** 制御用: 現在のインデックス（showCounter で外に出す場合などに親で state を渡す） */
  current?: number
  /** 制御用: インデックス変更時のコールバック */
  onCurrentChange?: (index: number) => void
  /** 画像に渡す className（例: object-contain で切り抜けず表示） */
  imageClassName?: string
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
  variant = "default",
  current: controlledCurrent,
  onCurrentChange,
  imageClassName,
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
  const containerRef = useRef<HTMLDivElement>(null)
  /** 表示するスロット (0=前, 1=中央, 2=次)。全枚読み込み前の次/前用 */
  const [visibleSlot, setVisibleSlot] = useState<0 | 1 | 2>(1)
  /** viewport に入ったら true。そのカルーセル分の全画像を読み込む */
  const [loadAllImages, setLoadAllImages] = useState(false)

  const handleNaturalSize = useCallback((w: number, h: number) => {
    setAspectRatio({ w, h })
  }, [])

  useEffect(() => {
    if (variableAspect) setAspectRatio(null)
  }, [variableAspect, current])

  // カルーセルが viewport に入ったら全枚読み込みに切り替え
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoadAllImages(true)
        }
      },
      { rootMargin: "100px", threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const prevIdx = (current - 1 + imageCount) % imageCount
  const nextIdx = (current + 1) % imageCount

  // 全枚読み込み前のみ: visibleSlot が 0 or 2 のとき、current 更新後に visibleSlot=1 に戻す
  useEffect(() => {
    if (!loadAllImages && visibleSlot !== 1) {
      const id = requestAnimationFrame(() => {
        if (visibleSlot === 2) {
          setCurrent((prev) => (prev === imageCount - 1 ? 0 : prev + 1))
        } else {
          setCurrent((prev) => (prev === 0 ? imageCount - 1 : prev - 1))
        }
        setVisibleSlot(1)
      })
      return () => cancelAnimationFrame(id)
    }
  }, [loadAllImages, visibleSlot, imageCount])

  const goPrev = () =>
    loadAllImages
      ? setCurrent((prev) => (prev === 0 ? imageCount - 1 : prev - 1))
      : setVisibleSlot(0)
  const goNext = () =>
    loadAllImages
      ? setCurrent((prev) => (prev === imageCount - 1 ? 0 : prev + 1))
      : setVisibleSlot(2)

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
      ref={containerRef}
      className={cn("relative overflow-hidden bg-secondary touch-pan-y", containerAspectClass, className)}
      style={containerStyle}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {loadAllImages ? (
        /* viewport に入った後: 全枚をDOMに置き、current のみ表示。横スクロールは即時 */
        Array.from({ length: imageCount }).map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0",
              idx === current ? "z-10" : "z-0 opacity-0 pointer-events-none"
            )}
            aria-hidden={idx !== current}
          >
            <SafeImage
              src={images[idx]}
              fallbackSrc={fallbackImages?.[idx]}
              alt={`${altPrefix} ${idx + 1}`}
              className={cn("h-full w-full object-cover", imageClassName)}
              loading="lazy"
              onNaturalSize={idx === current && variableAspect ? handleNaturalSize : undefined}
            />
          </div>
        ))
      ) : (
        /* 初期: 3枚だけ（prev, current, next）。viewport に入るまで節約 */
        [prevIdx, current, nextIdx].map((idx, slot) => (
          <div
            key={`${slot}-${idx}`}
            className={cn(
              "absolute inset-0",
              slot === visibleSlot ? "z-10" : "z-0 opacity-0 pointer-events-none"
            )}
            aria-hidden={slot !== visibleSlot}
          >
            <SafeImage
              src={images[idx]}
              fallbackSrc={fallbackImages?.[idx]}
              alt={`${altPrefix} ${idx + 1}`}
              className={cn("h-full w-full object-cover", imageClassName)}
              loading={slot === visibleSlot ? imageLoading : "lazy"}
              onNaturalSize={slot === visibleSlot && variableAspect ? handleNaturalSize : undefined}
            />
          </div>
        ))
      )}

      {variant === "site" && (
        <>
          <div className="absolute inset-0 z-20 flex items-center justify-between px-3 pointer-events-none [&>button]:pointer-events-auto">
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
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 pointer-events-none [&>button]:pointer-events-auto">
            {Array.from({ length: imageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setCurrent(() => i)
                  if (!loadAllImages) setVisibleSlot(1)
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-6 bg-card" : "w-1.5 bg-card/50"
                }`}
                aria-label={`写真 ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  )
}

