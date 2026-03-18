'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (isDone) return;
    
    // Scramble Text Effect Implementation
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const originalText = 'RIDEX'
    let iteration = 0
    let interval: NodeJS.Timeout | null = null

    const scramble = () => {
      clearInterval(interval as NodeJS.Timeout)
      interval = setInterval(() => {
        if (!textRef.current) return
        textRef.current.innerText = originalText
          .split('')
          .map((letter, index) => {
            if (index < Math.floor(iteration)) {
              return originalText[index]
            }
            return letters[Math.floor(Math.random() * 26)]
          })
          .join('')
        
        if (iteration >= originalText.length) {
          clearInterval(interval as NodeJS.Timeout)
        }
        iteration += 1 / 8
      }, 40)
    }

    scramble()

    // GSAP Timeline
    const tl = gsap.timeline({
      onComplete: () => setIsDone(true)
    })

    // Progress Bar Fill
    tl.to(barRef.current, {
      scaleX: 1,
      duration: 1.5,
      ease: 'power2.inOut'
    })

    // Clip Upward
    tl.to(containerRef.current, {
      scaleY: 0,
      duration: 0.6,
      ease: 'power3.inOut',
      transformOrigin: 'top center'
    }, '+=0.2')

    return () => {
      if (interval) clearInterval(interval)
      tl.kill()
    }
  }, [isDone])

  if (isDone) return null

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black origin-bottom pointer-events-none"
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-sm px-8">
        <h1 
          ref={textRef} 
          className="text-6xl md:text-8xl font-black text-white tracking-widest uppercase font-mono"
        >
          RIDEX
        </h1>
        <div className="w-full h-[2px] bg-white/[0.08] relative overflow-hidden">
          <div 
            ref={barRef}
            className="absolute inset-0 bg-[#E8450A] origin-left scale-x-0"
          />
        </div>
      </div>
    </div>
  )
}
