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
      className="rounded-3xl border border-zinc-200 bg-white/75 p-6 sm:p-8 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70"
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
