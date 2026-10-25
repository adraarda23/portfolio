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
/** Years of active use for a skill, or 0 when unset / a legacy percentage. */
export const yearsOf = (level: number) => (level > 0 && level <= 30 ? level : 0)

export const yearsLabel = (level: number) => {
  const years = yearsOf(level)
  return years ? `${years} ${years === 1 ? 'yr' : 'yrs'}` : null
}

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  oca: 0, şub: 1, sub: 1, nis: 3, haz: 5, tem: 6, ağu: 7, agu: 7, eyl: 8, eki: 9, kas: 10, ara: 11,
}
const ONGOING = /^(present|now|current|today|günümüz|gunumuz|halen|devam)/i

/** Month index (year * 12 + month) for "Sep 2025"-style text, `now` for ongoing words, else null. */
function parseMonth(text: string, now: Date): number | null {
  const t = text.trim()
  if (ONGOING.test(t)) return now.getFullYear() * 12 + now.getMonth()
  const m = t.match(/^([\p{L}]{3,})\.?\s+(\d{4})$/u)
  const month = m ? MONTHS[m[1].slice(0, 3).toLocaleLowerCase('tr').replace(/ı/g, 'i')] : undefined
  return m && month !== undefined ? Number(m[2]) * 12 + month : null
}

/**
 * Duration of a period such as "Sep 2025 - Present", counted in whole months
 * with both ends included (like LinkedIn). Falls back to `fallback` when the
 * period can't be parsed, so hand-written durations keep working.
 */
export function periodDuration(period: string, fallback = '', now = new Date()): string {
  const parts = period.split(/\s+[-–—]\s+/)
  if (parts.length !== 2) return fallback
  const start = parseMonth(parts[0], now)
  const end = parseMonth(parts[1], now)
  if (start === null || end === null || end < start) return fallback
  const total = end - start + 1
  const years = Math.floor(total / 12)
  const months = total % 12
  const y = years ? `${years} ${years === 1 ? 'year' : 'years'}` : ''
  const mo = months ? `${months} ${months === 1 ? 'month' : 'months'}` : ''
  return [y, mo].filter(Boolean).join(' ')
}
