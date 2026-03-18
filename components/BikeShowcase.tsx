'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton'
import { useGSAP } from '@/hooks/useGSAP'
import { BIKES_DATA } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

function BikeCard({ bike }: { bike: typeof BIKES_DATA[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Removed 3D tilt logic following user request

  return (
    <div 
      ref={cardRef}
      className="bike-card group relative shrink-0 w-[85vw] sm:w-[380px] md:w-auto h-[520px] rounded-lg snap-center flex flex-col justify-between cursor-none transition-colors duration-500 bg-surface-2 border border-(--color-border) hover:border-[rgba(232,69,10,0.4)]"
      data-cursor="large"
    >
      {bike.badge && (
        <div className="absolute top-6 right-6 z-20 px-4 py-1.5 rounded-full bg-black/60 shadow-[0_0_15px_rgba(232,69,10,0.4)] backdrop-blur-md text-[#E8450A] border border-[#E8450A] font-mono text-[0.7rem] font-bold tracking-[0.1em]">
          {bike.badge}
        </div>
      )}

      {/* Upper half: Image */}
      <div className="relative h-[60%] w-full flex items-center justify-center p-6 pointer-events-none">
        <div 
          className="absolute inset-0 m-auto rounded-full w-[250px] h-[250px] z-0 opacity-40 group-hover:opacity-70 transition-opacity duration-500 blur-[30px]"
          style={{ background: 'radial-gradient(circle, rgba(232, 69, 10, 0.4) 0%, transparent 60%)' }}
        />
        <div ref={imageRef} className="relative z-10 w-full h-full">
          <Image 
            src={bike.image} 
            alt={bike.name} 
            fill
            className="object-contain drop-shadow-2xl" 
            sizes="(max-width: 640px) 85vw, 400px"
          />
        </div>
      </div>

      {/* Lower half: content */}
      <div className="p-8 border-t border-[rgba(255,255,255,0.04)] bg-black/20 grow flex flex-col justify-end pointer-events-none">
        <h3 className="font-display text-[1.6rem] uppercase text-white mb-2">
          {bike.name}
        </h3>
        
        {/* Spec Reveal on Hover */}
        <div className="flex items-center gap-3 mb-6 flex-wrap overflow-hidden h-[24px]">
          {bike.specs.map((spec, s_i) => (
            <div 
              key={s_i} 
              className="flex items-center gap-3 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
              style={{ transitionDelay: `${s_i * 0.05}s` }}
            >
              <span className="font-body text-[0.85rem] text-[var(--color-text-secondary)]">
                {spec}
              </span>
              {s_i < bike.specs.length - 1 && (
                <span className="block w-1 h-1 rounded-full bg-[#E8450A]" />
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
          
          <div className="pb-1 pointer-events-auto">
            <MagneticButton>
              <button className="btn-ghost group" data-cursor="large">
                VIEW DETAILS
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1 text-[#E8450A]">→</span>
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BikeShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState('ALL')
  
  const tabs = ['ALL', 'URBAN', 'MOUNTAIN', 'ROAD']

  // Assuming data structure: bike.type might not exist in original but we can fake it via name or add it to types if we updated constants
  // For safety, checking type, else name
  const filteredBikes = BIKES_DATA.filter((bike) => {
    if (activeTab === 'ALL') return true
    const type = 'type' in bike ? String(bike.type) : '';
    if (type) return type.toUpperCase() === activeTab;
    return bike.name.toUpperCase().includes(activeTab);
  }).slice(0, 3)

  const handleTabClick = (tab: string) => {
    if (tab === activeTab || !cardsContainerRef.current) return
    
    gsap.to('.bike-card', {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        setActiveTab(tab)
      }
    })
  }

  // Effect to animate new cards in
  useEffect(() => {
    gsap.fromTo('.bike-card',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
    )
  }, [activeTab])

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
    <section ref={sectionRef} id="bikes" className="section bg-black relative">
      <div className="absolute top-6 left-8 font-mono text-[10px] text-white/20 tracking-widest z-10 hidden md:block">
        02 / BIKES
      </div>
      
      <div className="container mt-12 md:mt-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="section-heading">OUR BIKES</h2>
            <div className="label-text mt-2">— 2024 COLLECTION</div>
          </div>
          
          <div className="flex items-center gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`font-mono text-sm tracking-widest transition-all duration-300 pb-1 border-b-2 whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-white border-[#E8450A]' 
                    : 'text-white/40 border-transparent hover:text-white/70'
                }`}
                data-cursor="large"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div ref={cardsContainerRef} className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide gap-6 md:grid md:grid-cols-3 md:pb-0 md:overflow-visible sm:gap-8 justify-start">
          {filteredBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>
    </section>
  )
}
