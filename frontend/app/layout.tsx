import { auth } from 'auth'
import { ModalProvider } from 'components/providers/modal-provider'
import { QueryProvider } from 'components/providers/query-provider'
import { ThemeProvider } from 'components/providers/theme-provider'
import { Toaster } from 'components/ui/toaster'
import { EdgeStoreProvider } from 'lib/edgestore'
import type { Metadata } from 'next'
import { SessionProvider } from "next-auth/react"
import { Inter } from 'next/font/google'
import './globals.css'
import ClientProviders from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stucoin',
  description: 'Make a next step in your career with a real proof of your abilities.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <EdgeStoreProvider>
        <QueryProvider>
          <ClientProviders>
            <html lang="en">
              <body className={inter.className}>
                <ThemeProvider
                  attribute='class'
                  defaultTheme='system'
                  enableSystem
                  disableTransitionOnChange
                  storageKey='stucoin-platform'
                >
                  <Toaster />
                  <ModalProvider />
                  {children}
                </ThemeProvider>
              </body>
            </html>
          </ClientProviders>
        </QueryProvider>
      </EdgeStoreProvider>
    </SessionProvider>
  )
}
