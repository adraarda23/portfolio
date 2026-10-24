import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Logo } from '@/components/ui/Logo'

export const NAV_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export function Navbar() {
  const { data } = usePortfolio()
  const [active, setActive] = useState<string>('home')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.5] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const close = () => mq.matches && setOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-full py-2 pl-2 pr-2 transition-all duration-500 sm:pl-3 ${
            scrolled || open ? 'glass shadow-soft' : 'border border-transparent'
          }`}
        >
          <button onClick={() => go('home')} className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 text-left" aria-label="Back to top">
            <Logo className="h-9 w-9" />
            <span className="font-display text-lg font-semibold text-cocoa-900">
              {data.profile.name.split(' ')[0].toLowerCase()}
              <span className="text-clay-600">.</span>
            </span>
          </button>

          <ul className="hidden items-center gap-0.5 md:flex">
            {NAV_SECTIONS.slice(1).map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors lg:px-4 ${
                    active === s.id ? 'text-clay-700' : 'text-cocoa-600 hover:text-cocoa-900'
                  }`}
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-clay-50 ring-1 ring-clay-100"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button onClick={() => go('contact')} className="btn-primary hidden !px-5 !py-2.5 md:inline-flex">
              Say hello
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full bg-cocoa-900 text-cream-50 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-cream-100/95 backdrop-blur-xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.ul
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col justify-center gap-1 px-8"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_SECTIONS.map((s, i) => (
                <motion.li key={s.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <button
                    onClick={() => go(s.id)}
                    className={`flex w-full items-baseline gap-4 border-b border-cocoa-900/[0.06] py-3 text-left font-display text-3xl font-semibold ${
                      active === s.id ? 'text-clay-600' : 'text-cocoa-800'
                    }`}
                  >
                    <span className="font-mono text-xs font-medium text-cocoa-400">0{i + 1}</span>
                    {s.label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
