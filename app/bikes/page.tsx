/* FIXES APPLIED:
 * [PERFORMANCE] Optimised with next/image instead of img tags
 * [BUG] Replaced dangerous inner HTML styles with tailwind hover groupings
 * [ACCESSIBILITY] Updated links to utilize next/link
 * [BEST PRACTICE] Migrated component data to centralized constants file
 */
'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import MagneticButton from '@/components/MagneticButton'
import PageTransition from '@/components/PageTransition'
import { BIKES_DATA } from '@/lib/constants'

export default function BikesPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Price (Low-High)')
  const [compareMode, setCompareMode] = useState(false)
  const [compareList, setCompareList] = useState<number[]>([])

  const filters = ['All', 'Mountain', 'Urban', 'Road']
  const sorts = ['Price (Low-High)', 'Price (High-Low)', 'Range', 'Weight']

  const filteredBikes = BIKES_DATA.filter(bike => activeFilter === 'All' || bike.type === activeFilter)

  // Basic sorting logic placeholder (Would require parsing numerical values in prod)
  const sortedBikes = [...filteredBikes].sort((a, b) => {
    if (sortBy === 'Price (Low-High)') {
      return a.id - b.id // Placeholder logic, assuming BIKES_DATA ordered roughly
    }
    return 0
  })

  const toggleCompare = (id: number) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(item => item !== id))
    } else {
      if (compareList.length < 2) {
        setCompareList([...compareList, id])
      } else {
        alert("You can only compare 2 bikes at a time.")
      }
    }
  }

  return (
    <PageTransition>
      <div className="pt-[var(--nav-height)] bg-black min-h-screen">
        <div className="container py-16">
          
          {/* HEADER AND FILTERS */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <ScrollReveal>
              <div>
                <h1 className="display-heading mb-4 text-white">THE 2024<br/>COLLECTION</h1>
                
                <div className="flex flex-wrap gap-3 mt-8">
                  {filters.map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className="px-6 py-2 rounded-full transition-all duration-300 cursor-none"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        background: activeFilter === filter ? 'var(--color-accent)' : 'var(--color-surface)',
                        color: activeFilter === filter ? 'white' : 'var(--color-text-secondary)',
                        border: '1px solid',
                        borderColor: activeFilter === filter ? 'var(--color-accent)' : 'var(--color-border)'
                      }}
                      data-cursor="large"
                      aria-pressed={activeFilter === filter}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="right">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Compare Button */}
                <button 
                  onClick={() => setCompareMode(!compareMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-none ${compareMode ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'border-white/10 text-white hover:border-white/30'}`}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase' }}
                  data-cursor="large"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"></path></svg>
                  {compareMode ? 'Exit Compare' : 'Compare'}
                  {compareList.length > 0 && <span className="bg-[var(--color-accent)] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] ml-1">{compareList.length}</span>}
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select 
                    className="appearance-none bg-[var(--color-surface)] border border-white/10 rounded-full px-6 py-2 pr-10 text-white outline-none focus:border-[var(--color-accent)] transition-colors cursor-none"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase' }}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    data-cursor="large"
                    aria-label="Sort bikes"
                  >
                    {sorts.map(sort => (
                      <option key={sort} value={sort}>{sort}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* BIKES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedBikes.map((bike, i) => (
              <ScrollReveal key={bike.id} delay={i * 0.1} direction="up">
                <div 
                  className={`group relative h-[520px] rounded-[var(--radius-lg)] overflow-hidden flex flex-col justify-between cursor-none transition-all duration-500 bg-[var(--color-surface-2)] border ${compareMode && compareList.includes(bike.id) ? 'border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]' : 'border-[var(--color-border)] hover:border-[rgba(232,69,10,0.4)] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_40px_var(--color-accent-glow)]'}`}
                  onClick={() => compareMode ? toggleCompare(bike.id) : undefined}
                  data-cursor={compareMode ? "large" : undefined}
                >
                  {/* Compare Checkbox Visual (Only in Compare Mode) */}
                  {compareMode && (
                    <div className="absolute top-6 left-6 z-30 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shadow-lg"
                         style={{ borderColor: compareList.includes(bike.id) ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)', backgroundColor: compareList.includes(bike.id) ? 'var(--color-accent)' : 'black' }}>
                      {compareList.includes(bike.id) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                  )}

                  {/* Badges */}
                  {bike.badge && (
                    <div 
                      className="absolute top-6 right-6 z-20 px-4 py-1.5 rounded-full"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        backgroundColor: 'rgba(232, 69, 10, 0.1)',
                        color: 'var(--color-accent)',
                        border: '1px solid rgba(232, 69, 10, 0.3)'
                      }}
                    >
                      {bike.badge}
                    </div>
                  )}

                  {/* Upper half: Image */}
                  <div className="relative h-[55%] w-full flex items-center justify-center p-6">
                    <div 
                      className="absolute inset-0 m-auto rounded-full w-[250px] h-[250px] z-0 opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none blur-[30px]"
                      style={{
                        background: 'radial-gradient(circle, rgba(232, 69, 10, 0.4) 0%, transparent 60%)',
                      }}
                    />
                    <Image 
                      src={bike.image} 
                      alt={bike.name} 
                      fill
                      className="relative z-10 w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 pointer-events-none p-4" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Lower half: content */}
                  <div className="p-8 border-t border-[rgba(255,255,255,0.04)] bg-black/20 flex-grow flex flex-col justify-end pointer-events-none">
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', textTransform: 'uppercase', color: 'white', marginBottom: '1rem' }}>
                      {bike.name}
                    </h3>
                    
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                      {bike.specs.map((spec, s_i) => (
                        <div key={s_i} className="flex items-center gap-3">
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                            {spec}
                          </span>
                          {s_i < bike.specs.length - 1 && (
                            <span style={{ display: 'block', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }} />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-end justify-between w-full mt-auto">
                      <div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                          Starting at
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'white', lineHeight: '1' }}>
                          {bike.price}
                        </div>
                      </div>
                      
                      {!compareMode && (
                        <div className="pb-1 pointer-events-auto">
                          <MagneticButton>
                            <Link href={`/bikes/${bike.id}`} className="btn-ghost group" data-cursor="large">
                              VIEW DETAILS
                              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1 text-[var(--color-accent)]">→</span>
                            </Link>
                          </MagneticButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* COMPARE TRAY POPUP */}
          {compareMode && compareList.length === 2 && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
              <ScrollReveal direction="up" duration={0.4}>
                <div className="bg-[var(--color-surface)]/90 backdrop-blur-md border border-[var(--color-accent)] rounded-full py-3 px-6 flex items-center justify-between gap-8 shadow-[0_10px_40px_rgba(232,69,10,0.3)]">
                  <div className="font-body text-white text-sm">
                    <span className="text-[var(--color-accent)] font-bold">2</span> bikes selected
                  </div>
                  <MagneticButton>
                    <button className="btn-primary py-2 px-6 border-none" style={{ padding: '0.5rem 1.5rem', fontSize: '0.7rem' }}>
                      COMPARE NOW
                    </button>
                  </MagneticButton>
                </div>
              </ScrollReveal>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  )
}
