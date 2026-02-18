import { cn } from "@/lib/utils"

interface PageHeroProps {
  /** 小ラベル（例: PET RULES, CONTACT） */
  label: string
  /** ページタイトル */
  title: string
  /** オプション: アイコン（lucide-react など） */
  icon?: React.ReactNode
  className?: string
}

export function PageHero({ label, title, icon, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "bg-[#3d5240] py-16 md:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-[#faf8f5]/80 [&>svg]:h-6 [&>svg]:w-6">
              {icon}
            </span>
          )}
          <span className="text-sm tracking-widest text-[#faf8f5]/60">
            {label}
          </span>
        </div>
        <h1 className="mt-4 font-serif text-3xl font-bold text-[#faf8f5] md:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  )
}
