import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  title: string
  description: string
  tech: string[]
  url: string
}

interface ProjectCardProps {
  project: Project
  index: number
  variants: any
}

export function ProjectCard({ project, index, variants }: ProjectCardProps) {
  return (
    <motion.a
      variants={variants}
      href={project.url}
      className={clsx(
        'group rounded-3xl border border-zinc-200 bg-white/75 p-6 sm:p-8 backdrop-blur transition dark:border-zinc-800 dark:bg-zinc-900/70',
        'hover:-translate-y-2 hover:border-zinc-400 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:hover:shadow-black/50',
        index === 0 && 'sm:col-span-2 xl:col-span-1',
      )}
    >
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
        <span className="hover-underline">{project.title}</span>
      </h3>
      <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{project.description}</p>
      <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
        {project.tech.map((stack) => (
          <span
            key={stack}
            className="rounded-full border border-zinc-300 bg-zinc-200/70 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
          >
            {stack}
          </span>
        ))}
      </div>
      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        <span className="hover-underline">View project</span>{' '}
        <FaExternalLinkAlt className="text-xs transition group-hover:translate-x-1" />
      </span>
    </motion.a>
  )
}
