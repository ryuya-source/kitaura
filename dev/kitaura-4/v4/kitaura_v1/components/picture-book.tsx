"use client"

import { useState, useRef, useCallback } from "react"
import HTMLFlipBook from "react-pageflip"
import { ChevronLeft, ChevronRight } from "lucide-react"

// 0P: 表紙（ハード）, 1P-2P: 見開き, 3P-4P: 見開き, 5P: 裏表紙（ハード）
const PAGE_LIST = [
  { id: "cover", density: "hard" as const, content: "表紙" },
  { id: "p1", density: "soft" as const, content: "1P" },
  { id: "p2", density: "soft" as const, content: "2P" },
  { id: "p3", density: "soft" as const, content: "3P" },
  { id: "p4", density: "soft" as const, content: "4P" },
  { id: "back", density: "hard" as const, content: "裏表紙" },
]

const PAGE_STYLE =
  "flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#faf8f5] via-[#f5f2ed] to-[#ebe6df] p-6 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),2px_2px_8px_rgba(0,0,0,0.06)]"

export function PictureBook() {
  const [currentPage, setCurrentPage] = useState(0)
  const bookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void; getCurrentPageIndex: () => number } }>(null)
  const totalPages = PAGE_LIST.length

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data)
  }, [])

  const goPrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev()
  }, [])

  const goNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext()
  }, [])

  return (
    <div className="mx-auto max-w-4xl">
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
          {currentPage + 1} / {totalPages}
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

      <div className="flex justify-center" style={{ minHeight: 360 }}>
        <HTMLFlipBook
          ref={bookRef}
          width={320}
          height={440}
          size="stretch"
          minWidth={260}
          maxWidth={400}
          minHeight={360}
          maxHeight={560}
          showCover={true}
          drawShadow={true}
          flippingTime={500}
          usePortrait={true}
          startPage={0}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={1}
          mobileScrollSupport={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          onFlip={onFlip}
          className="mx-auto"
        >
          {PAGE_LIST.map((page, index) => (
            <div
              key={page.id}
              data-density={page.density}
              className={PAGE_STYLE}
              style={{ width: "100%", height: "100%" }}
            >
              <span className="text-center font-medium text-muted-foreground">
                {page.content}
              </span>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  )
}
