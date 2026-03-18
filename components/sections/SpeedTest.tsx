'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'

gsap.registerPlugin(ScrollTrigger)

export default function SpeedTest() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const needleRef = useRef<SVGGElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const arcFillRef = useRef<SVGPathElement>(null)

  // Using SVG circle with strokeDasharray and strokeDashoffset for speedometer arc

  useGSAP(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
      }
    })

    // Animate Number 0 to 45
    tl.to(numberRef.current, {
      innerText: 45,
      duration: 1.8,
      snap: { innerText: 1 },
      ease: 'power3.out'
    }, 0)

    // Animate Arc fill (assuming strokeDasharray is mapped to total length ~ 838 for R=200 circle slice)
    tl.fromTo(arcFillRef.current,
      { strokeDashoffset: 838 }, // max offset
      { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' },
      0
    )

    // Animate Needle
    // Total physical angle rotation needed is 240 degrees max (-120 to 120)
    tl.fromTo(needleRef.current,
      { rotation: -120, svgOrigin: '250 250' }, // start position
      { rotation: 120, duration: 2, ease: 'elastic.out(1.2, 0.5)' },
      0.1
    )

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="speed" className="w-full h-[80vh] min-h-[700px] bg-black relative flex flex-col justify-between items-center py-16 overflow-hidden">
      <div className="absolute top-6 left-8 font-mono text-[10px] text-white/20 tracking-widest z-50">
        05 / PERFORMANCE DATA
      </div>

      <div className="flex-grow w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center relative z-10 gap-16 md:gap-8 px-6">
        
        {/* CENTER-LEFT: Speedometer Arc */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative h-[400px]">
          <svg className="w-full max-w-[500px] h-full overflow-visible" viewBox="0 0 500 500">
            {/* Background Arc */}
            <path 
              d="M 76.8 350 A 200 200 0 1 1 423.2 350" 
              fill="none" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="12" 
              strokeLinecap="round" 
            />
            {/* Filled Arc Segment */}
            <path 
              ref={arcFillRef}
              d="M 76.8 350 A 200 200 0 1 1 423.2 350" 
              fill="none" 
              stroke="#E8450A" 
              strokeWidth="12" 
              strokeLinecap="round" 
              style={{ strokeDasharray: 838, strokeDashoffset: 838 }}
            />

            {/* Scale Numbers */}
            <text x="60" y="380" fill="rgba(255,255,255,0.5)" fontSize="16" fontFamily="monospace" textAnchor="middle">0</text>
            <text x="90" y="150" fill="rgba(255,255,255,0.5)" fontSize="16" fontFamily="monospace" textAnchor="middle">15</text>
            <text x="410" y="150" fill="rgba(255,255,255,0.5)" fontSize="16" fontFamily="monospace" textAnchor="middle">30</text>
            <text x="440" y="380" fill="#E8450A" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">45</text>

            {/* Needle Group */}
            <g ref={needleRef}>
              <circle cx="250" cy="250" r="15" fill="#1a1a1a" stroke="#E8450A" strokeWidth="4" />
              <path d="M 246 250 L 250 80 L 254 250 Z" fill="#E8450A" />
              <circle cx="250" cy="250" r="6" fill="#E8450A" />
            </g>
          </svg>
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,69,10,0.1),transparent_60%)] pointer-events-none" />
        </div>

        {/* CENTER-RIGHT: Typography Block */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
          <div className="font-mono text-xs tracking-widest text-[#E8450A] mb-4">ZERO TO</div>
          <div className="flex items-baseline gap-4 mb-8">
            <span ref={numberRef} className="font-display font-black text-[clamp(8rem,15vw,12rem)] text-white leading-none tracking-tighter">
              0
            </span>
            <span className="font-mono text-2xl text-[#E8450A] font-bold tracking-widest">
              KM/H
            </span>
          </div>
          
          <div className="w-full max-w-sm h-px bg-white/20 mb-6" />
          
          <p className="font-body text-xl text-white/50 tracking-wide max-w-md">
            In 4.2 seconds from a standing start. Experience instant torque and seamless power delivery.
          </p>
        </div>
      </div>

      {/* BOTTOM BAR: Specs */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/10 mt-12 grid grid-cols-1 md:grid-cols-3 divide-y-px md:divide-y-0 md:divide-x divide-white/10">
        <div className="py-6 px-6 md:px-12 flex justify-center text-center font-mono text-sm tracking-widest text-white/70 uppercase">
          0–45km/h in 4.2s
        </div>
        <div className="py-6 px-6 md:px-12 flex justify-center text-center font-mono text-sm tracking-widest text-[#E8450A] font-bold uppercase">
          Top speed: 45km/h
        </div>
        <div className="py-6 px-6 md:px-12 flex justify-center text-center font-mono text-sm tracking-widest text-white/70 uppercase">
          Range: 340km
        </div>
      </div>
    </section>
  )
}
