/* FIXES APPLIED:
 * [BEST PRACTICE] Created global loading skeleton
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-16 h-16 border-2 border-[var(--color-border)] border-t-[var(--color-accent)] rounded-full animate-spin"></div>
    </div>
  )
}
