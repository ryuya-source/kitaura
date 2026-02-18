import Link from "next/link"
import { Dog } from "lucide-react"
import { Section } from "@/components/layout"
import { Container } from "@/components/layout"

export function PetBanner() {
  return (
    <Section className="bg-background py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
              <Dog className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium tracking-wider text-primary">PET FRIENDLY</span>
            </div>
            <h2 className="font-serif text-3xl font-bold leading-relaxed text-foreground md:text-4xl">
              犬種制限と<br />ペット同伴のマナー
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              ペットも、飼い主さまも、<br />
              そして周囲の方々も穏やかに過ごせるように。
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              受け入れ条件と場内ルールをご案内しています。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/pet"
                className="inline-flex rounded-lg border border-primary bg-primary/5 px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                ペット同伴ルールを見る
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                予約・空き確認
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-secondary">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="ペットとの過ごし方"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-xl bg-card p-4 shadow-lg">
              <p className="text-xs text-muted-foreground">受け入れ条件と場内ルールをご案内しています。</p>
              <Link href="/pet" className="mt-1 block text-sm font-medium text-primary hover:underline">
                ペット同伴ルールを見る
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
