'use client'

import { motion } from 'framer-motion'

// ─── Categories — updated from resume ────────────────────────────────────────
const CATEGORIES = [
  {
    label: 'Languages',
    icon: '{ }',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
    skills: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
  },
  {
    label: 'Frameworks & Libraries',
    icon: '⬡',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.25)',
    skills: ['React', 'Next.js', 'Redux', 'React Hooks', 'Express.js'],
  },
  {
    label: 'Backend & Tools',
    icon: '◈',
    color: '#eab308',
    bg: 'rgba(234,179,8,0.08)',
    border: 'rgba(234,179,8,0.25)',
    skills: ['Node.js', 'PostgreSQL', 'Firebase', 'Git', 'Vercel', 'Railway', 'Figma', 'Supabase'],
  },
  {
    label: 'Practices & APIs',
    icon: '⚡',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    border: 'rgba(217,119,6,0.25)',
    skills: ['REST APIs', 'JWT Auth', 'Anthropic API', 'ElevenLabs API', 'Agile/Scrum', 'Code Reviews'],
  },
]

// ─── Skill Pill ───────────────────────────────────────────────────────────────
function SkillPill({ skill, color, bg, border, delay }: {
  skill: string; color: string; bg: string; border: string; delay: number
}) {
  return (
    <motion.span
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold cursor-default"
      style={{ color, background: bg, border: `1px solid ${border}` }}
      initial={{ opacity: 0, scale: 0.78 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, type: 'spring', stiffness: 100, damping: 20 }}
      whileHover={{
        scale: 1.07,
        background: bg.replace('0.08', '0.16'),
        boxShadow: `0 0 18px ${color}35`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      {skill}
    </motion.span>
  )
}

// ─── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({ cat, idx }: { cat: typeof CATEGORIES[0]; idx: number }) {
  return (
    <motion.div
      className="p-6 rounded-2xl backdrop-blur-sm"
      style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: idx * 0.1, type: 'spring', stiffness: 100, damping: 20 }}
      whileHover={{ borderColor: cat.border }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className="text-sm font-black font-mono w-9 h-9 flex items-center justify-center rounded-xl"
          style={{ color: cat.color, background: cat.bg, border: `1px solid ${cat.border}` }}
        >
          {cat.icon}
        </span>
        <h3 className="text-sm font-semibold tracking-wide" style={{ color: '#fafaf9' }}>{cat.label}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill, i) => (
          <SkillPill
            key={skill}
            skill={skill}
            color={cat.color}
            bg={cat.bg}
            border={cat.border}
            delay={idx * 0.07 + i * 0.04}
          />
        ))}
      </div>
    </motion.div>
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
export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden">
      <SectionLine />

      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at bottom right, rgba(245,158,11,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16 text-center">
          <motion.p
            className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: '#f59e0b' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technical Expertise
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-black tracking-tight text-gradient-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
          >
            Tech Stack
          </motion.h2>
          <motion.div
            className="mt-5 mx-auto h-px rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)', width: 0 }}
            whileInView={{ width: '4rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CATEGORIES.map((cat, i) => <CategoryCard key={cat.label} cat={cat} idx={i} />)}
        </div>

        <motion.p
          className="mt-12 text-center text-sm"
          style={{ color: '#2a2a2a' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Expanding into{' '}
          <span style={{ color: '#525252' }}>Angular</span>,{' '}
          <span style={{ color: '#525252' }}>AWS</span>,{' '}
          <span style={{ color: '#525252' }}>Jest</span>, and{' '}
          <span style={{ color: '#525252' }}>CI/CD</span>.
        </motion.p>
      </div>
    </section>
  )
}
