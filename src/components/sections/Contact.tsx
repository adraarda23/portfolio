import { AnimatePresence, motion } from 'framer-motion'
import { Check, CheckCircle2, Copy, Loader2, Mail, MapPin, Phone, Send, XCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { api, ApiError } from '@/lib/api'
import { Icon } from '@/lib/icons'
import { Reveal } from '@/components/ui/Reveal'

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok'; message: string } | { kind: 'error'; message: string }

export function Contact() {
  const { data } = usePortfolio()
  const { contact, socialLinks } = data
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus({ kind: 'sending' })
    try {
      const res = await api.email.send(form)
      setStatus({ kind: 'ok', message: res?.message ?? 'Message sent — thanks!' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Could not send right now. Please email me directly.'
      setStatus({ kind: 'error', message })
    }
    setTimeout(() => setStatus({ kind: 'idle' }), 6000)
  }

  const info = [
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: contact.location },
  ].filter((i) => i.value)

  return (
    <section id="contact" className="section">
      <Reveal className="container-x">
        <div className="card bg-cream-50 p-2 sm:p-3">
          <div className="grid min-w-0 gap-2 sm:gap-3 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[1.25rem] bg-clay-600 p-6 text-cream-50 sm:p-9">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-honey-300/30" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-clay-400/40" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream-50/15 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cream-50">
                  <span className="h-1.5 w-1.5 rounded-full bg-honey-300" />
                  Contact
                </span>
                <h2 className="mt-4 text-balance font-display text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-4xl">{contact.introTitle}</h2>
                <p className="mt-4 text-pretty leading-relaxed text-clay-50">{contact.introText}</p>
              </div>

              <div className="relative mt-8 rounded-2xl bg-cream-50 p-4 text-cocoa-900">
                <p className="text-xs font-semibold uppercase tracking-wider text-cocoa-500">Email me directly</p>
                <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <a href={`mailto:${contact.email}`} className="inline-flex min-w-0 items-center gap-2 font-semibold hover:text-clay-700">
                    <Mail size={16} className="shrink-0 text-clay-600" />
                    <span className="break-all">{contact.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-cream-200 px-3 py-1.5 text-xs font-semibold text-cocoa-700 transition hover:bg-clay-100 hover:text-clay-700"
                  >
                    {copied ? <Check size={12} className="text-sage-700" /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {info.length > 0 && (
                <ul className="relative mt-5 space-y-3">
                  {info.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cream-50/15">
                        <item.icon size={16} />
                      </span>
                      {item.href ? (
                        <a href={item.href} className="truncate text-sm font-medium hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        <span className="truncate text-sm font-medium">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              <div className="relative mt-auto pt-8">
                <p className="text-sm text-clay-50">{contact.ctaText}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target={s.url.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-cream-50/15 px-4 py-2 text-sm font-medium transition hover:bg-cream-50 hover:text-clay-700"
                    >
                      <Icon name={s.iconClass} size={14} />
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={submit} className="flex min-w-0 flex-col p-4 sm:p-7">
              <h3 className="font-display text-2xl font-semibold text-cocoa-900">Send a message</h3>
              <p className="mt-1 text-sm text-cocoa-500">I usually reply within a day or two.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="label">Name</label>
                  <input id="name" className="input" required value={form.name} onChange={update('name')} placeholder="Your name" autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="email" className="label">Email</label>
                  <input id="email" type="email" className="input" required value={form.email} onChange={update('email')} placeholder="you@example.com" autoComplete="email" />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="subject" className="label">Subject</label>
                <input id="subject" className="input" value={form.subject} onChange={update('subject')} placeholder="What's this about?" />
              </div>
              <div className="mt-4 flex flex-1 flex-col">
                <label htmlFor="message" className="label">Message</label>
                <textarea id="message" className="input min-h-[160px] max-w-full flex-1 resize-y" required value={form.message} onChange={update('message')} placeholder="Tell me about your project, idea or opportunity…" />
              </div>
              <div className="mt-6 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                <AnimatePresence mode="wait">
                  {status.kind === 'ok' && (
                    <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2 text-sm font-medium text-sage-700">
                      <CheckCircle2 size={16} /> {status.message}
                    </motion.p>
                  )}
                  {status.kind === 'error' && (
                    <motion.p key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2 text-sm font-medium text-clay-700">
                      <XCircle size={16} /> {status.message}
                    </motion.p>
                  )}
                </AnimatePresence>
                <button type="submit" disabled={status.kind === 'sending'} className="btn-primary sm:ml-auto">
                  {status.kind === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {status.kind === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
