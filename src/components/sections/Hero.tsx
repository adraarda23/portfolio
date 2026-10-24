import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react'
import { Suspense, lazy, useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePortfolio } from '@/context/PortfolioContext'
import { Icon } from '@/lib/icons'
import { Magnetic } from '@/components/ui/Magnetic'
import { Tilt } from '@/components/ui/Tilt'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

function useShowScene() {
  const reduce = useReducedMotion()
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return wide && !reduce
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function CodeCard() {
  const { data } = usePortfolio()
  const { profile, about, experiences } = data
  const current = experiences[0]
  const lines = [
    ['const', 'developer', ' = {'],
    ['  name:', `"${profile.name}"`, ','],
    ['  role:', `"${profile.title}"`, ','],
    ['  company:', `"${current?.company ?? about.currentCompany}"`, ','],
    ['  focus:', `"${about.focusTitle}"`, ','],
    ['  openToWork:', 'true', ','],
    ['};']
  ]
  return (
    <Tilt className="relative w-full max-w-md" max={8}>
      <div className="card relative w-full max-w-md p-1 shadow-glow">
        <div className="flex items-center gap-1.5 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] text-stone-500">developer.ts</span>
        </div>
        <div className="overflow-x-auto rounded-[20px] bg-stone-900 p-5 font-mono text-[13px] leading-7 text-stone-200 sm:text-sm">
          {lines.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.12 }}
              className="flex gap-2 whitespace-pre"
            >
              <span className="w-5 shrink-0 select-none text-right text-stone-500">{i + 1}</span>
              <span>
                <span className={i === 0 ? 'text-accent-pink' : 'text-accent-amber'}>{l[0]}</span>
                {l[1] && (
                  <span className={l[1] === 'true' ? 'text-accent-amber' : l[1] === 'developer' ? 'text-accent-cyan' : 'text-orange-200'}>
                    {' '}
                    {l[1]}
                  </span>
                )}
                {l[2] && <span className="text-stone-400">{l[2]}</span>}
              </span>
            </motion.div>
          ))}
          <motion.span
            className="ml-7 inline-block h-4 w-2 translate-y-1 bg-accent-cyan"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.1 }}
          />
        </div>
      </div>
      <motion.div
        className="glass absolute -left-6 -top-6 hidden rounded-2xl px-4 py-3 sm:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Status</p>
        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-stone-900">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available
        </p>
      </motion.div>
      <motion.div
        className="glass absolute -bottom-6 -right-4 hidden rounded-2xl px-4 py-3 sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Based in</p>
        <p className="mt-1 text-sm font-semibold text-stone-900">{data.contact.location}</p>
      </motion.div>
    </Tilt>
  )
}

export function Hero() {
  const { data } = usePortfolio()
  const { profile, socialLinks } = data
  const [first, ...rest] = profile.name.split(' ')
  const showScene = useShowScene()

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20 sm:pt-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show" className="min-w-0">
          <motion.span variants={item} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.subtitle.replace(/^\p{Extended_Pictographic}\s*/u, '')}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl"
          >
            {first} <span className="text-accent">{rest.join(' ')}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-4 font-display text-xl font-medium text-stone-700 sm:text-2xl">
            {profile.title}
            <span className="text-accent-cyan">.</span>
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
            {profile.description}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#projects" className="btn-primary">
                View projects
                <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-ghost">
                <Mail size={16} />
                Get in touch
              </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-3">
            <span className="h-px w-10 bg-stone-900/10" />
            {socialLinks.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target={s.url.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={s.name}
                className="grid h-10 w-10 place-items-center rounded-full border border-stone-900/10 text-stone-600 transition hover:-translate-y-0.5 hover:border-stone-900/30 hover:text-stone-900"
              >
                <Icon name={s.iconClass} size={16} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-w-0 justify-center lg:justify-end"
        >
          {showScene && (
            <div className="pointer-events-none absolute -inset-x-24 -inset-y-32 z-0 opacity-90">
              <Suspense fallback={null}>
                <HeroScene />
              </Suspense>
            </div>
          )}
          <div className="relative z-10">
            <CodeCard />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-stone-500 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
