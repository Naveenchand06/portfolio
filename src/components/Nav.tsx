import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { nav, profile } from '@/data/content'
import { scrollToId } from '@/lib/useLenis'
import { useScrollProgress } from '@/lib/hooks'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const progress = useScrollProgress()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    setTimeout(() => scrollToId(href), open ? 380 : 0)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-ink/70 backdrop-blur-xl' : ''
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between">
          <button
            onClick={() => scrollToId('#top')}
            className="group flex items-baseline gap-2.5 text-left"
          >
            <span className="text-[0.95rem] font-semibold tracking-tight">
              Naveenchand
            </span>
            <span className="hidden font-mono text-[0.65rem] text-dim sm:inline">
              R B
            </span>
            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-verify shadow-[0_0_10px_var(--color-verify)]" />
          </button>

          <nav className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <button
                key={item.href}
                onClick={() => go(item.href)}
                className="sweep text-[0.8rem] font-medium text-muted transition-colors hover:text-bone"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="hidden rounded-full border border-bone/15 px-5 py-2 text-[0.78rem] font-medium transition-colors hover:border-signal hover:text-signal sm:block"
            >
              Get in touch
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <motion.span
                className="block h-px w-5 bg-bone"
                animate={{ rotate: open ? 45 : 0, y: open ? 3 : 0 }}
              />
              <motion.span
                className="block h-px w-5 bg-bone"
                animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0 }}
              />
            </button>
          </div>
        </div>

        <div className="shell">
          <div className="h-px w-full bg-bone/8">
            <motion.div
              className="h-full origin-left bg-signal"
              style={{ scaleX: progress }}
            />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-6 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
          >
            <nav className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => go(item.href)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.6 }}
                  className="flex items-baseline gap-4 border-b border-bone/8 py-4 text-left"
                >
                  <span className="label text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="display text-4xl">{item.label}</span>
                </motion.button>
              ))}
            </nav>
            <motion.a
              href={`mailto:${profile.email}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-10 font-mono text-sm text-muted"
            >
              {profile.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
