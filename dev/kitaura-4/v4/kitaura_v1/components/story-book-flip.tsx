"use client"

import { useState, useRef, useCallback } from "react"
import HTMLFlipBook from "react-pageflip"
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react"

interface StoryBookFlipProps {
  images: string[]
}

/** 全ページを data-density="hard" でハードめくりにする（背景はカードに合わせる） */
const PAGE_CLASS =
  "relative flex h-full w-full items-center justify-center overflow-hidden"

type FlipState = "user_fold" | "fold_corner" | "flipping" | "read"

export function StoryBookFlip({ images }: StoryBookFlipProps) {
  const bookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void; getCurrentPageIndex: () => number } }>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const count = images.length

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data)
  }, [])

  const onChangeState = useCallback((e: { data: FlipState }) => {
    setIsFlipping(e.data === "flipping")
  }, [])

  const goPrev = useCallback(() => {
    if (isFlipping) return
    bookRef.current?.pageFlip()?.flipPrev()
  }, [isFlipping])

  const goNext = useCallback(() => {
    if (isFlipping) return
    bookRef.current?.pageFlip()?.flipNext()
  }, [isFlipping])

  if (count === 0) return null

  return (
    <>
      <div className="mb-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFlipping}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-50"
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
          disabled={isFlipping}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-50"
          aria-label="次のページ"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      {/* 高さ固定でレイアウトシフト防止。タブレットでは 55vh 内に収めて見切れ防止 */}
      <div className="pet-rules-slider mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="pet-rules-slider__book-outer mx-auto w-full max-w-[480px]">
          <div className="pet-rules-slider__book-inner">
          <HTMLFlipBook
            ref={bookRef}
            width={400}
            height={284}
            size="fixed"
            minWidth={400}
            maxWidth={400}
            minHeight={284}
            maxHeight={284}
            showCover={false}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startPage={0}
            startZIndex={0}
            autoSize={false}
            maxShadowOpacity={0.35}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            renderOnlyPageLengthChange={true}
            onFlip={onFlip}
            onChangeState={onChangeState}
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
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement
                    el.style.display = "none"
                    const fallback = el.nextElementSibling as HTMLElement
                    if (fallback) {
                      fallback.hidden = false
                      fallback.style.display = "flex"
                    }
                  }}
                />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground"
                  style={{ display: "none" }}
                  hidden
                  aria-hidden
                >
                  <ImageOff className="h-12 w-12 shrink-0 opacity-50" />
                  <p className="text-sm">画像を読み込めません</p>
                  <p className="text-xs">
                    public/srory-book/絵本v3.0/ に画像を配置してください
                  </p>
                </div>
              </div>
            ))}
          </HTMLFlipBook>
          </div>
        </div>
      </div>
    </>
  )
}
