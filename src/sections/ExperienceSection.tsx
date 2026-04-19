import { motion } from 'framer-motion'
import { SectionTitle } from '../components/SectionTitle'
import { TimelineItem } from '../components/TimelineItem'
import { containerVariants, itemVariants } from '../lib/animations'
import { experience } from '../lib/data'

export function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="mt-24 sm:mt-32"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.2 }}
    >
      <SectionTitle title="Experience" subtitle="Professional projects and collaborations." variants={itemVariants} />
      <div className="mx-auto max-w-4xl">
        {experience.map((item, idx) => (
          <TimelineItem key={idx} {...item} variants={itemVariants} />
        ))}
      </div>
    </motion.section>
  )
}
