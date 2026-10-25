import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { KeyRound, Loader2, Save } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { api, ApiError, auth } from '@/lib/api'
import { iconOptions, Icon } from '@/lib/icons'
import type { About, Contact, Experience, Profile, Project, Skill, SkillCategory, SocialLink, Stat } from '@/lib/types'
import { CollectionEditor } from './CollectionEditor'
import type { FieldDef } from './Form'
import { SingletonEditor } from './SingletonEditor'
import { PanelHeader, useToast } from './ui'
import { yearsLabel } from '@/lib/utils'

const iconSelect = iconOptions.map((v) => ({ value: v, label: v }))

const profileFields: FieldDef<Profile>[] = [
  { key: 'name', label: 'Full name', half: true, required: true },
  { key: 'title', label: 'Title', half: true, required: true, placeholder: 'Backend Developer' },
  { key: 'subtitle', label: 'Subtitle / badge', placeholder: 'Hello, I\'m', hint: 'Small pill above your name in the hero.' },
  { key: 'description', label: 'Hero description', type: 'textarea' },
  { key: 'githubUrl', label: 'GitHub URL', half: true },
  { key: 'linkedinUrl', label: 'LinkedIn URL', half: true },
  { key: 'email', label: 'Email', half: true },
]
export function ProfilePanel() {
  const { data, reload } = usePortfolio()
  return <SingletonEditor title="Profile" description="Hero section: name, title and intro." item={data.profile} fields={profileFields} save={api.profile.update} onSaved={reload} />
}

const aboutFields: FieldDef<About>[] = [
  { key: 'intro', label: 'Intro paragraph', type: 'textarea' },
  { key: 'educationTitle', label: 'Education title', half: true },
  { key: 'educationDetail', label: 'Education detail', half: true },
  { key: 'educationPeriod', label: 'Education period', half: true },
  { key: 'currentRole', label: 'Current role', half: true },
  { key: 'currentCompany', label: 'Current company', half: true },
  { key: 'focusTitle', label: 'Focus title', half: true },
  { key: 'focusDetail', label: 'Focus detail', type: 'textarea' },
  { key: 'whatIDo', label: 'What I do (one per line)', type: 'lines' },
  { key: 'ctaText', label: 'Closing text', type: 'textarea' },
]
export function AboutPanel() {
  const { data, reload } = usePortfolio()
  return <SingletonEditor title="About" description="Who you are, what you do and what you focus on." item={data.about} fields={aboutFields} save={api.about.update} onSaved={reload} />
}

const contactFields: FieldDef<Contact>[] = [
  { key: 'email', label: 'Email', half: true },
  { key: 'phone', label: 'Phone', half: true },
  { key: 'location', label: 'Location', half: true },
  { key: 'introTitle', label: 'Section title', half: true },
  { key: 'introText', label: 'Section text', type: 'textarea' },
  { key: 'ctaText', label: 'CTA text', type: 'textarea' },
]
export function ContactPanel() {
  const { data, reload } = usePortfolio()
  return <SingletonEditor title="Contact" description="How people can reach you." item={data.contact} fields={contactFields} save={api.contact.update} onSaved={reload} />
}

const statFields: FieldDef<Stat>[] = [
  { key: 'number', label: 'Value', half: true, placeholder: '3+', required: true },
  { key: 'label', label: 'Label', half: true, placeholder: 'Years of experience', required: true },
  { key: 'displayOrder', label: 'Order', type: 'number', half: true },
]
export function StatsPanel() {
  const { data, reload } = usePortfolio()
  return (
    <CollectionEditor<Stat>
      title="Stats"
      description="Numbers shown in the About section."
      singular="stat"
      items={data.stats}
      fields={statFields}
      defaults={{ number: '', label: '', displayOrder: 1 }}
      api={api.stats}
      onChanged={reload}
      render={(s) => (
        <div className="flex items-baseline gap-3">
          <span className="font-display text-2xl font-bold text-stone-900">{s.number}</span>
          <span className="text-sm text-stone-600">{s.label}</span>
        </div>
      )}
    />
  )
}

