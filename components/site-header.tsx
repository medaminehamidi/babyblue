'use client'


export function SiteHeader() {
  return (

    <header className='top-0 z-40 w-full border-b bg-background border-gray-700'>
     
          <div>
            <div className='mx-3 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 '>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
              </div>
              <div className='flex flex-1 items-center justify-end space-x-4'>

                <nav className='flex items-center space-x-1'>
                </nav>

              </div>
            </div>
          </div>
    </header>
  )
}
