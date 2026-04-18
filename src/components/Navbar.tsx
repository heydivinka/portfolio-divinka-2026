import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

export function Navbar() {
  const [activeSection, setActiveSection] = useState('')

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const links = [
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Certificates', id: 'certificates' },
    { name: 'Contact', id: 'contact' },
  ]

  useEffect(() => {
    const observers = new Map()
    const options = {
      rootMargin: '-150px 0px -60% 0px',
      threshold: 0,
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    links.forEach((link) => {
      const el = document.getElementById(link.id)
      if (el) {
        observer.observe(el)
      }
    })

    return () => {
      links.forEach((link) => {
        const el = document.getElementById(link.id)
        if (el) {
          observer.unobserve(el)
        }
      })
    }
  }, [])

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="fixed left-1/2 top-6 z-50 flex w-max max-w-[95vw] items-center justify-center gap-1 rounded-full border border-zinc-200/40 bg-white/70 p-1.5 text-[11px] font-bold text-zinc-800 shadow-xl shadow-zinc-200/20 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/70 dark:text-zinc-100 dark:shadow-black/30 sm:gap-2 sm:text-sm"
    >
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => scrollTo(link.id)}
          className={clsx(
            'relative px-4 py-2 transition-colors duration-300',
            activeSection === link.id ? 'text-zinc-950 dark:text-white' : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
          )}
        >
          {activeSection === link.id && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 z-[-1] rounded-full bg-zinc-200/50 dark:bg-zinc-800/50"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span>{link.name}</span>
        </button>
      ))}
    </motion.nav>
  )
}
