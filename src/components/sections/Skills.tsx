import { usePortfolio } from '@/context/PortfolioContext'
import { Icon } from '@/lib/icons'
import { yearsOf } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** One block per year of active use, so the bar reads like a tally. */
function YearBar({ years, scale }: { years: number; scale: number }) {
  return (
    <div className="flex gap-[3px]" aria-hidden>
      {Array.from({ length: scale }, (_, i) => (
        <span key={i} className={`h-2.5 w-2 rounded-[2px] sm:w-2.5 ${i < years ? 'bg-clay-500' : 'bg-cocoa-900/[0.08]'}`} />
      ))}
    </div>
  )
}

export function Skills() {
  const { data } = usePortfolio()
  const categories = data.skillCategories.filter((c) => c.skills.length > 0)
  const maxYears = Math.max(0, ...categories.flatMap((c) => c.skills.map((s) => yearsOf(s.level))))
  const scale = Math.min(Math.max(maxYears, 5), 10)

  return (
    <section id="skills" className="section">
      <div className="container-x">
        <div className="rail">
          <SectionHeading
            index={3}
            path="/skills"
            title="Skills"
            action={
              <p className="flex items-center gap-2 font-mono text-xs text-cocoa-500">
                <span className="h-2.5 w-2.5 rounded-[2px] bg-clay-500" /> = 1 year of active development
              </p>
            }
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {categories.map((cat, i) => {
              const skills = [...cat.skills].sort((a, b) => yearsOf(b.level) - yearsOf(a.level) || a.displayOrder - b.displayOrder)
              return (
                <Reveal key={cat.id} delay={(i % 2) * 0.06} className="card p-5 sm:p-6">
                  <h3 className="flex items-center justify-between font-mono text-sm font-semibold text-cocoa-900">
                    <span>
                      <span className="text-cocoa-400">./</span>
                      {cat.title.toLowerCase()}
                    </span>
                    <span className="text-xs font-normal text-cocoa-400">{skills.length}</span>
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {skills.map((s) => {
                      const years = yearsOf(s.level)
                      return (
                        <li key={s.id} className="flex items-center gap-3">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cream-200 text-sm text-cocoa-700">
                            <Icon name={s.iconClass} />
                          </span>
                          <span className="min-w-0 flex-1 truncate text-sm font-medium text-cocoa-800">{s.name}</span>
                          <YearBar years={years} scale={scale} />
                          <span className="w-12 shrink-0 text-right font-mono text-xs text-cocoa-600">
                            {years ? `${years} ${years === 1 ? 'yr' : 'yrs'}` : '—'}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
