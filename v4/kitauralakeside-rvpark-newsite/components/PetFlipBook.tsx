"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  className?: string;
};

export default function PetFlipBook({ className }: Props) {
  const bookRef = useRef<HTMLDivElement | null>(null);
  const pageFlipRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pages = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const n = String(i + 1).padStart(2, "0");
        return `/src/dog_breeds/slide_${n}.png`;
      }),
    []
  );

  useEffect(() => {
    let destroyed = false;

    async function init() {
      if (!bookRef.current) return;

      // Avoid duplicate init in strict mode/dev
      if (pageFlipRef.current) return;

      const mod: any = await import("page-flip");
      const PageFlip = mod.PageFlip ?? mod.default?.PageFlip ?? mod.default;
      if (!PageFlip) return;

      const el = bookRef.current;
      const pf = new PageFlip(el, {
        width: 276,
        height: 191,
        size: "stretch",
        minWidth: 240,
        maxWidth: 1100,
        minHeight: 166,
        maxHeight: 800,
        autoSize: true,
        usePortrait: true,
        mobileScrollSupport: true,
        showCover: false,
        drawShadow: true,
        flippingTime: 700,
      });

      pageFlipRef.current = pf;

      // HTMLモード：画像が未配置でもUIが壊れない
      const nodes = el.querySelectorAll(".pet-flipbook__page");
      pf.loadFromHTML(nodes);

      pf.on("flip", (e: any) => {
        if (destroyed) return;
        const idx = typeof e?.data === "number" ? e.data : 0;
        setCurrentPage(Math.min(pages.length, Math.max(1, idx + 1)));
      });

      // 初期表示
      setCurrentPage(1);
    }

    init();

    return () => {
      destroyed = true;
      try {
        pageFlipRef.current?.destroy?.();
      } catch {
        // ignore
      } finally {
        pageFlipRef.current = null;
      }
    };
  }, [pages.length]);

  const total = pages.length;

  return (
    <>
      <div className={`pet-rules-slider ${className ?? ""}`.trim()}>
        <div ref={bookRef} className="pet-flipbook" aria-label="犬種制限スライダー">
          {pages.map((src, i) => (
            <div key={src} className="pet-flipbook__page" data-density="soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="pet-flipbook__img"
                src={src}
                alt={`犬種制限の説明 ${i + 1} / ${total}`}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pet-rules-pagination" role="group" aria-label="スライダー操作">
        <button
          type="button"
          className="pet-rules-pagination__btn"
          aria-label="前へ"
          onClick={() => pageFlipRef.current?.flipPrev?.()}
        >
          前
        </button>
        <span className="pet-rules-pagination__info">
          {currentPage} / {total}
        </span>
        <button
          type="button"
          className="pet-rules-pagination__btn"
          aria-label="次へ"
          onClick={() => pageFlipRef.current?.flipNext?.()}
        >
          次
        </button>
      </div>
    </>
  );
}

