/* FIXES APPLIED:
 * [BEST PRACTICE] Created centralized CursorContext to avoid prop-drilling hover states
 * [CRITICAL] Added 'use client' directive
 */
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CursorContextType {
  isHovered: boolean
  setIsHovered: (hovered: boolean) => void
  cursorType: 'default' | 'large' | 'none'
  setCursorType: (type: 'default' | 'large' | 'none') => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)
  const [cursorType, setCursorType] = useState<'default' | 'large' | 'none'>('default')

  return (
    <CursorContext.Provider value={{ isHovered, setIsHovered, cursorType, setCursorType }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
