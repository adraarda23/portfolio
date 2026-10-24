import { Briefcase, Coffee, GraduationCap, Target } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

const facts = [
  { key: 'education', icon: GraduationCap, label: 'Education', tint: 'bg-sage-100 text-sage-700', glow: 'rgba(151, 176, 142, 0.22)' },
  { key: 'current', icon: Briefcase, label: 'Currently', tint: 'bg-clay-100 text-clay-700', glow: 'rgba(229, 148, 111, 0.2)' },
  { key: 'focus', icon: Target, label: 'Focus', tint: 'bg-honey-100 text-honey-700', glow: 'rgba(237, 191, 89, 0.24)' },
] as const

export function About() {
  const { data } = usePortfolio()
  const { about, stats } = data

  const factText = {
    education: [about.educationTitle, about.educationDetail],
    current: [about.currentRole, about.currentCompany],
    focus: [about.focusTitle, about.focusDetail],
  }

  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="About me" title="A little about who I am and how I work." description={about.intro} />

        <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-3">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <div className="card h-full bg-cocoa-900 p-6 text-cream-100 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-clay-500 text-cream-50">
                  <Coffee size={20} />
                </span>
                <h3 className="font-display text-2xl font-semibold text-cream-50">What I do</h3>
              </div>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {about.whatIDo.map((w, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-2xl bg-cream-50/[0.06] p-4 text-[15px] leading-relaxed text-cream-200 ring-1 ring-cream-50/10">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-honey-300 text-xs font-bold text-cocoa-900">{i + 1}</span>
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-pretty leading-relaxed text-cream-300">{about.ctaText}</p>
            </div>
          </Reveal>

          {facts.map((f, i) => {
            const [title, detail] = factText[f.key]
            return (
              <Reveal key={f.key} delay={0.08 * (i + 1)} className={f.key === 'focus' ? 'sm:col-span-2 lg:col-span-1' : ''}>
                <SpotlightCard className="h-full p-6" color={f.glow}>
                  <div className="flex items-start gap-4">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${f.tint}`}>
                      <f.icon size={19} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-cocoa-500">{f.label}</p>
                      <h4 className="mt-1 font-display text-lg font-semibold leading-snug text-cocoa-900">{title}</h4>
                      <p className="mt-1 text-sm text-cocoa-600">{detail}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}

          <Reveal delay={0.16} className="lg:col-span-2">
            <div className="card grid h-full grid-cols-2 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.id}
                  className={`p-5 text-center sm:p-6 ${i % 2 === 1 ? 'border-l border-cocoa-900/[0.06]' : ''} ${
                    i > 1 ? 'border-t border-cocoa-900/[0.06] sm:border-t-0' : ''
                  } ${i === 2 ? 'sm:border-l' : ''}`}
                >
                  <p className="font-display text-3xl font-semibold text-clay-600 sm:text-4xl">
                    <Counter value={s.number} />
                  </p>
                  <p className="mt-1 text-xs leading-snug text-cocoa-600 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
