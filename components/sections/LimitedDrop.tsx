'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'
import MagneticButton from '../MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function LimitedDrop() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)

  // Setup countdown
  useEffect(() => {
    // Target date: 30 days from now
    const targetDate = new Date().getTime() + (30 * 24 * 60 * 60 * 1000)

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        clearInterval(interval)
        setIsExpired(true)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useGSAP(() => {
    if (!sectionRef.current) return

    gsap.fromTo(barRef.current,
      { width: '0%' },
      { 
        width: '76.5%', 
        duration: 1.5, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="preorder" className="bg-black py-32 overflow-hidden border-t border-white/[0.08] relative">
      <div className="absolute top-6 left-8 font-mono text-[10px] text-white/20 tracking-widest z-50">
        09 / LIMITED PRODUCTION
      </div>

      {/* Background grain + glow */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#E8450A] opacity-[0.03] blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        <div className="font-mono text-xs tracking-[0.3em] text-[#E8450A] mb-8">
          — BATCH 04 · LIMITED PRODUCTION
        </div>

        <h2 className="font-display font-black text-[clamp(4rem,10vw,8rem)] text-white leading-none uppercase tracking-wide">
          47 OF 200
        </h2>
        
        <p className="font-mono text-sm tracking-widest text-white/40 mt-4 mb-16 uppercase">
          UNITS REMAINING IN THIS PRODUCTION RUN
        </p>

        {/* PROGRESS BAR */}
        <div className="w-full max-w-2xl mx-auto mb-16">
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
            <div ref={barRef} className="h-full bg-[#E8450A] rounded-full shadow-[0_0_15px_rgba(232,69,10,0.6)]" />
          </div>
          <div className="flex justify-between mt-4 font-mono text-xs tracking-widest text-white/50">
            <span>153 RESERVED</span>
            <span className="text-[#E8450A]">47 AVAILABLE</span>
          </div>
        </div>

        {/* COUNTDOWN TIMER */}
        {!isExpired ? (
          <div className="flex gap-4 md:gap-8 justify-center mb-16">
            <div className="flex flex-col items-center">
              <div className="font-display text-4xl md:text-6xl text-white mb-2">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="font-mono text-[10px] tracking-widest text-white/30">DAYS</div>
            </div>
            <div className="font-display text-4xl md:text-6xl text-white/20 mb-2">:</div>
            <div className="flex flex-col items-center">
              <div className="font-display text-4xl md:text-6xl text-white mb-2">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="font-mono text-[10px] tracking-widest text-white/30">HOURS</div>
            </div>
            <div className="font-display text-4xl md:text-6xl text-white/20 mb-2">:</div>
            <div className="flex flex-col items-center">
              <div className="font-display text-4xl md:text-6xl text-white mb-2">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="font-mono text-[10px] tracking-widest text-white/30">MINUTES</div>
            </div>
            <div className="font-display text-4xl md:text-6xl text-white/20 mb-2">:</div>
            <div className="flex flex-col items-center w-12 text-center">
              <div className="font-display text-4xl md:text-6xl text-[#E8450A] mb-2">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="font-mono text-[10px] tracking-widest text-[#E8450A]/50">SECONDS</div>
            </div>
          </div>
        ) : (
          <div className="font-display text-4xl md:text-5xl text-white/50 mb-16 uppercase tracking-wide">
            BATCH 05 OPENING SOON
          </div>
        )}

        {/* RESERVATION CTA */}
        <div className="flex flex-col items-center group">
          <MagneticButton>
            <button 
              className="px-12 py-5 rounded-full bg-[#E8450A] text-white font-mono text-sm tracking-widest uppercase font-bold transition-transform hover:scale-[1.02] shadow-[0_0_30px_rgba(232,69,10,0.3)] hover:shadow-[0_0_40px_rgba(232,69,10,0.5)] flex items-center gap-3"
              disabled={isExpired}
              data-cursor="large"
            >
              RESERVE YOUR UNIT 
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </MagneticButton>
          
          <div className="mt-6 font-mono text-xs text-white/40 tracking-wide">
            Fully refundable deposit · Ships Q2 2025
          </div>
          
          {/* MICRO-COPY */}
          <div className="mt-8 font-body text-sm italic text-white/60 flex items-center gap-2">
            <span className="text-[#E8450A]">🔥</span> 12 riders reserved in the last 24 hours
          </div>
        </div>
      </div>
    </section>
  )
}
