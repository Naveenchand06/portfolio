import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { caseStudies, sections } from '@/data/content'
import type { CaseStudy } from '@/data/content'
import CaseVisual from './ui/CaseVisual'
import { MaskedWords, Reveal, SectionLabel } from './ui/Reveal'

export default function Work() {
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set())

  /**
   * Cards open themselves as you scroll onto them and then stay open. Opening
   * only ever adds height below the reader, so nothing jumps under the cursor —
   * collapsing the previous card instead would yank the page upward.
   */
  const reveal = useCallback((id: string) => {
    setOpen((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
  }, [])

  const toggle = useCallback((id: string) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }, [])

  return (
    <section id="work" className="shell py-28 md:py-40">
      <SectionLabel index={sections.work.index}>
        {sections.work.label}
      </SectionLabel>

      <div className="mb-16 grid gap-10 md:mb-24 lg:grid-cols-12">
        <h2 className="display text-[clamp(2.1rem,5.6vw,4.6rem)] lg:col-span-7">
          <MaskedWords lines={sections.work.headline} />
        </h2>
        <Reveal className="lg:col-span-5 lg:pt-3" delay={0.15}>
          <p className="text-pretty leading-relaxed text-muted">
            {sections.work.intro}
          </p>
        </Reveal>
      </div>

      <div className="border-t border-bone/10">
        {caseStudies.map((c) => (
          <CaseRow
            key={c.id}
            study={c}
            open={open.has(c.id)}
            onReveal={reveal}
            onToggle={toggle}
          />
        ))}
      </div>
    </section>
  )
}

function CaseRow({
  study,
  open,
  onReveal,
  onToggle,
}: {
  study: CaseStudy
  open: boolean
  onReveal: (id: string) => void
  onToggle: (id: string) => void
}) {
  const headRef = useRef<HTMLButtonElement>(null)
  // Narrow band across the upper-middle of the viewport: the header crossing it
  // is what counts as "scrolled onto this one".
  const inBand = useInView(headRef, { once: true, margin: '-22% 0px -55% 0px' })

  useEffect(() => {
    if (inBand) onReveal(study.id)
  }, [inBand, onReveal, study.id])

  return (
    <motion.article
      className="border-b border-bone/10"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        ref={headRef}
        onClick={() => onToggle(study.id)}
        aria-expanded={open}
        className="group grid w-full grid-cols-1 items-start gap-4 py-8 text-left md:grid-cols-12 md:gap-8 md:py-10"
      >
        <div className="flex items-center gap-4 md:col-span-1">
          <span
            className={`font-mono text-[0.72rem] transition-colors duration-500 ${
              open ? 'text-signal' : 'text-dim'
            }`}
          >
            {study.index}
          </span>
        </div>

        <div className="md:col-span-7">
          <h3
            className={`text-2xl font-semibold tracking-tight transition-colors duration-500 md:text-[2.1rem] ${
              open ? 'text-bone' : 'text-bone/80 group-hover:text-bone'
            }`}
          >
            {study.title}
          </h3>
          <p className="mt-2 text-[0.9rem] text-muted">{study.kicker}</p>
        </div>

        <div className="flex items-center gap-3 md:col-span-3 md:justify-end md:pt-2">
          <span
            className={`rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest ${
              study.scale === 'Enterprise'
                ? 'border-bone/15 text-muted'
                : 'border-verify/30 text-verify'
            }`}
          >
            {study.context}
          </span>
        </div>

        <div className="md:col-span-1 md:flex md:justify-end md:pt-2">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-bone/15 transition-colors duration-500 group-hover:border-signal">
            <span className="absolute h-px w-3 bg-bone transition-colors group-hover:bg-signal" />
            <motion.span
              className="absolute h-3 w-px bg-bone transition-colors group-hover:bg-signal"
              animate={{ scaleY: open ? 0 : 1, rotate: open ? 90 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-10 pb-14 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5 md:col-start-2">
                <CaseVisual id={study.id} />

                <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg bg-bone/10">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="bg-ink px-3 py-4">
                      <div className="font-mono text-sm text-signal md:text-base">
                        {m.value}
                      </div>
                      <div className="mt-1.5 text-[0.7rem] leading-snug text-dim">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8 md:col-span-6">
                <Block label="The situation">{study.problem}</Block>

                <div>
                  <span className="label">What I did</span>
                  <ul className="mt-4 space-y-3">
                    {study.approach.map((a, i) => (
                      <li
                        key={i}
                        className="flex gap-4 text-[0.9rem] leading-relaxed text-muted"
                      >
                        <span className="mt-[0.15em] shrink-0 font-mono text-[0.68rem] text-signal/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-pretty">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Block label="The outcome" accent>
                  {study.outcome}
                </Block>

                <div className="flex flex-wrap gap-2 border-t border-bone/8 pt-6">
                  {study.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-bone/12 px-3 py-1 font-mono text-[0.68rem] text-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

function Block({
  label,
  children,
  accent = false,
}: {
  label: string
  children: ReactNode
  accent?: boolean
}) {
  return (
    <div className={accent ? 'border-l-2 border-verify/60 pl-5' : ''}>
      <span className={`label ${accent ? 'text-verify' : ''}`}>{label}</span>
      <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-bone/80">
        {children}
      </p>
    </div>
  )
}
