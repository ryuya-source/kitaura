import { PageLayout } from "@/components/layout"
import { Hero } from "@/components/hero"
import { PetSection } from "@/components/pet-section"
import { Features } from "@/components/features"
import { SiteTypes } from "@/components/site-types"
import { Pricing } from "@/components/pricing"
import { Rules } from "@/components/rules"
import { Access } from "@/components/access"
import { News } from "@/components/news"
import { getSiteImages, listPublicImages } from "@/lib/list-public-images"

/** サイト案内・絵本などの画像をフォルダの内容で毎回取得するため動的生成 */
export const dynamic = "force-dynamic"

export default function HomePage() {
  const sites = getSiteImages()
  const storyBookImages = listPublicImages("srory-book/絵本v3.0", {
    cacheBust: true,
    extensions: ["avif", "png", "jpg", "jpeg"],
    sortNumeric: true,
  })
  return (
    <PageLayout>
      <Hero />
      <SiteTypes sites={sites} />
      <Pricing />
      <Features />
      <PetSection storyBookImages={storyBookImages} />
      <Rules />
      <Access />
      <News />
    </PageLayout>
  )
}
