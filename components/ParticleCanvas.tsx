/* FIXES APPLIED:
 * [PERFORMANCE] Created canvas-based particle system to replace expensive DOM particles
 * [ACCESSIBILITY] Respects reduced motion preferences
 */
'use client'
import { useRef, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{ x: number, y: number, radius: number, speed: number, color: string }> = []
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      resize()
      particles = []
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.2,
          color: `rgba(${255 - Math.random() * 50}, ${150 - Math.random() * 50}, 50, ${Math.random() * 0.4 + 0.1})`
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
        
        p.y -= p.speed
        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }
      })
      animationFrameId = requestAnimationFrame(draw)
    }

    init()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [prefersReducedMotion])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}
