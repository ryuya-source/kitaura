"use client"

import { useState, useRef, useCallback } from "react"
import HTMLFlipBook from "react-pageflip"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface StoryBookFlipProps {
  images: string[]
}

/** 全ページを data-density="hard" でハードめくりにする */
const PAGE_CLASS =
  "flex h-full w-full items-center justify-center bg-[#ede9e3] overflow-hidden"

export function StoryBookFlip({ images }: StoryBookFlipProps) {
  const bookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void; getCurrentPageIndex: () => number } }>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const count = images.length

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data)
  }, [])

  const goPrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev("bottom")
  }, [])

  const goNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext("bottom")
  }, [])

  if (count === 0) return null

  return (
    <>
      <div className="mb-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          aria-label="前のページ"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm text-muted-foreground">
          前 {currentPage + 1} / {count} 次
        </span>
        <button
          type="button"
          onClick={goNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          aria-label="次のページ"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="pet-rules-slider mx-auto w-full max-w-5xl overflow-hidden rounded-xl bg-card shadow-sm">
        <div className="min-h-[280px] w-full" style={{ aspectRatio: "1748 / 1240" }}>
          <HTMLFlipBook
            ref={bookRef}
            width={400}
            height={Math.round(400 * (1240 / 1748))}
            size="stretch"
            minWidth={280}
            maxWidth={600}
            minHeight={Math.round(280 * (1240 / 1748))}
            maxHeight={Math.round(600 * (1240 / 1748))}
            showCover={true}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startPage={0}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.35}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            onFlip={onFlip}
            className="mx-auto"
            style={{}}
          >
            {images.map((src, index) => (
              <div
                key={`page-${index}`}
                data-density="hard"
                className={PAGE_CLASS}
                style={{ width: "100%", height: "100%" }}
              >
                {/* react-pageflip が DOM を直接操作するため、next/image だと removeChild で競合するため img を使用 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`犬種制限の説明 ${index + 1}`}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement
                    if (el?.parentElement) el.parentElement.style.display = "none"
                  }}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>
    </>
  )
}
