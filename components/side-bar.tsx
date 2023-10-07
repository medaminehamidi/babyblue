'use client'
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PlayCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <PlayCircle className="m-0 lg:mr-2 w-5 h-5" />
  }
]

export function Sidebar() {
  const pathname = usePathname()
  console.warn(pathname === '/')

  return (
    <div className={"pb-12"}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1 flex flex-col">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  pathname === item.href
                    ? 'bg-muted hover:bg-muted'
                    : 'hover:bg-muted',
                  'lg:justify-start w-10 p-0 flex items-center lg:px-3 justify-center lg:w-full'
                )}
              >
                {item.icon}
                <div className="hidden lg:flex">
                  {item.title}
                </div>
              </Link>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}