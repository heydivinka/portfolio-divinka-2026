import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { clsx } from 'clsx'
import { FaBars, FaTimes } from 'react-icons/fa'

export function Navbar() {
  const [activeSection, setActiveSection] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const links = React.useMemo(() => [
    { name: 'Education', id: 'education' },
    { name: 'Experience', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Certificates', id: 'certificates' },
    { name: 'Contact', id: 'contact' },
  ], [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 640) return
      setIsVisible(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 2500)
    }

    const checkMobile = () => {
      if (window.innerWidth < 640) {
        setIsVisible(true)
      } else {
        // Initial hint on desktop
        setIsVisible(true)
        timerRef.current = setTimeout(() => {
          setIsVisible(false)
        }, 4000)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  useEffect(() => {
    const options = {
      rootMargin: '-10% 0px -60% 0px',
      threshold: [0, 0.1],
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
      if (isAtBottom) {
        setActiveSection('contact')
      }
    }

    const observer = new IntersectionObserver(callback, options)

    const handleBottomScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
      if (isAtBottom) {
        setActiveSection('contact')
      }
    }

    window.addEventListener('scroll', handleBottomScroll)

    const timer = setTimeout(() => {
      links.forEach((link) => {
        const el = document.getElementById(link.id)
        if (el) {
          observer.observe(el)
        }
      })
    }, 500)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleBottomScroll)
      links.forEach((link) => {
        const el = document.getElementById(link.id)
        if (el) {
          observer.unobserve(el)
        }
      })
    }
  }, [links])

  const handleMouseEnter = () => {
    if (window.innerWidth < 640) return
    setIsVisible(true)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  const handleMouseLeave = () => {
    if (window.innerWidth < 640) return
    timerRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 2500)
  }

  return (
    <>
      <div 
        onMouseEnter={handleMouseEnter}
        className="fixed left-0 top-0 z-[60] h-12 w-full"
      />

      <div className="fixed inset-x-0 top-6 z-[70] flex justify-center px-4 pointer-events-none">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.nav 
              layout
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ 
                type: 'spring',
                damping: 20,
                stiffness: 100
              }}
              className={clsx(
                "pointer-events-auto flex flex-col items-center justify-center rounded-[32px] border border-zinc-200/40 bg-white/75 shadow-xl shadow-zinc-200/20 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/75 dark:shadow-black/30 transition-colors duration-500",
                isOpen ? "w-full max-w-[400px] p-4" : "w-max p-1.5"
              )}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white sm:hidden transition-colors"
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                  >
                    {isOpen ? <FaTimes /> : <FaBars />}
                  </motion.div>
                  <span>{isOpen ? 'Close' : activeSection || 'Menu'}</span>
                </button>

                <div className="hidden sm:flex items-center gap-1">
                  <LayoutGroup id="nav-desktop">
                    {links.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => scrollTo(link.id)}
                        className={clsx(
                          'relative px-4 py-2 text-center transition-colors duration-300 outline-none',
                          activeSection === link.id ? 'text-zinc-950 dark:text-white' : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                        )}
                      >
                        {activeSection === link.id && (
                          <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 z-[-1] rounded-full bg-zinc-200/60 dark:bg-zinc-800/60"
                            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                          />
                        )}
                        <span className="text-sm font-bold">{link.name}</span>
                      </button>
                    ))}
                  </LayoutGroup>
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 150 }}
                    className="flex flex-col w-full mt-4 gap-1 sm:hidden overflow-hidden"
                  >
                    {links.map((link, idx) => (
                      <motion.button
                        key={link.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => scrollTo(link.id)}
                        className={clsx(
                          'relative w-full rounded-2xl px-4 py-3 text-left transition-colors duration-300 outline-none',
                          activeSection === link.id ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'
                        )}
                      >
                        <span className="text-sm font-bold">{link.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
