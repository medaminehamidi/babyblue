import { SiteHeader } from '@/components/site-header'
import './globals.css'
import { Sidebar } from '@/components/side-bar'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { SupabaseProvider } from '@/components/SupabaseSessionProvider'
import { Toaster } from '@/components/ui/toaster'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={
          'min-h-screen bg-white font-sans antialiased'
        }
      >
        <SupabaseProvider>
        <Toaster />
          <div className='relative flex min-h-screen flex-col'>
            <SiteHeader />
            <div className="grid min-h-screen lg:grid lg:grid-cols-5 h-full">
              <Sidebar />

              <div className="w-full lg:col-span-4 col-span-5 border-l min-h-screen h-full border-gray-700">
                <div className='flex-1'>{children}</div>
              </div>
            </div>

            <TailwindIndicator />
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}
