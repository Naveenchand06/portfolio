import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { pipeline, sections } from '@/data/content'
import type { PipelineStage } from '@/data/content'
import { MaskedWords, Reveal, SectionLabel } from './ui/Reveal'

export default function Pipeline() {
  const [active, setActive] = useState(0)

  return (
    <section id="pipeline" className="shell py-28 md:py-40">
      <SectionLabel index={sections.pipeline.index}>
        {sections.pipeline.label}
      </SectionLabel>

      <div className="mb-16 grid gap-10 lg:grid-cols-12 md:mb-24">
        <h2 className="display text-[clamp(2.1rem,5.6vw,4.6rem)] lg:col-span-7">
          <MaskedWords lines={sections.pipeline.headline} />
        </h2>
        <Reveal className="lg:col-span-5 lg:pt-3" delay={0.15}>
          <p className="text-pretty leading-relaxed text-muted">
            {sections.pipeline.intro}
          </p>
        </Reveal>
      </div>

      <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* sticky rail */}
        <aside className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-28">
            <div className="relative pl-6">
              {/* track */}
              <div className="absolute left-[3px] top-2 h-[calc(100%-1rem)] w-px bg-bone/12" />
              <motion.div
                className="absolute left-[3px] top-2 w-px origin-top bg-signal"
                animate={{
                  height: `${((active + 1) / pipeline.length) * 100}%`,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ maxHeight: 'calc(100% - 1rem)' }}
              />

              {pipeline.map((s, i) => {
                const on = i === active
                const past = i < active
                return (
                  <div key={s.id} className="relative py-3">
                    <span
                      className={`absolute -left-6 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full transition-all duration-500 ${
                        on
                          ? 'scale-125 bg-signal shadow-[0_0_12px_var(--color-signal)]'
                          : past
                            ? 'bg-signal/70'
                            : 'bg-bone/25'
                      }`}
                    />
                    <div
                      className={`flex items-baseline gap-3 transition-all duration-500 ${
                        on ? 'text-bone' : 'text-dim'
                      }`}
                    >
                      <span className="font-mono text-[0.68rem]">{s.index}</span>
                      <span
                        className={`font-semibold tracking-tight transition-all duration-500 ${
                          on ? 'text-lg' : 'text-base'
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                    <motion.p
                      className="overflow-hidden font-mono text-[0.68rem] text-signal"
                      animate={{
                        height: on ? 'auto' : 0,
                        opacity: on ? 1 : 0,
                        marginTop: on ? 4 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {s.verb}
                    </motion.p>
                  </div>
                )
              })}
            </div>
          </div>
        </aside>

        {/* panels */}
        <div className="lg:col-span-8">
          {pipeline.map((stage, i) => (
            <StagePanel
              key={stage.id}
              stage={stage}
              index={i}
              setActive={setActive}
              last={i === pipeline.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StagePanel({
  stage,
  index,
  setActive,
  last,
}: {
  stage: PipelineStage
  index: number
  setActive: (i: number) => void
  last: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })

  useEffect(() => {
    if (inView) setActive(index)
  }, [inView, index, setActive])

  return (
    <div
      ref={ref}
      className={`py-12 md:py-16 ${last ? '' : 'border-b border-bone/10'}`}
    >
      <Reveal>
        <div className="flex items-baseline gap-4 lg:hidden">
          <span className="label text-signal">{stage.index}</span>
          <span className="label">{stage.verb}</span>
        </div>

        <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl lg:mt-0">
          {stage.title}
          <span className="ml-3 hidden font-mono text-[0.7rem] font-normal tracking-widest text-signal lg:inline">
            {stage.index}
          </span>
        </h3>

        <p className="mt-4 max-w-2xl text-pretty text-[1.02rem] leading-relaxed text-bone/85">
          {stage.summary}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {stage.tools.map((t) => (
            <span
              key={t}
              className="rounded-full border border-bone/12 px-3 py-1 font-mono text-[0.68rem] text-dim transition-colors duration-300 hover:border-signal/50 hover:text-bone"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
