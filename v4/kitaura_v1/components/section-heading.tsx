import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  /** 小ラベル（例: FEATURES, SITE TYPES） */
  label?: string
  /** 見出しテキスト */
  title: string
  className?: string
}

export function SectionHeading({ label, title, className }: SectionHeadingProps) {
  // 英語ラベル＋mt-2 の高さ分だけ下部余白を足し、日本語タイトルから見た上下の余白を揃える
  const paddingClass = label
    ? "pt-12 pb-[4.75rem] text-center md:pt-16 md:pb-[5.75rem]"
    : "py-12 text-center md:py-16"

  return (
    <div className={cn(paddingClass, className)}>
      {label && (
        <p className="text-sm font-medium tracking-widest text-primary">{label}</p>
      )}
      <h2 className="mt-2 font-sans text-3xl font-bold text-foreground md:text-4xl">
        {title}
      </h2>
    </div>
  )
}
