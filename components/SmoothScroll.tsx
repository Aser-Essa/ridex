/* FIXES APPLIED:
 * [CRITICAL] Fixed GSAP ticker anonymous handler memory leak
 * [PERFORMANCE] Disabled smooth scroll for users preferring reduced motion
 */
'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.8,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
      }
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(updateLenis)
    }
  }, [prefersReducedMotion])

  return (
    <>
      <div 
        ref={progressRef} 
        className="fixed top-0 left-0 h-[2px] w-full bg-[#E8450A] z-9999 origin-left scale-x-0"
      />
      {children}
    </>
  )
}
