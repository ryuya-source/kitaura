"use client"

import { useState } from "react"
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
  const src = imageUrls?.[current] ?? `/placeholder.svg?height=400&width=600`
  const alt = `${name} 写真 ${current + 1}`

  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <button
            onClick={() => setCurrent((prev) => (prev === 0 ? imageCount - 1 : prev - 1))}
            className="rounded-full bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card"
            aria-label="前の写真"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>
          <button
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
              onClick={() => setCurrent(i)}
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
        <SectionHeading label="SITE TYPES" title="サイト種別" />

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
