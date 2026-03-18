/* FIXES APPLIED:
 * [BEST PRACTICE] Created thin wrapper around @gsap/react useGSAP
 * [ACCESSIBILITY] Disabled animations automatically based on prefers-reduced-motion
 */
'use client'

import { useGSAP as useGSAPOriginal } from '@gsap/react'
import { useReducedMotion } from './useReducedMotion'
import gsap from 'gsap'

// Re-export the generic functionality but with reduced motion awareness
export function useGSAP(
  callback: gsap.ContextFunc,
  dependencies?: any[] | Record<string, any>
) {
  const prefersReducedMotion = useReducedMotion()

  return useGSAPOriginal((context, contextSafe) => {
    if (prefersReducedMotion) {
      // Fast forward all animations if user prefers reduced motion
      gsap.globalTimeline.timeScale(1000) 
    } else {
      gsap.globalTimeline.timeScale(1)
    }
    
    callback(context, contextSafe)
  }, dependencies)
}
