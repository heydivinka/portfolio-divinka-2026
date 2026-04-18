import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { containerVariants, itemVariants } from '../lib/animations'
import { techMarquee } from '../lib/data'

export function TechMarquee() {
  return (
    <motion.section
      className="mt-12 sm:mt-16 py-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div variants={itemVariants} className="logo-marquee-viewport">
        <div className="logo-marquee-track">
          {[techMarquee, techMarquee].map((group, groupIndex) => (
            <div key={`group-${groupIndex}`} className="logo-marquee-group" aria-hidden={groupIndex === 1}>
              {group.map((tech) => {
                const Icon = tech.icon
                return (
                  <div key={`${tech.name}-${groupIndex}`} className="logo-rect">
                    <Icon className={clsx('text-2xl', tech.color)} />
                    <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{tech.name}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}
