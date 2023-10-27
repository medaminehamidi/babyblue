import { SiteHeader } from '@/components/site-header'
import { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/side-bar'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { SupabaseProvider } from '@/components/SupabaseSessionProvider'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

interface RootLayoutProps {
  children: React.ReactNode
}
export const metadata: Metadata = {
  title: 'Baby Blue',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
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
        <SupabaseProvider>
          <Toaster />
          <ThemeProvider attribute='class' defaultTheme='light' enableSystem>

            <div className='relative flex min-h-screen flex-col'>
              <SiteHeader />
              <div className="grid min-h-screen lg:grid lg:grid-cols-5 h-full">
                <Sidebar />

                <div className="w-full lg:col-span-4 col-span-5 border-l border-transparent lg:border-gray-700 min-h-screen h-full ">
                  <div className='flex-1'>{children}</div>
                </div>
              </div>

              <TailwindIndicator />
            </div>
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
