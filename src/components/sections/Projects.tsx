import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Github, Lock } from 'lucide-react'
import { useMemo, useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { slugify } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Projects() {
  const { data } = usePortfolio()
  const categories = useMemo(() => Array.from(new Set(data.projects.map((p) => p.category))).filter(Boolean), [data.projects])
  const [filter, setFilter] = useState<string | null>(null)
  const visible = filter === null ? data.projects : data.projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <div className="rail">
          <SectionHeading
            index={4}
            path="/projects"
            title="Projects"
            action={
              categories.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {[null, ...categories].map((c) => (
                    <button
                      key={c ?? '__all__'}
                      onClick={() => setFilter(c)}
                      aria-pressed={filter === c}
                      className={`chip ${filter === c ? 'chip-active' : 'chip-idle'}`}
                    >
                      {c === null ? 'all' : c.toLowerCase()}
                    </button>
                  ))}
                </div>
              )
            }
          />

          <motion.div layout className="mt-10 grid gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.article
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="card card-hover flex flex-col p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="min-w-0 truncate font-mono text-xs text-cocoa-500">
                      ~/projects/<span className="text-cocoa-800">{slugify(p.title)}</span>
                    </p>
                    <div className="flex shrink-0 gap-1.5">
                      {p.githubUrl ? (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`} className="icon-btn h-8 w-8">
                          <Github size={15} />
                        </a>
                      ) : (
                        <span title="Private / client project" className="grid h-8 w-8 place-items-center rounded-xl bg-cream-200 text-cocoa-500">
                          <Lock size={13} />
                        </span>
                      )}
                      {p.demoUrl && (
                        <a href={p.demoUrl} target="_blank" rel="noreferrer" aria-label={`${p.title} live demo`} className="grid h-8 w-8 place-items-center rounded-xl bg-cocoa-900 text-cream-50 transition hover:bg-clay-600">
                          <ArrowUpRight size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-snug text-cocoa-900">{p.title}</h3>
                  <p className="mt-2 flex-1 text-pretty text-[15px] leading-relaxed text-cocoa-600">{p.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-cocoa-900/[0.08] pt-4">
                    {p.category && <span className="method bg-clay-100 text-clay-700">{p.category.toLowerCase()}</span>}
                    {p.year && <span className="mr-1 font-mono text-xs text-cocoa-500">{p.year}</span>}
                    {p.technologies.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {data.profile.githubUrl && (
            <Reveal className="mt-6" delay={0.1}>
              <a href={data.profile.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-cocoa-600 transition hover:text-clay-700">
                <Github size={15} />
                {data.profile.githubUrl.replace(/^https?:\/\//, '')}
                <ArrowUpRight size={14} />
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
