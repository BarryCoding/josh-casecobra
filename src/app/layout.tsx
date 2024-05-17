import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { cn, constructMetadata } from '@/lib/utils'
import { ReactQueryProvider } from '@/providers/ReactQuery'
import { Recursive } from 'next/font/google'
import './globals.css'

const recursive = Recursive({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn(recursive.className, 'flex min-h-[100vh] flex-col')}>
        <Navbar />
        <main className='grainy-light flex flex-1 flex-col'>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}

// font recursive is cool
