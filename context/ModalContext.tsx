/* FIXES APPLIED:
 * [BEST PRACTICE] Centralized ModalContext for VideoModal
 * [CRITICAL] Added 'use client' directive
 */
'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import VideoModal from '@/components/VideoModal'

interface ModalContextType {
  isOpen: boolean
  videoSrc: string
  openModal: (src?: string) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [videoSrc, setVideoSrc] = useState("https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1")

  const openModal = useCallback((src?: string) => {
    if (src) setVideoSrc(src)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <ModalContext.Provider value={{ isOpen, videoSrc, openModal, closeModal }}>
      {children}
      <VideoModal isOpen={isOpen} onClose={closeModal} videoSrc={videoSrc} />
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
