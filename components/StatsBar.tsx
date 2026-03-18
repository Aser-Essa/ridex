/* FIXES APPLIED:
 * [CRITICAL] Wrapped ScrollTrigger creation in useGSAP to ensure cleanup on unmount
 * [BEST PRACTICE] Migrated hardcoded stats array to constants
 */
'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'
import { STATS_DATA } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function StatsBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const statsRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    if (!barRef.current) return

    ScrollTrigger.create({
      trigger: barRef.current,
      start: 'top 85%',
      onEnter: () => {
        statsRefs.current.forEach((el, index) => {
          if (!el || !STATS_DATA[index]) return
          const targetValue = STATS_DATA[index].value
          gsap.fromTo(el, 
            { textContent: "0" },
            { 
              textContent: targetValue.toString(),
              duration: 2,
              ease: 'power3.out',
              snap: { textContent: targetValue % 1 !== 0 ? 0.1 : 1 },
              modifiers: {
                textContent: (value: string) => {
                  return Number(value).toFixed(targetValue % 1 !== 0 ? 1 : 0)
                }
              }
            }
          )
        })
      },
      once: true
    })
  }, [])

  return (
    <div 
      ref={barRef}
      className="w-full relative z-20 bg-[var(--color-surface)] border-y border-[var(--color-border)]"
    >
      <div className="container px-0 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS_DATA.map((stat, i) => (
            <div 
              key={stat.label} 
              className={`flex flex-col items-center md:items-start justify-center text-center md:text-left py-12 px-8 ${i !== STATS_DATA.length - 1 ? 'md:border-r border-[var(--color-border)]' : ''} ${i % 2 === 0 ? 'border-r border-[var(--color-border)]' : ''} ${i < 2 ? 'border-b md:border-b-0 border-[var(--color-border)]' : ''}`}
            >
              <div className="flex items-baseline gap-1 font-display text-5xl font-extrabold text-white leading-none">
                <span ref={el => { if (el) statsRefs.current[i] = el }}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="mt-2 font-body text-sm text-[var(--color-text-secondary)] uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
