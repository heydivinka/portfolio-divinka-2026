import React from 'react'
import { motion } from 'framer-motion'
import { FaCode } from 'react-icons/fa'

interface SkillCategory {
  title: string
  items: string[]
}

interface SkillCardProps {
  skill: SkillCategory
  variants: any
}

export function SkillCard({ skill, variants }: SkillCardProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
      className="rounded-3xl border border-zinc-200 bg-white/75 p-6 sm:p-8 backdrop-blur transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-600"
    >
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{skill.title}</h3>
      <ul className="mt-5 space-y-3 text-base text-zinc-700 dark:text-zinc-300">
        {skill.items.map((entry) => (
          <li key={entry} className="flex items-center gap-2">
            <FaCode className="text-xs text-zinc-500 dark:text-zinc-400" />
            {entry}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
