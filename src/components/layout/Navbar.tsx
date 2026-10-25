import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'

export const NAV_SECTIONS = [
  { id: 'home', label: 'home' },
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'contact', label: 'contact' },
] as const

export function Navbar() {
  const { data } = usePortfolio()
  const [active, setActive] = useState<string>('home')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const handle = (data.profile.name ?? '').split(' ')[0].toLowerCase() || 'dev'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
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
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open ? 'border-b border-cocoa-900/[0.08] bg-cream-100/90 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between">
          <button onClick={() => go('home')} className="flex items-center gap-2 font-mono text-sm font-semibold text-cocoa-900" aria-label="Back to top">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-cocoa-900 text-xs text-cream-50">
              <span>
                <span className="text-clay-300">&gt;</span>_
              </span>
            </span>
            <span>
              {handle}
              <span className="text-cocoa-500">@portfolio</span>
              <span className="text-clay-600">:~</span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_SECTIONS.slice(1).map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-sm transition-colors ${
                    active === s.id ? 'bg-cocoa-900/[0.06] text-cocoa-900' : 'text-cocoa-500 hover:text-cocoa-900'
                  }`}
                >
                  <span className={active === s.id ? 'text-clay-600' : 'text-cocoa-300'}>/</span>
                  {s.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-cocoa-900 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-cream-100 md:hidden"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <ul className="container-x flex flex-col py-6">
              {NAV_SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => go(s.id)}
                    className="flex w-full items-center gap-4 border-b border-cocoa-900/[0.06] py-4 text-left font-mono text-lg"
                  >
                    <span className="text-xs text-cocoa-500">{String(i).padStart(2, '0')}</span>
                    <span className={active === s.id ? 'text-clay-600' : 'text-cocoa-800'}>/{s.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
