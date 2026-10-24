import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { ApiError } from '@/lib/api'
import type { WithoutId } from '@/lib/types'
import { Fields, fromValues, toValues, type FieldDef } from './Form'
import { Confirm, Modal, PanelHeader, SaveButton, useToast } from './ui'

type Ordered = { id: number; displayOrder: number }

interface Props<T extends Ordered> {
  title: string
  description: string
  items: T[]
  fields: FieldDef<T>[]
  defaults: Partial<T>
  render: (item: T) => ReactNode
  api: {
    create: (data: WithoutId<T>) => Promise<unknown>
    update: (id: number, data: WithoutId<T>) => Promise<unknown>
    remove: (id: number) => Promise<unknown>
  }
  onChanged: () => Promise<void> | void
  singular?: string
}

export function CollectionEditor<T extends Ordered>({ title, description, items, fields, defaults, render, api, onChanged, singular = 'item' }: Props<T>) {
  const toast = useToast()
  const [editing, setEditing] = useState<T | 'new' | null>(null)
  const [values, setValues] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)
  const [confirm, setConfirm] = useState<T | null>(null)

  const open = (target: T | 'new') => {
    const nextOrder = items.length ? Math.max(...items.map((i) => i.displayOrder)) + 1 : 1
    setValues(toValues(target === 'new' ? undefined : target, fields, { ...defaults, displayOrder: nextOrder } as Partial<T>))
    setEditing(target)
  }

  const strip = (t: T): WithoutId<T> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, ...rest } = t
    return rest as WithoutId<T>
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!editing) return
    setSaving(true)
    try {
      const payload = fromValues<T>(values, fields)
      if (editing === 'new') await api.create(strip({ ...defaults, ...payload } as T))
      else await api.update(editing.id, strip({ ...editing, ...payload }))
      toast('ok', editing === 'new' ? `${singular} created` : `${singular} updated`)
      setEditing(null)
      await onChanged()
    } catch (err) {
      toast('error', err instanceof ApiError ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const remove = async () => {
    if (!confirm) return
    try {
      await api.remove(confirm.id)
      toast('ok', `${singular} deleted`)
      await onChanged()
    } catch (err) {
      toast('error', err instanceof ApiError ? err.message : 'Delete failed')
    } finally {
      setConfirm(null)
    }
  }

  const move = async (index: number, dir: -1 | 1) => {
    const a = items[index]
    const b = items[index + dir]
    if (!a || !b) return
    try {
      await Promise.all([
        api.update(a.id, strip({ ...a, displayOrder: b.displayOrder })),
        api.update(b.id, strip({ ...b, displayOrder: a.displayOrder })),
      ])
      await onChanged()
    } catch (err) {
      toast('error', err instanceof ApiError ? err.message : 'Reorder failed')
    }
  }

  return (
    <div>
      <PanelHeader
        title={title}
        description={description}
        action={
          <button className="btn-primary" onClick={() => open('new')}>
            <Plus size={16} /> Add {singular}
          </button>
        }
      />

      <ul className="mt-8 space-y-3">
        <AnimatePresence initial={false}>
          {items.map((item, i) => (
            <motion.li
              layout
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="card flex items-center gap-3 p-4 sm:p-5"
            >
              <div className="flex flex-col">
                <button aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)} className="rounded-md p-1 text-slate-500 hover:text-white disabled:opacity-20">
                  <ArrowUp size={14} />
                </button>
                <button aria-label="Move down" disabled={i === items.length - 1} onClick={() => move(i, 1)} className="rounded-md p-1 text-slate-500 hover:text-white disabled:opacity-20">
                  <ArrowDown size={14} />
                </button>
              </div>
              <div className="min-w-0 flex-1">{render(item)}</div>
              <div className="flex shrink-0 gap-1">
                <button aria-label="Edit" onClick={() => open(item)} className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-white/10 hover:text-white">
                  <Pencil size={15} />
                </button>
                <button aria-label="Delete" onClick={() => setConfirm(item)} className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-rose-500/20 hover:text-rose-300">
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <li className="card p-10 text-center text-sm text-slate-500">Nothing here yet. Add your first {singular}.</li>
        )}
      </ul>

      <Modal open={editing !== null} onClose={() => setEditing(null)} title={editing === 'new' ? `New ${singular}` : `Edit ${singular}`}>
        <form onSubmit={submit}>
          <Fields fields={fields} values={values} onChange={(k, v) => setValues((s) => ({ ...s, [k]: v }))} />
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>
              Cancel
            </button>
            <SaveButton saving={saving} label={editing === 'new' ? 'Create' : 'Save'} />
          </div>
        </form>
      </Modal>

      <Confirm open={confirm !== null} onCancel={() => setConfirm(null)} onConfirm={remove} text={`This ${singular} will be permanently deleted.`} />
    </div>
  )
}