const experienceFields: FieldDef<Experience>[] = [
  { key: 'title', label: 'Role', half: true, required: true },
  { key: 'company', label: 'Company', half: true, required: true },
  { key: 'type', label: 'Type', half: true, type: 'select', hint: 'Controls the badge on the timeline card.', options: ['Internship', 'Full-time', 'Part-time', 'Freelance', 'Scholarship', 'Leadership', 'Volunteer'].map((v) => ({ value: v, label: v })) },
  { key: 'location', label: 'Location', half: true },
  { key: 'period', label: 'Period', half: true, placeholder: 'Jun 2025 – Present' },
  { key: 'duration', label: 'Duration', half: true, placeholder: '3 months', hint: 'Calculated from the period automatically when it reads like “Sep 2025 – Present”. Used only as a fallback.' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'technologies', label: 'Technologies (comma separated)', type: 'list' },
  { key: 'displayOrder', label: 'Order', type: 'number', half: true, hint: 'Lower numbers appear first. You can also use the arrows in the list.' },
]
export function ExperiencesPanel() {
  const { data, reload } = usePortfolio()
  return (
    <CollectionEditor<Experience>
      title="Experience"
      description="Timeline entries, top to bottom."
      singular="experience"
      items={data.experiences}
      fields={experienceFields}
      defaults={{ title: '', company: '', type: 'Internship', location: '', period: '', duration: '', description: '', technologies: [], displayOrder: 1 }}
      api={api.experiences}
      onChanged={reload}
      render={(e) => (
        <div>
          <p className="truncate font-medium text-stone-900">
            {e.title} <span className="text-stone-500">@</span> <span className="text-accent-soft">{e.company}</span>
          </p>
          <p className="truncate text-xs text-stone-500">
            {e.type} · {e.period}
          </p>
        </div>
      )}
    />
  )
}

const projectFields: FieldDef<Project>[] = [
  { key: 'title', label: 'Title', half: true, required: true },
  { key: 'category', label: 'Category', half: true, placeholder: 'Backend' },
  { key: 'year', label: 'Year', half: true, placeholder: '2025' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'technologies', label: 'Technologies (comma separated)', type: 'list' },
  { key: 'githubUrl', label: 'GitHub URL', half: true, hint: 'Leave empty for private projects' },
  { key: 'demoUrl', label: 'Demo URL', half: true },
  { key: 'displayOrder', label: 'Order', type: 'number', half: true },
]
export function ProjectsPanel() {
  const { data, reload } = usePortfolio()
  return (
    <CollectionEditor<Project>
      title="Projects"
      description="Showcase work with links and tech stacks."
      singular="project"
      items={data.projects}
      fields={projectFields}
      defaults={{ title: '', description: '', technologies: [], category: '', year: String(new Date().getFullYear()), githubUrl: null, demoUrl: null, displayOrder: 1 }}
      api={api.projects}
      onChanged={reload}
      render={(p) => (
        <div>
          <p className="truncate font-medium text-stone-900">{p.title}</p>
          <p className="truncate text-xs text-stone-500">
            {p.category} · {p.year} · {p.technologies.slice(0, 4).join(', ')}
          </p>
        </div>
      )}
    />
  )
}

const socialFields: FieldDef<SocialLink>[] = [
  { key: 'name', label: 'Name', half: true, required: true },
  { key: 'iconClass', label: 'Icon', half: true, type: 'icon', options: iconSelect },
  { key: 'url', label: 'URL', required: true },
  { key: 'color', label: 'Brand color', half: true, placeholder: '#0a66c2' },
  { key: 'displayOrder', label: 'Order', type: 'number', half: true },
]
export function SocialLinksPanel() {
  const { data, reload } = usePortfolio()
  return (
    <CollectionEditor<SocialLink>
      title="Social links"
      description="Shown in the hero, contact and footer."
      singular="link"
      items={data.socialLinks}
      fields={socialFields}
      defaults={{ name: '', iconClass: 'FaGithub', url: '', color: '#ffffff', displayOrder: 1 }}
      api={api.socialLinks}
      onChanged={reload}
      render={(s) => (
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-800 text-lg text-accent-soft">
            <Icon name={s.iconClass} />
          </span>
          <div className="min-w-0">
            <p className="font-medium text-stone-900">{s.name}</p>
            <p className="truncate text-xs text-stone-500">{s.url}</p>
          </div>
        </div>
      )}
    />
  )
}

