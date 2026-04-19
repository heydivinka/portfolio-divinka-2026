import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { SkillCard } from '../components/SkillCard'
import { containerVariants, itemVariants } from '../lib/animations'
import { skillCategories } from '../lib/data'

export function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const dragStartX = useRef(0)
  const total = skillCategories.length

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total)
  const next = () => setActiveIndex((i) => (i + 1) % total)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    const delta = dragStartX.current - e.clientX
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev()
    }
  }

  const leftIdx = (activeIndex - 1 + total) % total
  const rightIdx = (activeIndex + 1) % total

  return (
    <motion.section
      id="skills"
      className="mt-24 sm:mt-32"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.15 }}
    >
      <SectionTitle
        title="Skills & Languages"
        subtitle="Core technologies I use daily."
        variants={itemVariants}
      />

      {/* Carousel */}
      <div className="relative mt-12 flex items-center justify-center">

        {/* Left ghost card */}
        <div
          className="absolute left-0 z-10 hidden w-[260px] lg:block cursor-pointer"
          onClick={prev}
        >
          <SkillCard skill={skillCategories[leftIdx]} variants={{}} isActive={false} />
        </div>

        {/* Center active card */}
        <div
          className="relative z-20 w-full max-w-md cursor-grab active:cursor-grabbing select-none"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              <SkillCard
                skill={skillCategories[activeIndex]}
                variants={{}}
                isActive={true}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right ghost card */}
        <div
          className="absolute right-0 z-10 hidden w-[260px] lg:block cursor-pointer"
          onClick={next}
        >
          <SkillCard skill={skillCategories[rightIdx]} variants={{}} isActive={false} />
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
          aria-label="Previous"
        >
          ←
        </button>

        <div className="flex gap-2">
          {skillCategories.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 bg-zinc-800 dark:bg-white'
                  : 'w-1.5 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-500'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
          aria-label="Next"
        >
          →
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-600 select-none">
        Drag · swipe · or use ← → keys
      </p>
    </motion.section>
  )
}