import { ArrowUp } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Icon } from '@/lib/icons'

export function Footer() {
  const { data } = usePortfolio()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-cocoa-900/[0.08]">
      <div className="container-x flex flex-col items-center justify-between gap-5 py-8 sm:flex-row">
        <p className="font-mono text-xs text-cocoa-500 sm:text-sm">
          © {year} {data.profile.name}
        </p>
        <div className="flex items-center gap-2">
          {data.socialLinks.map((s) => (
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
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className="icon-btn">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
