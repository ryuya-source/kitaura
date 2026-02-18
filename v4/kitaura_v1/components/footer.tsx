import Link from "next/link"
import { Container } from "@/components/layout"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary py-12 text-foreground">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-bold tracking-wider">KITAURA LAKESIDE</h3>
            <p className="text-sm tracking-wider text-muted-foreground">RV park</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {'〒311-2104 茨城県鉾田市根山2947'}
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
            {'© KITAURA LAKESIDE RV park. All Rights Reserved.'}
          </p>
        </div>
      </Container>
    </footer>
  )
}
