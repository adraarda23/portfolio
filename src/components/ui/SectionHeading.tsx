import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface Props {
  index: number
  method?: 'GET' | 'POST'
  path: string
  title: string
  description?: ReactNode
  action?: ReactNode
}

/** Section header styled as an API endpoint. On desktop its node sits on the page-wide rail. */
export function SectionHeading({ index, method = 'GET', path, title, description, action }: Props) {
  return (
    <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <span aria-hidden className="absolute -left-16 top-1 hidden h-[15px] w-[15px] rounded-full border-[3px] border-cream-100 bg-clay-500 ring-1 ring-clay-500/30 lg:block" />
      <div className="max-w-2xl">
        <Reveal>
          <p className="flex items-center gap-2 font-mono text-xs text-cocoa-500 sm:text-sm">
            <span className="text-cocoa-500">{String(index).padStart(2, '0')}</span>
            <span className={`method ${method === 'GET' ? 'bg-sage-100 text-sage-800' : 'bg-clay-100 text-clay-700'}`}>{method}</span>
            <span className="text-cocoa-700">{path}</span>
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="heading mt-3 text-balance">{title}</h2>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <div className="mt-4 text-pretty text-base leading-relaxed text-cocoa-600 sm:text-lg">{description}</div>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.12}>{action}</Reveal>}
    </div>
  )
}
