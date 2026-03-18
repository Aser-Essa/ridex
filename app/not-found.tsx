/* FIXES APPLIED:
 * [BEST PRACTICE] Created custom not-found (404) page
 */
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="font-[family-name:var(--font-display)] text-[10rem] text-[var(--color-accent)] opacity-20 leading-none mb-4 tracking-tighter">404</div>
      <h2 className="section-heading mb-4 text-center">PAGE NOT FOUND</h2>
      <p className="font-[family-name:var(--font-body)] text-[var(--color-text-secondary)] mb-8 text-center max-w-md">
        The route you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn-primary cursor-none" data-cursor="large">
        RETURN TO SAFETY
      </Link>
    </div>
  )
}
