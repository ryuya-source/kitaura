import { PageLayout } from "@/components/layout"
import { Hero } from "@/components/hero"
import { PetSection } from "@/components/pet-section"
import { Features } from "@/components/features"
import { SiteTypes } from "@/components/site-types"
import { Pricing } from "@/components/pricing"
import { Rules } from "@/components/rules"
import { Access } from "@/components/access"
import { News } from "@/components/news"
import { getSiteImages } from "@/lib/list-public-images"

export default function HomePage() {
  const sites = getSiteImages()
  return (
    <PageLayout>
      <Hero />
      <SiteTypes sites={sites} />
      <Pricing />
      <Features />
      <PetSection />
      <Rules />
      <Access />
      <News />
    </PageLayout>
  )
}
