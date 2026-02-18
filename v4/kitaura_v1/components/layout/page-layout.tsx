import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToHash } from "@/components/scroll-to-hash"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: React.ReactNode
  /** main に付与するクラス（例: pt-16） */
  mainClassName?: string
}

export function PageLayout({ children, mainClassName }: PageLayoutProps) {
  return (
    <>
      <Header />
      <ScrollToHash />
      <main className={cn(mainClassName)}>{children}</main>
      <Footer />
    </>
  )
}
