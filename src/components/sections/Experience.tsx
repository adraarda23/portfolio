import { motion, useScroll, useSpring } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

const typeStyles: Record<string, string> = {
  internship: 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan',
  scholarship: 'border-accent-amber/30 bg-accent-amber/10 text-accent-amber',
  leadership: 'border-accent-pink/30 bg-accent-pink/10 text-accent-pink',
  'full-time': 'border-accent/30 bg-accent/10 text-accent-soft',
  freelance: 'border-accent/30 bg-accent/10 text-accent-soft',
}

export function Experience() {
  const { data } = usePortfolio()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })
  const listRef = useRef<HTMLOListElement>(null)
  const [lineHeight, setLineHeight] = useState<number>()

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const last = list.lastElementChild as HTMLElement | null
      setLineHeight(last ? last.offsetTop : undefined)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    return () => ro.disconnect()
  }, [data.experiences.length])

  return (
    <section id="experience" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've been building."
          description="Internships, research and community roles that shaped how I design and ship software."
        />

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-4 top-7 w-px bg-stone-900/10 md:left-1/2 md:-translate-x-1/2" style={{ height: lineHeight }} />
          <motion.div
            style={{ scaleY, height: lineHeight }}
            className="absolute left-4 top-7 w-px origin-top bg-gradient-to-b from-accent via-accent-cyan to-accent-pink md:left-1/2 md:-translate-x-1/2"
          />

          <ol ref={listRef} className="space-y-10">
            {data.experiences.map((exp, i) => {
              const left = i % 2 === 0
              const style = typeStyles[exp.type.toLowerCase()] ?? 'border-stone-900/15 bg-stone-900/5 text-stone-700'
              return (
                <li key={exp.id} className="relative md:grid md:grid-cols-2 md:gap-12">
                  <span className="absolute left-4 top-7 z-10 -translate-x-1/2 md:left-1/2">
                    <span className="block h-3 w-3 rounded-full border-2 border-ink-950 bg-accent shadow-glow" />
                  </span>
                  <Reveal className={`pl-12 md:pl-0 ${left ? 'md:col-start-1 md:pr-6' : 'md:col-start-2 md:pl-6'}`} delay={0.05}>
                    <SpotlightCard className="p-6 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-stone-900 sm:text-xl">{exp.title}</h3>
                          <p className="mt-0.5 text-sm font-medium text-accent-soft">{exp.company}</p>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${style}`}>{exp.type}</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={12} /> {exp.period}
                        </span>
                        {exp.duration && (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock size={12} /> {exp.duration}
                          </span>
                        )}
                        {exp.location && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={12} /> {exp.location}
                          </span>
                        )}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-stone-600">{exp.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {exp.technologies.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </SpotlightCard>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
