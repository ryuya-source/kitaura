"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const sites = [
  { name: "サイト1", images: 11 },
  { name: "サイト2", images: 11 },
  { name: "サイト3", images: 11 },
]

function SiteCarousel({ name, imageCount }: { name: string; imageCount: number }) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={`/placeholder.svg?height=400&width=600`}
          alt={`${name} 写真 ${current + 1}`}
          className="h-full w-full object-cover"
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
        <p className="mt-1 text-sm text-muted-foreground">
          {`写真が${imageCount}枚表示`}
        </p>
      </div>
    </div>
  )
}

import { Section } from "@/components/layout"
import { Container } from "@/components/layout"
import { SectionHeading } from "@/components/section-heading"

export function SiteTypes() {
  return (
    <Section id="sites" className="bg-background py-16 md:py-24">
      <Container>
        <SectionHeading label="SITE TYPES" title="サイト種別" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {sites.map((site) => (
            <SiteCarousel key={site.name} name={site.name} imageCount={site.images} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
