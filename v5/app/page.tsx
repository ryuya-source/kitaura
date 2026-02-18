import { PageLayout } from "@/components/layout"
import { Hero } from "@/components/hero"
import { PetBanner } from "@/components/pet-banner"
import { Features } from "@/components/features"
import { SiteTypes } from "@/components/site-types"
import { Pricing } from "@/components/pricing"
import { Rules } from "@/components/rules"
import { Access } from "@/components/access"
import { News } from "@/components/news"

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <PetBanner />
      <Features />
      <SiteTypes />
      <Pricing />
      <Rules />
      <Access />
      <News />
    </PageLayout>
  )
}
