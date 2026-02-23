"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import HTMLFlipBook from "react-pageflip"
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react"

interface StoryBookFlipProps {
  images: string[]
  /** 親で「犬種制限について」セクションに到達した」と検知した場合に true。渡されると全ページを読み込む */
  sectionInView?: boolean
}

/** 全ページを data-density="hard" でハードめくりにする（背景はカードに合わせる） */
const PAGE_CLASS =
  "relative flex h-full w-full items-center justify-center overflow-hidden"

type FlipState = "user_fold" | "fold_corner" | "flipping" | "read"

export function StoryBookFlip({ images, sectionInView }: StoryBookFlipProps) {
  const bookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void; getCurrentPageIndex: () => number } }>(null)
  const bookWrapRef = useRef<HTMLDivElement | null>(null)
  const didPreloadRef = useRef(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [bookWidth, setBookWidth] = useState(320)
  /** viewport に入ったら true。全ページ分の画像を読み込む（カルーセルと同様） */
  const [loadAllImages, setLoadAllImages] = useState(false)
  const count = images.length

  const bookHeight = Math.round(bookWidth * (1240 / 1748))

  useEffect(() => {
    const el = bookWrapRef.current
    if (!el) return

    const update = () => {
      const w = Math.floor(el.clientWidth)
      if (!w) return
      const next = Math.max(1, Math.min(400, w))
      setBookWidth((prev) => (prev === next ? prev : next))
    }

    update()

    const ro = new ResizeObserver(() => update())
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // 親から sectionInView が渡されていないときだけ、絵本本体が viewport に入ったら全ページ読み込み
  useEffect(() => {
    if (sectionInView !== undefined) return
    const el = bookWrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setLoadAllImages(true)
      },
      { rootMargin: "100px", threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [sectionInView])

  // 「犬種制限について」セクション到達（または絵本が viewport 進入）で全ページをプリロードする
  useEffect(() => {
    const effectiveInView = sectionInView ?? loadAllImages
    if (!effectiveInView) return
    if (didPreloadRef.current) return
    if (typeof window === "undefined") return

    didPreloadRef.current = true
    for (const src of images) {
      const img = new window.Image()
      img.decoding = "async"
      img.src = src
    }
  }, [sectionInView, loadAllImages, images])

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
      {/* 根本対応: 親の幅に合わせて FlipBook 自体の width/height を可変にする（見切れ防止） */}
      <div className="pet-rules-slider mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-sm px-2 py-3 md:px-0 md:py-0">
        <div ref={bookWrapRef} className="mx-auto w-full max-w-[400px]">
          <HTMLFlipBook
            key={`${bookWidth}x${bookHeight}`}
            ref={bookRef}
            width={bookWidth}
            height={bookHeight}
            size="fixed"
            minWidth={bookWidth}
            maxWidth={bookWidth}
            minHeight={bookHeight}
            maxHeight={bookHeight}
            showCover={false}
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
            renderOnlyPageLengthChange={true}
            onFlip={onFlip}
            onChangeState={onChangeState}
            className="mx-auto"
            style={{}}
          >
            {images.map((src, index) => {
              return (
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
                  className="h-full w-full object-contain object-center"
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
              )
            })}
          </HTMLFlipBook>
        </div>
      </div>
    </>
  )
}
