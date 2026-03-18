'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'
import { RIDER_PROFILES } from '@/lib/data/community'
import MagneticButton from '../MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function SocialProofWall() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // Counter Animation
    gsap.to(counterRef.current, {
      innerText: 12400,
      duration: 2.5,
      snap: { innerText: 1 },
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
      onUpdate: function() {
        if (counterRef.current) {
          // Add comma formatting
          const val = Math.ceil(Number(this.targets()[0].innerText))
          counterRef.current.innerText = val.toLocaleString('en-US')
        }
      }
    })

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="community" className="bg-black py-32 overflow-hidden border-t border-white/[0.08]">
      <div className="container px-4 md:px-8">
        
        {/* COUNTER HEADER */}
        <div className="flex flex-col items-center justify-center mb-24 text-center">
          <div ref={counterRef} className="font-display font-black text-[clamp(6rem,12vw,10rem)] text-white leading-none tracking-tighter mb-4">
            0
          </div>
          <h2 className="font-mono text-sm md:text-base tracking-[0.3em] text-white/50 uppercase">
            RIDERS. 6 COUNTRIES. ONE STANDARD.
          </h2>
        </div>

        {/* MASONRY GRID */}
        {/* CSS Grid with varying heights per item based on RIDER_PROFILES.aspectRatio */}
        <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 auto-rows-[250px] lg:auto-rows-[300px]">
          {RIDER_PROFILES.map((rider, index) => {
            const isTall = rider.aspectRatio === 'tall'
            
            return (
              <div 
                key={rider.id}
                className={`relative group overflow-hidden bg-[#0a0a0a] border border-white/5 cursor-none ${
                    // Map items to rows manually or use simplified rowspan
                    isTall ? 'row-span-2' : 'row-span-1'
                }`}
                data-cursor="large"
              >
                {/* Image */}
                <Image 
                  src={rider.image}
                  alt={rider.name}
                  fill
                  className="object-cover brightness-60 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[0.4s] ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Orange Overlay */}
                <div className="absolute inset-0 bg-[#E8450A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s] pointer-events-none mix-blend-color" />

                {/* Info Card Overlay */}
                <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[0.4s]">
                  <div className="font-display text-2xl text-white uppercase tracking-wide leading-none">{rider.name}</div>
                  <div className="font-mono text-[10px] tracking-widest text-[#E8450A] uppercase">{rider.city}, {rider.country}</div>
                  <div className="font-body text-xs text-white/70 mt-1">{rider.stat}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-20 flex justify-center">
          <MagneticButton>
            <button className="btn-ghost group" data-cursor="large">
              VIEW ALL RIDERS
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2 text-[#E8450A]">→</span>
            </button>
          </MagneticButton>
        </div>

      </div>
    </section>
  )
}
