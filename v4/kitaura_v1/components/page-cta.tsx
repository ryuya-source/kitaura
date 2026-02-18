import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface PageCtaProps {
  /** 戻るリンクのラベル（省略時は「TOPに戻る」） */
  backLabel?: string
  /** 戻るリンクの href（省略時は "/"） */
  backHref?: string
  /** メインCTAラベル（省略時は「予約・空き確認」） */
  ctaLabel?: string
  /** メインCTAの href（省略時は "/contact"） */
  ctaHref?: string
  className?: string
}

export function PageCta({
  backLabel = "TOPに戻る",
  backHref = "/",
  ctaLabel = "予約・空き確認",
  ctaHref = "/contact",
  className,
}: PageCtaProps) {
  return (
    <section className={cn("bg-background py-12", className)}>
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 px-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
        <Link
          href={ctaHref}
          className="inline-flex rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
}
