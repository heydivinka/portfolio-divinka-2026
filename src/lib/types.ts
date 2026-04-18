export type SkillCategory = {
  title: string
  items: string[]
}

export type Project = {
  title: string
  description: string
  tech: string[]
  url: string
  image?: string
}

export type Certificate = {
  title: string
  url: string
  logo?: string
}

export type TimelineEntry = {
  date: string
  title: string
  subtitle: string
  description?: string
  iconType: 'school' | 'work'
  highlight?: string
  logo?: string
}
