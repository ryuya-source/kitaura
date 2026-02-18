"use client"

import { useEffect, useMemo, useState } from "react"

interface SafeImageProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  width?: number
  height?: number
  /** 参照: kitauralakeside-rvpark-newsite pet page と同様に lazy 指定可能 */
  loading?: "lazy" | "eager"
}

/**
 * プリレンダ時に Event handler を渡さないためのクライアント用 img ラッパー。
 * Next.js の静的エクスポートで onError が渡るとビルドエラーになるため使用。
 */
export function SafeImage({ src, alt, fallbackSrc, className, width, height, loading }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [failed, setFailed] = useState(false)
  const [visible, setVisible] = useState(true)

  // カルーセルなどで src が切り替わったときに表示を更新する（表示もリセット）
  useEffect(() => {
    setCurrentSrc(src)
    setFailed(false)
    setVisible(true)
  }, [src])

  const normalizedFallback = useMemo(() => {
    if (!fallbackSrc) return undefined
    return fallbackSrc === src ? undefined : fallbackSrc
  }, [fallbackSrc, src])

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      style={{ display: visible ? undefined : "none" }}
      onError={() => {
        if (!failed && normalizedFallback) {
          setFailed(true)
          setCurrentSrc(normalizedFallback)
          return
        }
        setVisible(false)
      }}
    />
  )
}
