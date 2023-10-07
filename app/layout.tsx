import { SiteHeader } from '@/components/site-header'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { Sidebar } from '@/components/side-bar'
import { TailwindIndicator } from '@/components/tailwind-indicator'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={
          'min-h-screen bg-background font-sans antialiased'
        }
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='relative flex min-h-screen flex-col'>
            <SiteHeader />
            <div className="flex min-h-screen lg:grid lg:grid-cols-5">
              <Sidebar />

              <div className="w-full lg:col-span-4 border-l border-gray-700">
                <div className='flex-1'>{children}</div>
              </div>
            </div>

            <TailwindIndicator />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
