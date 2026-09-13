import { motion } from 'framer-motion'
import { edge, sections } from '@/data/content'
import { ACCENT } from '@/lib/accent'
import { MaskedWords, Reveal, SectionLabel } from './ui/Reveal'

export default function Edge() {
  return (
    <section id="edge" className="relative py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(58rem 34rem at 20% 0%, rgba(155,140,255,0.06), transparent 70%)',
        }}
      />

      <div className="shell relative">
        <SectionLabel index={sections.edge.index}>{sections.edge.label}</SectionLabel>

        <div className="mb-16 grid gap-10 md:mb-24 lg:grid-cols-12">
          <h2 className="display text-[clamp(2.1rem,5.6vw,4.6rem)] lg:col-span-7">
            <MaskedWords lines={sections.edge.headline} />
          </h2>
          <Reveal className="lg:col-span-5 lg:pt-3" delay={0.15}>
            <p className="text-pretty leading-relaxed text-muted">{sections.edge.intro}</p>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl bg-bone/10 md:grid-cols-2">
          {edge.map((item, i) => (
            <motion.article
              key={item.k}
              className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-surface md:p-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3">
                <span className={`h-1.5 w-1.5 rounded-full ${ACCENT[item.accent].dot}`} />
                <span className={`label ${ACCENT[item.accent].text}`}>{item.k}</span>
              </div>

              <h3 className="mt-6 text-balance text-xl font-semibold leading-snug tracking-tight md:text-[1.6rem]">
                {item.title}
              </h3>
              <p className="mt-3.5 text-pretty text-[0.93rem] leading-relaxed text-muted">
                {item.body}
              </p>

              <div
                className={`mt-8 h-px w-0 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:w-full ${ACCENT[item.accent].bg}`}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
