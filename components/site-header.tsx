'use client'

import { useSupabase } from "./SupabaseSessionProvider"
import { Icons } from "./icons"
import { ThemeToggle } from "./theme-toggle"


export function SiteHeader() {
  const { user } = useSupabase()
  return (

    <header className='top-0 z-40 w-full border-b bg-background border-gray-700'>

      <div>
        <div className='mx-3 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 '>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-9 h-9 mr-2 bg-[#aedefc] border-gray-900 border-2 rounded">
              <Icons.logo className='h-6 w-6' />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{user? 'Welcome back!': 'Get in here !!!'}</h2>
          </div>
          <div className='flex flex-1 items-center justify-end space-x-4'>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
