import { cn } from "@/lib/utils"

type ContainerSize = "default" | "narrow" | "form"

const sizeClasses: Record<ContainerSize, string> = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
  form: "max-w-2xl",
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize
}

export function Container({
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto px-4 lg:px-8", sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  )
}
