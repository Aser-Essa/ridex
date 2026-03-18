/* FIXES APPLIED:
 * [ACCESSIBILITY] Added semantic ARIA carousel roles (region, roledescription, polite live region)
 * [BEST PRACTICE] Migrated hardcoded testimonial data to constants file
 */
'use client'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@/hooks/useGSAP'
import ScrollReveal from './ScrollReveal'
import { TESTIMONIALS } from '@/lib/constants'

export default function TestimonialSlider() {
  const [active, setActive] = useState(0)
  const slideRef = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP(() => {}, { scope: slideRef })

  const handleSlideChange = contextSafe((nextIndex: number) => {
    if (nextIndex === active || !slideRef.current) return

    gsap.to(slideRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => {
        setActive(nextIndex)
        gsap.fromTo(slideRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
        )
      }
    })
  })

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange((active + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [active, handleSlideChange])

  return (
    <section className="section bg-[var(--color-surface)] overflow-hidden" aria-roledescription="carousel" aria-label="Customer Testimonials">
      <div className="container relative">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="section-heading">RIDERS SPEAK</h2>
          </div>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto h-[350px] md:h-[250px] flex items-center justify-center">
          <div 
            className="absolute -top-10 md:-top-16 left-0 md:left-12 rotate-12 select-none pointer-events-none font-display text-[10rem] text-[var(--color-accent)] opacity-15 leading-none"
            aria-hidden="true"
          >
            &quot;
          </div>

          <div aria-live="polite" className="w-full">
            <div
              ref={slideRef}
              className="text-center relative z-10 px-4 md:px-16"
              role="group"
              aria-roledescription="slide"
              aria-label={`${active + 1} of ${TESTIMONIALS.length}`}
            >
              <p className="mb-8 text-[1.2rem] md:text-[1.5rem] font-body text-white italic leading-relaxed">
                &quot;{TESTIMONIALS[active]?.quote}&quot;
              </p>
              
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex gap-1 mb-2" aria-hidden="true">
                  {[...Array(TESTIMONIALS[active]?.rating || 5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--color-accent)">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
                <div className="font-mono text-[0.85rem] text-[var(--color-accent)] font-bold tracking-widest uppercase">
                  {TESTIMONIALS[active]?.name}
                </div>
                <div className="font-body text-sm text-[var(--color-text-muted)]">
                  {TESTIMONIALS[active]?.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSlideChange(i)}
              className="cursor-none transition-all duration-300 rounded-full"
              style={{
                width: active === i ? '24px' : '8px',
                height: '8px',
                backgroundColor: active === i ? 'var(--color-accent)' : 'var(--color-border)'
              }}
              data-cursor="large"
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={active === i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
