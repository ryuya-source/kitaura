"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SafeImage } from "@/components/safe-image"

interface ImageCarouselProps {
  images: string[]
  fallbackImages?: string[]
  altPrefix: string
  className?: string
}

export function ImageCarousel({ images, fallbackImages, altPrefix, className }: ImageCarouselProps) {
  const imageCount = images.length
  const [current, setCurrent] = useState(0)

  if (imageCount === 0) return null

  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden bg-secondary", className)}>
      <SafeImage
        src={images[current]}
        fallbackSrc={fallbackImages?.[current]}
        alt={`${altPrefix} ${current + 1}`}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-between px-3">
        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev === 0 ? imageCount - 1 : prev - 1))}
          className="rounded-full bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card"
          aria-label="前の写真"
        >
          <ChevronLeft className="h-4 w-4 text-foreground" />
        </button>
        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev === imageCount - 1 ? 0 : prev + 1))}
          className="rounded-full bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card"
          aria-label="次の写真"
        >
          <ChevronRight className="h-4 w-4 text-foreground" />
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {Array.from({ length: imageCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === current ? "w-6 bg-card" : "w-1.5 bg-card/50"
            )}
            aria-label={`写真 ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

