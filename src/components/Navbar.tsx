import React from 'react'
import { motion } from 'framer-motion'

export function Navbar() {
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

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="fixed left-1/2 top-6 z-50 flex -translate-x-1/2 items-center gap-6 rounded-full border border-zinc-200/40 bg-white/70 px-8 py-3.5 text-sm font-bold text-zinc-800 shadow-xl shadow-zinc-200/20 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/70 dark:text-zinc-100 dark:shadow-black/30 sm:gap-10"
    >
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => scrollTo(link.id)}
          className="transition-colors hover:text-zinc-500 dark:hover:text-zinc-400"
        >
          <span className="hover-underline">{link.name}</span>
        </button>
      ))}
    </motion.nav>
  )
}
