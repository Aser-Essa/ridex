'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROW1_TEXT = 'SPEED · PRECISION · FREEDOM · ENGINEERED · KEEP MOVING · '
const ROW2_TEXT = 'CARBON FRAME · AI BATTERY · REGENERATIVE · ZERO LIMITS · 340KM RANGE · '

export default function MarqueeTicker() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: 'top 90%' } }
    )
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="bg-black py-3 overflow-hidden border-y border-white/[0.08]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-row {
          display: flex;
          width: 200%;
        }
        .marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        .marquee-container:hover .marquee-left,
        .marquee-container:hover .marquee-right {
          animation-play-state: paused;
        }
        
        /* The proper way to slow down animation on hover with CSS without JS requires 
           more complex trickery or JS, but we can do a simple play state pause OR use JS */
      `}} />

      {/* Since pure CSS to change speed on hover is tough without changing play-state entirely,
          I will implement the CSS animation slowdown by updating the animation-duration safely
          via a class or inline style, but an easier CSS-only way is transitioning a custom variable with Houdini,
          or just using JS but we prioritize CSS. Let's use JS for the 20% speed as requested. */}

      <div 
        className="flex flex-col gap-2 group marquee-container cursor-none" 
        data-cursor="large"
      >
        {/* ROW 1: Left */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div 
            className="marquee-row font-display font-bold uppercase text-white transition-all duration-500 ease-out group-hover:transition-none"
            style={{ 
              fontSize: 'clamp(2.5rem,4vw,3.5rem)', 
              lineHeight: 1,
              animationName: 'marquee-left',
              animationDuration: '20s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
            onMouseEnter={(e) => e.currentTarget.style.animationDuration = '100s'}
            onMouseLeave={(e) => e.currentTarget.style.animationDuration = '20s'}
          >
            {[...Array(4)].map((_, i) => (
              <span key={`r1-${i}`} className="pr-4">{ROW1_TEXT}</span>
            ))}
          </div>
        </div>

        {/* ROW 2: Right */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div 
            className="marquee-row font-display font-bold uppercase text-transparent transition-all duration-500 ease-out group-hover:transition-none"
            style={{ 
              fontSize: 'clamp(1.5rem,2.5vw,2rem)', 
              lineHeight: 1,
              WebkitTextStroke: '1px white',
              animationName: 'marquee-right',
              animationDuration: '26s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
            onMouseEnter={(e) => e.currentTarget.style.animationDuration = '130s'}
            onMouseLeave={(e) => e.currentTarget.style.animationDuration = '26s'}
          >
            {[...Array(4)].map((_, i) => (
              <span key={`r2-${i}`} className="pl-4">{ROW2_TEXT}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
