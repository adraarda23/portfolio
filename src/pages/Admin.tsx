import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, Briefcase, ExternalLink, FolderKanban, KeyRound, LayoutDashboard, Link2, LogOut, Mail, Menu, UserRound, Wrench, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Login } from '@/components/admin/Login'
import { ToastProvider } from '@/components/admin/ui'
import { AboutPanel, ContactPanel, ExperiencesPanel, ProfilePanel, ProjectsPanel, SecurityPanel, SkillsPanel, SocialLinksPanel, StatsPanel } from '@/components/admin/panels'
import { usePortfolio } from '@/context/PortfolioContext'
import { api, auth } from '@/lib/api'
import { cn, initials } from '@/lib/utils'

const nav = [
  { to: 'profile', label: 'Profile', icon: UserRound, el: <ProfilePanel /> },
  { to: 'about', label: 'About', icon: LayoutDashboard, el: <AboutPanel /> },
  { to: 'stats', label: 'Stats', icon: BarChart3, el: <StatsPanel /> },
  { to: 'experience', label: 'Experience', icon: Briefcase, el: <ExperiencesPanel /> },
  { to: 'skills', label: 'Skills', icon: Wrench, el: <SkillsPanel /> },
  { to: 'projects', label: 'Projects', icon: FolderKanban, el: <ProjectsPanel /> },
  { to: 'contact', label: 'Contact', icon: Mail, el: <ContactPanel /> },
  { to: 'social', label: 'Social links', icon: Link2, el: <SocialLinksPanel /> },
  { to: 'security', label: 'Security', icon: KeyRound, el: <SecurityPanel /> },
]

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(auth.isLoggedIn())
  const [menuOpen, setMenuOpen] = useState(false)
  const { data, source } = usePortfolio()
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location.pathname])
  useEffect(() => {
    const onStorage = () => setLoggedIn(auth.isLoggedIn())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  if (!loggedIn) return <Login onSuccess={() => setLoggedIn(true)} />

  const logout = () => {
    api.auth.logout()
    setLoggedIn(false)
  }

  const sidebar = (
    <>
      <div className="flex items-center gap-3 px-2">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cocoa-900 font-mono text-xs font-semibold text-cream-50">
          {initials(data.profile.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-stone-900">{data.profile.name}</p>
          <p className="truncate text-xs text-stone-500">{auth.getUsername() ?? 'admin'}</p>
        </div>
      </div>
      <nav className="mt-8 flex-1 space-y-1">
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition',
                isActive ? 'bg-stone-900/10 text-stone-900' : 'text-stone-600 hover:bg-stone-900/5 hover:text-stone-900',
              )
            }
          >
            <n.icon size={16} />
            {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-1 border-t border-stone-900/5 pt-4">
        <Link to="/" className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-stone-600 transition hover:bg-stone-900/5 hover:text-stone-900">
          <ExternalLink size={16} /> View site
        </Link>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-stone-600 transition hover:bg-rose-500/10 hover:text-rose-300">
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </>
  )

  return (
    <ToastProvider>
      <div className="min-h-screen bg-ink-950 text-stone-800 lg:grid lg:grid-cols-[260px_1fr]">
        <aside className="sticky top-0 hidden h-screen flex-col border-r border-stone-900/5 bg-ink-900/60 p-5 lg:flex">{sidebar}</aside>

        <header className="glass sticky top-0 z-40 flex items-center justify-between rounded-none border-x-0 border-t-0 px-4 py-3 lg:hidden">
          <span className="font-display font-semibold text-stone-900">Admin</span>
          <button aria-label="Menu" onClick={() => setMenuOpen((o) => !o)} className="grid h-10 w-10 place-items-center rounded-xl text-stone-900">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>
        <AnimatePresence>
          {menuOpen && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-stone-900/5 bg-ink-900 p-5 lg:hidden"
            >
              {sidebar}
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="container-x py-8 lg:py-12">
          {source === 'fallback' && (
            <p className="mb-6 rounded-2xl border border-accent-amber/30 bg-accent-amber/10 px-4 py-3 text-sm text-accent-amber">
              The API is unreachable — you're viewing fallback content. Edits will fail until the backend is up.
            </p>
          )}
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <Routes>
                <Route index element={<Navigate to="profile" replace />} />
                {nav.map((n) => (
                  <Route key={n.to} path={n.to} element={n.el} />
                ))}
                <Route path="*" element={<Navigate to="profile" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </ToastProvider>
  )
}
