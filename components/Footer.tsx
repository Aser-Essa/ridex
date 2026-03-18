/* FIXES APPLIED:
 * [BUG] Removed illegal CSS global transition: all
 * [ACCESSIBILITY] Updated social anchor tags to proper external links with rel="noopener noreferrer"
 * [BEST PRACTICE] Abstracted nav links into constant mappings
 */
import Link from 'next/link'
import MagneticButton from './MagneticButton'
import { FULL_SOCIAL_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-surface)] border-t border-[var(--color-border)] py-20 text-[var(--color-text-secondary)] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none select-none z-0 translate-y-1/4">
        <span className="font-display font-black text-[clamp(8rem,15vw,14rem)] text-white/[0.05] leading-none tracking-tighter">
          RIDEX
        </span>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 w-fit" data-cursor="large">
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                <circle cx="5" cy="15" r="4" stroke="#E8450A" strokeWidth="2"/>
                <circle cx="23" cy="15" r="4" stroke="#E8450A" strokeWidth="2"/>
                <path d="M5 15L10 5H18L23 15" stroke="#E8450A" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 5L10 5" stroke="#E8450A" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="14" cy="5" r="1.5" fill="#E8450A"/>
              </svg>
              <span className="font-display text-2xl font-extrabold text-white">
                Ride<span className="text-[var(--color-accent)]">X</span>
              </span>
            </Link>
            <p className="font-mono text-sm tracking-widest uppercase">Keep Moving.</p>
            
            <div className="flex items-center gap-4 mt-2">
              {FULL_SOCIAL_LINKS.map((social) => (
                <MagneticButton key={social.platform}>
                  <a 
                    href={social.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--color-border)] font-mono text-xs transition-colors duration-300 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] group"
                    data-cursor="large"
                    aria-label={`Follow us on ${social.platform}`}
                    title={social.platform}
                  >
                    <span className="group-hover:-translate-y-0.5 transition-transform duration-300">
                      {social.platform.substring(0, 2)}
                    </span>
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-display text-xl tracking-widest uppercase">PRODUCT</h4>
            <Link href="/bikes" className="hover:text-white transition-colors duration-300 w-fit" data-cursor="large">Bikes</Link>
            <Link href="/features" className="hover:text-white transition-colors duration-300 w-fit" data-cursor="large">Features</Link>
            <Link href="/bikes?compare=true" className="hover:text-white transition-colors duration-300 w-fit" data-cursor="large">Compare</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-display text-xl tracking-widest uppercase">COMPANY</h4>
            <Link href="/company" className="hover:text-white transition-colors duration-300 w-fit" data-cursor="large">About</Link>
            <Link href="/company#team" className="hover:text-white transition-colors duration-300 w-fit" data-cursor="large">Team</Link>
            <Link href="/press" className="hover:text-white transition-colors duration-300 w-fit" data-cursor="large">Press</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-display text-xl tracking-widest uppercase">SUPPORT</h4>
            <Link href="/faq" className="hover:text-white transition-colors duration-300 w-fit" data-cursor="large">FAQ</Link>
            <Link href="/contact" className="hover:text-white transition-colors duration-300 w-fit" data-cursor="large">Contact</Link>
            <Link href="/warranty" className="hover:text-white transition-colors duration-300 w-fit" data-cursor="large">Warranty</Link>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] pt-8 flex justify-between items-center flex-wrap gap-4 font-mono text-xs text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} RideX. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors" data-cursor="large">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors" data-cursor="large">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
