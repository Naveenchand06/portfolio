import { motion } from 'framer-motion'
import { experience, sections } from '@/data/content'
import { MaskedWords, Reveal, SectionLabel } from './ui/Reveal'

export default function Experience() {
  return (
    <section id="path" className="shell py-28 md:py-40">
      <SectionLabel index={sections.experience.index}>
        {sections.experience.label}
      </SectionLabel>

      <div className="mb-16 grid gap-10 md:mb-24 lg:grid-cols-12">
        <h2 className="display text-[clamp(2.1rem,5.6vw,4.6rem)] lg:col-span-7">
          <MaskedWords lines={sections.experience.headline} />
        </h2>
        <Reveal className="lg:col-span-5 lg:pt-3" delay={0.15}>
          <p className="text-pretty leading-relaxed text-muted">
            {sections.experience.intro}
          </p>
        </Reveal>
      </div>

      <div className="relative">
        {/* spine */}
        <motion.div
          className="absolute left-0 top-0 hidden w-px origin-top bg-bone/12 md:block"
          style={{ height: '100%' }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {experience.map((role, i) => (
          <motion.div
            key={`${role.company}-${role.period}`}
            className="relative border-b border-bone/10 py-10 md:grid md:grid-cols-12 md:gap-8 md:py-14 md:pl-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className={`absolute -left-[4px] top-[4.2rem] hidden h-[9px] w-[9px] rounded-full md:block ${
                i === 0
                  ? 'bg-signal shadow-[0_0_14px_var(--color-signal)]'
                  : 'bg-bone/30'
              }`}
            />

            <div className="md:col-span-3">
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {role.company}
                </h3>
                {i === 0 && (
                  <span className="rounded-full bg-signal/12 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-signal">
                    Now
                  </span>
                )}
              </div>
              <p className="mt-2 font-mono text-[0.72rem] text-dim">
                {role.period}
              </p>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-widest text-dim/70">
                {role.scale}
              </p>
            </div>

            <div className="mt-5 md:col-span-9 md:mt-0">
              <p className="text-[1.02rem] font-medium text-bone">{role.title}</p>
              <p className="mt-2.5 max-w-2xl text-pretty text-[0.92rem] leading-relaxed text-muted">
                {role.summary}
              </p>

              <ul className="mt-6 space-y-2.5">
                {role.highlights.map((h, hi) => (
                  <motion.li
                    key={hi}
                    className="flex gap-3.5 text-[0.88rem] leading-relaxed text-muted"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: hi * 0.05 }}
                  >
                    <span className="mt-[0.62em] h-px w-3 shrink-0 bg-signal/50" />
                    <span className="text-pretty">{h}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {role.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-bone/10 px-2 py-0.5 font-mono text-[0.64rem] text-dim"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
