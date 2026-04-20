import { useRef } from 'react'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '../lib/animations'
import { techMarquee, softSkillMarquee } from '../lib/data'
import type { IconType } from 'react-icons'

interface MarqueeItem {
  name: string
  icon: IconType
  color: string
}

interface MarqueeRowProps {
  items: MarqueeItem[]
  direction?: 'left' | 'right'
  duration?: number
}

function MarqueeRow({ items, direction = 'left', duration = 28 }: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  // direction: left = normal, right = reversed
  const animationStyle = {
    animationDuration: `${duration}s`,
    animationDirection: direction === 'right' ? 'reverse' : 'normal',
  }

  return (
    <div className="logo-marquee-viewport group/row">
      <div
        ref={trackRef}
        className="logo-marquee-track"
        style={animationStyle}
      >
        {[items, items].map((group, groupIndex) => (
          <div
            key={`group-${groupIndex}`}
            className="logo-marquee-group"
            aria-hidden={groupIndex === 1}
          >
            {group.map((tech, i) => {
              const Icon = tech.icon
              return (
                <MarqueeCard
                  key={`${tech.name}-${groupIndex}-${i}`}
                  tech={tech}
                  Icon={Icon}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function MarqueeCard({ tech, Icon }: { tech: MarqueeItem; Icon: IconType }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mx', `${x}px`)
    card.style.setProperty('--my', `${y}px`)
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.removeProperty('--mx')
    card.style.removeProperty('--my')
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="marquee-card logo-rect"
      style={{ '--accent': tech.color } as React.CSSProperties}
    >
      <Icon
        className="text-2xl transition-colors duration-300 marquee-icon"
        style={{ color: tech.color }}
      />
      <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 marquee-label transition-colors duration-300">
        {tech.name}
      </span>
    </div>
  )
}

export function TechMarquee() {
  return (
    <motion.section
      className="mt-12 sm:mt-16 py-8 space-y-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Row 1 — Tech Stack, scrolls left */}
      <motion.div variants={itemVariants}>
        <MarqueeRow items={techMarquee} direction="left" duration={28} />
      </motion.div>

      {/* Row 2 — Soft Skills, scrolls right */}
      <motion.div variants={itemVariants}>
        <MarqueeRow items={softSkillMarquee} direction="right" duration={22} />
      </motion.div>
    </motion.section>
  )
}