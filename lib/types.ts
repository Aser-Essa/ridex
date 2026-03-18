/* FIXES APPLIED:
 * [TYPE ERROR] Added complete TypeScript interfaces for all shared data shapes
 * [BEST PRACTICE] Centralized types to prevent 'any' and inline type definitions
 */

export interface Bike {
  id: number
  name: string
  specs: string[]
  price: string
  badge: string
  image: string
  type: 'Road' | 'Urban' | 'Mountain'
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  rating: number
}

export interface NavLink {
  href: string
  label: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface Founder {
  name: string
  role: string
  img: string
}

export interface SocialLink {
  platform: string
  href: string
}
