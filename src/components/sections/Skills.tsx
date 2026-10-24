import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Icon } from '@/lib/icons'
import { yearsLabel } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

const tints = ['bg-clay-100 text-clay-700', 'bg-sage-100 text-sage-700', 'bg-honey-100 text-honey-700', 'bg-cream-300 text-cocoa-700']

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
          eyebrow="Toolbox"
          title="Tools I reach for every day."
          description="Languages, frameworks and tools I've used in real projects — with roughly how long I've been working with each."
          align="center"
        />

        <Reveal className="-mx-4 mt-10 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" delay={0.1}>
          <div className="flex w-max gap-2 sm:mx-auto sm:w-auto sm:flex-wrap sm:justify-center">
            <button onClick={() => setActiveId('all')} className={`chip ${activeId === 'all' ? 'chip-active' : 'chip-idle'}`}>
              All
            </button>
            {categories.map((c) => (
              <button key={c.id} onClick={() => setActiveId(c.id)} className={`chip whitespace-nowrap ${activeId === c.id ? 'chip-active' : 'chip-idle'}`}>
                <span>{c.icon}</span>
                {c.title}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((cat) => {
              const tint = tints[categories.indexOf(cat) % tints.length]
              return (
                <motion.div
                  layout
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="card p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="flex items-center gap-3 font-display text-lg font-semibold text-cocoa-900">
                      <span className={`grid h-10 w-10 place-items-center rounded-2xl text-lg ${tint}`}>{cat.icon}</span>
                      {cat.title}
                    </h3>
                    <span className="rounded-full bg-cream-200 px-2.5 py-0.5 text-xs font-semibold text-cocoa-600">{cat.skills.length}</span>
                  </div>
                  <ul className="mt-5 divide-y divide-cocoa-900/[0.06]">
                    {cat.skills.map((s) => (
                      <li key={s.id} className="flex items-center gap-3 py-2.5">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cream-200 text-base text-cocoa-700">
                          <Icon name={s.iconClass} />
                        </span>
                        <p className="min-w-0 flex-1 truncate text-sm font-medium text-cocoa-800">{s.name}</p>
                        {yearsLabel(s.level) && <span className="shrink-0 text-xs font-semibold text-clay-600">{yearsLabel(s.level)}</span>}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mask-fade-x mt-16 overflow-hidden border-y border-cocoa-900/[0.06] bg-cream-50/60 py-5 sm:mt-20">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...allSkills, ...allSkills].map((s, i) => (
            <span key={`${s.id}-${i}`} className="inline-flex items-center gap-3 text-cocoa-500">
              <span className="text-xl text-clay-500">
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
