import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/hooks'

const BOOT = [
  'authenticating identity ......... ok',
  'verifying image signatures ...... ok',
  'applying network policy ......... ok',
  'establishing mTLS ............... ok',
  'otel collector .................. ready',
]

export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (reduced) {
      onDone()
      setLeaving(true)
      return
    }

    document.body.style.overflow = 'hidden'
    const timers: number[] = []

    BOOT.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStep(i + 1), 220 + i * 190))
    })

    timers.push(
      window.setTimeout(() => {
        setLeaving(true)
        document.body.style.overflow = ''
        onDone()
      }, 220 + BOOT.length * 190 + 380),
    )

    return () => {
      timers.forEach(clearTimeout)
      document.body.style.overflow = ''
    }
  }, [reduced, onDone])

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end bg-ink px-6 pb-16 md:px-12 md:pb-20"
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="w-full">
            <div className="font-mono text-[0.7rem] leading-relaxed text-dim md:text-xs">
              {BOOT.slice(0, step).map((line) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3"
                >
                  <span className="text-verify">›</span>
                  <span>{line}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 h-px w-full bg-bone/10">
              <motion.div
                className="h-full bg-signal"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step / BOOT.length }}
                style={{ transformOrigin: 'left' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="label">Naveenchand R B</span>
              <span className="font-mono text-sm text-bone/70">
                {String(Math.round((step / BOOT.length) * 100)).padStart(3, '0')}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
