import { motion, useScroll, useSpring } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

const typeStyles: Record<string, { badge: string; dot: string }> = {
  internship: { badge: 'bg-sage-100 text-sage-800', dot: 'bg-sage-500' },
  scholarship: { badge: 'bg-honey-100 text-honey-700', dot: 'bg-honey-400' },
  leadership: { badge: 'bg-clay-100 text-clay-700', dot: 'bg-clay-500' },
  'full-time': { badge: 'bg-clay-100 text-clay-700', dot: 'bg-clay-600' },
  freelance: { badge: 'bg-cream-300 text-cocoa-800', dot: 'bg-cocoa-500' },
}
const fallbackStyle = { badge: 'bg-cream-300 text-cocoa-800', dot: 'bg-cocoa-500' }

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
          title="The places that shaped me."
          description="Internships, research and community roles where I learned to design, build and ship software with others."
        />

        <div ref={ref} className="relative mt-12 sm:mt-16">
          <div className="absolute left-[11px] top-8 w-0.5 rounded-full bg-cream-300 md:left-1/2 md:-translate-x-1/2" style={{ height: lineHeight }} />
          <motion.div
            style={{ scaleY, height: lineHeight }}
            className="absolute left-[11px] top-8 w-0.5 origin-top rounded-full bg-gradient-to-b from-clay-500 via-honey-400 to-sage-500 md:left-1/2 md:-translate-x-1/2"
          />

          <ol ref={listRef} className="space-y-6 sm:space-y-8">
            {data.experiences.map((exp, i) => {
              const left = i % 2 === 0
              const style = typeStyles[exp.type.toLowerCase()] ?? fallbackStyle
              return (
                <li key={exp.id} className="relative md:grid md:grid-cols-2 md:gap-14">
                  <span className="absolute left-[12px] top-8 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
                    <span className={`block h-4 w-4 rounded-full ring-4 ring-cream-100 ${style.dot}`} />
                  </span>
                  <Reveal className={`pl-9 md:pl-0 ${left ? 'md:col-start-1' : 'md:col-start-2'}`} delay={0.05}>
                    <SpotlightCard className="p-5 sm:p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}>{exp.type}</span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cocoa-500">
                          <Calendar size={12} /> {exp.period}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-cocoa-900">{exp.title}</h3>
                      <p className="mt-0.5 text-sm font-semibold text-clay-600">{exp.company}</p>
                      {(exp.duration || exp.location) && (
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-cocoa-500">
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
                      )}
                      <p className="mt-4 text-pretty text-[15px] leading-relaxed text-cocoa-600">{exp.description}</p>
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
