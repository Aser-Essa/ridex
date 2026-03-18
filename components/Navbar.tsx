/* FIXES APPLIED:
 * [ACCESSIBILITY] Correct semantic roles, aria-expanded
 * [PERFORMANCE] Passive event listeners, GSAP context cleanup
 * [BEST PRACTICE] Sourced nav links from constants
 */
'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import MagneticButton from './MagneticButton'
import { NAV_LINKS } from '@/lib/constants'
import { useGSAP } from '@/hooks/useGSAP'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const menuOverlayRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useGSAP(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { opacity: 0, y: -24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
    }
  }, [])

  useGSAP(() => {
    if (menuOverlayRef.current) {
      if (menuOpen) {
        gsap.to(menuOverlayRef.current, {
          clipPath: 'circle(150% at 100% 0%)',
          duration: 0.8,
          ease: 'power3.inOut'
        })
      } else {
        gsap.to(menuOverlayRef.current, {
          clipPath: 'circle(0% at 100% 0%)',
          duration: 0.8,
          ease: 'power3.inOut'
        })
      }
    }
  }, [menuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2.5rem',
          height: 'var(--nav-height)',
          background: 'var(--color-nav-bg)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${scrolled ? 'rgba(232, 69, 10, 0.4)' : 'var(--color-border)'}`,
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s'
        }}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2" data-cursor="large">
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
            <circle cx="5" cy="15" r="4" stroke="#E8450A" strokeWidth="2"/>
            <circle cx="23" cy="15" r="4" stroke="#E8450A" strokeWidth="2"/>
            <path d="M5 15L10 5H18L23 15" stroke="#E8450A" strokeWidth="2" strokeLinecap="round"/>
            <path d="M14 5L10 5" stroke="#E8450A" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="14" cy="5" r="1.5" fill="#E8450A"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800 }}>
            <span style={{ color: 'white' }}>Ride</span><span style={{ color: 'var(--color-accent)' }}>X</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <MagneticButton key={link.href}>
              <Link 
                href={link.href}
                data-cursor="large"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: pathname === link.href ? 'white' : 'var(--color-text-secondary)',
                  transition: 'color var(--transition-fast)',
                  textDecoration: 'none'
                }}
                className="hover:text-white"
              >
                {link.label}
              </Link>
            </MagneticButton>
          ))}
        </div>

        {/* RIGHT ACTION BUTTONS */}
        <div className="hidden md:flex items-center gap-6">
          <MagneticButton>
            <Link href="/signup" className="btn-ghost text-xs border-none" data-cursor="large">
              Sign up
            </Link>
          </MagneticButton>
          <MagneticButton>
            <button className="btn-primary" style={{ padding: '0.625rem 1.5rem' }} data-cursor="large">
              Sign In
            </button>
          </MagneticButton>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="md:hidden flex flex-col gap-1.5 z-50 relative"
          onClick={() => setMenuOpen(!menuOpen)}
          data-cursor="large"
          aria-expanded={menuOpen}
          aria-label="Toggle Menu"
        >
          <span style={{ display: 'block', width: '24px', height: '2px', background: menuOpen ? 'transparent' : 'white', transition: '0.3s' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: menuOpen ? 'var(--color-accent)' : 'white', transform: menuOpen ? 'rotate(45deg) translate(-2px, -2px)' : 'none', transition: '0.3s' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: menuOpen ? 'var(--color-accent)' : 'white', transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none', transition: '0.3s', position: menuOpen ? 'absolute' : 'static', top: menuOpen ? '7.5px' : 'auto' }} />
        </button>
      </nav>

      {/* MOBILE FULLSCREEN OVERLAY */}
      <div 
        ref={menuOverlayRef}
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000000',
          zIndex: 90,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          clipPath: 'circle(0% at 100% 0%)',
        }}
      >
        <div className="flex flex-col gap-8 text-center">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: pathname === link.href ? 'var(--color-accent)' : 'white',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
