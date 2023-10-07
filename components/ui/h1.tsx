import { cn } from '@/lib/utils'
import { HeadingProps } from '@/types/headings'

export function H1({ className, children }: HeadingProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}
    >
      {children}
    </h1>
  )
}
