'use client'
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, PlayCircle, RefreshCcw } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="m-0 lg:mr-2 w-5 h-5" />
  },
  {
    title: 'Platform',
    href: '/platform',
    icon: <PlayCircle className="m-0 lg:mr-2 w-5 h-5" />
  },
  {
    title: 'Payments',
    href: '/payments',
    icon: <RefreshCcw className="m-0 lg:mr-2 w-5 h-5" />
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className={"p-0 bg-white border-t border-slate-400 lg:border-transparent w-full lg:pb-12 lg:bg-transparent lg:relative fixed bottom-0"}>
      <div className="space-y-4 py-4">
        <div className="p-0 lg:px-3 lg:py-2">
          <div className="space-y-0 lg:space-y-1 lg:items-start lg:justify-start justify-around items-center flex lg:flex-col">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  pathname === item.href
                    ? 'bg-slate-200 hover:bg-slate-200'
                    : 'hover:bg-slate-200',
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