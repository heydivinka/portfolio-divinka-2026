import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface SkillItem {
  name: string
  progress: number
}

interface SkillCategory {
  title: string
  color?: string
  items: SkillItem[]
}

interface SkillCardProps {
  skill: SkillCategory
  variants: any
  isActive?: boolean
}

function AnimatedNumber({ value, trigger }: { value: number; trigger: boolean }) {
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (v) => Math.round(v))
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!trigger) return
    const controls = animate(motionVal, value, {
      duration: 1.4,
      ease: [0.25, 1, 0.5, 1],
    })
    return controls.stop
  }, [trigger, value])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

const ACCENTS: Record<string, { bar: string; glow: string; badge: string; blob: string }> = {
  default: {
    bar: 'from-violet-500 to-indigo-500',
    glow: 'rgba(139,92,246,0.18)',
    badge: 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20',
    blob: 'bg-violet-500',
  },
  blue: {
    bar: 'from-sky-400 to-blue-600',
    glow: 'rgba(56,189,248,0.18)',
    badge: 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20',
    blob: 'bg-sky-500',
  },
  green: {
    bar: 'from-emerald-400 to-teal-500',
    glow: 'rgba(52,211,153,0.18)',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
    blob: 'bg-emerald-500',
  },
  amber: {
    bar: 'from-amber-400 to-orange-500',
    glow: 'rgba(251,191,36,0.18)',
    badge: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
    blob: 'bg-amber-400',
  },
  rose: {
    bar: 'from-rose-400 to-pink-600',
    glow: 'rgba(251,113,133,0.18)',
    badge: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
    blob: 'bg-rose-500',
  },
}

function FrontendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

function BackendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="4" width="18" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="11" width="18" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="6.5" r="1" fill="currentColor" />
      <circle cx="7" cy="13.5" r="1" fill="currentColor" />
      <line x1="11" y1="6.5" x2="17" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="13.5" x2="17" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ToolingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type IconComponent = (props: { className?: string }) => React.ReactElement

const ICON_MAP: Record<string, IconComponent> = {
  blue: FrontendIcon,
  green: BackendIcon,
  amber: ToolingIcon,
  default: FrontendIcon,
}

export function SkillCard({ skill, variants, isActive = false }: SkillCardProps) {
  const colorKey = skill.color ?? 'default'
  const accent = ACCENTS[colorKey] ?? ACCENTS.default
  const avg = Math.round(skill.items.reduce((a, b) => a + b.progress, 0) / skill.items.length)
  const IconComponent = ICON_MAP[colorKey] ?? ICON_MAP.default

  const iconColorClass =
    colorKey === 'blue'
      ? 'text-sky-600 dark:text-sky-400'
      : colorKey === 'green'
        ? 'text-emerald-600 dark:text-emerald-400'
        : colorKey === 'amber'
          ? 'text-amber-600 dark:text-amber-400'
          : 'text-violet-600 dark:text-violet-400'

  return (
    <motion.div
      variants={variants}
      animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.93, opacity: 0.45 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative w-full flex-none rounded-3xl border border-zinc-200 bg-white/80 p-8 backdrop-blur-xl overflow-hidden dark:border-white/10 dark:bg-zinc-900/80"
      style={{ boxShadow: isActive ? `0 0 70px -10px ${accent.glow}` : 'none' }}
    >
      {/* Ambient blob */}
      <div
        className={`pointer-events-none absolute -top-12 -right-12 h-52 w-52 rounded-full blur-3xl opacity-[0.15] ${accent.blob}`}
      />

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <span
            className={`mb-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${accent.badge}`}
          >
            <IconComponent className={`h-3 w-3 ${iconColorClass}`} />
            Category
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {skill.title}
          </h3>
        </div>

        {/* Large decorative icon */}
        <div className={`${iconColorClass} opacity-30 dark:opacity-20`}>
          <IconComponent className="h-12 w-12" />
        </div>
      </div>

      {/* Skill bars */}
      <div className="space-y-5">
        {skill.items.map((entry, i) => (
          <div key={entry.name}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{entry.name}</span>
              <span className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                {isActive ? (
                  <>
                    <AnimatedNumber value={entry.progress} trigger={isActive} />%
                  </>
                ) : (
                  `${entry.progress}%`
                )}
              </span>
            </div>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${accent.bar}`}
                initial={{ width: 0 }}
                animate={isActive ? { width: `${entry.progress}%` } : { width: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 1, 0.5, 1],
                  delay: i * 0.09,
                }}
              />
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    duration: 1.4,
                    delay: 0.5 + i * 0.09,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer avg */}
      <div className="mt-8 flex items-center gap-3 border-t border-zinc-200 pt-5 dark:border-white/5">
        <span className="flex-1 text-xs text-zinc-500">Average proficiency</span>
        <span
          className={`font-mono text-sm font-bold bg-gradient-to-r ${accent.bar} bg-clip-text text-transparent`}
        >
          {avg}%
        </span>
      </div>
    </motion.div>
  )
}