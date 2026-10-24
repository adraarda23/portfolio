import { Briefcase, GraduationCap, Sparkles, Target } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

export function About() {
  const { data } = usePortfolio()
  const { about, stats } = data

  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="About" title="Engineering with intent, shipping with care." description={about.intro} />

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <SpotlightCard className="h-full p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent/15 text-accent-soft">
                  <Sparkles size={18} />
                </span>
                <h3 className="font-display text-xl font-semibold text-stone-900">What I do</h3>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {about.whatIDo.map((w, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-2xl border border-stone-900/5 bg-white/40 p-4 text-sm text-stone-700">
                    <span className="mt-1 font-mono text-xs text-accent-cyan">0{i + 1}</span>
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-stone-600">{about.ctaText}</p>
            </SpotlightCard>
          </Reveal>

          <div className="grid gap-4 md:col-span-2">
            <Reveal delay={0.1}>
              <SpotlightCard className="p-6" color="rgba(227, 179, 44, 0.2)">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent-cyan/15 text-accent-cyan">
                  <GraduationCap size={18} />
                </span>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-stone-500">Education</p>
                <h4 className="mt-1 font-display text-lg font-semibold text-stone-900">{about.educationTitle}</h4>
                <p className="mt-1 text-sm text-stone-600">{about.educationDetail}</p>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.18}>
              <SpotlightCard className="p-6" color="rgba(226, 103, 63, 0.18)">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent-pink/15 text-accent-pink">
                  <Briefcase size={18} />
                </span>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-stone-500">Currently</p>
                <h4 className="mt-1 font-display text-lg font-semibold text-stone-900">{about.currentRole}</h4>
                <p className="mt-1 text-sm text-stone-600">{about.currentCompany}</p>
              </SpotlightCard>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="md:col-span-2">
            <SpotlightCard className="h-full p-6" color="rgba(244, 197, 74, 0.22)">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent-amber/15 text-accent-amber">
                <Target size={18} />
              </span>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-stone-500">Focus</p>
              <h4 className="mt-1 font-display text-lg font-semibold text-stone-900">{about.focusTitle}</h4>
              <p className="mt-1 text-sm text-stone-600">{about.focusDetail}</p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.16} className="md:col-span-4">
            <div className="card grid h-full grid-cols-2 divide-stone-900/5 sm:grid-cols-4 sm:divide-x">
              {stats.map((s, i) => (
                <div key={s.id} className={`p-6 ${i > 1 ? 'border-t border-stone-900/5 sm:border-t-0' : ''}`}>
                  <p className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">
                    <Counter value={s.number} />
                  </p>
                  <p className="mt-1 text-xs leading-snug text-stone-600 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
