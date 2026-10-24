import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Github, Lock } from 'lucide-react'
import { useMemo, useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

const palette = [
  'from-accent/35 via-accent-pink/15 to-transparent',
  'from-accent-pink/35 via-accent/15 to-transparent',
  'from-accent-amber/35 via-accent-cyan/15 to-transparent',
  'from-accent-cyan/35 via-accent-amber/15 to-transparent',
]

export function Projects() {
  const { data } = usePortfolio()
  const categories = useMemo(() => Array.from(new Set(data.projects.map((p) => p.category))).filter(Boolean), [data.projects])
  const [filter, setFilter] = useState<string>('All')
  const visible = filter === 'All' ? data.projects : data.projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work."
            description="A few things I've built — from enterprise event streaming to bots that feed a campus."
          />
          <Reveal className="flex flex-wrap gap-2" delay={0.1}>
            {['All', ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  filter === c ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-900/10 text-stone-700 hover:border-stone-900/30'
                }`}
              >
                {c}
              </button>
            ))}
          </Reveal>
        </div>

        <motion.div layout className="mt-12 grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <SpotlightCard className="h-full">
                  <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${palette[i % palette.length]}`}>
                    <div className="absolute inset-0 bg-grid-dots [background-size:22px_22px] opacity-40" />
                    <span className="absolute left-6 top-6 font-display text-7xl font-bold text-stone-900/10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="absolute bottom-5 left-6 flex items-center gap-2">
                      <span className="rounded-full bg-white/70 px-3 py-1 font-mono text-[11px] text-stone-800 backdrop-blur">{p.category}</span>
                      <span className="rounded-full bg-white/70 px-3 py-1 font-mono text-[11px] text-stone-600 backdrop-blur">{p.year}</span>
                    </div>
                    <div className="absolute right-5 top-5 flex gap-2">
                      {p.githubUrl ? (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="GitHub repository"
                          className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-stone-900 backdrop-blur transition hover:bg-stone-900 hover:text-white"
                        >
                          <Github size={16} />
                        </a>
                      ) : (
                        <span
                          title="Private / client project"
                          className="grid h-10 w-10 place-items-center rounded-full bg-white/50 text-stone-600 backdrop-blur"
                        >
                          <Lock size={14} />
                        </span>
                      )}
                      {p.demoUrl && (
                        <a
                          href={p.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Live demo"
                          className="grid h-10 w-10 place-items-center rounded-full bg-stone-900 text-white transition hover:shadow-glow"
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-6 sm:p-7">
                    <h3 className="font-display text-xl font-semibold text-stone-900">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">{p.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.technologies.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-10 text-center" delay={0.1}>
          <a href={data.profile.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost">
            <Github size={16} />
            More on GitHub
          </a>
        </Reveal>
      </div>
    </section>
  )
}
