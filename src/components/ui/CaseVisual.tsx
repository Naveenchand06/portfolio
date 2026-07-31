import { motion } from 'framer-motion'
import { DomainIcon } from './Icons'

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const SIGNAL = '#ff4a1c'
const VERIFY = '#5ef0b4'
const loop = (duration: number, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  ease: 'easeInOut' as const,
})

type Meta = {
  caption: string
  readout: string
  glyph: 'shield' | 'cloud' | 'kube' | 'mesh' | 'code' | 'radar'
}

const META: Record<string, Meta> = {
  'iac-migration': { caption: 'terraform apply', readout: 'plan: no changes', glyph: 'cloud' },
  'supply-chain': { caption: 'cosign verify', readout: 'signature: valid', glyph: 'shield' },
  'k8s-hardening': { caption: 'networkpolicy', readout: 'default-deny', glyph: 'kube' },
  'gateway-api': { caption: 'httproute', readout: 'mtls: strict', glyph: 'mesh' },
  observability: { caption: 'trace', readout: 'p99 847ms', glyph: 'radar' },
  'startup-platform': { caption: 'bootstrap', readout: 'week 3: shipping', glyph: 'code' },
}

/**
 * A generated, continuously animating diagram per case study. Each one echoes
 * the shape of the problem it describes rather than showing a screenshot, and
 * is framed like a diagnostic panel so the tile never reads as empty space.
 */
export default function CaseVisual({ id }: { id: string }) {
  const meta = META[id]

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border border-bone/10 bg-surface">
      {/* graph paper */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'linear-gradient(rgba(237,234,227,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(237,234,227,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* domain glyph, sunk into the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-5 -right-4 text-bone/[0.055]"
      >
        <DomainIcon name={meta?.glyph ?? 'cloud'} className="h-40 w-40" />
      </div>

      <svg viewBox="0 0 320 240" className="relative h-full w-full text-bone/45">
        <PanelChrome caption={meta?.caption} readout={meta?.readout} />

        {id === 'iac-migration' && <IacMigration />}
        {id === 'supply-chain' && <SupplyChain />}
        {id === 'k8s-hardening' && <Hardening />}
        {id === 'gateway-api' && <GatewayRouting />}
        {id === 'observability' && <Tracing />}
        {id === 'startup-platform' && <Greenfield />}
      </svg>
    </div>
  )
}

/* Corner ticks, caption and a live readout dot. */
function PanelChrome({ caption, readout }: { caption?: string; readout?: string }) {
  return (
    <g>
      <g {...S} strokeWidth="0.9" opacity="0.35">
        <path d="M10 22V10h12M298 10h12v12M310 218v12h-12M22 230H10v-12" />
      </g>

      <text x="22" y="16" className="font-mono" fontSize="7.5" fill="currentColor" opacity="0.75">
        {caption}
      </text>

      <motion.circle
        cx="296"
        cy="13.5"
        r="2.4"
        fill={VERIFY}
        animate={{ opacity: [0.25, 1, 0.25] }}
        transition={loop(2)}
      />

      <text
        x="298"
        y="226"
        textAnchor="end"
        className="font-mono"
        fontSize="7.5"
        fill={VERIFY}
        opacity="0.8"
      >
        {readout}
      </text>
    </g>
  )
}

