/* FIXES APPLIED:
 * [BEST PRACTICE] Removed implicit client component usage by splitting out Providers wrapper
 * [ACCESSIBILITY] Added "Skip to main content" link for keyboard navigation
 */
import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'
import Footer from '@/components/Footer'
import Providers from './Providers'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'RideX — Keep Moving',
  description: 'Premium electric bicycles for the modern rider',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body>
        <Providers>
          {/* ACCESSIBILITY: Skip navigation link */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-[var(--color-accent)] focus:text-white top-0 left-0">
            Skip to main content
          </a>
          <CustomCursor />
          <Navbar />
          <SmoothScroll>
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  )
}