const categoryFields: FieldDef<SkillCategory>[] = [
  { key: 'title', label: 'Title', half: true, required: true },
  { key: 'icon', label: 'Emoji', half: true, placeholder: '💻' },
  { key: 'displayOrder', label: 'Order', type: 'number', half: true },
]
export function SkillsPanel() {
  const { data, reload } = usePortfolio()
  const categories = data.skillCategories
  const [tab, setTab] = useState<'skills' | 'categories' | 'years'>('skills')
  const [categoryId, setCategoryId] = useState<number | 'all'>('all')

  const skillFields = useMemo<FieldDef<Skill>[]>(
    () => [
      { key: 'name', label: 'Name', half: true, required: true },
      { key: 'level', label: 'Years of active use', type: 'number', half: true, hint: 'Shown as “3 yrs” next to the skill. Leave 0 to hide.' },
      { key: 'iconClass', label: 'Icon', half: true, type: 'icon', options: iconSelect },
      { key: 'skillCategoryId', label: 'Category', half: true, type: 'select', options: categories.map((c) => ({ value: c.id, label: c.title })) },
      { key: 'displayOrder', label: 'Order', type: 'number', half: true },
    ],
    [categories],
  )

  const skills = useMemo(() => {
    const list = categories.filter((c) => categoryId === 'all' || c.id === categoryId).flatMap((c) => c.skills.map((s) => ({ ...s, skillCategoryId: s.skillCategoryId || c.id })))
    return list.sort((a, b) => a.displayOrder - b.displayOrder)
  }, [categories, categoryId])

  const catTitle = (id: number) => categories.find((c) => c.id === id)?.title ?? '—'

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['skills', 'categories', 'years'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition ${tab === t ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-900/10 text-stone-700 hover:border-stone-900/30'}`}>
            {t}
          </button>
        ))}
        {tab === 'skills' && (
          <select className="input ml-auto w-auto py-1.5" value={categoryId} onChange={(e) => setCategoryId(e.target.value === 'all' ? 'all' : Number(e.target.value))}>
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {tab === 'years' ? (
        <YearsEditor skills={categories.flatMap((c) => c.skills.map((s) => ({ ...s, skillCategoryId: s.skillCategoryId || c.id, category: c.title })))} onSaved={reload} />
      ) : tab === 'categories' ? (
        <CollectionEditor<SkillCategory>
          title="Skill categories"
          description="Groups that skills belong to."
          singular="category"
          items={categories}
          fields={categoryFields}
          defaults={{ title: '', icon: '💻', displayOrder: 1, skills: [] }}
          api={{
            create: (d) => api.skillCategories.create({ title: d.title, icon: d.icon, displayOrder: d.displayOrder, skills: [] }),
            update: (id, d) => api.skillCategories.update(id, { title: d.title, icon: d.icon, displayOrder: d.displayOrder, skills: [] }),
            remove: api.skillCategories.remove,
          }}
          onChanged={reload}
          render={(c) => (
            <p className="font-medium text-stone-900">
              <span className="mr-2">{c.icon}</span>
              {c.title} <span className="ml-2 text-xs text-stone-500">{c.skills.length} skills</span>
            </p>
          )}
        />
      ) : (
        <CollectionEditor<Skill>
          title="Skills"
          description="Individual technologies with proficiency levels."
          singular="skill"
          items={skills}
          fields={skillFields}
          defaults={{ name: '', iconClass: 'FaCode', level: 1, displayOrder: 1, skillCategoryId: categoryId === 'all' ? categories[0]?.id ?? 0 : categoryId }}
          api={api.skills}
          onChanged={reload}
          render={(s) => (
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-800 text-lg text-accent-soft">
                <Icon name={s.iconClass} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-stone-900">{s.name}</p>
                <p className="text-xs text-stone-500">
                  {catTitle(s.skillCategoryId)}{yearsLabel(s.level) ? ` · ${yearsLabel(s.level)}` : ''}
                </p>
              </div>
            </div>
          )}
        />
      )}
    </div>
  )
}

