import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

/** Fade + rise on scroll entry. The workhorse wrapper for section content. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** A hairline that draws itself horizontally when scrolled into view. */
export function DrawLine({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`h-px w-full origin-left bg-bone/12 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.2, ease: EASE }}
    />
  )
}

/**
 * Display-type reveal: each word rises out of an overflow-hidden mask.
 * `words` entries may be flagged `em` to render in the serif accent face.
 */
export function MaskedWords({
  lines,
  className = '',
  delay = 0,
  stagger = 0.07,
}: {
  lines: { t: string; em?: boolean }[][]
  className?: string
  delay?: number
  stagger?: number
}) {
  let i = -1
  return (
    <span className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.06em]">
          <span className="flex flex-wrap gap-x-[0.24em]">
            {line.map((word, wi) => {
              i += 1
              return (
                <motion.span
                  key={wi}
                  // Colour is set explicitly rather than inherited: the footer
                  // headline was rendering near-black against the dark page.
                  className={
                    word.em
                      ? 'accent-serif inline-block text-signal'
                      : 'inline-block text-bone'
                  }
                  initial={{ y: '105%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{
                    duration: 1,
                    delay: delay + i * stagger,
                    ease: EASE,
                  }}
                >
                  {word.t}
                </motion.span>
              )
            })}
          </span>
        </span>
      ))}
    </span>
  )
}

/** Section eyebrow: mono label with a numbered index and a growing rule. */
export function SectionLabel({
  index,
  children,
}: {
  index: string
  children: ReactNode
}) {
  return (
    <Reveal className="mb-10 flex items-center gap-5 md:mb-16">
      <span className="label text-signal">{index}</span>
      <span className="label">{children}</span>
      <motion.span
        className="h-px flex-1 origin-left bg-bone/12"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
      />
    </Reveal>
  )
}
