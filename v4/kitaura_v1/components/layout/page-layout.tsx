import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToHash } from "@/components/scroll-to-hash"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: React.ReactNode
  /** main に付与するクラス（例: pt-16） */
  mainClassName?: string
  /** true のときヘッダーを表示しない */
  hideHeader?: boolean
  /** true のときロゴを隠し、ハンバーガーメニューのみ表示（お問い合わせページ用） */
  headerOnlyHamburger?: boolean
}

export function PageLayout({ children, mainClassName, hideHeader, headerOnlyHamburger }: PageLayoutProps) {
  return (
    <>
      {!hideHeader && <Header onlyHamburger={headerOnlyHamburger} />}
      <ScrollToHash />
      <main className={cn(mainClassName)}>{children}</main>
      <Footer />
    </>
  )
}
