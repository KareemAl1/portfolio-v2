'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

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

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader() {
  return (
    <div className="mb-14 text-center">
      <motion.p
        className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
        style={{ color: '#f59e0b' }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Featured Case Study
      </motion.p>
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gradient-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
      >
        Shopify Performance &amp; Conversion Engagement
      </motion.h2>
      <motion.p
        className="mt-4 text-base sm:text-lg max-w-2xl mx-auto"
        style={{ color: '#a3a3a3' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        E-commerce client — <span style={{ color: '#f59e0b', fontWeight: 600 }}>Adonis Botanicals</span>
      </motion.p>
      <motion.div
        className="mt-5 mx-auto h-px rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)', width: 0 }}
        whileInView={{ width: '4rem' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.35 }}
      />
    </div>
  )
}

// ─── Meta Row (role, timeline) ───────────────────────────────────────────────
function MetaRow() {
  const items = [
    { label: 'Role',     value: 'Frontend Developer (Contract)' },
    { label: 'Client',   value: 'Adonis Botanicals' },
    { label: 'Timeline', value: 'April 2026 — Present' },
  ]
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {items.map(it => (
        <div
          key={it.label}
          className="rounded-xl px-4 py-3"
          style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
        >
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: '#525252' }}>
            {it.label}
          </p>
          <p className="text-sm font-semibold" style={{ color: '#fafaf9' }}>
            {it.value}
          </p>
        </div>
      ))}
    </motion.div>
  )
}

// ─── Stack tags ──────────────────────────────────────────────────────────────
const STACK = ['Shopify', 'Liquid', 'Dawn theme', 'GemPages', 'Meta Pixel', 'Performance Auditing']

function StackTags() {
  return (
    <motion.div
      className="flex flex-wrap gap-2 mb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {STACK.map((s, i) => (
        <motion.span
          key={s}
          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.07)' }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 + i * 0.04, type: 'spring', stiffness: 100, damping: 20 }}
        >
          {s}
        </motion.span>
      ))}
    </motion.div>
  )
}

// ─── Headline metric (Mobile PageSpeed 44 → 86) ──────────────────────────────
function useCountUp(start: number, end: number, duration: number, trigger: boolean) {
  const [n, setN] = useState(start)
  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const totalFrames = Math.round(duration / 16)
    const t = setInterval(() => {
      frame++
      const p = Math.min(frame / totalFrames, 1)
      setN(Math.floor(start + (end - start) * p))
      if (frame >= totalFrames) { setN(end); clearInterval(t) }
    }, 16)
    return () => clearInterval(t)
  }, [trigger, start, end, duration])
  return n
}

function HeadlineMetric() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const before = useCountUp(0, 44, 1200, inView)
  const after  = useCountUp(0, 86, 1800, inView)

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl p-6 sm:p-8 mb-12 overflow-hidden"
      style={{ border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.04)' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.12) 0%, transparent 70%)' }}
      />
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
        <div className="text-center sm:text-left">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: '#f59e0b' }}>
            Headline Result
          </p>
          <p className="text-base sm:text-lg font-semibold" style={{ color: '#fafaf9' }}>
            Mobile PageSpeed Score
          </p>
          <p className="text-xs sm:text-sm mt-1" style={{ color: '#525252' }}>
            Measured via Google PageSpeed Insights
          </p>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: '#525252' }}>Before</span>
            <span className="text-4xl sm:text-5xl font-black" style={{ color: '#525252' }}>{before}</span>
          </div>
          <motion.span
            className="text-2xl sm:text-3xl"
            style={{ color: '#f59e0b' }}
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
          <div className="flex flex-col items-center">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: '#f59e0b' }}>After</span>
            <span className="text-4xl sm:text-5xl font-black text-gradient">{after}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Block (Problem / What I Did / Results) ─────────────────────────────────
type BlockKind = 'problem' | 'work' | 'result'

