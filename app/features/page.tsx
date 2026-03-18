/* FIXES APPLIED:
 * [CRITICAL] Replaced manual ScrollTrigger logic with useGSAP to guarantee cleanup 
 * [BEST PRACTICE] Abstracted FAQs mapping into constant map and optimized markup
 * [PERFORMANCE] Replaced inline HTML styles causing Hydration issues
 */
'use client'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '@/components/ScrollReveal'
import PageTransition from '@/components/PageTransition'
import { useGSAP } from '@/hooks/useGSAP'
import { FAQ_ITEMS } from '@/lib/constants'
import FeatureCard from '@/components/FeatureCard'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesPage() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null)
  const horizontalContainerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useGSAP(() => {
    if (!horizontalSectionRef.current || !horizontalContainerRef.current) return

    const getScrollAmount = () => horizontalContainerRef.current!.scrollWidth - window.innerWidth

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: horizontalSectionRef.current,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        end: () => `+=${getScrollAmount()}`,
        onUpdate: (self) => setProgress(self.progress)
      }
    })

    tl.to(horizontalContainerRef.current, {
      x: () => -getScrollAmount(),
      ease: 'none'
    })
  }, { scope: horizontalSectionRef })

  return (
    <PageTransition>
      <div className="pt-24 bg-black min-h-screen">
        {/* HERO */}
        <section className="section overflow-hidden">
          <div className="container relative py-20">
            <ScrollReveal>
              <h1 className="display-heading text-center mb-8">ENGINEERED TO<br/><span className="text-[var(--color-accent)] drop-shadow-[0_0_8px_rgba(232,69,10,0.8)]">PERFECTION</span></h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} direction="up">
              <div className="relative w-full aspect-video md:aspect-[21/9] max-w-5xl mx-auto rounded-xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)] flex items-center justify-center group mb-16">
                <div className="absolute inset-0 bg-[var(--color-accent)]/5 opacity-50 z-0"></div>
                <div className="z-10 text-center font-mono text-[var(--color-text-muted)] text-sm tracking-widest uppercase">
                  [ Interactive Exploded View Placeholder ]
                  <br/><br/>
                  <span className="text-[var(--color-accent)] underline cursor-none group-hover:text-white transition-colors duration-300">EXPLORE COMPONENTS →</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* HORIZONTAL PINNED SCROLL SECTION */}
        <section ref={horizontalSectionRef} className="h-screen bg-black overflow-hidden relative border-y border-[var(--color-border)]">
          <div ref={horizontalContainerRef} className="flex h-full w-max flex-nowrap">
            <FeatureCard 
              number="01 / POWERTRAIN"
              title="MAGNETIC FLUX<br/>DRIVE SYSTEM"
              description="The heart of RideX is our proprietary magnetic flux motor. Completely silent, perfectly balanced, and capable of delivering instantaneous torque seamlessly aligned with your pedal cadence."
            />
            <FeatureCard 
              number="02 / ENERGY"
              title="STRUCTURAL<br/>CELL ARRAY"
              description="Unlike bolted-on batteries, our energy cells are woven directly into the downtube's carbon structure, reducing thermal mass and lowering the center of gravity to the physical floor."
            />
            <FeatureCard 
              number="03 / TELEMETRY"
              title="ON-BOARD<br/>INTELLIGENCE"
              description="Over 40 sensors pulse at 100Hz, analyzing tire slip, gradient, and heart rate via smartwatch integration to dynamically adjust assist levels before you even realize you need them."
            />
            <FeatureCard 
              number="04 / MATERIALS"
              title="AEROSPACE<br/>CARBON FIBER"
              description="Hand-laid T1000 carbon fiber ensures the stiffness required for absolute power transfer while absorbing high-frequency road chatter."
            />
          </div>

          <div className="absolute bottom-0 left-0 h-2 bg-[var(--color-text-muted)]/20 w-full z-10">
            <div 
              className="h-full bg-[var(--color-accent)]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </section>

        {/* TECH SPECS TABLE */}
        <section className="section bg-black">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <h2 className="section-heading mb-12">TECHNICAL SPECIFICATIONS</h2>
            </ScrollReveal>

            <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
              {[
                { label: "FRAME MATERIAL", value: "T1000 Multi-modulus Carbon Fiber" },
                { label: "MOTOR", value: "RideX Flux-Drive™ 750W Peak", highlight: true },
                { label: "BATTERY CAPACITY", value: "720Wh Integrally Mounted" },
                { label: "TOP SPEED", value: "45 km/h (Class 3 / S-Pedelec)", highlight: true },
                { label: "MAX RANGE", value: "340 km (Eco Mode)" },
                { label: "WEIGHT", value: "14.2 kg (Medium Frame)" },
                { label: "BRAKES", value: "Hydraulic 4-piston, 180mm Rotors w/ Regen" },
                { label: "DRIVETRAIN", value: "Carbon Belt Drive, Electronic 12-Speed Hub" }
              ].map((spec, i) => (
                <ScrollReveal direction="none" delay={0.05 * i} key={spec.label}>
                  <div 
                    className={`flex flex-col sm:flex-row sm:items-center border-b border-[var(--color-border)] p-6 hover:bg-[var(--color-surface)] transition-colors duration-300 ${i % 2 === 0 ? 'bg-transparent' : 'bg-black/50'}`}
                  >
                    <div className="w-full sm:w-1/3 font-mono text-sm tracking-wider text-[var(--color-text-muted)] mb-2 sm:mb-0 uppercase">
                      {spec.label}
                    </div>
                    <div className={`w-full sm:w-2/3 font-body text-base ${spec.highlight ? 'text-[var(--color-accent)] font-medium' : 'text-white'}`}>
                      {spec.value}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ACCORDION FAQ */}
        <section className="section bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="container max-w-3xl">
            <ScrollReveal>
              <h2 className="section-heading text-center mb-16">FREQUENTLY ASKED</h2>
            </ScrollReveal>

            <div className="flex flex-col gap-4">
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = openFaq === i
                return (
                  <div 
                    key={item.q}
                    className="bg-black border border-[var(--color-border)] overflow-hidden transition-all duration-300 cursor-pointer"
                    style={{
                      borderLeftWidth: isOpen ? '4px' : '1px',
                      borderLeftColor: isOpen ? 'var(--color-accent)' : 'var(--color-border)',
                    }}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    data-cursor="large"
                  >
                    <div className="p-6 flex justify-between items-center group">
                      <h4 className={`font-body font-medium text-lg transition-colors ${isOpen ? 'text-white' : 'text-[var(--color-text-secondary)] group-hover:text-white'}`}>
                        {item.q}
                      </h4>
                      <span className={`text-xl transition-transform duration-300 ${isOpen ? 'rotate-45 text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`}>
                        +
                      </span>
                    </div>
                    
                    <div 
                      className="px-6 font-body text-[var(--color-text-muted)] leading-relaxed transition-all duration-300 overflow-hidden"
                      style={{
                        maxHeight: isOpen ? '200px' : '0px',
                        paddingBottom: isOpen ? '1.5rem' : '0px',
                        opacity: isOpen ? 1 : 0
                      }}
                    >
                      {item.a}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
