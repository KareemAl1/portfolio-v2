'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Blur Count-up Hook ───────────────────────────────────────────────────────
function useBlurCountUp(end: number, duration: number, trigger: boolean) {
  const [count,   setCount]   = useState(0)
  const [blur,    setBlur]    = useState(8)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const totalFrames = Math.round(duration / 16)
    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      setCount(Math.floor(end * Math.min(progress, 1)))
      setBlur(8 * (1 - Math.min(progress * 1.3, 1)))
      setOpacity(Math.min(progress * 1.5, 1))
      if (frame >= totalFrames) { setCount(end); setBlur(0); setOpacity(1); clearInterval(timer) }
    }, 16)
    return () => clearInterval(timer)
  }, [trigger, end, duration])

  return { count, blur, opacity }
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, delay, inView }: {
  value: number; suffix?: string; label: string; delay: number; inView: boolean
}) {
  const { count, blur, opacity } = useBlurCountUp(value, 1800, inView)

  return (
    <motion.div
      className="flex flex-col items-center p-5 rounded-2xl backdrop-blur-sm"
      style={{ border: '1px solid rgba(245,158,11,0.1)', background: 'rgba(245,158,11,0.03)' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, type: 'spring', stiffness: 100, damping: 20 }}
      whileHover={{ borderColor: 'rgba(245,158,11,0.35)', background: 'rgba(245,158,11,0.07)' }}
    >
      <span
        className="text-3xl md:text-4xl font-black text-gradient"
        style={{ filter: `blur(${blur}px)`, opacity, transition: 'filter 0.05s, opacity 0.05s' }}
      >
        {count}{suffix}
      </span>
      <span className="text-xs mt-1.5 font-medium tracking-wide text-center" style={{ color: '#525252' }}>
        {label}
      </span>
    </motion.div>
  )
}

// ─── Skill Tag ────────────────────────────────────────────────────────────────
const SKILLS = [
  'Next.js', 'React', 'TypeScript', 'JavaScript',
  'Node.js', 'Express', 'PostgreSQL', 'Firebase',
  'Redux', 'Tailwind CSS', 'Git', 'Vercel',
  'Railway', 'Figma', 'REST APIs', 'JWT Auth',
]

function SkillTag({ skill, delay }: { skill: string; delay: number }) {
  return (
    <motion.span
      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold cursor-default"
      style={{ color: '#a3a3a3', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, type: 'spring', stiffness: 100, damping: 20 }}
      whileHover={{
        borderColor: 'rgba(245,158,11,0.45)',
        color: '#f59e0b',
        background: 'rgba(245,158,11,0.07)',
        scale: 1.05,
      }}
    >
      {skill}
    </motion.span>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-16 text-center">
      <motion.p
        className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
        style={{ color: '#f59e0b' }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        className="text-4xl md:text-5xl font-black tracking-tight text-gradient-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
      >
        {title}
      </motion.h2>
      {/* Section line draws across */}
      <motion.div
        className="mt-5 mx-auto h-px w-0 rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)' }}
        whileInView={{ width: '4rem' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
      />
    </div>
  )
}

// ─── Full-width Section Entry Line ────────────────────────────────────────────
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
export default function About() {
  const statsRef  = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      <SectionLine />

      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Who I Am" title="About Me" />

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Bio + Stats ──────────────────── */}
          <div>
            <motion.p
              className="text-lg leading-relaxed mb-12"
              style={{ color: '#a3a3a3' }}
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, type: 'spring', stiffness: 100, damping: 20 }}
            >
              I'm a Frontend Developer building polished, production-ready web apps with{' '}
              <span className="font-semibold" style={{ color: '#f59e0b' }}>Next.js, React, TypeScript, and Node.js</span>
              {' '}— from database design to deployed UI. I completed the{' '}
              <span className="font-semibold" style={{ color: '#f59e0b' }}>FES Institute Frontend Development Program</span>
              {' '}and have shipped multiple live projects including an AI-powered coaching
              dashboard, a voice memo app with real-time transcription, a real-time analytics
              platform, and a feature flag dashboard with WebSocket architecture. Currently
              seeking junior-to-mid frontend or full-stack roles.
            </motion.p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              <StatCard value={10} suffix="+" label="Technologies"         delay={0}   inView={statsInView} />
              <StatCard value={3}  suffix="+"  label="AI-powered projects"  delay={0.1} inView={statsInView} />
            </div>

            {/* FES badge */}
            <motion.div
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.07)', color: '#f59e0b' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
            >
              <span>◆</span>
              FES Institute — Frontend Development Program
            </motion.div>

            {/* GitHub CTA */}
            <motion.a
              href="https://github.com/KareemAl1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 text-sm font-semibold transition-colors duration-300 group w-fit"
              style={{ color: '#f59e0b' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ color: '#fbbf24' }}
            >
              <span>View GitHub</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >→</motion.span>
            </motion.a>
          </div>

          {/* ── Right: Skills ──────────────────────── */}
          <div>
            <motion.h3
              className="text-xs font-mono tracking-widest uppercase mb-6"
              style={{ color: '#525252' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Tech I work with
            </motion.h3>

            <div className="flex flex-wrap gap-2.5">
              {SKILLS.map((skill, i) => (
                <SkillTag key={skill} skill={skill} delay={i * 0.04} />
              ))}
            </div>

            {/* In development callout */}
            <motion.div
              className="mt-10 p-5 rounded-2xl"
              style={{ border: '1px solid rgba(245,158,11,0.15)', background: 'rgba(245,158,11,0.04)' }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100, damping: 20 }}
            >
              <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: '#f59e0b' }}>
                In Development
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#525252' }}>
                Angular, AWS, Jest & React Testing Library, CI/CD pipelines — expanding into
                enterprise-grade tooling and test-driven development.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
