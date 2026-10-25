import { AnimatePresence, motion } from 'framer-motion'
import { Check, CheckCircle2, Copy, Loader2, Mail, MapPin, Phone, Send, XCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { api, ApiError } from '@/lib/api'
import { Icon } from '@/lib/icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

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
    { icon: Phone, label: 'phone', value: contact.phone, href: `tel:${(contact.phone ?? '').replace(/\s/g, '')}` },
    { icon: MapPin, label: 'location', value: contact.location },
  ].filter((i) => i.value)

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <div className="rail before:bottom-auto before:h-10 sm:before:h-16 lg:before:h-20">
          <SectionHeading index={5} method="POST" path="/contact" title={contact.introTitle || 'Contact'} description={contact.introText} />

          <div className="mt-10 grid min-w-0 gap-4 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal className="flex min-w-0 flex-col gap-4">
              <div className="card p-5">
                <p className="font-mono text-xs text-cocoa-400">email:</p>
                <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <a href={`mailto:${contact.email}`} className="inline-flex min-w-0 items-center gap-2 font-semibold text-cocoa-900 hover:text-clay-700">
                    <Mail size={16} className="shrink-0 text-clay-600" />
                    <span className="break-all">{contact.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-cocoa-900/10 px-2.5 py-1 font-mono text-xs text-cocoa-600 transition hover:border-cocoa-900/30 hover:text-cocoa-900"
                  >
                    {copied ? <Check size={12} className="text-sage-700" /> : <Copy size={12} />}
                    {copied ? 'copied' : 'copy'}
                  </button>
                </div>
              </div>

              {info.length > 0 && (
                <div className="card divide-y divide-cocoa-900/[0.08]">
                  {info.map((item) => (
                    <div key={item.label} className="flex items-center gap-3 p-5">
                      <item.icon size={16} className="shrink-0 text-cocoa-400" />
                      <span className="w-16 shrink-0 font-mono text-xs text-cocoa-400">{item.label}:</span>
                      {item.href ? (
                        <a href={item.href} className="min-w-0 truncate text-sm font-medium text-cocoa-900 hover:text-clay-700">
                          {item.value}
                        </a>
                      ) : (
                        <span className="min-w-0 truncate text-sm font-medium text-cocoa-900">{item.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="card flex-1 p-5">
                {contact.ctaText && <p className="text-sm text-cocoa-600">{contact.ctaText}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target={s.url.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-cocoa-900/10 px-3 py-2 text-sm font-medium text-cocoa-700 transition hover:border-cocoa-900/30 hover:text-cocoa-900"
                    >
                      <Icon name={s.iconClass} size={14} />
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="min-w-0">
              <form onSubmit={submit} className="card flex h-full flex-col p-5 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label">name</label>
                    <input id="name" className="input" required value={form.name} onChange={update('name')} placeholder="Your name" autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">email</label>
                    <input id="email" type="email" className="input" required value={form.email} onChange={update('email')} placeholder="you@example.com" autoComplete="email" />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="subject" className="label">subject</label>
                  <input id="subject" className="input" value={form.subject} onChange={update('subject')} placeholder="What's this about?" />
                </div>
                <div className="mt-4 flex flex-1 flex-col">
                  <label htmlFor="message" className="label">message</label>
                  <textarea id="message" className="input min-h-[150px] max-w-full flex-1 resize-y" required value={form.message} onChange={update('message')} placeholder="Tell me about your project, idea or opportunity…" />
                </div>
                <div className="mt-5 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <AnimatePresence mode="wait">
                    {status.kind === 'ok' && (
                      <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2 font-mono text-sm text-sage-700">
                        <CheckCircle2 size={16} /> {status.message}
                      </motion.p>
                    )}
                    {status.kind === 'error' && (
                      <motion.p key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2 font-mono text-sm text-clay-700">
                        <XCircle size={16} /> {status.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <button type="submit" disabled={status.kind === 'sending'} className="btn-primary sm:ml-auto">
                    {status.kind === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {status.kind === 'sending' ? 'Sending…' : 'Send'}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
