import { motion } from 'framer-motion'
import type { Accent } from '@/data/content'

type Kind = 'platform' | 'models' | 'intelligence'

/** One isometric box: three faces at 2:1, shaded to read as a solid. */
function IsoBox({
  cx,
  cy,
  w,
  h,
  color,
}: {
  cx: number
  cy: number
  w: number
  h: number
  color: string
}) {
  const hh = w / 2
  const top = `M${cx},${cy - hh} L${cx + w},${cy} L${cx},${cy + hh} L${cx - w},${cy} Z`
  const left = `M${cx - w},${cy} L${cx},${cy + hh} L${cx},${cy + hh + h} L${cx - w},${cy + h} Z`
  const right = `M${cx + w},${cy} L${cx},${cy + hh} L${cx},${cy + hh + h} L${cx + w},${cy + h} Z`

  return (
    <g>
      <path d={left} fill={color} fillOpacity={0.16} />
      <path d={right} fill={color} fillOpacity={0.34} />
      <path d={top} fill={color} fillOpacity={0.72} />
      <path d={top} fill="none" stroke={color} strokeOpacity={0.95} strokeWidth={0.8} />
      <path d={left} fill="none" stroke={color} strokeOpacity={0.4} strokeWidth={0.8} />
      <path d={right} fill="none" stroke={color} strokeOpacity={0.4} strokeWidth={0.8} />
    </g>
  )
}

const float = (d: number, delay = 0) => ({
  duration: d,
  delay,
  repeat: Infinity,
  ease: 'easeInOut' as const,
})

/**
 * Isometric illustrations for the three practice areas. Drawn rather than
 * rendered in WebGL: three more canvases would cost far more than they return.
 */
export default function IsoArt({
  kind,
  accent,
  className = 'h-44 w-full',
}: {
  kind: Kind
  accent: Accent
  className?: string
}) {
  const c = `var(--color-${accent})`

  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true">
      {/* ground glow */}
      <ellipse cx="120" cy="178" rx="78" ry="14" fill={c} opacity="0.07" />

      {kind === 'platform' && <Platform c={c} />}
      {kind === 'models' && <Models c={c} />}
      {kind === 'intelligence' && <Intelligence c={c} />}
    </svg>
  )
}

/* Stacked infrastructure with a shield holding station above it. */
function Platform({ c }: { c: string }) {
  return (
    <>
      <IsoBox cx={120} cy={148} w={66} h={13} color={c} />
      <IsoBox cx={120} cy={120} w={56} h={13} color={c} />
      <IsoBox cx={120} cy={94} w={46} h={13} color={c} />

      {/* rack units on the top slab */}
      {[-18, 0, 18].map((dx, i) => (
        <motion.g
          key={dx}
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={float(2.8, i * 0.4)}
        >
          <IsoBox cx={120 + dx} cy={84 + dx / 2} w={7} h={6} color={c} />
        </motion.g>
      ))}

      {/* the shield, bobbing */}
      <motion.g animate={{ y: [0, -5, 0] }} transition={float(5)}>
        <path
          d="M120 26 L137 33 v11 c0 9.5-7 16.2-17 19 -10-2.8-17-9.5-17-19 V33 Z"
          fill={c}
          fillOpacity={0.14}
          stroke={c}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        <motion.path
          d="M112.5 45.5 l5 5 l10.5-11"
          fill="none"
          stroke={c}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={float(2.4)}
        />
      </motion.g>

      {/* link from shield down into the stack */}
      <motion.path
        d="M120 62 V80"
        stroke={c}
        strokeWidth={1}
        strokeDasharray="3 4"
        opacity={0.55}
        animate={{ strokeDashoffset: [0, -14] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      />
    </>
  )
}

/* Data platform, training, serving: an artifact moving down the line. */
function Models({ c }: { c: string }) {
  const pads = [
    { cx: 54, cy: 142 },
    { cx: 120, cy: 118 },
    { cx: 186, cy: 142 },
  ]

  return (
    <>
      {pads.map((p, i) => (
        <g key={i}>
          <IsoBox cx={p.cx} cy={p.cy} w={32} h={11} color={c} />
        </g>
      ))}

      {/* connecting arc */}
      <motion.path
        d="M54 132 Q88 96 120 108 Q152 96 186 132"
        fill="none"
        stroke={c}
        strokeWidth={1}
        strokeDasharray="4 5"
        opacity={0.5}
        animate={{ strokeDashoffset: [0, -18] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
      />

      {/* the model, held above the middle pad */}
      <motion.g animate={{ y: [0, -6, 0] }} transition={float(4)}>
        <IsoBox cx={120} cy={78} w={20} h={17} color={c} />
        <motion.circle
          cx={120}
          cy={78}
          r={3}
          fill={c}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={float(2)}
        />
      </motion.g>

      {/* artifact travelling from data to serving */}
      <motion.g
        animate={{ x: [54, 120, 186], y: [132, 112, 132], opacity: [0, 1, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x={-4} y={-4} width={8} height={8} rx={1.5} fill={c} />
      </motion.g>

      {[54, 120, 186].map((x, i) => (
        <text
          key={x}
          x={x}
          y={186}
          textAnchor="middle"
          fontSize="7.5"
          className="font-mono"
          fill={c}
          opacity={0.65}
        >
          {['data', 'train', 'serve'][i]}
        </text>
      ))}
    </>
  )
}

/* Tokens streaming into a lattice sitting on a pedestal. */
function Intelligence({ c }: { c: string }) {
  const nodes = [
    [96, 62], [144, 62],
    [80, 96], [120, 84], [160, 96],
    [100, 120], [140, 120],
  ]
  const links: [number, number][] = [
    [0, 2], [0, 3], [1, 3], [1, 4],
    [2, 5], [3, 5], [3, 6], [4, 6],
  ]

  return (
    <>
      <IsoBox cx={120} cy={150} w={54} h={12} color={c} />

      {links.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={c}
          strokeWidth={0.9}
          animate={{ opacity: [0.15, 0.7, 0.15] }}
          transition={float(3, i * 0.22)}
        />
      ))}

      {nodes.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={4.5}
          fill={c}
          fillOpacity={0.25}
          stroke={c}
          strokeWidth={1.1}
          animate={{ scale: [1, 1.18, 1], fillOpacity: [0.2, 0.6, 0.2] }}
          transition={float(2.6, i * 0.18)}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}

      {/* pedestal link */}
      <motion.path
        d="M120 128 V140"
        stroke={c}
        strokeWidth={1}
        strokeDasharray="3 4"
        opacity={0.55}
        animate={{ strokeDashoffset: [0, -14] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      />

      {/* tokens arriving */}
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          y={56 + i * 10}
          width={9}
          height={4}
          rx={1}
          fill={c}
          animate={{ x: [8, 74], opacity: [0, 0.9, 0] }}
          transition={{
            duration: 2.4,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}
