import { motion } from 'framer-motion'

import { WavyUnderline } from './WavyUnderline'

interface SectionTitleProps {
  title: string
  subtitle: string
  variants?: any
}

export function SectionTitle({ title, subtitle, variants }: SectionTitleProps) {
  return (
    <motion.div 
      variants={variants}
      className="mb-10 sm:mb-14"
    >
      <h2 className="relative inline-block text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
        {title}
        <WavyUnderline />
      </h2>
      <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg leading-relaxed">{subtitle}</p>
    </motion.div>
  )
}
