import fs from "node:fs"
import path from "node:path"
import { Droplets, Dog, MapPin, Settings } from "lucide-react"
import { ImageCarousel } from "@/components/image-carousel"
import { Section } from "@/components/layout"
import { Container } from "@/components/layout"
import { SectionHeading } from "@/components/section-heading"

function listPublicImages(relativeDir: string) {
  const dirPath = path.join(process.cwd(), "public", ...relativeDir.split("/"))
  if (!fs.existsSync(dirPath)) return []

  return fs
    .readdirSync(dirPath)
    .filter((name) => /\.(png|jpe?g|webp|gif)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, "ja"))
    .map((name) => `/${relativeDir}/${name}`)
}

const scannedWatterImages = listPublicImages("features/watter")
const watterImages =
  scannedWatterImages.length > 0
    ? scannedWatterImages
    : Array.from(
        { length: 10 },
        (_, i) => `/features/watter/watter-${String(i + 1).padStart(2, "0")}.jpg`
      )

// その他（ゴミ置き場・コードリール・エアコン等）— public/features/3_els の画像を使用
const scannedOtherImages = listPublicImages("features/3_els")
const otherImages =
  scannedOtherImages.length > 0
    ? scannedOtherImages
    : [
        "/features/3_els/01-elec.jpg",
        "/features/3_els/02-trash.jpg",
        "/features/3_els/03-trash2.jpg",
        "/features/3_els/04-72994D5A-FA90-469A-884E-BF89DB666517.jpg",
        "/features/3_els/05-D5D8F0A8-C3B2-4FB7-BB44-C8BB8EC72889.jpg",
        "/features/3_els/10-エアコン.jpg",
        "/features/3_els/2A6B4F16-ACCB-405A-92CA-A986F84FC3A1.jpg",
      ]

// 周辺環境：public/features/4_nearby 内の画像を自動読込（フォルダに追加すればUIに反映）
const scannedSurroundingsImages = listPublicImages("features/4_nearby")
const surroundingsImages =
  scannedSurroundingsImages.length > 0
    ? scannedSurroundingsImages
    : ["/hero-lakeside.png", "/pet-with-dog.png", "/small-dog-01.jpg"]
const smallDogImages = Array.from(
  { length: 7 },
  (_, i) => `/features/small-dog/small-dog-${String(i + 1).padStart(2, "0")}.jpg`
)
const smallDogFallbackImages = Array.from(
  { length: 7 },
  (_, i) => `/small-dog-${String(i + 1).padStart(2, "0")}.jpg`
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
                  全サイト水回り・電源完備
                </h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                トイレ・シャワー・炊事場・電源完備
              </p>
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
                  小型犬対応
                </h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                小型犬に配慮した設計・ゲートを閉じるとドックランになります
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
                ゴミ置き場・コードリール完備・エアコンの有料貸出し(夏季限定)
              </p>
            </div>
            <div className="px-1 pb-1">
              <ImageCarousel
                images={otherImages}
                altPrefix="その他設備写真"
                className="overflow-hidden rounded-xl"
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

        <div className="mt-12">
          <img
            src="/dividers/apology4b.png"
            alt=""
            className="mx-auto w-full max-w-3xl"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Container>
    </Section>
  )
}
