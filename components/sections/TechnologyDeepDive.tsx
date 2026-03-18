'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'
import { TECH_PANELS } from '@/lib/data/technology'

gsap.registerPlugin(ScrollTrigger)

export default function TechnologyDeepDive() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  useGSAP(() => {
    if (!sectionRef.current || !wrapperRef.current || !panelsRef.current) return

    const panels = gsap.utils.toArray('.tech-panel') as HTMLElement[]
    
    // Total scroll distance depends on number of panels
    const totalScroll = 100 * (panels.length - 1)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: `+=${totalScroll}%`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          // Update active tab based on progress
          const progress = self.progress
          const activeIndex = Math.min(
            panels.length - 1,
            Math.floor(progress * panels.length)
          )
          setActiveTab(activeIndex)

          // Update progress bar
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleX: progress })
          }
        }
      }
    })

    tlRef.current = tl

    // Horizontal scroll
    tl.to(panelsRef.current, {
      xPercent: -100 * (panels.length - 1) / panels.length,
      ease: 'none'
    })

    // Animations per panel when they come into view
    // Since it's horizontally scrubbing, we can use ScrollTrigger containerAnimation
    panels.forEach((panel, i) => {
      // Find internal elements to animate
      const stats = panel.querySelector('.tech-stat')
      const visual = panel.querySelector('.tech-visual')
      
      gsap.from(stats, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: panel,
          containerAnimation: tl,
          start: 'left center',
          toggleActions: 'play none none reverse'
        }
      })
      
      gsap.from(visual, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        scrollTrigger: {
          trigger: panel,
          containerAnimation: tl,
          start: 'left center',
          toggleActions: 'play none none reverse'
        }
      })
    })

  }, { scope: sectionRef })

  const scrollToPanel = (index: number) => {
    if (!tlRef.current || !tlRef.current.scrollTrigger) return
    const st = tlRef.current.scrollTrigger
    const startY = st.start
    const endY = st.end
    const progress = index / (TECH_PANELS.length - 1)
    const scrollTarget = startY + (endY - startY) * progress
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} id="technology" className="bg-black relative overflow-hidden">
      <div className="absolute top-6 left-8 font-mono text-[10px] text-white/20 tracking-widest z-50">
        04 / TECHNOLOGY
      </div>

      <div ref={wrapperRef} className="h-screen w-full flex flex-col pt-24 pb-8">
        
        {/* PANEL NAVIGATION */}
        <div className="container px-6 md:px-12 flex flex-col gap-4 mb-4 z-20">
          <div className="flex items-center gap-12 font-mono text-xl md:text-2xl tracking-widest text-white/30">
            {TECH_PANELS.map((_, i) => (
              <button 
                key={i}
                onClick={() => scrollToPanel(i)}
                className={`transition-colors duration-300 ${activeTab === i ? 'text-[#E8450A]' : 'hover:text-white'}`}
                data-cursor="large"
              >
                0{i + 1}
              </button>
            ))}
          </div>
          <div className="w-full max-w-xl h-[2px] bg-white/10 relative overflow-hidden">
            <div 
              ref={progressBarRef}
              className="absolute inset-0 bg-[#E8450A] origin-left scale-x-0"
            />
          </div>
        </div>

        {/* HORIZONTAL PANELS */}
        <div className="flex-grow w-full overflow-hidden relative">
          <div 
            ref={panelsRef}
            className="flex h-full"
            style={{ width: `${TECH_PANELS.length * 100}vw` }}
          >
            {TECH_PANELS.map((panel, i) => (
              <div 
                key={panel.id}
                className="tech-panel w-screen h-full flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-24"
              >
                {/* Left 40%: Text content */}
                <div className="w-full lg:w-[40%] flex flex-col justify-center h-full pr-0 lg:pr-16 pt-8 lg:pt-0">
                  <div className="font-mono text-sm tracking-widest text-white/50 mb-6">{panel.label}</div>
                  <h3 className="font-display text-4xl md:text-5xl text-white uppercase mb-8">{panel.heading}</h3>
                  <p className="font-body text-lg text-white/70 leading-relaxed mb-12 max-w-md">
                    {panel.body}
                  </p>
                  
                  <div className="tech-stat flex flex-col gap-2">
                    <div className="font-display text-7xl md:text-8xl text-[#E8450A] leading-none">{panel.stat}</div>
                    <div className="font-mono text-sm tracking-widest text-white/50 uppercase">{panel.statLabel}</div>
                  </div>
                </div>

                {/* Right 60%: Visual content */}
                <div className="w-full lg:w-[60%] h-full flex items-center justify-center p-8 lg:p-16">
                  <div className="tech-visual w-full h-full max-h-[600px] rounded-3xl bg-[#0a0a0a] border border-white/5 relative overflow-hidden flex items-center justify-center group flex-col p-8">
                    
                    {/* Unique Visual per Panel */}
                    {panel.id === 'power' && (
                      <div className="w-full flex-col flex items-center gap-12">
                        {/* Battery Fill Box */}
                        <div className="w-64 h-32 border-2 border-white/20 rounded-xl relative p-2 flex overflow-hidden">
                          <div className="h-full bg-[#E8450A] rounded-md transition-all duration-[2s] ease-out w-[94%]" />
                          <div className="absolute inset-0 m-auto text-white font-display text-4xl font-bold flex items-center justify-center mix-blend-difference">94%</div>
                        </div>
                        {/* Data rows */}
                        <div className="w-full max-w-md flex flex-col gap-4 font-mono text-xs tracking-widest text-white/60">
                          <div className="flex justify-between items-center bg-white/5 p-3 rounded">
                            <span>Efficiency gain per cycle</span>
                            <span className="text-[#E8450A]">+2.3%</span>
                          </div>
                          <div className="flex justify-between items-center bg-white/5 p-3 rounded">
                            <span>Predictive charge accuracy</span>
                            <span className="text-white">97%</span>
                          </div>
                          <div className="flex justify-between items-center bg-white/5 p-3 rounded">
                            <span>Cold weather performance</span>
                            <span className="text-white/40">-8% only</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {panel.id === 'structure' && (
                      <div className="w-full h-full relative flex items-center justify-center">
                        <svg className="w-full h-full max-w-lg" viewBox="0 0 400 300" fill="none">
                          {/* Stylized Frame Lines */}
                          <path d="M50 250 L150 100 L300 100 L250 250 Z" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                          <path d="M150 100 L180 250" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                          <path d="M300 100 L350 250" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                          {/* Hotspots */}
                          <circle cx="150" cy="100" r="6" fill="#E8450A" className="animate-pulse" />
                          <circle cx="300" cy="100" r="6" fill="#E8450A" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                          <circle cx="250" cy="250" r="6" fill="#E8450A" className="animate-pulse" style={{ animationDelay: '1s' }} />
                        </svg>
                      </div>
                    )}

                    {panel.id === 'recover' && (
                      <div className="w-full max-w-md flex flex-col items-center gap-8">
                        {/* Flow Diagram */}
                        <div className="flex items-center justify-between w-full font-mono text-xs tracking-widest text-white/50">
                          <div className="w-24 h-24 rounded-full border border-white/20 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/5 border-t border-[#E8450A] animate-spin rounded-full" style={{ animationDuration: '3s' }} />
                            <span>KINETIC</span>
                          </div>
                          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#E8450A] to-transparent bg-[length:200%_100%] animate-[bg-pan_2s_linear_infinite]" />
                          <div className="w-24 h-24 rounded-full border border-[#E8450A] flex flex-col items-center justify-center text-[#E8450A] shadow-[0_0_20px_rgba(232,69,10,0.2)]">
                            <span>BATTERY</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {panel.id === 'connect' && (
                      <div className="w-full h-full flex justify-center items-center">
                        {/* Phone Mockup */}
                        <div className="w-64 h-[500px] rounded-[3rem] border-[6px] border-[#1a1a1a] bg-black relative p-6 flex flex-col gap-6 overflow-hidden shadow-2xl">
                          <div className="w-32 h-6 bg-[#1a1a1a] absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl" />
                          <div className="mt-8 font-mono text-[10px] text-[#E8450A] tracking-widest">RIDEX APP RUNNING</div>
                          <div className="w-full h-32 rounded-xl border border-white/10 flex items-center justify-center relative bg-white/[0.02]">
                            <svg className="w-24 h-24" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" strokeDasharray="251" strokeDashoffset="60" />
                              <circle cx="50" cy="50" r="40" stroke="#E8450A" strokeWidth="8" fill="none" strokeDasharray="251" strokeDashoffset="120" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 m-auto flexitems-center justify-center flex flex-col text-center pt-[30px]">
                              <span className="font-display text-2xl text-white leading-none">42</span>
                              <span className="font-mono text-[8px] text-white/50">KM/H</span>
                            </div>
                          </div>
                          <div className="flex-1 rounded-xl bg-white/[0.02] border border-white/10 relative overflow-hidden p-4 flex flex-col">
                            <span className="font-mono text-[10px] text-white/40 mb-2">LIVE LOCATION</span>
                            <div className="flex-1 border border-white/5 rounded-lg relative overflow-hidden bg-[#050505]">
                              {/* Map lines */}
                              <svg className="absolute inset-0 w-full h-full opacity-20" fill="none">
                                <path d="M0 50 Q 80 100 150 20 T 300 80" stroke="#E8450A" strokeWidth="2" />
                              </svg>
                              <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-[#E8450A] rounded-full shadow-[0_0_10px_rgba(232,69,10,0.8)] animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bg-pan {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />
    </section>
  )
}
