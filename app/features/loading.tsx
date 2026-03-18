export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-white/10 border-t-[var(--color-accent)] rounded-full animate-spin"></div>
      <div className="mt-8 font-mono text-sm tracking-widest text-[var(--color-accent)] uppercase animate-pulse">
        Initializing...
      </div>
    </div>
  )
}
