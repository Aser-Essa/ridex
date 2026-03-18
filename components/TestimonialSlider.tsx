'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@/hooks/useGSAP'
import ScrollReveal from './ScrollReveal'
import { TESTIMONIALS } from '@/lib/constants'

// Note: Testimonials might not have images in original data, using a default
const defaultAvatar = 'https://images.unsplash.com/photo-1558981420-c532902e58b4?w=400&q=80'

export default function TestimonialSlider() {
  const [active, setActive] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP(() => {}, { scope: contentRef })

  const handleSlideChange = contextSafe((direction: 'next' | 'prev') => {
    if (isAnimating || !contentRef.current || !imageRef.current) return
    setIsAnimating(true)

    const nextIndex = direction === 'next' 
      ? (active + 1) % TESTIMONIALS.length 
      : (active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length

    const tl = gsap.timeline({
      onComplete: () => {
        setActive(nextIndex)
        gsap.fromTo(contentRef.current,
          { scaleY: 0, transformOrigin: 'bottom' },
          { scaleY: 1, duration: 0.5, ease: 'power2.out', onComplete: () => setIsAnimating(false) }
        )
        gsap.fromTo(imageRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
        )
      }
    })

    tl.to(contentRef.current, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0)
    
    tl.to(imageRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0)
  })

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange('next')
    }, 6000)
    return () => clearInterval(interval)
  }, [active, handleSlideChange])

  return (
    <section className="section bg-black overflow-hidden relative" aria-roledescription="carousel" aria-label="Customer Testimonials">
      <div className="absolute top-6 left-8 font-mono text-[10px] text-white/20 tracking-widest z-10 hidden md:block">
        07 / TESTIMONIALS
      </div>
      
      <div className="container relative mt-12 md:mt-0">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-center min-h-[500px] w-full gap-12 lg:gap-24 relative overflow-hidden pt-12">
            
            {/* Left Column - 35% */}
            <div className="w-full md:w-[35%] flex flex-col items-start relative z-10">
              <div className="absolute -top-16 -left-8 text-[12rem] text-[#E8450A]/10 font-display leading-none select-none pointer-events-none">
                &quot;
              </div>
              
              <div ref={imageRef} className="relative z-10">
                <div className="w-[120px] h-[120px] rounded-full p-1 border-2 border-[#E8450A] mb-8 relative">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image 
                      src={defaultAvatar} 
                      alt={TESTIMONIALS[active]?.name || 'Rider'} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="font-mono text-[1rem] text-[#E8450A] font-bold tracking-widest uppercase mb-1">
                  {TESTIMONIALS[active]?.name}
                </div>
                <div className="font-body text-[0.9rem] text-white/60 uppercase tracking-wider">
                  {TESTIMONIALS[active]?.role}
                </div>
              </div>
            </div>

            {/* Right Column - 65% */}
            <div className="w-full md:w-[65%] flex flex-col justify-center">
              <div ref={contentRef} className="overflow-hidden py-4">
                <h3 className="font-display italic text-[clamp(1.8rem,3vw,2.8rem)] text-white leading-[1.2] mb-8 tracking-wide">
                  &quot;{TESTIMONIALS[active]?.quote}&quot;
                </h3>
              </div>
              
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex justify-start gap-1" aria-hidden="true">
                  {[...Array(TESTIMONIALS[active]?.rating || 5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#E8450A">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
                
                <button 
                  className="group flex items-center gap-3 w-fit text-white/80 hover:text-white transition-colors"
                  aria-label={`Watch ${TESTIMONIALS[active]?.name}'s full story`}
                  data-cursor="large"
                >
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#E8450A] transition-colors">
                    <svg width="12" height="14" viewBox="0 0 18 22" fill="none">
                      <path d="M17 11L1 20.2376L1 1.76237L17 11Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="font-mono text-sm tracking-widest">
                    WATCH {TESTIMONIALS[active]?.name.split(' ')[0]}&apos;S FULL STORY <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1 text-[#E8450A]">→</span>
                  </span>
                </button>
              </div>
            </div>
            
          </div>
        </ScrollReveal>

        {/* Custom Navigation */}
        <div className="flex items-center gap-8 mt-16 pt-8 border-t border-white/10 w-full justify-between md:justify-end">
          <button 
            onClick={() => handleSlideChange('prev')}
            className={`font-mono text-xl tracking-widest transition-colors hover:text-[#E8450A] pr-4 ${isAnimating ? 'pointer-events-none' : ''}`}
            data-cursor="large"
          >
            ← 0{active === 0 ? TESTIMONIALS.length : active}
          </button>
          
          <div className="flex gap-2 font-mono text-sm">
            {TESTIMONIALS.map((_, idx) => (
              <span key={idx} className={idx === active ? 'text-[#E8450A]' : 'text-white/30'}>
                0{idx + 1}
              </span>
            ))}
          </div>

          <button 
            onClick={() => handleSlideChange('next')}
            className={`font-mono text-xl tracking-widest transition-colors hover:text-[#E8450A] pl-4 ${isAnimating ? 'pointer-events-none' : ''}`}
            data-cursor="large"
          >
            0{active === TESTIMONIALS.length - 1 ? 1 : active + 2} →
          </button>
        </div>
      </div>
    </section>
  )
}
