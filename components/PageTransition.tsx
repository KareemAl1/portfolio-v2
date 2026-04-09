'use client'

import { motion } from 'framer-motion'

export default function PageTransition() {
  return (
    <>
      {/* Gold bar sweeps LEFT → RIGHT off screen on load */}
      <motion.div
        className="fixed inset-0 z-[300] pointer-events-none origin-left"
        style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b, #fbbf24)' }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      />

      {/* Thin trailing edge — slightly delayed for depth */}
      <motion.div
        className="fixed inset-0 z-[299] pointer-events-none origin-left"
        style={{ background: '#0a0a0a' }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
      />
    </>
  )
}
