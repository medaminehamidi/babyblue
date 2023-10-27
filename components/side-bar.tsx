'use client'
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeftRight, LayoutDashboard, Smile } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useSupabase } from "./SupabaseSessionProvider"
import { useUserStore } from "@/app/store"

const sidebarNavItems = (user: boolean, username: string) => {
  return user ? [
    {
      title: 'Dashboard',
      href: '/',
      icon: <LayoutDashboard className="m-0 lg:mr-2 w-5 h-5" />
    },
    {
      title: 'Transaction',
      href: '/platform',
      icon: <ArrowLeftRight className="m-0 lg:mr-2 w-5 h-5" />

    },
    {
      title: `${user ? username : 'Login'}`,
      href: `${user ? '/profile' : '/signin'}`,
      icon: <Smile className="m-0 lg:mr-2 w-5 h-5" />
    }
  ] : [
    {
      title: `${user ? username : 'Login'}`,
      href: `${user ? '/profile' : '/signin'}`,
      icon: <Smile className="m-0 lg:mr-2 w-5 h-5" />
    }
  ]
}

export function Sidebar() {
  const pathname = usePathname()

  const currentUser = useUserStore((state) => state.user)
  const { user } = useSupabase()
  return (
    <div className={"p-0 bg-white dark:bg-slate-950 border-t border-slate-400  lg:border-transparent w-full lg:pb-12 lg:bg-transparent lg:relative fixed bottom-0"}>
      <div className="space-y-4 py-4">
        <div className="p-0 lg:px-3 lg:py-2">
          <div className="space-y-0 lg:space-y-1 lg:items-start lg:justify-start justify-around items-center flex lg:flex-col">
            {sidebarNavItems(!!user, currentUser.username).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  pathname === item.href
                    ? 'bg-slate-200 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 '
                    : 'hover:bg-slate-200  text-slate-500 dark:hover:bg-slate-900',
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