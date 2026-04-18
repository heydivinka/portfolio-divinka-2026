import { motion } from 'framer-motion'
import { SectionTitle } from '../components/SectionTitle'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectCardSkeleton } from '../components/Skeletons'
import { FaArrowRight } from 'react-icons/fa'
import { containerVariants, itemVariants } from '../lib/animations'
import type { Project } from '../lib/types'

interface ProjectsSectionProps {
  dbStatus: 'checking' | 'connected' | 'error'
  projects: Project[]
  visibleProjects: number
  setVisibleProjects: React.Dispatch<React.SetStateAction<number>>
}

export function ProjectsSection({
  dbStatus,
  projects,
  visibleProjects,
  setVisibleProjects
}: ProjectsSectionProps) {
  return (
    <motion.section
      id="projects"
      className="mt-24 sm:mt-32"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionTitle
        title="Projects"
        subtitle="Selected work that mixes aesthetics, UX, and engineering."
        variants={itemVariants}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dbStatus === 'checking' ? (
          [...Array(3)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))
        ) : projects.length > 0 ? (
          projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              variants={itemVariants}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-zinc-500">No projects found in the database.</p>
          </div>
        )}
      </div>

      {projects.length > 6 && (
        <motion.div variants={itemVariants} className="mt-12 flex justify-center">
          {projects.length > visibleProjects ? (
            <button
              onClick={() => setVisibleProjects(prev => prev + 3)}
              className="group relative flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-8 py-3 text-sm font-bold text-zinc-900 backdrop-blur transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:border-zinc-600"
            >
              View More Projects
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={() => {
                setVisibleProjects(6)
                const el = document.getElementById('projects')
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 100
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
              }}
              className="group relative flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-8 py-3 text-sm font-bold text-zinc-900 backdrop-blur transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:border-zinc-600"
            >
              Show Less
              <FaArrowRight className="text-xs transition-transform rotate-[270deg]" />
            </button>
          )}
        </motion.div>
      )}
    </motion.section>
  )
}
