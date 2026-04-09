'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleSphere() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.offsetWidth
    const h = mount.offsetHeight

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(58, w / h, 0.1, 100)
    camera.position.z = 4.2

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Particles ──────────────────────────────────────────────────────────
    const COUNT  = 3200
    const RADIUS = 1.72

    const positions = new Float32Array(COUNT * 3)
    const colors    = new Float32Array(COUNT * 3)
    const sizes     = new Float32Array(COUNT)

    // Gold palette  [r, g, b] normalised
    const PALETTE: [number, number, number][] = [
      [0.961, 0.620, 0.043],  // #f59e0b  — primary gold
      [0.851, 0.467, 0.024],  // #d97706  — amber
      [0.984, 0.749, 0.141],  // #fbbf24  — light gold
      [0.706, 0.325, 0.035],  // #b45309  — copper
      [1.000, 0.870, 0.650],  // warm white sparkle
    ]

    for (let i = 0; i < COUNT; i++) {
      // Fibonacci sphere distribution — even surface coverage
      const phi   = Math.acos(1 - 2 * (i + 0.5) / COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
      const r     = RADIUS + (Math.random() - 0.5) * 0.22

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Mostly gold tones; occasional sparkle
      const isSparkle = Math.random() > 0.92
      const col = isSparkle ? PALETTE[4] : PALETTE[Math.floor(Math.random() * 4)]
      colors[i * 3]     = col[0]
      colors[i * 3 + 1] = col[1]
      colors[i * 3 + 2] = col[2]

      sizes[i] = isSparkle ? 0.032 : 0.018 + Math.random() * 0.012
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3))

    // Use a round soft circle texture via canvas
    const sprite = (() => {
      const c   = document.createElement('canvas')
      c.width   = 64
      c.height  = 64
      const ctx = c.getContext('2d')!
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0,   'rgba(255,255,255,1)')
      grad.addColorStop(0.4, 'rgba(255,255,255,0.8)')
      grad.addColorStop(1,   'rgba(255,255,255,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 64, 64)
      return new THREE.CanvasTexture(c)
    })()

    const mat = new THREE.PointsMaterial({
      size:         0.022,
      map:          sprite,
      vertexColors: true,
      transparent:  true,
      opacity:      0.88,
      depthWrite:   false,
      blending:     THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const sphere = new THREE.Points(geo, mat)
    scene.add(sphere)

    // ── Mouse parallax ─────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return
      const nw = mount.offsetWidth
      const nh = mount.offsetHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ─────────────────────────────────────────────────────
    let rafId: number
    let baseY = 0
    let baseX = 0

    const animate = () => {
      rafId = requestAnimationFrame(animate)

      baseY += 0.0028
      baseX += 0.0004

      // Smooth mouse lerp
      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04

      sphere.rotation.y = baseY + mouse.x * 0.20
      sphere.rotation.x = baseX - mouse.y * 0.14

      renderer.render(scene, camera)
    }
    animate()

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      geo.dispose()
      mat.dispose()
      sprite.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}
