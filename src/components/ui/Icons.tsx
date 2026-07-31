import { motion } from 'framer-motion'

type IconName = 'shield' | 'cloud' | 'kube' | 'mesh' | 'code' | 'radar'

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
}

/**
 * Line icons that draw themselves in on scroll, then keep one subtle
 * looping element (a scan sweep, an orbit, a pulse) so cards feel alive.
 */
export function DomainIcon({
  name,
  className = 'h-10 w-10',
}: {
  name: IconName
  className?: string
}) {
  const draw = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: '-15%' },
  }
  const t = (d = 0) => ({ duration: 1.3, delay: d, ease: [0.16, 1, 0.3, 1] as const })

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...common}>
      {name === 'shield' && (
        <>
          <motion.path {...draw} transition={t()} d="M24 4 41 11v13c0 10-7.3 17.7-17 20-9.7-2.3-17-10-17-20V11L24 4Z" />
          <motion.path {...draw} transition={t(0.4)} d="m16.5 24.5 5 5 10-11" />
          {/* scan sweep */}
          <motion.line
            x1="8"
            x2="40"
            y1="0"
            y2="0"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
            animate={{ y1: [12, 36, 12], y2: [12, 36, 12], opacity: [0, 0.55, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {name === 'cloud' && (
        <>
          <motion.path
            {...draw}
            transition={t()}
            d="M14 34a8 8 0 0 1-.6-16 11 11 0 0 1 21 2.2A7.4 7.4 0 0 1 34 34H14Z"
          />
          <motion.path {...draw} transition={t(0.35)} d="M24 24v14m0 0-4.5-4.5M24 38l4.5-4.5" />
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={16 + i * 8}
              cy={43}
              r="1.4"
              fill="currentColor"
              stroke="none"
              animate={{ opacity: [0.15, 1, 0.15] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </>
      )}

      {name === 'kube' && (
        <>
          <motion.path {...draw} transition={t()} d="M24 4 41 13v22l-17 9-17-9V13L24 4Z" />
          <motion.path {...draw} transition={t(0.3)} d="M24 15.5 32 20v9l-8 4.5-8-4.5v-9l8-4.5Z" />
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '24px 24px' }}
          >
            <circle cx="24" cy="9.5" r="1.6" fill="currentColor" stroke="none" />
            <circle cx="38" cy="32" r="1.6" fill="currentColor" stroke="none" />
            <circle cx="10" cy="32" r="1.6" fill="currentColor" stroke="none" />
          </motion.g>
        </>
      )}

      {name === 'mesh' && (
        <>
          {[
            [24, 8],
            [40, 18],
            [40, 36],
            [24, 44],
            [8, 36],
            [8, 18],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="2.4"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
            />
          ))}
          <motion.path
            {...draw}
            transition={t()}
            d="M24 8 40 18v18L24 44 8 36V18L24 8Zm0 0v36M8 18l32 18M40 18 8 36"
            strokeWidth="0.9"
            opacity="0.55"
          />
          <motion.circle
            r="1.6"
            fill="currentColor"
            stroke="none"
            animate={{
              cx: [24, 40, 24, 8, 24],
              cy: [8, 18, 44, 36, 8],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {name === 'code' && (
        <>
          {/* Frame is a plain rect: animating pathLength on a rect is the one
              thing the other icons never do, and it left this icon blank. */}
          <rect x="4" y="4" width="40" height="40" rx="6" strokeWidth="0.9" opacity="0.22" />
          <motion.path {...draw} transition={t()} d="m17 17-8 7 8 7" />
          <motion.path {...draw} transition={t(0.15)} d="m31 17 8 7-8 7" />
          <motion.path {...draw} transition={t(0.3)} d="m27 13-6 22" />
          {/* blinking cursor, so this card breathes like the rest */}
          <motion.rect
            x="21.5"
            y="37"
            width="5"
            height="1.6"
            rx="0.8"
            fill="currentColor"
            stroke="none"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1.6, times: [0, 0.45, 0.5, 1], repeat: Infinity }}
          />
        </>
      )}

      {name === 'radar' && (
        <>
          <motion.circle {...draw} transition={t()} cx="24" cy="24" r="19" />
          <motion.circle {...draw} transition={t(0.2)} cx="24" cy="24" r="12" opacity="0.6" />
          <motion.circle {...draw} transition={t(0.35)} cx="24" cy="24" r="5" opacity="0.4" />
          <motion.line
            x1="24"
            y1="24"
            x2="24"
            y2="5"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '24px 24px' }}
          />
          <motion.circle
            cx="33"
            cy="17"
            r="2"
            fill="currentColor"
            stroke="none"
            animate={{ opacity: [0, 1, 0], scale: [0.6, 1.3, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.15, 0.5] }}
          />
        </>
      )}
    </svg>
  )
}

export function ArrowUpRight({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" {...common} strokeWidth={1.5}>
      <path d="M4 12 12 4M6 4h6v6" />
    </svg>
  )
}
