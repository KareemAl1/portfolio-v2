'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const cursorX = useMotionValue(-800)
  const cursorY = useMotionValue(-800)

  // Outer ambient — heavy lag, feels like floating
  const glowX = useSpring(cursorX, { stiffness: 55, damping: 22, mass: 0.8 })
  const glowY = useSpring(cursorY, { stiffness: 55, damping: 22, mass: 0.8 })

  // Inner ring — medium lag
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 28, mass: 0.5 })
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 28, mass: 0.5 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  return (
    <>
      {/* Large ambient amber glow — heavy trail */}
      <motion.div
        className="fixed pointer-events-none z-0 rounded-full"
        style={{
          width: 650,
          height: 650,
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.08) 0%, rgba(217,119,6,0.04) 40%, transparent 70%)',
        }}
      />
      {/* Tighter amber ring */}
      <motion.div
        className="fixed pointer-events-none z-0 rounded-full"
        style={{
          width: 280,
          height: 280,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
        }}
      />
    </>
  )
}
