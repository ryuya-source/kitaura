"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SWIPE_THRESHOLD = 50

interface VideoCarouselProps {
  videos: string[]
  className?: string
  /** 枠のアスペクト比（省略時 9/16） */
  aspectRatio?: "9/16" | "4/3"
}

export function VideoCarousel({
  videos,
  className,
  aspectRatio = "9/16",
}: VideoCarouselProps) {
  const count = videos.length
  const [current, setCurrent] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const touchStartX = useRef<number | null>(null)

  // ビューポートに入ったら再生、外れたら一時停止
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setIsInView(entry.isIntersecting)
      },
      { rootMargin: "0px", threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const goPrev = useCallback(
    () => setCurrent((prev) => (prev === 0 ? count - 1 : prev - 1)),
    [count]
  )
  const goNext = useCallback(
    () => setCurrent((prev) => (prev === count - 1 ? 0 : prev + 1)),
    [count]
  )

  // 表示中かつビューポート内の動画だけ再生、他は一時停止
  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return
      if (i === current && isInView) {
        el.play().catch(() => {})
      } else {
        el.pause()
      }
    })
  }, [current, isInView])

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

  if (count === 0) return null

  const aspectClass = aspectRatio === "9/16" ? "[aspect-ratio:9/16]" : "aspect-[4/3]"

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden rounded-xl bg-muted", aspectClass, className)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {videos.map((src, idx) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0",
            idx === current ? "z-10" : "z-0 opacity-0 pointer-events-none"
          )}
          aria-hidden={idx !== current}
        >
          <video
            ref={(el) => {
              videoRefs.current[idx] = el
            }}
            src={src}
            className="h-full w-full object-cover"
            playsInline
            muted
            loop
            aria-label={`周辺環境の動画 ${idx + 1}`}
          />
        </div>
      ))}

      <div className="absolute inset-0 z-20 flex items-center justify-between px-3" style={{ pointerEvents: "none" }}>
        <button
          type="button"
          onClick={goPrev}
          style={{ pointerEvents: "auto" }}
          className="rounded-full bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card"
          aria-label="前の動画"
        >
          <ChevronLeft className="h-4 w-4 text-foreground" />
        </button>
        <button
          type="button"
          onClick={goNext}
          style={{ pointerEvents: "auto" }}
          className="rounded-full bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card"
          aria-label="次の動画"
        >
          <ChevronRight className="h-4 w-4 text-foreground" />
        </button>
      </div>

      {count > 1 && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5" style={{ pointerEvents: "none" }}>
          {videos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              style={{ pointerEvents: "auto" }}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === current ? "w-6 bg-card" : "w-1.5 bg-card/50"
              )}
              aria-label={`動画 ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
