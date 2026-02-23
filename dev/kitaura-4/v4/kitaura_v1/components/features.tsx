import fs from "node:fs"
import path from "node:path"
import Image from "next/image"
import { Droplets, Dog, MapPin, Settings } from "lucide-react"
import { ImageCarousel } from "@/components/image-carousel"
import { Section } from "@/components/layout"
import { Container } from "@/components/layout"
import { SectionHeading } from "@/components/section-heading"
import { WaterFacilitiesAccordion } from "@/components/water-facilities-accordion"

function listPublicImages(
  relativeDir: string,
  options?: { cacheBust?: boolean; extensions?: string[] }
) {
  const dirPath = path.join(process.cwd(), "public", ...relativeDir.split("/"))
  if (!fs.existsSync(dirPath)) return []
  const exts = options?.extensions ?? ["avif"]
  const pattern = new RegExp(`\\.(${exts.join("|")})$`, "i")

  return fs
    .readdirSync(dirPath)
    .filter((name) => pattern.test(name))
    .sort((a, b) => a.localeCompare(b, "ja"))
    .map((name) => {
      const base = `/${relativeDir}/${name}`
      if (options?.cacheBust) {
        try {
          const stat = fs.statSync(path.join(dirPath, name))
          return `${base}?v=${Math.floor(stat.mtimeMs)}`
        } catch {
          return base
        }
      }
      return base
    })
}

const scannedWatterImages = listPublicImages("features/watter")
const watterImages =
  scannedWatterImages.length > 0
    ? scannedWatterImages
    : Array.from(
        { length: 10 },
        (_, i) => `/features/watter/watter-${String(i + 1).padStart(2, "0")}.avif`
      )

// その他（ゴミ置き場・コードリール・エアコン等）— public/features/3-els の画像を使用（.avif / .png 対応、差し替え時にキャッシュを避けるため cacheBust 有効）
const scannedOtherImages = listPublicImages("features/3-els", {
  cacheBust: true,
  extensions: ["avif", "png"],
})
const otherImages =
  scannedOtherImages.length > 0
    ? scannedOtherImages
    : [
        "/features/3-els/01.png",
        "/features/3-els/02.png",
        "/features/3-els/03.png",
        "/features/3-els/04.png",
        "/features/3-els/05.png",
      ]

// 周辺環境：public/features/4_nearby 内の画像を自動読込（フォルダに追加すればUIに反映）
const scannedSurroundingsImages = listPublicImages("features/4_nearby")
const surroundingsImages =
  scannedSurroundingsImages.length > 0
    ? scannedSurroundingsImages
    : ["/hero-lakeside.avif", "/pet-with-dog.avif", "/small-dog-01.avif"]

// 超小型犬：public/features/small-dog 内の画像を自動読込（フォルダに追加すればUIに反映）
const scannedSmallDogImages = listPublicImages("features/small-dog", {
  extensions: ["avif", "png", "jpg", "webp"],
})
const smallDogImages =
  scannedSmallDogImages.length > 0
    ? scannedSmallDogImages
    : Array.from(
        { length: 7 },
        (_, i) => `/features/small-dog/small-dog-${String(i + 1).padStart(2, "0")}.avif`
      )
const smallDogFallbackImages = Array.from(
  { length: 7 },
  (_, i) => `/small-dog-${String(i + 1).padStart(2, "0")}.avif`
)

export function Features() {
  return (
    <Section id="features" className="bg-secondary py-16 md:py-24">
      <Container>
        <SectionHeading label="FEATURES" title="こだわりポイント" />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Water Facilities */}
          <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
            <div className="p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                  <Droplets className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground md:text-2xl">
                  各サイト水回り・電源完備
                </h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                トイレ・シャワー・炊事場・電源完備
              </p>
              <WaterFacilitiesAccordion />
            </div>
            <div className="px-1 pb-1">
              <ImageCarousel
                images={watterImages}
                altPrefix="水回り設備写真"
                className="overflow-hidden rounded-xl"
              />
            </div>
          </div>

          {/* Small Dogs */}
          <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
            <div className="p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5">
                  <Dog className="h-4 w-4 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground md:text-2xl">
                  超小型犬にも対応
                </h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                超小型のワンちゃんも安心の設計。ゲートを閉じるとドックランになります
              </p>
            </div>
            <div className="px-1 pb-1">
              <ImageCarousel
                images={smallDogImages}
                fallbackImages={smallDogFallbackImages}
                altPrefix="小型犬写真"
                className="overflow-hidden rounded-xl"
              />
            </div>
          </div>

          {/* Others */}
          <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
            <div className="p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5">
                  <Settings className="h-4 w-4 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground md:text-2xl">
                  その他
                </h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                ゴミ置き場・コードリール完備</p>
            </div>
            <div className="px-1 pb-1">
              <ImageCarousel
                images={otherImages}
                altPrefix="その他設備写真"
                className="overflow-hidden rounded-xl"
                imageClassName="object-contain"
                variableAspect
              />
            </div>
          </div>

          {/* Surroundings */}
          <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
            <div className="p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground md:text-2xl">
                  周辺環境
                </h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                セブンイレブン徒歩30秒の好立地・夕陽や花火大会も絶景
              </p>
            </div>
            <div className="px-1 pb-1">
              <ImageCarousel
                images={surroundingsImages}
                altPrefix="周辺環境写真"
                className="overflow-hidden rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 mx-auto w-full max-w-3xl">
          <Image
            src="/dividers/apology4b.avif"
            alt=""
            width={960}
            height={240}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, 48rem"
          />
        </div>
      </Container>
    </Section>
  )
}
