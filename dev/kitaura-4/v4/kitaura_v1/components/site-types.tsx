"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

type SiteData = { name: string; imageUrls: string[]; imageCount: number }

function SiteCarousel({
  name,
  imageCount,
  imageUrls,
}: {
  name: string
  imageCount: number
  imageUrls?: string[]
}) {
  const [current, setCurrent] = useState(0)
  /** 表示するスロット (0=前, 1=中央, 2=次)。次/前押下時は既に描画済みのスロットを即表示して白フラッシュを防ぐ */
  const [visibleSlot, setVisibleSlot] = useState<0 | 1 | 2>(1)
  const urls = imageUrls ?? []
  const prevIdx = imageCount > 0 ? (current - 1 + imageCount) % imageCount : 0
  const nextIdx = imageCount > 0 ? (current + 1) % imageCount : 0

  useEffect(() => {
    if (visibleSlot !== 1) {
      const id = requestAnimationFrame(() => {
        if (visibleSlot === 2) {
          setCurrent((prev) => (prev === imageCount - 1 ? 0 : prev + 1))
        } else {
          setCurrent((prev) => (prev === 0 ? imageCount - 1 : prev - 1))
        }
        setVisibleSlot(1)
      })
      return () => cancelAnimationFrame(id)
    }
  }, [visibleSlot, imageCount])

  const showSlot = imageCount > 0 ? visibleSlot : 0
  const isVisible = (slot: number) => (imageCount > 0 && slot === showSlot) || (imageCount === 0 && slot === 0)

  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {(imageCount > 0 ? [prevIdx, current, nextIdx] : [0]).map((idx, slot) => {
          const src = urls[idx] ?? `/placeholder.svg?height=400&width=600`
          return (
            <div
              key={`${slot}-${idx}`}
              className={
                isVisible(slot)
                  ? "absolute inset-0 z-10"
                  : "absolute inset-0 z-0 opacity-0 pointer-events-none"
              }
              aria-hidden={!isVisible(slot)}
            >
              <Image
                src={src}
                alt={`${name} 写真 ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading={isVisible(slot) ? undefined : "lazy"}
              />
            </div>
          )
        })}
        <div className="absolute inset-0 z-20 flex items-center justify-between px-3">
          <button
            onClick={() => setVisibleSlot(0)}
            className="rounded-full bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card"
            aria-label="前の写真"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>
          <button
            onClick={() => setVisibleSlot(2)}
            className="rounded-full bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card"
            aria-label="次の写真"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </button>
        </div>
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {Array.from({ length: imageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i)
                setVisibleSlot(1)
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "w-6 bg-card" : "w-1.5 bg-card/50"
              }`}
              aria-label={`写真 ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-foreground">{name}</h3>
      </div>
    </div>
  )
}

import { Section } from "@/components/layout"
import { Container } from "@/components/layout"
import { SectionHeading } from "@/components/section-heading"

export function SiteTypes({ sites }: { sites: SiteData[] }) {
  return (
    <Section id="sites" className="bg-background py-16 md:py-24">
      <Container>
        <SectionHeading label="SITE TYPES" title="サイト案内" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {sites.map((site) => (
            <SiteCarousel
              key={site.name}
              name={site.name}
              imageCount={site.imageCount}
              imageUrls={site.imageUrls}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
