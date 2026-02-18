import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  /** 小ラベル（例: FEATURES, SITE TYPES） */
  label?: string
  /** 見出しテキスト */
  title: string
  className?: string
}

export function SectionHeading({ label, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("text-center", className)}>
      {label && (
        <p className="text-sm font-medium tracking-widest text-primary">{label}</p>
      )}
      <h2 className="mt-2 font-sans text-3xl font-bold text-foreground md:text-4xl">
        {title}
      </h2>
    </div>
  )
}
