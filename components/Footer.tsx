'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative py-10 px-6" style={{ borderTop: '1px solid rgba(245,158,11,0.08)' }}>
      {/* Top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.18), transparent)' }}
      />

      <motion.div
        className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
        style={{ color: '#2a2a2a' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Name */}
        <div className="flex items-center gap-2">
          <span className="font-bold" style={{ color: '#525252' }}>Kareem Alwan</span>
          <span style={{ color: '#1a1a1a' }}>·</span>
          <span>© {year}</span>
        </div>

        {/* Built with */}
        <div className="flex items-center gap-1.5 text-xs">
          <span>Built with</span>
          <span className="font-medium" style={{ color: '#525252' }}>Next.js</span>
          <span style={{ color: '#1a1a1a' }}>·</span>
          <span className="font-medium" style={{ color: '#525252' }}>Tailwind</span>
          <span style={{ color: '#1a1a1a' }}>·</span>
          <span className="font-medium" style={{ color: '#525252' }}>Framer Motion</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5">
          {[
            { label: 'GitHub',   href: 'https://github.com/KareemAl1' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/kareemalwan' },
            { label: 'Email',    href: 'mailto:kareemalwan47@gmail.com' },
          ].map(l => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="transition-colors duration-300"
              style={{ color: '#2a2a2a' }}
              whileHover={{ color: '#f59e0b' }}
            >
              {l.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  )
}
