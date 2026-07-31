import { useEffect } from 'react'
import Lenis from 'lenis'
import { isStatic } from './flags'

let lenisInstance: Lenis | null = null

export function getLenis() {
  return lenisInstance
}

/** Smooth scrolling, wired to rAF and disabled for reduced-motion users. */
export function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || isStatic) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenisInstance = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

/** Anchor navigation that respects the smooth-scroll instance. */
export function scrollToId(id: string) {
  const el = document.querySelector(id)
  if (!el) return
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -8, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
