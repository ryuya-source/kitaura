"use client"

import { useMemo, useState } from "react"

interface SafeImageProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  width?: number
  height?: number
}

/**
 * プリレンダ時に Event handler を渡さないためのクライアント用 img ラッパー。
 * Next.js の静的エクスポートで onError が渡るとビルドエラーになるため使用。
 */
export function SafeImage({ src, alt, fallbackSrc, className, width, height }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [failed, setFailed] = useState(false)

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
      onError={(e) => {
        if (!failed && normalizedFallback) {
          setFailed(true)
          setCurrentSrc(normalizedFallback)
          return
        }
        e.currentTarget.style.display = "none"
      }}
    />
  )
}
