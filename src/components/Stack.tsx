import { motion } from 'framer-motion'
import { sections, stack } from '@/data/content'
import { MaskedWords, Reveal, SectionLabel } from './ui/Reveal'

export default function Stack() {
  const total = stack.reduce((n, g) => n + g.items.length, 0)

  return (
    <section className="shell py-24 md:py-32">
      <SectionLabel index={sections.stack.index}>
        {sections.stack.label}
      </SectionLabel>

      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <h2 className="display text-[clamp(1.9rem,4.4vw,3.4rem)]">
          <MaskedWords lines={sections.stack.headline} />
        </h2>
        <Reveal delay={0.1}>
          <span className="label">{total} tools & practices</span>
        </Reveal>
      </div>

      <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {stack.map((group, gi) => (
          <Reveal key={group.group} delay={(gi % 4) * 0.06}>
            <div>
              <h3 className="border-b border-bone/12 pb-3 text-[0.95rem] font-semibold tracking-tight">
                {group.group}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.025 }}
                    className="cursor-default rounded-full border border-bone/10 px-3 py-1 font-mono text-[0.7rem] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/50 hover:text-bone"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
