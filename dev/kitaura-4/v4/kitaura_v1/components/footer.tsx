import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/layout"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary py-12 text-foreground">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex flex-col items-center gap-1.5 text-center" aria-label="KITAURA LAKESIDE RV PARK">
              <Image
                src="/logo-header.avif"
                alt="KITAURA LAKESIDE RV PARK"
                width={80}
                height={80}
                className="h-14 w-14 object-contain sm:h-16 sm:w-16"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold tracking-widest text-foreground sm:text-sm">
                  KITAURA LAKESIDE
                </span>
                <span className="text-xs font-semibold tracking-widest text-foreground sm:text-sm">
                  RV PARK
                </span>
              </div>
            </Link>
            <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
              {'〒311-2104 茨城県鉾田市梶山2947'}
            </p>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Footer navigation">
            <Link href="/#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">こだわりポイント</Link>
            <Link href="/#sites" className="text-sm text-muted-foreground transition-colors hover:text-foreground">サイト種別</Link>
            <Link href="/#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">料金</Link>
            <Link href="/#rules" className="text-sm text-muted-foreground transition-colors hover:text-foreground">利用規約・マナー</Link>
            <Link href="/#access" className="text-sm text-muted-foreground transition-colors hover:text-foreground">アクセス</Link>
          </nav>

          <nav className="flex flex-col gap-2" aria-label="Secondary navigation">
            <Link href="/#pet" className="text-sm text-muted-foreground transition-colors hover:text-foreground">ペット同伴ルール</Link>
            <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">お問い合わせ</Link>
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {'© KITAURA LAKESIDE RV PARK. All Rights Reserved.'}
          </p>
        </div>
      </Container>
    </footer>
  )
}
