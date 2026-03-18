/* FIXES APPLIED:
 * [CRITICAL] Memory leak and unkillable ScrollTriggers fixed via useGSAP context wrapper
 */
'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  className?: string
}

export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.8,
  className = ''
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (direction === 'none' || !ref.current) return

    let x = 0
    let y = 0

    switch (direction) {
      case 'up': y = 50; break;
      case 'down': y = -50; break;
      case 'left': x = 50; break;
      case 'right': x = -50; break;
    }

    gsap.fromTo(
      ref.current,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        }
      }
    )
  }, [direction, delay, duration])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
