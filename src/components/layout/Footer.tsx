import { ArrowUp } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Icon } from '@/lib/icons'

export function Footer() {
  const { data } = usePortfolio()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-stone-900/5">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="text-sm text-stone-500">
          © {year} <span className="text-stone-700">{data.profile.name}</span>. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {data.socialLinks.map((s) => (
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
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="ml-2 grid h-10 w-10 place-items-center rounded-full bg-white text-ink-950 transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
