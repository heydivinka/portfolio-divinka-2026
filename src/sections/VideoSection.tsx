import { motion } from 'framer-motion'
import { SectionTitle } from '../components/SectionTitle'
import { containerVariants, itemVariants } from '../lib/animations'

export function VideoSection() {
  return (
    <motion.section
      id="video"
      className="mt-24 sm:mt-32"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.25 }}
    >
      <SectionTitle
        title="Introduction"
        subtitle="A little bit of my Introduction..."
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
  )
}
