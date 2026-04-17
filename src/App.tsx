import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaExternalLinkAlt,
  FaCertificate,
  FaCode,
} from 'react-icons/fa'

type SkillCategory = {
  title: string
  items: string[]
}

type Project = {
  title: string
  description: string
  tech: string[]
  url: string
}

const skillCategories: SkillCategory[] = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'REST API'] },
  { title: 'Tooling', items: ['Git', 'Vite', 'Figma', 'Postman'] },
]

const projects: Project[] = [
  {
    title: 'Animated Landing Page',
    description: 'High-converting product page with smooth section transitions and mobile-first UX.',
    tech: ['React', 'TypeScript', 'Framer Motion'],
    url: '#',
  },
  {
    title: 'Portfolio CMS',
    description: 'Portfolio manager with CRUD dashboard and role-based access for managing projects.',
    tech: ['Node.js', 'Express', 'MongoDB'],
    url: '#',
  },
  {
    title: 'UI Component Library',
    description: 'Reusable design system components inspired by award-winning product websites.',
    tech: ['React', 'Tailwind CSS', 'Storybook'],
    url: '#',
  },
]

const certificates = [
  'Meta Front-End Developer Certificate',
  'JavaScript Algorithms and Data Structures',
  'Responsive Web Design Certification',
]

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">{subtitle}</p>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-mesh-gradient" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,.14),transparent_36%)]" />

      <main className="relative mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <motion.section
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl sm:p-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={item} className="text-xs uppercase tracking-[0.25em] text-sky-300">
            Portfolio
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl"
          >
            Hi, I&apos;m Your Name. I build modern and animated web experiences.
          </motion.h1>
          <motion.p variants={item} className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
            Full-stack developer focused on TypeScript, React, and Node.js with clean motion and
            responsive UI inspired by award-winning websites.
          </motion.p>
          <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
            {['TypeScript', 'React', 'Node.js', 'Framer Motion', 'Tailwind CSS'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-100"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="skills"
          className="mt-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionTitle title="Skills & Languages" subtitle="Core technologies I use daily." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((skill) => (
              <motion.div
                key={skill.title}
                variants={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <h3 className="text-lg font-medium text-white">{skill.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {skill.items.map((entry) => (
                    <li key={entry} className="flex items-center gap-2">
                      <FaCode className="text-xs text-sky-300" />
                      {entry}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="video"
          className="mt-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <SectionTitle
            title="Featured YouTube Video"
            subtitle="Embed your intro, walkthrough, or project demo here."
          />
          <motion.div
            variants={item}
            className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-xl"
          >
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Portfolio introduction video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          id="projects"
          className="mt-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionTitle
            title="Projects"
            subtitle="Selected work that mixes aesthetics, UX, and engineering."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.a
                key={project.title}
                variants={item}
                href={project.url}
                className={clsx(
                  'group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition',
                  'hover:-translate-y-1 hover:border-sky-300/40 hover:bg-white/10',
                  index === 0 && 'sm:col-span-2 xl:col-span-1',
                )}
              >
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((stack) => (
                    <span
                      key={stack}
                      className="rounded-full border border-purple-300/25 bg-purple-400/10 px-2.5 py-1 text-xs text-purple-100"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-sky-300">
                  View project <FaExternalLinkAlt className="text-xs transition group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="certificates"
          className="mt-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionTitle
            title="Certificates"
            subtitle="Learning milestones that support quality delivery."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <motion.article
                key={cert}
                variants={item}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200"
              >
                <p className="flex items-start gap-2">
                  <FaCertificate className="mt-0.5 text-amber-300" />
                  {cert}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <SectionTitle title="Contact" subtitle="Let’s collaborate on your next product." />
          <motion.div variants={item} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a className="contact-card" href="mailto:youremail@example.com">
              <FaEnvelope />
              <span>youremail@example.com</span>
            </a>
            <a className="contact-card" href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub />
              <span>GitHub</span>
            </a>
            <a className="contact-card" href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
            <a className="contact-card" href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
              <span>YouTube</span>
            </a>
          </motion.div>
        </motion.section>
      </main>

      <footer className="relative border-t border-white/10 py-6 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Your Name. Crafted with React, TypeScript, Node.js, Tailwind, and Framer Motion.</p>
      </footer>
    </div>
  )
}