function YearsEditor({ skills, onSaved }: { skills: (Skill & { category: string })[]; onSaved: () => Promise<void> | void }) {
  const toast = useToast()
  const [values, setValues] = useState<Record<number, number>>({})
  const [saving, setSaving] = useState(false)
  useEffect(() => setValues(Object.fromEntries(skills.map((s) => [s.id, s.level]))), [skills])

  const dirty = skills.filter((s) => values[s.id] !== undefined && values[s.id] !== s.level)

  const saveAll = async () => {
    setSaving(true)
    try {
      await Promise.all(
        dirty.map((s) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _id, category: _c, ...rest } = s
          return api.skills.update(s.id, { ...rest, level: values[s.id] })
        }),
      )
      toast('ok', `${dirty.length} skill${dirty.length === 1 ? '' : 's'} updated`)
      await onSaved()
    } catch (err) {
      toast('error', err instanceof ApiError ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <PanelHeader
        title="Years of active use"
        description="How long you've actively worked with each technology. Shown as “3 yrs” on the site; values above 30 are treated as legacy percentages and hidden."
        action={
          <button className="btn-primary" disabled={saving || dirty.length === 0} onClick={saveAll}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save {dirty.length > 0 ? `(${dirty.length})` : ''}
          </button>
        }
      />
      <div className="card mt-8 divide-y divide-stone-900/5">
        {skills.map((s) => {
          const v = values[s.id] ?? s.level
          const legacy = v > 30
          return (
            <div key={s.id} className="flex items-center gap-4 px-5 py-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-cyan/15 text-lg text-accent-pink">
                <Icon name={s.iconClass} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-stone-900">{s.name}</p>
                <p className="truncate text-xs text-stone-500">{s.category}{legacy ? ' · legacy % value, not shown' : ''}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={30}
                  step={1}
                  className={`input w-24 py-2 text-right ${legacy ? 'border-accent-pink/50' : ''}`}
                  value={v}
                  onChange={(e) => setValues((x) => ({ ...x, [s.id]: e.target.valueAsNumber || 0 }))}
                />
                <span className="w-8 text-xs text-stone-500">yrs</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function SecurityPanel() {
  const toast = useToast()
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.next.length < 8) return toast('error', 'New password must be at least 8 characters')
    if (form.next !== form.confirm) return toast('error', 'Passwords do not match')
    setBusy(true)
    try {
      await api.auth.changePassword(auth.getUsername() ?? '', form.current, form.next)
      toast('ok', 'Password updated')
      setForm({ current: '', next: '', confirm: '' })
    } catch (err) {
      toast('error', err instanceof ApiError ? err.message : 'Could not change password')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <PanelHeader title="Security" description={`Signed in as ${auth.getUsername() ?? 'admin'}`} />
      <form onSubmit={submit} className="card mt-8 max-w-lg p-6 sm:p-8">
        <div className="space-y-4">
          <div>
            <label className="label" htmlFor="cur">Current password</label>
            <input id="cur" type="password" className="input" required value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="new">New password</label>
            <input id="new" type="password" className="input" required value={form.next} onChange={(e) => setForm({ ...form, next: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="conf">Confirm new password</label>
            <input id="conf" type="password" className="input" required value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
          </div>
        </div>
        <button type="submit" disabled={busy} className="btn-primary mt-6">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
          Update password
        </button>
      </form>
    </div>
  )
}
