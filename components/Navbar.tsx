'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contact' },
]

// ─── Magnetic nav link ───────────────────────────────────────────────────────
function MagneticNavLink({
  label,
  onClick,
  delay,
}: {
  label: string
  onClick: () => void
  delay: number
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      className="relative text-sm font-medium text-[#a3a3a3] hover:text-[#fafaf9] transition-colors duration-300 group py-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {label}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-gold-500 to-gold-600"
        style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)' }}
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.25 }}
      />
    </motion.button>
  )
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [bgOpacity, setBgOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // Fade in bg smoothly 0→1 over first 120px of scroll
      setBgOpacity(Math.min(y / 120, 1))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="mx-auto px-6 md:px-12 py-4 flex items-center justify-between"
        style={{
          background: `rgba(10,10,10,${bgOpacity * 0.88})`,
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? `1px solid rgba(245,158,11,${bgOpacity * 0.1})` : '1px solid transparent',
          transition: 'backdrop-filter 600ms ease, border-color 600ms ease',
          boxShadow: scrolled ? `0 4px 30px rgba(0,0,0,${bgOpacity * 0.4})` : 'none',
        }}
      >
        {/* Logo */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="relative group flex items-center gap-2"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-xl font-black tracking-tight">
            <span className="text-[#fafaf9]">K</span>
            <span className="text-gradient">A</span>
          </span>
          <span className="text-sm font-semibold text-[#525252] group-hover:text-[#a3a3a3] transition-colors duration-300 hidden sm:inline">
            Kareem Alwan
          </span>
        </motion.button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <MagneticNavLink
              key={link.href}
              label={link.label}
              onClick={() => scrollTo(link.href)}
              delay={0.1 * i + 0.4}
            />
          ))}

          <motion.a
            href="mailto:kareemalwan47@gmail.com"
            className="ml-2 px-5 py-2.5 text-sm font-bold rounded-full text-[#0a0a0a] transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(245,158,11,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            Hire Me
          </motion.a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[
            menuOpen ? { rotate: 45,  y: 8  } : { rotate: 0, y: 0 },
            menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 },
            menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 },
          ].map((anim, i) => (
            <motion.span
              key={i}
              className="block w-6 h-0.5 rounded-full"
              style={{ background: '#f59e0b' }}
              animate={anim}
              transition={{ duration: 0.22 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden border-b"
            style={{
              background: 'rgba(10,10,10,0.96)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(245,158,11,0.1)',
              overflow: 'hidden',
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 py-7 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-base font-medium text-[#a3a3a3] hover:text-[#fafaf9] transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="mailto:kareemalwan47@gmail.com"
                className="mt-2 px-5 py-3 text-sm font-bold rounded-full text-[#0a0a0a] text-center"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
