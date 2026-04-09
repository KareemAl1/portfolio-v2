'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// ─── Icons ────────────────────────────────────────────────────────────────────
function IconMail() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function IconGitHub() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.03-1.61-4.03-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0C17.3 4.68 18.3 5 18.3 5c.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0024 12C24 5.37 18.63 0 12 0z"/>
    </svg>
  )
}

// ─── Magnetic Contact Link ────────────────────────────────────────────────────
function MagneticContactLink({ href, icon, label, sublabel, color, bg, border, delay }: {
  href: string; icon: React.ReactNode; label: string; sublabel: string
  color: string; bg: string; border: string; delay: number
}) {
  const ref  = useRef<HTMLAnchorElement>(null)
  const [hovered, setHovered] = useState(false)
  const x  = useMotionValue(0)
  const y  = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 130, damping: 15, mass: 0.2 })
  const sy = useSpring(y, { stiffness: 130, damping: 15, mass: 0.2 })

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width  / 2) * 0.18)
    y.set((e.clientY - r.top  - r.height / 2) * 0.18)
  }, [x, y])

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="group flex items-center gap-5 p-6 rounded-2xl transition-all duration-400"
      style={{
        x: sx, y: sy,
        background: hovered ? bg : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? border : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? `0 0 32px rgba(${color},0.12)` : 'none',
      }}
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, type: 'spring', stiffness: 100, damping: 20 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); x.set(0); y.set(0) }}
    >
      {/* Icon */}
      <motion.span
        className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
        style={{
          background: bg,
          border: `1px solid ${border}`,
          color: `rgb(${color})`,
        }}
        animate={{ scale: hovered ? 1.12 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {icon}
      </motion.span>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-base" style={{ color: '#fafaf9' }}>{label}</p>
        <p className="text-sm truncate" style={{ color: '#525252' }}>{sublabel}</p>
      </div>

      {/* Arrow */}
      <motion.span
        className="text-lg shrink-0"
        style={{ color: `rgb(${color})` }}
        animate={{ x: hovered ? 5 : 0, opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.25 }}
      >
        →
      </motion.span>
    </motion.a>
  )
}

// ─── Section Line ─────────────────────────────────────────────────────────────
function SectionLine() {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-px"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.25), transparent)', transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      <SectionLine />

      <div
        className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(245,158,11,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: '#f59e0b' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-black tracking-tight text-gradient-white mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
          >
            Let's Work Together
          </motion.h2>
          <motion.div
            className="mx-auto h-px rounded-full mb-7"
            style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)', width: 0 }}
            whileInView={{ width: '4rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
          />
          <motion.p
            className="text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: '#525252' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Actively looking for full-time or contract opportunities. Whether you have a
            project in mind or just want to connect — my inbox is always open.
          </motion.p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <MagneticContactLink
            href="mailto:kareemalwan47@gmail.com"
            icon={<IconMail />}
            label="Send an Email"
            sublabel="kareemalwan47@gmail.com"
            color="245,158,11"
            bg="rgba(245,158,11,0.08)"
            border="rgba(245,158,11,0.25)"
            delay={0.15}
          />
          <MagneticContactLink
            href="https://linkedin.com/in/kareemalwan"
            icon={<IconLinkedIn />}
            label="Connect on LinkedIn"
            sublabel="linkedin.com/in/kareemalwan"
            color="249,115,22"
            bg="rgba(249,115,22,0.08)"
            border="rgba(249,115,22,0.25)"
            delay={0.25}
          />
          <MagneticContactLink
            href="https://github.com/KareemAl1"
            icon={<IconGitHub />}
            label="Follow on GitHub"
            sublabel="github.com/KareemAl1"
            color="217,119,6"
            bg="rgba(217,119,6,0.08)"
            border="rgba(217,119,6,0.25)"
            delay={0.35}
          />
        </div>

        {/* Availability badge */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium"
            style={{ border: '1px solid rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.07)', color: '#22c55e' }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: '#22c55e' }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Available for new opportunities
          </span>
        </motion.div>
      </div>
    </section>
  )
}