function Block({
  kind,
  number,
  title,
  children,
  delay = 0,
}: {
  kind: BlockKind
  number: string
  title: string
  children: React.ReactNode
  delay?: number
}) {
  const accent =
    kind === 'problem' ? '#f97316' :
    kind === 'work'    ? '#f59e0b' :
                         '#fbbf24'

  return (
    <motion.div
      className="relative rounded-2xl p-6 sm:p-7 h-full"
      style={{ border: '1px solid rgba(255,255,255,0.06)', background: '#111111' }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div
        className="absolute top-0 left-7 right-7 h-px rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, opacity: 0.5 }}
      />
      <div className="flex items-center gap-3 mb-4">
        <span
          className="font-mono text-xs font-bold px-2 py-0.5 rounded-md"
          style={{ color: accent, background: `rgba(245,158,11,0.1)` }}
        >
          {number}
        </span>
        <h3 className="text-base sm:text-lg font-bold" style={{ color: '#fafaf9' }}>
          {title}
        </h3>
      </div>
      <div className="text-sm sm:text-[15px] leading-relaxed space-y-3" style={{ color: '#a3a3a3' }}>
        {children}
      </div>
    </motion.div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: '#f59e0b' }} />
      <span>{children}</span>
    </li>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CaseStudy() {
  return (
    <section id="case-study" className="relative py-28 px-6 overflow-hidden">
      <SectionLine />

      {/* Background warmth */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-5xl mx-auto relative">
        <SectionHeader />
        <MetaRow />
        <StackTags />
        <HeadlineMetric />

        {/* Body grid: stacks on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <Block kind="problem" number="01" title="The Problem" delay={0}>
            <p>
              The client&rsquo;s Shopify storefront was leaking conversions. Three issues stacked
              on top of each other, eroding both speed and ad attribution:
            </p>
            <ul className="space-y-2">
              <Bullet>Mobile PageSpeed score sat at <span style={{ color: '#fafaf9', fontWeight: 600 }}>44</span>.</Bullet>
              <Bullet>
                Paid Meta ads were running with broken Pixel tracking, so attribution data was
                unreliable.
              </Bullet>
              <Bullet>
                The GemPages page builder was misconfigured — every image loaded eagerly,
                above and below the fold.
              </Bullet>
            </ul>
          </Block>

          <Block kind="result" number="03" title="The Result" delay={0.1}>
            <ul className="space-y-2.5">
              <Bullet>
                Mobile PageSpeed:{' '}
                <span style={{ color: '#fafaf9', fontWeight: 600 }}>44 → 86</span>
              </Bullet>
              <Bullet>
                Meta Pixel events restored — ad campaign attribution recovered, ad manager
                trustworthy again.
              </Bullet>
              <Bullet>
                Product pages redesigned with conversion-focused UX (compare-at pricing,
                flash-sale labeling, mobile carousel repairs).
              </Bullet>
            </ul>
          </Block>
        </div>

        {/* What I Did — full width */}
        <Block kind="work" number="02" title="What I Did" delay={0.2}>
          <ul className="space-y-2.5">
            <Bullet>
              Diagnosed the GemPages lazy-load misconfiguration; rewrote image priority logic
              so above-the-fold loads first and below-the-fold defers.
            </Bullet>
            <Bullet>
              Migrated webfonts to <span style={{ color: '#fafaf9', fontWeight: 600 }}>Bunny Fonts</span> to
              cut external requests.
            </Bullet>
            <Bullet>
              Audited the Dawn theme and removed{' '}
              <span style={{ color: '#fafaf9', fontWeight: 600 }}>34 unused theme sections (2.58&nbsp;MB total)</span>{' '}
              and 5 redundant apps draining the load budget.
            </Bullet>
            <Bullet>
              Diagnosed and restored Meta Pixel event tracking (Add to Cart, Checkout) so
              the client&rsquo;s ad manager could trust their conversion numbers again.
            </Bullet>
            <Bullet>
              Redesigned product pages on the Dawn theme — compare-at pricing, flash-sale
              labeling, auto-expanding descriptions, hidden low-review counts, and mobile
              carousel UX repairs.
            </Bullet>
          </ul>
        </Block>
      </div>
    </section>
  )
}
