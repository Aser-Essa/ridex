/* FIXES APPLIED:
 * [BEST PRACTICE] Created reusable isolated component for displaying feature highlights
 */
'use client'

import ScrollReveal from './ScrollReveal'

interface FeatureCardProps {
  number: string
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({ number, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <ScrollReveal delay={delay} direction="up" className="shrink-0 w-screen sm:w-[50vw] md:w-[50vw] lg:w-[40vw] h-full flex flex-col justify-center px-8 md:px-16 border-r border-(--color-border)">
      <div className="max-w-md">
        <div className="font-mono text-[var(--color-accent)] text-sm tracking-[0.2em] mb-4">
          {number}
        </div>
        <h2 className="section-heading mb-6" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="font-body text-[var(--color-text-secondary)] text-lg leading-relaxed mb-8">
          {description}
        </p>
      </div>
    </ScrollReveal>
  )
}
