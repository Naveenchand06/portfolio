import { motion } from 'framer-motion'
import { contact, profile } from '@/data/content'
import { MaskedWords, Reveal } from './ui/Reveal'
import { ArrowUpRight } from './ui/Icons'

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden pt-28 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background:
            'radial-gradient(50rem 30rem at 50% 100%, rgba(255,74,28,0.10), transparent 70%)',
        }}
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="display text-[clamp(2.4rem,8vw,7rem)]">
              <MaskedWords lines={contact.headline} />
            </h2>
          </div>
          <Reveal className="lg:col-span-4 lg:pt-4" delay={0.2}>
            <p className="text-pretty leading-relaxed text-muted">{contact.body}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-bone/12 py-8 transition-colors duration-500 hover:border-signal/50 md:mt-20 md:py-10"
          >
            <span className="display text-[clamp(1.5rem,4.6vw,3.4rem)] transition-colors duration-500 group-hover:text-signal">
              {profile.email}
            </span>
            <motion.span
              className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-bone/20 transition-colors duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-ink md:h-16 md:w-16"
              whileHover={{ rotate: 45 }}
            >
              <ArrowUpRight className="h-5 w-5" />
            </motion.span>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-7 rounded-xl border border-verify/25 bg-surface p-8 md:mt-16 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verify opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-verify" />
                </span>
                <span className="label text-verify">{contact.hire.label}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-[2rem]">
                {contact.hire.title}
              </h3>
              <p className="mt-3 text-pretty text-[0.93rem] leading-relaxed text-muted">
                {contact.hire.body}
              </p>
            </div>

            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(contact.hire.subject)}`}
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-verify px-7 py-4 text-[0.9rem] font-semibold text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
            >
              {contact.hire.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 pb-12 md:grid-cols-12 md:pb-16">
          <Reveal className="md:col-span-7">
            <span className="label">In short</span>
            <p className="mt-4 max-w-sm text-pretty text-[0.92rem] leading-relaxed text-muted">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.08}>
            <span className="label">Elsewhere</span>
            <ul className="mt-4 space-y-2.5">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="group flex items-center gap-2 text-[0.92rem] text-muted transition-colors hover:text-bone"
                  >
                    <span className="sweep">{s.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

        </div>

        <div className="flex items-center justify-between border-t border-bone/10 py-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-dim">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
