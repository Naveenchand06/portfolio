import { motion } from 'framer-motion'
import { profile, sections, story } from '@/data/content'
import { ACCENT } from '@/lib/accent'
import { MaskedWords, Reveal, SectionLabel } from './ui/Reveal'

export default function Story() {
  return (
    <section id="story" className="shell py-28 md:py-40">
      <SectionLabel index={sections.story.index}>{sections.story.label}</SectionLabel>

      <h2 className="display mb-16 text-[clamp(2.1rem,6vw,5rem)] md:mb-24">
        <MaskedWords lines={sections.story.headline} />
      </h2>

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* identity card */}
        <div className="lg:col-span-4">
          <Reveal>
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-xl border border-bone/12 bg-surface">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(237,234,227,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(237,234,227,0.05) 1px, transparent 1px)',
                    backgroundSize: '26px 26px',
                  }}
                />

                {profile.portrait ? (
                  <img
                    src={profile.portrait}
                    alt={profile.name}
                    className="relative aspect-4/5 w-full object-cover"
                  />
                ) : (
                  <div className="relative flex aspect-4/5 items-center justify-center">
                    <motion.span
                      className="accent-serif text-[clamp(4rem,11vw,7rem)] leading-none text-bone"
                      initial={{ opacity: 0, scale: 0.94 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {profile.initials}
                    </motion.span>
                    <span className="absolute bottom-5 left-0 right-0 text-center font-mono text-[0.62rem] uppercase tracking-[0.22em] text-dim">
                      {profile.name}
                    </span>
                  </div>
                )}
              </div>

              <dl className="mt-5 space-y-px overflow-hidden rounded-lg bg-bone/10">
                <Row k="Role" v={profile.role} />
                <Row k="Now" v={`${profile.company}, since 2024`} />
                <Row k="Started as" v="Software Developer, 2021" />
              </dl>
            </div>
          </Reveal>
        </div>

        {/* narrative */}
        <div className="space-y-6 lg:col-span-8 lg:pt-1">
          {story.body.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p
                className={`text-pretty leading-relaxed ${
                  i === 0
                    ? 'text-[1.15rem] text-bone md:text-[1.3rem]'
                    : 'text-[0.98rem] text-muted md:text-base'
                }`}
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* the arc */}
      <div className="mt-24 md:mt-32">
        <Reveal>
          <span className="label">The arc so far</span>
        </Reveal>

        <div className="relative mt-10 grid gap-10 md:grid-cols-5 md:gap-6">
          <motion.div
            aria-hidden
            className="absolute left-0 top-[7px] hidden h-px w-full origin-left bg-bone/12 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {story.journey.map((step, i) => (
            <motion.div
              key={step.year}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className={`absolute -top-[0px] left-0 hidden h-[15px] w-[15px] -translate-y-1/2 rounded-full border-2 border-ink md:block ${ACCENT[step.accent].dot}`}
              />
              <div className="md:pt-8">
                <span className={`font-mono text-[0.72rem] ${ACCENT[step.accent].text}`}>
                  {step.year}
                </span>
                <h3 className="mt-2 text-[1.05rem] font-semibold leading-snug tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-pretty text-[0.86rem] leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 bg-ink px-4 py-3">
      <dt className="label shrink-0">{k}</dt>
      <dd className="text-right text-[0.82rem] leading-snug text-muted">{v}</dd>
    </div>
  )
}
