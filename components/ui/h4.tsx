import { cn } from '@/lib/utils'
import { HeadingProps } from '@/types/headings'

export function H4({ className, children }: HeadingProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h2>
  )
}
