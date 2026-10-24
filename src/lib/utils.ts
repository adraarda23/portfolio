import { clsx, type ClassValue } from 'clsx'

export const cn = (...inputs: ClassValue[]) => clsx(inputs)

export const splitList = (value: string) =>
  value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

export const joinList = (list: string[] | undefined) => (list ?? []).join(', ')

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0]?.toUpperCase())
    .join('')

/** `level` on a skill stores years of active use; values above 30 are legacy percentages and are hidden. */
export const yearsLabel = (years: number) => (years > 0 && years <= 30 ? `${years} ${years === 1 ? 'yr' : 'yrs'}` : null)
