import { cn } from '@/lib/utils'
import { HeadingProps } from '@/types/headings'

export function H2({ className, children }: HeadingProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
        className
      )}
    >
      {children}
    </h2>
  )
}
