import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaFigma,
} from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiFramer, SiMongodb } from 'react-icons/si'
import type { SkillCategory, TimelineEntry } from './types'

export const education: TimelineEntry[] = [
  {
    date: '2024 - Present',
    title: 'Vocational Highschool',
    subtitle: 'SMK Negeri 1 Ciomas',
    highlight: 'Software and Game Development',
    iconType: 'school',
    logo: '/smk-logo.png',
  },
  {
    date: '2021 - 2024',
    title: 'Junior Highschool',
    subtitle: 'SMP Negeri 14 Kota Bogor',
    iconType: 'school',
    logo: '/smp-logo.png',
  },
]

export const experience: TimelineEntry[] = [
  {
    date: 'Jan - Apr 2026',
    title: 'Cohort Coding Camp 2026',
    subtitle: 'Coding Camp powered by DBS Foundation',
    highlight: 'Bootcamp',
    description: 'Berkolaborasi dengan tim Capstone untuk menyelesaikan masalah UI/UX pada situs Agrikultur digital.',
    iconType: 'work',
    logo: '/cc-logo.png',
  },
  {
    date: 'Jan - Apr 2025',
    title: 'Cohort Coding Camp 2025',
    subtitle: 'Coding Camp powered by DBS Foundation',
    highlight: 'Bootcamp',
    description: 'Berkolaborasi dengan tim Capstone untuk menyelesaikan masalah pada Financial technology yang ada di Indonesia.',
    iconType: 'work',
    logo: '/cc-logo.png',
  },
]

export const skillCategories: SkillCategory[] = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'REST API'] },
  { title: 'Tooling', items: ['Git', 'Vite', 'Figma', 'Postman'] },
]

export const techMarquee = [
  { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178C6]' },
  { name: 'React', icon: FaReact, color: 'text-[#61DAFB]' },
  { name: 'Node.js', icon: FaNodeJs, color: 'text-[#5FA04E]' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-[#06B6D4]' },
  { name: 'Framer Motion', icon: SiFramer, color: 'text-[#0055FF]' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-[#47A248]' },
  { name: 'HTML5', icon: FaHtml5, color: 'text-[#E34F26]' },
  { name: 'CSS3', icon: FaCss3Alt, color: 'text-[#1572B6]' },
  { name: 'Git', icon: FaGitAlt, color: 'text-[#F05032]' },
  { name: 'Figma', icon: FaFigma, color: 'text-[#A259FF]' },
]
