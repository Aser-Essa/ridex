/* FIXES APPLIED:
 * [PERFORMANCE] Extracted logic to reusable custom hook with proper RAF cleanup
 * [ACCESSIBILITY] Respects reduced motion, hidden securely on touch devices using media queries
 */
'use client'
import { useRef } from 'react'
import { useCursor } from '@/context/CursorContext'
import { useCustomCursor } from '@/hooks/useCustomCursor'

export default function CustomCursor() {
  const outerRingRef = useRef<HTMLDivElement>(null)
  const innerDotRef = useRef<HTMLDivElement>(null)
  const { isHovered } = useCursor()

  useCustomCursor(outerRingRef, innerDotRef)

  return (
    <>
      <div
        ref={outerRingRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          borderColor: 'rgba(232, 69, 10, 0.6)',
          borderRadius: '50%',
          willChange: 'transform, width, height, opacity, border-color',
          mixBlendMode: 'exclusion',
          transition: 'width 0.3s, height 0.3s, opacity 0.3s, border-color 0.3s',
          ...(isHovered && {
            width: '100px',
            height: '100px',
            opacity: 0.4,
            borderColor: 'white'
          })
        }}
      />
      <div
        ref={innerDotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--color-accent)',
          borderRadius: '50%',
          willChange: 'transform, opacity',
          transition: 'transform 0.3s, opacity 0.3s',
          ...(isHovered && {
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: 0
          })
        }}
      />
    </>
  )
}
