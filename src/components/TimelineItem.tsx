import { motion } from 'framer-motion'
import { FaSchool, FaBriefcase } from 'react-icons/fa'

interface TimelineItemProps {
  date: string
  title: string
  subtitle: string
  description?: string
  iconType: 'school' | 'work'
  highlight?: string
  logo?: string
  variants: any
}

export function TimelineItem({ date, title, subtitle, description, iconType, highlight, logo, variants }: TimelineItemProps) {
  return (
    <motion.div variants={variants} className="relative pl-12 sm:pl-32 pb-16 last:pb-0">
      {/* Rotated Date on the far left */}
      <div className="absolute left-0 top-0 hidden sm:flex h-full w-24 items-start justify-center">
        <span className="origin-center -rotate-90 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 translate-y-12">
          {date}
        </span>
      </div>

      {/* Timeline Line */}
      <div className="absolute left-[1.35rem] sm:left-[6.35rem] top-2 h-full w-[2px] bg-gradient-to-b from-zinc-300 via-zinc-200 to-transparent dark:from-zinc-700 dark:via-zinc-800" />
      
      {/* Timeline Dot/Icon */}
      <div className="absolute left-[0.65rem] sm:left-[5.65rem] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-950 z-10">
        {iconType === 'school' ? (
          <FaSchool className="text-xs text-zinc-600 dark:text-zinc-400" />
        ) : (
          <FaBriefcase className="text-xs text-zinc-600 dark:text-zinc-400" />
        )}
      </div>

      {/* Content Card */}
      <div className="group relative rounded-3xl border border-zinc-200 bg-white/50 p-6 sm:p-8 backdrop-blur transition-all duration-300 hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/60">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <span className="mb-2 block text-[10px] font-bold tracking-widest text-zinc-400 sm:hidden">{date}</span>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                {title}
              </h3>
              {highlight && (
                <span className="rounded-full bg-zinc-200/50 px-3 py-1 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300 border border-zinc-300/50 dark:border-zinc-700/50">
                  {highlight}
                </span>
              )}
            </div>
            
            <div className="mt-3 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  {subtitle}
                </p>
                {logo && (
                  <div className="h-5 w-5 shrink-0 overflow-hidden">
                    <img 
                      src={logo} 
                      alt="Logo" 
                      className="h-full w-full object-contain" 
                    />
                  </div>
                )}
              </div>
            </div>
            {description && (
              <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 whitespace-pre-line">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
