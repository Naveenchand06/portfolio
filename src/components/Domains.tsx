import { motion } from 'framer-motion'
import { domains, sections } from '@/data/content'
import { DomainIcon } from './ui/Icons'
import { MaskedWords, Reveal, SectionLabel } from './ui/Reveal'

export default function Domains() {
  return (
    <section id="expertise" className="relative py-28 md:py-40">
      {/* subtle radial wash to separate this band from its neighbours */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(60rem 40rem at 70% 0%, rgba(94,240,180,0.05), transparent 70%)',
        }}
      />

      <div className="shell relative">
        <SectionLabel index={sections.domains.index}>
          {sections.domains.label}
        </SectionLabel>

        <div className="mb-16 grid gap-10 md:mb-24 lg:grid-cols-12">
          <h2 className="display text-[clamp(2.1rem,5.6vw,4.6rem)] lg:col-span-7">
            <MaskedWords lines={sections.domains.headline} />
          </h2>
          <Reveal className="lg:col-span-5 lg:pt-3" delay={0.15}>
            <p className="text-pretty leading-relaxed text-muted">
              {sections.domains.intro}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl bg-bone/10 md:grid-cols-2">
          {domains.map((d, i) => (
            <motion.article
              key={d.id}
              className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-surface md:p-10"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="text-verify transition-colors duration-500 group-hover:text-signal">
                  <DomainIcon name={d.icon} className="h-11 w-11" />
                </div>
                <span className="label">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <h3 className="mt-7 text-2xl font-semibold tracking-tight md:text-[1.7rem]">
                {d.title}
              </h3>
              <p className="mt-2.5 text-pretty text-[0.93rem] leading-relaxed text-bone/70">
                {d.blurb}
              </p>

              <ul className="mt-7 space-y-2.5 border-t border-bone/8 pt-6">
                {d.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 text-[0.86rem] leading-relaxed text-muted"
                  >
                    <span className="mt-[0.68em] h-px w-2.5 shrink-0 bg-dim transition-colors duration-500 group-hover:bg-signal" />
                    <span className="text-pretty">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
