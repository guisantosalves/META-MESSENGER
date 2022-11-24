import { unstable_getServerSession } from 'next-auth/next'
import '../styles/globals.css'

// components
import Header from './Header'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
