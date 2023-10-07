import { cn } from '@/lib/utils'
import { HeadingProps } from '@/types/headings'

export function H3({ className, children }: HeadingProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h2>
  )
}
