import { MapPin } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { periodDuration } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

const typeStyles: Record<string, string> = {
  internship: 'bg-sage-100 text-sage-800',
  scholarship: 'bg-honey-100 text-honey-700',
  leadership: 'bg-clay-100 text-clay-700',
  'full-time': 'bg-cocoa-900 text-cream-50',
  freelance: 'bg-cream-300 text-cocoa-800',
}

export function Experience() {
  const { data } = usePortfolio()

  return (
    <section id="experience" className="section">
      <div className="container-x">
        <div className="rail">
          <SectionHeading index={2} path="/experience" title="Experience" />

          <ol className="mt-10 space-y-4">
            {data.experiences.map((exp, i) => {
              const duration = periodDuration(exp.period, exp.duration)
              return (
                <Reveal as="li" key={exp.id} delay={Math.min(i, 3) * 0.04}>
                  <article className="card card-hover grid gap-4 p-5 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-cocoa-500 sm:block sm:space-y-1.5">
                      <p className="font-medium text-cocoa-800">{exp.period}</p>
                      {duration && <p>{duration}</p>}
                      <p className="sm:pt-1">
                        <span className={`method ${typeStyles[exp.type.toLowerCase()] ?? 'bg-cream-300 text-cocoa-800'}`}>{exp.type.toLowerCase()}</span>
                      </p>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold leading-snug text-cocoa-900">
                        {exp.title} <span className="text-cocoa-400">@</span> <span className="text-clay-700">{exp.company}</span>
                      </h3>
                      {exp.location && (
                        <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-cocoa-500">
                          <MapPin size={12} /> {exp.location}
                        </p>
                      )}
                      <p className="mt-3 text-pretty text-[15px] leading-relaxed text-cocoa-600">{exp.description}</p>
                      {exp.technologies.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {exp.technologies.map((t) => (
                            <span key={t} className="tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
