import type { Accent } from '@/data/content'

/**
 * Static class strings per accent. Built as a lookup rather than interpolated,
 * because Tailwind only ships classes it can see written out in full.
 */
export const ACCENT: Record<
  Accent,
  { text: string; bg: string; border: string; ring: string; dot: string }
> = {
  signal: {
    text: 'text-signal',
    bg: 'bg-signal',
    border: 'border-signal/45',
    ring: 'group-hover:border-signal/60',
    dot: 'bg-signal shadow-[0_0_12px_var(--color-signal)]',
  },
  verify: {
    text: 'text-verify',
    bg: 'bg-verify',
    border: 'border-verify/45',
    ring: 'group-hover:border-verify/60',
    dot: 'bg-verify shadow-[0_0_12px_var(--color-verify)]',
  },
  model: {
    text: 'text-model',
    bg: 'bg-model',
    border: 'border-model/45',
    ring: 'group-hover:border-model/60',
    dot: 'bg-model shadow-[0_0_12px_var(--color-model)]',
  },
}
