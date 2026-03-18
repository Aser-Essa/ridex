/* FIXES APPLIED:
 * [BEST PRACTICE] Created reusable page transition wrapper instead of manual GSAP setups on every page
 */
'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@/hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out',
        clearProps: 'transform',
        onComplete: () => {
          ScrollTrigger.refresh()
        }
      }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="opacity-0">
      {children}
    </div>
  )
}
