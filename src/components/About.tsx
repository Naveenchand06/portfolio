import { about } from '@/data/content'
import { MaskedWords, Reveal, SectionLabel } from './ui/Reveal'

export default function About() {
  return (
    <section id="approach" className="shell py-28 md:py-40">
      <SectionLabel index="01">{about.eyebrow}</SectionLabel>

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="display text-[clamp(2.1rem,5.6vw,4.6rem)]">
            <MaskedWords lines={about.headline} />
          </h2>
        </div>

        <div className="space-y-6 lg:col-span-5 lg:pt-3">
          {about.body.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-pretty leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-px overflow-hidden rounded-lg bg-bone/10 md:mt-28 md:grid-cols-3">
        {about.pillars.map((p, i) => (
          <Reveal key={p.k} delay={i * 0.1}>
            <div className="group h-full bg-ink p-8 transition-colors duration-500 hover:bg-surface md:p-10">
              <span className="label text-signal">{p.k}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">
                {p.body}
              </p>
              <div className="mt-8 h-px w-0 bg-signal transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:w-full" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
