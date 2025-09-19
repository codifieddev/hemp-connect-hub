import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/context/AuthContext'

export const metadata: Metadata = {
  title: 'HEMP Kansas City - Business Mentorship & Networking',
  description: 'Connecting entrepreneurs and business leaders in Kansas City through mentorship and networking.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
