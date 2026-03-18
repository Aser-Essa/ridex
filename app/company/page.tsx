/* FIXES APPLIED:
 * [PERFORMANCE] Converted to Server Component 
 * [PERFORMANCE] Replaced img tags with optimized next/image
 * [BEST PRACTICE] Sourced founder data from centralized constants 
 * [UX] Wrapped with PageTransition
 */
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import PageTransition from '@/components/PageTransition'
import { FOUNDERS } from '@/lib/constants'

export default function CompanyPage() {
  return (
    <PageTransition>
      <div className="pt-[var(--nav-height)] bg-black min-h-screen">
        {/* HERO */}
        <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
          <Image 
            src="/images/rider.jpg"
            alt="Aerospace engineer working on bike"
            fill
            className="object-cover object-center brightness-50"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <h1 className="display-heading mb-4 drop-shadow-2xl">OUR STORY</h1>
            <p className="font-body text-[var(--color-text-secondary)] max-w-md mx-auto">
              Founded by a collective of aerospace engineers and racing champions obsessed with moving humanity forward.
            </p>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="section bg-black">
          <div className="container max-w-4xl relative">
            <div className="text-center mb-20">
              <h2 className="section-heading">THE JOURNEY</h2>
            </div>

            <div className="relative pl-8 md:pl-0 border-l-2 md:border-transparent md:flex md:flex-col md:items-center">
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -ml-[1px] w-[2px] bg-[var(--color-accent)]/20"></div>
              <div className="md:hidden absolute top-0 bottom-0 left-0 -ml-[1px] w-[2px] bg-[var(--color-accent)]/20"></div>

              {[
                { year: "2018", title: "Project Inception", desc: "First sketches of the magnetic flux motor in a small Munich garage." },
                { year: "2020", title: "Carbon Prototype", desc: "T1000 carbon frame successful testing out-performing traditional alloys by 40%." },
                { year: "2022", title: "RideX V1 Launch", desc: "The V1 sells out in 14 minutes. A new standard for urban mobility is set." },
                { year: "2024", title: "The Pro Collection", desc: "Re-engineered from the ground up featuring AI telemetry and structural battery tech." }
              ].map((event, i) => (
                <div key={event.year} className={`relative mb-16 md:mb-32 md:w-1/2 md:-ml-[50%] flex flex-col md:flex-row items-start ${i % 2 !== 0 ? 'md:ml-[50%] md:flex-row-reverse text-left' : 'text-left md:text-right'} w-full`}>
                  
                  {/* Timeline Node */}
                  <div className={`absolute -left-[41px] md:left-auto ${i % 2 !== 0 ? 'md:-left-[10px]' : 'md:-right-[10px]'} top-1 w-5 h-5 rounded-full bg-[var(--color-accent)] z-10 shadow-[0_0_20px_var(--color-accent-glow)]`}></div>
                  
                  <div className={`md:px-16 w-full ${i % 2 !== 0 ? 'pl-0' : 'pr-0'}`}>
                    <ScrollReveal direction={i % 2 === 0 ? "left" : "right"} delay={0.1}>
                      <div className="font-display text-4xl md:text-6xl text-[var(--color-text-muted)] opacity-30 leading-none mb-2 font-black">{event.year}</div>
                      <h3 className="font-display text-2xl text-white uppercase mb-4">{event.title}</h3>
                      <p className="font-body text-[var(--color-text-secondary)] leading-relaxed max-w-sm ml-auto mr-auto md:ml-0 md:mr-0 inline-block">
                        {event.desc}
                      </p>
                    </ScrollReveal>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM GRID */}
        <section id="team" className="section bg-[var(--color-surface)] border-t border-white/10">
          <div className="container">
            <div className="text-center mb-20">
              <h2 className="section-heading">THE FOUNDERS</h2>
              <p className="font-body text-[var(--color-text-muted)] mt-4">— Engineering Meets Design</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {FOUNDERS.map((founder, i) => (
                <ScrollReveal key={founder.name} direction="up" delay={i * 0.15}>
                  <div className="bg-black border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center group hover:border-[var(--color-accent)]/40 transition-colors duration-500 hover:-translate-y-2 transform">
                    <div className="relative w-32 h-32 rounded-full mb-6 p-1 border-2 border-transparent group-hover:border-[var(--color-accent)] transition-colors duration-500">
                      <div className="w-full h-full rounded-full overflow-hidden filter grayscale group-hover:grayscale-0 transition-all duration-500 relative">
                        <Image src={founder.img} alt={founder.name} fill className="object-cover" sizes="128px" />
                      </div>
                    </div>
                    
                    <h4 className="font-display text-2xl text-white uppercase mb-1 drop-shadow-lg">{founder.name}</h4>
                    <div className="font-mono text-[var(--color-accent)] text-xs tracking-widest uppercase">{founder.role}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION QUOTE */}
        <section className="section bg-black flex items-center justify-center min-h-[50vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,69,10,0.1)_0%,transparent_60%)]" />
          <div className="container max-w-4xl text-center relative z-10 px-6">
            <ScrollReveal direction="up" duration={1}>
              <div className="text-[var(--color-accent)] text-6xl font-display mb-6 opacity-50">&quot;</div>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-white leading-tight uppercase font-bold text-balance drop-shadow-2xl">
                We don&apos;t build bicycles. We engineer <span className="text-[var(--color-accent)] drop-shadow-[0_0_15px_var(--color-accent-glow)]">velocity</span> to elevate the human experience.
              </h2>
              <div className="mt-12 w-16 h-1 bg-white/20 mx-auto rounded-full"></div>
            </ScrollReveal>
          </div>
        </section>

        {/* PRESS LOGOS */}
        <section className="py-20 bg-[var(--color-surface)] border-t border-white/10">
          <div className="container">
            <p className="text-center font-mono text-sm tracking-widest text-[var(--color-text-muted)] mb-12 uppercase">Featured In</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale saturate-0 pointer-events-none">
              {['WIRED', 'GQ', 'FAST COMPANY', 'TECHCRUNCH', 'THE VERGE'].map((logo) => (
                <div key={logo} className="font-display text-2xl font-bold tracking-widest">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
