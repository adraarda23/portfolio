import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Icon } from '@/lib/icons'
import { yearsLabel } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

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
          title="Technologies I've worked with so far."
          description="Languages, frameworks and tools I've used in real projects — with how long I've been actively working with each."
          align="center"
        />

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2" delay={0.1}>
          <button
            onClick={() => setActiveId('all')}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeId === 'all' ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-900/10 text-stone-700 hover:border-stone-900/30'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeId === c.id ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-900/10 text-stone-700 hover:border-stone-900/30'
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
                  <h3 className="font-display text-lg font-semibold text-stone-900">
                    <span className="mr-2">{cat.icon}</span>
                    {cat.title}
                  </h3>
                  <span className="font-mono text-xs text-stone-500">{cat.skills.length}</span>
                </div>
                <ul className="mt-5 space-y-3">
                  {cat.skills.map((s) => (
                    <li key={s.id} className="flex items-center gap-3 rounded-2xl border border-stone-900/5 bg-white/40 p-3 transition hover:border-stone-900/15 hover:bg-stone-900/50">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-cyan/15 text-lg text-accent-pink">
                        <Icon name={s.iconClass} />
                      </span>
                      <p className="min-w-0 flex-1 truncate text-sm font-medium text-stone-900">{s.name}</p>
                      {yearsLabel(s.level) && <span className="tag shrink-0 border-accent/30 bg-accent/10 text-accent">{yearsLabel(s.level)}</span>}
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
            <span key={`${s.id}-${i}`} className="inline-flex items-center gap-3 text-stone-500">
              <span className="text-2xl text-stone-600">
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
