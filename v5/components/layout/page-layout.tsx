import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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
      <main className={cn(mainClassName)}>{children}</main>
      <Footer />
    </>
  )
}
