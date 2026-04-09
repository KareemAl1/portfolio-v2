'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Project Data — resume-accurate descriptions ─────────────────────────────
interface Project {
  name: string
  description: string
  tech: string[]
  live: string
  github: string
  accent: string   // hex
}

const PROJECTS: Project[] = [
  {
    name: 'CoachDash',
    description: 'Full-stack AI developer activity tracker — Node.js/Express REST API, PostgreSQL database, JWT auth, Chart.js dashboards, and Anthropic API streaming for AI coaching summaries.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Anthropic API', 'JWT', 'Chart.js'],
    live: 'https://coachdash.vercel.app',
    github: 'https://github.com/KareemAl1/coachdash',
    accent: '#f59e0b',
  },
  {
    name: 'VoiceNote',
    description: 'AI voice memo summarizer — record audio, transcribe with ElevenLabs, and receive structured AI summaries powered by Anthropic instantly.',
    tech: ['Next.js', 'ElevenLabs API', 'Anthropic API'],
    live: 'https://voicenote-phi.vercel.app',
    github: 'https://github.com/KareemAl1/voicenote',
    accent: '#f97316',
  },
  {
    name: 'FeatureFlow',
    description: 'Feature flag & A/B testing dashboard with live WebSocket updates, experiment analytics, and real-time flag toggling in production environments.',
    tech: ['Next.js', 'WebSockets', 'PostgreSQL'],
    live: 'https://featureflow-neon.vercel.app',
    github: 'https://github.com/KareemAl1/featureflow',
    accent: '#ef4444',
  },
  {
    name: 'LivePulse',
    description: 'Real-time analytics dashboard visualizing live data streams via WebSockets with animated Recharts graphs and dynamic metric tracking.',
    tech: ['Next.js', 'WebSockets', 'Recharts'],
    live: 'https://livepulse-gamma.vercel.app',
    github: 'https://github.com/KareemAl1/livepulse',
    accent: '#eab308',
  },
  {
    name: 'Skinstric AI',
    description: 'Multi-step skincare analysis platform — pixel-accurate Figma-to-code implementation, animated React UI flows, reusable component architecture, deployed on Vercel.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS v4'],
    live: 'https://skinstric-ai-ten.vercel.app',
    github: 'https://github.com/KareemAl1/skinstric-ai',
    accent: '#fb923c',
  },
  {
    name: 'Summarist',
    description: 'Full-stack book summary app — Redux state management, Firebase auth (email, Google, guest), RESTful API integration, debounced search, audio playback, and skeleton loading.',
    tech: ['Next.js', 'Firebase', 'Redux', 'TypeScript'],
    live: 'https://summarist-app-eta.vercel.app',
    github: 'https://github.com/KareemAl1/summarist-app',
    accent: '#d97706',
  },
  {
    name: 'NFT Marketplace',
    description: 'Dynamic marketplace — RESTful API integration replacing static data with real-time content, AOS animations, carousel components, countdown timers, and interactive features.',
    tech: ['React', 'JavaScript', 'REST APIs'],
    live: 'https://kareem-internship.vercel.app',
    github: 'https://github.com/KareemAl1/kareem-internship',
    accent: '#b45309',
  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────
function IconExternal({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function IconGitHub({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.03-1.61-4.03-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0C17.3 4.68 18.3 5 18.3 5c.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0024 12C24 5.37 18.63 0 12 0z"/>
    </svg>
  )
}

// ─── hex → "r,g,b" ───────────────────────────────────────────────────────────
function rgb(hex: string) {
  return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`
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

// ─── Project Card — flip reveal + 3D tilt ────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef   = useRef<HTMLDivElement>(null)
  const isInView  = useInView(cardRef, { once: true, margin: '-50px' })
  const [tilt,    setTilt]    = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const r  = cardRef.current.getBoundingClientRect()
    const dx = (e.clientX - r.left - r.width / 2)  / (r.width / 2)
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2)
    setTilt({ x: -dy * 7, y: dx * 7 })
  }, [])

  const accentRgb = rgb(project.accent)

  return (
    /* Flip-in on scroll: starts at rotateY(30deg) opacity 0, resolves to identity */
    <motion.div
      ref={cardRef}
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, rotateY: 28, y: 30 }}
      animate={isInView ? { opacity: 1, rotateY: 0, y: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: (index % 3) * 0.12,
        type: 'spring',
        stiffness: 90,
        damping: 18,
      }}
    >
      <motion.div
        className="relative h-full rounded-2xl p-6 flex flex-col gap-5 cursor-default overflow-hidden"
        style={{
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.06)',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          boxShadow: hovered
            ? `0 24px 60px -12px rgba(${accentRgb},0.28), 0 0 0 1px rgba(${accentRgb},0.45), inset 0 0 30px rgba(${accentRgb},0.04)`
            : '0 4px 24px rgba(0,0,0,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.6 }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      >
        {/* Hover radial overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 65% 0%, rgba(${accentRgb},0.14) 0%, transparent 70%)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-8 right-8 h-px rounded-full pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, rgba(${accentRgb},0.9), transparent)` }}
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.2 }}
          transition={{ duration: 0.4 }}
        />

        {/* Header */}
        <div className="relative flex items-start justify-between gap-3" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-base font-bold" style={{ color: '#fafaf9' }}>{project.name}</h3>
          <span
            className="text-xs font-mono font-bold px-2 py-0.5 rounded-md shrink-0"
            style={{ color: project.accent, background: `rgba(${accentRgb},0.12)` }}
          >
            0{index + 1}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: '#525252', transform: 'translateZ(10px)' }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5" style={{ transform: 'translateZ(16px)' }}>
          {project.tech.map(t => (
            <span
              key={t}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                color: project.accent,
                border: `1px solid rgba(${accentRgb},0.3)`,
                background: `rgba(${accentRgb},0.08)`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          className="flex items-center gap-3 pt-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', transform: 'translateZ(22px)' }}
        >
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-300 group/link"
            style={{ color: 'rgba(250,250,249,0.6)' }}
            onClick={e => e.stopPropagation()}
          >
            <span
              className="flex items-center justify-center w-6 h-6 rounded-full"
              style={{ background: `rgba(${accentRgb},0.15)`, color: project.accent }}
            >
              <IconExternal />
            </span>
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-300"
            style={{ color: '#525252' }}
            onClick={e => e.stopPropagation()}
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/8">
              <IconGitHub />
            </span>
            Source
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader() {
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
        My Work
      </motion.p>
      <motion.h2
        className="text-4xl md:text-5xl font-black tracking-tight text-gradient-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
      >
        Projects
      </motion.h2>
      <motion.div
        className="mt-5 mx-auto h-px rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)', width: 0 }}
        whileInView={{ width: '4rem' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
      />
      <motion.p
        className="mt-5 text-base max-w-lg mx-auto"
        style={{ color: '#525252' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        AI dashboards, real-time data pipelines, and full-stack architecture.
      </motion.p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">
      <SectionLine />

      {/* Background warmth */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.03) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-7xl mx-auto">
        <SectionHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
        </div>

        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
        >
          <a
            href="https://github.com/KareemAl1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-400 group"
            style={{ border: '1px solid rgba(245,158,11,0.2)', color: '#a3a3a3', background: 'rgba(245,158,11,0.03)' }}
          >
            <IconGitHub size={14} />
            View all repos on GitHub
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
