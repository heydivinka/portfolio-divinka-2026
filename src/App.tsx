import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaExternalLinkAlt,
  FaCertificate,
  FaCode,
  FaMoon,
  FaSun,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaFigma,
} from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiFramer, SiMongodb } from 'react-icons/si'

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

const techMarquee = [
  { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178C6]' },
  { name: 'React', icon: FaReact, color: 'text-[#61DAFB]' },
  { name: 'Node.js', icon: FaNodeJs, color: 'text-[#5FA04E]' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-[#06B6D4]' },
  { name: 'Framer Motion', icon: SiFramer, color: 'text-[#0055FF]' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-[#47A248]' },
  { name: 'HTML5', icon: FaHtml5, color: 'text-[#E34F26]' },
  { name: 'CSS3', icon: FaCss3Alt, color: 'text-[#1572B6]' },
  { name: 'Git', icon: FaGitAlt, color: 'text-[#F05032]' },
  { name: 'Figma', icon: FaFigma, color: 'text-[#A259FF]' },
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
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">{subtitle}</p>
    </div>
  )
}

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [typedTitle, setTypedTitle] = useState('')
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const heroTextRef = useRef<HTMLDivElement | null>(null)
  const heroTitle = "Hi, I'm Divinka. I build modern and animated web experiences."
  const { scrollYProgress: pageScrollYProgress } = useScroll()

  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  })

  const heroSubOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [1, 0.85, 0.45, 0.1])
  const heroSubSaturate = useTransform(scrollYProgress, [0, 1], [1, 0.35])
  const heroSubFilter = useMotionTemplate`saturate(${heroSubSaturate})`

  const pageTextOpacity = useTransform(pageScrollYProgress, [0, 0.65, 1], [1, 0.9, 0.82])
  const pageTextSaturate = useTransform(pageScrollYProgress, [0, 1], [1, 0.82])
  const pageTextFilter = useMotionTemplate`saturate(${pageTextSaturate})`

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      return
    }
    if (savedTheme === 'light') {
      setIsDark(false)
      return
    }
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    let index = 0
    setTypedTitle('')
    const timer = window.setInterval(() => {
      index += 1
      setTypedTitle(heroTitle.slice(0, index))
      if (index >= heroTitle.length) {
        window.clearInterval(timer)
      }
    }, 28)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <div className="soft-cursor-light pointer-events-none fixed inset-0 dark:hidden" />
      <div className="soft-cursor-dark pointer-events-none fixed inset-0 hidden dark:block" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,.08),transparent_55%)]" />

      <button
        type="button"
        onClick={() => setIsDark((prev) => !prev)}
        className="fixed right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/90 px-3 py-2 text-xs font-medium text-zinc-700 backdrop-blur transition hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200 dark:hover:bg-zinc-900 sm:right-6 sm:top-6"
      >
        {isDark ? <FaSun /> : <FaMoon />}
        {isDark ? 'Light' : 'Dark'}
      </button>

      <motion.main
        style={{ opacity: pageTextOpacity, filter: pageTextFilter }}
        className="relative mx-auto max-w-6xl px-4 pb-12 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-10"
      >
        <motion.section
          ref={heroSectionRef}
          className="overflow-hidden rounded-3xl border border-zinc-200 bg-white/75 p-6 shadow-soft backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="mx-auto w-full max-w-4xl">
              <motion.div variants={item} className="mb-5 w-full max-w-[150px] sm:max-w-[170px]">
                <div className="rounded-[22px] border border-zinc-300/80 bg-zinc-100 p-2 shadow-[0_14px_36px_rgba(0,0,0,0.12)] dark:border-zinc-700 dark:bg-zinc-800">
                  <div className="aspect-[4/5] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80"
                      alt="Profile"
                      className="h-full w-full object-cover grayscale"
                    />
                  </div>
                </div>
              </motion.div>
              <motion.p variants={item} className="text-xs uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                Portfolio
              </motion.p>
              <h1 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-zinc-950 dark:text-zinc-50 sm:mt-5 sm:text-5xl">
                <span className="typing-caret">{typedTitle}</span>
              </h1>
              <motion.div
                ref={heroTextRef}
                style={{ opacity: heroSubOpacity, filter: heroSubFilter }}
              >
                <motion.p variants={item} className="mt-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
                  Full-stack developer focused on TypeScript, React, and Node.js with clean motion and
                  responsive UI inspired by award-winning websites.
                </motion.p>
                <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
                  {['TypeScript', 'React', 'Node.js', 'Framer Motion', 'Tailwind CSS'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-300 bg-zinc-200/70 px-3 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mt-6 rounded-2xl border border-zinc-200 bg-white/80 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div variants={item} className="logo-marquee-viewport">
            <div className="logo-marquee-track">
              {[techMarquee, techMarquee].map((group, groupIndex) => (
                <div key={`group-${groupIndex}`} className="logo-marquee-group" aria-hidden={groupIndex === 1}>
                  {group.map((tech) => {
                    const Icon = tech.icon
                    return (
                      <div key={`${tech.name}-${groupIndex}`} className="logo-chip">
                        <Icon className={clsx('text-lg', tech.color)} />
                        <span className="text-zinc-700 dark:text-zinc-200">{tech.name}</span>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
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
                className="rounded-2xl border border-zinc-200 bg-white/75 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70"
              >
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{skill.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {skill.items.map((entry) => (
                    <li key={entry} className="flex items-center gap-2">
                      <FaCode className="text-xs text-zinc-500 dark:text-zinc-400" />
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
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-black shadow-xl dark:border-zinc-800"
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
                  'group rounded-2xl border border-zinc-200 bg-white/75 p-5 backdrop-blur transition dark:border-zinc-800 dark:bg-zinc-900/70',
                  'hover:-translate-y-1 hover:border-zinc-400 hover:bg-white dark:hover:border-zinc-600 dark:hover:bg-zinc-900',
                  index === 0 && 'sm:col-span-2 xl:col-span-1',
                )}
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((stack) => (
                    <span
                      key={stack}
                      className="rounded-full border border-zinc-300 bg-zinc-200/70 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
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
                className="rounded-xl border border-zinc-200 bg-white/75 p-4 text-sm text-zinc-700 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300"
              >
                <p className="flex items-start gap-2">
                  <FaCertificate className="mt-0.5 text-zinc-500 dark:text-zinc-400" />
                  {cert}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="mt-12 rounded-3xl border border-zinc-200 bg-zinc-100/70 p-6 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-8"
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
      </motion.main>

      <footer className="relative border-t border-zinc-200 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} Your Name. Crafted with React, TypeScript, Node.js, Tailwind, and Framer Motion.</p>
      </footer>
    </div>
  )
}
