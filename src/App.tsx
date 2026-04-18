import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

// Components
import { Navbar } from './components/Navbar'
import { CustomCursor } from './components/CustomCursor'

// Sections
import { HeroSection } from './sections/HeroSection'
import { TechMarquee } from './sections/TechMarquee'
import { EducationSection } from './sections/EducationSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { SkillsSection } from './sections/SkillsSection'
import { VideoSection } from './sections/VideoSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { CertificatesSection } from './sections/CertificatesSection'
import { ContactSection } from './sections/ContactSection'
import { ConfirmationModal } from './components/ConfirmationModal'

// Lib
import { supabase } from './lib/supabase'
import type { Project, Certificate } from './lib/types'

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [projects, setProjects] = useState<Project[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [visibleProjects, setVisibleProjects] = useState(3)
  const [visibleCertificates, setVisibleCertificates] = useState(3)
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { scrollYProgress: pageScrollYProgress } = useScroll()
  const pageTextOpacity = useTransform(pageScrollYProgress, [0, 0.65, 1], [1, 0.9, 0.82])
  const pageTextSaturate = useTransform(pageScrollYProgress, [0, 1], [1, 0.82])
  const pageTextFilter = useMotionTemplate`saturate(${pageTextSaturate})`

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if (!contactName.trim() || !emailRegex.test(contactEmail) || contactMessage.trim().length < 5) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
      return
    }
    setSubmitStatus('loading')
    const { error } = await supabase.from('messages').insert({
      name: contactName.trim(),
      email: contactEmail.trim(),
      message: contactMessage.trim(),
    })
    if (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
    } else {
      setSubmitStatus('success')
      setContactName('')
      setContactEmail('')
      setContactMessage('')
    }
    setTimeout(() => setSubmitStatus('idle'), 4000)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
    } else if (savedTheme === 'light') {
      setIsDark(false)
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

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
        className="fixed right-4 top-4 z-[10001] inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/90 px-3 py-2 text-xs font-medium text-zinc-700 backdrop-blur transition hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200 dark:hover:bg-zinc-900 sm:right-6 sm:top-6"
      >
        {isDark ? <FaSun /> : <FaMoon />}
        {isDark ? 'Light' : 'Dark'}
      </button>

      <motion.main
        style={{ opacity: pageTextOpacity, filter: pageTextFilter }}
        className="relative mx-auto max-w-[1400px] px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pt-36"
      >
        <HeroSection />
        <TechMarquee />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <VideoSection />
        
        <ProjectsSection 
          dbStatus={dbStatus}
          projects={projects}
          visibleProjects={visibleProjects}
          setVisibleProjects={setVisibleProjects}
        />

        <CertificatesSection 
          dbStatus={dbStatus}
          certificates={certificates}
          visibleCertificates={visibleCertificates}
          setVisibleCertificates={setVisibleCertificates}
        />

        <ContactSection 
          handleSubmit={async (e) => {
            e.preventDefault()
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
            if (!contactName.trim() || !emailRegex.test(contactEmail) || contactMessage.trim().length < 5) {
              setSubmitStatus('error')
              setTimeout(() => setSubmitStatus('idle'), 3000)
              return
            }
            setIsModalOpen(true)
          }}
          contactName={contactName}
          setContactName={setContactName}
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
          contactMessage={contactMessage}
          setContactMessage={setContactMessage}
          submitStatus={submitStatus}
          setIsModalOpen={setIsModalOpen}
        />
      </motion.main>

      <footer className="relative mt-20 border-t border-zinc-200 py-12 text-center text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} Divinka. Crafted with React, TypeScript, Tailwind, and Framer Motion.</p>
      </footer>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false)
          handleSubmit({ preventDefault: () => {} } as any)
        }}
        isLoading={submitStatus === 'loading'}
      />
    </div>
  )
}
