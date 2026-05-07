import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CursorGlow      from '@/components/CursorGlow'
import Navbar          from '@/components/Navbar'
import LenisProvider   from '@/components/LenisProvider'
import ScrollProgress  from '@/components/ScrollProgress'
import PageTransition  from '@/components/PageTransition'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kareem Alwan | Full-Stack Developer · AI-native Web Apps',
  description:
    'Full-stack developer shipping AI-native products. Currently freelancing on Shopify performance for an e-commerce client. 8+ deployed production applications with React, Next.js, TypeScript, and the Anthropic API.',
  keywords: [
    'Kareem Alwan',
    'Full-Stack Developer',
    'Frontend Developer',
    'AI Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Anthropic API',
    'ElevenLabs',
    'Shopify',
    'Freelance',
    'FES Institute',
    'Westland MI',
    'Detroit',
  ],
  authors: [{ name: 'Kareem Alwan', url: 'https://github.com/KareemAl1' }],
  openGraph: {
    title: 'Kareem Alwan | Full-Stack Developer · AI-native Web Apps',
    description:
      'Full-stack developer shipping AI-native products. Currently delivering live freelance work on Shopify performance for an e-commerce client.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kareem Alwan | Full-Stack Developer · AI-native Web Apps',
    description:
      'Full-stack developer shipping AI-native products. Currently delivering live freelance work on Shopify performance for an e-commerce client.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#0a0a0a] text-[#fafaf9] antialiased overflow-x-hidden">
        <LenisProvider>
          <PageTransition />
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
