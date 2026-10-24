import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Github, Lock } from 'lucide-react'
import { useMemo, useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectArt } from '@/components/illustrations/ProjectArt'

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
            title="Things I've made with care."
            description="A few things I've built — from enterprise event streaming to a bot that feeds a whole campus."
          />
          <Reveal className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" delay={0.1}>
            <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
              {['All', ...categories].map((c) => (
                <button key={c} onClick={() => setFilter(c)} className={`chip whitespace-nowrap ${filter === c ? 'chip-active' : 'chip-idle'}`}>
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 sm:mt-12">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => {
              const index = data.projects.indexOf(p)
              return (
                <motion.article
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="card card-hover group flex flex-col"
                >
                  <div className="relative m-2 aspect-[2/1] overflow-hidden rounded-[1.25rem]">
                    <ProjectArt
                      index={index}
                      category={p.category}
                      className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute left-3 top-3 flex items-center gap-1.5">
                      <span className="rounded-full bg-cream-50/90 px-3 py-1 text-xs font-semibold text-cocoa-800 backdrop-blur">{p.category}</span>
                      <span className="rounded-full bg-cream-50/90 px-3 py-1 text-xs font-medium text-cocoa-600 backdrop-blur">{p.year}</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-5 pb-6 pt-4 sm:px-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-xl font-semibold leading-snug text-cocoa-900 sm:text-2xl">{p.title}</h3>
                      <div className="flex shrink-0 gap-2">
                        {p.githubUrl ? (
                          <a href={p.githubUrl} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`} className="icon-btn">
                            <Github size={16} />
                          </a>
                        ) : (
                          <span title="Private / client project" className="grid h-10 w-10 place-items-center rounded-full bg-cream-200 text-cocoa-500">
                            <Lock size={14} />
                          </span>
                        )}
                        {p.demoUrl && (
                          <a
                            href={p.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${p.title} live demo`}
                            className="grid h-10 w-10 place-items-center rounded-full bg-clay-600 text-white transition hover:-translate-y-0.5 hover:bg-clay-700"
                          >
                            <ArrowUpRight size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="mt-3 flex-1 text-pretty text-[15px] leading-relaxed text-cocoa-600">{p.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.technologies.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              )
            })}
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
