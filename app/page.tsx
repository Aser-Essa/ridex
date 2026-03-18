/* FIXES APPLIED:
 * [PERFORMANCE] Transformed to Server Component for static generation
 * [CRITICAL] Dropped 'use client' allowing proper metadata exports from layout 
 * [BEST PRACTICE] Replaced inner DOM particles with safe React loops
 * [ACCESSIBILITY] Used next/link instead of href tags
 */
import HeroSection from '@/components/HeroSection'
import StatsBar from '@/components/StatsBar'
import BikeShowcase from '@/components/BikeShowcase'
import TestimonialSlider from '@/components/TestimonialSlider'
import ScrollReveal from '@/components/ScrollReveal'
import MagneticButton from '@/components/MagneticButton'
import PageTransition from '@/components/PageTransition'
import Link from 'next/link'

export default function Home() {
  return (
    <PageTransition>
      <div className="bg-black min-h-screen">
        <HeroSection />
        <StatsBar />
        <BikeShowcase />

        {/* PROMO SECTION */}
        <section className="section py-32 bg-black border-t border-[var(--color-border)]">
          <div className="container max-w-5xl text-center">
            <ScrollReveal>
              <h2 className="display-heading mb-6">ENGINEERED FOR<br/><span className="text-[var(--color-accent)]">EVERYDAY EXCELLENCE</span></h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="up">
              <p className="font-body text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto mb-12">
                Every component of a RideX bicycle is fundamentally reconsidered to deliver the most intuitive, powerful, and seamless riding experience ever created.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <MagneticButton>
                  <Link href="/features" className="btn-primary cursor-none" data-cursor="large">
                    EXPLORE FEATURES
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/contact" className="btn-ghost cursor-none" data-cursor="large">
                    BOOK TEST RIDE
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <TestimonialSlider />

        {/* NEWSLETTER */}
        <section className="section bg-[var(--color-surface)] border-t border-[var(--color-border)] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--color-accent)] rounded-[100%] blur-[150px] opacity-10 pointer-events-none" />
          
          <div className="container max-w-3xl text-center relative z-10">
            <ScrollReveal>
              <div className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase mb-4">Join the vanguard</div>
              <h2 className="section-heading mb-6">STAY IN THE LOOP</h2>
              <p className="font-body text-[var(--color-text-secondary)] mb-10">
                Subscribe to our dispatch for early access to new models, exclusive events, and technical deep dives. No spam, ever.
              </p>

              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" aria-label="Newsletter signup">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  aria-label="Email address"
                  className="bg-black border border-[var(--color-border)] rounded-full px-6 py-4 outline-none text-white font-body text-sm w-full transition-colors duration-300 focus:border-[var(--color-accent)]"
                  data-cursor="large"
                  required
                />
                <MagneticButton>
                  <button type="submit" className="btn-primary w-full sm:w-auto h-full px-8 py-4 sm:py-0 whitespace-nowrap cursor-none" data-cursor="large">
                    SUBSCRIBE
                  </button>
                </MagneticButton>
              </form>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
