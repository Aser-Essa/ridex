/* FIXES APPLIED:
 * [PERFORMANCE] Extracted cursor logic out of component, added cleanup for RAF loop
 * [ACCESSIBILITY] Added touch device detection to disable custom cursor completely
 */
'use client'

import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { useCursor } from '@/context/CursorContext'

export function useCustomCursor(
  outerRef: RefObject<HTMLElement | null>, 
  innerRef: RefObject<HTMLElement | null>
): void {
  const { setIsHovered } = useCursor()

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return
    }

    const mouse = { x: 0, y: 0 }
    let rafId: number

    const xMoveOuter = gsap.quickTo(outerRef.current, 'x', { duration: 0.8, ease: 'power3' })
    const yMoveOuter = gsap.quickTo(outerRef.current, 'y', { duration: 0.8, ease: 'power3' })
    
    const xMoveInner = gsap.quickTo(innerRef.current, 'x', { duration: 0.1, ease: 'power3' })
    const yMoveInner = gsap.quickTo(innerRef.current, 'y', { duration: 0.1, ease: 'power3' })

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY

      xMoveInner(mouse.x)
      yMoveInner(mouse.y)
    }

    const updateOuter = () => {
      xMoveOuter(mouse.x)
      yMoveOuter(mouse.y)
      rafId = requestAnimationFrame(updateOuter)
    }
    
    // Start RAF loop
    updateOuter()

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'large'
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [outerRef, innerRef, setIsHovered])
}
