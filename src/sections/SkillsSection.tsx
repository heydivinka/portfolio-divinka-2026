import { motion } from 'framer-motion'
import { SectionTitle } from '../components/SectionTitle'
import { SkillCard } from '../components/SkillCard'
import { containerVariants, itemVariants } from '../lib/animations'
import { skillCategories } from '../lib/data'

export function SkillsSection() {
  return (
    <motion.section
      id="skills"
      className="mt-24 sm:mt-32"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.2 }}
    >
      <SectionTitle title="Skills & Languages" subtitle="Core technologies I use daily." variants={itemVariants} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((skill) => (
          <SkillCard key={skill.title} skill={skill} variants={itemVariants} />
        ))}
      </div>
    </motion.section>
  )
}
