import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { containerVariants, itemVariants } from '../lib/animations'

export function HeroSection() {
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const heroTitle = "Hi, I'm Divinka. I build modern and animated web experiences."
  const [typedTitle, setTypedTitle] = useState('')

  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  })

  const heroSubOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [1, 0.85, 0.45, 0.1])
  const heroSubSaturate = useTransform(scrollYProgress, [0, 1], [1, 0.35])
  const heroSubFilter = useMotionTemplate`saturate(${heroSubSaturate})`
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])
  const heroTranslateY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const imageTranslateY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 8])

  useEffect(() => {
    let index = 0
    setTypedTitle('')
    const timer = window.setInterval(() => {
      index += 1
      setTypedTitle(heroTitle.slice(0, index))
      if (index >= heroTitle.length) window.clearInterval(timer)
    }, 28)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <motion.section
      id="hero"
      ref={heroSectionRef}
      style={{ scale: heroScale, y: heroTranslateY, transform: 'translateZ(0)' }}
      className="overflow-hidden rounded-3xl border border-zinc-200 bg-white/20 p-6 shadow-soft backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-10 lg:p-14 will-change-transform"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.1 }}
    >
      <div className="mx-auto w-full max-w-6xl lg:flex lg:items-start lg:gap-12">
        <div className="lg:flex-1">
          <motion.p variants={itemVariants} className="text-xs uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 mb-6">
            Portfolio
          </motion.p>
          <h1 className="mt-8 max-w-xl text-3xl font-semibold leading-snug text-zinc-950 dark:text-zinc-50 sm:mt-10 sm:text-5xl">
            <span className="typing-caret">{typedTitle}</span>
          </h1>

          <motion.div style={{ opacity: heroSubOpacity, filter: heroSubFilter }}>
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

        {/* Profile Image - Reverted to Right on Desktop, Center on Mobile */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          style={{ y: imageTranslateY, rotate: imageRotate }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="w-full max-w-[200px] sm:max-w-[220px] lg:max-w-[250px] mx-auto lg:ml-auto shrink-0 mt-12 lg:mt-0"
        >
          <div className="rounded-[22px] border border-zinc-300/80 bg-zinc-100 p-2 shadow-[0_14px_36px_rgba(0,0,0,0.12)] dark:border-zinc-700 dark:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-400/50 transition-all duration-300 dark:hover:shadow-zinc-600/50">
            <div className="aspect-[4/5] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 hover:brightness-110 transition-all duration-500">
              <img
                src="/profile.png"
                alt="Divinka Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
