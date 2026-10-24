import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api, byOrder } from '@/lib/api'
import type { PortfolioData } from '@/lib/types'
import { fallbackData } from '@/data/fallback'

type Source = 'loading' | 'api' | 'fallback' | 'partial'

interface PortfolioContextValue {
  data: PortfolioData
  source: Source
  reload: () => Promise<void>
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

async function settle<T>(promise: Promise<T>, fallback: T): Promise<[T, boolean]> {
  try {
    const value = await promise
    return [value ?? fallback, value != null]
  } catch {
    return [fallback, false]
  }
}

export async function loadPortfolioData(): Promise<{ data: PortfolioData; source: Source }> {
  const f = fallbackData
  const results = await Promise.all([
    settle(api.profile.get(), f.profile),
    settle(api.about.get(), f.about),
    settle(api.stats.getAll(), f.stats),
    settle(api.experiences.getAll(), f.experiences),
    settle(api.skillCategories.getAll(), f.skillCategories),
    settle(api.projects.getAll(), f.projects),
    settle(api.contact.get(), f.contact),
    settle(api.socialLinks.getAll(), f.socialLinks),
  ] as const)

  const okCount = results.filter(([, ok]) => ok).length
  const source: Source = okCount === results.length ? 'api' : okCount === 0 ? 'fallback' : 'partial'

  const [profile, about, stats, experiences, skillCategories, projects, contact, socialLinks] = results.map(
    ([value]) => value,
  ) as [
    PortfolioData['profile'],
    PortfolioData['about'],
    PortfolioData['stats'],
    PortfolioData['experiences'],
    PortfolioData['skillCategories'],
    PortfolioData['projects'],
    PortfolioData['contact'],
    PortfolioData['socialLinks'],
  ]

  return {
    source,
    data: {
      profile,
      about,
      stats: byOrder(stats),
      experiences: byOrder(experiences),
      skillCategories: byOrder(skillCategories).map((c) => ({ ...c, skills: byOrder(c.skills ?? []) })),
      projects: byOrder(projects),
      contact,
      socialLinks: byOrder(socialLinks),
    },
  }
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(fallbackData)
  const [source, setSource] = useState<Source>('loading')

  const reload = async () => {
    const result = await loadPortfolioData()
    setData(result.data)
    setSource(result.source)
  }

  useEffect(() => {
    let cancelled = false
    loadPortfolioData().then((result) => {
      if (cancelled) return
      setData(result.data)
      setSource(result.source)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => ({ data, source, reload }), [data, source])

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
