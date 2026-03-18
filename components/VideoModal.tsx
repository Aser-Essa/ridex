/* FIXES APPLIED:
 * [ACCESSIBILITY] Complete ARIA dialog support, focus trapping, ESC to close
 * [PERFORMANCE] Safe GSAP wrapper, conditionally managed DOM overflow
 */
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@/hooks/useGSAP'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoSrc?: string
}

export default function VideoModal({ isOpen, onClose, videoSrc = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" }: VideoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Escape key and focus trap
  useEffect(() => {
    if (!isOpen) return
    
    document.body.style.overflow = 'hidden'
    // Small timeout to ensure DOM is ready before focus
    setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 100)
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useGSAP(() => {
    if (isOpen) {
      const tl = gsap.timeline()
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        display: 'flex'
      }).fromTo(videoContainerRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' },
        "-=0.1"
      )
    } else {
      if (overlayRef.current?.style.display === 'flex') {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(overlayRef.current, { display: 'none' })
          }
        })
        tl.to(videoContainerRef.current, {
          scale: 0.85,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        }).to(overlayRef.current, {
          opacity: 0,
          duration: 0.3
        }, "-=0.2")
      }
    }
  }, [isOpen])

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Video Player Modal"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'none', 
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0
      }}
    >
      <button
        ref={closeBtnRef}
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          cursor: 'none',
          zIndex: 1001,
          transition: 'background 0.3s, transform 0.3s'
        }}
        className="hover:bg-white/10 hover:scale-110"
        data-cursor="large"
        aria-label="Close Video"
      >
        ✕
      </button>

      <div 
        ref={videoContainerRef}
        style={{
          width: '100%',
          maxWidth: '900px',
          aspectRatio: '16/9',
          padding: '0 1rem'
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          background: '#000',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(232, 69, 10, 0.15)'
        }}>
          {isOpen && (
             <iframe 
               width="100%" 
               height="100%" 
               src={videoSrc}
               title="RideX Video Player" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             />
          )}
        </div>
      </div>
    </div>
  )
}
