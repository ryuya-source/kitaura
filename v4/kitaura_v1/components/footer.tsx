import Link from "next/link"
import { Container } from "@/components/layout"

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#3d5240] py-12 text-[#faf8f5]">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-bold tracking-wider">KITAURA LAKESIDE</h3>
            <p className="text-sm tracking-wider text-[#faf8f5]/60">RV park</p>
            <p className="mt-3 text-sm leading-relaxed text-[#faf8f5]/70">
              {'〒311-2104 茨城県鉾田市根山2947'}
            </p>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Footer navigation">
            <Link href="/#features" className="text-sm text-[#faf8f5]/70 transition-colors hover:text-[#faf8f5]">こだわりポイント</Link>
            <Link href="/#sites" className="text-sm text-[#faf8f5]/70 transition-colors hover:text-[#faf8f5]">サイト種別</Link>
            <Link href="/#pricing" className="text-sm text-[#faf8f5]/70 transition-colors hover:text-[#faf8f5]">料金</Link>
            <Link href="/#rules" className="text-sm text-[#faf8f5]/70 transition-colors hover:text-[#faf8f5]">利用規約・マナー</Link>
            <Link href="/#access" className="text-sm text-[#faf8f5]/70 transition-colors hover:text-[#faf8f5]">アクセス</Link>
          </nav>

          <nav className="flex flex-col gap-2" aria-label="Secondary navigation">
            <Link href="/pet" className="text-sm text-[#faf8f5]/70 transition-colors hover:text-[#faf8f5]">ペット同伴ルール</Link>
            <Link href="/contact" className="text-sm text-[#faf8f5]/70 transition-colors hover:text-[#faf8f5]">お問い合わせ</Link>
          </nav>
        </div>

        <div className="mt-10 border-t border-[#faf8f5]/10 pt-6 text-center">
          <p className="text-xs text-[#faf8f5]/50">
            {'© KITAURA LAKESIDE RV park. All Rights Reserved.'}
          </p>
        </div>
      </Container>
    </footer>
  )
}
