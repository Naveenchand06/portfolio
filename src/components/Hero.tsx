import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { hero, profile } from '@/data/content'
import { MaskedWords } from './ui/Reveal'
import { scrollToId } from '@/lib/useLenis'

const HeroScene = lazy(() => import('./three/HeroScene'))

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-32"
    >
      {/* 3D backdrop */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ scale: sceneScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1.8, delay: 0.25, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 md:left-[34%]">
          <Suspense fallback={null}>{ready && <HeroScene />}</Suspense>
        </div>
        {/* keep type legible over the mesh */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent md:via-ink/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      {/* faint vertical grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(237,234,227,0.045) 1px, transparent 1px)',
          backgroundSize: 'calc(100%/6) 100%',
        }}
      />

      <motion.div
        className="shell relative z-10"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.div
          className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        >
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verify opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-verify" />
            </span>
            <span className="label text-verify">{profile.kicker}</span>
          </span>
          <span className="hidden h-3 w-px bg-bone/15 sm:block" />
          <span className="label">{profile.focus}</span>
        </motion.div>

        <h1 className="display text-[clamp(3.1rem,12.5vw,11.5rem)]">
          {ready && <MaskedWords lines={hero.lines} delay={0.15} stagger={0.08} />}
        </h1>

        <div className="mt-10 flex flex-col gap-10 border-t border-bone/10 pt-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-xl text-pretty text-[0.98rem] leading-relaxed text-muted md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.75, ease: EASE }}
          >
            {hero.sub}
          </motion.p>

          <motion.button
            onClick={() => scrollToId('#approach')}
            className="group flex shrink-0 items-center gap-4 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.95 }}
          >
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-bone/20 transition-colors duration-500 group-hover:border-signal">
              <motion.svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 text-bone transition-colors group-hover:text-signal"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path d="M8 2v12M3 9l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </span>
            <span className="label transition-colors group-hover:text-bone">
              {hero.scrollCue}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
