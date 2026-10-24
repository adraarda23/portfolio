export interface Profile {
  id: number
  name: string
  title: string
  subtitle: string
  description: string
  githubUrl: string
  linkedinUrl: string
  email: string
}

export interface About {
  id: number
  intro: string
  educationTitle: string
  educationDetail: string
  educationPeriod: string
  currentRole: string
  currentCompany: string
  focusTitle: string
  focusDetail: string
  whatIDo: string[]
  ctaText: string
}

export interface Stat {
  id: number
  number: string
  label: string
  displayOrder: number
}

export interface Experience {
  id: number
  title: string
  company: string
  type: string
  location: string
  period: string
  duration: string
  description: string
  technologies: string[]
  displayOrder: number
}

export interface Skill {
  id: number
  name: string
  iconClass: string
  level: number
  displayOrder: number
  skillCategoryId: number
}

export interface SkillCategory {
  id: number
  title: string
  icon: string
  displayOrder: number
  skills: Skill[]
}

export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  category: string
  year: string
  githubUrl: string | null
  demoUrl: string | null
  displayOrder: number
}

export interface Contact {
  id: number
  email: string
  phone: string
  location: string
  introTitle: string
  introText: string
  ctaText: string
}

export interface SocialLink {
  id: number
  name: string
  iconClass: string
  url: string
  color: string
  displayOrder: number
}

export interface ContactFormPayload {
  name: string
  email: string
  subject?: string
  message: string
}

export interface LoginResponse {
  token: string
  username: string
}

export interface PortfolioData {
  profile: Profile
  about: About
  stats: Stat[]
  experiences: Experience[]
  skillCategories: SkillCategory[]
  projects: Project[]
  contact: Contact
  socialLinks: SocialLink[]
}

export type WithoutId<T> = Omit<T, 'id'>
