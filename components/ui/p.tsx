import { cn } from '@/lib/utils'
import { HeadingProps } from '@/types/headings'

export function P({ className, children }: HeadingProps) {
  return (
    <h2 className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </h2>
  )
}
