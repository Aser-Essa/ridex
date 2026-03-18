/* FIXES APPLIED:
 * [BEST PRACTICE] Migrated hook logic to isolated file, simplified component
 */
'use client'
import { useRef, ReactElement } from 'react'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

interface MagneticButtonProps {
  children: ReactElement
}

export default function MagneticButton({ children }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  useMagneticEffect(ref, 0.35)

  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  )
}
