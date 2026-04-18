import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaCertificate,
  FaMoon,
  FaSun,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaFigma,
  FaWhatsapp,
  FaArrowRight,
  FaUser,
  FaCommentDots,
} from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiFramer, SiMongodb } from 'react-icons/si'

// Components
import { Navbar } from './components/Navbar'
import { SectionTitle } from './components/SectionTitle'
import { CustomCursor } from './components/CustomCursor'
import { ProjectCard } from './components/ProjectCard'
import { SkillCard } from './components/SkillCard'
import { TimelineItem } from './components/TimelineItem'
import { ContactInput } from './components/ContactInput'
import { supabase } from './lib/supabase'
import { ProjectCardSkeleton, CertificateCardSkeleton } from './components/Skeletons'

type SkillCategory = {
  title: string
  items: string[]
}

type Project = {
  title: string
  description: string
  tech: string[]
  url: string
  image?: string
}

type Certificate = {
  title: string
  url: string
  logo?: string
}

type TimelineEntry = {
  date: string
  title: string
  subtitle: string
  description?: string
  iconType: 'school' | 'work'
  highlight?: string
  logo?: string
}

const education: TimelineEntry[] = [
  {
    date: '2024 - Present',
    title: 'Vocational Highschool',
    subtitle: 'SMK Negeri 1 Ciomas',
    highlight: 'Software and Game Development',
    iconType: 'school',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=SMK',
  },
  {
    date: '2021 - 2024',
    title: 'Junior Highschool',
    subtitle: 'SMP Negeri 14 Kota Bogor',
    iconType: 'school',
  },
]

const experience: TimelineEntry[] = [
  {
    date: 'Jan - Apr 2026',
    title: 'Cohort Coding Camp 2026',
    subtitle: 'Coding Camp powered by DBS Foundation',
    description: 'Berkolaborasi dengan tim Capstone untuk menyelesaikan masalah UI/UX pada situs Agrikultur digital.',
    iconType: 'work',
  },
  {
    date: 'Jan - Apr 2025',
    title: 'Cohort Coding Camp 2025',
    subtitle: 'Coding Camp powered by DBS Foundation',
    description: 'Berkolaborasi dengan tim Capstone untuk menyelesaikan masalah pada Financial technology yang ada di Indonesia.',
    iconType: 'work',
  },
]