/* 01 - scattered manual resources snapping into an ordered grid, on a loop */
function IacMigration() {
  const scatter = [
    [52, 74], [116, 52], [188, 84], [252, 62], [80, 136], [150, 120],
    [230, 150], [64, 190], [138, 194], [216, 198], [268, 118], [98, 92],
  ]
  const ordered = scatter.map((_, i) => [
    78 + (i % 4) * 56,
    72 + Math.floor(i / 4) * 52,
  ])

  return (
    <g {...S}>
      {scatter.map(([sx, sy], i) => (
        <motion.rect
          key={i}
          width="17"
          height="17"
          rx="2"
          animate={{
            x: [sx - 8, sx - 8, ordered[i][0] - 8, ordered[i][0] - 8, sx - 8],
            y: [sy - 8, sy - 8, ordered[i][1] - 8, ordered[i][1] - 8, sy - 8],
            rotate: [(i % 5) * 10 - 20, (i % 5) * 10 - 20, 0, 0, (i % 5) * 10 - 20],
            stroke: ['currentColor', 'currentColor', VERIFY, VERIFY, 'currentColor'],
          }}
          transition={{
            duration: 9,
            times: [0, 0.12, 0.42, 0.78, 1],
            delay: i * 0.035,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* state reconciliation sweep */}
      <motion.line
        x1="40"
        x2="288"
        stroke={VERIFY}
        strokeWidth="0.9"
        animate={{ y1: [60, 190], y2: [60, 190], opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.4, ease: 'linear' }}
      />
    </g>
  )
}

/* 02 - a build chain: artifact travels, gets signed, gets verified */
function SupplyChain() {
  const labels = ['src', 'build', 'scan', 'sign', 'admit']
  const x = (i: number) => 26 + i * 58

  return (
    <g {...S}>
      {labels.map((l, i) => (
        <g key={l}>
          <motion.rect
            x={x(i)}
            y="96"
            width="42"
            height="42"
            rx="3"
            animate={{ stroke: ['currentColor', VERIFY, 'currentColor'] }}
            transition={{ duration: 5, delay: i * 0.55, repeat: Infinity }}
          />
          <text
            x={x(i) + 21}
            y="152"
            textAnchor="middle"
            className="font-mono"
            fontSize="6.5"
            fill="currentColor"
            stroke="none"
            opacity="0.75"
          >
            {l}
          </text>
          {i < labels.length - 1 && (
            <motion.path
              d={`M${x(i) + 44} 117 h12`}
              strokeDasharray="3 3"
              animate={{ strokeDashoffset: [0, -12] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </g>
      ))}

      {/* the artifact moving down the chain */}
      <motion.circle
        r="4"
        fill={SIGNAL}
        stroke="none"
        cy="117"
        animate={{ cx: [47, 105, 163, 221, 279], opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* signature seal */}
      <motion.g
        animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.7, 0.7, 1, 1, 0.7] }}
        transition={{ duration: 5, times: [0, 0.62, 0.72, 0.92, 1], repeat: Infinity }}
        style={{ transformOrigin: '258px 68px' }}
      >
        <circle cx="258" cy="68" r="13" stroke={VERIFY} strokeWidth="1.1" />
        <path d="M252 68l4.5 4.5 8.5-9" stroke={VERIFY} strokeWidth="1.8" />
      </motion.g>

      <text
        x="26"
        y="196"
        className="font-mono"
        fontSize="6.5"
        fill="currentColor"
        stroke="none"
        opacity="0.5"
      >
        sbom + attestation retained per build
      </text>
    </g>
  )
}

/* 03 - namespace boundaries deflecting lateral movement */
function Hardening() {
  return (
    <g {...S}>
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={26 + i * 92}
          y="74"
          width="74"
          height="92"
          rx="4"
          stroke={VERIFY}
          strokeDasharray="5 4"
          opacity="0.75"
          animate={{ strokeDashoffset: [0, -18] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {[0, 1, 2].map((i) => (
        <g key={`p${i}`}>
          <motion.circle
            cx={63 + i * 92}
            cy="120"
            r="12"
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={loop(2.6, i * 0.4)}
          />
          <circle cx={63 + i * 92} cy="120" r="3.5" fill="currentColor" stroke="none" opacity="0.5" />
        </g>
      ))}

      {/* blocked lateral attempts */}
      {[0, 1].map((i) => (
        <g key={`b${i}`}>
          <motion.path
            d={`M${77 + i * 92} 120 h50`}
            stroke={SIGNAL}
            strokeDasharray="3 3"
            animate={{ opacity: [0, 0.9, 0.9, 0], strokeDashoffset: [0, -18] }}
            transition={{ duration: 3, delay: i * 0.9, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d={`M${96 + i * 92} 114 l11 11M${107 + i * 92} 114 l-11 11`}
            stroke={SIGNAL}
            strokeWidth="1.6"
            animate={{ opacity: [0, 0, 1, 0], scale: [0.5, 0.5, 1, 1] }}
            transition={{ duration: 3, times: [0, 0.4, 0.55, 1], delay: i * 0.9, repeat: Infinity }}
            style={{ transformOrigin: `${101 + i * 92}px 120px` }}
          />
        </g>
      ))}

      <text
        x="26"
        y="196"
        className="font-mono"
        fontSize="6.5"
        fill={SIGNAL}
        stroke="none"
        opacity="0.75"
      >
        egress denied · lateral movement blocked
      </text>
    </g>
  )
}

/* 04 - one gateway fanning out to routes owned by app teams */
function GatewayRouting() {
  const targets = [56, 96, 138, 180]

  return (
    <g {...S}>
      <motion.rect
        x="30"
        y="92"
        width="50"
        height="50"
        rx="4"
        stroke={SIGNAL}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={loop(2.4)}
      />
      <path d="M44 108h22M44 117h22M44 126h14" strokeWidth="0.9" opacity="0.6" />
      <text
        x="55"
        y="158"
        textAnchor="middle"
        className="font-mono"
        fontSize="6.5"
        fill="currentColor"
        stroke="none"
        opacity="0.75"
      >
        gateway
      </text>

      {targets.map((ty, i) => (
        <g key={i}>
          <motion.path
            d={`M82 117 C 150 117, 168 ${ty}, ${244} ${ty}`}
            strokeDasharray="4 5"
            opacity="0.6"
            animate={{ strokeDashoffset: [0, -18] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.rect
            x="246"
            y={ty - 12}
            width="44"
            height="24"
            rx="3"
            stroke={VERIFY}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={loop(3, i * 0.35)}
          />
          <text
            x="268"
            y={ty + 3.5}
            textAnchor="middle"
            className="font-mono"
            fontSize="6"
            fill="currentColor"
            stroke="none"
            opacity="0.7"
          >
            {['api', 'web', 'auth', 'jobs'][i]}
          </text>
          <motion.circle
            r="2.8"
            fill={VERIFY}
            stroke="none"
            animate={{ opacity: [0, 1, 1, 0], cx: [82, 150, 200, 244], cy: [117, 117, ty, ty] }}
            transition={{
              duration: 1.8,
              delay: i * 0.4,
              repeat: Infinity,
              repeatDelay: 0.9,
              ease: 'easeInOut',
            }}
          />
        </g>
      ))}
    </g>
  )
}

/* 05 - a distributed trace waterfall, re-drawing on a loop */
function Tracing() {
  const spans = [
    { x: 30, w: 250, y: 44, c: 'currentColor', o: 0.35 },
    { x: 52, w: 196, y: 70, c: 'currentColor', o: 0.32 },
    { x: 74, w: 92, y: 96, c: 'currentColor', o: 0.3 },
    { x: 74, w: 148, y: 122, c: SIGNAL, o: 0.85 },
    { x: 118, w: 60, y: 148, c: 'currentColor', o: 0.3 },
    { x: 150, w: 84, y: 174, c: 'currentColor', o: 0.28 },
  ]

  return (
    <g>
      {spans.map((s, i) => (
        <motion.rect
          key={i}
          x={s.x}
          y={s.y}
          height="11"
          rx="2"
          fill={s.c}
          fillOpacity={s.o}
          animate={{ width: [0, s.w, s.w, 0] }}
          transition={{
            duration: 6,
            times: [0, 0.18, 0.86, 1],
            delay: i * 0.12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* the slow span, called out */}
      <motion.g
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 6, times: [0, 0.3, 0.86, 1], repeat: Infinity }}
      >
        <path d="M228 127h26" stroke={SIGNAL} strokeWidth="0.9" fill="none" />
        <text x="258" y="130" className="font-mono" fontSize="7.5" fill={SIGNAL}>
          847ms
        </text>
      </motion.g>

      {/* playhead */}
      <motion.line
        y1="38"
        y2="192"
        stroke={VERIFY}
        strokeWidth="0.9"
        animate={{ x1: [30, 286], x2: [30, 286], opacity: [0, 0.65, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.2, ease: 'linear' }}
      />

      <text
        x="30"
        y="210"
        className="font-mono"
        fontSize="6.5"
        fill="currentColor"
        stroke="none"
        opacity="0.5"
      >
        one request, every hop
      </text>
    </g>
  )
}

/* 06 - a greenfield platform assembling itself, layer by layer */
function Greenfield() {
  const layers = ['observability', 'delivery', 'infrastructure']

  return (
    <g {...S}>
      {layers.map((l, i) => {
        const y = 78 + i * 44
        const order = layers.length - 1 - i
        return (
          <g key={l}>
            <motion.path
              d={`M160 ${y} l82 25 -82 25 -82 -25 Z`}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [-30, 0, 0, -30],
                stroke: i === 0 ? [VERIFY, VERIFY, VERIFY, VERIFY] : undefined,
              }}
              transition={{
                duration: 7,
                times: [0, 0.2, 0.88, 1],
                delay: order * 0.45,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.text
              x="160"
              y={y + 5}
              textAnchor="middle"
              className="font-mono"
              fontSize="6.5"
              fill="currentColor"
              stroke="none"
              animate={{ opacity: [0, 0.75, 0.75, 0] }}
              transition={{
                duration: 7,
                times: [0, 0.24, 0.88, 1],
                delay: order * 0.45,
                repeat: Infinity,
              }}
            >
              {l}
            </motion.text>
          </g>
        )
      })}

      {/* build ticks climbing the side */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={`t${i}`}
          x={280}
          y={186 - i * 13}
          width="10"
          height="7"
          rx="1"
          fill={VERIFY}
          stroke="none"
          animate={{ opacity: [0.1, 0.9, 0.9, 0.1] }}
          transition={{
            duration: 7,
            times: [0, 0.25, 0.88, 1],
            delay: 0.5 + i * 0.28,
            repeat: Infinity,
          }}
        />
      ))}
    </g>
  )
}
