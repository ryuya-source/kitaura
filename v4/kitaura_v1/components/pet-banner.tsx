import Link from "next/link"
import { Section } from "@/components/layout"
import { Container } from "@/components/layout"

export function PetBanner() {
  return (
    <Section className="bg-background py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="text-center">
            <p className="text-sm font-medium tracking-widest text-primary">PET FRIENDLY</p>
            <h2 className="mt-2 font-sans text-3xl font-bold leading-relaxed text-foreground md:text-4xl">
              犬種制限と<br />ペット同伴のマナー
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              ペットも、飼い主さまも、<br />
              そして周囲の方々も穏やかに過ごせるように。
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              受け入れ条件と場内ルールをご案内しています。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/pet"
                className="inline-flex rounded-lg border border-primary bg-primary/5 px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                ペット同伴ルールを見る
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl bg-secondary">
            <img
              src="/pet-with-dog.png"
              alt="ペットとの過ごし方"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
