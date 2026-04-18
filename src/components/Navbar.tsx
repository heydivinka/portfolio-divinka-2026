import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'

export function Navbar() {
  const [activeSection, setActiveSection] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
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
    }

    const observer = new IntersectionObserver(callback, options)

    // Delay observation slightly to ensure DOM is ready
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
      {/* Trigger Zone: Invisible area at the top to catch hover */}
      <div 
        onMouseEnter={handleMouseEnter}
        className="fixed left-0 top-0 z-[60] h-12 w-full"
      />

      <AnimatePresence>
        {isVisible && (
          <motion.nav 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ y: -100, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: -100, opacity: 0, x: '-50%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-6 z-[70] flex w-max max-w-[95vw] items-center justify-center gap-1 rounded-full border border-zinc-200/40 bg-white/70 p-1.5 text-[11px] font-bold text-zinc-800 shadow-xl shadow-zinc-200/20 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/70 dark:text-zinc-100 dark:shadow-black/30 sm:gap-2 sm:text-sm"
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
        )}
      </AnimatePresence>
    </>
  )
}
