import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MapPin, Mail } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Icon } from '@/lib/icons'
import { Magnetic } from '@/components/ui/Magnetic'
import { HeroIllustration } from '@/components/illustrations/HeroIllustration'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero() {
  const { data } = usePortfolio()
  const { profile, socialLinks, contact } = data
  const [first, ...rest] = profile.name.split(' ')
  const greeting = profile.subtitle.replace(/^\p{Extended_Pictographic}\s*/u, '') || "Hello, I'm"

  return (
    <section id="home" className="relative flex items-center overflow-hidden pb-6 pt-24 sm:pb-12 sm:pt-32 lg:min-h-[100svh] lg:pb-20">
      <div className="container-x grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show" className="min-w-0 text-center lg:text-left">
          <motion.p variants={item} className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-4 py-2 text-sm font-medium text-cocoa-700 shadow-soft ring-1 ring-cocoa-900/[0.06]">
            <span className="inline-block origin-[70%_70%] animate-wave text-base">👋</span>
            {greeting}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-cocoa-900 min-[400px]:text-5xl sm:text-6xl lg:text-7xl"
          >
            {first}{' '}
            <span className="whitespace-nowrap italic text-clay-600">{rest.join(' ')}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 font-display text-xl font-medium text-cocoa-700 sm:text-2xl">
            <span className="scribble">{profile.title}</span>
          </motion.p>

          <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-cocoa-600 sm:text-lg lg:mx-0">
            {profile.description}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-center lg:justify-start">
            <Magnetic>
              <a href="#projects" className="btn-primary w-full">
                See my work
                <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-ghost w-full">
                <Mail size={16} />
                Get in touch
              </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex items-center justify-center gap-2.5 lg:justify-start">
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
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[26rem] sm:max-w-md lg:max-w-none"
        >
          <div className="absolute inset-6 -z-10 rounded-[3rem] bg-clay-100/70 blur-2xl" />
          <HeroIllustration className="h-auto w-full drop-shadow-[0_30px_40px_rgba(115,52,30,0.12)]" />

          <div className="absolute left-0 top-[12%] animate-float rounded-2xl bg-cream-50 px-3.5 py-2.5 shadow-lift ring-1 ring-cocoa-900/[0.06] sm:-left-2 sm:px-4 sm:py-3">
            <p className="flex items-center gap-2 text-xs font-semibold text-cocoa-900 sm:text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-sage-500" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage-500" />
              </span>
              Open to opportunities
            </p>
          </div>
          {contact.location && (
            <div
              className="absolute -bottom-3 right-[6%] animate-float rounded-2xl bg-cream-50 px-3.5 py-2.5 shadow-lift ring-1 ring-cocoa-900/[0.06] sm:-right-2 sm:px-4 sm:py-3"
              style={{ animationDelay: '-3s' }}
            >
              <p className="flex items-center gap-2 text-xs font-semibold text-cocoa-900 sm:text-sm">
                <MapPin size={14} className="text-clay-600" />
                {contact.location}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-cocoa-400 transition hover:text-clay-600 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-label="Scroll to about"
      >
        <span className="text-xs font-medium">Scroll down</span>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
