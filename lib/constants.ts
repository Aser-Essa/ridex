/* FIXES APPLIED:
 * [BEST PRACTICE] Extracted all hardcoded presentation data into central constants file
 */
import { Bike, Feature, Testimonial, NavLink, Stat, FAQItem, Founder, SocialLink } from './types'

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/company', label: 'Company' },
  { href: '/contact', label: 'Contact' },
]

export const BIKES_DATA: Bike[] = [
  {
    id: 1,
    name: 'RideX Pro S',
    specs: ['Carbon frame', '320km', '42km/h'],
    price: '$3,299',
    badge: 'BESTSELLER',
    image: '/images/bike-hero.png',
    type: 'Road'
  },
  {
    id: 2,
    name: 'RideX Urban X',
    specs: ['Aluminum', '280km', '38km/h'],
    price: '$2,199',
    badge: 'NEW',
    image: '/images/bike-2.png',
    type: 'Urban'
  },
  {
    id: 3,
    name: 'RideX Trail R',
    specs: ['Full suspension', '260km', '40km/h'],
    price: '$2,799',
    badge: '',
    image: '/images/bike-hero.png',
    type: 'Mountain'
  },
  {
    id: 4,
    name: 'RideX Peak Ascent',
    specs: ['Ultra-light Carbon', '350km', '45km/h'],
    price: '$4,199',
    badge: 'PRO',
    image: '/images/bike-2.png',
    type: 'Mountain'
  },
  {
    id: 5,
    name: 'RideX City Commuter',
    specs: ['Step-through', '220km', '32km/h'],
    price: '$1,899',
    badge: '',
    image: '/images/bike-hero.png',
    type: 'Urban'
  },
  {
    id: 6,
    name: 'RideX Endurance',
    specs: ['Titanium alloy', '400km', '35km/h'],
    price: '$5,499',
    badge: 'LIMITED',
    image: '/images/bike-2.png',
    type: 'Road'
  }
]

export const STATS_DATA: Stat[] = [
  { value: 340, suffix: 'km', label: 'Max Range Per Charge' },
  { value: 45, suffix: 'km/h', label: 'Top Speed' },
  { value: 2.4, suffix: 'kg', label: 'Battery Weight' },
  { value: 5, suffix: 'yr', label: 'Warranty Coverage' }
]

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The acceleration and smart battery management completely changed my 15km commute. Absolutely flawless engineering.",
    name: "ALEX CHEN",
    role: "Daily Commuter",
    rating: 5
  },
  {
    quote: "I've owned four e-bikes. This is the first one that actually feels like a premium piece of technology rather than a toy.",
    name: "SARAH JENKINS",
    role: "Tech Reviewer",
    rating: 5
  },
  {
    quote: "Regenerative braking adds so much range, I only charge it once a week. The carbon frame makes it lighter than my acoustic bike.",
    name: "MARCUS T.",
    role: "Weekend Rider",
    rating: 5
  }
]

export const FAQ_ITEMS: FAQItem[] = [
  { q: "How long does the battery really last?", a: "Under optimal conditions in Eco mode, you can achieve up to 340km. Typical mixed urban riding yields about 280km per charge." },
  { q: "Can I charge the battery while it's in the bike?", a: "Yes, you can charge the battery directly via the frame port, or remove the battery and charge it independently." },
  { q: "What happens if the app loses connection?", a: "The bike operates perfectly fine without the app. Telemetry data is cached locally and syncs once reconnected." },
  { q: "Is the frame covered under warranty?", a: "Our aerospace-grade carbon frame comes with a lifetime warranty against manufacturing defects." }
]

export const FOUNDERS: Founder[] = [
  { name: "MARTIN V.", role: "Chief Engineer", img: "/images/rider.jpg" },
  { name: "ELENA S.", role: "Head of Design", img: "/images/rider.jpg" },
  { name: "JAMES W.", role: "Lead Systems Architect", img: "/images/rider.jpg" }
]

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Ig', href: 'https://instagram.com/ridex' },
  { platform: 'Tw', href: 'https://twitter.com/ridex' },
  { platform: 'In', href: 'https://linkedin.com/company/ridex' },
]

export const FULL_SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Instagram', href: 'https://instagram.com/ridex' },
  { platform: 'Twitter/X', href: 'https://twitter.com/ridex' },
  { platform: 'LinkedIn', href: 'https://linkedin.com/company/ridex' },
  { platform: 'YouTube', href: 'https://youtube.com/ridex' }
]
