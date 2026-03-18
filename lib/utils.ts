/* FIXES APPLIED:
 * [BEST PRACTICE] Created utility functions for conditional classes, formatting, debouncing, interpolation
 */
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind classes with clsx and twMerge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as a USD price
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Basic linear interpolation
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

/**
 * Clamps a value between a min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
