import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Hardware Owner Campaign',
  description: 'Simple landing page for hardware store software demo',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  )
}
