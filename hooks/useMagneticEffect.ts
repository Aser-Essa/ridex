/* FIXES APPLIED:
 * [BEST PRACTICE] Extracted magnetic hover logic to a reusable hook
 * [PERFORMANCE] Cleaned up event listeners and used GSAP quickTo
 */
'use client'

import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from './useReducedMotion'

export function useMagneticEffect(ref: RefObject<HTMLElement | null>, strength: number = 0.35): void {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion) return

    const xTo = gsap.quickTo(element, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' })
    const yTo = gsap.quickTo(element, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' })

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = element.getBoundingClientRect()
      
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      
      xTo(x * strength)
      yTo(y * strength)
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    element.addEventListener('mousemove', handleMouseMove, { passive: true })
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      gsap.set(element, { x: 0, y: 0 })
    }
  }, [ref, strength, prefersReducedMotion])
}
