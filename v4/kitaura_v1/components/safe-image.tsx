"use client"

interface SafeImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

/**
 * プリレンダ時に Event handler を渡さないためのクライアント用 img ラッパー。
 * Next.js の静的エクスポートで onError が渡るとビルドエラーになるため使用。
 */
export function SafeImage({ src, alt, className, width, height }: SafeImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={(e) => {
        const target = e.currentTarget
        target.style.display = "none"
      }}
    />
  )
}
