import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-space-grotesk' });
const _inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
  title: 'Sami Bentaarit - Portfolio',
  description: 'Sami\'s Portfolio Website',
  icons: {
    icon: [
      {
        url: '/logos/logo_SB.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logos/logo_SB.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logos/logo_SB.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/logos/logo_SB.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_spaceGrotesk.variable} ${_inter.variable} ${_jetbrainsMono.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
