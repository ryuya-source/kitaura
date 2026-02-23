import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div"
}

export function Section({
  as: Tag = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn(className)} {...props}>
      {children}
    </Tag>
  )
}
