"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import HTMLFlipBook from "react-pageflip"
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

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
  /** 拡大表示するページのインデックス。null のときモーダル非表示 */
  const [zoomIndex, setZoomIndex] = useState<number | null>(null)
  /** モーダル用 FlipBook: 開いた瞬間の開始ページ（startPage はマウント時のみ効く） */
  const [modalStartPage, setModalStartPage] = useState(0)
  /** モーダル用 FlipBook の幅（ResizeObserver で更新） */
  const [modalBookWidth, setModalBookWidth] = useState(() => {
    if (typeof window === "undefined") return 320
    const isMd = window.matchMedia("(min-width: 768px)").matches
    return isMd
      ? Math.min(600, Math.max(250, window.innerWidth - 32))
      : Math.max(250, window.innerWidth - 16)
  })
  /** モーダル内めくり中はボタン無効 */
  const [isModalFlipping, setIsModalFlipping] = useState(false)
  const count = images.length

  const modalWrapRef = useRef<HTMLDivElement | null>(null)
  const modalBookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void } }>(null)

  const bookHeight = Math.round(bookWidth * (1240 / 1748))
  const modalBookHeight = Math.round(modalBookWidth * (1240 / 1748))

  useEffect(() => {
    const el = bookWrapRef.current
    if (!el) return

    const update = () => {
      const w = Math.floor(el.clientWidth)
      if (!w) return

      const isMd =
        typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches

      let next: number
      if (isMd) {
        // タブレット・PC: 幅はカード幅まで(768)、縦は見切れないよう maxHeight で制限
        const maxHeightPx = Math.min(window.innerHeight * 0.7, 600)
        const widthByHeight = Math.floor(maxHeightPx * (1748 / 1240))
        next = Math.max(1, Math.min(768, w, widthByHeight))
      } else {
        // スマホ: 現状どおり 400 まで
        next = Math.max(1, Math.min(400, w))
      }

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

  const prevZoomIndexRef = useRef<number | null>(null)
  useEffect(() => {
    const wasClosed = prevZoomIndexRef.current === null
    if (zoomIndex !== null && wasClosed) setModalStartPage(zoomIndex)
    prevZoomIndexRef.current = zoomIndex
  }, [zoomIndex])

  useEffect(() => {
    if (zoomIndex === null) return
    const el = modalWrapRef.current
    if (!el) return
    const update = () => {
      const w = Math.floor(el.clientWidth)
      const isMd =
        typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
      const fallbackW =
        typeof window !== "undefined"
          ? isMd
            ? Math.min(600, Math.max(280, (window.innerWidth ?? 393) - 32))
            : Math.max(280, (window.innerWidth ?? 393) - 16)
          : 360
      const effectiveW = w > 0 ? w : fallbackW
      setModalBookWidth((prev) => {
        const maxW = isMd ? 1200 : (window.innerWidth ?? 393)
        if (!isMd && typeof window !== "undefined") {
          const vh = window.innerHeight ?? 852
          const dialogMaxH = vh * 0.70
          const dialogPadding = 16
          const navRow = 48
          const safeArea = 34
          const availableH = dialogMaxH - dialogPadding - navRow - safeArea
          const maxWByHeight = Math.floor(availableH * (1748 / 1240))
          const viewportMaxW = Math.max(280, (window.innerWidth ?? 393) - 16)
          const capped = Math.max(250, Math.min(maxW, maxWByHeight, effectiveW, viewportMaxW))
          return prev === capped ? prev : capped
        }
        const next = Math.max(280, Math.min(maxW, effectiveW))
        return prev === next ? prev : next
      })
    }
    update()
    const raf = requestAnimationFrame(() => update())
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [zoomIndex])

  const goPrevModal = useCallback(() => {
    if (zoomIndex === null || isModalFlipping) return
    modalBookRef.current?.pageFlip()?.flipPrev()
  }, [zoomIndex, isModalFlipping])

  const goNextModal = useCallback(() => {
    if (zoomIndex === null || isModalFlipping) return
    modalBookRef.current?.pageFlip()?.flipNext()
  }, [zoomIndex, isModalFlipping])

  const onModalFlip = useCallback((e: { data: number }) => {
    setZoomIndex(e.data)
    setModalStartPage(e.data)
  }, [])

  const handleZoomModalKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goPrevModal()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        goNextModal()
      }
    },
    [goPrevModal, goNextModal]
  )

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
      {/* タブレット・PC: カード内カルーセル幅(max-w-3xl)に合わせて縦見切れ防止 */}
      <div className="pet-rules-slider mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-sm px-2 py-3 md:max-w-3xl md:px-0 md:py-0">
        <div ref={bookWrapRef} className="mx-auto w-full max-w-[400px] md:max-w-none">
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
                  className="h-full w-full cursor-pointer object-contain object-center"
                  loading="lazy"
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (typeof window !== "undefined" && !window.matchMedia("(min-width: 768px)").matches) {
                      setZoomIndex(index)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      e.stopPropagation()
                      if (typeof window !== "undefined" && !window.matchMedia("(min-width: 768px)").matches) {
                        setZoomIndex(index)
                      }
                    }
                  }}
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
      <Dialog open={zoomIndex !== null} onOpenChange={(open) => !open && setZoomIndex(null)}>
        <DialogContent
          className="!max-w-full !w-full !h-auto !max-h-[70dvh] !rounded-none !border-0 !p-2 overflow-hidden md:!rounded-lg md:!border md:!p-4 md:!max-h-[85vh] md:!max-w-[80vw] md:!w-auto"
          onKeyDown={handleZoomModalKeyDown}
        >
          <DialogTitle className="sr-only">絵本を拡大表示</DialogTitle>
          {zoomIndex !== null && (
            <>
              <div className="flex flex-col items-center gap-3">
                <div className="flex w-full max-w-lg shrink-0 items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={goPrevModal}
                    disabled={zoomIndex <= 0 || isModalFlipping}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-50"
                    aria-label="前のページ"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="min-w-[4rem] text-center text-sm text-muted-foreground">
                    {zoomIndex + 1} / {count}
                  </span>
                  <button
                    type="button"
                    onClick={goNextModal}
                    disabled={zoomIndex >= count - 1 || isModalFlipping}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-50"
                    aria-label="次のページ"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <div ref={modalWrapRef} className="mx-auto w-full overflow-hidden md:max-w-[80vw]">
                  <HTMLFlipBook
                    key={`modal-${modalBookWidth}x${modalBookHeight}`}
                    ref={modalBookRef}
                    width={modalBookWidth}
                    height={modalBookHeight}
                    size="fixed"
                    minWidth={modalBookWidth}
                    maxWidth={modalBookWidth}
                    minHeight={modalBookHeight}
                    maxHeight={modalBookHeight}
                    showCover={false}
                    drawShadow={true}
                    flippingTime={1000}
                    usePortrait={true}
                    startPage={modalStartPage}
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
                    onFlip={onModalFlip}
                    onChangeState={(e: { data: FlipState }) => setIsModalFlipping(e.data === "flipping")}
                    className="mx-auto"
                    style={{}}
                  >
                    {images.map((src, index) => (
                      <div
                        key={`modal-page-${index}`}
                        data-density="hard"
                        className={PAGE_CLASS}
                        style={{ width: "100%", height: "100%" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`犬種制限の説明（拡大） ${index + 1}`}
                          className="h-full w-full object-contain object-center"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </HTMLFlipBook>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
