'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'
import MagneticButton from '../MagneticButton'
import { 
  FRAME_COLORS, 
  WHEEL_STYLES, 
  BATTERY_PACKS, 
  BASE_PRICE 
} from '@/lib/data/configurator'

gsap.registerPlugin(ScrollTrigger)

export default function BikeConfigurator() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const imageDisplayRef = useRef<HTMLImageElement>(null)
  
  const [activeColor, setActiveColor] = useState(FRAME_COLORS[0]!)
  const [activeWheel, setActiveWheel] = useState(WHEEL_STYLES[0]!)
  const [activeBattery, setActiveBattery] = useState(BATTERY_PACKS[0]!)
  const totalPrice = BASE_PRICE + (activeBattery?.priceDelta ?? 0)
  
  // Crossfade image transition on color change
  useEffect(() => {
    if (!imageDisplayRef.current) return
    
    gsap.fromTo(imageDisplayRef.current,
      { opacity: 0.5, filter: activeColor.filter },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
  }, [activeColor])

  useGSAP(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    })

    tl.fromTo(leftPanelRef.current, 
      { x: -60, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(rightPanelRef.current, 
      { scale: 0.95, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="configure" className="relative w-full min-h-dvh bg-black flex flex-col md:flex-row border-t border-white/8">
      <div className="absolute top-6 left-8 font-mono text-[10px] text-white/20 tracking-widest z-50">
        03 / CONFIGURE
      </div>

      {/* LEFT SIDE — CONFIGURATION PANEL (45%) */}
      <div 
        ref={leftPanelRef} 
        className="w-full md:w-[45%] h-auto bg-[#0a0a0a] z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 md:py-32"
      >
        <div className="label-text mb-4">— BUILD YOURS</div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-12 uppercase">
          CONFIGURE YOUR RIDEX
        </h2>

        {/* OPTION GROUP 1 — FRAME COLOR */}
        <div className="mb-8">
          <div className="font-mono text-xs text-white/60 tracking-widest uppercase mb-4">FRAME COLOR</div>
          <div className="flex items-center gap-4">
            {FRAME_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setActiveColor(color)}
                className={`relative w-10 h-10 rounded-full transition-all duration-300 group ${activeColor.id === color.id ? 'scale-110' : 'hover:scale-105'}`}
                style={{ backgroundColor: color.hex, border: `1px solid ${color.hex}` }}
                aria-label={`Select ${color.name} frame color`}
                title={color.label}
              >
                {activeColor.id === color.id && (
                  <div className="absolute -inset-[4px] rounded-full border-2 border-[#E8450A] transition-all" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* OPTION GROUP 2 — WHEEL STYLE */}
        <div className="mb-8">
          <div className="font-mono text-xs text-white/60 tracking-widest uppercase mb-4">WHEEL STYLE</div>
          <div className="flex gap-3">
            {WHEEL_STYLES.map((wheel) => (
              <button
                key={wheel.id}
                onClick={() => setActiveWheel(wheel)}
                className={`px-6 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 pointer-events-auto border ${
                  activeWheel.id === wheel.id 
                    ? 'bg-[#E8450A] text-white border-[#E8450A]' 
                    : 'bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white'
                }`}
              >
                {wheel.name}
              </button>
            ))}
          </div>
        </div>

        {/* OPTION GROUP 3 — BATTERY PACK */}
        <div className="mb-12">
          <div className="font-mono text-xs text-white/60 tracking-widest uppercase mb-4">BATTERY PACK</div>
          <div className="flex flex-col gap-3">
            {BATTERY_PACKS.map((pack) => (
              <button
                key={pack.id}
                onClick={() => setActiveBattery(pack)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  activeBattery.id === pack.id
                    ? 'border-transparent bg-white/[0.03] border-l-[3px] !border-l-[#E8450A]'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/[0.01]'
                }`}
              >
                <div className="font-display text-lg text-white tracking-wide">{pack.name}</div>
                <div className="font-mono text-[0.7rem] text-white/50 tracking-wide">{pack.specs}</div>
              </button>
            ))}
          </div>
        </div>

        {/* LIVE PRICE DISPLAY */}
        <div className="mb-8 pt-6 border-t border-white/10">
          <div className="font-mono text-[0.7rem] text-white/40 tracking-widest mb-1">FROM</div>
          <div className="font-display text-6xl text-white">${totalPrice.toLocaleString('en-US')}</div>
          <div className="font-mono text-[0.75rem] text-white/30 tracking-wide mt-2">
            — or ${(totalPrice / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo with financing
          </div>
        </div>

        {/* CTA BUTTON */}
        <MagneticButton>
          <button 
            className="w-full py-5 rounded-full bg-[#E8450A] text-white font-mono text-sm tracking-widest uppercase font-bold transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(232,69,10,0.3)]"
            data-cursor="large"
          >
            RESERVE THIS BUILD <span className="ml-2">→</span>
          </button>
        </MagneticButton>
      </div>

      {/* RIGHT SIDE — LIVE PREVIEW (55%) */}
      <div 
        ref={rightPanelRef}
        className="w-full md:w-[55%] h-[50vh] md:h-screen md:sticky md:top-0 relative flex items-center justify-center pointer-events-none px-4 md:px-12"
      >
        <div 
          className="absolute inset-0 bg-black z-0 pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative w-full h-[60%] flex items-center justify-center">
          <Image 
            ref={imageDisplayRef}
            src="/images/bike-hero.png" // The base image should be the neutral one, assuming bike-hero is decent
            alt="Configured Bike"
            fill
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            sizes="(max-width: 768px) 100vw, 55vw"
            priority
            style={{ filter: activeColor.filter }}
          />
        </div>

        {/* Spec Summary */}
        <div className="absolute bottom-12 left-0 w-full flex justify-center z-20">
          <div className="font-mono text-[0.75rem] text-white/40 tracking-widest uppercase border border-white/10 px-6 py-2 rounded-full backdrop-blur-md bg-black/40">
            {activeColor?.label} CARBON · {activeWheel?.name} WHEELS · {activeBattery?.name.toUpperCase()} · {activeBattery?.id === 'standard' ? '280KM' : activeBattery?.id === 'extended' ? '340KM' : '400KM'}
          </div>
        </div>
      </div>
    </section>
  )
}
