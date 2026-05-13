'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import dynamic from 'next/dynamic'

// Three.js sphere — loaded client-side only (no SSR)
const ParticleSphere = dynamic(() => import('./ParticleSphere'), { ssr: false })

// ─── Typewriter Hook ─────────────────────────────────────────────────────────
const ROLES = ['Full-Stack Developer', 'AI Engineer', 'Next.js Developer', 'Freelance Developer']

function useTypewriter(words: string[], typingSpeed = 75, deletingSpeed = 40, pauseMs = 2400) {
  const [text, setText]       = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsTyping(false) }, pauseMs)
      return () => clearTimeout(t)
    }
    if (isTyping) {
      if (text.length < word.length) {
        const t = setTimeout(() => setText(word.slice(0, text.length + 1)), typingSpeed)
        return () => clearTimeout(t)
      } else { setIsPaused(true) }
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed)
        return () => clearTimeout(t)
      } else { setIsTyping(true); setWordIdx(p => (p + 1) % words.length) }
    }
  }, [text, isTyping, isPaused, wordIdx, words, typingSpeed, deletingSpeed, pauseMs])
  return text
}

// ─── Text Scramble Hook ───────────────────────────────────────────────────────
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&░▒▓'

function useTextScramble(finalText: string, startDelay = 400) {
  const [display, setDisplay] = useState(() => finalText.replace(/\S/g, SCRAMBLE_CHARS[0]))
  const [done, setDone]       = useState(false)

  useEffect(() => {
    let iteration = 0
    let intervalId: ReturnType<typeof setInterval>

    const startTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        setDisplay(
          finalText
            .split('')
            .map((char, idx) => {
              if (char === ' ') return ' '
              if (idx < Math.floor(iteration)) return finalText[idx]
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            })
            .join('')
        )
        iteration += 0.45
        if (iteration >= finalText.length + 1) {
          clearInterval(intervalId)
          setDisplay(finalText)
          setDone(true)
        }
      }, 28)
    }, startDelay)

    return () => { clearTimeout(startTimer); clearInterval(intervalId) }
  }, [finalText, startDelay])

  return { display, done }
}

// ─── Canvas Particle Field ────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const mouseRef   = useRef({ x: -9999, y: -9999 })
  const rafRef     = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMouseMove)

    type P = { x: number; y: number; vx: number; vy: number; size: number; opacity: number; gold: boolean }
    const particles: P[] = Array.from({ length: 90 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      vx:      (Math.random() - 0.5) * 0.25,
      vy:      -(Math.random() * 0.45 + 0.15),
      size:    Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.55 + 0.1,
      gold:    Math.random() > 0.35,
    }))

    const REPULSE = 130

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouseRef.current

      for (const p of particles) {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPULSE && dist > 0) {
          const force = ((REPULSE - dist) / REPULSE) * 0.55
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        p.vx *= 0.97
        p.vy  = p.vy * 0.97 - 0.004

        p.x += p.vx
        p.y += p.vy

        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width }
        if (p.x < -4) p.x = canvas.width + 4
        if (p.x > canvas.width + 4) p.x = -4

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.gold ? '#f59e0b' : '#d97706'
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ─── Floating Tech Badge ──────────────────────────────────────────────────────
const TECH_BADGES = [
  { label: 'React',       left: '2%',  top: '22%', dur: 5.5, delay: 0.6 },
  { label: 'TypeScript',  left: '2%',  top: '68%', dur: 7.0, delay: 0.3 },
  { label: 'Anthropic',   left: '88%', top: '72%', dur: 5.8, delay: 0.9 },
  { label: 'Shopify',     left: '44%', top: '90%', dur: 6.5, delay: 1.4 },
  { label: 'Next.js',     left: '88%', top: '16%', dur: 6.2, delay: 1.1 },
]

function TechBadge({ label, left, top, dur, delay }: typeof TECH_BADGES[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none hidden md:block"
      style={{ left, top }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 0.55, scale: 1, y: [0, -14, 0] }}
      transition={{
        opacity:   { delay, duration: 1.2 },
        scale:     { delay, duration: 0.9, type: 'spring', stiffness: 100, damping: 20 },
        y:         { delay, duration: dur, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <span className="tech-badge">{label}</span>
    </motion.div>
  )
}

// ─── Glitch Text ──────────────────────────────────────────────────────────────
function GlitchText({ children, className }: { children: React.ReactNode; className?: string }) {
  const [glitching, setGlitching] = useState(false)

  const trigger = () => {
    if (glitching) return
    setGlitching(true)
    setTimeout(() => setGlitching(false), 380)
  }

  return (
    <span
      className={`${className ?? ''} ${glitching ? 'glitch-active' : ''} cursor-default select-none`}
      onMouseEnter={trigger}
      style={{ display: 'inline-block' }}
    >
      {children}
    </span>
  )
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({
  children, onClick, className, style,
}: { children: React.ReactNode; onClick?: () => void; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 })

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.28)
    y.set((e.clientY - r.top - r.height / 2) * 0.28)
  }, [x, y])

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  )
}

