import { ArrowUp, Heart } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Icon } from '@/lib/icons'

export function Footer() {
  const { data } = usePortfolio()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-cocoa-900/[0.06] bg-cream-200/50">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-display text-lg font-semibold text-cocoa-900">{data.profile.name}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-cocoa-500">
            © {year} · Made with <Heart size={13} className="fill-clay-500 text-clay-500" /> and lots of coffee
          </p>
        </div>
        <div className="flex items-center gap-2.5">
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
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-cocoa-900 text-cream-50 transition hover:-translate-y-0.5 hover:bg-clay-600"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