const skillCategories: SkillCategory[] = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'REST API'] },
  { title: 'Tooling', items: ['Git', 'Vite', 'Figma', 'Postman'] },
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: 'blur(8px)'
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 90,
      duration: 0.6
    }
  },
}

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [typedTitle, setTypedTitle] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [visibleProjects, setVisibleProjects] = useState(3)
  const [visibleCertificates, setVisibleCertificates] = useState(3)
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking')

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })

        const { data: certsData, error: certsError } = await supabase
          .from('certificates')
          .select('*')
          .order('created_at', { ascending: false })

        if (projectsError || certsError) throw projectsError || certsError

        setProjects(projectsData || [])
        setCertificates(certsData || [])
        
        setDbStatus('connected')
      } catch (err) {
        console.error('Database connection error:', err)
        setDbStatus('error')
      }
    }

    fetchData()
  }, [])
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
      <Navbar />
      <CustomCursor />

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
        className="relative mx-auto max-w-[1400px] px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pt-36"
      >
        <motion.section
          ref={heroSectionRef}
          className="overflow-hidden rounded-3xl border border-zinc-200 bg-white/75 p-6 shadow-soft backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-10 lg:p-14"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="mx-auto w-full max-w-6xl lg:flex lg:items-start lg:gap-12">
            <div className="lg:flex-1">
              <motion.p variants={itemVariants} className="text-xs uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 mb-6">
                Portfolio
              </motion.p>
              <h1 className="mt-8 max-w-xl text-3xl font-semibold leading-snug text-zinc-950 dark:text-zinc-50 sm:mt-10 sm:text-5xl">
                <span className="typing-caret">{typedTitle}</span>
              </h1>
              <motion.div
                ref={heroTextRef}
                style={{ opacity: heroSubOpacity, filter: heroSubFilter }}
              >
                <motion.p variants={itemVariants} className="mt-8 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg leading-relaxed">
                  Full-stack developer focused on TypeScript, React, and Node.js with clean motion and
                  responsive UI inspired by award-winning websites.
                </motion.p>
                <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
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
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
              className="w-full max-w-[200px] sm:max-w-[220px] lg:max-w-[250px] mx-auto lg:ml-auto shrink-0 mt-12 lg:mt-0"
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
            >
              <div className="rounded-[22px] border border-zinc-300/80 bg-zinc-100 p-2 shadow-[0_14px_36px_rgba(0,0,0,0.12)] dark:border-zinc-700 dark:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-400/50 transition-all duration-300 dark:hover:shadow-zinc-600/50">
                <div className="aspect-[4/5] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 hover:brightness-110 transition-all duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80"
                    alt="Profile"
                    className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

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

        <motion.section
          id="education"
          className="mt-24 sm:mt-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionTitle title="Education" subtitle="My academic journey and specialized training." variants={itemVariants} />
          <div className="mx-auto max-w-4xl">
            {education.map((item, idx) => (
              <TimelineItem key={idx} {...item} variants={itemVariants} />
            ))}
          </div>
        </motion.section>

        <motion.section
          id="experience"
          className="mt-24 sm:mt-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionTitle title="Experience" subtitle="Professional projects and collaborations." variants={itemVariants} />
          <div className="mx-auto max-w-4xl">
            {experience.map((item, idx) => (
              <TimelineItem key={idx} {...item} variants={itemVariants} />
            ))}
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="mt-24 sm:mt-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionTitle title="Skills & Languages" subtitle="Core technologies I use daily." variants={itemVariants} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((skill) => (
              <SkillCard key={skill.title} skill={skill} variants={itemVariants} />
            ))}
          </div>
        </motion.section>

        <motion.section
          id="video"
          className="mt-24 sm:mt-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <SectionTitle
            title="Featured YouTube Video"
            subtitle="Embed your intro, walkthrough, or project demo here."
            variants={itemVariants}
          />
          <motion.div
            variants={itemVariants}
            className="overflow-hidden rounded-3xl border border-zinc-200 bg-black shadow-2xl dark:border-zinc-800"
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

          {projects.length > visibleProjects && (
            <motion.div variants={itemVariants} className="mt-12 flex justify-center">
              <button 
                onClick={() => setVisibleProjects(prev => prev + 3)}
                className="group relative flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-8 py-3 text-sm font-bold text-zinc-900 backdrop-blur transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:border-zinc-600"
              >
                View More Projects
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}
        </motion.section>

        <motion.section
          id="certificates"
          className="mt-24 sm:mt-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionTitle
            title="Certificates"
            subtitle="Learning milestones that support quality delivery."
            variants={itemVariants}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dbStatus === 'checking' ? (
              [...Array(3)].map((_, i) => (
                <CertificateCardSkeleton key={i} />
              ))
            ) : certificates.length > 0 ? (
              certificates.slice(0, visibleCertificates).map((cert) => (
                <motion.a
                  key={cert.title}
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white/75 p-6 text-center backdrop-blur transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/70"
                >
                  {cert.logo && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 shadow-sm dark:bg-zinc-800">
                      <img src={cert.logo} alt={cert.title} className="h-full w-full object-contain" />
                    </div>
                  )}
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                    {cert.title}
                  </p>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors">
                    View Certificate
                  </span>
                </motion.a>
              ))
            ) : (
              <div className="col-span-full py-10 text-center">
                <p className="text-zinc-500">No certificates found.</p>
              </div>
            )}
          </div>

          {certificates.length > visibleCertificates && (
            <motion.div variants={itemVariants} className="mt-12 flex justify-center">
              <button 
                onClick={() => setVisibleCertificates(prev => prev + 3)}
                className="group relative flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-8 py-3 text-sm font-bold text-zinc-900 backdrop-blur transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-white dark:hover:border-zinc-600"
              >
                View More Certificates
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}
        </motion.section>

        <motion.section
          id="contact"
          className="relative mt-24 sm:mt-32 overflow-hidden rounded-[3rem] border border-zinc-200 bg-white/50 p-8 sm:p-20 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/50"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Background Decorative Lines */}
          <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
            <div className="absolute left-1/4 top-0 h-full w-px bg-zinc-950 dark:bg-white" />
            <div className="absolute left-2/4 top-0 h-full w-px bg-zinc-950 dark:bg-white" />
            <div className="absolute left-3/4 top-0 h-full w-px bg-zinc-950 dark:bg-white" />
          </div>

          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.95]">
                Let's build <br />
                something <br />
                <span className="text-zinc-400 dark:text-zinc-600">extraordinary.</span>
              </h2>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Whether you have a specific project in mind or just want to say hi,
                I'm always open to discussing new opportunities and creative ideas.
              </p>

              <div className="mt-12 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Email Me</p>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white">divinka@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <FaWhatsapp />
                  </div>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">WhatsApp</p>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white group-hover:underline">+62 812 3456 7890</p>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col justify-between gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Connect with me</h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: 'GitHub', icon: FaGithub, color: 'hover:text-zinc-900 dark:hover:text-white', url: '#' },
                    { name: 'LinkedIn', icon: FaLinkedin, color: 'hover:text-[#0077b5]', url: '#' },
                    { name: 'YouTube', icon: FaYoutube, color: 'hover:text-[#ff0000]', url: '#' },
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={clsx(
                        "flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-2xl text-zinc-400 shadow-sm transition-all dark:border-zinc-800 dark:bg-zinc-950",
                        social.color
                      )}
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-12 border-t border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Send a quick message</h3>
                <div className="space-y-4">
                  <ContactInput
                    label="Name"
                    placeholder="Enter your name"
                    icon={<FaUser />}
                    value={contactName}
                    onChange={setContactName}
                  />
                  <ContactInput
                    label="Message"
                    placeholder="What's on your mind?"
                    type="textarea"
                    maxLength={250}
                    icon={<FaCommentDots />}
                    value={contactMessage}
                    onChange={setContactMessage}
                  />
                </div>
              </div>

              <motion.a
                href={`mailto:divinka@example.com?subject=Message from ${contactName}&body=${contactMessage}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-zinc-900 px-8 py-5 text-lg font-bold text-white transition-all hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-2xl shadow-zinc-200/50 dark:shadow-none"
              >
                <span>Start a Conversation</span>
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
      </motion.main>

      <footer className="relative mt-20 border-t border-zinc-200 py-12 text-center text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} Divinka. Crafted with React, TypeScript, Tailwind, and Framer Motion.</p>
      </footer>
    </div>
  )
}
