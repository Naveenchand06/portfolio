import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame, useVelocity } from 'framer-motion'
import { marquee } from '@/data/content'

/**
 * Continuous ticker whose speed and direction respond to scroll velocity —
 * scrolling down pushes it along, scrolling up drags it back.
 */
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  })

  const directionRef = useRef(1)

  useAnimationFrame((_, delta) => {
    let moveBy = directionRef.current * -0.022 * delta

    const v = velocityFactor.get()
    if (v < 0) directionRef.current = -1
    else if (v > 0) directionRef.current = 1

    moveBy += directionRef.current * moveBy * v
    baseX.set(wrap(baseX.get() + moveBy))
  })

  const x = useTransform(baseX, (v) => `${v}%`)

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-y border-bone/10 py-5 mask-fade-x"
    >
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {Array.from({ length: 4 }).map((_, rep) => (
          <div key={rep} className="flex shrink-0 items-center">
            {marquee.map((item) => (
              <span key={`${rep}-${item}`} className="flex items-center">
                <span className="px-6 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-muted">
                  {item}
                </span>
                <span className="h-1 w-1 rounded-full bg-signal/60" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/** Keeps the ticker offset inside a single copy's width (-25% of 4 copies). */
function wrap(v: number) {
  const min = -25
  const max = 0
  const range = max - min
  return min + (((v - min) % range) + range) % range
}
