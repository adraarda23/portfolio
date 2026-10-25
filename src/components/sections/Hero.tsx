import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Icon } from '@/lib/icons'
import { yearsOf } from '@/lib/utils'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

type JsonValue = string | string[]

/** Pretty-printed JSON with syntax colours, rendered from live portfolio data. */
function JsonResponse() {
  const { data } = usePortfolio()
  const { profile, about, contact, skillCategories } = data

  const skills = skillCategories.flatMap((c) => c.skills)
  const stack = [...skills]
    .sort((a, b) => yearsOf(b.level) - yearsOf(a.level))
    .slice(0, 4)
    .map((s) => s.name)

  const entries = (
    [
      ['name', profile.name],
      ['role', profile.title],
      ['location', contact.location],
      ['currentlyAt', about.currentCompany],
      ['focus', about.focusTitle],
      ['stack', stack],
    ] as [string, JsonValue][]
  ).filter(([, v]) => v.length > 0)

  return (
    <div className="card bg-cocoa-900 text-cream-100 shadow-lift">
      <div className="flex items-center justify-between gap-3 border-b border-cream-50/10 px-4 py-3 font-mono text-xs">
        <span className="flex items-center gap-2">
          <span className="method bg-sage-500/25 text-sage-200">GET</span>
          <span className="text-cream-200">/api/developer</span>
        </span>
        <span className="flex items-center gap-1.5 text-sage-300">
          <span className="h-1.5 w-1.5 rounded-full bg-sage-300" />
          200 OK
        </span>
      </div>
      <pre className="whitespace-pre-wrap break-words px-4 py-4 font-mono text-[12.5px] leading-6 sm:px-5 sm:text-[13px] sm:leading-7">
        <span className="text-cocoa-300">{'{'}</span>
        {entries.map(([key, value], i) => (
          <motion.span
            key={key}
            className="block pl-4"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.09 }}
          >
            <span className="text-honey-200">"{key}"</span>
            <span className="text-cocoa-300">: </span>
            {Array.isArray(value) ? (
              <>
                <span className="text-cocoa-300">[</span>
                {value.map((v, j) => (
                  <span key={v}>
                    <span className="text-clay-200">"{v}"</span>
                    {j < value.length - 1 && <span className="text-cocoa-300">, </span>}
                  </span>
                ))}
                <span className="text-cocoa-300">]</span>
              </>
            ) : (
              <span className="text-clay-200">"{value}"</span>
            )}
            {i < entries.length - 1 && <span className="text-cocoa-300">,</span>}
          </motion.span>
        ))}
        <span className="text-cocoa-300">{'}'}</span>
        <motion.span
          className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-clay-300"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.1 }}
        />
      </pre>
    </div>
  )
}

export function Hero() {
  const { data } = usePortfolio()
  const { profile, socialLinks, contact } = data
  const greeting = profile.subtitle.replace(/^\p{Extended_Pictographic}\s*/u, '')

  return (
    <section id="home" className="section overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="container-x relative">
        <div className="rail grid items-center gap-10 before:top-[10rem] pb-4 pt-28 sm:pb-6 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pb-8 lg:pt-36">
          <span aria-hidden className="absolute left-0 top-[9.6rem] hidden h-[15px] w-[15px] rounded-full bg-clay-500 ring-4 ring-clay-500/20 lg:block" />

          <motion.div variants={container} initial="hidden" animate="show" className="min-w-0">
            <motion.p variants={item} className="font-mono text-sm text-cocoa-500">
              <span className="text-clay-600">$</span> whoami
              {greeting && <span className="ml-3 text-cocoa-400"># {greeting}</span>}
            </motion.p>

            <motion.h1 variants={item} className="mt-3 font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-cocoa-900 sm:text-6xl">
              {profile.name}
            </motion.h1>

            <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-medium text-cocoa-700 sm:text-xl">
              <span>{profile.title}</span>
              {contact.location && (
                <span className="inline-flex items-center gap-1.5 font-mono text-sm text-cocoa-500">
                  <MapPin size={14} className="text-clay-600" />
                  {contact.location}
                </span>
              )}
            </motion.div>

            <motion.p variants={item} className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-cocoa-600 sm:text-lg">
              {profile.description}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary">
                Projects
                <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-ghost">
                Contact
              </a>
              <span className="mx-1 hidden h-6 w-px bg-cocoa-900/10 sm:block" />
              <div className="flex gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target={s.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                    aria-label={s.name}
                    className="icon-btn"
                  >
                    <Icon name={s.iconClass} size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <JsonResponse />
          </motion.div>

          <a
            href="#about"
            className="col-span-full hidden w-fit items-center gap-2 font-mono text-xs text-cocoa-400 transition hover:text-clay-600 lg:inline-flex"
            aria-label="Scroll to about"
          >
            <ArrowDown size={14} /> scroll
          </a>
        </div>
      </div>
    </section>
  )
}
