/* eslint-disable @next/next/no-img-element */
'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'

gsap.registerPlugin(ScrollTrigger)

export default function MaterialsAndCraft() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      }
    })

    tl.fromTo('.material-panel-1', 
      { x: -60, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.material-panel-2', 
      { x: 60, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.65'
    )
    .fromTo('.material-panel-3', 
      { x: 60, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="materials" className="bg-black py-32 overflow-hidden relative border-t border-white/[0.08]">
      <div className="absolute top-6 left-8 font-mono text-[10px] text-white/20 tracking-widest z-50">
        06 / THE DETAILS
      </div>

      <div className="container px-6 md:px-12 mb-16">
        <h2 className="section-heading text-white">MADE WITH OBSESSION.</h2>
      </div>

      {/* Asymmetric Grid */}
      <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row gap-2 md:gap-4 px-2 md:px-4 md:h-[80vh] min-h-[600px]">
        
        {/* Panel 1 (LARGE — left, 55% width, full height) */}
        <div className="material-panel-1 relative w-full md:w-[55%] h-[60vh] md:h-full overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1618365908648-e71bd5716cba?w=1200&q=80"
            alt="T1000 Carbon Fibre"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[0.6s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-[#E8450A]/20 opacity-0 group-hover:opacity-100 mix-blend-color transition-opacity duration-[0.6s] z-20 pointer-events-none" />
          
          <div className="absolute bottom-10 left-10 z-30 flex flex-col">
            <h3 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-white leading-none tracking-wide mb-2">T1000</h3>
            <span className="font-mono text-xs tracking-widest text-[#E8450A] uppercase">CARBON FIBRE</span>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#E8450A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.6s] ease-out z-40" />
        </div>

        {/* Right side wrapper */}
        <div className="w-full md:w-[45%] flex flex-col gap-2 md:gap-4 md:h-full">
          
          {/* Panel 2 (SMALL — top-right, 45% width, half height) */}
          <div className="material-panel-2 relative w-full h-[40vh] md:h-[50%] overflow-hidden group bg-[#0a0a0a]">
            <img 
              src="https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80"
              alt="7075 Aerospace Alloy"
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-[0.6s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            
            <div className="absolute bottom-8 left-8 z-30 flex flex-col">
              <h3 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl text-white leading-none tracking-wide mb-2">7075</h3>
              <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">AEROSPACE ALLOY</span>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E8450A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.6s] ease-out z-40" />
          </div>

          {/* Panel 3 (SMALL — bottom-right, 45% width, half height) */}
          <div className="material-panel-3 relative w-full h-[40vh] md:h-[50%] overflow-hidden group bg-[#0a0a0a]">
            <img 
              src="https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800&q=80"
              alt="Si3N4 Ceramic Bearings"
              className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-[0.6s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105 mix-blend-luminosity hover:mix-blend-normal"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            
            <div className="absolute bottom-8 left-8 z-30 flex flex-col">
              <h3 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl text-white leading-none tracking-wide mb-2">Si₃N₄</h3>
              <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">CERAMIC BEARINGS</span>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E8450A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.6s] ease-out z-40" />
          </div>

        </div>
      </div>

      <div className="container mt-24 text-center">
        <p className="font-mono text-sm tracking-widest text-white/40 max-w-2xl mx-auto leading-relaxed">
          Each component selected for a reason. None for aesthetics alone.
        </p>
      </div>
    </section>
  )
}
