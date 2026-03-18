'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'
import { COMPARISON_DATA } from '@/lib/data/comparison'

gsap.registerPlugin(ScrollTrigger)

export default function ComparisonTable() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const rows = gsap.utils.toArray('.compare-row')
    
    gsap.fromTo(rows,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    )

    gsap.fromTo('.ridex-col-header',
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="compare" className="bg-[#050505] py-32 overflow-hidden border-t border-white/[0.08] relative">
      <div className="absolute top-6 left-8 font-mono text-[10px] text-white/20 tracking-widest z-50">
        08 / THE HONEST COMPARISON
      </div>

      <div className="container px-4 md:px-8">
        <div className="mb-16">
          <h2 className="section-heading">WHY RIDEX WINS.</h2>
        </div>

        <div className="w-full overflow-x-auto pb-8 scrollbar-hide">
          <div className="min-w-[800px] w-full bg-[#0d0d0d] rounded-2xl border border-white/5 overflow-hidden">
            
            {/* Header Row */}
            <div className="grid grid-cols-5 border-b border-white/[0.06] bg-[#0a0a0a]">
              <div className="p-6 font-mono text-xs tracking-widest text-white/40 uppercase flex items-end">
                FEATURE
              </div>
              <div className="ridex-col-header p-6 bg-[#E8450A]/[0.06] border-b-2 border-[#E8450A]">
                <div className="font-display text-2xl text-[#E8450A] uppercase tracking-wide">RIDEX PRO S</div>
              </div>
              <div className="p-6 font-display text-lg text-white/60 uppercase tracking-wide flex items-end">
                BRAND A
              </div>
              <div className="p-6 font-display text-lg text-white/60 uppercase tracking-wide flex items-end">
                BRAND B
              </div>
              <div className="p-6 font-display text-lg text-white/60 uppercase tracking-wide flex items-end">
                BRAND C
              </div>
            </div>

            {/* Data Rows */}
            <div className="flex flex-col">
              {COMPARISON_DATA.map((row, i) => (
                <div 
                  key={i} 
                  className={`compare-row grid grid-cols-5 border-b border-white/[0.06] transition-colors hover:bg-white/[0.04] ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                >
                  <div className="p-5 flex items-center font-body text-sm text-white/80">
                    {row.feature}
                  </div>
                  
                  <div className="p-5 flex items-center font-mono text-sm tracking-wide text-[#E8450A] bg-[#E8450A]/[0.02]">
                    {row.isCheck ? (
                      row.ridex === '✓' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E8450A]">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : <span className="text-white/30">✗</span>
                    ) : (
                      <span className="font-bold">{row.ridex}</span>
                    )}
                  </div>

                  <div className="p-5 flex items-center font-mono text-sm tracking-wide text-white/50">
                    {row.isCheck ? (
                      row.brandA === '✓' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : <span className="text-white/30">✗</span>
                    ) : row.brandA}
                  </div>

                  <div className="p-5 flex items-center font-mono text-sm tracking-wide text-white/50">
                    {row.isCheck ? (
                      row.brandB === '✓' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : <span className="text-white/30">✗</span>
                    ) : row.brandB}
                  </div>

                  <div className="p-5 flex items-center font-mono text-sm tracking-wide text-white/50">
                    {row.isCheck ? (
                      row.brandC === '✓' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : <span className="text-white/30">✗</span>
                    ) : row.brandC}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
