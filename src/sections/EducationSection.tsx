import { motion } from 'framer-motion'
import { SectionTitle } from '../components/SectionTitle'
import { TimelineItem } from '../components/TimelineItem'
import { containerVariants, itemVariants } from '../lib/animations'
import { education } from '../lib/data'

export function EducationSection() {
  return (
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
  )
}