// ─── Container variants ───────────────────────────────────────────────────────
const container = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
}
const item = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Hero() {
  const role = useTypewriter(ROLES)
  // Single scramble for the full name — space at index 6 is always preserved
  const { display: nameDisplay } = useTextScramble('Kareem Alwan', 600)

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Grid */}
      <div className="absolute inset-0 hero-grid" />

      {/* Canvas particle field */}
      <ParticleField />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse 75% 55% at 50% 50%, transparent 35%, #0a0a0a 100%)' }}
      />

      {/* Floating tech badges */}
      {TECH_BADGES.map(b => <TechBadge key={b.label} {...b} />)}

      {/* Gold orb — top left */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-[1]"
        style={{
          width: 580, height: 580, top: '8%', left: '3%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.16) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{ x: [0, 45, -20, 0], y: [0, -35, 22, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Deep orange orb — bottom right */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-[1]"
        style={{
          width: 500, height: 500, bottom: '4%', right: '4%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.13) 0%, transparent 70%)',
          filter: 'blur(65px)',
        }}
        animate={{ x: [0, -28, 18, 0], y: [0, 24, -32, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Content ──────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-16"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-8 lg:gap-14">

          {/* ── Text column ──────────────────────────── */}
          <div className="flex-1 text-center md:text-left w-full">

            {/* Eyebrow */}
            <motion.p
              variants={item}
              className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase mb-7"
              style={{ color: '#f59e0b' }}
            >
              Hello, I'm
            </motion.p>

            {/* Name — single scramble, single line, space always preserved */}
            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-7"
            >
              <GlitchText className="text-gradient-white whitespace-nowrap">
                {nameDisplay}
              </GlitchText>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              variants={item}
              className="flex items-center justify-center md:justify-start gap-2.5 mb-9 min-h-[3rem]"
            >
              <span className="font-mono text-lg sm:text-2xl font-bold" style={{ color: '#f59e0b' }}>{'>'}</span>
              <span
                className="text-xl sm:text-2xl font-semibold min-w-[18ch] text-left"
                style={{ color: '#a3a3a3' }}
              >
                {role}
              </span>
              <motion.span
                className="inline-block w-[3px] h-6 sm:h-8 rounded-full ml-0.5"
                style={{ background: '#f59e0b' }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.75, repeat: Infinity }}
              />
            </motion.div>

            {/* Subtext */}
            <motion.p
              variants={item}
              className="text-base sm:text-lg max-w-xl mx-auto md:mx-0 mb-12 leading-relaxed"
              style={{ color: '#525252' }}
            >
              Full-stack developer shipping AI-native products. Currently delivering
              live freelance work for an e-commerce client.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              <MagneticButton
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto px-9 py-4 font-bold rounded-full text-sm tracking-wide text-[#0a0a0a] transition-all duration-400"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 0 28px rgba(245,158,11,0.3)' }}
              >
                View My Work
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto px-9 py-4 font-bold rounded-full text-sm tracking-wide transition-all duration-400"
                style={{
                  border: '1px solid rgba(245,158,11,0.4)',
                  color: '#f59e0b',
                  background: 'rgba(245,158,11,0.04)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Get In Touch
              </MagneticButton>
            </motion.div>

            {/* Status chip */}
            <motion.div
              variants={item}
              className="mt-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-sm text-xs"
              style={{ border: '1px solid rgba(245,158,11,0.12)', background: 'rgba(245,158,11,0.04)', color: '#525252' }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#22c55e' }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Westland, MI — Open to remote &amp; hybrid
            </motion.div>
          </div>

          {/* ── Sphere column — right on desktop, top on mobile ── */}
          <motion.div
            className="w-full h-[260px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] shrink-0 order-first md:order-last"
            variants={item}
          >
            <ParticleSphere />
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: '#2a2a2a' }}>
          Scroll
        </span>
        <div
          className="relative w-5 h-8 rounded-full flex justify-center pt-1.5"
          style={{ border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full"
            style={{ background: '#f59e0b' }}
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
