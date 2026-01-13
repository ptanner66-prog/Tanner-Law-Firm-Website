import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'

export const metadata: Metadata = {
  title: 'Tanner Law Firm | Cannabis & Hemp Regulatory Compliance',
  description: 'Expert cannabis and hemp regulatory compliance guidance. Stay compliant with our subscription-based legal information service covering all 50 states.',
  keywords: 'cannabis law, hemp compliance, regulatory guidance, Delta-8, CBD, legal compliance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
