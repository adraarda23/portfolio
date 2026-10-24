import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send, XCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { api, ApiError } from '@/lib/api'
import { Icon } from '@/lib/icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok'; message: string } | { kind: 'error'; message: string }

export function Contact() {
  const { data } = usePortfolio()
  const { contact, socialLinks } = data
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

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
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: contact.location },
  ].filter((i) => i.value)

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Contact" title={contact.introTitle} description={contact.introText} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {info.map((item, i) => (
              <Reveal key={item.label} delay={0.05 * i}>
                <SpotlightCard className="p-5">
                  <a href={item.href} className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent-soft">
                      <item.icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{item.label}</p>
                      <p className="truncate text-sm font-medium text-white">{item.value}</p>
                    </div>
                  </a>
                </SpotlightCard>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="card p-5">
                <p className="text-sm text-slate-400">{contact.ctaText}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target={s.url.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
                    >
                      <Icon name={s.iconClass} size={14} />
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="card p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="label">Name</label>
                  <input id="name" className="input" required value={form.name} onChange={update('name')} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="label">Email</label>
                  <input id="email" type="email" className="input" required value={form.email} onChange={update('email')} placeholder="you@example.com" />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="subject" className="label">Subject</label>
                <input id="subject" className="input" value={form.subject} onChange={update('subject')} placeholder="What's this about?" />
              </div>
              <div className="mt-4">
                <label htmlFor="message" className="label">Message</label>
                <textarea id="message" className="input min-h-[150px] resize-y" required value={form.message} onChange={update('message')} placeholder="Tell me about your project, idea or opportunity…" />
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <AnimatePresence mode="wait">
                  {status.kind === 'ok' && (
                    <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2 text-sm text-emerald-300">
                      <CheckCircle2 size={16} /> {status.message}
                    </motion.p>
                  )}
                  {status.kind === 'error' && (
                    <motion.p key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2 text-sm text-rose-300">
                      <XCircle size={16} /> {status.message}
                    </motion.p>
                  )}
                </AnimatePresence>
                <button type="submit" disabled={status.kind === 'sending'} className="btn-primary ml-auto">
                  {status.kind === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {status.kind === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
