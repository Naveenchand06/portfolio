import { motion } from 'framer-motion'
import { practices, sections } from '@/data/content'
import { ACCENT } from '@/lib/accent'
import IsoArt from './ui/IsoArt'
import { MaskedWords, Reveal, SectionLabel } from './ui/Reveal'

export default function Practice() {
  return (
    <section id="practice" className="shell py-28 md:py-40">
      <SectionLabel index={sections.practice.index}>{sections.practice.label}</SectionLabel>

      <div className="mb-16 grid gap-10 md:mb-24 lg:grid-cols-12">
        <h2 className="display text-[clamp(2.1rem,5.6vw,4.6rem)] lg:col-span-7">
          <MaskedWords lines={sections.practice.headline} />
        </h2>
        <Reveal className="lg:col-span-5 lg:pt-3" delay={0.15}>
          <p className="text-pretty leading-relaxed text-muted">{sections.practice.intro}</p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {practices.map((p, i) => (
          <motion.article
            key={p.id}
            className={`group flex flex-col overflow-hidden rounded-xl border border-bone/12 bg-surface transition-colors duration-500 ${ACCENT[p.accent].ring}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative border-b border-bone/10 bg-ink/40 px-6 pt-8">
              <div
                aria-hidden
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(237,234,227,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(237,234,227,0.04) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <IsoArt kind={p.art} accent={p.accent} className="relative h-48 w-full" />
            </div>

            <div className="flex flex-1 flex-col p-7 md:p-8">
              <div className="flex items-center gap-3">
                <span className={`h-1.5 w-1.5 rounded-full ${ACCENT[p.accent].dot}`} />
                <span className={`label ${ACCENT[p.accent].text}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-5 text-balance text-2xl font-semibold leading-snug tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-pretty text-[0.92rem] leading-relaxed text-muted">
                {p.body}
              </p>

              <div className="mt-7 flex flex-wrap gap-1.5 border-t border-bone/8 pt-6">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-bone/12 px-2.5 py-1 font-mono text-[0.66rem] text-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
