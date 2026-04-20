import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaFigma,
  FaLightbulb, FaUsers, FaPaintBrush, FaBolt, FaComments,
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
  {
    title: 'Frontend',
    color: 'blue',
    items: [
      { name: 'React', progress: 90 },
      { name: 'TypeScript', progress: 85 },
      { name: 'Tailwind CSS', progress: 95 },
      { name: 'Framer Motion', progress: 80 },
    ],
  },
  {
    title: 'Backend',
    color: 'green',
    items: [
      { name: 'Node.js', progress: 80 },
      { name: 'Express', progress: 75 },
      { name: 'REST API', progress: 85 },
    ],
  },
  {
    title: 'Tooling',
    color: 'amber',
    items: [
      { name: 'Git', progress: 85 },
      { name: 'Vite', progress: 90 },
      { name: 'Figma', progress: 70 },
      { name: 'Postman', progress: 80 },
    ],
  },
]

export const techMarquee = [
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Node.js', icon: FaNodeJs, color: '#5FA04E' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'Git', icon: FaGitAlt, color: '#F05032' },
  { name: 'Figma', icon: FaFigma, color: '#A259FF' },
]

export const softSkillMarquee = [
  { name: 'Problem Solving', icon: FaLightbulb, color: '#F5C414' },
  { name: 'Team Collaboration', icon: FaUsers, color: '#60A5FA' },
  { name: 'Creative Thinking', icon: FaPaintBrush, color: '#F472B6' },
  { name: 'Fast Learner', icon: FaBolt, color: '#34D399' },
  { name: 'Communication', icon: FaComments, color: '#A78BFA' },
]