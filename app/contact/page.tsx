/* FIXES APPLIED:
 * [PERFORMANCE] Replaced inline form with reusable ContactForm component
 * [PERFORMANCE] Dropped 'use client' making the page a Server Component
 * [UX] Wrapped with PageTransition
 * [ACCESSIBILITY] Semantic links for social connections
 */
import ScrollReveal from '@/components/ScrollReveal'
import PageTransition from '@/components/PageTransition'
import ContactForm from '@/components/ContactForm'
import { FULL_SOCIAL_LINKS } from '@/lib/constants'

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="pt-24 md:pt-[calc(var(--nav-height)+4rem)] bg-black min-h-screen">
        <div className="container max-w-6xl pb-24">
          
          <div className="text-center mb-16">
            <ScrollReveal>
              <h1 className="display-heading mb-4">GET IN TOUCH</h1>
              <p className="font-body text-[var(--color-text-secondary)] max-w-lg mx-auto">
                Whether you have a question about features, pricing, or need test-ride arrangements — our team is ready to answer all your questions.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* LEFT: FORM */}
            <ScrollReveal direction="left" delay={0.2}>
              <ContactForm />
            </ScrollReveal>

            {/* RIGHT: CONTACT INFO */}
            <ScrollReveal direction="right" delay={0.4}>
              <div className="flex flex-col h-full justify-center gap-12">
                
                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[var(--color-accent)] bg-[var(--color-surface)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-300 flex-shrink-0 pointer-events-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl text-white uppercase mb-2">Headquarters</h4>
                    <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                      1400 RideX Blvd, Suite 100<br/>
                      San Francisco, CA 94107<br/>
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[var(--color-accent)] bg-[var(--color-surface)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-300 flex-shrink-0 pointer-events-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl text-white uppercase mb-2">Email Us</h4>
                    <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                      <a href="mailto:hello@ridex.com" className="hover:text-[var(--color-accent)] transition-colors" data-cursor="large">hello@ridex.com</a><br/>
                      <a href="mailto:support@ridex.com" className="hover:text-[var(--color-accent)] transition-colors" data-cursor="large">support@ridex.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[var(--color-accent)] bg-[var(--color-surface)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-300 flex-shrink-0 pointer-events-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl text-white uppercase mb-2">Call Us</h4>
                    <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                      <a href="tel:+18005550199" className="hover:text-[var(--color-accent)] transition-colors" data-cursor="large">+1 (800) 555-0199</a><br/>
                      <span className="text-[var(--color-text-muted)] text-sm">Mon-Fri 9am - 6pm PST</span>
                    </p>
                  </div>
                </div>

                {/* Social Icons row */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="font-mono text-xs tracking-widest text-[var(--color-text-muted)] mb-4 uppercase">Follow Us</div>
                  <div className="flex gap-4 items-center flex-wrap">
                    {FULL_SOCIAL_LINKS.map(social => (
                      <a 
                        key={social.platform}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors border-b border-transparent hover:border-[var(--color-accent)] pb-1 font-body text-sm cursor-none"
                        data-cursor="large"
                      >
                        {social.platform}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
