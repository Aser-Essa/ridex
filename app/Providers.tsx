'use client'

import { CursorProvider } from '@/context/CursorContext'
import { ModalProvider } from '@/context/ModalContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CursorProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </CursorProvider>
  )
}
