import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Icon } from '@/lib/icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

function Ring({ level }: { level: number }) {
  const r = 18
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90">
      <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
      <motion.circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: c - (c * level) / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <defs>
        <linearGradient id="ring-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Skills() {
  const { data } = usePortfolio()
  const categories = data.skillCategories
  const [activeId, setActiveId] = useState<number | 'all'>('all')
  const visible = activeId === 'all' ? categories : categories.filter((c) => c.id === activeId)
  const allSkills = categories.flatMap((c) => c.skills)

  return (
    <section id="skills" className="section overflow-hidden">
      <div className="container-x">
        <SectionHeading
          eyebrow="Skills"
          title="A toolbox built across the stack."
          description="From data models to deployment — the languages, frameworks and tools I reach for."
          align="center"
        />

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2" delay={0.1}>
          <button
            onClick={() => setActiveId('all')}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeId === 'all' ? 'border-white bg-white text-ink-950' : 'border-white/10 text-slate-300 hover:border-white/30'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeId === c.id ? 'border-white bg-white text-ink-950' : 'border-white/10 text-slate-300 hover:border-white/30'
              }`}
            >
              <span className="mr-1.5">{c.icon}</span>
              {c.title}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((cat) => (
              <motion.div
                layout
                key={cat.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-white">
                    <span className="mr-2">{cat.icon}</span>
                    {cat.title}
                  </h3>
                  <span className="font-mono text-xs text-slate-500">{cat.skills.length} skills</span>
                </div>
                <ul className="mt-5 space-y-3">
                  {cat.skills.map((s) => (
                    <li key={s.id} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/15 hover:bg-white/[0.04]">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-800 text-lg text-accent-soft">
                        <Icon name={s.iconClass} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{s.name}</p>
                        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-cyan"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                      <div className="relative grid place-items-center">
                        <Ring level={s.level} />
                        <span className="absolute font-mono text-[10px] text-slate-300">{s.level}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mask-fade-x mt-20 overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...allSkills, ...allSkills].map((s, i) => (
            <span key={`${s.id}-${i}`} className="inline-flex items-center gap-3 text-slate-500">
              <span className="text-2xl text-slate-400">
                <Icon name={s.iconClass} />
              </span>
              <span className="font-display text-lg font-medium">{s.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
