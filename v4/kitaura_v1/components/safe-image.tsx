"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"

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
 * next/image を使い WebP/AVIF 等で最適化配信。フォールバック付き。
 * カルーセル用（src 切り替え・onError で fallback 表示）。
 */
export function SafeImage({ src, alt, fallbackSrc, className, width, height, loading }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [failed, setFailed] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setCurrentSrc(src)
    setFailed(false)
    setVisible(true)
  }, [src])

  const normalizedFallback = useMemo(() => {
    if (!fallbackSrc) return undefined
    return fallbackSrc === src ? undefined : fallbackSrc
  }, [fallbackSrc, src])

  if (!visible) return null

  const useFill = width == null && height == null

  return (
    <Image
      src={currentSrc}
      alt={alt}
      {...(useFill
        ? { fill: true, sizes: "(max-width: 768px) 100vw, 50vw" }
        : { width: width!, height: height! })}
      className={className}
      loading={loading}
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
