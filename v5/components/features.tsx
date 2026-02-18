import { Droplets, Dog } from "lucide-react"
import { Section } from "@/components/layout"
import { Container } from "@/components/layout"
import { SectionHeading } from "@/components/section-heading"

export function Features() {
  return (
    <Section id="features" className="bg-secondary py-16 md:py-24">
      <Container>
        <SectionHeading label="FEATURES" title="こだわりポイント" />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Water Facilities */}
          <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
            <div className="p-6 md:p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                <Droplets className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">水回り</span>
              </div>
              <h3 className="text-xl font-bold text-foreground md:text-2xl">
                全サイト水回り・電源完備
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                トイレ・シャワー・炊事場・電源完備
              </p>
            </div>
            <div className="grid grid-cols-4 gap-1 px-1 pb-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-lg bg-secondary">
                  <img
                    src={`/placeholder.svg?height=200&width=200`}
                    alt={`水回り設備写真 ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Small Dogs */}
          <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
            <div className="p-6 md:p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5">
                <Dog className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent">小型犬</span>
              </div>
              <h3 className="text-xl font-bold text-foreground md:text-2xl">
                小型犬対応
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-1 px-1 pb-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-lg bg-secondary">
                  <img
                    src={`/placeholder.svg?height=200&width=200`}
                    alt={`小型犬写真 ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
