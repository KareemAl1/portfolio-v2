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
  title: 'Kareem Alwan | Frontend Developer',
  description:
    'Frontend Developer at FES Institute building production-ready web applications with React, Next.js, TypeScript, and Node.js.',
  keywords: [
    'Kareem Alwan',
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'FES Institute',
    'Westland MI',
  ],
  authors: [{ name: 'Kareem Alwan', url: 'https://github.com/KareemAl1' }],
  openGraph: {
    title: 'Kareem Alwan | Frontend Developer',
    description:
      'Frontend Developer building production-ready apps with React, Next.js, TypeScript, and Node.js.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kareem Alwan | Frontend Developer',
    description:
      'Frontend Developer building production-ready apps with React, Next.js, TypeScript, and Node.js.',
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
