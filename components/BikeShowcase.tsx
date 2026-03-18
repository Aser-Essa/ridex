/* FIXES APPLIED:
 * [PERFORMANCE] Optimised with next/image, safe useGSAP hook
 * [BUG] Removed dangerous inner html for styles
 * [BEST PRACTICE] Migrated hardcoded data to constants file
 */
'use client'
import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton'
import { useGSAP } from '@/hooks/useGSAP'
import { BIKES_DATA } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function BikeShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const showcaseBikes = BIKES_DATA.slice(0, 3)

  useGSAP(() => {
    if (!sectionRef.current) return

    gsap.fromTo('.bike-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="bikes" className="section bg-black">
      <div className="container">
        <div className="mb-12">
          <h2 className="section-heading">OUR BIKES</h2>
          <div className="label-text mt-2">— 2024 COLLECTION</div>
        </div>

        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide gap-6 md:grid md:grid-cols-3 md:pb-0 md:overflow-visible sm:gap-8">
          {showcaseBikes.map((bike) => (
            <div 
              key={bike.id}
              className="bike-card group relative flex-shrink-0 w-[85vw] sm:w-[380px] md:w-auto h-[520px] rounded-[var(--radius-lg)] snap-center overflow-hidden flex flex-col justify-between cursor-none transition-all duration-500 bg-[var(--color-surface-2)] border border-[var(--color-border)] hover:border-[rgba(232,69,10,0.4)] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_40px_var(--color-accent-glow)]"
              data-cursor="large"
            >
              {/* Badges */}
              {bike.badge && (
                <div 
                  className="absolute top-6 right-6 z-20 px-4 py-1.5 rounded-full bg-black/60 shadow-[0_0_15px_rgba(232,69,10,0.4)] backdrop-blur-md text-[var(--color-accent)] border border-[var(--color-accent)] font-mono text-[0.7rem] font-bold tracking-[0.1em]"
                >
                  {bike.badge}
                </div>
              )}

              {/* Upper half: Image */}
              <div className="relative h-[55%] w-full flex items-center justify-center p-6">
                <div 
                  className="absolute inset-0 m-auto rounded-full w-[250px] h-[250px] z-0 opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none blur-[30px]"
                  style={{
                    background: 'radial-gradient(circle, rgba(232, 69, 10, 0.4) 0%, transparent 60%)',
                  }}
                />
                <Image 
                  src={bike.image} 
                  alt={bike.name} 
                  fill
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 pointer-events-none p-4" 
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 380px, 33vw"
                />
              </div>

              {/* Lower half: content */}
              <div className="p-8 border-t border-[rgba(255,255,255,0.04)] bg-black/20 flex-grow flex flex-col justify-end">
                <h3 className="font-display text-[1.6rem] uppercase text-white mb-4">
                  {bike.name}
                </h3>
                
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  {bike.specs.map((spec, s_i) => (
                    <div key={s_i} className="flex items-center gap-3">
                      <span className="font-body text-[0.85rem] text-[var(--color-text-secondary)]">
                        {spec}
                      </span>
                      {s_i < bike.specs.length - 1 && (
                        <span className="block w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-end justify-between w-full mt-auto">
                  <div>
                    <div className="font-body text-[0.75rem] text-[var(--color-text-muted)] mb-1">
                      Starting at
                    </div>
                    <div className="font-display text-[2.2rem] text-white leading-none">
                      {bike.price}
                    </div>
                  </div>
                  
                  <div className="pb-1">
                    <MagneticButton>
                      <button className="btn-ghost group" data-cursor="large">
                        VIEW DETAILS
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1 text-accent">→</span>
                      </button>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
