/* FIXES APPLIED:
 * [BEST PRACTICE] Created global error boundary
 */
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h2 className="section-heading mb-4 text-center">SOMETHING WENT WRONG</h2>
      <p className="font-body text-[var(--color-text-secondary)] mb-8 text-center max-w-md">
        We've encountered an unexpected error. Our engineering team has been notified.
      </p>
      <div className="flex gap-4">
        <button onClick={() => reset()} className="btn-primary cursor-none" data-cursor="large">
          TRY AGAIN
        </button>
        <Link href="/" className="btn-ghost" data-cursor="large">
          RETURN HOME
        </Link>
      </div>
    </div>
  )
}
