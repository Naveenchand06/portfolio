import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouch, usePrefersReducedMotion } from '@/lib/hooks'

/** A small ring that trails the pointer and swells over interactive elements. */
export default function Cursor() {
  const isTouch = useIsTouch()
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.35 })

  useEffect(() => {
    if (isTouch || reduced) return

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const el = e.target as HTMLElement | null
      setActive(Boolean(el?.closest('a, button, [data-cursor]')))
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [isTouch, reduced, x, y])

  if (isTouch || reduced) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full border border-white"
        animate={{
          width: active ? 44 : 18,
          height: active ? 44 : 18,
          x: active ? -22 : -9,
          y: active ? -22 : -9,
          opacity: visible ? 1 : 0,
          backgroundColor: active ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0)',
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}
