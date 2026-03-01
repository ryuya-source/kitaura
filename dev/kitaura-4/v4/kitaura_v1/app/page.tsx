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

/** 60秒ごとに再生成（画像追加後も1分以内に反映、キャッシュが効くためTTFB改善） */
export const revalidate = 60

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
