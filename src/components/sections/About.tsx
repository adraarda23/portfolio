import { usePortfolio } from '@/context/PortfolioContext'
import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function About() {
  const { data } = usePortfolio()
  const { about, stats } = data

  const facts = [
    { key: 'education', title: about.educationTitle, detail: about.educationDetail },
    { key: 'current', title: about.currentRole, detail: about.currentCompany },
    { key: 'focus', title: about.focusTitle, detail: about.focusDetail },
  ].filter((f) => f.title)

  return (
    <section id="about" className="section">
      <div className="container-x">
        <div className="rail">
          <SectionHeading index={1} path="/about" title="About" description={about.intro} />

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <Reveal className="card p-5 sm:p-7">
              <p className="font-mono text-xs text-cocoa-500">what_i_do[]</p>
              <ul className="mt-4 space-y-3">
                {about.whatIDo.map((w, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-cocoa-700">
                    <span className="mt-0.5 font-mono text-sm text-clay-600">→</span>
                    {w}
                  </li>
                ))}
              </ul>
              {about.ctaText && <p className="mt-6 border-t border-cocoa-900/[0.08] pt-5 text-pretty text-[15px] leading-relaxed text-cocoa-600">{about.ctaText}</p>}
            </Reveal>

            {facts.length > 0 && (
              <Reveal delay={0.08} className="card divide-y divide-cocoa-900/[0.08]">
                {facts.map((f) => (
                  <div key={f.key} className="grid grid-cols-[6.5rem_1fr] gap-3 p-5 sm:grid-cols-[7.5rem_1fr]">
                    <p className="pt-0.5 font-mono text-xs text-cocoa-500">{f.key}:</p>
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug text-cocoa-900">{f.title}</p>
                      {f.detail && <p className="mt-0.5 text-sm text-cocoa-600">{f.detail}</p>}
                    </div>
                  </div>
                ))}
              </Reveal>
            )}
          </div>

          {stats.length > 0 && (
            <Reveal delay={0.12} className="mt-4">
              <dl className="card grid grid-cols-2 divide-cocoa-900/[0.08] sm:grid-cols-4 sm:divide-x">
                {stats.map((s, i) => (
                  <div key={s.id} className={`flex flex-col-reverse p-5 ${i % 2 === 1 ? 'border-l border-cocoa-900/[0.08] sm:border-l-0' : ''} ${i > 1 ? 'border-t border-cocoa-900/[0.08] sm:border-t-0' : ''}`}>
                    <dt className="mt-1 text-xs leading-snug text-cocoa-500 sm:text-sm">{s.label}</dt>
                    <dd className="font-mono text-2xl font-semibold text-cocoa-900 sm:text-3xl">
                      <Counter value={s.number} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
